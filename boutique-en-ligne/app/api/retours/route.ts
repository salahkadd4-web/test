import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'
import { analyzeReturn } from '@/lib/mlApi'

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

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const retours = await prisma.return.findMany({
      where: { userId: token.id as string },
      orderBy: { createdAt: 'desc' },
      include: { order: true, product: { include: { category: true } } },
    })

    return NextResponse.json(retours)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { orderId, productId, returnReason, description } = await req.json()

    if (!orderId || !productId || !returnReason) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Récupérer le profil du client pour les données ML
    const userProfile = await prisma.user.findUnique({
      where: { id: token.id as string },
      select: { age: true, genre: true, wilaya: true },
    })

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: token.id as string, statut: 'LIVREE' },
      include: { items: { include: { product: { include: { category: true } } } }, user: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Commande introuvable ou non éligible au retour' }, { status: 400 })
    }

    const daysToReturn = Math.floor(
      (new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24)
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

    const totalOrders  = await prisma.order.count({ where: { userId: token.id as string } })
    const totalReturns = await prisma.return.count({ where: { userId: token.id as string } })
    const fraudScore   = Math.min(Math.round((totalReturns / Math.max(totalOrders, 1)) * 100), 100)

    // Utiliser les données du profil pour le ML
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
      })
    } catch (mlError) {
      console.error('API ML indisponible:', mlError)
    }

    let returnStatus: 'EN_ATTENTE' | 'APPROUVE' | 'REFUSE' = 'EN_ATTENTE'
    if (mlResult) {
      const resolution = mlResult.decision.resolution
      if (resolution === 'Reject') returnStatus = 'REFUSE'
      else if (['Refund', 'Exchange', 'Repair'].includes(resolution)) returnStatus = 'APPROUVE'
    }

    const retour = await prisma.return.create({
      data: {
        orderId,
        userId:           token.id as string,
        productId,
        returnReason,
        returnStatus,
        daysToReturn,
        description:      description || null,
        mlDecision:       mlResult?.decision.resolution || null,
        mlConfidence:     mlResult?.decision.confidence || null,
        mlResponsibility: mlResult?.decision.shipping?.responsible || null,
        mlDecisionLabel:  mlResult
          ? mlResult.decision.resolution === 'Refund'   ? 'Remboursement accordé'
          : mlResult.decision.resolution === 'Exchange' ? 'Échange accordé'
          : mlResult.decision.resolution === 'Repair'   ? 'Réparation accordée'
          : 'Retour refusé'
          : null,
      },
      include: { product: true, order: true },
    })

    return NextResponse.json({ retour, mlResult }, { status: 201 })
  } catch (error) {
    console.error('Erreur retour:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
