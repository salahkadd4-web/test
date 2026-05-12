import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { pusherServer } from '@/lib/pusher'
import { getAuthToken } from '@/lib/getAuthToken'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

// GET — Messages d'un client
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { userId } = await params

    const messages = await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    // Marquer les messages client comme lus
    await prisma.message.updateMany({
      where: { userId, isAdmin: false, lu: false },
      data: { lu: true },
    })

    return NextResponse.json(messages)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST — Répondre à un client
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { userId } = await params
    const { contenu } = await req.json()

    if (!contenu?.trim()) {
      return NextResponse.json({ error: 'Message vide' }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        contenu,
        userId,
        isAdmin: true,
      },
    })

    // Envoyer via Pusher au client
    await pusherServer.trigger(
      `chat-${userId}`,
      'nouveau-message',
      message
    )

    return NextResponse.json(message, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
