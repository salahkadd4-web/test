import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sendOTP, verifyOTP, validatePhone } from '@/lib/twilio'
import { sendConfirmationEmail } from '@/lib/mail'
import crypto from 'crypto'
import {
  rateLimit, rateLimits,
  sanitize, isValidEmail, isValidPhone, isStrongPassword,
} from '@/lib/security'

export async function POST(req: NextRequest) {
  // ── Rate limiting — 5 tentatives / 15 min ────────────
  const limited = rateLimit(req, rateLimits.auth)
  if (limited) return limited

  try {
    const body = await req.json()
    const { etape, code } = body

    // Sanitisation
    const nom       = sanitize(body.nom)
    const prenom    = sanitize(body.prenom)
    const email     = body.email    ? sanitize(body.email).toLowerCase()    : null
    const telephone = body.telephone ? sanitize(body.telephone).replace(/\s/g, '') : null
    const motDePasse = typeof body.motDePasse === 'string' ? body.motDePasse : ''

    // ── Étape 1 : Envoi du code ───────────────────────────
    if (etape === 1 || !etape) {

      // Validation champs obligatoires
      if (!nom || !prenom || !motDePasse) {
        return NextResponse.json({ error: 'Nom, prénom et mot de passe sont obligatoires' }, { status: 400 })
      }

      if (nom.length > 50 || prenom.length > 50) {
        return NextResponse.json({ error: 'Nom ou prénom trop long' }, { status: 400 })
      }

      if (!email && !telephone) {
        return NextResponse.json({ error: 'Email ou téléphone est obligatoire' }, { status: 400 })
      }

      // Validation mot de passe fort côté serveur
      if (!isStrongPassword(motDePasse)) {
        return NextResponse.json({
          error: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
        }, { status: 400 })
      }

      // Inscription par email
      if (email) {
        if (!isValidEmail(email)) {
          return NextResponse.json({ error: 'Format email invalide' }, { status: 400 })
        }

        const existingEmail = await prisma.user.findUnique({ where: { email } })
        if (existingEmail) {
          return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 })
        }

        const otpCode = crypto.randomInt(100000, 999999).toString()
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        await prisma.otpToken.deleteMany({ where: { identifiant: email } })
        await prisma.otpToken.create({
          data: {
            identifiant: email,
            token: otpCode,
            expiresAt,
            data: JSON.stringify({ nom, prenom, email, motDePasse }),
          },
        })

        await sendConfirmationEmail(email, otpCode, nom)
        return NextResponse.json({ message: 'Code envoyé par email', requireOTP: true })
      }

      // Inscription par téléphone
      if (telephone) {
        if (!isValidPhone(telephone)) {
          return NextResponse.json({ error: 'Numéro invalide. Format: 05XX XX XX XX' }, { status: 400 })
        }

        const existingPhone = await prisma.user.findUnique({ where: { telephone } })
        if (existingPhone) {
          return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 })
        }

        await prisma.otpToken.deleteMany({ where: { identifiant: telephone } })
        await prisma.otpToken.create({
          data: {
            identifiant: telephone,
            token: 'TWILIO_VERIFY',
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            data: JSON.stringify({ nom, prenom, telephone, motDePasse }),
          },
        })

        await sendOTP(telephone)
        return NextResponse.json({ message: 'Code envoyé par SMS', requireOTP: true })
      }
    }

    // ── Étape 2 : Vérification OTP ────────────────────────
    if (etape === 2) {
      // Rate limiting plus strict sur l'OTP
      const otpLimited = rateLimit(req, rateLimits.otp)
      if (otpLimited) return otpLimited

      const identifiant = email || telephone
      if (!identifiant || !code) {
        return NextResponse.json({ error: 'Code requis' }, { status: 400 })
      }

      // Validation format code OTP (6 chiffres)
      if (!/^\d{6}$/.test(String(code))) {
        return NextResponse.json({ error: 'Code invalide' }, { status: 400 })
      }

      const otpToken = await prisma.otpToken.findFirst({
        where: { identifiant, expiresAt: { gt: new Date() } },
      })

      if (!otpToken) {
        return NextResponse.json({ error: 'Session expirée, recommencez' }, { status: 400 })
      }

      if (email) {
        // Comparaison en temps constant (évite timing attacks)
        const valid = crypto.timingSafeEqual(
          Buffer.from(otpToken.token),
          Buffer.from(String(code))
        )
        if (!valid) {
          return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 })
        }
      }

      if (telephone) {
        const isValid = await verifyOTP(telephone, String(code))
        if (!isValid) {
          return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 })
        }
      }

      const savedData = JSON.parse(otpToken.data)

      // Re-validation du mot de passe avant création
      if (!isStrongPassword(savedData.motDePasse)) {
        return NextResponse.json({ error: 'Mot de passe invalide' }, { status: 400 })
      }

      // Hash avec coût élevé (12)
      const hashedPassword = await bcrypt.hash(savedData.motDePasse, 12)

      await prisma.user.create({
        data: {
          nom:        savedData.nom,
          prenom:     savedData.prenom,
          email:      savedData.email      || null,
          telephone:  savedData.telephone  || null,
          motDePasse: hashedPassword,
        },
      })

      await prisma.otpToken.delete({ where: { id: otpToken.id } })
      return NextResponse.json({ message: 'Compte créé avec succès' }, { status: 201 })
    }

    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  } catch (error) {
    console.error('Erreur inscription:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
