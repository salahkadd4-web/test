'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ── Types ─────────────────────────────────────────────────────────────────

type OrderItem = {
  id: string
  quantite: number
  prix: number
  product: { id: string; nom: string; images: string[] }
}

type Order = {
  id: string
  createdAt: string
  total: number
  statut: string
  items: OrderItem[]
}

type Return = {
  id: string
  returnReason: string
  returnStatus: string
  daysToReturn: number
  mlDecision: string | null
  mlConfidence: number | null
  mlDecisionLabel: string | null
  mlResponsibility: string | null
  mlProbabilities: Record<string, number> | null
  flowmerceClaimId: string | null
  createdAt: string
  product: { nom: string; images: string[] }
  order: { id: string }
}

// ── Config ────────────────────────────────────────────────────────────────

const reasonLabels: Record<string, string> = {
  DEFECTUEUX:      'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:    'Ne correspond pas à la description',
}

const statusConfig: Record<string, { label: string; color: string; emoji: string; desc: string }> = {
  EN_ATTENTE: {
    label: 'En attente de validation',
    color: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400',
    emoji: '⏳',
    desc:  'Le vendeur va examiner votre demande.',
  },
  APPROUVE: {
    label: 'Approuvé',
    color: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',
    emoji: '✅',
    desc:  'Votre retour a été accepté.',
  },
  REFUSE: {
    label: 'Refusé',
    color: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400',
    emoji: '❌',
    desc:  'Votre demande a été refusée.',
  },
  REMBOURSE: {
    label: 'Remboursé',
    color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
    emoji: '💰',
    desc:  'Le remboursement a été effectué.',
  },
}

const resolutionConfig: Record<string, { label: string; emoji: string; color: string }> = {
  Refund:   { label: 'Remboursement recommandé', emoji: '💰', color: 'text-green-700 dark:text-green-400' },
  Exchange: { label: 'Échange recommandé',       emoji: '🔄', color: 'text-blue-700 dark:text-blue-400'  },
  Repair:   { label: 'Réparation recommandée',   emoji: '🔧', color: 'text-orange-700 dark:text-orange-400' },
  Reject:   { label: 'Refus recommandé',         emoji: '⚠️', color: 'text-red-700 dark:text-red-400'    },
}

function ProbBar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-mono w-20 text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div className="h-full bg-gray-700 dark:bg-gray-300 rounded-full" style={{ width: `${Math.round((value / max) * 100)}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-12 text-right shrink-0">{value.toFixed(1)}%</span>
    </div>
  )
}

// ── Page principale ────────────────────────────────────────────────────────

export default function RetoursPage() {
  const [view, setView] = useState<'liste' | 'nouveau'>('liste')
  const [retours, setRetours] = useState<Return[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{ mlDecision: string | null; label: string | null; synced: boolean } | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null)
  const [selectedRetour, setSelectedRetour] = useState<Return | null>(null)
  const [form, setForm] = useState({ orderId: '', productId: '', returnReason: '', description: '' })

  const inputClass = "w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const [rRes, oRes] = await Promise.all([fetch('/api/retours'), fetch('/api/commandes')])
    const rData = await rRes.json()
    const oData = await oRes.json()
    setRetours(Array.isArray(rData) ? rData : [])
    setOrders(Array.isArray(oData) ? oData.filter((o: Order) => o.statut === 'LIVREE') : [])
    setLoading(false)
  }

  const handleOrderChange = (orderId: string) => {
    const o = orders.find(o => o.id === orderId) || null
    setSelectedOrder(o)
    setSelectedItem(null)
    setForm({ ...form, orderId, productId: '' })
  }

  const handleProductChange = (productId: string) => {
    setSelectedItem(selectedOrder?.items.find(i => i.product.id === productId) || null)
    setForm({ ...form, productId })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.orderId || !form.productId || !form.returnReason) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/retours', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }

      setSuccess({
        mlDecision: data.retour?.mlDecision || null,
        label:      data.retour?.mlDecisionLabel || null,
        synced:     data.flowmerceSynced || false,
      })
      setForm({ orderId: '', productId: '', returnReason: '', description: '' })
      setSelectedOrder(null)
      setSelectedItem(null)
      fetchData()
    } catch { setError('Erreur serveur') }
    finally { setSubmitting(false) }
  }

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">Chargement...</div>
  )

  // ── Résultat après soumission ──────────────────────────────────────────
  if (success) {
    const res = success.mlDecision ? resolutionConfig[success.mlDecision] : null
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Demande envoyée !</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Votre demande de retour est en attente de validation par le vendeur ou l'administrateur.
          </p>

          {/* Recommandation ML */}
          {res && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4 text-left">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">🤖 Analyse automatique</p>
              <p className={`text-sm font-semibold ${res.color}`}>{res.emoji} {success.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Cette recommandation sera examinée par le vendeur avant de prendre une décision finale.
              </p>
            </div>
          )}

          {/* Badge Flowmerce */}
          {success.synced && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl p-3 mb-4 flex items-center gap-2 justify-center">
              <span className="text-xs text-blue-700 dark:text-blue-400">
                ✓ Dossier transmis à la plateforme de gestion des retours
              </span>
            </div>
          )}

          {/* Notice EN_ATTENTE */}
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-800 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">⏳ Prochaine étape</p>
            <p className="text-xs text-amber-600 dark:text-amber-500">
              Le vendeur va examiner votre demande et vous informer de sa décision.
              Votre retour reste en statut <strong>«&nbsp;En attente&nbsp;»</strong> jusqu'à sa validation.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setSuccess(null); setView('liste') }}
              className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition"
            >
              Voir mes retours
            </button>
            <button
              onClick={() => { setSuccess(null); setView('nouveau') }}
              className="flex-1 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Nouveau retour
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Mes Retours</h1>
          {retours.length > 0 && (
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold px-3 py-1 rounded-full">
              {retours.length}
            </span>
          )}
        </div>
        <button
          onClick={() => { setView(view === 'liste' ? 'nouveau' : 'liste'); setError('') }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          {view === 'liste' ? '+ Nouveau retour' : '← Mes retours'}
        </button>
      </div>

      {/* ── Liste des retours ──────────────────────────────────────────── */}
      {view === 'liste' && (
        <div>
          {retours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📦</p>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Aucun retour</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Vous n'avez pas encore de demande de retour.</p>
              {orders.length > 0 && (
                <button onClick={() => setView('nouveau')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Faire une demande
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {retours.map(retour => {
                const status = statusConfig[retour.returnStatus] || statusConfig.EN_ATTENTE
                const res = retour.mlDecision ? resolutionConfig[retour.mlDecision] : null
                return (
                  <div key={retour.id}
                    onClick={() => setSelectedRetour(retour)}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                          {retour.product.images[0]
                            ? <img src={retour.product.images[0]} alt={retour.product.nom} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                          }
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-100">{retour.product.nom}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Commande #{retour.order.id.slice(-6).toUpperCase()}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{reasonLabels[retour.returnReason]}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {new Date(retour.createdAt).toLocaleDateString('fr-FR')} — J+{retour.daysToReturn}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={status.color + ' text-xs font-semibold px-3 py-1 rounded-full shrink-0'}>
                          {status.emoji} {status.label}
                        </span>
                        {retour.flowmerceClaimId && (
                          <span className="text-xs text-blue-500 dark:text-blue-400">⟷ Flowmerce</span>
                        )}
                      </div>
                    </div>

                    {/* Recommandation ML */}
                    {res && (
                      <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-400 mb-1">🤖 Recommandation automatique</p>
                        <p className={`text-sm font-semibold ${res.color}`}>{res.emoji} {retour.mlDecisionLabel}</p>
                        {retour.returnStatus === 'EN_ATTENTE' && (
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                            En attente de validation par le vendeur
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Formulaire nouveau retour (1 seule étape) ─────────────────── */}
      {view === 'nouveau' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">Nouvelle demande de retour</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            ⏰ Délai maximum : <strong>30 jours</strong> après la livraison
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-gray-500 dark:text-gray-400">Aucune commande livrée éligible au retour.</p>
              <Link href="/commandes" className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2 inline-block">
                Voir mes commandes
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Sélection commande */}
              <div>
                <label className={labelClass}>Commande *</label>
                <select value={form.orderId} onChange={e => handleOrderChange(e.target.value)} required className={inputClass}>
                  <option value="">Sélectionner une commande</option>
                  {orders.map(order => {
                    const days = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                    return (
                      <option key={order.id} value={order.id} disabled={days > 30}>
                        #{order.id.slice(-6).toUpperCase()} — {new Date(order.createdAt).toLocaleDateString('fr-FR')} — {order.total.toFixed(2)} DA
                        {days > 30 ? ' (Délai dépassé)' : ` (J+${days})`}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* Sélection produit */}
              {selectedOrder && (
                <div>
                  <label className={labelClass}>Produit à retourner *</label>
                  <select value={form.productId} onChange={e => handleProductChange(e.target.value)} required className={inputClass}>
                    <option value="">Sélectionner un produit</option>
                    {selectedOrder.items.map(item => (
                      <option key={item.id} value={item.product.id}>
                        {item.product.nom} (x{item.quantite} — {item.prix.toFixed(2)} DA)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Aperçu produit sélectionné */}
              {selectedItem && (
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                    {selectedItem.product.images[0]
                      ? <img src={selectedItem.product.images[0]} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center">📦</div>
                    }
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">{selectedItem.product.nom}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">x{selectedItem.quantite} — {selectedItem.prix.toFixed(2)} DA/u</p>
                  </div>
                </div>
              )}

              {/* Raison */}
              <div>
                <label className={labelClass}>Raison du retour *</label>
                <select value={form.returnReason} onChange={e => setForm({ ...form, returnReason: e.target.value })} required className={inputClass}>
                  <option value="">Sélectionner une raison</option>
                  {Object.entries(reasonLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description (optionnel)</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className={inputClass}
                  placeholder="Décrivez le problème en détail..."
                />
              </div>

              {/* Info validation */}
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 rounded-xl p-4">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">ℹ️ Comment ça fonctionne</p>
                <p className="text-xs text-amber-600 dark:text-amber-500">
                  Votre demande sera analysée automatiquement par notre système, puis validée par le vendeur ou l'administrateur.
                  Vous resterez informé du statut de votre retour.
                </p>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition">
                {submitting ? '🤖 Analyse en cours...' : 'Soumettre ma demande'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ── Modal détail retour ───────────────────────────────────────── */}
      {selectedRetour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={e => { if (e.target === e.currentTarget) setSelectedRetour(null) }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
            <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Détail du retour</p>
                <p className="font-semibold text-sm">{selectedRetour.product.nom}</p>
              </div>
              <button onClick={() => setSelectedRetour(null)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Statut */}
              {(() => {
                const status = statusConfig[selectedRetour.returnStatus] || statusConfig.EN_ATTENTE
                return (
                  <div className={status.color + ' rounded-xl p-4'}>
                    <p className="text-sm font-semibold">{status.emoji} {status.label}</p>
                    <p className="text-xs mt-1 opacity-80">{status.desc}</p>
                  </div>
                )
              })()}

              {/* Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Raison</p>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-100">{reasonLabels[selectedRetour.returnReason]}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Date de retour</p>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-100">J+{selectedRetour.daysToReturn}</p>
                </div>
              </div>

              {/* Recommandation ML */}
              {selectedRetour.mlDecision && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">🤖 Recommandation automatique</p>
                  </div>
                  <div className="p-4">
                    {(() => {
                      const res = resolutionConfig[selectedRetour.mlDecision] || resolutionConfig.Reject
                      return (
                        <>
                          <p className={`text-sm font-bold mb-2 ${res.color}`}>{res.emoji} {selectedRetour.mlDecisionLabel}</p>
                          {selectedRetour.mlConfidence && (
                            <p className="text-xs text-gray-500 mb-3">Confiance : {selectedRetour.mlConfidence.toFixed(1)}%</p>
                          )}
                          {selectedRetour.mlProbabilities && (
                            <div>
                              {Object.entries(selectedRetour.mlProbabilities)
                                .sort(([, a], [, b]) => b - a)
                                .map(([label, value]) => {
                                  const maxVal = Math.max(...Object.values(selectedRetour.mlProbabilities!))
                                  return <ProbBar key={label} label={label} value={value * 100} max={maxVal * 100} />
                                })
                              }
                            </div>
                          )}
                          {selectedRetour.returnStatus === 'EN_ATTENTE' && (
                            <div className="mt-3 bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-800 rounded-lg p-2">
                              <p className="text-xs text-amber-600 dark:text-amber-400">
                                ⏳ Cette recommandation est en cours d'examen par le vendeur.
                              </p>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}

              {/* Badge Flowmerce */}
              {selectedRetour.flowmerceClaimId && (
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl p-3 flex items-center gap-2">
                  <span className="text-xs text-blue-700 dark:text-blue-400">
                    ⟷ Dossier traçé dans la plateforme Flowmerce
                  </span>
                </div>
              )}

              <button onClick={() => setSelectedRetour(null)}
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
