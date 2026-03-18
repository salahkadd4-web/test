import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

async function checkAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  return token?.role === 'ADMIN' ? token : null
}

// PUT — Modifier une catégorie
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const { nom, description, image } = await req.json()

    if (!nom) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })

    const category = await prisma.category.update({
      where: { id },
      data: { nom, description: description || null, image: image || null },
    })

    return NextResponse.json(category)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE — Supprimer une catégorie
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params

    // Vérifier si la catégorie a des produits
    const count = await prisma.product.count({ where: { categoryId: id } })
    if (count > 0) {
      return NextResponse.json(
        { error: `Impossible de supprimer : ${count} produit(s) dans cette catégorie` },
        { status: 400 }
      )
    }

    await prisma.category.delete({ where: { id } })

    return NextResponse.json({ message: 'Catégorie supprimée' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}