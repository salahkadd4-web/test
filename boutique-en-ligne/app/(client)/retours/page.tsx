'use client'

import { useState, useEffect } from 'react'
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
  EN_ATTENTE: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', emoji: '⏳' },
  APPROUVE:   { label: 'Approuvé',   color: 'bg-green-100 text-green-700',   emoji: '✅' },
  REFUSE:     { label: 'Refusé',     color: 'bg-red-100 text-red-700',       emoji: '❌' },
  REMBOURSE:  { label: 'Remboursé',  color: 'bg-blue-100 text-blue-700',     emoji: '💰' },
}

const WILAYAS = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna',
  'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira',
  'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou',
  'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
  'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine',
  'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla',
  'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès',
  'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
  'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma',
  'Aïn Témouchent', 'Ghardaïa', 'Relizane',
]

const PAYMENT_METHODS = [
  'Virement bancaire',
  'BaridiMob',
  'CIB',
  'Espèces livraison',
  'Dahabia',
]

const SHIPPING_METHODS = [
  'Express',
  'EMS',
  'Retrait en boutique',
  'Yassir',
  'Maystro',
  'Zr Express',
]

export default function RetoursPage() {
  const [view, setView] = useState<'liste' | 'nouveau'>('liste')
  const [retours, setRetours] = useState<Return[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [mlResult, setMlResult] = useState<any>(null)
  const [submittedForm, setSubmittedForm] = useState<any>(null)
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(null)

  const [form, setForm] = useState({
    orderId:        '',
    productId:      '',
    returnReason:   '',
    description:    '',
    wilaya:         'Alger',
    customerAge:    '',
    customerGender: 'Male',
    paymentMethod:  'Virement bancaire',
    shippingMethod: 'Express',
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
    const livrees = Array.isArray(ordersData)
      ? ordersData.filter((o: Order) => o.statut === 'LIVREE')
      : []
    setOrders(livrees)
    setLoading(false)
  }

  const handleOrderChange = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId) || null
    setSelectedOrder(order)
    setSelectedOrderItem(null)
    setForm({ ...form, orderId, productId: '' })
  }

  const handleProductChange = (productId: string) => {
    const item = selectedOrder?.items.find((i) => i.product.id === productId) || null
    setSelectedOrderItem(item)
    setForm({ ...form, productId })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    setMlResult(null)

    try {
      const res = await fetch('/api/retours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          customerAge: form.customerAge ? parseInt(form.customerAge) : 30,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      setMlResult(data.mlResult)
      setSubmittedForm({
        wilaya:         form.wilaya,
        returnReason:   form.returnReason,
        quantity:       selectedOrderItem?.quantite || 1,
        productName:    selectedOrderItem?.product.nom || '',
        customerAge:    form.customerAge ? parseInt(form.customerAge) : undefined,
        customerGender: form.customerGender,
        paymentMethod:  form.paymentMethod,
        shippingMethod: form.shippingMethod,
      })

      setForm({
        orderId: '', productId: '', returnReason: '', description: '',
        wilaya: 'Alger', customerAge: '', customerGender: 'Male',
        paymentMethod: 'Virement bancaire', shippingMethod: 'Express',
      })
      setSelectedOrder(null)
      setSelectedOrderItem(null)
      fetchData()
    } catch {
      setError('Erreur serveur')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">
        Chargement...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {!mlResult && (
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mes Retours</h1>
          <button
            onClick={() => { setView(view === 'liste' ? 'nouveau' : 'liste'); setError('') }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            {view === 'liste' ? '+ Nouveau retour' : '← Mes retours'}
          </button>
        </div>
      )}

      {/* Résultat ML */}
      {mlResult && submittedForm && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Résultat de l'analyse</h1>
          </div>
          <MLResultCard mlResult={mlResult} formData={submittedForm} />
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => { setMlResult(null); setView('liste') }}
              className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition"
            >
              Voir mes retours
            </button>
            <button
              onClick={() => { setMlResult(null); setView('nouveau') }}
              className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Nouveau retour
            </button>
          </div>
        </div>
      )}

      {/* Liste des retours */}
      {!mlResult && view === 'liste' && (
        <div>
          {retours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📦</p>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Aucun retour</h2>
              <p className="text-gray-500 mb-6">Vous n'avez pas encore effectué de demande de retour.</p>
              {orders.length > 0 && (
                <button
                  onClick={() => setView('nouveau')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Faire une demande
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {retours.map((retour) => {
                const status = statusConfig[retour.returnStatus] || statusConfig.EN_ATTENTE
                return (
                  <div key={retour.id} className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                          {retour.product.images[0] ? (
                            <img
                              src={retour.product.images[0]}
                              alt={retour.product.nom}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{retour.product.nom}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Commande #{retour.order.id.slice(-6).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {reasonLabels[retour.returnReason] || retour.returnReason}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(retour.createdAt).toLocaleDateString('fr-FR')} — J+{retour.daysToReturn}
                          </p>
                        </div>
                      </div>
                      <span className={status.color + ' text-xs font-semibold px-3 py-1 rounded-full shrink-0'}>
                        {status.emoji} {status.label}
                      </span>
                    </div>
                    {retour.mlDecision && (
                      <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-2">🤖 Décision automatique</p>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <p className="text-sm font-semibold text-gray-800">{retour.mlDecisionLabel}</p>
                          <div className="flex gap-3">
                            {retour.mlConfidence && (
                              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                {retour.mlConfidence.toFixed(1)}% confiance
                              </span>
                            )}
                            {retour.mlResponsibility && (
                              <span className="text-xs text-gray-500">
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
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Nouvelle demande de retour</h2>
          <p className="text-sm text-gray-500 mb-6">
            ⏰ Délai maximum : <strong>30 jours</strong> après la livraison
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-gray-500">Aucune commande livrée éligible au retour.</p>
              <Link href="/commandes" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                Voir mes commandes
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Section : Commande */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
                  📦 Commande concernée
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Commande *
                    </label>
                    <select
                      value={form.orderId}
                      onChange={(e) => handleOrderChange(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionner une commande</option>
                      {orders.map((order) => {
                        const days = Math.floor(
                          (new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24)
                        )
                        return (
                          <option key={order.id} value={order.id} disabled={days > 30}>
                            #{order.id.slice(-6).toUpperCase()} — {new Date(order.createdAt).toLocaleDateString('fr-FR')} — {order.total.toFixed(2)} DA
                            {days > 30 ? ' (Délai dépassé)' : ' (J+' + days + ')'}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  {selectedOrder && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Produit à retourner *
                      </label>
                      <select
                        value={form.productId}
                        onChange={(e) => handleProductChange(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Sélectionner un produit</option>
                        {selectedOrder.items.map((item) => (
                          <option key={item.id} value={item.product.id}>
                            {item.product.nom} (x{item.quantite} — {item.prix.toFixed(2)} DA)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedOrderItem && (
                    <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg overflow-hidden shrink-0">
                        {selectedOrderItem.product.images[0] ? (
                          <img
                            src={selectedOrderItem.product.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">📦</div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-blue-800">{selectedOrderItem.product.nom}</p>
                        <p className="text-xs text-blue-600">
                          Quantité : {selectedOrderItem.quantite} — Prix unitaire : {selectedOrderItem.prix.toFixed(2)} DA
                        </p>
                        <p className="text-xs text-blue-600">
                          Total : {(selectedOrderItem.prix * selectedOrderItem.quantite).toFixed(2)} DA
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Section : Raison */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
                  📋 Motif du retour
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Raison du retour *
                    </label>
                    <select
                      value={form.returnReason}
                      onChange={(e) => setForm({ ...form, returnReason: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionner une raison</option>
                      {Object.entries(reasonLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (optionnel)
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Décrivez le problème en détail..."
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Section : Informations client */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
                  👤 Vos informations
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Wilaya *
                    </label>
                    <select
                      value={form.wilaya}
                      onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {WILAYAS.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Genre
                    </label>
                    <select
                      value={form.customerGender}
                      onChange={(e) => setForm({ ...form, customerGender: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Male">Homme</option>
                      <option value="Female">Femme</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Âge
                    </label>
                    <input
                      type="number"
                      value={form.customerAge}
                      onChange={(e) => setForm({ ...form, customerAge: e.target.value })}
                      min="18"
                      max="100"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 35"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Section : Livraison & Paiement */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
                  🚚 Livraison & Paiement
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Méthode de paiement
                    </label>
                    <select
                      value={form.paymentMethod}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {PAYMENT_METHODS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Méthode de livraison
                    </label>
                    <select
                      value={form.shippingMethod}
                      onChange={(e) => setForm({ ...form, shippingMethod: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {SHIPPING_METHODS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 mt-2"
              >
                {submitting ? '🤖 Analyse en cours...' : 'Soumettre la demande'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}