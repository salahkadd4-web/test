import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { pusherServer } from '@/lib/pusher'
import { getAuthToken } from '@/lib/getAuthToken'

// GET — Récupérer les messages du client connecté
export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const messages = await prisma.message.findMany({
      where: { userId: token.id as string },
      orderBy: { createdAt: 'asc' },
    })

    // Marquer les messages admin comme lus
    await prisma.message.updateMany({
      where: { userId: token.id as string, isAdmin: true, lu: false },
      data: { lu: true },
    })

    return NextResponse.json(messages)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST — Envoyer un message (client)
export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { contenu } = await req.json()
    if (!contenu?.trim()) {
      return NextResponse.json({ error: 'Message vide' }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        contenu,
        userId: token.id as string,
        isAdmin: false,
      },
    })

    // Envoyer via Pusher
    await pusherServer.trigger(
      `chat-${token.id}`,
      'nouveau-message',
      message
    )

    // Notifier l'admin
    await pusherServer.trigger('admin-notifications', 'nouveau-message', {
      userId: token.id,
      message,
    })

    return NextResponse.json(message, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}