'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import FavoriIconButton from '@/components/client/FavoriIconButton'
import CartIconButton from '@/components/client/CartIconButton'

type Produit = {
  id: string
  nom: string
  images: string[]
  prix: number
  stock: number
  category: { nom: string }
}

type Category = {
  id: string
  nom: string
}

export default function ProduitsSearch({
  categories,
  initialProduits,
  initialRecherche,
  initialCategorie,
}: {
  categories: Category[]
  initialProduits: Produit[]
  initialRecherche?: string
  initialCategorie?: string
}) {
  const router = useRouter()
  const [query, setQuery] = useState(initialRecherche || '')
  const [produits, setProduits] = useState<Produit[]>(initialProduits)
  const [loading, setLoading] = useState(false)
  const [categorieActive, setCategorieActive] = useState(initialCategorie || '')

  // Recherche AJAX avec debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query.trim()) params.set('recherche', query.trim())
        if (categorieActive) params.set('categorie', categorieActive)

        const res = await fetch(`/api/produits/search?${params.toString()}`)
        const data = await res.json()
        setProduits(data)
      } catch {
        setProduits([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query, categorieActive])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('recherche', query.trim())
    if (categorieActive) params.set('categorie', categorieActive)
    router.push(`/produits?${params.toString()}`)
  }

  const handleCategorie = (id: string) => {
    setCategorieActive(id)
    const params = new URLSearchParams()
    if (query.trim()) params.set('recherche', query.trim())
    if (id) params.set('categorie', id)
    router.push(`/produits?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">

      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-20">

          {/* Recherche */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Recherche</h3>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                />
                {loading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full mt-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg py-2 text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition"
              >
                Rechercher
              </button>
            </form>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Catégories</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategorie('')}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                  !categorieActive
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Toutes les catégories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorie(cat.id)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                    categorieActive === cat.id
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat.nom}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Grille produits */}
      <div className="flex-1">
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin inline-block" />
              Recherche en cours...
            </span>
          ) : (
            `${produits.length} produit${produits.length > 1 ? 's' : ''} trouvé${produits.length > 1 ? 's' : ''}`
          )}
        </p>

        {produits.length === 0 && !loading ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-lg">Aucun produit trouvé.</p>
            <button
              onClick={() => { setQuery(''); setCategorieActive('') }}
              className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block text-sm"
            >
              Voir tous les produits
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            {produits.map((produit) => (
              <Link
                key={produit.id}
                href={`/produits/${produit.id}`}
                className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300"
              >
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  {produit.images[0] ? (
                    <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <FavoriIconButton produitId={produit.id} />
                    <CartIconButton produitId={produit.id} stock={produit.stock} />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{produit.category.nom}</p>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{produit.nom}</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{produit.prix.toFixed(2)} DA</p>
                  <p className={`text-xs mt-1 ${produit.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {produit.stock > 0 ? `En stock (${produit.stock})` : 'Rupture de stock'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}