'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Variant = { id: string; nom: string; couleur: string | null }
type PrixTier = { minQte: number; maxQte: number | null; prix: number }

type CartItem = {
  id: string
  quantite: number
  variant: Variant | null
  product: {
    id: string
    nom: string
    prix: number
    prixVariables: PrixTier[] | null
    images: string[]
    stock: number
    category: { nom: string }
  }
}

type Cart = { id: string; items: CartItem[] }

function getPrixUnitaire(product: CartItem['product'], quantite: number): number {
  if (!product.prixVariables || product.prixVariables.length === 0) return product.prix
  const tiers = [...product.prixVariables].sort((a, b) => b.minQte - a.minQte)
  for (const tier of tiers) {
    if (quantite >= tier.minQte) return tier.prix
  }
  return product.prix
}

function QuantiteControl({ item, onUpdate }: { item: CartItem; onUpdate: (id: string, q: number) => Promise<void> }) {
  const [val, setVal] = useState(String(item.quantite))
  const [stockMsg, setStockMsg] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => { setVal(String(item.quantite)) }, [item.quantite])

  const apply = useCallback(async (raw: number) => {
    const newQ = Math.max(1, Math.round(raw))
    if (newQ > item.product.stock) {
      setStockMsg(`Il reste ${item.product.stock} pièce${item.product.stock > 1 ? 's' : ''} en stock`)
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
  }, [item.id, item.product.stock, onUpdate])

  const currentQ = Number(val) || 1
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <button onClick={() => apply(currentQ - 1)} disabled={currentQ <= 1 || updating}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-lg disabled:opacity-40 transition active:scale-95">−</button>
        <input type="number" min={1} max={item.product.stock} value={val}
          onChange={e => { setVal(e.target.value); if (Number(e.target.value) > item.product.stock) setStockMsg(`Max : ${item.product.stock}`); else setStockMsg('') }}
          onBlur={() => { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n); else setVal(String(item.quantite)) }}
          onKeyDown={e => { if (e.key === 'Enter') { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n) } }}
          className="w-14 text-center font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
        <button onClick={() => apply(currentQ + 1)} disabled={currentQ >= item.product.stock || updating}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-lg disabled:opacity-40 transition active:scale-95">+</button>
      </div>
      {stockMsg && <p className="text-xs text-orange-500 dark:text-orange-400">{stockMsg}</p>}
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
    } catch { console.error('Erreur panier') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchPanier() }, [])

  const updateQuantite = async (itemId: string, quantite: number) => {
    await fetch(`/api/panier/${itemId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantite }),
    })
    fetchPanier()
  }

  const supprimerItem = async (itemId: string) => {
    await fetch(`/api/panier/${itemId}`, { method: 'DELETE' })
    fetchPanier()
  }

  const total = panier?.items.reduce((acc, item) => {
    const prix = getPrixUnitaire(item.product, item.quantite)
    return acc + prix * item.quantite
  }, 0) ?? 0

  const hasStockError = panier?.items.some(item => item.quantite > item.product.stock) ?? false

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">
      Chargement du panier...
    </div>
  )

  if (!panier || panier.items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <p className="text-6xl mb-4">🛒</p>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Votre panier est vide</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Ajoutez des produits pour commencer vos achats</p>
      <Link href="/produits" className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold px-8 py-3 rounded-xl transition">
        Voir les produits
      </Link>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Mon Panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {panier.items.map(item => {
            const prixUnitaire = getPrixUnitaire(item.product, item.quantite)
            const hasPrixVariable = item.product.prixVariables && item.product.prixVariables.length > 0
            return (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="flex gap-3 p-3">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                    {item.product.images[0] ? (
                      <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-0.5 truncate">{item.product.category.nom}</p>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug line-clamp-2">{item.product.nom}</h3>
                    {/* Badge variante */}
                    {item.variant && (
                      <div className="flex items-center gap-1.5 mt-1">
                        {item.variant.couleur && (
                          <span className="w-3 h-3 rounded-full border border-gray-300 inline-block" style={{ backgroundColor: item.variant.couleur }} />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                          {item.variant.nom}
                        </span>
                      </div>
                    )}
                    <div className="mt-1">
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        {prixUnitaire.toFixed(2)} DA
                        {hasPrixVariable && prixUnitaire !== item.product.prix && (
                          <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-medium">prix dégressif</span>
                        )}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Stock : {item.product.stock} pièce{item.product.stock > 1 ? 's' : ''}</p>
                  </div>
                  <button onClick={() => supprimerItem(item.id)}
                    className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition self-start mt-0.5 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-2.5 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                  <QuantiteControl item={item} onUpdate={updateQuantite} />
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Sous-total</p>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                      {(prixUnitaire * item.quantite).toFixed(2)} DA
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Résumé */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 h-fit lg:sticky lg:top-20">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Résumé</h2>
          <div className="space-y-2 mb-4">
            {panier.items.map(item => {
              const prix = getPrixUnitaire(item.product, item.quantite)
              return (
                <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span className="line-clamp-1 flex-1 text-xs">
                    {item.product.nom}
                    {item.variant && ` (${item.variant.nom})`}
                    {' '}×{item.quantite}
                  </span>
                  <span className="ml-2 font-medium text-gray-800 dark:text-gray-200 text-xs shrink-0">
                    {(prix * item.quantite).toFixed(2)} DA
                  </span>
                </div>
              )
            })}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-5">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-gray-900 dark:text-white">{total.toFixed(2)} DA</span>
            </div>
          </div>

          {hasStockError ? (
            <div className="block w-full bg-gray-300 dark:bg-gray-700 text-gray-500 font-semibold py-3 rounded-xl text-center text-sm cursor-not-allowed">
              Passer la commande
            </div>
          ) : (
            <Link href="/commandes/nouveau"
              className="block w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 rounded-xl text-center transition text-sm">
              Passer la commande
            </Link>
          )}
          {hasStockError && (
            <p className="text-xs text-red-500 text-center mt-2">Certains articles dépassent le stock disponible.</p>
          )}
          <Link href="/produits" className="block w-full text-center text-gray-500 hover:text-black dark:hover:text-white text-sm mt-3 transition">
            ← Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  )
}
