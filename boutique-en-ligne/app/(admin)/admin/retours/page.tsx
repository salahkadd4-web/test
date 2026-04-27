'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────────────

type FinalDecision = 'Refund' | 'Exchange' | 'Repair' | 'Reject'

type Return = {
  id:               string
  returnReason:     string
  returnStatus:     string
  daysToReturn:     number
  description:      string | null
  mlDecision:       string | null
  mlConfidence:     number | null
  mlDecisionLabel:  string | null
  mlResponsibility: string | null
  mlProbabilities:  Record<string, number> | null
  fraudScore:       number | null
  // Décision finale humaine (après v2 migration)
  finalDecision:    string | null
  finalNote:        string | null
  flowmerceClaimId: string | null
  flowmerceSynced:  boolean
  createdAt:        string
  user: {
    nom: string; prenom: string; email: string | null; telephone: string | null
    _count: { orders: number; returns: number }   // ← AJOUT compteurs client
  }
  product: {
    nom: string; images: string[]; prix: number
    category: { nom: string }
    vendeur?: { id: string; nomBoutique: string | null } | null
  }
  order: {
    id: string; total: number; createdAt: string
    items: { quantite: number; productId: string }[]
  }
}

type MlStats        = { total_decisions: number; avg_confidence: number; total_alerts: number; fraud_rate_pct: number }
type VendeurOption  = { id: string; nomBoutique: string | null; user: { nom: string; prenom: string } }
type CategoryOption = { id: string; nom: string }

// ── Config ────────────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; color: string; emoji: string }> = {
  EN_ATTENTE: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400', emoji: '⏳' },
  APPROUVE:   { label: 'Approuvé',   color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',     emoji: '✅' },
  REFUSE:     { label: 'Refusé',     color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',             emoji: '❌' },
  REMBOURSE:  { label: 'Remboursé',  color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',         emoji: '💰' },
}

const reasonLabels: Record<string, string> = {
  DEFECTUEUX:      'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:    'Ne correspond pas',
}

const resolutionConfig: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  Refund:   { label: 'Remboursement', emoji: '💰', color: 'text-green-700 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'   },
  Exchange: { label: 'Échange',       emoji: '🔄', color: 'text-blue-700 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'         },
  Repair:   { label: 'Réparation',    emoji: '🔧', color: 'text-orange-700 dark:text-orange-400',bg: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800' },
  Reject:   { label: 'Refus',         emoji: '⚠️', color: 'text-red-700 dark:text-red-400',      bg: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'             },
}

function ProbBar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs font-mono w-20 text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div className="h-full bg-gray-700 dark:bg-gray-300 rounded-full" style={{ width: `${Math.round((value / max) * 100)}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-200 w-12 text-right shrink-0">
        {(value * 100).toFixed(1)}%
      </span>
    </div>
  )
}

// ── Composant principal ───────────────────────────────────────────────────

function AdminRetoursContent() {
  const searchParams = useSearchParams()

  const [retours,        setRetours]        = useState<Return[]>([])
  const [loading,        setLoading]        = useState(true)
  const [selected,       setSelected]       = useState<Return | null>(null)
  const [filterStatus,   setFilterStatus]   = useState(searchParams.get('status') || 'TOUS')
  const [filterVendeur,  setFilterVendeur]  = useState('')
  const [adminOnly,      setAdminOnly]      = useState(false)
  const [filterCategory, setFilterCategory] = useState('')
  const [search,         setSearch]         = useState('')
  const [updating,       setUpdating]       = useState(false)
  const [updateMsg,      setUpdateMsg]      = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  // État pour le panel de décision dans le modal
  const [overrideDecision, setOverrideDecision] = useState<FinalDecision | ''>('')
  const [overrideNote,     setOverrideNote]     = useState('')
  const [showOverride,     setShowOverride]     = useState(false)

  const [vendeurs,   setVendeurs]   = useState<VendeurOption[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [mlStats,    setMlStats]    = useState<MlStats | null>(null)

  useEffect(() => {
    fetchVendeurs(); fetchCategories(); fetchMlStats()
  }, [])

  useEffect(() => { fetchRetours() }, [filterStatus, filterVendeur, filterCategory, adminOnly])

  const fetchVendeurs = async () => {
    const res = await fetch('/api/admin/vendeurs?statut=APPROUVE')
    if (res.ok) setVendeurs(await res.json())
  }

  const fetchCategories = async () => {
    const res = await fetch('/api/admin/categories')
    if (res.ok) {
      const data = await res.json()
      setCategories(data.filter((c: any) => c.statut === 'APPROUVEE'))
    }
  }

  const fetchMlStats = async () => {
    try {
      const res = await fetch('/api/admin/retours/ml-stats')
      if (res.ok) setMlStats(await res.json())
    } catch {}
  }

  const fetchRetours = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filterStatus !== 'TOUS') params.set('statut',     filterStatus)
    if (filterVendeur)           params.set('vendeurId',  filterVendeur)
    if (adminOnly)               params.set('adminOnly',  'true')
    if (filterCategory)          params.set('categoryId', filterCategory)
    if (search)                  params.set('search',     search)
    const res = await fetch(`/api/admin/retours?${params}`)
    if (res.ok) setRetours(await res.json())
    setLoading(false)
  }

  // ── Ouvrir le modal ───────────────────────────────────────────────────
  const openModal = (retour: Return) => {
    setSelected(retour)
    setUpdateMsg(null)
    setOverrideDecision('')
    setOverrideNote('')
    setShowOverride(false)
  }

  // ── Décision admin ─────────────────────────────────────────────────────
  // action = 'APPROVE_ML' : valider la recommandation ML telle quelle
  // action = 'OVERRIDE'   : choisir une résolution différente
  const handleDecision = async (
    id:            string,
    action:        'APPROVE_ML' | 'OVERRIDE',
    finalDecision: FinalDecision | null,
    adminNote:     string | null
  ) => {
    if (action === 'OVERRIDE') {
      if (!finalDecision) {
        setUpdateMsg({ type: 'err', text: 'Veuillez choisir une décision.' })
        return
      }
      if (finalDecision === 'Reject' && (!adminNote || adminNote.trim().length < 10)) {
        setUpdateMsg({ type: 'err', text: 'La note est obligatoire pour un Refus (minimum 10 caractères).' })
        return
      }
    }

    setUpdating(true)
    setUpdateMsg(null)
    try {
      const res = await fetch(`/api/admin/retours/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action, finalDecision, adminNote }),
      })
      const data = await res.json()

      if (!res.ok) {
        setUpdateMsg({ type: 'err', text: data.error || 'Erreur serveur' })
        return
      }

      const decisionLabel = resolutionConfig[data.finalDecision]?.label ?? data.finalDecision
      const syncedMsg     = data.synced ? ' ✓ Synchronisé avec Flowmerce' : ''
      setUpdateMsg({
        type: 'ok',
        text: action === 'APPROVE_ML'
          ? `Décision ML appliquée : ${decisionLabel}${syncedMsg}`
          : `Décision manuelle : ${decisionLabel}${syncedMsg}`,
      })

      // Mettre à jour la liste localement
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

      // Réinitialiser le panel override
      setShowOverride(false)
      setOverrideDecision('')
      setOverrideNote('')
      fetchRetours()
    } catch {
      setUpdateMsg({ type: 'err', text: 'Erreur réseau' })
    } finally {
      setUpdating(false)
    }
  }

  const filtered = retours.filter(r => {
    if (!search) return true
    return (r.user.nom + ' ' + r.user.prenom + ' ' + (r.user.email || '') + ' ' + r.product.nom)
      .toLowerCase().includes(search.toLowerCase())
  })

  if (loading) return <div className="text-center text-gray-500 dark:text-gray-400 py-12">Chargement...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Gestion des Retours ({retours.length})
      </h1>

      {/* ── Stats ML ─────────────────────────────────────────────────────── */}
      {mlStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total décisions ML', value: mlStats.total_decisions,                  color: 'text-gray-800 dark:text-gray-100' },
            { label: 'Confiance moyenne',  value: `${mlStats.avg_confidence?.toFixed(1)}%`, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Alertes actives',    value: mlStats.total_alerts,                     color: 'text-red-500' },
            { label: 'Taux fraude',        value: `${mlStats.fraud_rate_pct?.toFixed(1)}%`, color: 'text-orange-500' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Filtres ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchRetours()}
            placeholder="Rechercher par client ou produit..."
            className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select value={filterVendeur} onChange={e => { setFilterVendeur(e.target.value); setAdminOnly(false) }} disabled={adminOnly}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[180px] disabled:opacity-40">
            <option value="">🏪 Tous les vendeurs</option>
            {vendeurs.map(v => (
              <option key={v.id} value={v.id}>{v.nomBoutique || `${v.user.prenom} ${v.user.nom}`}</option>
            ))}
          </select>
          <button onClick={() => { setAdminOnly(v => !v); setFilterVendeur('') }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap border ${
              adminOnly
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
            🛒 Admin seulement
          </button>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[180px]">
            <option value="">🏷️ Toutes catégories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
          </select>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterStatus('TOUS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === 'TOUS' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            Tous
          </button>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <button key={key} onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === key ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              {cfg.emoji} {cfg.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tableau ──────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
              <tr>
                <th className="text-left px-6 py-4">Produit</th>
                <th className="text-left px-6 py-4">Client</th>
                <th className="text-left px-6 py-4">Vendeur</th>
                <th className="text-left px-6 py-4">Recommandation ML</th>
                <th className="text-left px-6 py-4">Décision finale</th>
                <th className="text-left px-6 py-4">Statut</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">Aucun retour trouvé</td>
                </tr>
              ) : (
                filtered.map(retour => {
                  const status    = statusConfig[retour.returnStatus] || statusConfig.EN_ATTENTE
                  const mlConfig  = retour.mlDecision    ? resolutionConfig[retour.mlDecision]    : null
                  const finConfig = retour.finalDecision ? resolutionConfig[retour.finalDecision] : null
                  return (
                    <tr key={retour.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">

                      {/* Produit */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                            {retour.product.images[0]
                              ? <img src={retour.product.images[0]} alt="" className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center">📦</div>
                            }
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-100 text-xs line-clamp-1">{retour.product.nom}</p>
                            <p className="text-xs text-gray-400">{retour.product.category?.nom} — J+{retour.daysToReturn}</p>
                            {retour.flowmerceClaimId && (
                              <span className="text-xs text-blue-500 dark:text-blue-400">⟷ Flowmerce</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-800 dark:text-gray-100">{retour.user.prenom} {retour.user.nom}</p>
                        <p className="text-xs text-gray-400">{retour.user.email}</p>
                        {retour.fraudScore !== null && retour.fraudScore > 50 && (
                          <span className="text-xs text-red-500">⚠️ Fraude {retour.fraudScore}%</span>
                        )}
                      </td>

                      {/* Vendeur */}
                      <td className="px-6 py-4">
                        {retour.product.vendeur ? (
                          <span className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                            🏪 {retour.product.vendeur.nomBoutique || '—'}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Admin</span>
                        )}
                      </td>

                      {/* Recommandation ML */}
                      <td className="px-6 py-4">
                        {mlConfig ? (
                          <div>
                            <span className={`${mlConfig.color} text-xs font-bold`}>{mlConfig.emoji} {mlConfig.label}</span>
                            {retour.mlConfidence && (
                              <p className="text-xs text-gray-400 mt-0.5">{retour.mlConfidence.toFixed(1)}% conf.</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>

                      {/* Décision finale */}
                      <td className="px-6 py-4">
                        {finConfig ? (
                          <span className={`text-xs font-bold ${finConfig.color}`}>
                            {finConfig.emoji} {finConfig.label}
                          </span>
                        ) : (
                          retour.returnStatus === 'EN_ATTENTE'
                            ? <span className="text-xs text-yellow-600 animate-pulse">En attente</span>
                            : <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      {/* Statut */}
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status.color}`}>
                          {status.emoji} {status.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openModal(retour)}
                          className="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900 px-3 py-1 rounded-lg text-xs font-medium transition"
                        >
                          {retour.returnStatus === 'EN_ATTENTE' ? '⚡ Décider' : '🔍 Voir'}
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal gestion retour ─────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={e => { if (e.target === e.currentTarget) { setSelected(null); setUpdateMsg(null) } }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">

            {/* Header */}
            <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Dossier retour</p>
                <p className="font-semibold">{selected.user.prenom} {selected.user.nom}</p>
              </div>
              <div className="flex items-center gap-2">
                {selected.product.vendeur && (
                  <span className="text-xs bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full">
                    🏪 {selected.product.vendeur.nomBoutique || '—'}
                  </span>
                )}
                {selected.flowmerceClaimId && (
                  <span className="text-xs bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full">
                    ⟷ Flowmerce
                  </span>
                )}
                <span className={`${statusConfig[selected.returnStatus]?.color} text-xs font-semibold px-3 py-1 rounded-full`}>
                  {statusConfig[selected.returnStatus]?.emoji} {statusConfig[selected.returnStatus]?.label}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">

              {/* Produit */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
                  {selected.product.images[0]
                    ? <img src={selected.product.images[0]} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                  }
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{selected.product.nom}</p>
                  <p className="text-xs text-gray-500">Catégorie : {selected.product.category?.nom}</p>
                  <p className="text-xs text-gray-500">
                    Commande #{selected.order.id.slice(-6).toUpperCase()} — {selected.order.total.toFixed(2)} DA
                  </p>
                  <p className="text-xs text-gray-500">
                    J+{selected.daysToReturn} jours — {reasonLabels[selected.returnReason] || selected.returnReason}
                  </p>
                </div>
              </div>

              {/* Client */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">👤 Client</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {selected.user.prenom} {selected.user.nom}
                </p>
                {selected.user.email     && <p className="text-xs text-gray-500">{selected.user.email}</p>}
                {selected.user.telephone && <p className="text-xs text-gray-500">{selected.user.telephone}</p>}
                {selected.fraudScore !== null && (
                  <p className={`text-xs mt-1 font-medium ${selected.fraudScore > 50 ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                    Score de fraude : {selected.fraudScore}%
                    {selected.fraudScore > 50 && ' ⚠️ Risque élevé'}
                  </p>
                )}
              </div>

              {/* Description */}
              {selected.description && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">📝 Description du client</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selected.description}</p>
                </div>
              )}

              {/* Recommandation ML */}
              {selected.mlDecision && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                    <p className="text-xs uppercase tracking-widest text-gray-400">🤖 Analyse ML</p>
                    <p className="text-xs text-gray-300">{selected.mlDecisionLabel}</p>
                  </div>
                  {(() => {
                    const res = resolutionConfig[selected.mlDecision] || resolutionConfig.Reject
                    return (
                      <div className="px-4 py-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{res.emoji}</span>
                          <div>
                            <p className={`${res.color} text-sm font-bold`}>{res.label.toUpperCase()}</p>
                            {selected.mlConfidence && (
                              <p className="text-xs text-gray-500">Confiance : {selected.mlConfidence.toFixed(1)}%</p>
                            )}
                          </div>
                        </div>
                        {selected.mlProbabilities && (
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Probabilités</p>
                            {Object.entries(selected.mlProbabilities)
                              .sort(([, a], [, b]) => b - a)
                              .map(([label, value]) => {
                                const maxVal = Math.max(...Object.values(selected.mlProbabilities!))
                                return <ProbBar key={label} label={label} value={value} max={maxVal} />
                              })
                            }
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Décision finale déjà prise */}
              {selected.finalDecision && (
                <div className={`rounded-xl p-4 border ${resolutionConfig[selected.finalDecision]?.bg}`}>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">✅ Décision finale</p>
                  <p className={`font-bold text-sm ${resolutionConfig[selected.finalDecision]?.color}`}>
                    {resolutionConfig[selected.finalDecision]?.emoji} {resolutionConfig[selected.finalDecision]?.label}
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">
                      (statut : {statusConfig[selected.returnStatus]?.label})
                    </span>
                  </p>
                  {selected.finalNote && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                      Note : "{selected.finalNote}"
                    </p>
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
                <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-5 space-y-3">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Prise de décision
                    {selected.flowmerceClaimId && (
                      <span className="text-xs text-blue-500 dark:text-blue-400 ml-2 font-normal">
                        → synchronisation Flowmerce automatique
                      </span>
                    )}
                  </p>

                  {/* Bouton principal : appliquer la décision ML */}
                  {selected.mlDecision ? (
                    <button
                      onClick={() => handleDecision(selected.id, 'APPROVE_ML', null, null)}
                      disabled={updating}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold rounded-xl transition text-sm"
                    >
                      {updating && !showOverride
                        ? <span className="animate-spin mr-1">⟳</span>
                        : null
                      }
                      ✅ Appliquer la recommandation ML —&nbsp;
                      {resolutionConfig[selected.mlDecision]?.emoji}&nbsp;
                      {resolutionConfig[selected.mlDecision]?.label}
                      <span className="text-green-200 text-xs font-normal ml-1">
                        ({selected.mlConfidence?.toFixed(0)}% conf.)
                      </span>
                    </button>
                  ) : (
                    <div className="text-xs text-gray-400 italic px-1">
                      Aucune recommandation ML disponible pour ce retour.
                    </div>
                  )}

                  {/* Section override : choisir une autre décision */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowOverride(v => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <span>❌ Refuser ou choisir une décision différente</span>
                      <span className="text-gray-400 text-xs">{showOverride ? '▲' : '▼'}</span>
                    </button>

                    {showOverride && (
                      <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">

                        {/* Grille de sélection de résolution */}
                        <div className="grid grid-cols-2 gap-2">
                          {(['Refund', 'Exchange', 'Repair', 'Reject'] as FinalDecision[]).map(opt => {
                            const cfg       = resolutionConfig[opt]
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

                        {/* Note obligatoire si Reject */}
                        {overrideDecision === 'Reject' && (
                          <div>
                            <label className="block text-xs font-medium text-red-600 mb-1">
                              ⚠️ Motif du refus (obligatoire, min. 10 car.)
                            </label>
                            <textarea
                              value={overrideNote}
                              onChange={e => { setOverrideNote(e.target.value); setUpdateMsg(null) }}
                              placeholder="Ex : délai de retour dépassé, produit non éligible, signes d'utilisation anormale..."
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

                        {/* Note optionnelle pour les autres décisions */}
                        {overrideDecision && overrideDecision !== 'Reject' && (
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                              Note admin (optionnel)
                            </label>
                            <input
                              type="text"
                              value={overrideNote}
                              onChange={e => setOverrideNote(e.target.value)}
                              placeholder="Justification de votre décision..."
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-900 dark:text-gray-100"
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleDecision(selected.id, 'OVERRIDE', overrideDecision as FinalDecision, overrideNote || null)}
                          disabled={updating || !overrideDecision}
                          className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
                        >
                          {updating && showOverride ? <span className="animate-spin">⟳</span> : null}
                          Confirmer cette décision
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button onClick={() => { setSelected(null); setUpdateMsg(null) }}
                className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminRetoursPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 dark:text-gray-400 py-12">Chargement...</div>}>
      <AdminRetoursContent />
    </Suspense>
  )
}