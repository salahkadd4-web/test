import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: token.id as string },
      select: {
        nom: true, prenom: true, email: true,
        telephone: true, age: true, genre: true, wilaya: true,
      },
    })

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { nom, prenom, telephone, age, genre, wilaya, motDePasse } = await req.json()

    // Validation basique
    if (nom !== undefined && !nom) {
      return NextResponse.json({ error: 'Nom requis' }, { status: 400 })
    }
    if (prenom !== undefined && !prenom) {
      return NextResponse.json({ error: 'Prénom requis' }, { status: 400 })
    }

    // ── Mot de passe requis seulement pour les infos sensibles ──
    const modifieInfosSensibles = nom       !== undefined ||
                                  prenom    !== undefined ||
                                  genre     !== undefined ||
                                  age       !== undefined ||
                                  wilaya    !== undefined

    if (modifieInfosSensibles) {
      if (!motDePasse) {
        return NextResponse.json(
          { error: 'Mot de passe requis pour confirmer les modifications' },
          { status: 400 }
        )
      }

      const user = await prisma.user.findUnique({ where: { id: token.id as string } })
      if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

        if (!user.motDePasse) {
          return NextResponse.json(
            { error: "Compte Google — définissez d'abord un mot de passe dans votre profil" },
            { status: 400 }
          )
      }
      const valid = await bcrypt.compare(motDePasse, user.motDePasse)
      if (!valid) {
        return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 400 })
      }
    }

    // ── Vérifier unicité du téléphone ──────────────────────────
    if (telephone) {
      const existing = await prisma.user.findFirst({
        where: { telephone, NOT: { id: token.id as string } },
      })
      if (existing) {
        return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 })
      }
    }

    // ── Mise à jour partielle — seulement les champs fournis ───
    const updated = await prisma.user.update({
      where: { id: token.id as string },
      data: {
        ...(nom       !== undefined && { nom }),
        ...(prenom    !== undefined && { prenom }),
        ...(telephone !== undefined && { telephone: telephone || null }),
        ...(age       !== undefined && { age: age || null }),
        ...(genre     !== undefined && { genre: genre || null }),
        ...(wilaya    !== undefined && { wilaya: wilaya || null }),
      },
    })

    return NextResponse.json({ message: 'Profil mis à jour', user: updated })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
