'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MLResultCard from '@/components/client/MLResultCard'

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
  createdAt: string
  product: { nom: string; images: string[] }
  order: { id: string }
}

const reasonLabels: Record<string, string> = {
  DEFECTUEUX:      'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:    'Ne correspond pas à la description',
}

const statusConfig: Record<string, { label: string; color: string; emoji: string }> = {
  EN_ATTENTE: { label: 'En attente', color: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400', emoji: '⏳' },
  APPROUVE:   { label: 'Approuvé',   color: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',     emoji: '✅' },
  REFUSE:     { label: 'Refusé',     color: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400',             emoji: '❌' },
  REMBOURSE:  { label: 'Remboursé',  color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',         emoji: '💰' },
}

const resolutionConfig: Record<string, { label: string; emoji: string; bg: string; text: string }> = {
  Refund:   { label: 'Remboursement', emoji: '💰', bg: 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-400' },
  Exchange: { label: 'Échange',       emoji: '🔄', bg: 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800',     text: 'text-blue-700 dark:text-blue-400'  },
  Repair:   { label: 'Réparation',    emoji: '🔧', bg: 'bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800', text: 'text-orange-700 dark:text-orange-400' },
  Reject:   { label: 'Refusé',        emoji: '❌', bg: 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800',         text: 'text-red-700 dark:text-red-400'    },
}

const shippingLabels: Record<string, string> = {
  Seller: '🏪 Frais à la charge du vendeur',
  Buyer:  '📦 Frais à la charge du client',
  Shared: '🤝 Frais partagés',
}

function ProbabilityBar({ label, value, maxValue }: { label: string; value: number; maxValue: number }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs font-mono w-20 text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div className="h-full bg-gray-700 dark:bg-gray-300 rounded-full" style={{ width: Math.round((value / maxValue) * 100) + '%' }} />
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-12 text-right shrink-0">{value.toFixed(1)}%</span>
    </div>
  )
}

type Etape = 'formulaire' | 'scan'

export default function RetoursPage() {
  const [view, setView] = useState<'liste' | 'nouveau'>('liste')
  const [etape, setEtape] = useState<Etape>('formulaire')
  const [retours, setRetours] = useState<Return[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [mlResult, setMlResult] = useState<any>(null)
  const [submittedForm, setSubmittedForm] = useState<any>(null)
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(null)
  const [selectedRetour, setSelectedRetour] = useState<Return | null>(null)
  const [mlDetail, setMlDetail] = useState<any>(null)
  const [loadingMlDetail, setLoadingMlDetail] = useState(false)

  // Scan 3
  const [scanImages, setScanImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    orderId: '', productId: '', returnReason: '', description: '',
  })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const [retoursRes, ordersRes] = await Promise.all([
      fetch('/api/retours'),
      fetch('/api/commandes'),
    ])
    const retoursData = await retoursRes.json()
    const ordersData  = await ordersRes.json()
    setRetours(Array.isArray(retoursData) ? retoursData : [])
    setOrders(Array.isArray(ordersData) ? ordersData.filter((o: Order) => o.statut === 'LIVREE') : [])
    setLoading(false)
  }

  const handleOrderChange = (orderId: string) => {
    setSelectedOrder(orders.find(o => o.id === orderId) || null)
    setSelectedOrderItem(null)
    setForm({ ...form, orderId, productId: '' })
  }

  const handleProductChange = (productId: string) => {
    setSelectedOrderItem(selectedOrder?.items.find(i => i.product.id === productId) || null)
    setForm({ ...form, productId })
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => setScanImages(prev => [...prev, ev.target?.result as string])
      reader.readAsDataURL(file)
    })
  }

  // Étape 1 — valider le formulaire et passer au scan
  const handleNextToScan = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.orderId || !form.productId || !form.returnReason) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    setEtape('scan')
  }

  // Étape 2 — soumettre avec les images de scan
  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)
    setMlResult(null)
    try {
      const res = await fetch('/api/retours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          scan3Images: scanImages.length > 0 ? scanImages : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setMlResult(data.mlResult)
      setSubmittedForm({
        returnReason: form.returnReason,
        quantity: selectedOrderItem?.quantite || 1,
        productName: selectedOrderItem?.product.nom || '',
      })
      setForm({ orderId: '', productId: '', returnReason: '', description: '' })
      setSelectedOrder(null)
      setSelectedOrderItem(null)
      setScanImages([])
      setEtape('formulaire')
      fetchData()
    } catch { setError('Erreur serveur') } finally { setSubmitting(false) }
  }

  const handleOpenDetail = async (retour: Return) => {
    setSelectedRetour(retour)
    setMlDetail(null)
    if (retour.mlDecision) {
      setLoadingMlDetail(true)
      try {
        const res = await fetch('/api/retours/' + retour.id + '/ml-detail')
        if (res.ok) setMlDetail(await res.json())
      } catch { } finally { setLoadingMlDetail(false) }
    }
  }

  const inputClass  = "w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass  = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const sectionTitle = "text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-medium mb-3"

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">Chargement...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      {!mlResult && (
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
            onClick={() => { setView(view === 'liste' ? 'nouveau' : 'liste'); setEtape('formulaire'); setError('') }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            {view === 'liste' ? '+ Nouveau retour' : '← Mes retours'}
          </button>
        </div>
      )}

      {/* Résultat ML */}
      {mlResult && submittedForm && (
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Résultat de l'analyse</h1>
          <MLResultCard mlResult={mlResult} formData={submittedForm} />
          <div className="flex gap-3 mt-6">
            <button onClick={() => { setMlResult(null); setView('liste') }}
              className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-semibold hover:bg-gray-700 transition">
              Voir mes retours
            </button>
            <button onClick={() => { setMlResult(null); setView('nouveau') }}
              className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Nouveau retour
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      {!mlResult && view === 'liste' && (
        <div>
          {retours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📦</p>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Aucun retour</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Vous n'avez pas encore effectué de demande de retour.</p>
              {orders.length > 0 && (
                <button onClick={() => setView('nouveau')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Faire une demande
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {retours.map(retour => {
                const status = statusConfig[retour.returnStatus] || statusConfig.EN_ATTENTE
                return (
                  <div key={retour.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
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
                      <span className={status.color + ' text-xs font-semibold px-3 py-1 rounded-full shrink-0'}>
                        {status.emoji} {status.label}
                      </span>
                    </div>
                    {retour.mlDecision && (
                      <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">🤖 Décision automatique</p>
                          <button onClick={() => handleOpenDetail(retour)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                            Voir le détail →
                          </button>
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{retour.mlDecisionLabel}</p>
                          <div className="flex gap-2 flex-wrap">
                            {retour.mlConfidence && (
                              <span className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 px-2 py-1 rounded-full">
                                {retour.mlConfidence.toFixed(1)}% confiance
                              </span>
                            )}
                            {retour.mlResponsibility && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                Frais : {retour.mlResponsibility}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Formulaire nouveau retour */}
      {!mlResult && view === 'nouveau' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">

          {/* Indicateur d'étapes */}
          <div className="flex items-center gap-3 mb-6">
            {[
              { key: 'formulaire', label: '1. Motif' },
              { key: 'scan',       label: '2. Scanner le produit' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  etape === s.key ? 'bg-blue-600 text-white' :
                  (etape === 'scan' && s.key === 'formulaire') ? 'bg-green-500 text-white' :
                  'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {etape === 'scan' && s.key === 'formulaire' ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium ${etape === s.key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {s.label}
                </span>
                {i < 1 && <div className={`w-8 h-0.5 ${etape === 'scan' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nouvelle demande de retour</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">⏰ Délai maximum : <strong>30 jours</strong> après la livraison</p>

          {error && <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-gray-500 dark:text-gray-400">Aucune commande livrée éligible au retour.</p>
              <Link href="/commandes" className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2 inline-block">Voir mes commandes</Link>
            </div>
          ) : (
            <>
              {/* ── Étape 1 : Formulaire ── */}
              {etape === 'formulaire' && (
                <form onSubmit={handleNextToScan} className="space-y-5">
                  <div>
                    <p className={sectionTitle}>📦 Commande concernée</p>
                    <div className="space-y-3">
                      <div>
                        <label className={labelClass}>Commande *</label>
                        <select value={form.orderId} onChange={e => handleOrderChange(e.target.value)} required className={inputClass}>
                          <option value="">Sélectionner une commande</option>
                          {orders.map(order => {
                            const days = Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                            return (
                              <option key={order.id} value={order.id} disabled={days > 30}>
                                #{order.id.slice(-6).toUpperCase()} — {new Date(order.createdAt).toLocaleDateString('fr-FR')} — {order.total.toFixed(2)} DA
                                {days > 30 ? ' (Délai dépassé)' : ` (J+${days})`}
                              </option>
                            )
                          })}
                        </select>
                      </div>
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
                      {selectedOrderItem && (
                        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                            {selectedOrderItem.product.images[0]
                              ? <img src={selectedOrderItem.product.images[0]} alt="" className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center">📦</div>
                            }
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">{selectedOrderItem.product.nom}</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">x{selectedOrderItem.quantite} — {selectedOrderItem.prix.toFixed(2)} DA/u</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800" />

                  <div>
                    <p className={sectionTitle}>📋 Motif du retour</p>
                    <div className="space-y-3">
                      <div>
                        <label className={labelClass}>Raison du retour *</label>
                        <select value={form.returnReason} onChange={e => setForm({ ...form, returnReason: e.target.value })} required className={inputClass}>
                          <option value="">Sélectionner une raison</option>
                          {Object.entries(reasonLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Description (optionnel)</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2}
                          className={inputClass} placeholder="Décrivez le problème en détail..." />
                      </div>
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition mt-2">
                    Suivant → Scanner le produit
                  </button>
                </form>
              )}

              {/* ── Étape 2 : Scan produit ── */}
              {etape === 'scan' && (
                <div className="space-y-5">
                  <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-1">
                      📷 Photographiez le produit à retourner
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-500">
                      Ces photos permettent de vérifier l'état du produit et d'accélérer le traitement de votre retour. Le système compare automatiquement avec les photos d'expédition.
                    </p>
                  </div>

                  {/* Résumé de la demande */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">Résumé de votre demande</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{selectedOrderItem?.product.nom}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{reasonLabels[form.returnReason]}</p>
                  </div>

                  {/* Zone upload */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition"
                  >
                    {scanImages.length > 0 ? (
                      <div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {scanImages.map((img, i) => (
                            <img key={i} src={img} alt="" className="w-full h-20 object-cover rounded-lg" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{scanImages.length} photo(s) — cliquez pour ajouter</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-4xl mb-3">📸</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Cliquez pour photographier le produit</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 à 4 photos recommandées</p>
                      </>
                    )}
                  </div>

                  <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />

                  {scanImages.length > 0 && (
                    <button
                      onClick={() => setScanImages([])}
                      className="text-xs text-red-500 dark:text-red-400 hover:underline"
                    >
                      🗑️ Supprimer les photos
                    </button>
                  )}

                  {error && <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setEtape('formulaire')}
                      className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      ← Retour
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-2 flex-grow bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
                    >
                      {submitting ? '🤖 Analyse en cours...' : scanImages.length > 0 ? '✅ Soumettre avec scan' : 'Soumettre sans photo'}
                    </button>
                  </div>

                  {scanImages.length === 0 && (
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                      ⚠️ Sans photo, l'analyse visuelle ne sera pas disponible
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Modal détail ML */}
      {selectedRetour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
            <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Tracabilité de décision</p>
                <p className="font-semibold text-sm">{selectedRetour.product.nom}</p>
              </div>
              <button onClick={() => { setSelectedRetour(null); setMlDetail(null) }} className="text-gray-400 hover:text-white text-xl transition">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Statut actuel</p>
                  <span className={statusConfig[selectedRetour.returnStatus]?.color + ' text-xs font-semibold px-2 py-1 rounded-full'}>
                    {statusConfig[selectedRetour.returnStatus]?.emoji} {statusConfig[selectedRetour.returnStatus]?.label}
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Raison</p>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-100">{reasonLabels[selectedRetour.returnReason]}</p>
                </div>
              </div>

              {selectedRetour.mlDecision && (
                <div>
                  {loadingMlDetail ? (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center text-gray-400 text-sm">🤖 Chargement...</div>
                  ) : mlDetail ? (
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-3">Données analysées</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                          {[
                            ['Produit', mlDetail.input_summary?.product_category_normalized],
                            ['Prix', mlDetail.input_summary?.price_da?.toFixed(0) + ' DA'],
                            ['Délai', mlDetail.input_summary?.days_to_return + 'j / ' + mlDetail.policy_applied?.return_window_days + 'j'],
                            ['Raison', mlDetail.input_summary?.return_reason],
                            ['Fraud Score', mlDetail.input_summary?.fraud_score],
                          ].map(([key, val]) => (
                            <div key={key as string} className="flex justify-between gap-2">
                              <span className="text-gray-500 dark:text-gray-400">{key}</span>
                              <span className={`font-medium text-right ${key === 'Fraud Score' && Number(val) > 50 ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {(() => {
                        const res = resolutionConfig[mlDetail.decision?.resolution] || resolutionConfig.Reject
                        const probEntries = Object.entries(mlDetail.decision?.probabilities || {}).sort((a: any, b: any) => b[1] - a[1]) as [string, number][]
                        const maxProb = probEntries[0]?.[1] || 100
                        return (
                          <div className={res.bg + ' rounded-xl p-4'}>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{res.emoji}</span>
                              <div>
                                <p className={res.text + ' text-sm font-bold'}>RÉSOLUTION : {res.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Confiance : {mlDetail.decision?.confidence?.toFixed(1)}%</p>
                              </div>
                            </div>
                            {probEntries.map(([label, value]) => <ProbabilityBar key={label} label={label} value={value} maxValue={maxProb} />)}
                          </div>
                        )
                      })()}
                      {mlDetail.decision?.shipping && (() => {
                        const shipEntries = Object.entries(mlDetail.decision.shipping.probabilities || {}).sort((a: any, b: any) => b[1] - a[1]) as [string, number][]
                        const maxShip = shipEntries[0]?.[1] || 100
                        return (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{shippingLabels[mlDetail.decision.shipping.responsible]}</p>
                            <p className="text-xs text-gray-500 mb-3">Confiance : {mlDetail.decision.shipping.confidence?.toFixed(1)}%</p>
                            {shipEntries.map(([label, value]) => <ProbabilityBar key={label} label={label} value={value} maxValue={maxShip} />)}
                          </div>
                        )
                      })()}
                    </div>
                  ) : (
                    <div className={resolutionConfig[selectedRetour.mlDecision]?.bg + ' rounded-xl p-4'}>
                      <p className={resolutionConfig[selectedRetour.mlDecision]?.text + ' text-sm font-bold mb-2'}>
                        {resolutionConfig[selectedRetour.mlDecision]?.emoji} {selectedRetour.mlDecisionLabel}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <button onClick={() => { setSelectedRetour(null); setMlDetail(null) }}
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