import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import VendeurLayoutClient from '@/components/vendeur/VendeurLayoutClient'

// Pas de 'use client' → Server Component : peut faire des appels DB et auth
export default async function VendeurLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Pas connecté ou mauvais rôle → redirection
  if (!session?.user || session.user.role !== 'VENDEUR') {
    redirect('/connexion')
  }

  const vendeur = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
    include: { documents: { orderBy: { createdAt: 'asc' } } },
  })

  if (!vendeur) redirect('/connexion')

  // On passe le statut au client, et on ne transmet les enfants
  // que si le compte est APPROUVE (pour éviter tout rendu de sous-page)
  const showChildren = vendeur.statut === 'APPROUVE'

  return (
    <VendeurLayoutClient
      statut={vendeur.statut}
      adminNote={vendeur.adminNote ?? null}
      nomBoutique={vendeur.nomBoutique ?? null}
      vendeurForDocs={
        vendeur.statut === 'PIECES_REQUISES'
          ? { id: vendeur.id, adminNote: vendeur.adminNote, documents: vendeur.documents }
          : null
      }
    >
      {showChildren ? children : null}
    </VendeurLayoutClient>
  )
}
