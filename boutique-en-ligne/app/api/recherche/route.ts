import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ categories: [], produits: [] })
  }

  const [categories, produits] = await Promise.all([
    prisma.category.findMany({
      where: { nom: { contains: q, mode: 'insensitive' } },
      take: 4,
      select: { id: true, nom: true, image: true },
    }),
    prisma.product.findMany({
      where: {
        actif: true,
        nom: { contains: q, mode: 'insensitive' },
        vendeur: { prioriteAffichage: { lt: 99 } },
      },
      take: 5,
      orderBy: [{ vendeur: { prioriteAffichage: 'asc' } }],
      select: { id: true, nom: true, images: true, prix: true, category: { select: { nom: true } } },
    }),
  ])

  return NextResponse.json({ categories, produits })
}
