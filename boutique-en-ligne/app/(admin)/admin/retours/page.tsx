'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type Return = {
  id: string
  returnReason: string
  returnStatus: string
  daysToReturn: number
  description: string | null
  mlDecision: string | null
  mlConfidence: number | null
  mlDecisionLabel: string | null
  mlResponsibility: string | null
  createdAt: string
  user: { nom: string; prenom: string; email: string | null; telephone: string | null }
  product: { nom: string; images: string[]; prix: number; category: { nom: string } }
  order: { id: string; total: number; createdAt: string; items: { quantite: number; productId: string }[] }
}

type MlStats = {
  total_decisions: number
  avg_confidence: number
  total_alerts: number
  fraud_rate_pct: number
}

type MLDetail = {
  shop_name: string
  decision: {
    resolution: string
    confidence: number
    probabilities: Record<string, number>
    policy_override: string | null
    shipping: {
      responsible: string
      confidence: number
      probabilities: Record<string, number>
    } | null
    partial_refund: {
      refund_percentage: number
      refund_amount_DA: number
      notes: string[]
    } | null
  }
  policy_applied: {
    return_window_days: number
    fraud_score_threshold: number
    partial_refund_enabled: boolean
  }
  input_summary: {
    product_category: string
    product_category_normalized: string
    price_da: number
    days_to_return: number
    fraud_score: number
    return_reason: string
  }
  predicted_at: string
  customer_info?: {
    age: number
    gender: string
    wilaya: string
    past_returns: number
    payment_method: string
    shipping_method: string
  }
}

const statusConfig: Record<string, { label: string; color: string; emoji: string }> = {
  EN_ATTENTE: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', emoji: '⏳' },
  APPROUVE:   { label: 'Approuvé',   color: 'bg-green-100 text-green-700',   emoji: '✅' },
  REFUSE:     { label: 'Refusé',     color: 'bg-red-100 text-red-700',       emoji: '❌' },
  REMBOURSE:  { label: 'Remboursé',  color: 'bg-blue-100 text-blue-700',     emoji: '💰' },
}

const reasonLabels: Record<string, string> = {
  DEFECTUEUX:      'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:    'Ne correspond pas à la description',
}

const resolutionConfig: Record<string, { label: string; emoji: string; bg: string; border: string; text: string }> = {
  Refund:   { label: 'REMBOURSEMENT', emoji: '💰', bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-700'  },
  Exchange: { label: 'ÉCHANGE',       emoji: '🔄', bg: 'bg-blue-50',   border: 'border-blue-200',  text: 'text-blue-700'   },
  Repair:   { label: 'RÉPARATION',    emoji: '🔧', bg: 'bg-orange-50', border: 'border-orange-200',text: 'text-orange-700' },
  Reject:   { label: 'REFUSÉ',        emoji: '❌', bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-700'    },
}

const shippingConfig: Record<string, { label: string; emoji: string; color: string }> = {
  Seller: { label: 'VENDEUR', emoji: '🏪', color: 'text-purple-700' },
  Buyer:  { label: 'CLIENT',  emoji: '📦', color: 'text-blue-700'   },
  Shared: { label: 'PARTAGÉ', emoji: '🤝', color: 'text-gray-700'   },
}

function ProbabilityBar({ label, value, maxValue }: { label: string; value: number; maxValue: number }) {
  const barWidth = Math.round((value / maxValue) * 100)
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs font-mono w-20 text-gray-500 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div className="h-full bg-gray-700 rounded-full" style={{ width: barWidth + '%' }} />
      </div>
      <span className="text-xs font-bold text-gray-700 w-12 text-right shrink-0">
        {value.toFixed(1)}%
      </span>
    </div>
  )
}

function AdminRetoursContent() {
  const searchParams = useSearchParams()
  const [retours, setRetours] = useState<Return[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Return | null>(null)
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || 'TOUS')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState(false)
  const [mlStats, setMlStats] = useState<MlStats | null>(null)
  const [mlDetail, setMlDetail] = useState<MLDetail | null>(null)
  const [loadingMlDetail, setLoadingMlDetail] = useState(false)

  const fetchRetours = async () => {
    const res = await fetch('/api/admin/retours')
    const data = await res.json()
    setRetours(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const fetchMlStats = async () => {
    try {
      const res = await fetch('/api/admin/retours/ml-stats')
      const data = await res.json()
      setMlStats(data)
    } catch {
      console.error('ML API indisponible')
    }
  }

  useEffect(() => {
    fetchRetours()
    fetchMlStats()
  }, [])

  useEffect(() => {
    const status = searchParams.get('status')
    if (status) setFilterStatus(status)
  }, [searchParams])

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(true)
    await fetch('/api/admin/retours/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnStatus: status }),
    })
    setUpdating(false)
    if (selected && selected.id === id) {
      setSelected({ ...selected, returnStatus: status })
    }
    fetchRetours()
  }

  const handleOpenModal = async (retour: Return) => {
    setSelected(retour)
    setMlDetail(null)
    if (retour.mlDecision) {
      setLoadingMlDetail(true)
      try {
        const res = await fetch('/api/admin/retours/' + retour.id + '/ml-detail')
        if (res.ok) {
          const data = await res.json()
          setMlDetail(data)
        }
      } catch {
        console.error('ML detail indisponible')
      } finally {
        setLoadingMlDetail(false)
      }
    }
  }

  const getFilterBtnClass = (key: string) => {
    if (filterStatus === key) return 'px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-600 text-white transition'
    return 'px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition'
  }

  const getStatusBtnClass = (key: string, currentStatus: string) => {
    if (currentStatus === key) return statusConfig[key].color + ' px-3 py-2 rounded-lg text-xs font-medium cursor-default transition'
    return 'px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition'
  }

  const filtered = retours.filter((r) => {
    const matchStatus = filterStatus === 'TOUS' || r.returnStatus === filterStatus
    const matchSearch = (r.user.nom + ' ' + r.user.prenom + ' ' + (r.user.email || '') + ' ' + r.product.nom)
      .toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  if (loading) return <div className="text-center text-gray-500 py-12">Chargement...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Gestion des Retours ({retours.length})
      </h1>

      {/* Stats ML */}
      {mlStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Total décisions ML</p>
            <p className="text-2xl font-bold text-gray-800">{mlStats.total_decisions}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Confiance moyenne</p>
            <p className="text-2xl font-bold text-blue-600">{mlStats.avg_confidence?.toFixed(1)}%</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Alertes actives</p>
            <p className="text-2xl font-bold text-red-500">{mlStats.total_alerts}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Taux fraude</p>
            <p className="text-2xl font-bold text-orange-500">{mlStats.fraud_rate_pct?.toFixed(1)}%</p>
          </div>
        </div>
      )}

      {/* Recherche + Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par client ou produit..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterStatus('TOUS')} className={getFilterBtnClass('TOUS')}>Tous</button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button key={key} onClick={() => setFilterStatus(key)} className={getFilterBtnClass(key)}>
              {config.emoji} {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="text-left px-6 py-4">Produit</th>
              <th className="text-left px-6 py-4">Client</th>
              <th className="text-left px-6 py-4">Raison</th>
              <th className="text-left px-6 py-4">Décision ML</th>
              <th className="text-left px-6 py-4">Statut</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">Aucun retour trouvé</td>
              </tr>
            ) : (
              filtered.map((retour) => {
                const status = statusConfig[retour.returnStatus] || statusConfig.EN_ATTENTE
                const resConfig = retour.mlDecision ? resolutionConfig[retour.mlDecision] : null
                return (
                  <tr key={retour.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          {retour.product.images[0] ? (
                            <img src={retour.product.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">📦</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-xs line-clamp-1">{retour.product.nom}</p>
                          <p className="text-xs text-gray-400">{retour.product.category?.nom} — J+{retour.daysToReturn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-800">{retour.user.prenom} {retour.user.nom}</p>
                      <p className="text-xs text-gray-400">{retour.user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      {reasonLabels[retour.returnReason] || retour.returnReason}
                    </td>
                    <td className="px-6 py-4">
                      {retour.mlDecision && resConfig ? (
                        <div>
                          <span className={resConfig.text + ' text-xs font-bold'}>{resConfig.emoji} {resConfig.label}</span>
                          <p className="text-xs text-gray-400 mt-0.5">{retour.mlConfidence?.toFixed(1)}% confiance</p>
                          {retour.mlResponsibility && (
                            <p className="text-xs text-gray-400">Frais : {retour.mlResponsibility}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={status.color + ' text-xs font-semibold px-2 py-1 rounded-full'}>
                        {status.emoji} {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenModal(retour)}
                        className="bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1 rounded-lg text-xs font-medium transition"
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

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">

            {/* Header */}
            <div className="bg-gray-900 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Dossier retour</p>
                <p className="font-semibold">{selected.user.prenom} {selected.user.nom}</p>
              </div>
              <span className={statusConfig[selected.returnStatus]?.color + ' text-xs font-semibold px-3 py-1 rounded-full'}>
                {statusConfig[selected.returnStatus]?.emoji} {statusConfig[selected.returnStatus]?.label}
              </span>
            </div>

            <div className="p-6 space-y-4">

              {/* Produit */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                  {selected.product.images[0] ? (
                    <img src={selected.product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{selected.product.nom}</p>
                  <p className="text-xs text-gray-500">Catégorie : {selected.product.category?.nom}</p>
                  <p className="text-xs text-gray-500">
                    Commande #{selected.order.id.slice(-6).toUpperCase()} — {selected.order.total.toFixed(2)} DA
                  </p>
                  <p className="text-xs text-gray-500">J+{selected.daysToReturn} jours après livraison</p>
                </div>
              </div>

              {/* Client + Raison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">👤 Client</p>
                  <p className="text-sm font-semibold text-gray-800">{selected.user.prenom} {selected.user.nom}</p>
                  <p className="text-xs text-gray-500">{selected.user.email}</p>
                  {selected.user.telephone && (
                    <p className="text-xs text-gray-500">{selected.user.telephone}</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">📋 Raison déclarée</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {reasonLabels[selected.returnReason] || selected.returnReason}
                  </p>
                  {selected.description && (
                    <p className="text-xs text-gray-500 mt-1">{selected.description}</p>
                  )}
                </div>
              </div>

              {/* Analyse ML complète */}
              {selected.mlDecision && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
                    🤖 Analyse ML complète
                  </p>

                  {loadingMlDetail ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400 text-sm">
                      Chargement de l'analyse...
                    </div>
                  ) : mlDetail ? (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">

                      {/* Header ML */}
                      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
                        <p className="text-xs uppercase tracking-widest text-gray-400">RetourZML</p>
                        <p className="text-xs text-gray-300">{mlDetail.shop_name}</p>
                      </div>

                      {/* Données complètes du cas */}
                      <div className="bg-gray-50 border-b border-gray-200 px-4 py-4">
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-3">
                          Données du cas
                        </p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Produit</span>
                            <span className="font-medium text-gray-800">
                              {mlDetail.input_summary?.product_category_normalized}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Prix</span>
                            <span className="font-medium text-gray-800">
                              {mlDetail.input_summary?.price_da?.toFixed(0)} DA
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Quantité</span>
                            <span className="font-medium text-gray-800">
                              {selected.order.items.find(i => i.productId === selected.id)?.quantite || 1}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Délai</span>
                            <span className="font-medium text-gray-800">
                              {mlDetail.input_summary?.days_to_return}j / {mlDetail.policy_applied?.return_window_days}j autorisés
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Raison</span>
                            <span className="font-medium text-gray-800 text-right max-w-32">
                              {mlDetail.input_summary?.return_reason}
                            </span>
                          </div>
                          {mlDetail.customer_info && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Client</span>
                                <span className="font-medium text-gray-800">
                                  {mlDetail.customer_info.gender === 'Female' ? 'Femme' : 'Homme'}, {mlDetail.customer_info.age} ans
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Wilaya</span>
                                <span className="font-medium text-gray-800">{mlDetail.customer_info.wilaya}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Historique</span>
                                <span className="font-medium text-gray-800">
                                  {mlDetail.customer_info.past_returns} retour(s)
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Paiement</span>
                                <span className="font-medium text-gray-800">{mlDetail.customer_info.payment_method}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Livraison</span>
                                <span className="font-medium text-gray-800">{mlDetail.customer_info.shipping_method}</span>
                              </div>
                            </>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-500">Fraud Score</span>
                            <span className={mlDetail.input_summary?.fraud_score > 50 ? 'font-bold text-red-600' : 'font-bold text-green-600'}>
                              {mlDetail.input_summary?.fraud_score}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Résolution */}
                      {(() => {
                        const res = resolutionConfig[mlDetail.decision?.resolution] || resolutionConfig.Reject
                        const probEntries = Object.entries(mlDetail.decision?.probabilities || {})
                          .sort((a: any, b: any) => b[1] - a[1]) as [string, number][]
                        const maxProb = probEntries[0]?.[1] || 100
                        return (
                          <div className={res.bg + ' px-4 py-4 border-b border-gray-100'}>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{res.emoji}</span>
                              <div>
                                <p className={res.text + ' text-sm font-bold'}>
                                  RÉSOLUTION : {res.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Confiance : {mlDetail.decision?.confidence?.toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Probabilités</p>
                            {probEntries.map(([label, value]) => (
                              <ProbabilityBar key={label} label={label} value={value} maxValue={maxProb} />
                            ))}
                            {mlDetail.decision?.partial_refund && (
                              <div className="mt-3 bg-white/60 rounded-lg p-3 border border-green-200">
                                <p className="text-xs font-semibold text-green-700">
                                  💰 Remboursement partiel : {mlDetail.decision.partial_refund.refund_amount_DA.toFixed(2)} DA
                                  ({mlDetail.decision.partial_refund.refund_percentage}%)
                                </p>
                                {mlDetail.decision.partial_refund.notes?.map((note: string, i: number) => (
                                  <p key={i} className="text-xs text-gray-500 mt-1">• {note}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })()}

                      {/* Frais retour */}
                      {mlDetail.decision?.shipping && (() => {
                        const ship = shippingConfig[mlDetail.decision.shipping.responsible] || shippingConfig.Buyer
                        const shipEntries = Object.entries(mlDetail.decision.shipping.probabilities || {})
                          .sort((a: any, b: any) => b[1] - a[1]) as [string, number][]
                        const maxShip = shipEntries[0]?.[1] || 100
                        return (
                          <div className="px-4 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{ship.emoji}</span>
                              <div>
                                <p className={ship.color + ' text-sm font-bold'}>
                                  FRAIS RETOUR : {ship.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Confiance : {mlDetail.decision.shipping.confidence?.toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Probabilités</p>
                            {shipEntries.map(([label, value]) => (
                              <ProbabilityBar key={label} label={label} value={value} maxValue={maxShip} />
                            ))}
                          </div>
                        )
                      })()}

                      {/* Policy override */}
                      {mlDetail.decision?.policy_override && (
                        <div className="px-4 py-3 bg-yellow-50 border-b border-yellow-100">
                          <p className="text-xs font-semibold text-yellow-700 mb-1">ℹ️ Note politique boutique</p>
                          <p className="text-xs text-yellow-800">{mlDetail.decision.policy_override}</p>
                        </div>
                      )}

                      {/* Footer ML */}
                      <div className="px-4 py-2 bg-gray-50 flex justify-between items-center">
                        <p className="text-xs text-gray-400">
                          Seuil fraude : {mlDetail.policy_applied?.fraud_score_threshold}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(mlDetail.predicted_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-xs text-blue-600 font-medium mb-2">🤖 Décision ML enregistrée</p>
                      <p className="text-sm font-bold text-gray-800">{selected.mlDecisionLabel}</p>
                      <div className="flex gap-3 mt-2">
                        {selected.mlConfidence && (
                          <span className="text-xs bg-white px-2 py-1 rounded border">
                            {selected.mlConfidence.toFixed(1)}% confiance
                          </span>
                        )}
                        {selected.mlResponsibility && (
                          <span className="text-xs bg-white px-2 py-1 rounded border">
                            Frais : {selected.mlResponsibility}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Changer statut */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">🔄 Changer le statut</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => handleStatusChange(selected.id, key)}
                      disabled={selected.returnStatus === key || updating}
                      className={getStatusBtnClass(key, selected.returnStatus)}
                    >
                      {config.emoji} {config.label}{selected.returnStatus === key ? ' ✓' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSelected(null); setMlDetail(null) }}
                className="w-full border-2 border-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
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
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Chargement...</div>}>
      <AdminRetoursContent />
    </Suspense>
  )
}