import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'
import { getFlowmerceClaims } from '@/lib/flowmerceApi'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

export async function GET(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const vendeurId  = searchParams.get('vendeurId')
    const statut     = searchParams.get('statut')
    const categoryId = searchParams.get('categoryId')
    const clientId   = searchParams.get('clientId')
    const productId  = searchParams.get('productId')
    const search     = searchParams.get('search')?.toLowerCase() || ''

    // Récupérer tous les claims depuis Flowmerce
    const claims = await getFlowmerceClaims({ status: statut || undefined })

    // Enrichir avec les données locales (produit, utilisateur, commande)
    const productIds = claims.map(c => c.external_product_id).filter(Boolean) as string[]
    const orderIds   = claims.map(c => c.order_id).filter(Boolean) as string[]
    const emails     = claims.map(c => c.customer_email).filter(Boolean) as string[]

    const [products, orders, users] = await Promise.all([
      productIds.length
        ? prisma.product.findMany({
            where:   { id: { in: productIds } },
            select: {
              id: true, nom: true, images: true, prix: true,
              category: { select: { nom: true } },
              vendeur:  { select: { id: true, nomBoutique: true } },
            },
          })
        : [],
      orderIds.length
        ? prisma.order.findMany({
            where:  { id: { in: orderIds } },
            select: { id: true, total: true, createdAt: true },
          })
        : [],
      emails.length
        ? prisma.user.findMany({
            where:  { email: { in: emails } },
            select: {
              id: true, nom: true, prenom: true, email: true, telephone: true,
              _count: { select: { orders: true } },
            },
          })
        : [],
    ])

    const productMap = Object.fromEntries(products.map(p => [p.id, p]))
    const orderMap   = Object.fromEntries(orders.map(o => [o.id, o]))
    const userMap    = Object.fromEntries(users.map(u => [u.email!, u]))

    let enriched = claims.map(c => ({
      ...c,
      product: c.external_product_id ? productMap[c.external_product_id] ?? null : null,
      order:   c.order_id             ? orderMap[c.order_id]              ?? null : null,
      user:    c.customer_email       ? userMap[c.customer_email]         ?? null : null,
    }))

    // Filtres post-enrichissement
    if (vendeurId)  enriched = enriched.filter(r => r.product?.vendeur?.id === vendeurId)
    if (categoryId) enriched = enriched.filter(r => r.product?.category?.nom !== undefined)
    if (productId)  enriched = enriched.filter(r => r.external_product_id === productId)
    if (clientId)   enriched = enriched.filter(r => r.user?.id === clientId)

    if (search) {
      enriched = enriched.filter(r =>
        r.product_name.toLowerCase().includes(search) ||
        r.customer_name.toLowerCase().includes(search) ||
        (r.customer_email || '').toLowerCase().includes(search)
      )
    }

    return NextResponse.json(enriched)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
