import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import bcrypt from 'bcryptjs'

const rules = [
  (p: string) => p.length >= 8,
  (p: string) => /[A-Z]/.test(p),
  (p: string) => /[a-z]/.test(p),
  (p: string) => /[0-9]/.test(p),
  (p: string) => /[^A-Za-z0-9]/.test(p),
]

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { motDePasseActuel, nouveauMotDePasse } = await req.json()

    if (!motDePasseActuel || !nouveauMotDePasse) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    if (!rules.every(r => r(nouveauMotDePasse))) {
      return NextResponse.json({ error: 'Le nouveau mot de passe ne respecte pas les conditions' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: token.id as string } })
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    const valid = await bcrypt.compare(motDePasseActuel, user.motDePasse)
    if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 })

    const hashed = await bcrypt.hash(nouveauMotDePasse, 10)
    await prisma.user.update({ where: { id: token.id as string }, data: { motDePasse: hashed } })

    return NextResponse.json({ message: 'Mot de passe modifié avec succès' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}