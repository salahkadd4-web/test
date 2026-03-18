import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { analyzeReturn } from '@/lib/mlApi'

const reasonMap: Record<string, string> = {
  DEFECTUEUX:      'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:    'Ne correspond pas',
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
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
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const {
      orderId, productId, returnReason, description,
      wilaya, customerAge, customerGender, paymentMethod, shippingMethod,
    } = await req.json()

    if (!orderId || !productId || !returnReason) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

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

    let mlResult = null
    try {
      mlResult = await analyzeReturn({
        Customer_Age:           customerAge || 30,
        Customer_Gender:        customerGender || 'Male',
        Customer_Wilaya:        wilaya || 'Alger',
        Customer_Past_Returns:  totalReturns,
        Product_Category:       orderItem.product.category.nom,
        Product_Price_DA:       orderItem.prix,
        Order_Quantity:         orderItem.quantite,
        Payment_Method:         paymentMethod || 'Virement bancaire',
        Shipping_Method:        shippingMethod || 'Express',
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
      if (resolution === 'Reject') {
        returnStatus = 'REFUSE'
      } else if (resolution === 'Refund' || resolution === 'Exchange' || resolution === 'Repair') {
        returnStatus = 'APPROUVE'
      }
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