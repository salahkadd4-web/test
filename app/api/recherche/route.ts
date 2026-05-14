import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ categories: [], produits: [] })
  }

  const [categories, produitsRaw] = await Promise.all([
    prisma.category.findMany({
      where: { nom: { contains: q, mode: 'insensitive' } },
      take: 4,
      select: { id: true, nom: true, image: true },
    }),
    prisma.product.findMany({
      where: {
        actif: true,
        nom: { contains: q, mode: 'insensitive' },
        OR: [
          { vendeurId: null },
          { vendeur: { prioriteAffichage: { lt: 99 } } },
        ],
      },
      // On prend plus pour trier puis limiter à 5
      take: 20,
      // Tri DB par date ; le tri priorité se fait en JS ci-dessous
      orderBy: [{ createdAt: 'desc' }],
      select: {
        id: true,
        nom: true,
        images: true,
        prix: true,
        category: { select: { nom: true } },
        vendeur: { select: { prioriteAffichage: true } },
      },
    }),
  ])

  // Tri priorité applicatif puis limite à 5
  const produits = [...produitsRaw]
    .sort((a, b) => (a.vendeur?.prioriteAffichage ?? 0) - (b.vendeur?.prioriteAffichage ?? 0))
    .slice(0, 5)

  return NextResponse.json({ categories, produits })
}