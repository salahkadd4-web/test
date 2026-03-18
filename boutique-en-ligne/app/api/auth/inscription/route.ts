import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sendOTP, verifyOTP, validatePhone } from '@/lib/twilio'
import { sendResetEmail } from '@/lib/mail'
import { sendConfirmationEmail } from '@/lib/mail'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { nom, prenom, email, telephone, motDePasse, etape, code } = await req.json()

    // ─── Étape 1 : Envoi du code ───
    if (etape === 1 || !etape) {

      if (!nom || !prenom || !motDePasse) {
        return NextResponse.json(
          { error: 'Nom, prénom et mot de passe sont obligatoires' },
          { status: 400 }
        )
      }

      if (!email && !telephone) {
        return NextResponse.json(
          { error: 'Email ou téléphone est obligatoire' },
          { status: 400 }
        )
      }

      // Inscription par email
      if (email) {
        const existingEmail = await prisma.user.findUnique({ where: { email } })
        if (existingEmail) {
          return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 })
        }

        // Générer un code OTP et l'envoyer par email
        const otpCode = crypto.randomInt(100000, 999999).toString()

        // Stocker temporairement dans un token avec préfixe EMAIL_OTP
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        // Supprimer les anciens tokens OTP pour cet email
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
        if (!validatePhone(telephone)) {
          return NextResponse.json(
            { error: 'Numéro invalide. Format: 05XX XX XX XX, 06XX XX XX XX ou 07XX XX XX XX' },
            { status: 400 }
          )
        }

        const existingPhone = await prisma.user.findUnique({ where: { telephone } })
        if (existingPhone) {
          return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 })
        }

        // Supprimer les anciens tokens OTP pour ce téléphone
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

    // ─── Étape 2 : Vérification OTP et création du compte ───
    if (etape === 2) {
      const identifiant = email || telephone

      if (!identifiant || !code) {
        return NextResponse.json({ error: 'Code requis' }, { status: 400 })
      }

      const otpToken = await prisma.otpToken.findFirst({
        where: {
          identifiant,
          expiresAt: { gt: new Date() },
        },
      })

      if (!otpToken) {
        return NextResponse.json({ error: 'Session expirée, recommencez' }, { status: 400 })
      }

      // Vérification email
      if (email) {
        if (otpToken.token !== code) {
          return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 })
        }
      }

      // Vérification téléphone via Twilio
      if (telephone) {
        const isValid = await verifyOTP(telephone, code)
        if (!isValid) {
          return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 })
        }
      }

      // Récupérer les données sauvegardées
      const savedData = JSON.parse(otpToken.data)
      const hashedPassword = await bcrypt.hash(savedData.motDePasse, 10)

      await prisma.user.create({
        data: {
          nom: savedData.nom,
          prenom: savedData.prenom,
          email: savedData.email || null,
          telephone: savedData.telephone || null,
          motDePasse: hashedPassword,
        },
      })

      // Supprimer le token OTP
      await prisma.otpToken.delete({ where: { id: otpToken.id } })

      return NextResponse.json({ message: 'Compte créé avec succès' }, { status: 201 })
    }

    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  } catch (error) {
    console.error('Erreur inscription:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}