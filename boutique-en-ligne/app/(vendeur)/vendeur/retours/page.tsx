'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type FinalDecision = 'Refund' | 'Exchange' | 'Repair' | 'Reject'

interface Return {
  id:               string
  returnReason:     string
  returnStatus:     string
  description:      string | null
  createdAt:        string
  daysToReturn:     number
  mlDecision:       string | null
  mlConfidence:     number | null
  mlDecisionLabel:  string | null
  mlProbabilities:  Record<string, number> | null
  fraudScore:       number | null
  // Décision finale humaine
  finalDecision:    string | null
  finalNote:        string | null
  flowmerceClaimId: string | null
  product: { id: string; nom: string; images: string[] }
  user: {
    nom: string; prenom: string; email: string | null; telephone: string | null
    // ← AJOUT compteurs client
    _count: { orders: number; returns: number }
  }
  order: { id: string; statut: string; createdAt: string }
}

const raisonLabel: Record<string, string> = {
  DEFECTUEUX:      '⚠️ Défectueux',
  MAUVAIS_ARTICLE: '📦 Mauvais article',
  CHANGEMENT_AVIS: "💭 Changement d'avis",
  NON_CONFORME:    '🔍 Non conforme',
}

const statutConfig: Record<string, { label: string; color: string; emoji: string }> = {
  EN_ATTENTE: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300', emoji: '⏳' },
  APPROUVE:   { label: 'Approuvé',   color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',     emoji: '✅' },
  REFUSE:     { label: 'Refusé',     color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',             emoji: '❌' },
  REMBOURSE:  { label: 'Remboursé',  color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',         emoji: '💰' },
}

const resolutionConfig: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  Refund:   { label: 'Remboursement', emoji: '💰', color: 'text-green-700 dark:text-green-400',   bg: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'   },
  Exchange: { label: 'Échange',       emoji: '🔄', color: 'text-blue-700 dark:text-blue-400',     bg: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'         },
  Repair:   { label: 'Réparation',    emoji: '🔧', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800' },
  Reject:   { label: 'Refus',         emoji: '⚠️', color: 'text-red-600 dark:text-red-400',       bg: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'             },
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// ── Badge retours/commandes ────────────────────────────────────────────────
function ClientRetoursBadge({ returns, orders }: { returns: number; orders: number }) {
  const ratio = orders > 0 ? returns / orders : 0
  const isAlert = returns >= 3 || ratio >= 0.4
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
      isAlert
        ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'
        : returns > 0
          ? 'bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
    }`}>
      🔄 {returns}/{orders}
    </span>
  )
}

// ── Badge score de fraude ─────────────────────────────────────────────────
function FraudBadge({ score }: { score: number | null }) {
  if (score === null) return null
  if (score <= 30) return null // score faible, pas d'affichage
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
      score > 70
        ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'
        : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
    }`}>
      {score > 70 ? '🚨' : '⚠️'} Fraude {score.toFixed(0)}%
    </span>
  )
}

export default function VendeurRetoursPage() {
  const [retours,        setRetours]        = useState<Return[]>([])
  const [loading,        setLoading]        = useState(true)
  const [searching,      setSearching]      = useState(false)
  const [statut,         setStatut]         = useState('')
  const [search,         setSearch]         = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [categories,     setCategories]     = useState<{ id: string; nom: string }[]>([])
  const [selected,       setSelected]       = useState<Return | null>(null)
  const [updating,       setUpdating]       = useState(false)
  const [updateMsg,      setUpdateMsg]      = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const [showOverride,     setShowOverride]     = useState(false)
  const [overrideDecision, setOverrideDecision] = useState<FinalDecision | ''>('')
  const [overrideNote,     setOverrideNote]     = useState('')

  const debouncedSearch = useDebounce(search, 350)
  const abortRef        = useRef<AbortController | null>(null)

  const fetchData = useCallback(async (isDebounce = false) => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()
    isDebounce ? setSearching(true) : setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statut)          params.set('statut',     statut)
      if (debouncedSearch) params.set('search',     debouncedSearch)
      if (filterCategory)  params.set('categoryId', filterCategory)
      const res = await fetch(`/api/vendeur/retours?${params}`, { signal: abortRef.current.signal })
      if (res.ok) setRetours(await res.json())
    } catch (e: any) {
      if (e.name !== 'AbortError') console.error(e)
    } finally { setLoading(false); setSearching(false) }
  }, [statut, debouncedSearch, filterCategory])

  const fetchCategories = async () => {
    const res = await fetch('/api/vendeur/categories')
    if (res.ok) { const d = await res.json(); setCategories(d.approuvees || []) }
  }

  useEffect(() => { fetchCategories() }, [])
  useEffect(() => { fetchData(!!debouncedSearch) }, [fetchData])

  const openModal = (retour: Return) => {
    setSelected(retour)
    setUpdateMsg(null)
    setShowOverride(false)
    setOverrideDecision('')
    setOverrideNote('')
  }

  const handleDecision = async (
    id:            string,
    action:        'APPROVE_ML' | 'OVERRIDE',
    finalDecision: FinalDecision | null,
    note:          string | null
  ) => {
    if (action === 'OVERRIDE') {
      if (!finalDecision) {
        setUpdateMsg({ type: 'err', text: 'Veuillez sélectionner une décision.' })
        return
      }
      if (finalDecision === 'Reject' && (!note || note.trim().length < 10)) {
        setUpdateMsg({ type: 'err', text: 'Le motif est obligatoire pour un Refus (min. 10 caractères).' })
        return
      }
    }

    setUpdating(true)
    setUpdateMsg(null)
    try {
      const res = await fetch(`/api/vendeur/retours/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action, finalDecision, vendeurNote: note }),
      })
      const data = await res.json()

      if (!res.ok) {
        setUpdateMsg({ type: 'err', text: data.error || 'Erreur lors de la mise à jour' })
        return
      }

      const decisionLabel = resolutionConfig[data.finalDecision]?.label ?? data.finalDecision
      const syncMsg       = data.synced ? ' — synchronisé avec Flowmerce ✓' : ''
      setUpdateMsg({
        type: 'ok',
        text: action === 'APPROVE_ML'
          ? `Recommandation ML appliquée : ${decisionLabel}${syncMsg}`
          : `Décision manuelle : ${decisionLabel}${syncMsg}`,
      })

      setRetours(prev => prev.map(r =>
        r.id === id
          ? { ...r, returnStatus: data.retour.returnStatus, finalDecision: data.retour.finalDecision, finalNote: data.retour.finalNote }
          : r
      ))
      if (selected?.id === id) {
        setSelected(prev => prev ? {
          ...prev,
          returnStatus:  data.retour.returnStatus,
          finalDecision: data.retour.finalDecision,
          finalNote:     data.retour.finalNote,
        } : null)
      }

      setShowOverride(false)
      setOverrideDecision('')
      setOverrideNote('')
      fetchData()
    } catch {
      setUpdateMsg({ type: 'err', text: 'Erreur réseau' })
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Mes Retours</h1>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {searching ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : '🔍'}
          </span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Produit, client, email, téléphone..."
            className="w-full pl-9 pr-3 border border-gray-200 dark:border-gray-700 rounded-xl py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
          )}
        </div>

        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400">
          <option value="">🏷️ Toutes les catégories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
        </select>

        <select value={statut} onChange={e => setStatut(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none">
          <option value="">Tous les statuts</option>
          {Object.entries(statutConfig).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
        </select>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Chargement...</div>
      ) : retours.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {search ? `Aucun résultat pour "${search}"` : 'Aucun retour trouvé'}
        </div>
      ) : (
        <div className="space-y-3">
          {retours.map(r => {
            const sc    = statutConfig[r.returnStatus] || { label: r.returnStatus, color: '', emoji: '' }
            const mlRes = r.mlDecision    ? resolutionConfig[r.mlDecision]    : null
            const finR  = r.finalDecision ? resolutionConfig[r.finalDecision] : null
            return (
              <div key={r.id} onClick={() => openModal(r)}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                <div className="flex items-start gap-3">
                  {r.product.images[0] && (
                    <img src={r.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{r.product.nom}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        {r.returnStatus === 'EN_ATTENTE' && (
                          <span className="text-xs bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium animate-pulse">
                            Action requise
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc.color}`}>
                          {sc.emoji} {sc.label}
                        </span>
                      </div>
                    </div>

                    {/* Nom client + raison */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {r.user.prenom} {r.user.nom}
                      {r.user.telephone && <span className="ml-1 text-emerald-600 dark:text-emerald-400">· {r.user.telephone}</span>}
                      {' — '}{raisonLabel[r.returnReason] || r.returnReason}
                    </p>

                    {/* ← AJOUT : retours/commandes + score fraude */}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <ClientRetoursBadge returns={r.user._count?.returns ?? 0} orders={r.user._count?.orders ?? 0} />
                      <FraudBadge score={r.fraudScore} />
                    </div>

                    {/* Décision ML (label uniquement, sans probabilités) */}
                    <div className="flex items-center gap-2 mt-0.5">
                      {mlRes && r.mlConfidence !== null && (
                        <p className={`text-xs ${mlRes.color}`}>
                          {mlRes.emoji} ML : {mlRes.label}
                          <span className="ml-1 text-gray-400">({r.mlConfidence.toFixed(1)}%)</span>
                        </p>
                      )}
                      {finR && (
                        <p className={`text-xs font-bold ${finR.color}`}>→ {finR.emoji} {finR.label}</p>
                      )}
                    </div>

                    <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString('fr-DZ')}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Modal détail + décision ─────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Dossier retour</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selected.user.prenom} {selected.user.nom}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl">✕</button>
            </div>

            <div className="p-5 space-y-4">

              {/* Statut actuel */}
              {(() => {
                const sc = statutConfig[selected.returnStatus] || { label: selected.returnStatus, color: '', emoji: '' }
                return (
                  <div className={`${sc.color} rounded-xl p-3 flex items-center gap-2`}>
                    <span>{sc.emoji}</span>
                    <span className="text-sm font-semibold">{sc.label}</span>
                    {selected.flowmerceClaimId && (
                      <span className="ml-auto text-xs opacity-70">⟷ Flowmerce</span>
                    )}
                  </div>
                )
              })()}

              {/* Info produit */}
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                {selected.product.images[0] && (
                  <img src={selected.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0" />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{selected.product.nom}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {raisonLabel[selected.returnReason]} — J+{selected.daysToReturn}
                  </p>
                </div>
              </div>

              {/* Info client + compteurs */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">👤 Client</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {selected.user.prenom} {selected.user.nom}
                </p>
                {selected.user.email     && <p className="text-xs text-gray-500">{selected.user.email}</p>}
                {selected.user.telephone && <p className="text-xs text-gray-500">{selected.user.telephone}</p>}
                {/* ← AJOUT : retours/commandes + score fraude dans le modal */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <ClientRetoursBadge
                    returns={selected.user._count?.returns ?? 0}
                    orders={selected.user._count?.orders  ?? 0}
                  />
                  <FraudBadge score={selected.fraudScore} />
                </div>
              </div>

              {/* Description */}
              {selected.description && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">📝 Description</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">{selected.description}</p>
                </div>
              )}

              {/* Recommandation ML — confiance uniquement, sans barres de probabilités */}
              {selected.mlDecision && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">🤖 Recommandation ML</p>
                  </div>
                  <div className="p-4">
                    {(() => {
                      const res = resolutionConfig[selected.mlDecision] || resolutionConfig.Reject
                      return (
                        <>
                          <p className={`text-sm font-bold mb-1 ${res.color}`}>
                            {res.emoji} {selected.mlDecisionLabel || res.label}
                          </p>
                          {/* ← Confiance conservée, probabilités masquées */}
                          {selected.mlConfidence !== null && (
                            <p className="text-xs text-gray-500">
                              Confiance : <span className="font-semibold text-gray-700 dark:text-gray-300">{selected.mlConfidence.toFixed(1)}%</span>
                            </p>
                          )}
                          {/* mlProbabilities intentionnellement masqué côté vendeur */}
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}

              {/* Décision finale déjà prise */}
              {selected.finalDecision && (
                <div className={`rounded-xl p-3 border ${resolutionConfig[selected.finalDecision]?.bg}`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">✅ Décision finale</p>
                  <p className={`font-bold text-sm ${resolutionConfig[selected.finalDecision]?.color}`}>
                    {resolutionConfig[selected.finalDecision]?.emoji} {resolutionConfig[selected.finalDecision]?.label}
                  </p>
                  {selected.finalNote && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">"{selected.finalNote}"</p>
                  )}
                </div>
              )}

              {/* Feedback */}
              {updateMsg && (
                <div className={`border rounded-xl px-4 py-3 text-sm ${
                  updateMsg.type === 'ok'
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                    : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                }`}>
                  {updateMsg.text}
                </div>
              )}

              {/* ── Zone de décision (seulement si EN_ATTENTE) ─────────────── */}
              {selected.returnStatus === 'EN_ATTENTE' && (
                <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Votre décision
                    {selected.flowmerceClaimId && (
                      <span className="text-xs text-blue-500 dark:text-blue-400 ml-2 font-normal">
                        (sera synchronisée avec Flowmerce)
                      </span>
                    )}
                  </p>

                  {selected.mlDecision ? (
                    <button
                      onClick={() => handleDecision(selected.id, 'APPROVE_ML', null, null)}
                      disabled={updating}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition text-sm"
                    >
                      {updating && !showOverride ? <span className="animate-spin">⟳</span> : null}
                      ✅ Appliquer la recommandation ML —&nbsp;
                      {resolutionConfig[selected.mlDecision]?.emoji}&nbsp;
                      {resolutionConfig[selected.mlDecision]?.label}
                    </button>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Aucune recommandation ML pour ce retour.</p>
                  )}

                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowOverride(v => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <span>❌ Choisir une décision différente</span>
                      <span className="text-xs text-gray-400">{showOverride ? '▲' : '▼'}</span>
                    </button>

                    {showOverride && (
                      <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div className="grid grid-cols-2 gap-2">
                          {(['Refund', 'Exchange', 'Repair', 'Reject'] as FinalDecision[]).map(opt => {
                            const cfg        = resolutionConfig[opt]
                            const isSelected = overrideDecision === opt
                            return (
                              <button
                                key={opt}
                                onClick={() => { setOverrideDecision(opt); setUpdateMsg(null) }}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition ${
                                  isSelected
                                    ? `border-gray-600 dark:border-gray-300 bg-white dark:bg-gray-900 ${cfg.color}`
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                                }`}
                              >
                                <span>{cfg.emoji}</span>
                                <span>{cfg.label}</span>
                                {isSelected && <span className="ml-auto text-xs">✓</span>}
                              </button>
                            )
                          })}
                        </div>

                        {overrideDecision === 'Reject' && (
                          <div>
                            <label className="block text-xs font-medium text-red-600 dark:text-red-400 mb-1">
                              ⚠️ Motif du refus (obligatoire, min. 10 car.)
                            </label>
                            <textarea
                              value={overrideNote}
                              onChange={e => { setOverrideNote(e.target.value); setUpdateMsg(null) }}
                              placeholder="Ex : délai dépassé, produit ouvert, non conforme à la politique..."
                              rows={3}
                              className={`w-full border rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-2 dark:bg-gray-900 dark:text-gray-100 ${
                                overrideNote.trim().length < 10
                                  ? 'border-red-300 dark:border-red-700 focus:ring-red-400'
                                  : 'border-gray-300 dark:border-gray-600 focus:ring-gray-500'
                              }`}
                            />
                            <p className={`text-xs mt-0.5 ${overrideNote.trim().length >= 10 ? 'text-gray-400' : 'text-red-500'}`}>
                              {overrideNote.trim().length}/10 min.
                            </p>
                          </div>
                        )}

                        {overrideDecision && overrideDecision !== 'Reject' && (
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                              Note (optionnel)
                            </label>
                            <input
                              type="text"
                              value={overrideNote}
                              onChange={e => setOverrideNote(e.target.value)}
                              placeholder="Justification..."
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-900 dark:text-gray-100"
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleDecision(selected.id, 'OVERRIDE', overrideDecision as FinalDecision, overrideNote || null)}
                          disabled={updating || !overrideDecision}
                          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition"
                        >
                          {updating && showOverride ? <span className="animate-spin">⟳</span> : null}
                          Confirmer cette décision
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button onClick={() => setSelected(null)}
                className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}