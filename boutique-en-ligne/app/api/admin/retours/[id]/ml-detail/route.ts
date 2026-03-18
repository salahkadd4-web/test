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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    const retour = await prisma.return.findUnique({
      where: { id },
      include: {
        order: { include: { items: { include: { product: { include: { category: true } } } } } },
        user: true,
        product: { include: { category: true } },
      },
    })

    if (!retour) return NextResponse.json({ error: 'Retour introuvable' }, { status: 404 })

    const orderItem = retour.order.items.find((i) => i.productId === retour.productId)
    if (!orderItem) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })

    const totalOrders  = await prisma.order.count({ where: { userId: retour.userId } })
    const totalReturns = await prisma.return.count({ where: { userId: retour.userId } })
    const fraudScore   = Math.min(Math.round((totalReturns / Math.max(totalOrders, 1)) * 100), 100)

    const customerAge    = 30
    const customerGender = 'Male'
    const customerWilaya = 'Alger'
    const paymentMethod  = 'Virement bancaire'
    const shippingMethod = 'Express'

    const mlResult = await analyzeReturn({
      Customer_Age:           customerAge,
      Customer_Gender:        customerGender,
      Customer_Wilaya:        customerWilaya,
      Customer_Past_Returns:  totalReturns,
      Product_Category:       retour.product.category.nom,
      Product_Price_DA:       orderItem.prix,
      Order_Quantity:         orderItem.quantite,
      Payment_Method:         paymentMethod,
      Shipping_Method:        shippingMethod,
      Shipping_Cost_DA:       700,
      Days_to_Return:         retour.daysToReturn,
      Within_Return_Policy:   retour.daysToReturn <= 30,
      Return_Reason:          reasonMap[retour.returnReason] || "Changement d'avis",
      Fraud_Score:            fraudScore,
      Total_Amount_DA:        orderItem.prix * orderItem.quantite,
    })

    return NextResponse.json({
      ...mlResult,
      customer_info: {
        age:             customerAge,
        gender:          customerGender,
        wilaya:          customerWilaya,
        past_returns:    totalReturns,
        payment_method:  paymentMethod,
        shipping_method: shippingMethod,
      },
    })
  } catch (error) {
    console.error('Erreur ML detail:', error)
    return NextResponse.json({ error: 'Erreur serveur ou ML indisponible' }, { status: 500 })
  }
}