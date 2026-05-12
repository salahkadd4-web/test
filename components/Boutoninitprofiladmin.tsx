'use client'

import { useState } from 'react'
import { CheckCircle2, Shield, Trash2 } from 'lucide-react'

interface ProfilInfo {
  existe: boolean
  vendeurId?: string
  nomBoutique?: string
  statut?: string
  prioriteAffichage?: number
  nbProduits?: number
  abonnement?: {
    niveau: string
    statut: string
    dateFin: string
  } | null
  message?: string
}

/**
 * Bloc à placer dans /admin/page.tsx ou /admin/vendeurs/page.tsx.
 * Permet de vérifier, créer et supprimer le profil vendeur admin (priorité 0).
 */
export default function BoutonInitProfilAdmin() {
  const [loading,  setLoading]  = useState(false)
  const [info,     setInfo]     = useState<ProfilInfo | null>(null)
  const [toast,    setToast]    = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)

  function showToast(msg: string, type: 'ok' | 'err') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  async function verifier() {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/init-profil-vendeur')
      const data = await res.json()
      setInfo(data)
    } catch {
      showToast('Erreur lors de la vérification.', 'err')
    } finally {
      setLoading(false)
    }
  }

  async function initialiser() {
    if (!confirm('Créer / mettre à jour le profil vendeur admin (priorité 0) ?')) return
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/init-profil-vendeur', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast(data.message, 'ok')
      setInfo(null) // reset pour recharger via "Vérifier"
    } catch (e: any) {
      showToast(e.message, 'err')
    } finally {
      setLoading(false)
    }
  }

  async function supprimer() {
    if (!confirm('⚠️ Supprimer le profil vendeur admin ? Les produits liés doivent être supprimés d\'abord.')) return
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/init-profil-vendeur', { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast(data.message, 'ok')
      setInfo(null)
    } catch (e: any) {
      showToast(e.message, 'err')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-purple-200 dark:border-purple-800 rounded-xl p-4 bg-purple-50 dark:bg-purple-950/30 space-y-3 max-w-lg">
      <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
        <Shield className="w-4 h-4" /> Profil vendeur admin (Priorité 0)
      </h3>

      {/* Boutons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={verifier}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-400 text-purple-700 dark:text-purple-300 text-sm hover:bg-purple-100 dark:hover:bg-purple-900 disabled:opacity-50 transition"
        >
          <CheckCircle2 className="w-4 h-4" />
          Vérifier
        </button>

        <button
          onClick={initialiser}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm disabled:opacity-50 transition"
        >
          <Shield className="w-4 h-4" />
          {info?.existe ? 'Mettre à jour' : 'Initialiser'}
        </button>

        {info?.existe && (
          <button
            onClick={supprimer}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm disabled:opacity-50 transition"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        )}
      </div>

      {/* Résultat vérification */}
      {info && (
        <div className="text-xs rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 space-y-1">
          {info.existe ? (
            <>
              <p><span className="text-gray-500">Statut :</span> <span className="font-medium text-green-600">✅ Profil existant</span></p>
              <p><span className="text-gray-500">Boutique :</span> <span className="font-medium">{info.nomBoutique}</span></p>
              <p><span className="text-gray-500">Priorité :</span> <span className="font-medium">{info.prioriteAffichage}</span> {info.prioriteAffichage === 0 && '✅'}</p>
              <p><span className="text-gray-500">Produits liés :</span> <span className="font-medium">{info.nbProduits}</span></p>
              {info.abonnement && (
                <>
                  <p><span className="text-gray-500">Abonnement :</span> <span className="font-medium">{info.abonnement.niveau}</span> — {info.abonnement.statut}</p>
                  <p><span className="text-gray-500">Date fin :</span> <span className="font-medium">{new Date(info.abonnement.dateFin).toLocaleDateString('fr-DZ')}</span></p>
                </>
              )}
              <p><span className="text-gray-500">ID vendeur :</span> <code className="text-xs text-gray-400">{info.vendeurId}</code></p>
            </>
          ) : (
            <p className="text-orange-600">⚠️ {info.message}</p>
          )}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <p className={`text-sm font-medium ${toast.type === 'ok' ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
          {toast.type === 'ok' ? '✅' : '❌'} {toast.msg}
        </p>
      )}
    </div>
  )
}