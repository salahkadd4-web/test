'use client'

import { useState, useEffect } from 'react'

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
  user: { nom: string; prenom: string; email: string | null; telephone: string | null }
  items: OrderItem[]
}

const statutConfig: Record<string, { label: string; color: string; emoji: string }> = {
  EN_ATTENTE:     { label: 'En attente',     color: 'bg-yellow-100 text-yellow-700', emoji: '⏳' },
  CONFIRMEE:      { label: 'Confirmée',      color: 'bg-blue-100 text-blue-700',     emoji: '✅' },
  EN_PREPARATION: { label: 'En préparation', color: 'bg-purple-100 text-purple-700', emoji: '🔧' },
  EXPEDIEE:       { label: 'Expédiée',       color: 'bg-indigo-100 text-indigo-700', emoji: '🚚' },
  LIVREE:         { label: 'Livrée',         color: 'bg-green-100 text-green-700',   emoji: '📦' },
  ANNULEE:        { label: 'Annulée',        color: 'bg-red-100 text-red-700',       emoji: '❌' },
}

const tousLesStatuts = Object.keys(statutConfig)

export default function AdminCommandesPage() {
  const [commandes, setCommandes] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatut, setFilterStatut] = useState('TOUS')
  const [search, setSearch] = useState('')
  const [selectedCommande, setSelectedCommande] = useState<Order | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchCommandes = async () => {
    const res = await fetch('/api/admin/commandes')
    const data = await res.json()
    setCommandes(data)
    setLoading(false)
  }

  useEffect(() => { fetchCommandes() }, [])

  const handleStatutChange = async (id: string, statut: string) => {
    setUpdatingId(id)
    await fetch(`/api/admin/commandes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    setUpdatingId(null)

    // Mettre à jour localement
    setCommandes((prev) =>
      prev.map((c) => c.id === id ? { ...c, statut } : c)
    )
    if (selectedCommande?.id === id) {
      setSelectedCommande((prev) => prev ? { ...prev, statut } : null)
    }
  }

  const filtered = commandes.filter((c) => {
    const matchStatut = filterStatut === 'TOUS' || c.statut === filterStatut
    const matchSearch = `${c.user.nom} ${c.user.prenom} ${c.user.email} ${c.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchStatut && matchSearch
  })

  if (loading) return <div className="text-center text-gray-500 py-12">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Commandes ({commandes.length})</h1>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par client ou ID..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatut('TOUS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterStatut === 'TOUS' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tous
          </button>
          {tousLesStatuts.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterStatut === s
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {statutConfig[s].emoji} {statutConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="text-left px-6 py-4">Commande</th>
              <th className="text-left px-6 py-4">Client</th>
              <th className="text-left px-6 py-4">Total</th>
              <th className="text-left px-6 py-4">Statut</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  Aucune commande trouvée
                </td>
              </tr>
            ) : (
              filtered.map((commande) => {
                const statut = statutConfig[commande.statut]
                return (
                  <tr key={commande.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">#{commande.id.slice(-8).toUpperCase()}</p>
                      <p className="text-xs text-gray-400">{commande.items.length} article(s)</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{commande.user.prenom} {commande.user.nom}</p>
                      <p className="text-xs text-gray-400">{commande.user.email || commande.user.telephone}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      {commande.total.toFixed(2)} DA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statut.color}`}>
                        {statut.emoji} {statut.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(commande.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedCommande(commande)}
                        className="bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        👁️ Détails
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Détails Commande */}
      {selectedCommande && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  #{selectedCommande.id.slice(-8).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(selectedCommande.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statutConfig[selectedCommande.statut].color}`}>
                {statutConfig[selectedCommande.statut].emoji} {statutConfig[selectedCommande.statut].label}
              </span>
            </div>

            {/* Client */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 font-medium mb-2">👤 Client</p>
              <p className="text-sm font-semibold text-gray-800">
                {selectedCommande.user.prenom} {selectedCommande.user.nom}
              </p>
              <p className="text-xs text-gray-500">{selectedCommande.user.email || selectedCommande.user.telephone}</p>
            </div>

            {/* Adresse */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 font-medium mb-1">📍 Adresse de livraison</p>
              <p className="text-sm text-gray-800">{selectedCommande.adresse}</p>
            </div>

            {/* Articles */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 font-medium mb-3">📦 Articles</p>
              <div className="space-y-2">
                {selectedCommande.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      {item.product.images[0] ? (
                        <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">📦</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.product.nom}</p>
                      <p className="text-xs text-gray-500">x{item.quantite} — {item.prix.toFixed(2)} DA/unité</p>
                    </div>
                    <p className="font-semibold text-sm">{(item.prix * item.quantite).toFixed(2)} DA</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-lg mb-6 px-1">
              <span>Total</span>
              <span className="text-blue-600">{selectedCommande.total.toFixed(2)} DA</span>
            </div>

            {/* Changer le statut */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">🔄 Changer le statut</p>
              <div className="grid grid-cols-2 gap-2">
                {tousLesStatuts.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatutChange(selectedCommande.id, s)}
                    disabled={selectedCommande.statut === s || updatingId === selectedCommande.id}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                      selectedCommande.statut === s
                        ? `${statutConfig[s].color} opacity-100 cursor-default`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                    }`}
                  >
                    {statutConfig[s].emoji} {statutConfig[s].label}
                    {selectedCommande.statut === s && ' ✓'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCommande(null)}
              className="w-full border-2 border-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}