import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const token = await getAuthToken()
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    const { itemId } = await params
    const { quantite, variantId, variantOptionId } = await req.json()

    const data: any = {}
    if (quantite !== undefined) {
      if (quantite < 1) return NextResponse.json({ error: 'Quantité invalide' }, { status: 400 })
      data.quantite = quantite
    }
    if (variantId       !== undefined) data.variantId       = variantId || null
    if (variantOptionId !== undefined) data.variantOptionId = variantOptionId || null

    await prisma.cartItem.update({ where: { id: itemId }, data })
    return NextResponse.json({ message: 'Panier mis à jour' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
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
