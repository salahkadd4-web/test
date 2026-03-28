'use client'

import { useState, useEffect } from 'react'
import MultiImageUpload from '@/components/admin/MultiImageUpload'

type Category = { id: string; nom: string }
type Product = {
  id: string
  nom: string
  description: string | null
  prix: number
  stock: number
  actif: boolean
  images: string[]
  categoryId: string
  category: Category
}

const emptyForm = {
  nom: '',
  description: '',
  prix: '',
  stock: '',
  images: '',
  categoryId: '',
}

export default function AdminProduitsPage() {
  const [produits, setProduits] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editProduit, setEditProduit] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showInactifs, setShowInactifs] = useState(false)
  const [toggleId, setToggleId] = useState<string | null>(null)
  const [toggling, setToggling] = useState(false)

  const fetchData = async () => {
    const [produitsRes, catsRes] = await Promise.all([
      fetch('/api/admin/produits'),
      fetch('/api/admin/categories'),
    ])
    setProduits(await produitsRes.json())
    setCategories(await catsRes.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const produitsActifs = produits.filter((p) => p.actif)
  const produitsInactifs = produits.filter((p) => !p.actif)
  const liste = showInactifs ? produitsInactifs : produitsActifs

  const openCreate = () => {
    setEditProduit(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  const openEdit = (produit: Product) => {
    setEditProduit(produit)
    setForm({
      nom: produit.nom,
      description: produit.description || '',
      prix: produit.prix.toString(),
      stock: produit.stock.toString(),
      images: produit.images.join(', '),
      categoryId: produit.categoryId,
    })
    setError('')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const body = {
      ...form,
      images: form.images.split(',').map((i) => i.trim()).filter(Boolean),
    }

    try {
      const res = await fetch(
        editProduit ? `/api/admin/produits/${editProduit.id}` : '/api/admin/produits',
        {
          method: editProduit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setShowModal(false)
      fetchData()
    } catch {
      setError('Erreur serveur')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggle = async (produit: Product) => {
    if (!produit.actif && produit.stock === 0) return
    setToggling(true)
    await fetch(`/api/admin/produits/${produit.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actif: !produit.actif }),
    })
    setToggleId(null)
    setToggling(false)
    fetchData()
  }

  if (loading) return <div className="text-center text-gray-500 py-12">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produits</h1>
          <p className="text-sm text-gray-500 mt-1">
            <span className="text-green-600 font-medium">{produitsActifs.length} actifs</span>
            {' · '}
            <span className="text-red-500 font-medium">{produitsInactifs.length} désactivés</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowInactifs(!showInactifs)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition border-2 ${
              showInactifs
                ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {showInactifs ? '👁 Voir actifs' : `🚫 Voir désactivés (${produitsInactifs.length})`}
          </button>
          {!showInactifs && (
            <button
              onClick={openCreate}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              + Ajouter un produit
            </button>
          )}
        </div>
      </div>

      {showInactifs && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
          🚫 Vous visualisez les produits désactivés — ils ne sont pas visibles par les clients.
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="text-left px-6 py-4">Produit</th>
                <th className="text-left px-6 py-4">Catégorie</th>
                <th className="text-left px-6 py-4">Prix</th>
                <th className="text-left px-6 py-4">Stock</th>
                <th className="text-left px-6 py-4">Statut</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {liste.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    {showInactifs ? 'Aucun produit désactivé' : 'Aucun produit actif'}
                  </td>
                </tr>
              ) : (
                liste.map((produit) => (
                  <tr key={produit.id} className={`hover:bg-gray-50 transition ${!produit.actif ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          {produit.images[0] ? (
                            <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">📦</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{produit.nom}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{produit.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                        {produit.category.nom}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {produit.prix.toFixed(2)} DA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        produit.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {produit.stock > 0 ? `${produit.stock} en stock` : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        produit.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {produit.actif ? '✅ Actif' : '🚫 Désactivé'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(produit)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg text-xs font-medium transition"
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => setToggleId(produit.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                            produit.actif
                              ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                        >
                          {produit.actif ? '🚫 Désactiver' : '✅ Activer'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Créer/Modifier */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editProduit ? '✏️ Modifier le produit' : '+ Ajouter un produit'}
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nom du produit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Description du produit"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (DA) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.prix}
                    onChange={(e) => setForm({ ...form, prix: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                    {(form.stock === '0' || form.stock === '') && (
                      <span className="ml-1 text-xs text-orange-500">(sera désactivé)</span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                  ))}
                </select>
              </div>

              <div>
                <MultiImageUpload
                  values={form.images ? form.images.split(',').map(i => i.trim()).filter(Boolean) : []}
                  onChange={(urls) => setForm({ ...form, images: urls.join(',') })}
                  label="Images du produit"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {submitting ? 'En cours...' : editProduit ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmation Toggle */}
      {toggleId && (() => {
        const produit = produits.find((p) => p.id === toggleId)!
        const cantActivate = !produit.actif && produit.stock === 0
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
              <p className="text-5xl mb-4">{produit.actif ? '🚫' : cantActivate ? '⚠️' : '✅'}</p>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {produit.actif ? 'Désactiver ce produit ?' : cantActivate ? 'Stock épuisé' : 'Activer ce produit ?'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {produit.actif
                  ? 'Le produit ne sera plus visible par les clients.'
                  : cantActivate
                  ? "Impossible d'activer un produit sans stock. Modifiez le stock d'abord."
                  : 'Le produit redeviendra visible pour les clients.'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setToggleId(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  {cantActivate ? 'Fermer' : 'Annuler'}
                </button>
                {!cantActivate && (
                  <button
                    onClick={() => handleToggle(produit)}
                    disabled={toggling}
                    className={`flex-1 font-semibold py-2.5 rounded-xl transition disabled:opacity-50 text-white ${
                      produit.actif ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {toggling ? 'En cours...' : produit.actif ? 'Désactiver' : 'Activer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}