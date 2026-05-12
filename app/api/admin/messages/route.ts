import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

// GET — Liste des conversations
export async function GET(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    // Récupérer tous les clients qui ont envoyé des messages
    const conversations = await prisma.user.findMany({
      where: {
        role: 'CLIENT',
        messages: { some: {} },
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: {
              where: { lu: false, isAdmin: false },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(conversations)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
