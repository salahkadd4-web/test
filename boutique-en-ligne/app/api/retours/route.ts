import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'
import {
  createFlowmerceClaim,
  getFlowmerceClaims,
  countFlowmerceClaimsByCustomer,
} from '@/lib/flowmerceApi'

const genreMap: Record<string, string> = {
  HOMME:  'Male',
  FEMME:  'Female',
  AUTRE:  'Male',
  Male:   'Male',
  Female: 'Female',
}

function mapGenre(genre: string | null | undefined): string {
  return genreMap[String(genre ?? '')] ?? 'Male'
}

// ── GET — retours du client connecté (depuis Flowmerce) ──────────────────

export async function GET(_req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where:  { id: token.id as string },
      select: { email: true },
    })
    if (!user?.email) return NextResponse.json([])

    const claims = await getFlowmerceClaims({ customerEmail: user.email })
    return NextResponse.json(claims)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ── POST — soumettre un nouveau retour (sauvegardé dans Flowmerce) ────────

export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { orderId, productId, returnReason, description, desiredResolution } = await req.json()

    if (!orderId || !productId || !returnReason) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const [userProfile, order] = await Promise.all([
      prisma.user.findUnique({
        where:  { id: token.id as string },
        select: { age: true, genre: true, wilaya: true, nom: true, prenom: true, email: true, telephone: true },
      }),
      prisma.order.findFirst({
        where:   { id: orderId, userId: token.id as string, statut: 'LIVREE' },
        select: {
          id:                true,
          total:             true,
          createdAt:         true,
          modePaiement:      true,
          methodeExpedition: true,
          fraisLivraison:    true,
          items: {
            include: { product: { include: { category: true } } },
          },
        },
      }),
    ])

    if (!order) {
      return NextResponse.json({ error: 'Commande introuvable ou non éligible au retour' }, { status: 400 })
    }

    const daysToReturn = Math.floor(
      (Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysToReturn > 30) {
      return NextResponse.json({ error: 'Délai de retour dépassé (30 jours maximum)' }, { status: 400 })
    }

    const orderItem = order.items.find((i) => i.productId === productId)
    if (!orderItem) {
      return NextResponse.json({ error: 'Produit non trouvé dans la commande' }, { status: 400 })
    }

    // Vérifier doublon via Flowmerce
    const existingClaims = await getFlowmerceClaims({ customerEmail: userProfile?.email || '' })
    const duplicate = existingClaims.find(
      (c) => c.order_id === orderId && c.external_product_id === productId
    )
    if (duplicate) {
      return NextResponse.json({ error: 'Un retour existe déjà pour ce produit' }, { status: 400 })
    }

    // Fraud score basé sur le nombre de claims passés dans Flowmerce
    const [totalOrders, pastReturns] = await Promise.all([
      prisma.order.count({ where: { userId: token.id as string } }),
      countFlowmerceClaimsByCustomer(userProfile?.email || ''),
    ])

    const fraudScore  = Math.min(Math.round((pastReturns / Math.max(totalOrders, 1)) * 100), 100)
    const isSuspicious: 0 | 1 = fraudScore > 60 ? 1 : 0

    // Envoi direct à Flowmerce — aucune sauvegarde locale
    const flowmerceRes = await createFlowmerceClaim({
      returnId:                `${orderId}-${productId}`,
      orderId,
      customerName:            `${userProfile?.prenom || ''} ${userProfile?.nom || ''}`.trim(),
      customerEmail:           userProfile?.email || 'inconnu@cabastore.dz',
      customerPhone:           userProfile?.telephone || undefined,
      productName:             orderItem.product.nom,
      description:             description || '',
      orderDate:               order.createdAt.toISOString(),
      orderTotal:              orderItem.prix * orderItem.quantite,
      external_product_id:     productId,
      external_return_reason:  returnReason,
      desired_resolution:      desiredResolution || undefined,
      Customer_Gender:         mapGenre(userProfile?.genre),
      Customer_Age:            userProfile?.age ?? 25,
      Customer_Wilaya:         userProfile?.wilaya ?? 'Alger',
      Customer_Past_Returns:   pastReturns,
      Product_Category:        orderItem.product.category.nom,
      Product_Price_DA:        orderItem.prix,
      Order_Quantity:          orderItem.quantite,
      Total_Amount_DA:         orderItem.prix * orderItem.quantite,
      Payment_Method:          order.modePaiement      ?? 'Paiement à la livraison',
      Shipping_Method:         order.methodeExpedition ?? 'Livraison standard',
      Shipping_Cost_DA:        order.fraisLivraison    ?? 700,
      Return_Reason:           returnReason,
      Days_to_Return:          daysToReturn,
      Shop_Return_Window_Days: 30,
      Within_Return_Policy:    daysToReturn <= 30 ? 1 : 0,
      Fraud_Score:             fraudScore,
      Customer_Satisfaction:   3,   // neutre par défaut — non connu avant évaluation
      Is_Suspicious:           isSuspicious,
    })

    return NextResponse.json(
      {
        claim:          flowmerceRes.claim,
        mlResult:       flowmerceRes.ml ?? null,
        flowmerceSynced: true,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur retour:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
