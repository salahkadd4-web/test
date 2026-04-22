'use client'

import { useState, useEffect } from 'react'
import MultiImageUpload from '@/components/admin/MultiImageUpload'

type Category = { id: string; nom: string }
type VendeurOption = { id: string; nomBoutique: string | null; user: { nom: string; prenom: string } }
type Product = {
  id: string; nom: string; description: string | null
  prix: number; stock: number; actif: boolean
  images: string[]; categoryId: string
  category: Category
  vendeur?: { id: string; nomBoutique: string | null } | null
}

const emptyForm = { nom: '', description: '', prix: '', stock: '', images: '', categoryId: '' }

export default function AdminProduitsPage() {
  const [produits,     setProduits]     = useState<Product[]>([])
  const [categories,   setCategories]   = useState<Category[]>([])
  const [vendeurs,     setVendeurs]     = useState<VendeurOption[]>([])
  const [loading,      setLoading]      = useState(true)
  const [showModal,    setShowModal]    = useState(false)
  const [editProduit,  setEditProduit]  = useState<Product | null>(null)
  const [form,         setForm]         = useState(emptyForm)
  const [error,        setError]        = useState('')
  const [submitting,   setSubmitting]   = useState(false)
  const [showInactifs, setShowInactifs] = useState(false)
  const [toggleId,     setToggleId]     = useState<string | null>(null)
  const [toggling,     setToggling]     = useState(false)

  // ── Filtres ────────────────────────────────────────────────
  const [filterVendeur,   setFilterVendeur]   = useState('')
  const [filterCategory,  setFilterCategory]  = useState('')
  const [adminOnly,       setAdminOnly]        = useState(false)
  const [search,          setSearch]           = useState('')

  const fetchVendeurs = async () => {
    const res = await fetch('/api/admin/vendeurs?statut=APPROUVE')
    if (res.ok) setVendeurs(await res.json())
  }

  const fetchData = async (vendeurId = filterVendeur, isAdminOnly = adminOnly) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (vendeurId)   params.set('vendeurId', vendeurId)
    if (isAdminOnly) params.set('adminOnly', 'true')

    const [produitsRes, catsRes] = await Promise.all([
      fetch(`/api/admin/produits?${params}`),
      fetch('/api/admin/categories'),
    ])
    setProduits(await produitsRes.json())
    setCategories(await catsRes.json())
    setLoading(false)
  }

  useEffect(() => {
    fetchVendeurs()
    fetchData()
  }, [])

  useEffect(() => { fetchData(filterVendeur, adminOnly) }, [filterVendeur, adminOnly])

  // ── Filtrage local (search + actif) ───────────────────────
  const filtered = produits.filter(p => {
    const matchActif    = showInactifs ? !p.actif : p.actif
    const matchSearch   = !search || `${p.nom} ${p.description || ''}`.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !filterCategory || p.categoryId === filterCategory
    return matchActif && matchSearch && matchCategory
  })

  const produitsActifs   = produits.filter(p => p.actif)
  const produitsInactifs = produits.filter(p => !p.actif)

  const openCreate = () => { setEditProduit(null); setForm(emptyForm); setError(''); setShowModal(true) }

  const openEdit = (p: Product) => {
    setEditProduit(p)
    setForm({ nom: p.nom, description: p.description || '', prix: p.prix.toString(),
      stock: p.stock.toString(), images: p.images.join(', '), categoryId: p.categoryId })
    setError(''); setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setSubmitting(true)
    const body = { ...form, images: form.images.split(',').map(i => i.trim()).filter(Boolean) }
    try {
      const res = await fetch(
        editProduit ? `/api/admin/produits/${editProduit.id}` : '/api/admin/produits',
        { method: editProduit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      )
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setShowModal(false); fetchData()
    } catch { setError('Erreur serveur') }
    finally { setSubmitting(false) }
  }

  const handleToggle = async (produit: Product) => {
    if (!produit.actif && produit.stock === 0) return
    setToggling(true)
    await fetch(`/api/admin/produits/${produit.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actif: !produit.actif }),
    })
    setToggleId(null); setToggling(false); fetchData()
  }

  if (loading) return <div className="text-center text-gray-500 dark:text-gray-400 py-12">Chargement...</div>

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Produits</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
                ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {showInactifs ? '👁 Voir actifs' : `🚫 Désactivés (${produitsInactifs.length})`}
          </button>
          {!showInactifs && (
            <button onClick={openCreate} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition">
              + Ajouter un produit
            </button>
          )}
        </div>
      </div>

      {showInactifs && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm px-4 py-3 rounded-xl mb-4">
          🚫 Vous visualisez les produits désactivés — ils ne sont pas visibles par les clients.
        </div>
      )}

      {/* ── Filtres ── */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Recherche */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom..."
            className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/* Filtre vendeur */}
          <select
            value={filterVendeur}
            onChange={e => { setFilterVendeur(e.target.value); setAdminOnly(false) }}
            disabled={adminOnly}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[200px] disabled:opacity-40"
          >
            <option value="">🏪 Tous les vendeurs</option>
            {vendeurs.map(v => (
              <option key={v.id} value={v.id}>
                {v.nomBoutique || `${v.user.prenom} ${v.user.nom}`}
              </option>
            ))}
          </select>
          {/* Filtre catégorie */}
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[180px]"
          >
            <option value="">🏷️ Toutes les catégories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>
          {/* Bouton Admin seulement */}
          <button
            onClick={() => { setAdminOnly(v => !v); setFilterVendeur('') }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap border ${
              adminOnly
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            🛒 Admin seulement
          </button>
        </div>

        {/* Badges filtres actifs */}
        {(filterVendeur || adminOnly || filterCategory) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 dark:text-gray-500">Filtres :</span>
            {filterVendeur && (
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                🏪 {vendeurs.find(v => v.id === filterVendeur)?.nomBoutique || 'Vendeur'}
                <button onClick={() => setFilterVendeur('')} className="ml-0.5 font-bold hover:text-emerald-500">×</button>
              </span>
            )}
            {filterCategory && (
              <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                🏷️ {categories.find(c => c.id === filterCategory)?.nom || 'Catégorie'}
                <button onClick={() => setFilterCategory('')} className="ml-0.5 font-bold hover:text-blue-500">×</button>
              </span>
            )}
            {adminOnly && (
              <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                🛒 Admin seulement
                <button onClick={() => setAdminOnly(false)} className="ml-0.5 font-bold hover:text-blue-500">×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── MOBILE : cartes empilées ─────────────────────────────────────── */}
      <div className="lg:hidden space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center py-12 text-gray-400">
            {showInactifs ? 'Aucun produit désactivé' : 'Aucun produit trouvé'}
          </p>
        ) : filtered.map(produit => (
          <div key={produit.id} className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 ${!produit.actif ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
                {produit.images[0]
                  ? <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm truncate">{produit.nom}</p>
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{produit.description}</p>
              </div>
              <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
                produit.actif ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                {produit.actif ? '✅ Actif' : '🚫 Off'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
              {produit.vendeur ? (
                <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">🏪 {produit.vendeur.nomBoutique || '—'}</span>
              ) : (
                <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">🛒 Admin</span>
              )}
              <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{produit.category.nom}</span>
              <span className={`px-2 py-0.5 rounded-full font-semibold ${produit.stock > 0 ? 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'}`}>
                {produit.stock > 0 ? `${produit.stock} en stock` : 'Rupture'}
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{produit.prix.toFixed(2)} DA</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(produit)} className="flex-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 px-3 py-2 rounded-lg text-xs font-medium transition">
                ✏️ Modifier
              </button>
              <button
                onClick={() => setToggleId(produit.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition ${
                  produit.actif
                    ? 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400'
                    : 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                }`}
              >
                {produit.actif ? '🚫 Désactiver' : '✅ Activer'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP : tableau ────────────────────────────────────────────── */}
      <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
              <tr>
                <th className="text-left px-6 py-4">Produit</th>
                <th className="text-left px-6 py-4">Vendeur</th>
                <th className="text-left px-6 py-4">Catégorie</th>
                <th className="text-left px-6 py-4">Prix</th>
                <th className="text-left px-6 py-4">Stock</th>
                <th className="text-left px-6 py-4">Statut</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    {showInactifs ? 'Aucun produit désactivé' : 'Aucun produit trouvé'}
                  </td>
                </tr>
              ) : (
                filtered.map(produit => (
                  <tr key={produit.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition ${!produit.actif ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
                          {produit.images[0]
                            ? <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center">📦</div>
                          }
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">{produit.nom}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{produit.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {produit.vendeur ? (
                        <span className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                          🏪 {produit.vendeur.nomBoutique || '—'}
                        </span>
                      ) : (
                        <span className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                          🛒 Admin
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                        {produit.category.nom}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">
                      {produit.prix.toFixed(2)} DA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        produit.stock > 0 ? 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'
                      }`}>
                        {produit.stock > 0 ? `${produit.stock} en stock` : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        produit.actif ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {produit.actif ? '✅ Actif' : '🚫 Désactivé'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(produit)} className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 px-3 py-1 rounded-lg text-xs font-medium transition">
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => setToggleId(produit.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                            produit.actif
                              ? 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900'
                              : 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900'
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {editProduit ? '✏️ Modifier le produit' : '+ Ajouter un produit'}
            </h2>
            {error && <div className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom *</label>
                <input type="text" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nom du produit" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Description du produit" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix (DA) *</label>
                  <input type="number" step="0.01" value={form.prix} onChange={e => setForm({...form, prix: e.target.value})} required
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock *
                    {(form.stock === '0' || form.stock === '') && <span className="ml-1 text-xs text-orange-500">(sera désactivé)</span>}
                  </label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie *</label>
                <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} required
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nom}</option>)}
                </select>
              </div>
              <div>
                <MultiImageUpload
                  values={form.images ? form.images.split(',').map(i => i.trim()).filter(Boolean) : []}
                  onChange={urls => setForm({...form, images: urls.join(',')})}
                  label="Images du produit"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  Annuler
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-50">
                  {submitting ? 'En cours...' : editProduit ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Toggle */}
      {toggleId && (() => {
        const produit = produits.find(p => p.id === toggleId)!
        const cantActivate = !produit.actif && produit.stock === 0
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm p-6 text-center border border-gray-100 dark:border-gray-800">
              <p className="text-5xl mb-4">{produit.actif ? '🚫' : cantActivate ? '⚠️' : '✅'}</p>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {produit.actif ? 'Désactiver ce produit ?' : cantActivate ? 'Stock épuisé' : 'Activer ce produit ?'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                {produit.actif ? 'Le produit ne sera plus visible par les clients.'
                  : cantActivate ? "Impossible d'activer un produit sans stock."
                  : 'Le produit redeviendra visible pour les clients.'}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setToggleId(null)}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  {cantActivate ? 'Fermer' : 'Annuler'}
                </button>
                {!cantActivate && (
                  <button onClick={() => handleToggle(produit)} disabled={toggling}
                    className={`flex-1 font-semibold py-2.5 rounded-xl transition disabled:opacity-50 text-white ${
                      produit.actif ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
                    }`}>
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