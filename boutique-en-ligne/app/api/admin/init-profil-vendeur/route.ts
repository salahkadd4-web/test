import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET    → vérifier si le profil vendeur admin existe
 * POST   → créer/mettre à jour (priorité 0, NIVEAU_0 permanent)
 * DELETE → supprimer le profil et l'abonnement admin
 */

// ── GET : vérification ─────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN')
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const profil = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      abonnement: true,
      _count: { select: { products: true } },
    },
  })

  if (!profil)
    return NextResponse.json({ existe: false, message: 'Aucun profil vendeur admin trouvé.' })

  return NextResponse.json({
    existe: true,
    vendeurId:         profil.id,
    nomBoutique:       profil.nomBoutique,
    statut:            profil.statut,
    prioriteAffichage: profil.prioriteAffichage,
    nbProduits:        profil._count.products,
    abonnement: profil.abonnement
      ? {
          niveau:  profil.abonnement.niveau,
          statut:  profil.abonnement.statut,
          dateFin: profil.abonnement.dateFin,
        }
      : null,
  })
}

// ── POST : créer / mettre à jour ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN')
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const adminId = session.user.id
  const dateFin = new Date('2099-12-31T23:59:59Z')

  const profilExistant = await prisma.vendeurProfile.findUnique({
    where: { userId: adminId },
    include: { abonnement: true },
  })

  if (profilExistant) {
    await prisma.$transaction([
      prisma.vendeurProfile.update({
        where: { userId: adminId },
        data: {
          prioriteAffichage: 0,
          statut: 'APPROUVE',
          nomBoutique: profilExistant.nomBoutique ?? 'CabaStore Officiel',
        },
      }),
      ...(profilExistant.abonnement
        ? [prisma.abonnement.update({
            where: { vendeurId: profilExistant.id },
            data: { niveau: 'NIVEAU_0', statut: 'ACTIF', dateFin, periodicite: null },
          })]
        : [prisma.abonnement.create({
            data: {
              vendeurId: profilExistant.id,
              niveau: 'NIVEAU_0',
              statut: 'ACTIF',
              dateDebut: new Date(),
              dateFin,
            },
          })]),
    ])
    return NextResponse.json({
      message: 'Profil admin mis à jour : prioriteAffichage = 0, NIVEAU_0 permanent.',
      vendeurId: profilExistant.id,
    })
  }

  const nouveauProfil = await prisma.vendeurProfile.create({
    data: {
      userId: adminId,
      statut: 'APPROUVE',
      nomBoutique: 'CabaStore Officiel',
      description: 'Boutique officielle CabaStore',
      prioriteAffichage: 0,
      abonnement: {
        create: {
          niveau: 'NIVEAU_0',
          statut: 'ACTIF',
          dateDebut: new Date(),
          dateFin,
        },
      },
    },
  })

  return NextResponse.json({
    message: 'Profil vendeur admin créé avec succès : prioriteAffichage = 0, NIVEAU_0 permanent.',
    vendeurId: nouveauProfil.id,
  })
}

// ── DELETE : supprimer ─────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN')
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const profil = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      abonnement: { include: { paiements: true } },
      _count: { select: { products: true } },
    },
  })

  if (!profil)
    return NextResponse.json({ error: 'Aucun profil vendeur admin à supprimer.' }, { status: 404 })

  if (profil._count.products > 0) {
    return NextResponse.json({
      error: `Impossible : ${profil._count.products} produit(s) lié(s) à ce profil. Supprimez-les d'abord.`,
    }, { status: 400 })
  }

  // Supprimer dans l'ordre : paiements → abonnement → profil
  await prisma.$transaction(async (tx) => {
    if (profil.abonnement) {
      if (profil.abonnement.paiements.length > 0)
        await tx.paiement.deleteMany({ where: { abonnementId: profil.abonnement.id } })
      await tx.abonnement.delete({ where: { id: profil.abonnement.id } })
    }
    await tx.vendeurProfile.delete({ where: { id: profil.id } })
  })

  return NextResponse.json({ message: 'Profil vendeur admin supprimé avec succès.' })
}