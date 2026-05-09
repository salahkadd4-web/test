import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const vendeur = await prisma.vendeurProfile.findUnique({ where: { userId: session.user.id } })
  if (!vendeur || vendeur.statut !== 'APPROUVE') {
    return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const actif = searchParams.get('actif')
  const where: any = { vendeurId: vendeur.id }
  if (actif === 'true')  where.actif = true
  if (actif === 'false') where.actif = false

  const produits = await prisma.product.findMany({
    where,
    include: {
      category: { select: { id: true, nom: true } },
      variants: { orderBy: { createdAt: 'asc' } },
      _count: { select: { orderItems: true, favorites: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(produits)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const vendeur = await prisma.vendeurProfile.findUnique({ where: { userId: session.user.id } })
  if (!vendeur || vendeur.statut !== 'APPROUVE') {
    return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })
  }

  const body = await req.json()
  const { nom, description, prix, stock, images, categoryId, actif, prixVariables, variants } = body

  if (!nom?.trim()) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })
  if (!prix || isNaN(prix) || prix < 0) return NextResponse.json({ error: 'Prix invalide' }, { status: 400 })
  if (!categoryId) return NextResponse.json({ error: 'Catégorie requise' }, { status: 400 })

  const cat = await prisma.category.findFirst({ where: { id: categoryId, statut: 'APPROUVEE' } })
  if (!cat) return NextResponse.json({ error: 'Catégorie invalide ou non approuvée' }, { status: 400 })

  const produit = await prisma.product.create({
    data: {
      nom: nom.trim(),
      description: description?.trim() || null,
      prix: parseFloat(prix),
      stock: parseInt(stock) || 0,
      images: images || [],
      categoryId,
      vendeurId: vendeur.id,
      actif: actif !== false,
      prixVariables: prixVariables && prixVariables.length > 0 ? prixVariables : undefined,
      variants: variants && variants.length > 0 ? {
        create: variants.map((v: any) => ({
          nom: v.nom,
          couleur: v.couleur || null,
          stock: parseInt(v.stock) || 0,
          images: v.images || [],
        })),
      } : undefined,
    },
    include: {
      category: { select: { id: true, nom: true } },
      variants: true,
    },
  })

  return NextResponse.json(produit, { status: 201 })
}
