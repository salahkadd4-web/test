// app/api/auth/google-native/route.ts
//
// Reçoit le idToken émis par le plugin natif @codetrix-studio/capacitor-google-auth,
// le vérifie via Google, crée le compte si nécessaire, et retourne l'userId
// pour que le client puisse ensuite créer une session NextAuth.

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json()

    if (!idToken) {
      return NextResponse.json({ ok: false, error: 'Token manquant.' }, { status: 400 })
    }

    // ── 1. Vérifier le idToken auprès de Google ──────────────────────────────
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    )

    if (!googleRes.ok) {
      return NextResponse.json({ ok: false, error: 'Token Google invalide.' }, { status: 401 })
    }

    const payload = await googleRes.json()

    // Vérifier que le token est bien destiné à notre app
    const validAudiences = [
      process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      process.env.GOOGLE_CLIENT_ID,
    ].filter(Boolean)

    if (!validAudiences.includes(payload.aud)) {
      return NextResponse.json({ ok: false, error: 'Audience invalide.' }, { status: 401 })
    }

    const email: string = payload.email
    const name: string  = payload.name ?? ''

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email introuvable dans le token.' }, { status: 400 })
    }

    // ── 2. Créer le compte si inexistant ─────────────────────────────────────
    let user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
      const parts = name.split(' ')
      user = await prisma.user.create({
        data: {
          email,
          prenom:     parts[0] || '',
          nom:        parts.slice(1).join(' ') || '',
          role:       'CLIENT',
          motDePasse: null,
        },
      })
    }

    // ── 3. Retourner l'userId au client ──────────────────────────────────────
    return NextResponse.json({ ok: true, userId: user.id })

  } catch (err) {
    console.error('[google-native] Erreur:', err)
    return NextResponse.json({ ok: false, error: 'Erreur serveur.' }, { status: 500 })
  }
}