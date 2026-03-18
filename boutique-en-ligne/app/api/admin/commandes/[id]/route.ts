import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

async function checkAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  return token?.role === 'ADMIN' ? token : null
}

// PATCH — Modifier le statut
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const { statut } = await req.json()

    const validStatuts = ['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE', 'ANNULEE']
    if (!validStatuts.includes(statut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }

    const commande = await prisma.order.update({
      where: { id },
      data: { statut },
    })

    return NextResponse.json(commande)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}