import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

// PATCH — Modifier la quantité ET/OU la variante
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { itemId } = await params
    const body = await req.json()
    const { quantite, variantId } = body

    const updateData: any = {}
    if (quantite !== undefined) {
      if (quantite < 1) return NextResponse.json({ error: 'Quantité invalide' }, { status: 400 })
      updateData.quantite = quantite
    }
    if (variantId !== undefined) {
      // null = sans variante, string = ID de variante
      updateData.variantId = variantId || null
    }

    await prisma.cartItem.update({ where: { id: itemId }, data: updateData })

    return NextResponse.json({ message: 'Panier mis à jour' })
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