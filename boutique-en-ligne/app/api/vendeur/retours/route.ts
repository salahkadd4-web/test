import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getFlowmerceClaims } from '@/lib/flowmerceApi'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const vendeur = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
  })
  if (!vendeur || vendeur.statut !== 'APPROUVE') {
    return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const statut     = searchParams.get('statut')
  const search     = searchParams.get('search')?.toLowerCase() || ''
  const categoryId = searchParams.get('categoryId')

  // Récupérer tous les claims depuis Flowmerce
  const claims = await getFlowmerceClaims({ status: statut || undefined })

  // Enrichir avec les données produit pour filtrer par vendeur
  const productIds = claims.map(c => c.external_product_id).filter(Boolean) as string[]

  const products = productIds.length
    ? await prisma.product.findMany({
        where:  { id: { in: productIds }, vendeurId: vendeur.id },
        select: {
          id: true, nom: true, images: true,
          category: { select: { id: true, nom: true } },
        },
      })
    : []

  const vendeurProductIds = new Set(products.map(p => p.id))
  const productMap        = Object.fromEntries(products.map(p => [p.id, p]))

  // Filtrer uniquement les claims liés aux produits de ce vendeur
  let filtered = claims.filter(c =>
    c.external_product_id && vendeurProductIds.has(c.external_product_id)
  )

  if (categoryId) {
    filtered = filtered.filter(c => {
      const p = c.external_product_id ? productMap[c.external_product_id] : null
      return p?.category?.id === categoryId
    })
  }

  if (search) {
    filtered = filtered.filter(c =>
      c.product_name.toLowerCase().includes(search) ||
      c.customer_name.toLowerCase().includes(search) ||
      (c.customer_email || '').toLowerCase().includes(search)
    )
  }

  const enriched = filtered.map(c => ({
    ...c,
    product: c.external_product_id ? productMap[c.external_product_id] ?? null : null,
  }))

  return NextResponse.json(enriched)
}
