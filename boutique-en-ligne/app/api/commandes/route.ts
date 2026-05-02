import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

// GET — Récupérer les commandes de l'utilisateur
export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const commandes = await prisma.order.findMany({
      where: { userId: token.id as string },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    return NextResponse.json(commandes)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST — Créer une commande
export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { adresse, modePaiement, methodeExpedition, fraisLivraison } = await req.json()

    if (!adresse) {
      return NextResponse.json({ error: 'Adresse de livraison requise' }, { status: 400 })
    }

    // Récupérer le panier
    const panier = await prisma.cart.findUnique({
      where: { userId: token.id as string },
      include: {
        items: { include: { product: true } },
      },
    })

    if (!panier || panier.items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    // Vérifier le stock de chaque produit
    for (const item of panier.items) {
      if (item.product.stock < item.quantite) {
        return NextResponse.json(
          { error: `Stock insuffisant pour ${item.product.nom}` },
          { status: 400 }
        )
      }
    }

    // Calculer le total
    const sousTotal = panier.items.reduce(
      (acc, item) => acc + item.product.prix * item.quantite,
      0
    )
    const frais = typeof fraisLivraison === 'number' ? fraisLivraison : 700
    const total = sousTotal + frais

    // Créer la commande
    const commande = await prisma.order.create({
      data: {
        userId:            token.id as string,
        adresse,
        total,
        modePaiement:      modePaiement      || 'Paiement à la livraison',
        methodeExpedition: methodeExpedition || 'Livraison standard',
        fraisLivraison:    frais,
        items: {
          create: panier.items.map((item) => ({
            productId: item.productId,
            quantite: item.quantite,
            prix: item.product.prix,
          })),
        },
      },
    })

    // Mettre à jour le stock
    for (const item of panier.items) {
      const newStock = item.product.stock - item.quantite
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: newStock,
          actif: newStock > 0,
        },
      })
    }

    // Vider le panier
    await prisma.cartItem.deleteMany({ where: { cartId: panier.id } })

    return NextResponse.json({ message: 'Commande créée avec succès', commandeId: commande.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
