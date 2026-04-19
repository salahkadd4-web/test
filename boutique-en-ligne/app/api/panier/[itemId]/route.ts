import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

// PATCH — Modifier la quantité
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { itemId } = await params
    const { quantite } = await req.json()

    if (quantite < 1) {
      return NextResponse.json({ error: 'Quantité invalide' }, { status: 400 })
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantite },
    })

    return NextResponse.json({ message: 'Quantité mise à jour' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE — Supprimer un item du panier
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { itemId } = await params

    await prisma.cartItem.delete({ where: { id: itemId } })

    return NextResponse.json({ message: 'Produit supprimé du panier' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
