import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

// PUT — Modifier un produit (avec prixVariables et variantes)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const { nom, description, prix, stock, images, categoryId, prixVariables, variants } = await req.json()

    const newStock = parseInt(stock)

    // Mettre à jour le produit
    const produit = await prisma.product.update({
      where: { id },
      data: {
        nom,
        description: description || null,
        prix: parseFloat(prix),
        stock: newStock,
        images: images || [],
        categoryId,
        actif: newStock > 0,
        prixVariables: prixVariables && prixVariables.length > 0 ? prixVariables : null,
      },
    })

    // Synchroniser les variantes si fournies
    if (variants !== undefined) {
      // Supprimer les variantes existantes et recréer
      await prisma.productVariant.deleteMany({ where: { productId: id } })
      if (variants.length > 0) {
        await prisma.productVariant.createMany({
          data: variants.map((v: any) => ({
            productId: id,
            nom: v.nom,
            couleur: v.couleur || null,
            stock: parseInt(v.stock) || 0,
            images: v.images || [],
          })),
        })
      }
    }

    const updated = await prisma.product.findUnique({
      where: { id },
      include: { variants: { orderBy: { createdAt: 'asc' } } },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erreur modification produit:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PATCH — Activer / Désactiver
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const { actif } = await req.json()

    const produit = await prisma.product.update({
      where: { id },
      data: { actif },
    })

    return NextResponse.json(produit)
  } catch (error) {
    console.error('Erreur changement statut produit:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
