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

    const commandes = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { nom: true, prenom: true, email: true, telephone: true } },
        items: { include: { product: true } },
      },
    })

    return NextResponse.json(commandes)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}