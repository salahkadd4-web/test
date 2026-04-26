import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'
import { analyzeReturn } from '@/lib/mlApi'
import { createFlowmerceClaim } from '@/lib/flowmerceApi'

const reasonMap: Record<string, string> = {
  DEFECTUEUX:      'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:    'Ne correspond pas',
}

const genreMap: Record<string, string> = {
  HOMME: 'Male',
  FEMME: 'Female',
  AUTRE: 'Male',
}

// ── GET — retours du client connecté ────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const retours = await prisma.return.findMany({
      where:    { userId: token.id as string },
      orderBy:  { createdAt: 'desc' },
      include:  { order: true, product: { include: { category: true } } },
    })

    return NextResponse.json(retours)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ── POST — soumettre un nouveau retour ───────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { orderId, productId, returnReason, description } = await req.json()

    if (!orderId || !productId || !returnReason) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // ── Profil client pour enrichir le ML ───────────────────────────────
    const [userProfile, order] = await Promise.all([
      prisma.user.findUnique({
        where:  { id: token.id as string },
        select: { age: true, genre: true, wilaya: true, nom: true, prenom: true, email: true, telephone: true },
      }),
      prisma.order.findFirst({
        where:   { id: orderId, userId: token.id as string, statut: 'LIVREE' },
        include: {
          items: { include: { product: { include: { category: true } } } },
          user:  true,
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

    const existingReturn = await prisma.return.findFirst({
      where: { orderId, productId, userId: token.id as string },
    })
    if (existingReturn) {
      return NextResponse.json({ error: 'Un retour existe déjà pour ce produit' }, { status: 400 })
    }

    const orderItem = order.items.find((i) => i.productId === productId)
    if (!orderItem) {
      return NextResponse.json({ error: 'Produit non trouvé dans la commande' }, { status: 400 })
    }

    // ── Score de fraude (ratio retours / commandes) ──────────────────────
    const [totalOrders, totalReturns] = await Promise.all([
      prisma.order.count({ where: { userId: token.id as string } }),
      prisma.return.count({ where: { userId: token.id as string } }),
    ])
    const fraudScore = Math.min(Math.round((totalReturns / Math.max(totalOrders, 1)) * 100), 100)

    // ── Analyse ML ───────────────────────────────────────────────────────
    let mlResult = null
    try {
      mlResult = await analyzeReturn({
        Customer_Age:           userProfile?.age    || 30,
        Customer_Gender:        genreMap[userProfile?.genre || ''] || 'Male',
        Customer_Wilaya:        userProfile?.wilaya || 'Alger',
        Customer_Past_Returns:  totalReturns,
        Product_Category:       orderItem.product.category.nom,
        Product_Price_DA:       orderItem.prix,
        Order_Quantity:         orderItem.quantite,
        Payment_Method:         'Virement bancaire',
        Shipping_Method:        'Express',
        Shipping_Cost_DA:       700,
        Days_to_Return:         daysToReturn,
        Within_Return_Policy:   daysToReturn <= 30,
        Return_Reason:          reasonMap[returnReason] || "Changement d'avis",
        Fraud_Score:            fraudScore,
        Total_Amount_DA:        orderItem.prix * orderItem.quantite,
        Shop_Return_Window_Days: 30,
      })
    } catch (mlError) {
      console.error('API ML indisponible:', mlError)
    }

    // ── Statut TOUJOURS EN_ATTENTE — validation humaine obligatoire ──────
    // Le ML donne une recommandation, mais admin/vendeur doit valider
    const returnStatus = 'EN_ATTENTE'

    const mlProbabilities = mlResult?.decision?.probabilities
      ? Object.fromEntries(
          Object.entries(mlResult.decision.probabilities).map(([k, v]) => [k, v as number])
        )
      : null

    // ── Créer le retour en DB ────────────────────────────────────────────
    const retour = await prisma.return.create({
      data: {
        orderId,
        userId:           token.id as string,
        productId,
        returnReason,
        returnStatus,
        daysToReturn,
        description:      description || null,
        fraudScore,
        mlDecision:       mlResult?.decision.resolution     || null,
        mlConfidence:     mlResult?.decision.confidence     || null,
        mlResponsibility: mlResult?.decision.shipping?.responsible || null,
        mlProbabilities:  mlProbabilities || undefined,
        mlDecisionLabel:  mlResult
          ? mlResult.decision.resolution === 'Refund'   ? 'Recommandation : Remboursement'
          : mlResult.decision.resolution === 'Exchange' ? 'Recommandation : Échange'
          : mlResult.decision.resolution === 'Repair'   ? 'Recommandation : Réparation'
          : 'Recommandation : Refus'
          : null,
        flowmerceClaimId: null,
        flowmerceSynced:  false,
      },
      include: { product: true, order: true },
    })

    // ── Pousser vers Flowmerce (best-effort, async) ──────────────────────
    let flowmerceClaimId: string | null = null
    try {
      const flowmerceRes = await createFlowmerceClaim({
        returnId:        retour.id,
        orderId:         orderId.slice(-8).toUpperCase(),
        customerName:    `${userProfile?.prenom || ''} ${userProfile?.nom || ''}`.trim(),
        customerEmail:   userProfile?.email || 'inconnu@cabastore.dz',
        customerPhone:   userProfile?.telephone || undefined,
        productName:     orderItem.product.nom,
        returnReason,
        description:     description || '',
        mlDecision:      mlResult?.decision.resolution || null,
        mlConfidence:    mlResult?.decision.confidence || null,
        mlProbabilities: mlProbabilities,
        fraudScore,
        orderDate:       order.createdAt.toISOString(),
        orderTotal:      orderItem.prix * orderItem.quantite,
      })

      flowmerceClaimId = flowmerceRes.claim.id

      // Mettre à jour le retour avec l'ID du claim Flowmerce
      await prisma.return.update({
        where: { id: retour.id },
        data: {
          flowmerceClaimId,
          flowmerceSynced: true,
        },
      })
    } catch (flowmerceError) {
      console.error('Flowmerce push failed (non-bloquant):', flowmerceError)
    }

    return NextResponse.json(
      {
        retour: { ...retour, flowmerceClaimId },
        mlResult,
        flowmerceSynced: !!flowmerceClaimId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur retour:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
