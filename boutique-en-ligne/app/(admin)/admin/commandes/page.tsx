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
    setCommandes((prev) => prev.map((c) => c.id === id ? { ...c, statut } : c))
    if (selectedCommande?.id === id) {
      setSelectedCommande((prev) => prev ? { ...prev, statut } : null)
    }
  }

  const getStatutSuivant = (statut: string) => {
    const idx = ordreStatuts.indexOf(statut)
    return idx !== -1 && idx < ordreStatuts.length - 1 ? ordreStatuts[idx + 1] : null
  }

  const filtered = commandes.filter((c) => {
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
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par client ou ID..."
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterStatut('TOUS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatut === 'TOUS' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            Tous
          </button>
          {tousLesStatuts.map((s) => (
            <button key={s} onClick={() => setFilterStatut(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatut === s ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              {statutConfig[s].emoji} {statutConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
              <tr>
                <th className="text-left px-6 py-4">Commande</th>
                <th className="text-left px-6 py-4">Client</th>
                <th className="text-left px-6 py-4">Total</th>
                <th className="text-left px-6 py-4">Statut</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 dark:text-gray-500">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                filtered.map((commande) => {
                  const statut  = statutConfig[commande.statut]
                  const suivant = getStatutSuivant(commande.statut)
                  return (
                    <tr key={commande.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          #{commande.id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {commande.items.length} article(s)
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          {commande.user.prenom} {commande.user.nom}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {commande.user.email || commande.user.telephone}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                        {commande.total.toFixed(2)} DA
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statut.color}`}>
                          {statut.emoji} {statut.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(commande.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Bouton détails */}
                          <button
                            onClick={() => setSelectedCommande(commande)}
                            className="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                          >
                            👁️ Détails
                          </button>

                          {/* Bouton état suivant */}
                          {suivant && (
                            <button
                              onClick={() => handleStatutChange(commande.id, suivant)}
                              disabled={updatingId === commande.id}
                              className="bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 whitespace-nowrap"
                            >
                              {updatingId === commande.id
                                ? '...'
                                : `${statutConfig[suivant].emoji} → ${statutConfig[suivant].label}`}
                            </button>
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

      {/* Modal Détails */}
      {selectedCommande && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  #{selectedCommande.id.slice(-8).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">👤 Client</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {selectedCommande.user.prenom} {selectedCommande.user.nom}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedCommande.user.email || selectedCommande.user.telephone}
              </p>
            </div>

            {/* Adresse */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">📍 Adresse de livraison</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCommande.adresse}</p>
            </div>

            {/* Articles */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">📦 Articles</p>
              <div className="space-y-2">
                {selectedCommande.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
                      {item.product.images[0] ? (
                        <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">📦</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.product.nom}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">x{item.quantite} — {item.prix.toFixed(2)} DA/unité</p>
                    </div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                      {(item.prix * item.quantite).toFixed(2)} DA
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-lg mb-6 px-1">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-blue-600 dark:text-blue-400">{selectedCommande.total.toFixed(2)} DA</span>
            </div>

            {/* Changer le statut */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">🔄 Changer le statut</p>
              <div className="grid grid-cols-2 gap-2">
                {tousLesStatuts.map((s) => (
                  <button key={s}
                    onClick={() => handleStatutChange(selectedCommande.id, s)}
                    disabled={selectedCommande.statut === s || updatingId === selectedCommande.id}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                      selectedCommande.statut === s
                        ? `${statutConfig[s].color} cursor-default`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50'
                    }`}
                  >
                    {statutConfig[s].emoji} {statutConfig[s].label}
                    {selectedCommande.statut === s && ' ✓'}
                  </button>
                ))}
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