'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

type OrderItem = {
  id: string
  quantite: number
  prix: number
  product: { nom: string; images: string[] }
}

type Order = {
  id: string
  statut: string
  total: number
  adresse: string
  createdAt: string
  scan1Done: boolean
  scan2Done: boolean
  scan2Result: string | null
  items: OrderItem[]
}

const statutConfig: Record<string, { label: string; color: string; emoji: string }> = {
  EN_ATTENTE:     { label: 'En attente',     color: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400', emoji: '⏳' },
  CONFIRMEE:      { label: 'Confirmée',      color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',         emoji: '✅' },
  EN_PREPARATION: { label: 'En préparation', color: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400', emoji: '🔧' },
  EXPEDIEE:       { label: 'Expédiée',       color: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400', emoji: '🚚' },
  LIVREE:         { label: 'Livrée',         color: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',     emoji: '📦' },
  ANNULEE:        { label: 'Annulée',        color: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400',             emoji: '❌' },
}

// ── Flowmerce config ──────────────────────────────────────────────────────────
const FLOWMERCE_BASE    = process.env.NEXT_PUBLIC_FLOWMERCE_URL ?? 'https://tulip-gulp-coveting.ngrok-free.dev'
const FLOWMERCE_API_KEY = 'flk_YyTkeVs3VMEjWzBwHs4uetlZfCIBaUCK'
// ─────────────────────────────────────────────────────────────────────────────

function CommandesContent() {
  const searchParams      = useSearchParams()
  const success           = searchParams.get('success')
  const { data: session } = useSession()
  const user = session?.user as { nom?: string; prenom?: string; name?: string; email?: string } | undefined

  const [commandes, setCommandes] = useState<Order[]>([])
  const [loading, setLoading]     = useState(true)
  const [expanded, setExpanded]   = useState<string | null>(null)

  // ── Scan livraison (Scan 2) ──────────────────────────────────────────────
  const [showScanModal, setShowScanModal] = useState(false)
  const [scanCommande, setScanCommande]   = useState<Order | null>(null)
  const [scanImages, setScanImages]       = useState<string[]>([])
  const [scanLoading, setScanLoading]     = useState(false)
  const [scanResult, setScanResult]       = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/commandes')
      .then(r => r.json())
      .then(data => { setCommandes(data); setLoading(false) })
  }, [])

  // ── Scan livraison handler ───────────────────────────────────────────────
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => setScanImages(prev => [...prev, ev.target?.result as string])
      reader.readAsDataURL(file)
    })
  }

  const handleScanLivraison = async () => {
    if (!scanCommande || scanImages.length === 0) return
    setScanLoading(true)
    try {
      const res = await fetch(`/api/commandes/${scanCommande.id}/scan-livraison`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagesB64: scanImages }),
      })
      const data = await res.json()
      setScanResult(data)
      if (data.delivery_confirmed) {
        setCommandes(prev => prev.map(c =>
          c.id === scanCommande.id
            ? { ...c, statut: 'LIVREE', scan2Done: true, scan2Result: data.decision }
            : c
        ))
      }
    } catch {
      setScanResult({ error: 'Erreur serveur' })
    } finally {
      setScanLoading(false)
    }
  }

  // ── Ouvre la page Flowmerce dans un nouvel onglet ────────────────────────
  const openFlowmerceReturn = (commande: Order, item: OrderItem) => {
    const url = new URL(`${FLOWMERCE_BASE}/return/${FLOWMERCE_API_KEY}`)
    url.searchParams.set('customer_name',  `${user?.nom ?? ''} ${user?.prenom ?? ''}`.trim() || user?.name || '')
    url.searchParams.set('customer_email', user?.email ?? '')
    url.searchParams.set('product_name',   item.product.nom)
    url.searchParams.set('order_id',       commande.id)
    url.searchParams.set('shop_name',      'CabaStore')
    url.searchParams.set('order_date',     commande.createdAt)
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-4 text-center text-gray-500 dark:text-gray-400">
      Chargement des commandes...
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-4">

      {/* Succès commande */}
      {success && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold">Commande passée avec succès !</p>
            <p className="text-sm">Vous pouvez suivre votre commande ci-dessous.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Mes Commandes</h1>
        <Link
          href="/commandes/nouveau"
          className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          + Nouvelle commande
        </Link>
      </div>

      {commandes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📦</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Aucune commande</h2>
          <Link href="/produits" className="bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition">
            Voir les produits
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {commandes.map(commande => {
            const statut     = statutConfig[commande.statut] ?? statutConfig.EN_ATTENTE
            const isExpanded = expanded === commande.id
            const canScan    = commande.statut === 'EXPEDIEE' && !commande.scan2Done

            return (
              <div
                key={commande.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
              >
                {/* ── En-tête de la commande ── */}
                <div
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  onClick={() => setExpanded(isExpanded ? null : commande.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">#{commande.id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(commande.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statut.color}`}>
                      {statut.emoji} {statut.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {canScan && (
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setScanCommande(commande)
                          setScanImages([])
                          setScanResult(null)
                          setShowScanModal(true)
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition animate-pulse"
                      >
                        📷 Scanner à la réception
                      </button>
                    )}
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{commande.total.toFixed(2)} DA</p>
                    <span className="text-gray-400 text-sm">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* ── Détail déplié ── */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4 space-y-4">

                    {/* Résultat Scan 2 */}
                    {commande.scan2Done && (
                      <div className={`rounded-xl p-3 ${
                        commande.scan2Result === 'CONFORME'
                          ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                          : 'bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800'
                      }`}>
                        <p className={`text-xs font-semibold ${
                          commande.scan2Result === 'CONFORME'
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-orange-700 dark:text-orange-400'
                        }`}>
                          📷 Scan réception : {commande.scan2Result}
                        </p>
                      </div>
                    )}

                    {/* Suivi */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">🚀 Suivi</p>
                      <div className="flex items-center gap-1">
                        {['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE'].map((s, i) => {
                          const list         = ['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE']
                          const currentIndex = list.indexOf(commande.statut)
                          const isDone       = i <= currentIndex
                          const cfg          = statutConfig[s]
                          return (
                            <div key={s} className="flex items-center flex-1">
                              <div className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isDone ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                                  {cfg.emoji}
                                </div>
                                <p className={`text-xs mt-1 text-center hidden sm:block ${isDone ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-400'}`}>
                                  {cfg.label}
                                </p>
                              </div>
                              {i < 4 && (
                                <div className={`h-0.5 flex-1 ${i < currentIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Articles */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">📦 Articles</p>
                      <div className="space-y-3">
                        {commande.items.map(item => (
                          <div key={item.id} className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                              {item.product.images[0]
                                ? <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center">📦</div>
                              }
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.product.nom}</p>
                              <p className="text-xs text-gray-500">x{item.quantite} — {item.prix.toFixed(2)} DA/u</p>

                              {/* ── Bouton retour → ouvre Flowmerce dans un nouvel onglet ── */}
                              {commande.statut === 'LIVREE' && (
                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    openFlowmerceReturn(commande, item)
                                  }}
                                  className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
                                >
                                  ↩ Retourner via Flowmerce
                                </button>
                              )}
                            </div>
                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 shrink-0">
                              {(item.prix * item.quantite).toFixed(2)} DA
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between font-bold text-lg">
                      <span className="text-gray-800 dark:text-gray-100">Total</span>
                      <span className="text-blue-600 dark:text-blue-400">{commande.total.toFixed(2)} DA</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          Modal — Scan Livraison (inchangé)
      ══════════════════════════════════════════════════════════════════════ */}
      {showScanModal && scanCommande && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-800">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">📷 Scanner à la réception</h2>
                <p className="text-xs text-gray-500">Commande #{scanCommande.id.slice(-8).toUpperCase()}</p>
              </div>
              <button onClick={() => setShowScanModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {!scanResult ? (
              <>
                <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 mb-4">
                  <p className="text-xs text-indigo-700 dark:text-indigo-400">
                    📌 Photographiez le colis/produit reçu. Le système va vérifier qu'il correspond à votre commande et confirmer la livraison.
                  </p>
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 transition mb-4"
                >
                  {scanImages.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {scanImages.map((img, i) => (
                        <img key={i} src={img} alt="" className="w-full h-16 object-cover rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-3xl mb-2">📸</p>
                      <p className="text-sm text-gray-500">Photographiez le produit reçu</p>
                    </>
                  )}
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowScanModal(false)}
                    className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-2.5 rounded-xl text-sm font-medium transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleScanLivraison}
                    disabled={scanLoading || scanImages.length === 0}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50"
                  >
                    {scanLoading ? '🔄 Vérification...' : '✅ Confirmer réception'}
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div className={`rounded-xl p-4 mb-4 text-center ${
                  scanResult.delivery_confirmed
                    ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                    : 'bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800'
                }`}>
                  <p className="text-3xl mb-2">{scanResult.delivery_confirmed ? '✅' : '⚠️'}</p>
                  <p className={`text-sm font-bold ${scanResult.delivery_confirmed ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
                    {scanResult.message}
                  </p>
                  {scanResult.similarity_pct && (
                    <p className="text-xs text-gray-500 mt-1">Similarité : {scanResult.similarity_pct}%</p>
                  )}
                </div>

                {!scanResult.delivery_confirmed && (
                  <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 mb-4">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                      ⚠️ Si le produit reçu ne correspond pas à votre commande, vous pouvez contacter le support ou faire une demande de retour.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setShowScanModal(false)}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default function CommandesPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">Chargement...</div>}>
      <CommandesContent />
    </Suspense>
  )
}