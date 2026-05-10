'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Package, ShoppingCart } from 'lucide-react'

type Variant  = { id: string; nom: string; couleur: string | null; stock: number; images: string[] }
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
    variants: Variant[]
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

/** Retourne l'image à afficher : priorité variante → produit */
function getItemImage(item: CartItem): string | null {
  if (item.variant?.images?.length) return item.variant.images[0]
  return item.product.images[0] ?? null
}

// ── Contrôle de quantité ───────────────────────────────────────────────────
function QuantiteControl({ item, onUpdate }: { item: CartItem; onUpdate: (id: string, q: number) => Promise<void> }) {
  const maxStock = item.variant ? item.variant.stock : item.product.stock
  const [val,      setVal]      = useState(String(item.quantite))
  const [stockMsg, setStockMsg] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => { setVal(String(item.quantite)) }, [item.quantite])

  const apply = useCallback(async (raw: number) => {
    const newQ = Math.max(1, Math.round(raw))
    if (newQ > maxStock) {
      setStockMsg(`Max : ${maxStock} en stock`)
      setVal(String(maxStock))
      setUpdating(true)
      await onUpdate(item.id, maxStock)
      setUpdating(false)
      return
    }
    setStockMsg('')
    setVal(String(newQ))
    setUpdating(true)
    await onUpdate(item.id, newQ)
    setUpdating(false)
  }, [item.id, maxStock, onUpdate])

  const currentQ = Number(val) || 1
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <button onClick={() => apply(currentQ - 1)} disabled={currentQ <= 1 || updating}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-lg disabled:opacity-40 transition active:scale-95">−</button>
        <input
          type="number" min={1} max={maxStock} value={val}
          onChange={e => { setVal(e.target.value); if (Number(e.target.value) > maxStock) setStockMsg(`Max : ${maxStock}`) }}
          onBlur={() => { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n); else setVal(String(item.quantite)) }}
          onKeyDown={e => { if (e.key === 'Enter') { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n) } }}
          className="w-14 text-center font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button onClick={() => apply(currentQ + 1)} disabled={currentQ >= maxStock || updating}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-lg disabled:opacity-40 transition active:scale-95">+</button>
      </div>
      {stockMsg && <p className="text-xs text-orange-500 dark:text-orange-400">{stockMsg}</p>}
    </div>
  )
}

// ── Sélecteur de variante inline dans le panier ────────────────────────────
function VariantSelector({
  item,
  onChangeVariant,
}: {
  item: CartItem
  onChangeVariant: (itemId: string, variantId: string | null) => Promise<void>
}) {
  const { product, variant } = item
  if (!product.variants || product.variants.length === 0) return null

  const [changing, setChanging] = useState(false)

  const handleChange = async (variantId: string | null) => {
    if (variantId === (variant?.id ?? null)) return
    setChanging(true)
    await onChangeVariant(item.id, variantId)
    setChanging(false)
  }

  const isColor = product.variants.some(v => v.couleur)

  return (
    <div className="mt-2">
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1.5 font-medium uppercase tracking-wide">
        {isColor ? 'Couleur' : 'Variante'}
        {changing && <span className="ml-2 text-blue-400">...</span>}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {product.variants.map(v => {
          const isSelected = v.id === (variant?.id ?? null)
          const outOfStock = v.stock === 0
          return (
            <button
              key={v.id}
              onClick={() => !outOfStock && !changing && handleChange(v.id)}
              disabled={outOfStock || changing}
              title={outOfStock ? `${v.nom} — rupture` : v.nom}
              className={`relative flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium transition-all ${
                isSelected
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                  : outOfStock
                    ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {v.couleur && (
                <span
                  className="w-3 h-3 rounded-full inline-block border border-gray-300 dark:border-gray-500 shrink-0"
                  style={{ backgroundColor: v.couleur }}
                />
              )}
              {v.nom}
              {isSelected && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 shrink-0 text-blue-500">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                </svg>
              )}
              {outOfStock && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center">×</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Page panier ────────────────────────────────────────────────────────────
export default function PanierPage() {
  const [panier,  setPanier]  = useState<Cart | null>(null)
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

  const changeVariant = async (itemId: string, variantId: string | null) => {
    await fetch(`/api/panier/${itemId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId }),
    })
    fetchPanier()
  }

  const supprimerItem = async (itemId: string) => {
    await fetch(`/api/panier/${itemId}`, { method: 'DELETE' })
    fetchPanier()
  }

  const total = panier?.items.reduce((acc, item) => {
    return acc + getPrixUnitaire(item.product, item.quantite) * item.quantite
  }, 0) ?? 0

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">
      Chargement du panier...
    </div>
  )

  if (!panier || panier.items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <p className="text-6xl mb-4"><ShoppingCart className="w-5 h-5" /></p>
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

        {/* ── Items ── */}
        <div className="lg:col-span-2 space-y-3">
          {panier.items.map(item => {
            const prixUnitaire  = getPrixUnitaire(item.product, item.quantite)
            const hasPrixVar    = item.product.prixVariables && item.product.prixVariables.length > 0
            const prixReduit    = hasPrixVar && prixUnitaire < item.product.prix
            const imageUrl      = getItemImage(item)

            return (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="flex gap-3 p-3">

                  {/* Image — reflète la variante sélectionnée */}
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 relative">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.product.nom}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl"><Package className="w-8 h-8" /></div>
                    )}
                    {/* Mini swatch couleur en overlay si variante colorée */}
                    {item.variant?.couleur && (
                      <span
                        className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 shadow"
                        style={{ backgroundColor: item.variant.couleur }}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-0.5 truncate">{item.product.category.nom}</p>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug line-clamp-2">{item.product.nom}</h3>

                    {/* Sélecteur de variante */}
                    <VariantSelector item={item} onChangeVariant={changeVariant} />

                    {/* Prix */}
                    <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                      <p className={`text-base font-bold ${prixReduit ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {prixUnitaire.toFixed(2)} DA
                      </p>
                      {prixReduit && (
                        <p className="text-xs text-gray-400 line-through">{item.product.prix.toFixed(2)} DA</p>
                      )}
                      {hasPrixVar && prixReduit && (
                        <span className="text-[10px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-bold px-1.5 py-0.5 rounded-full">
                          −{Math.round((1 - prixUnitaire / item.product.prix) * 100)}%
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Stock : {item.variant ? item.variant.stock : item.product.stock}
                    </p>
                  </div>

                  <button onClick={() => supprimerItem(item.id)}
                    className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition self-start mt-0.5 p-1 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Barre quantité + sous-total */}
                <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-2.5 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                  <QuantiteControl item={item} onUpdate={updateQuantite} />
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Sous-total</p>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                      {(prixUnitaire * item.quantite).toFixed(2)} DA
                    </p>
                    {prixReduit && (
                      <p className="text-[10px] text-gray-400 line-through">
                        {(item.product.prix * item.quantite).toFixed(2)} DA
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Résumé ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 h-fit lg:sticky lg:top-20">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Résumé</h2>
          <div className="space-y-2 mb-4">
            {panier.items.map(item => {
              const prix = getPrixUnitaire(item.product, item.quantite)
              return (
                <div key={item.id} className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span className="line-clamp-1 flex-1">
                    {/* Mini swatch dans le résumé */}
                    {item.variant?.couleur && (
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full border border-gray-300 mr-1 align-middle"
                        style={{ backgroundColor: item.variant.couleur }}
                      />
                    )}
                    {item.product.nom}
                    {item.variant && ` — ${item.variant.nom}`}
                    {' '}×{item.quantite}
                  </span>
                  <span className="ml-2 font-medium text-gray-800 dark:text-gray-200 shrink-0">
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
          <Link href="/commandes/nouveau"
            className="block w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 rounded-xl text-center transition text-sm">
            Passer la commande
          </Link>
          <Link href="/produits" className="block w-full text-center text-gray-500 hover:text-black dark:hover:text-white text-sm mt-3 transition">
            ← Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  )
}