import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

async function checkAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  return token?.role === 'ADMIN' ? token : null
}

export async function GET(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const clients = await prisma.user.findMany({
      where: { role: 'CLIENT' },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            orders: true,
            favorites: true,
          },
        },
      },
    })

    return NextResponse.json(clients)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}