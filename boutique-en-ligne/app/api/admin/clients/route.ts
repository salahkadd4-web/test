import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

export async function GET(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''

    const where: any = { role: 'CLIENT' }
    if (search) {
      where.OR = [
        { nom:       { contains: search, mode: 'insensitive' } },
        { prenom:    { contains: search, mode: 'insensitive' } },
        { email:     { contains: search, mode: 'insensitive' } },
        { telephone: { contains: search, mode: 'insensitive' } },
      ]
    }

    const clients = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            orders:    true,
            favorites: true,
            returns:   true,   // ← FIXÉ : était absent → _count.returns était undefined
          },
        },
        // Score de fraude max parmi les retours du client
        returns: {
          select:   { fraudScore: true },
          orderBy:  { fraudScore: 'desc' },
          take:     1,
        },
      },
    })

    // Aplatir le maxFraudScore pour plus de commodité côté frontend
    const result = clients.map(c => ({
      ...c,
      maxFraudScore: c.returns[0]?.fraudScore ?? null,
      returns: undefined, // on n'expose pas la liste complète ici
    }))

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}