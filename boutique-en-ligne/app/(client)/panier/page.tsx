'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type CartItem = {
  id: string
  quantite: number
  product: {
    id: string
    nom: string
    prix: number
    images: string[]
    stock: number
    category: { nom: string }
  }
}

type Cart = {
  id: string
  items: CartItem[]
}

export default function PanierPage() {
  const [panier, setPanier] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPanier = async () => {
    try {
      const res = await fetch('/api/panier')
      const data = await res.json()
      setPanier(data)
    } catch {
      console.error('Erreur panier')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPanier() }, [])

  const updateQuantite = async (itemId: string, quantite: number) => {
    await fetch(`/api/panier/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantite }),
    })
    fetchPanier()
  }

  const supprimerItem = async (itemId: string) => {
    await fetch(`/api/panier/${itemId}`, { method: 'DELETE' })
    fetchPanier()
  }

  const total = panier?.items.reduce((acc, item) => acc + item.product.prix * item.quantite, 0) ?? 0

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">Chargement du panier...</div>
  }

  if (!panier || panier.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Votre panier est vide</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Ajoutez des produits pour commencer vos achats</p>
        <Link href="/produits" className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold px-8 py-3 rounded-xl transition">
          Voir les produits
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Mon Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-4">
          {panier.items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4 items-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                {item.product.images[0] ? (
                  <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-xs text-blue-600 dark:text-blue-400">{item.product.category.nom}</p>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{item.product.nom}</h3>
                <p className="text-gray-900 dark:text-white font-bold">{item.product.prix.toFixed(2)} DA</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantite(item.id, item.quantite - 1)} disabled={item.quantite <= 1}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold disabled:opacity-50 transition">
                  -
                </button>
                <span className="w-8 text-center font-semibold text-gray-800 dark:text-gray-100">{item.quantite}</span>
                <button onClick={() => updateQuantite(item.id, item.quantite + 1)} disabled={item.quantite >= item.product.stock}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold disabled:opacity-50 transition">
                  +
                </button>
              </div>

              <p className="font-bold text-gray-800 dark:text-gray-100 w-24 text-right">
                {(item.product.prix * item.quantite).toFixed(2)} DA
              </p>

              <button onClick={() => supprimerItem(item.id)} className="text-red-400 hover:text-red-600 transition ml-2">
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Résumé</h2>

          <div className="space-y-2 mb-4">
            {panier.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="line-clamp-1 flex-1">{item.product.nom} x{item.quantite}</span>
                <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                  {(item.product.prix * item.quantite).toFixed(2)} DA
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-gray-900 dark:text-white">{total.toFixed(2)} DA</span>
            </div>
          </div>

          <Link href="/commandes/nouveau"
            className="block w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 rounded-xl text-center transition">
            Passer la commande
          </Link>

          <Link href="/produits" className="block w-full text-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm mt-3 transition">
            ← Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  )
}
