import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

async function getVendeurOrFail(userId: string) {
  const vendeur = await prisma.vendeurProfile.findUnique({ where: { userId } })
  if (!vendeur || vendeur.statut !== 'APPROUVE') return null
  return vendeur
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  const vendeur = await getVendeurOrFail(session.user.id)
  if (!vendeur) return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })

  const produit = await prisma.product.findFirst({
    where: { id: params.id, vendeurId: vendeur.id },
    include: {
      category: true,
      variants: { orderBy: { createdAt: 'asc' } },
      _count: { select: { orderItems: true, favorites: true } },
    },
  })
  if (!produit) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })

  return NextResponse.json(produit)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  const vendeur = await getVendeurOrFail(session.user.id)
  if (!vendeur) return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })

  const produit = await prisma.product.findFirst({ where: { id: params.id, vendeurId: vendeur.id } })
  if (!produit) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })

  const body = await req.json()
  const { nom, description, prix, stock, images, categoryId, actif, prixVariables, variants } = body

  if (categoryId && categoryId !== produit.categoryId) {
    const cat = await prisma.category.findFirst({ where: { id: categoryId, statut: 'APPROUVEE' } })
    if (!cat) return NextResponse.json({ error: 'Catégorie invalide ou non approuvée' }, { status: 400 })
  }

  const updated = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...(nom         !== undefined && { nom:          nom.trim() }),
      ...(description !== undefined && { description:  description?.trim() || null }),
      ...(prix        !== undefined && { prix:         parseFloat(prix) }),
      ...(stock       !== undefined && { stock:        parseInt(stock) }),
      ...(images      !== undefined && { images }),
      ...(categoryId  !== undefined && { categoryId }),
      ...(actif       !== undefined && { actif }),
      ...(prixVariables !== undefined && {
        prixVariables: prixVariables && prixVariables.length > 0 ? prixVariables : null
      }),
    },
    include: { category: { select: { id: true, nom: true } } },
  })

  // Synchroniser les variantes si fournies
  if (variants !== undefined) {
    await prisma.productVariant.deleteMany({ where: { productId: params.id } })
    if (variants.length > 0) {
      await prisma.productVariant.createMany({
        data: variants.map((v: any) => ({
          productId: params.id,
          nom: v.nom,
          couleur: v.couleur || null,
          stock: parseInt(v.stock) || 0,
          images: v.images || [],
        })),
      })
    }
  }

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  const vendeur = await getVendeurOrFail(session.user.id)
  if (!vendeur) return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })

  const produit = await prisma.product.findFirst({
    where: { id: params.id, vendeurId: vendeur.id },
    include: { _count: { select: { orderItems: true } } },
  })
  if (!produit) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })

  if (produit._count.orderItems > 0) {
    await prisma.product.update({ where: { id: params.id }, data: { actif: false } })
    return NextResponse.json({ message: 'Produit désactivé (commandes existantes)' })
  }

  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Produit supprimé' })
}
