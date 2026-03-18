'use client'

import { useState, useEffect } from 'react'

type Client = {
  id: string
  nom: string
  prenom: string
  email: string | null
  telephone: string | null
  avatar: string | null
  createdAt: string
  _count: {
    orders: number
    favorites: number
  }
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const fetchClients = async () => {
    const res = await fetch('/api/admin/clients')
    const data = await res.json()
    setClients(data)
    setLoading(false)
  }

  useEffect(() => { fetchClients() }, [])

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' })
    setDeleteId(null)
    setSelectedClient(null)
    fetchClients()
  }

  const filtered = clients.filter((c) =>
    `${c.nom} ${c.prenom} ${c.email} ${c.telephone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  if (loading) return <div className="text-center text-gray-500 py-12">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clients ({clients.length})</h1>
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un client..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="text-left px-6 py-4">Client</th>
              <th className="text-left px-6 py-4">Contact</th>
              <th className="text-left px-6 py-4">Commandes</th>
              <th className="text-left px-6 py-4">Favoris</th>
              <th className="text-left px-6 py-4">Inscrit le</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  Aucun client trouvé
                </td>
              </tr>
            ) : (
              filtered.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                        {client.avatar ? (
                          <img src={client.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-purple-600 font-bold text-sm">
                            {client.prenom[0]}{client.nom[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{client.prenom} {client.nom}</p>
                        <p className="text-xs text-gray-400">#{client.id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700">{client.email || '—'}</p>
                    <p className="text-xs text-gray-400">{client.telephone || '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                      {client._count.orders} commande{client._count.orders > 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-red-50 text-red-500 text-xs font-semibold px-2 py-1 rounded-full">
                      ❤️ {client._count.favorites}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(client.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        👁️ Détails
                      </button>
                      <button
                        onClick={() => setDeleteId(client.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Détails Client */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                {selectedClient.avatar ? (
                  <img src={selectedClient.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-purple-600 font-bold text-xl">
                    {selectedClient.prenom[0]}{selectedClient.nom[0]}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedClient.prenom} {selectedClient.nom}
                </h2>
                <p className="text-xs text-gray-400">#{selectedClient.id.slice(-6).toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">📧 Email</p>
                <p className="text-sm text-gray-800">{selectedClient.email || '—'}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">📞 Téléphone</p>
                <p className="text-sm text-gray-800">{selectedClient.telephone || '—'}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedClient._count.orders}</p>
                  <p className="text-xs text-blue-500 mt-1">Commandes</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-500">{selectedClient._count.favorites}</p>
                  <p className="text-xs text-red-400 mt-1">Favoris</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">📅 Inscrit le</p>
                <p className="text-sm text-gray-800">
                  {new Date(selectedClient.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedClient(null)}
              className="w-full border-2 border-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal Confirmation Suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <p className="text-5xl mb-4">🗑️</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Supprimer ce client ?</h2>
            <p className="text-gray-500 text-sm mb-6">
              Toutes ses commandes, favoris et messages seront supprimés.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border-2 border-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}