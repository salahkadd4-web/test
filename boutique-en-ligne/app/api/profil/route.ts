import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: token.id as string },
      select: { nom: true, prenom: true, email: true, telephone: true, age: true, genre: true, wilaya: true },
    })

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { nom, prenom, telephone, age, genre, wilaya, motDePasse } = await req.json()

    if (!nom || !prenom) {
      return NextResponse.json({ error: 'Nom et prénom requis' }, { status: 400 })
    }

    // ── Vérification mot de passe obligatoire ──────────────
    if (!motDePasse) {
      return NextResponse.json({ error: 'Mot de passe requis pour confirmer les modifications' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: token.id as string } })
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    const valid = await bcrypt.compare(motDePasse, user.motDePasse)
    if (!valid) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 400 })
    }

    // ── Vérifier unicité du téléphone ──────────────────────
    if (telephone) {
      const existing = await prisma.user.findFirst({
        where: { telephone, NOT: { id: token.id as string } },
      })
      if (existing) return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 })
    }

    const updated = await prisma.user.update({
      where: { id: token.id as string },
      data: {
        nom, prenom,
        telephone: telephone || null,
        age:    age    || null,
        genre:  genre  || null,
        wilaya: wilaya || null,
      },
    })

    return NextResponse.json({ message: 'Profil mis à jour', user: updated })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}