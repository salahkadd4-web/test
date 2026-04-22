'use client'

import { useState, useEffect } from 'react'

interface Return {
  id: string; returnReason: string; returnStatus: string
  description: string | null; createdAt: string; daysToReturn: number
  mlDecisionLabel: string | null
  product: { id: string; nom: string; images: string[] }
  user:    { nom: string; prenom: string; email: string | null }
  order:   { id: string; statut: string; createdAt: string }
}

const raisonLabel: Record<string, string> = {
  DEFECTUEUX:       '⚠️ Défectueux',
  MAUVAIS_ARTICLE:  '📦 Mauvais article',
  CHANGEMENT_AVIS:  '💭 Changement d\'avis',
  NON_CONFORME:     '🔍 Non conforme',
}

const statutConfig: Record<string, { label: string; color: string }> = {
  EN_ATTENTE: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' },
  APPROUVE:   { label: 'Approuvé',   color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
  REFUSE:     { label: 'Refusé',     color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' },
  REMBOURSE:  { label: 'Remboursé',  color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' },
}

export default function VendeurRetoursPage() {
  const [retours,   setRetours]   = useState<Return[]>([])
  const [loading,   setLoading]   = useState(true)
  const [statut,    setStatut]    = useState('')
  const [search,    setSearch]    = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [categories, setCategories] = useState<{id:string;nom:string}[]>([])
  const [selected,  setSelected]  = useState<Return | null>(null)

  const fetchData = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statut)         params.set('statut',     statut)
    if (search)         params.set('search',     search)
    if (filterCategory) params.set('categoryId', filterCategory)
    const res = await fetch(`/api/vendeur/retours?${params}`)
    if (res.ok) setRetours(await res.json())
    setLoading(false)
  }

  const fetchCategories = async () => {
    const res = await fetch('/api/vendeur/categories')
    if (res.ok) { const d = await res.json(); setCategories(d.approuvees || []) }
  }

  useEffect(() => { fetchCategories() }, [])
  useEffect(() => { fetchData() }, [statut, filterCategory])

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Mes Retours</h1>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={(e) => { e.preventDefault(); fetchData() }} className="flex gap-2 flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par produit ou client..."
            className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-xl">🔍</button>
        </form>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">🏷️ Toutes les catégories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.nom}</option>
          ))}
        </select>
        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          <option value="">Tous les statuts</option>
          {Object.entries(statutConfig).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Chargement...</div>
      ) : retours.length === 0 ? (
        <div className="text-center py-12 text-gray-400">Aucun retour trouvé</div>
      ) : (
        <div className="space-y-3">
          {retours.map((r) => {
            const sc = statutConfig[r.returnStatus] || { label: r.returnStatus, color: '' }
            return (
              <div
                key={r.id}
                onClick={() => setSelected(r)}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
              >
                <div className="flex items-start gap-3">
                  {r.product.images[0] && (
                    <img src={r.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{r.product.nom}</p>
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${sc.color}`}>
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {r.user.prenom} {r.user.nom} — {raisonLabel[r.returnReason] || r.returnReason}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString('fr-DZ')}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Détail retour */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Détail du retour</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl">✕</button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statutConfig[selected.returnStatus]?.color}`}>
                  {statutConfig[selected.returnStatus]?.label}
                </span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                  {raisonLabel[selected.returnReason] || selected.returnReason}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Produit</p>
                <div className="flex items-center gap-2">
                  {selected.product.images[0] && (
                    <img src={selected.product.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" />
                  )}
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{selected.product.nom}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Client</p>
                <p className="text-sm text-gray-800 dark:text-gray-100">{selected.user.prenom} {selected.user.nom}</p>
                {selected.user.email && <p className="text-xs text-gray-500">{selected.user.email}</p>}
              </div>

              {selected.description && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Description</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{selected.description}</p>
                </div>
              )}

              {selected.mlDecisionLabel && (
                <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">🤖 Analyse IA</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{selected.mlDecisionLabel}</p>
                </div>
              )}

              <p className="text-xs text-gray-400 text-center">
                Demandé le {new Date(selected.createdAt).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}