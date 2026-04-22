import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

async function getVendeurOrFail(userId: string) {
  const vendeur = await prisma.vendeurProfile.findUnique({ where: { userId } })
  if (!vendeur || vendeur.statut !== 'APPROUVE') return null
  return vendeur
}

// GET /api/vendeur/produits/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
      _count: { select: { orderItems: true, favorites: true, returns: true } },
    },
  })
  if (!produit) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })

  return NextResponse.json(produit)
}

// PATCH /api/vendeur/produits/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  const vendeur = await getVendeurOrFail(session.user.id)
  if (!vendeur) return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })

  const produit = await prisma.product.findFirst({
    where: { id: params.id, vendeurId: vendeur.id },
  })
  if (!produit) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })

  const body = await req.json()
  const { nom, description, prix, stock, images, categoryId, actif } = body

  // Si changement de catégorie, vérifier qu'elle est approuvée
  if (categoryId && categoryId !== produit.categoryId) {
    const cat = await prisma.category.findFirst({
      where: { id: categoryId, statut: 'APPROUVEE' },
    })
    if (!cat) {
      return NextResponse.json({ error: 'Catégorie invalide ou non approuvée' }, { status: 400 })
    }
  }

  const updated = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...(nom         !== undefined && { nom:         nom.trim() }),
      ...(description !== undefined && { description: description?.trim() || null }),
      ...(prix        !== undefined && { prix:        parseFloat(prix) }),
      ...(stock       !== undefined && { stock:       parseInt(stock) }),
      ...(images      !== undefined && { images }),
      ...(categoryId  !== undefined && { categoryId }),
      ...(actif       !== undefined && { actif }),
    },
    include: { category: { select: { id: true, nom: true } } },
  })

  return NextResponse.json(updated)
}

// DELETE /api/vendeur/produits/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    // Ne pas supprimer si des commandes existent : désactiver seulement
    await prisma.product.update({ where: { id: params.id }, data: { actif: false } })
    return NextResponse.json({ message: 'Produit désactivé (commandes existantes)' })
  }

  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Produit supprimé' })
}
