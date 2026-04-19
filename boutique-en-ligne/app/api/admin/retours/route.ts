import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken(req)
  return token?.role === 'ADMIN' ? token : null
}

export async function GET(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    // ← PAS de filtre userId — récupère TOUS les retours
    const retours = await prisma.return.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { nom: true, prenom: true, email: true, telephone: true },
        },
        product: {
          select: {
            nom: true, images: true, prix: true,
            category: { select: { nom: true } },
          },
        },
        order: {
          select: {
            id: true, total: true, createdAt: true,
            items: { select: { quantite: true, productId: true } },
          },
        },
      },
    })

    return NextResponse.json(retours)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
