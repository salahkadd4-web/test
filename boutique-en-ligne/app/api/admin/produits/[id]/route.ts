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

    const newStock = parseInt(stock)

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
      },
    })

    return NextResponse.json(produit)
  } catch (error) {
    console.error('Erreur modification produit:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PATCH — Activer / Désactiver un produit
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