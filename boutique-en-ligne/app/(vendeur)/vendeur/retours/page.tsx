// app/(vendeur)/vendeur/retours/page.tsx — CabaStore
//
// Page des retours du vendeur.
// Redirige vers le portail Flowmerce via un token signé, généré côté serveur.
//
// Flux :
//   1. Récupérer la clé API Flowmerce du vendeur (DB)
//   2. Appeler POST FLOWMERCE_URL/api/vendor-portal/token (serveur → serveur)
//      → La clé API brute N'EST JAMAIS exposée au navigateur
//   3. Afficher le bouton avec le lien tokenisé (valide 1h)

import { auth }     from '@/auth'
import { redirect } from 'next/navigation'
import { prisma }   from '@/lib/prisma'
import Link         from 'next/link'
import { AlertTriangle } from 'lucide-react'

const FLOWMERCE_URL = (process.env.FLOWMERCE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

// ── Appel serveur → serveur pour obtenir le token de portail ──────────────────

async function fetchPortalToken(apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(`${FLOWMERCE_URL}/api/vendor-portal/token`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      // next.js cache : pas de cache — token fresh à chaque visite
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json() as { token?: string }
    return data.token ?? null
  } catch {
    return null
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function VendeurRetoursPage() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') redirect('/connexion')

  const vendeur = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
  })
  if (!vendeur || vendeur.statut !== 'APPROUVE') redirect('/vendeur')

  // ── Génération du lien portail ─────────────────────────────────────────────
  let portalUrl: string | null = null

  if (vendeur.flowmerceApiKey) {
    const token = await fetchPortalToken(vendeur.flowmerceApiKey)
    if (token) {
      portalUrl = `${FLOWMERCE_URL}/vendor-portal?t=${encodeURIComponent(token)}`
    }
  }

  // ── Rendu ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">

      <Link
        href="/vendeur"
        className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mb-8 inline-flex items-center gap-1"
      >
        ← Dashboard
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-10 mt-6">

        {/* Icône */}
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
          ↩
        </div>

        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Gestion des retours
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Les demandes de retour de vos clients sont traitées via{' '}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">Flowmerce</span>.
          {portalUrl
            ? ' Accédez à votre espace dédié pour consulter et gérer vos réclamations.'
            : !vendeur.flowmerceApiKey
              ? " Votre clé API Flowmerce n'est pas encore configurée."
              : ' Impossible de contacter Flowmerce pour le moment.'}
        </p>

        {/* ── Cas 1 : lien généré avec succès ── */}
        {portalUrl && (
          <div className="flex flex-col gap-4">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
            >
              Gérer mes retours
              <span className="text-base">↗</span>
            </a>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Lien sécurisé • valide 1 heure • s&apos;ouvre dans un nouvel onglet
            </p>
          </div>
        )}

        {/* ── Cas 2 : clé API non configurée ── */}
        {!vendeur.flowmerceApiKey && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <p className="text-sm text-orange-700 dark:text-orange-400"><AlertTriangle className="w-4 h-4 inline mr-1" />{' '}Votre accès Flowmerce n&apos;est pas encore activé.
              Contactez l&apos;administrateur de CabaStore.
            </p>
          </div>
        )}

        {/* ── Cas 3 : clé présente mais Flowmerce inaccessible ── */}
        {vendeur.flowmerceApiKey && !portalUrl && (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400"><AlertTriangle className="w-4 h-4 inline mr-1" />{' '}Impossible de générer le lien pour le moment.
              Veuillez réessayer dans quelques instants.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}