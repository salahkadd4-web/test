import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

// GET — Liste des produits
export async function GET(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const vendeurId = searchParams.get('vendeurId')
    const adminOnly = searchParams.get('adminOnly') === 'true'

    const where: any = {}
    if (vendeurId)  where.vendeurId = vendeurId
    if (adminOnly)  where.vendeurId = null

    const produits = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        vendeur: { select: { id: true, nomBoutique: true } },
        variants: { orderBy: { createdAt: 'asc' } },
      },
    })

    return NextResponse.json(produits)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST — Créer un produit
export async function POST(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { nom, description, prix, stock, images, categoryId, prixVariables, variants } = await req.json()

    if (!nom || !prix || !categoryId) {
      return NextResponse.json({ error: 'Nom, prix et catégorie sont requis' }, { status: 400 })
    }

    const produit = await prisma.product.create({
      data: {
        nom,
        description: description || null,
        prix: parseFloat(prix),
        stock: parseInt(stock) || 0,
        images: images || [],
        categoryId,
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
      include: { variants: true },
    })

    return NextResponse.json(produit, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
