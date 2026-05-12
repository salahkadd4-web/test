import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const profile = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      abonnement: {
        include: {
          paiements: { orderBy: { createdAt: 'desc' }, take: 5 },
        },
      },
    },
  })

  if (!profile?.abonnement)
    return NextResponse.json({ error: 'Aucun abonnement trouvé' }, { status: 404 })

  const { abonnement } = profile
  const maintenant = new Date()
  const joursRestants = Math.ceil(
    (new Date(abonnement.dateFin).getTime() - maintenant.getTime()) / (1000 * 60 * 60 * 24)
  )

  return NextResponse.json({
    ...abonnement,
    joursRestants: Math.max(0, joursRestants),
    tarifs: {
      NIVEAU_1: { mensuel: 2500, annuel: 25000 },
      NIVEAU_2: { mensuel: 2000, annuel: 20000 },
      NIVEAU_3: { mensuel: 1500, annuel: 15000 },
    },
  })
}