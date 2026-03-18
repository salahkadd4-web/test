import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendResetEmail } from '@/lib/mail'
import { sendOTP } from '@/lib/twilio'

export async function POST(req: NextRequest) {
  try {
    const { identifiant } = await req.json()

    if (!identifiant) {
      return NextResponse.json({ error: 'Email ou téléphone requis' }, { status: 400 })
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
      return NextResponse.json({ message: 'Code envoyé si le compte existe' })
    }

    // Invalider tous les anciens tokens
    await prisma.resetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    })

    if (user.email && identifiant === user.email) {
      // Envoi par email
      const crypto = await import('crypto')
      const code = crypto.randomInt(100000, 999999).toString()
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

      await prisma.resetToken.create({
        data: { token: code, userId: user.id, expiresAt },
      })

      await sendResetEmail(user.email, code)

    } else if (user.telephone && identifiant === user.telephone) {
      // Envoi par SMS via Twilio Verify
      await sendOTP(user.telephone)

      // Token unique par userId + timestamp
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
      const uniqueToken = `TWILIO_${user.id}_${Date.now()}`

      await prisma.resetToken.create({
        data: { token: uniqueToken, userId: user.id, expiresAt },
      })
    }

    return NextResponse.json({ message: 'Code envoyé si le compte existe' })
  } catch (error) {
    console.error('Erreur reset demande:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}