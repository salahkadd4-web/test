import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const recherche = req.nextUrl.searchParams.get('recherche')?.trim()
  const categorie = req.nextUrl.searchParams.get('categorie')?.trim()

  const produits = await prisma.product.findMany({
    where: {
      actif: true,
      vendeur: { prioriteAffichage: { lt: 99 } },
      ...(categorie ? { categoryId: categorie } : {}),
      ...(recherche ? { nom: { contains: recherche, mode: 'insensitive' } } : {}),
    },
    orderBy: [
      { vendeur: { prioriteAffichage: 'asc' } },
      { createdAt: 'desc' },
    ],
    select: {
      id: true,
      nom: true,
      images: true,
      prix: true,
      stock: true,
      prixVariables: true,
      category: { select: { nom: true } },
      variants: { select: { id: true, couleur: true, nom: true }, orderBy: { createdAt: 'asc' } },
    },
  })

  return NextResponse.json(produits)
}
