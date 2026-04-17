import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendResetEmail } from '@/lib/mail'
import { sendOTP } from '@/lib/twilio'
import { rateLimit, rateLimits, sanitize } from '@/lib/security'

export async function POST(req: NextRequest) {
  // ── Rate limiting strict — 3 tentatives / heure ───────
  const limited = rateLimit(req, rateLimits.passwordReset)
  if (limited) return limited

  try {
    const body = await req.json()
    const identifiant = sanitize(body.identifiant).toLowerCase()

    if (!identifiant) {
      return NextResponse.json({ error: 'Email ou téléphone requis' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: identifiant }, { telephone: identifiant }] },
    })

    // Réponse identique que l'utilisateur existe ou non
    // (évite l'énumération de comptes)
    if (!user) {
      return NextResponse.json({ message: 'Code envoyé si le compte existe' })
    }

    await prisma.resetToken.updateMany({
      where: { userId: user.id, used: false },
      data:  { used: true },
    })

    // Envoi selon le type d'identifiant
    if (user.email && identifiant === user.email) {
      const token = require('crypto').randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1h

      await prisma.resetToken.create({
        data: { token, userId: user.id, expiresAt },
      })
      await sendResetEmail(user.email, token)
    } else if (user.telephone && identifiant === user.telephone) {
      await sendOTP(user.telephone)
    }

    return NextResponse.json({ message: 'Code envoyé si le compte existe' })
  } catch (error) {
    console.error('Erreur reset password:', error)
    // Réponse générique pour ne pas révéler d'infos
    return NextResponse.json({ message: 'Code envoyé si le compte existe' })
  }
}