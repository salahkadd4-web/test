import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit, rateLimits, sanitize, isValidEmail, isValidPhone } from '@/lib/security'

export async function POST(req: NextRequest) {
  // Rate limiting — 10/min pour la vérification en temps réel
  const limited = rateLimit(req, { maxRequests: 10, windowMs: 60 * 1000 })
  if (limited) return limited

  try {
    const body = await req.json()
    const identifiant = sanitize(body.identifiant).toLowerCase()

    if (!identifiant) {
      return NextResponse.json({ exists: false })
    }

    // Validation format avant toute requête DB
    const isEmail = identifiant.includes('@')
    if (isEmail && !isValidEmail(identifiant)) {
      return NextResponse.json({ exists: false, invalid: true })
    }
    if (!isEmail && !isValidPhone(identifiant)) {
      return NextResponse.json({ exists: false, invalid: true })
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email:     identifiant },
          { telephone: identifiant },
        ],
      },
      select: { id: true },
    })

    return NextResponse.json({ exists: !!user })
  } catch {
    return NextResponse.json({ exists: false })
  }
}
