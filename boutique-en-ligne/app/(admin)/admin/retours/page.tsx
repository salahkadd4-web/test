'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// ── Types ─────────────────────────────────────────────────────────────────

type Return = {
  id: string
  returnReason:     string
  returnStatus:     string
  daysToReturn:     number
  description:      string | null
  mlDecision:       string | null
  mlConfidence:     number | null
  mlDecisionLabel:  string | null
  mlResponsibility: string | null
  createdAt:        string
  user:    { nom: string; prenom: string; email: string | null; telephone: string | null }
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

type MlStats  = { total_decisions: number; avg_confidence: number; total_alerts: number; fraud_rate_pct: number }
type MLDetail = {
  shop_name: string
  decision: {
    resolution:     string
    confidence:     number
    probabilities:  Record<string, number>
    policy_override: string | null
    shipping: { responsible: string; confidence: number; probabilities: Record<string, number> } | null
    partial_refund: { refund_percentage: number; refund_amount_DA: number; notes: string[] } | null
  }
  policy_applied:  { return_window_days: number; fraud_score_threshold: number; partial_refund_enabled: boolean }
  input_summary:   { product_category: string; product_category_normalized: string; price_da: number; days_to_return: number; fraud_score: number; return_reason: string }
  predicted_at:    string
  customer_info?:  { age: number; gender: string; wilaya: string; past_returns: number; payment_method: string; shipping_method: string }
}

type VendeurOption  = { id: string; nomBoutique: string | null; user: { nom: string; prenom: string } }
type CategoryOption = { id: string; nom: string }

// ── Configs ───────────────────────────────────────────────────────────────

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
  NON_CONFORME:    'Ne correspond pas à la description',
}

const resolutionConfig: Record<string, { label: string; emoji: string; bg: string; text: string }> = {
  Refund:   { label: 'REMBOURSEMENT', emoji: '💰', bg: 'bg-green-50 dark:bg-green-950',   text: 'text-green-700 dark:text-green-400'   },
  Exchange: { label: 'ÉCHANGE',       emoji: '🔄', bg: 'bg-blue-50 dark:bg-blue-950',     text: 'text-blue-700 dark:text-blue-400'     },
  Repair:   { label: 'RÉPARATION',    emoji: '🔧', bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-400' },
  Reject:   { label: 'REFUSÉ',        emoji: '❌', bg: 'bg-red-50 dark:bg-red-950',       text: 'text-red-700 dark:text-red-400'       },
}

const shippingConfig: Record<string, { label: string; emoji: string; color: string }> = {
  Seller: { label: 'VENDEUR', emoji: '🏪', color: 'text-purple-700 dark:text-purple-300' },
  Buyer:  { label: 'CLIENT',  emoji: '📦', color: 'text-blue-700 dark:text-blue-300'     },
  Shared: { label: 'PARTAGÉ', emoji: '🤝', color: 'text-gray-700 dark:text-gray-300'     },
}

// ── Barre de probabilité ──────────────────────────────────────────────────

function ProbabilityBar({ label, value, maxValue }: { label: string; value: number; maxValue: number }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs font-mono w-20 text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full bg-gray-700 dark:bg-gray-300 rounded-full"
          style={{ width: `${Math.round((value / maxValue) * 100)}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-200 w-12 text-right shrink-0">
        {value.toFixed(1)}%
      </span>
    </div>
  )
}

// ── Composant principal ────────────────────────────────────────────────────

function AdminRetoursContent() {
  const searchParams = useSearchParams()

  const [retours,          setRetours]          = useState<Return[]>([])
  const [loading,          setLoading]          = useState(true)
  const [selected,         setSelected]         = useState<Return | null>(null)
  const [filterStatus,     setFilterStatus]     = useState(searchParams.get('status') || 'TOUS')
  const [filterVendeur,    setFilterVendeur]    = useState('')
  const [adminOnly,        setAdminOnly]        = useState(false)
  const [filterCategory,   setFilterCategory]   = useState('')
  const [search,           setSearch]           = useState('')
  const [updating,         setUpdating]         = useState(false)

  const [vendeurs,         setVendeurs]         = useState<VendeurOption[]>([])
  const [categories,       setCategories]       = useState<CategoryOption[]>([])

  const [mlStats,          setMlStats]          = useState<MlStats | null>(null)
  const [mlDetail,         setMlDetail]         = useState<MLDetail | null>(null)
  const [loadingMlDetail,  setLoadingMlDetail]  = useState(false)

  // ── Chargement ────────────────────────────────────────────────────────

  useEffect(() => {
    fetchVendeurs()
    fetchCategories()
    fetchMlStats()
  }, [])

  useEffect(() => {
    fetchRetours()
  }, [filterStatus, filterVendeur, filterCategory, adminOnly])

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
    if (filterStatus   !== 'TOUS') params.set('statut',     filterStatus)
    if (filterVendeur)             params.set('vendeurId',  filterVendeur)
    if (adminOnly)                 params.set('adminOnly',  'true')
    if (filterCategory)            params.set('categoryId', filterCategory)
    if (search)                    params.set('search',     search)

    const res = await fetch(`/api/admin/retours?${params}`)
    if (res.ok) setRetours(await res.json())
    setLoading(false)
  }

  // ── Ouverture modal ───────────────────────────────────────────────────

  const handleOpenModal = async (retour: Return) => {
    setSelected(retour)
    setMlDetail(null)
    if (retour.mlDecision) {
      setLoadingMlDetail(true)
      try {
        const res = await fetch(`/api/admin/retours/${retour.id}/ml-detail`)
        if (res.ok) setMlDetail(await res.json())
      } catch {}
      finally { setLoadingMlDetail(false) }
    }
  }

  // ── Changement statut ─────────────────────────────────────────────────

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(true)
    await fetch(`/api/admin/retours/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ returnStatus: status }),
    })
    setUpdating(false)
    if (selected?.id === id) setSelected({ ...selected, returnStatus: status })
    fetchRetours()
  }

  // ── Filtrage local (recherche) ────────────────────────────────────────

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
            { label: 'Total décisions ML', value: mlStats.total_decisions,              color: 'text-gray-800 dark:text-gray-100' },
            { label: 'Confiance moyenne',  value: `${mlStats.avg_confidence?.toFixed(1)}%`, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Alertes actives',    value: mlStats.total_alerts,                 color: 'text-red-500' },
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

        {/* Ligne 1 : recherche + vendeur + catégorie */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchRetours()}
            placeholder="Rechercher par client ou produit..."
            className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filterVendeur}
            onChange={e => { setFilterVendeur(e.target.value); setAdminOnly(false) }}
            disabled={adminOnly}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[180px] disabled:opacity-40"
          >
            <option value="">🏪 Tous les vendeurs</option>
            {vendeurs.map(v => (
              <option key={v.id} value={v.id}>
                {v.nomBoutique || `${v.user.prenom} ${v.user.nom}`}
              </option>
            ))}
          </select>
          <button
            onClick={() => { setAdminOnly(v => !v); setFilterVendeur('') }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap border ${
              adminOnly
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            🛒 Admin seulement
          </button>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[180px]"
          >
            <option value="">🏷️ Toutes les catégories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>
        </div>

        {/* Ligne 2 : filtres statut */}
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

        {/* Badges filtres actifs */}
        {(filterVendeur || adminOnly || filterCategory || filterStatus !== 'TOUS') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 dark:text-gray-500">Filtres :</span>
            {filterVendeur && (
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                🏪 {vendeurs.find(v => v.id === filterVendeur)?.nomBoutique || 'Vendeur'}
                <button onClick={() => setFilterVendeur('')} className="ml-0.5 font-bold hover:text-emerald-500">×</button>
              </span>
            )}
            {adminOnly && (
              <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                🛒 Admin seulement
                <button onClick={() => setAdminOnly(false)} className="ml-0.5 font-bold hover:text-blue-500">×</button>
              </span>
            )}
            {filterCategory && (
              <span className="text-xs bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                🏷️ {categories.find(c => c.id === filterCategory)?.nom || 'Catégorie'}
                <button onClick={() => setFilterCategory('')} className="ml-0.5 font-bold hover:text-purple-500">×</button>
              </span>
            )}
            {filterStatus !== 'TOUS' && (
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                {statusConfig[filterStatus]?.emoji} {statusConfig[filterStatus]?.label}
                <button onClick={() => setFilterStatus('TOUS')} className="ml-0.5 font-bold hover:text-gray-500">×</button>
              </span>
            )}
          </div>
        )}
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
                <th className="text-left px-6 py-4">Raison</th>
                <th className="text-left px-6 py-4">Décision ML</th>
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
                  const resConfig = retour.mlDecision ? resolutionConfig[retour.mlDecision] : null
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
                          </div>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-800 dark:text-gray-100">{retour.user.prenom} {retour.user.nom}</p>
                        <p className="text-xs text-gray-400">{retour.user.email}</p>
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

                      {/* Raison */}
                      <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300">
                        {reasonLabels[retour.returnReason] || retour.returnReason}
                      </td>

                      {/* Décision ML */}
                      <td className="px-6 py-4">
                        {retour.mlDecision && resConfig ? (
                          <div>
                            <span className={`${resConfig.text} text-xs font-bold`}>{resConfig.emoji} {resConfig.label}</span>
                            <p className="text-xs text-gray-400 mt-0.5">{retour.mlConfidence?.toFixed(1)}% confiance</p>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
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
                          onClick={() => handleOpenModal(retour)}
                          className="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900 px-3 py-1 rounded-lg text-xs font-medium transition"
                        >
                          Gérer
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

      {/* ── Modal détail retour ───────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={e => { if (e.target === e.currentTarget) { setSelected(null); setMlDetail(null) } }}
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">Catégorie : {selected.product.category?.nom}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Commande #{selected.order.id.slice(-6).toUpperCase()} — {selected.order.total.toFixed(2)} DA
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">J+{selected.daysToReturn} jours après livraison</p>
                </div>
              </div>

              {/* Client + Raison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">👤 Client</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{selected.user.prenom} {selected.user.nom}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selected.user.email}</p>
                  {selected.user.telephone && <p className="text-xs text-gray-500 dark:text-gray-400">{selected.user.telephone}</p>}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">📋 Raison</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {reasonLabels[selected.returnReason] || selected.returnReason}
                  </p>
                  {selected.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{selected.description}</p>}
                </div>
              </div>

              {/* Analyse ML */}
              {selected.mlDecision && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-medium mb-3">🤖 Analyse ML</p>
                  {loadingMlDetail ? (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center text-gray-400 text-sm">Chargement...</div>
                  ) : mlDetail ? (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                      <div className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 flex justify-between">
                        <p className="text-xs uppercase tracking-widest text-gray-400">RetourZML</p>
                        <p className="text-xs text-gray-300">{mlDetail.shop_name}</p>
                      </div>

                      {/* Résolution */}
                      {(() => {
                        const res = resolutionConfig[mlDetail.decision?.resolution] || resolutionConfig.Reject
                        const probEntries = Object.entries(mlDetail.decision?.probabilities || {}).sort((a: any, b: any) => b[1] - a[1]) as [string, number][]
                        const maxProb = probEntries[0]?.[1] || 100
                        return (
                          <div className={`${res.bg} px-4 py-4 border-b border-gray-100 dark:border-gray-700`}>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{res.emoji}</span>
                              <div>
                                <p className={`${res.text} text-sm font-bold`}>RÉSOLUTION : {res.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Confiance : {mlDetail.decision?.confidence?.toFixed(1)}%</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Probabilités</p>
                            {probEntries.map(([label, value]) => (
                              <ProbabilityBar key={label} label={label} value={value} maxValue={maxProb} />
                            ))}
                            {mlDetail.decision?.partial_refund && (
                              <div className="mt-3 bg-white/60 dark:bg-gray-900/60 rounded-lg p-3 border border-green-200 dark:border-green-800">
                                <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                                  💰 Remboursement partiel : {mlDetail.decision.partial_refund.refund_amount_DA.toFixed(2)} DA ({mlDetail.decision.partial_refund.refund_percentage}%)
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })()}

                      {/* Frais retour */}
                      {mlDetail.decision?.shipping && (() => {
                        const ship = shippingConfig[mlDetail.decision.shipping.responsible] || shippingConfig.Buyer
                        const shipEntries = Object.entries(mlDetail.decision.shipping.probabilities || {}).sort((a: any, b: any) => b[1] - a[1]) as [string, number][]
                        const maxShip = shipEntries[0]?.[1] || 100
                        return (
                          <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{ship.emoji}</span>
                              <div>
                                <p className={`${ship.color} text-sm font-bold`}>FRAIS RETOUR : {ship.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Confiance : {mlDetail.decision.shipping.confidence?.toFixed(1)}%</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Probabilités</p>
                            {shipEntries.map(([label, value]) => (
                              <ProbabilityBar key={label} label={label} value={value} maxValue={maxShip} />
                            ))}
                          </div>
                        )
                      })()}

                      {mlDetail.decision?.policy_override && (
                        <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-950 border-b border-yellow-100 dark:border-yellow-900">
                          <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">ℹ️ Note politique</p>
                          <p className="text-xs text-yellow-800 dark:text-yellow-300">{mlDetail.decision.policy_override}</p>
                        </div>
                      )}

                      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 flex justify-between">
                        <p className="text-xs text-gray-400">Seuil fraude : {mlDetail.policy_applied?.fraud_score_threshold}</p>
                        <p className="text-xs text-gray-400">{new Date(mlDetail.predicted_at).toLocaleString('fr-FR')}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{selected.mlDecisionLabel}</p>
                      <div className="flex gap-3 mt-2">
                        {selected.mlConfidence && <span className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">{selected.mlConfidence.toFixed(1)}% confiance</span>}
                        {selected.mlResponsibility && <span className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">Frais : {selected.mlResponsibility}</span>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Changer statut */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">🔄 Changer le statut</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(statusConfig).map(([key, cfg]) => (
                    <button
                      key={key}
                      onClick={() => handleStatusChange(selected.id, key)}
                      disabled={selected.returnStatus === key || updating}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                        selected.returnStatus === key
                          ? `${cfg.color} cursor-default`
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50'
                      }`}
                    >
                      {cfg.emoji} {cfg.label}{selected.returnStatus === key ? ' ✓' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSelected(null); setMlDetail(null) }}
                className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
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