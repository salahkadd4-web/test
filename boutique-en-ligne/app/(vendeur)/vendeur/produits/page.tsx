'use client'

import { useState, useEffect, useRef } from 'react'

interface Category { id: string; nom: string }
interface Product {
  id: string; nom: string; description: string | null; prix: number
  stock: number; images: string[]; actif: boolean
  category: { id: string; nom: string }
  _count: { orderItems: number; favorites: number }
}

const emptyForm = {
  nom: '', description: '', prix: '', stock: '',
  categoryId: '', images: [] as string[], actif: true,
}

export default function VendeurProduitsPage() {
  const [produits, setProduits]       = useState<Product[]>([])
  const [categories, setCategories]   = useState<Category[]>([])
  const [loading, setLoading]         = useState(true)
  const [showForm, setShowForm]       = useState(false)
  const [editing, setEditing]         = useState<Product | null>(null)
  const [form, setForm]               = useState(emptyForm)
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [filterActif,    setFilterActif]    = useState<'all' | 'true' | 'false'>('all')
  const [filterCategory, setFilterCategory] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchData = async () => {
    setLoading(true)
    const [pRes, cRes] = await Promise.all([
      fetch(`/api/vendeur/produits${filterActif !== 'all' ? `?actif=${filterActif}` : ''}`),
      fetch('/api/vendeur/categories'),
    ])
    if (pRes.ok) setProduits(await pRes.json())
    if (cRes.ok) { const d = await cRes.json(); setCategories(d.approuvees || []) }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [filterActif])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setError(null)
    setShowForm(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      nom: p.nom, description: p.description || '', prix: String(p.prix),
      stock: String(p.stock), categoryId: p.category.id,
      images: p.images, actif: p.actif,
    })
    setError(null)
    setShowForm(true)
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImg(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      setForm((f) => ({ ...f, images: [...f.images, url] }))
    }
    setUploadingImg(false)
  }

  const removeImage = (idx: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))

  const handleSubmit = async () => {
    setSaving(true); setError(null)
    try {
      const url    = editing ? `/api/vendeur/produits/${editing.id}` : '/api/vendeur/produits'
      const method = editing ? 'PATCH' : 'POST'
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, prix: parseFloat(form.prix), stock: parseInt(form.stock) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur')
      setShowForm(false)
      fetchData()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const toggleActif = async (p: Product) => {
    await fetch(`/api/vendeur/produits/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actif: !p.actif }),
    })
    fetchData()
  }

  const handleDelete = async (p: Product) => {
    if (!confirm(`Supprimer "${p.nom}" ?`)) return
    await fetch(`/api/vendeur/produits/${p.id}`, { method: 'DELETE' })
    fetchData()
  }

  const filtered = produits.filter(p =>
    (!filterCategory || p.category.id === filterCategory)
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Mes Produits</h1>
        <button
          onClick={openAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-xl font-medium transition-all"
        >
          + Ajouter
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'true', 'false'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setFilterActif(v)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                filterActif === v
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {v === 'all' ? 'Tous' : v === 'true' ? 'Actifs' : 'Désactivés'}
            </button>
          ))}
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">🏷️ Toutes les catégories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.nom}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">Aucun produit correspondant aux filtres</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className={`bg-white dark:bg-gray-900 rounded-xl border overflow-hidden transition-all ${
                p.actif
                  ? 'border-gray-100 dark:border-gray-800'
                  : 'border-gray-200 dark:border-gray-700 opacity-60'
              }`}
            >
              {p.images[0] ? (
                <img src={p.images[0]} alt={p.nom} className="w-full h-36 object-cover" />
              ) : (
                <div className="w-full h-36 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">📦</div>
              )}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{p.nom}</p>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
                    p.actif ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {p.actif ? 'Actif' : 'Désactivé'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{p.category.nom}</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {p.prix.toLocaleString('fr-DZ')} DA
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>Stock: {p.stock}</span>
                  <span>{p._count.orderItems} ventes</span>
                  <span>♥ {p._count.favorites}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1.5 rounded-lg transition-all"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => toggleActif(p)}
                    className="flex-1 text-xs bg-yellow-50 dark:bg-yellow-950 hover:bg-yellow-100 dark:hover:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-1.5 rounded-lg transition-all"
                  >
                    {p.actif ? '⏸ Désactiver' : '▶ Activer'}
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="text-xs bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 px-2 py-1.5 rounded-lg transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
                {editing ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl">✕</button>
            </div>

            <div className="p-5 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-xl text-sm">{error}</div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Nom du produit *</label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Ex: Chaussures de sport..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Prix (DA) *</label>
                  <input
                    type="number"
                    value={form.prix}
                    onChange={(e) => setForm((f) => ({ ...f, prix: e.target.value }))}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Catégorie *</label>
                {categories.length === 0 ? (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950 p-2 rounded-xl">
                    Aucune catégorie approuvée. Proposez une catégorie d'abord.
                  </p>
                ) : (
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.nom}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Images */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt="" className="w-16 h-16 object-cover rounded-xl" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploadingImg}
                    className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center text-gray-400 hover:border-emerald-400 hover:text-emerald-400 transition-all text-xl"
                  >
                    {uploadingImg ? (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                    ) : '+'}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm((f) => ({ ...f, actif: !f.actif }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    form.actif ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.actif ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <label className="text-sm text-gray-700 dark:text-gray-200">
                  Produit {form.actif ? 'actif (visible)' : 'désactivé (masqué)'}
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-900 flex gap-3 p-5 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || !form.nom || !form.prix || !form.categoryId}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm py-2.5 rounded-xl font-medium transition-all"
              >
                {saving ? 'Enregistrement...' : editing ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}