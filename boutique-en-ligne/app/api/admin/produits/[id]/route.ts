import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

async function checkAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  return token?.role === 'ADMIN' ? token : null
}

// PUT — Modifier un produit
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const { nom, description, prix, stock, images, categoryId } = await req.json()

    const produit = await prisma.product.update({
      where: { id },
      data: {
        nom,
        description: description || null,
        prix: parseFloat(prix),
        stock: parseInt(stock),
        images: images || [],
        categoryId,
      },
    })

    return NextResponse.json(produit)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE — Supprimer un produit
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ message: 'Produit supprimé' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}