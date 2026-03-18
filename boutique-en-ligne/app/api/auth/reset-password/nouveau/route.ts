import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { identifiant, nouveauMotDePasse } = await req.json()

    if (!nouveauMotDePasse || nouveauMotDePasse.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifiant },
          { telephone: identifiant },
        ],
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Compte introuvable' }, { status: 400 })
    }

    // Pour email — vérifier le token DB
    if (user.email && identifiant === user.email) {
      const resetToken = await prisma.resetToken.findFirst({
        where: {
          userId: user.id,
          used: false,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: 'desc' },
      })

      if (!resetToken) {
        return NextResponse.json({ error: 'Session expirée, recommencez' }, { status: 400 })
      }

      await prisma.resetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      })
    }

    // Mettre à jour le mot de passe
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { motDePasse: hashedPassword },
    })

    return NextResponse.json({ message: 'Mot de passe mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur reset nouveau:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}