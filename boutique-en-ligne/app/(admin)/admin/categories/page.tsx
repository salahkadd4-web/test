'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'
type Category = {
  id: string
  nom: string
  description: string | null
  image: string | null
  _count?: { products: number }
}

const emptyForm = { nom: '', description: '', image: '' }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const fetchCategories = async () => {
    const res = await fetch('/api/admin/categories?count=true')
    const data = await res.json()
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => { fetchCategories() }, [])

  const openCreate = () => {
    setEditCategory(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  const openEdit = (cat: Category) => {
    setEditCategory(cat)
    setForm({
      nom: cat.nom,
      description: cat.description || '',
      image: cat.image || '',
    })
    setError('')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch(
        editCategory ? `/api/admin/categories/${editCategory.id}` : '/api/admin/categories',
        {
          method: editCategory ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()
      if (!res.ok) { setError(data.error); return }

      setShowModal(false)
      fetchCategories()
    } catch {
      setError('Erreur serveur')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleteError('')
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    const data = await res.json()

    if (!res.ok) {
      setDeleteError(data.error)
      return
    }

    setDeleteId(null)
    fetchCategories()
  }

  if (loading) return <div className="text-center text-gray-500 py-12">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Catégories ({categories.length})</h1>
        <button
          onClick={openCreate}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          + Ajouter une catégorie
        </button>
      </div>

      {/* Grille catégories */}
      {categories.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🏷️</p>
          <p className="text-lg">Aucune catégorie</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl shadow-sm p-5 flex gap-4 items-center">

              {/* Image */}
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                {cat.image ? (
                  <img src={cat.image} alt={cat.nom} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">🏷️</span>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800">{cat.nom}</h3>
                {cat.description && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{cat.description}</p>
                )}
                <p className="text-xs text-purple-600 mt-1 font-medium">
                  {cat._count?.products ?? 0} produit{(cat._count?.products ?? 0) > 1 ? 's' : ''}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => openEdit(cat)}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg text-xs font-medium transition"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => { setDeleteId(cat.id); setDeleteError('') }}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg text-xs font-medium transition"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Créer/Modifier */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editCategory ? '✏️ Modifier la catégorie' : '+ Ajouter une catégorie'}
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
                  placeholder="Nom de la catégorie"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Description de la catégorie"
                />
              </div>

              <div>
                  <ImageUpload
                    value={form.image}
                    onChange={(url) => setForm({ ...form, image: url })}
                    label="Image de la catégorie"
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
                  {submitting ? 'En cours...' : editCategory ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmation Suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <p className="text-5xl mb-4">🗑️</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Supprimer cette catégorie ?</h2>
            <p className="text-gray-500 text-sm mb-4">Cette action est irréversible.</p>

            {deleteError && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {deleteError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setDeleteId(null); setDeleteError('') }}
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