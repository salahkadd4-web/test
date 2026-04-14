'use client'
import { useState, useEffect, useCallback } from 'react'
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

function QuantiteControl({
  item,
  onUpdate,
}: {
  item: CartItem
  onUpdate: (id: string, q: number) => Promise<void>
}) {
  const [val, setVal] = useState(String(item.quantite))
  const [stockMsg, setStockMsg] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    setVal(String(item.quantite))
  }, [item.quantite])

  const apply = useCallback(
    async (raw: number) => {
      const newQ = Math.max(1, Math.round(raw))
      if (newQ > item.product.stock) {
        setStockMsg(
          `Il reste ${item.product.stock} pièce${item.product.stock > 1 ? 's' : ''} en stock`
        )
        setVal(String(item.product.stock))
        setUpdating(true)
        await onUpdate(item.id, item.product.stock)
        setUpdating(false)
        return
      }
      setStockMsg('')
      setVal(String(newQ))
      setUpdating(true)
      await onUpdate(item.id, newQ)
      setUpdating(false)
    },
    [item.id, item.product.stock, onUpdate]
  )

  const currentQ = Number(val) || 1
  const atMin = currentQ <= 1
  const atMax = currentQ >= item.product.stock

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <button
          onClick={() => apply(currentQ - 1)}
          disabled={atMin || updating}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold text-lg disabled:opacity-40 transition active:scale-95"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          max={item.product.stock}
          value={val}
          onChange={(e) => {
            setVal(e.target.value)
            const n = Number(e.target.value)
            if (!isNaN(n) && n > item.product.stock) {
              setStockMsg(
                `Il reste ${item.product.stock} pièce${item.product.stock > 1 ? 's' : ''} en stock`
              )
            } else {
              setStockMsg('')
            }
          }}
          onBlur={() => {
            const n = Number(val)
            if (!isNaN(n) && n >= 1) apply(n)
            else setVal(String(item.quantite))
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const n = Number(val)
              if (!isNaN(n) && n >= 1) apply(n)
            }
          }}
          className="w-14 text-center font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={() => apply(currentQ + 1)}
          disabled={atMax || updating}
          title={atMax ? `Stock max atteint (${item.product.stock})` : undefined}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold text-lg disabled:opacity-40 transition active:scale-95"
        >
          +
        </button>
      </div>
      {stockMsg && (
        <p className="text-xs text-orange-500 dark:text-orange-400 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          {stockMsg}
        </p>
      )}
    </div>
  )
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

  useEffect(() => {
    fetchPanier()
  }, [])

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

  // ✅ NOUVEAU : vérifie si un article dépasse son stock
  const hasStockError = panier?.items.some((item) => item.quantite > item.product.stock) ?? false

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">
        Chargement du panier...
      </div>
    )
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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Mon Panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Liste des articles ── */}
        <div className="lg:col-span-2 space-y-3">
          {panier.items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="flex gap-3 p-3">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                  {item.product.images[0] ? (
                    <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-0.5 truncate">
                    {item.product.category.nom}
                  </p>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug line-clamp-2">
                    {item.product.nom}
                  </h3>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                    {item.product.prix.toFixed(2)} DA
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Stock : {item.product.stock} pièce{item.product.stock > 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => supprimerItem(item.id)}
                  className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition self-start mt-0.5 p-1"
                  title="Supprimer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-2.5 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                <QuantiteControl item={item} onUpdate={updateQuantite} />
                <div className="text-right">
                  <p className="text-xs text-gray-400 dark:text-gray-500">Sous-total</p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                    {(item.product.prix * item.quantite).toFixed(2)} DA
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Résumé commande ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 h-fit lg:sticky lg:top-20">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Résumé</h2>
          <div className="space-y-2 mb-4">
            {panier.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="line-clamp-1 flex-1 text-xs">{item.product.nom} ×{item.quantite}</span>
                <span className="ml-2 font-medium text-gray-800 dark:text-gray-200 text-xs shrink-0">
                  {(item.product.prix * item.quantite).toFixed(2)} DA
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-5">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-gray-900 dark:text-white">{total.toFixed(2)} DA</span>
            </div>
          </div>

          {/* ✅ MODIFIÉ : bouton désactivé si hasStockError */}
          {hasStockError ? (
            <div className="block w-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-semibold py-3 rounded-xl text-center text-sm cursor-not-allowed select-none">
              Passer la commande
            </div>
          ) : (
            <Link
              href="/commandes/nouveau"
              className="block w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 rounded-xl text-center transition text-sm"
            >
              Passer la commande
            </Link>
          )}

          {hasStockError && (
            <p className="text-xs text-red-500 dark:text-red-400 text-center mt-2">
              Certains articles dépassent le stock disponible.
            </p>
          )}

          <Link
            href="/produits"
            className="block w-full text-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm mt-3 transition"
          >
            ← Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  )
}