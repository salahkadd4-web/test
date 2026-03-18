'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type CartItem = {
  id: string
  quantite: number
  product: { id: string; nom: string; prix: number; images: string[] }
}

type Cart = { id: string; items: CartItem[] }

export default function NouvelleCommandePage() {
  const router = useRouter()
  const [panier, setPanier] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [adresse, setAdresse] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch('/api/panier').then((r) => r.json()).then((d) => { setPanier(d); setLoading(false) })
  }, [])

  const total = panier?.items.reduce((acc, item) => acc + item.product.prix * item.quantite, 0) ?? 0

  const handleConfirmer = async () => {
    setError(''); setSubmitting(true); setShowModal(false)
    try {
      const res = await fetch('/api/commandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adresse }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      router.push('/commandes?success=true')
    } catch { setError('Erreur serveur, veuillez réessayer') } finally { setSubmitting(false) }
  }

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">Chargement...</div>

  if (!panier || panier.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Votre panier est vide</h1>
        <Link href="/produits" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition">
          Voir les produits
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Passer la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Adresse de livraison</h2>

          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); setShowModal(true) }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse complète</label>
              <textarea value={adresse} onChange={(e) => setAdresse(e.target.value)} required rows={4}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                placeholder="Numéro, rue, ville, wilaya..." />
            </div>
            <button type="submit" disabled={submitting}
              className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 rounded-xl transition disabled:opacity-50">
              {submitting ? 'Traitement...' : `Confirmer — ${total.toFixed(2)} DA`}
            </button>
            <Link href="/panier" className="block text-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition">
              ← Retour au panier
            </Link>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Résumé ({panier.items.length} article{panier.items.length > 1 ? 's' : ''})
          </h2>
          <div className="space-y-3 mb-4">
            {panier.items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                  {item.product.images[0] ? (
                    <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full flex items-center justify-center">📦</div>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-1">{item.product.nom}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">x{item.quantite}</p>
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {(item.product.prix * item.quantite).toFixed(2)} DA
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-blue-600 dark:text-blue-400">{total.toFixed(2)} DA</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-800">
            <div className="text-center mb-6">
              <p className="text-5xl mb-3">🛍️</p>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Confirmer la commande ?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Vérifiez les détails avant de confirmer</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">📍 Adresse</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">{adresse}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">📦 Articles</p>
              {panier.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <span className="line-clamp-1 flex-1">{item.product.nom} x{item.quantite}</span>
                  <span className="ml-2 font-medium">{(item.product.prix * item.quantite).toFixed(2)} DA</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg mb-6 px-1">
              <span className="text-gray-800 dark:text-gray-100">Total à payer</span>
              <span className="text-blue-600 dark:text-blue-400">{total.toFixed(2)} DA</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Annuler
              </button>
              <button onClick={handleConfirmer} disabled={submitting}
                className="flex-1 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-2.5 rounded-xl transition disabled:opacity-50">
                {submitting ? 'En cours...' : 'Confirmer ✅'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}