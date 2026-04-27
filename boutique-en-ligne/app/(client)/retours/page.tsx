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
  id:            string
  returnReason:  string
  returnStatus:  string
  daysToReturn:  number
  description:   string | null
  mlDecision:    string | null
  finalDecision: string | null
  finalNote:     string | null
  fraudScore:    number | null
  createdAt:     string
  product: { nom: string; images: string[] }
  order:   { id: string }
}

// ── Labels ────────────────────────────────────────────────────────────────

const reasonLabels: Record<string, string> = {
  DEFECTUEUX:      'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:    'Ne correspond pas à la description',
}

// ── Config résolutions affichées au client (sans mention ML) ──────────────

const resolutionClient: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  Refund:   { label: 'Remboursement accordé',   emoji: '💰', color: 'text-green-700 dark:text-green-400',   bg: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'   },
  Exchange: { label: 'Échange accordé',         emoji: '🔄', color: 'text-blue-700 dark:text-blue-400',     bg: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'         },
  Repair:   { label: 'Réparation accordée',     emoji: '🔧', color: 'text-orange-700 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800' },
  Reject:   { label: 'Demande non accordée',    emoji: '⚠️', color: 'text-red-700 dark:text-red-400',       bg: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'             },
}

// ── Page principale ────────────────────────────────────────────────────────

export default function RetoursPage() {
  const [view,            setView]           = useState<'liste' | 'nouveau'>('liste')
  const [retours,         setRetours]        = useState<Return[]>([])
  const [orders,          setOrders]         = useState<Order[]>([])
  const [loading,         setLoading]        = useState(true)
  const [submitting,      setSubmitting]     = useState(false)
  const [error,           setError]          = useState('')
  const [success,         setSuccess]        = useState<{ synced: boolean } | null>(null)
  const [selectedOrder,   setSelectedOrder]  = useState<Order | null>(null)
  const [selectedItem,    setSelectedItem]   = useState<OrderItem | null>(null)
  const [selectedRetour,  setSelectedRetour] = useState<Return | null>(null)
  const [form, setForm] = useState({ orderId: '', productId: '', returnReason: '', description: '' })

  const inputClass = 'w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

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
      if (!res.ok) {
        // Afficher le message spécifique du serveur (délai, catégorie, etc.)
        setError(data.error || 'Erreur lors de la soumission')
        return
      }

      setSuccess({ synced: data.flowmerceSynced || false })
      setForm({ orderId: '', productId: '', returnReason: '', description: '' })
      setSelectedOrder(null)
      setSelectedItem(null)
      fetchData()
    } catch { setError('Erreur serveur') }
    finally   { setSubmitting(false) }
  }

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">
      Chargement...
    </div>
  )

  // ── Écran de confirmation après soumission ────────────────────────────────
  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Demande envoyée !</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Votre demande de retour a bien été reçue et est en attente de traitement.
          </p>

          {/* Étapes attendues — sans mention ML ni Flowmerce */}
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-800 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">⏳ Prochaine étape</p>
            <p className="text-xs text-amber-600 dark:text-amber-500">
              Le vendeur va examiner votre demande et vous communiquer sa décision finale.
              Votre retour restera en statut <strong>«&nbsp;En attente&nbsp;»</strong> jusqu'à validation.
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

      {/* ── Liste des retours ──────────────────────────────────────────────── */}
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

                // ── Construire l'affichage selon le statut ────────────────
                const isFinalised = retour.returnStatus !== 'EN_ATTENTE'
                const finalRes    = retour.finalDecision ? resolutionClient[retour.finalDecision] : null
                const hasFraud    = (retour.fraudScore ?? 0) > 60

                // Badge statut
                let badgeText  = '⏳ En attente de décision'
                let badgeClass = 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'

                if (isFinalised && finalRes) {
                  badgeText  = `${finalRes.emoji} ${finalRes.label}`
                  if (retour.finalDecision === 'Reject') {
                    badgeClass = 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                  } else {
                    badgeClass = 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                  }
                }

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

                      <span className={badgeClass + ' text-xs font-semibold px-3 py-1 rounded-full shrink-0 text-center'}>
                        {badgeText}
                      </span>
                    </div>

                    {/* Signal fraude si approuvé avec score élevé */}
                    {isFinalised && hasFraud && retour.finalDecision !== 'Reject' && (
                      <div className="mt-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-3 flex items-center gap-2">
                        <span className="text-orange-600 dark:text-orange-400 text-xs font-medium">
                          ⚠️ Attention — Votre compte présente un historique de retours anormal.
                          Un signalement peut être transmis à notre équipe de contrôle.
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Formulaire nouveau retour ──────────────────────────────────────── */}
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

              {/* Aperçu produit */}
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

              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 rounded-xl p-4">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">ℹ️ Comment ça fonctionne</p>
                <p className="text-xs text-amber-600 dark:text-amber-500">
                  Votre demande sera examinée par le vendeur ou l'administrateur.
                  Vous serez informé dès qu'une décision sera prise.
                </p>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition">
                {submitting ? '📤 Envoi en cours...' : 'Soumettre ma demande'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ── Modal détail retour ─────────────────────────────────────────────── */}
      {selectedRetour && (() => {
        const isFinalised = selectedRetour.returnStatus !== 'EN_ATTENTE'
        const finalRes    = selectedRetour.finalDecision ? resolutionClient[selectedRetour.finalDecision] : null
        const hasFraud    = (selectedRetour.fraudScore ?? 0) > 60

        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={e => { if (e.target === e.currentTarget) setSelectedRetour(null) }}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">

              {/* Header */}
              <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Détail du retour</p>
                  <p className="font-semibold text-sm">{selectedRetour.product.nom}</p>
                </div>
                <button onClick={() => setSelectedRetour(null)} className="text-gray-400 hover:text-white text-xl">✕</button>
              </div>

              <div className="p-6 space-y-4">

                {/* ── Statut / Décision finale ──────────────────────────── */}
                {!isFinalised ? (
                  // EN ATTENTE : message neutre, aucune info ML
                  <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">⏳ Demande en cours d'examen</p>
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                      Votre demande est en attente de validation. Vous serez notifié dès qu'une décision sera prise.
                    </p>
                  </div>
                ) : finalRes ? (
                  // DÉCISION FINALE : afficher uniquement la résolution
                  <div className={`border rounded-xl p-4 ${finalRes.bg}`}>
                    <p className={`text-base font-bold ${finalRes.color}`}>
                      {finalRes.emoji} {finalRes.label}
                    </p>
                    {selectedRetour.finalDecision === 'Reject' && selectedRetour.finalNote && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">
                        Motif : {selectedRetour.finalNote}
                      </p>
                    )}
                    {selectedRetour.finalDecision === 'Refund' && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                        Le remboursement sera traité sous {5} jours ouvrables.
                      </p>
                    )}
                    {selectedRetour.finalDecision === 'Exchange' && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        Un échange sera organisé. Le vendeur vous contactera sous peu.
                      </p>
                    )}
                    {selectedRetour.finalDecision === 'Repair' && (
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                        Le produit sera pris en charge pour réparation.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Décision en cours de traitement.</p>
                  </div>
                )}

                {/* ── Signal fraude (si approuvé avec fraude élevée) ─────── */}
                {isFinalised && hasFraud && selectedRetour.finalDecision !== 'Reject' && (
                  <div className="bg-orange-50 dark:bg-orange-950 border border-orange-300 dark:border-orange-700 rounded-xl p-4">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-1">
                      ⚠️ Signalement — Comportement inhabituel détecté
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-500">
                      Votre historique de retours a déclenché un contrôle automatique.
                      Un nombre élevé de demandes peut entraîner une restriction de vos accès.
                    </p>
                  </div>
                )}

                {/* ── Infos générales ────────────────────────────────────── */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Raison</p>
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-100">{reasonLabels[selectedRetour.returnReason]}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Date de demande</p>
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-100">J+{selectedRetour.daysToReturn}</p>
                  </div>
                </div>

                {/* ── Description client ─────────────────────────────────── */}
                {selectedRetour.description && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Votre description</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{selectedRetour.description}</p>
                  </div>
                )}

                <button onClick={() => setSelectedRetour(null)}
                  className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}