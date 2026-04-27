import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const vendeur = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
  })
  if (!vendeur || vendeur.statut !== 'APPROUVE') {
    return NextResponse.json({ error: 'Compte non approuvé' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const statut     = searchParams.get('statut')
  const search     = searchParams.get('search') || ''
  const categoryId = searchParams.get('categoryId')

  const where: any = { product: { vendeurId: vendeur.id } }

  if (statut) where.returnStatus = statut

  if (categoryId) {
    where.product = { ...where.product, categoryId }
  }

  if (search) {
    where.OR = [
      { product: { nom:       { contains: search, mode: 'insensitive' } } },
      { user:    { nom:       { contains: search, mode: 'insensitive' } } },
      { user:    { prenom:    { contains: search, mode: 'insensitive' } } },
      { user:    { email:     { contains: search, mode: 'insensitive' } } },
      { user:    { telephone: { contains: search, mode: 'insensitive' } } },
    ]
  }

  const retours = await prisma.return.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      product: { select: { id: true, nom: true, images: true } },
      user: {
        select: {
          id:        true,
          nom:       true,
          prenom:    true,
          email:     true,
          telephone: true,
          // ← AJOUT : compteurs pour afficher nbr retours / nbr commandes
          _count: {
            select: {
              orders:  true,
              returns: true,
            },
          },
        },
      },
      order: { select: { id: true, statut: true, createdAt: true } },
    },
  })

  return NextResponse.json(retours)
}