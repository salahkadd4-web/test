import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { identifiant } = await req.json()

    if (!identifiant?.trim()) {
      return NextResponse.json({ exists: false })
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email:     identifiant.trim() },
          { telephone: identifiant.trim() },
        ],
      },
      select: { id: true }, // ne retourner que l'id pour la sécurité
    })

    return NextResponse.json({ exists: !!user })
  } catch {
    return NextResponse.json({ exists: false })
  }
}