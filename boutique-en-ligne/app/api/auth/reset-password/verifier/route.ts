import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyOTP } from '@/lib/twilio'

export async function POST(req: NextRequest) {
  try {
    const { identifiant, code } = await req.json()

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifiant },
          { telephone: identifiant },
        ],
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Code invalide' }, { status: 400 })
    }

    // Vérification par email (token dans la DB)
    if (user.email && identifiant === user.email) {
      const resetToken = await prisma.resetToken.findFirst({
        where: {
          userId: user.id,
          token: code,
          used: false,
          expiresAt: { gt: new Date() },
        },
      })

      if (!resetToken) {
        return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 })
      }
    }

    // Vérification par téléphone (Twilio Verify)
    if (user.telephone && identifiant === user.telephone) {
      const isValid = await verifyOTP(user.telephone, code)
      if (!isValid) {
        return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 })
      }
    }

    return NextResponse.json({ message: 'Code valide', userId: user.id })
  } catch (error) {
    console.error('Erreur reset vérifier:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}