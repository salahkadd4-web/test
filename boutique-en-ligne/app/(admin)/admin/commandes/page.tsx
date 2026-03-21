'use client'

import { useState, useEffect, useRef } from 'react'
import PusherJS from 'pusher-js'

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
  scan1Result: string | null
  scan1ShippingAllowed: boolean
  scan2Done: boolean
  scan2Result: string | null
  user: { nom: string; prenom: string; email: string | null; telephone: string | null }
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

const ordreStatuts = ['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE']
const tousLesStatuts = Object.keys(statutConfig)

export default function AdminCommandesPage() {
  const [commandes, setCommandes] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatut, setFilterStatut] = useState('TOUS')
  const [search, setSearch] = useState('')
  const [selectedCommande, setSelectedCommande] = useState<Order | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Scan 1
  const [showScanModal, setShowScanModal] = useState(false)
  const [scanCommande, setScanCommande] = useState<Order | null>(null)
  const [scanImages, setScanImages] = useState<string[]>([])
  const [scanLoading, setScanLoading] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [toast, setToast] = useState<{ message: string; commandeId: string } | null>(null)

  useEffect(() => { fetchCommandes() }, [])

  // ── Pusher — mise à jour temps réel ──────────────────
  useEffect(() => {
    const pusher = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    })
    const channel = pusher.subscribe('admin-commandes')
    channel.bind('statut-change', (data: any) => {
      setCommandes(prev => prev.map(c =>
        c.id === data.commandeId ? { ...c, statut: data.statut } : c
      ))
      setToast({ message: `📦 ${data.client} — ${data.message}`, commandeId: data.commandeId })
      setTimeout(() => setToast(null), 5000)
    })
    return () => {
      channel.unbind_all()
      pusher.unsubscribe('admin-commandes')
      pusher.disconnect()
    }
  }, [])

  const fetchCommandes = async () => {
    const res = await fetch('/api/admin/commandes')
    const data = await res.json()
    setCommandes(data)
    setLoading(false)
  }

  const handleStatutChange = async (id: string, statut: string) => {
    setUpdatingId(id)
    await fetch(`/api/admin/commandes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    setUpdatingId(null)
    setCommandes(prev => prev.map(c => c.id === id ? { ...c, statut } : c))
    if (selectedCommande?.id === id) {
      setSelectedCommande(prev => prev ? { ...prev, statut } : null)
    }
  }

  const getStatutSuivant = (commande: Order) => {
    const idx = ordreStatuts.indexOf(commande.statut)
    if (idx === -1 || idx >= ordreStatuts.length - 1) return null
    const suivant = ordreStatuts[idx + 1]

    // ⚠️ RÈGLE CRITIQUE : bloquer "Expédiée" si Scan 1 non validé
    if (suivant === 'EXPEDIEE' && !commande.scan1Done) return null
    if (suivant === 'EXPEDIEE' && !commande.scan1ShippingAllowed) return null

    return suivant
  }

  // Ouvrir modal scan
  const openScanModal = (commande: Order) => {
    setScanCommande(commande)
    setScanImages([])
    setScanResult(null)
    setShowScanModal(true)
  }

  // Convertir image en base64
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setScanImages(prev => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  // Soumettre le scan 1
  const handleScan = async () => {
    if (!scanCommande || scanImages.length === 0) return
    setScanLoading(true)
    try {
      const res = await fetch(`/api/admin/commandes/${scanCommande.id}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagesB64: scanImages }),
      })
      const data = await res.json()
      setScanResult(data)
      // Mettre à jour la liste
      setCommandes(prev => prev.map(c =>
        c.id === scanCommande.id
          ? { ...c, scan1Done: true, scan1Result: data.decision, scan1ShippingAllowed: data.shipping_allowed }
          : c
      ))
    } catch { setScanResult({ error: 'Erreur serveur' }) }
    finally { setScanLoading(false) }
  }

  const filtered = commandes.filter(c => {
    const matchStatut = filterStatut === 'TOUS' || c.statut === filterStatut
    const matchSearch = `${c.user.nom} ${c.user.prenom} ${c.user.email} ${c.id}`
      .toLowerCase().includes(search.toLowerCase())
    return matchStatut && matchSearch
  })

  if (loading) return <div className="text-center text-gray-500 dark:text-gray-400 py-12">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Commandes ({commandes.length})
        </h1>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par client ou ID..."
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterStatut('TOUS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatut === 'TOUS' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
            Tous
          </button>
          {tousLesStatuts.map(s => (
            <button key={s} onClick={() => setFilterStatut(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatut === s ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
              {statutConfig[s].emoji} {statutConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[750px]">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
              <tr>
                <th className="text-left px-4 py-4">Commande</th>
                <th className="text-left px-4 py-4">Client</th>
                <th className="text-left px-4 py-4">Total</th>
                <th className="text-left px-4 py-4">Statut</th>
                <th className="text-left px-4 py-4">Scan</th>
                <th className="text-left px-4 py-4">Date</th>
                <th className="text-left px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">Aucune commande</td></tr>
              ) : (
                filtered.map(commande => {
                  const statut  = statutConfig[commande.statut]
                  const suivant = getStatutSuivant(commande)
                  const needsScan = commande.statut === 'EN_PREPARATION' && !commande.scan1Done
                  const scanBlocked = commande.statut === 'EN_PREPARATION' && commande.scan1Done && !commande.scan1ShippingAllowed

                  return (
                    <tr key={commande.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800 dark:text-gray-100">#{commande.id.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-gray-400">{commande.items.length} article(s)</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800 dark:text-gray-100">{commande.user.prenom} {commande.user.nom}</p>
                        <p className="text-xs text-gray-400">{commande.user.email || commande.user.telephone}</p>
                      </td>
                      <td className="px-4 py-4 font-bold text-blue-600 dark:text-blue-400">
                        {commande.total.toFixed(2)} DA
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statut.color}`}>
                          {statut.emoji} {statut.label}
                        </span>
                      </td>
                      {/* Colonne Scan */}
                      <td className="px-4 py-4">
                        {commande.scan1Done ? (
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            commande.scan1ShippingAllowed
                              ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                              : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                          }`}>
                            {commande.scan1ShippingAllowed ? '✅ Scan OK' : '❌ Scan KO'}
                          </span>
                        ) : commande.statut === 'EN_PREPARATION' ? (
                          <span className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                            ⚠️ Scan requis
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(commande.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button onClick={() => setSelectedCommande(commande)}
                            className="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                            👁️
                          </button>

                          {/* Bouton Scan 1 — apparaît quand EN_PREPARATION */}
                          {commande.statut === 'EN_PREPARATION' && (
                            <button
                              onClick={() => openScanModal(commande)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                commande.scan1Done
                                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                  : 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 hover:bg-orange-100 animate-pulse'
                              }`}>
                              📷 {commande.scan1Done ? 'Re-scanner' : 'Scanner'}
                            </button>
                          )}

                          {/* Bouton état suivant */}
                          {suivant ? (
                            <button
                              onClick={() => handleStatutChange(commande.id, suivant)}
                              disabled={updatingId === commande.id}
                              className="bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 whitespace-nowrap">
                              {updatingId === commande.id ? '...' : `${statutConfig[suivant].emoji} → ${statutConfig[suivant].label}`}
                            </button>
                          ) : (
                            /* Bouton Expédiée bloqué */
                            commande.statut === 'EN_PREPARATION' && (
                              <span className="text-xs text-red-400 dark:text-red-500 flex items-center gap-1">
                                🔒 {needsScan ? 'Scan requis' : 'Scan refusé'}
                              </span>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Toast notification ───────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span className="text-lg">📦</span>
          <p className="text-sm font-medium">{toast.message}</p>
          <button onClick={() => setToast(null)} className="text-white/70 hover:text-white ml-2">✕</button>
        </div>
      )}

      {/* ── Modal Scan 1 ───────────────────────────────── */}
      {showScanModal && scanCommande && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-800">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">📷 Scan Produit</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Commande #{scanCommande.id.slice(-8).toUpperCase()}
                </p>
              </div>
              <button onClick={() => setShowScanModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {!scanResult ? (
              <>
                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-4">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    📌 Photographiez le produit avant de l'expédier. Le bouton <strong>Expédiée</strong> sera débloqué uniquement si le scan est conforme.
                  </p>
                </div>

                {/* Zone upload images */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition mb-4"
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Cliquez pour ajouter des photos</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 à 4 photos du produit</p>
                    </>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file" accept="image/*" multiple
                  className="hidden"
                  onChange={handleImageSelect}
                />

                <div className="flex gap-3">
                  <button onClick={() => setShowScanModal(false)}
                    className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Annuler
                  </button>
                  <button
                    onClick={handleScan}
                    disabled={scanLoading || scanImages.length === 0}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50"
                  >
                    {scanLoading ? '🔄 Analyse...' : '✅ Analyser'}
                  </button>
                </div>
              </>
            ) : (
              /* Résultat du scan */
              <div>
                <div className={`rounded-xl p-4 mb-4 text-center ${
                  scanResult.shipping_allowed
                    ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                }`}>
                  <p className="text-3xl mb-2">{scanResult.shipping_allowed ? '✅' : '❌'}</p>
                  <p className={`text-sm font-bold ${scanResult.shipping_allowed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                    {scanResult.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Cohérence : {scanResult.consistency_pct}%
                  </p>
                </div>

                {/* Couleurs détectées */}
                {scanResult.dominant_colors && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">🎨 Couleurs détectées</p>
                    <div className="flex gap-2 flex-wrap">
                      {scanResult.dominant_colors.map((c: any, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 bg-white dark:bg-gray-700 rounded-lg px-2 py-1">
                          <div className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: `rgb(${c.rgb.join(',')})` }} />
                          <span className="text-xs text-gray-700 dark:text-gray-300">{c.name} {c.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowScanModal(false)}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3 rounded-xl text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modal Détails Commande ──────────────────────── */}
      {selectedCommande && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  #{selectedCommande.id.slice(-8).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(selectedCommande.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statutConfig[selectedCommande.statut].color}`}>
                {statutConfig[selectedCommande.statut].emoji} {statutConfig[selectedCommande.statut].label}
              </span>
            </div>

            {/* Scan status */}
            {selectedCommande.scan1Done && (
              <div className={`rounded-xl p-3 mb-4 ${
                selectedCommande.scan1ShippingAllowed
                  ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
              }`}>
                <p className={`text-xs font-semibold ${selectedCommande.scan1ShippingAllowed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  📷 Scan 1 : {selectedCommande.scan1Result} — Expédition {selectedCommande.scan1ShippingAllowed ? 'autorisée ✅' : 'bloquée ❌'}
                </p>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">👤 Client</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{selectedCommande.user.prenom} {selectedCommande.user.nom}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selectedCommande.user.email || selectedCommande.user.telephone}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">📍 Adresse</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCommande.adresse}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">📦 Articles</p>
              <div className="space-y-2">
                {selectedCommande.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
                      {item.product.images[0]
                        ? <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center">📦</div>
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.product.nom}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">x{item.quantite} — {item.prix.toFixed(2)} DA</p>
                    </div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{(item.prix * item.quantite).toFixed(2)} DA</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6 px-1">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-blue-600 dark:text-blue-400">{selectedCommande.total.toFixed(2)} DA</span>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">🔄 Changer le statut</p>
              <div className="grid grid-cols-2 gap-2">
                {tousLesStatuts.map(s => {
                  const isExpedieBlocked = s === 'EXPEDIEE' && selectedCommande.statut === 'EN_PREPARATION' && (!selectedCommande.scan1Done || !selectedCommande.scan1ShippingAllowed)
                  return (
                    <button key={s}
                      onClick={() => !isExpedieBlocked && handleStatutChange(selectedCommande.id, s)}
                      disabled={selectedCommande.statut === s || updatingId === selectedCommande.id || isExpedieBlocked}
                      title={isExpedieBlocked ? 'Scan produit requis avant expédition' : ''}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                        selectedCommande.statut === s
                          ? `${statutConfig[s].color} cursor-default`
                          : isExpedieBlocked
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {isExpedieBlocked ? '🔒' : statutConfig[s].emoji} {statutConfig[s].label}
                      {selectedCommande.statut === s && ' ✓'}
                      {isExpedieBlocked && ' (scan requis)'}
                    </button>
                  )
                })}
              </div>
            </div>

            <button onClick={() => setSelectedCommande(null)}
              className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}