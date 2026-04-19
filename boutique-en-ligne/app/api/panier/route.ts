import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

// GET — Récupérer le panier
export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const panier = await prisma.cart.findUnique({
      where: { userId: token.id as string },
      include: {
        items: {
          include: { product: { include: { category: true } } },
        },
      },
    })

    return NextResponse.json(panier)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST — Ajouter un produit au panier
export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { produitId, quantite = 1 } = await req.json()

    // Vérifier le stock
    const produit = await prisma.product.findUnique({ where: { id: produitId } })
    if (!produit) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })
    if (produit.stock === 0) return NextResponse.json({ error: 'Produit en rupture de stock' }, { status: 400 })

    // Créer ou récupérer le panier
    let panier = await prisma.cart.findUnique({ where: { userId: token.id as string } })
    if (!panier) {
      panier = await prisma.cart.create({ data: { userId: token.id as string } })
    }

    // Vérifier si le produit est déjà dans le panier
    const itemExistant = await prisma.cartItem.findFirst({
      where: { cartId: panier.id, productId: produitId },
    })

    if (itemExistant) {
      // Mettre à jour la quantité
      await prisma.cartItem.update({
        where: { id: itemExistant.id },
        data: { quantite: itemExistant.quantite + quantite },
      })
    } else {
      // Ajouter le produit
      await prisma.cartItem.create({
        data: { cartId: panier.id, productId: produitId, quantite },
      })
    }

    return NextResponse.json({ message: 'Produit ajouté au panier' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
