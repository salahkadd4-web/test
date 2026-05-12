'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ShoppingCart, X, Minus, Plus, Check, TrendingDown,
  Ruler, Package, ChevronRight, ArrowLeft, AlertTriangle,
} from 'lucide-react'

type VariantOption = { id: string; valeur: string; stock: number }
type Variant = {
  id: string; nom: string; couleur: string | null
  stock: number; images: string[]
  options: VariantOption[]
}
type PrixTier = { minQte: number; maxQte: number | null; prix: number }

type CartItem = {
  id: string
  quantite: number
  variant:       Variant | null
  variantOption: VariantOption | null
  product: {
    id: string; nom: string; prix: number
    prixVariables: PrixTier[] | null
    images: string[]; stock: number
    typeOption: string | null
    category: { nom: string }
    variants: Variant[]
  }
}

type Cart = { id: string; items: CartItem[] }

function getPrixUnitaire(product: CartItem['product'], quantite: number): number {
  if (!product.prixVariables?.length) return product.prix
  const sorted = [...product.prixVariables].sort((a, b) => b.minQte - a.minQte)
  for (const t of sorted) { if (quantite >= t.minQte) return t.prix }
  return product.prix
}

function getItemImage(item: CartItem): string | null {
  if (item.variant?.images?.length) return item.variant.images[0]
  return item.product.images[0] ?? null
}

// ── Contrôle quantité ──────────────────────────────────────────────────────
function QuantiteControl({ item, onUpdate }: { item: CartItem; onUpdate: (id: string, q: number) => Promise<void> }) {
  const maxStock = item.variantOption?.stock ?? (item.variant?.stock ?? item.product.stock)
  const [val,      setVal]      = useState(String(item.quantite))
  const [stockMsg, setStockMsg] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => { setVal(String(item.quantite)) }, [item.quantite])

  const apply = useCallback(async (raw: number) => {
    const newQ = Math.max(1, Math.round(raw))
    const capped = Math.min(newQ, maxStock)
    if (newQ > maxStock) setStockMsg(`Max : ${maxStock} en stock`)
    else setStockMsg('')
    setVal(String(capped))
    setUpdating(true)
    await onUpdate(item.id, capped)
    setUpdating(false)
  }, [item.id, maxStock, onUpdate])

  const currentQ = Number(val) || 1
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <button onClick={() => apply(currentQ - 1)} disabled={currentQ <= 1 || updating}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center disabled:opacity-40 transition active:scale-95">
          <Minus className="w-3.5 h-3.5 text-gray-700 dark:text-gray-200" />
        </button>
        <input type="number" min={1} max={maxStock} value={val}
          onChange={e => { setVal(e.target.value); if (Number(e.target.value) > maxStock) setStockMsg(`Max : ${maxStock}`) }}
          onBlur={() => { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n); else setVal(String(item.quantite)) }}
          onKeyDown={e => { if (e.key === 'Enter') { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n) } }}
          className="w-14 text-center font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button onClick={() => apply(currentQ + 1)} disabled={currentQ >= maxStock || updating}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center disabled:opacity-40 transition active:scale-95">
          <Plus className="w-3.5 h-3.5 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
      {stockMsg && (
        <p className="text-xs text-orange-500 dark:text-orange-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />{stockMsg}
        </p>
      )}
    </div>
  )
}

// ── Sélecteur variante inline ──────────────────────────────────────────────
function VariantSelector({ item, onChange }: {
  item: CartItem
  onChange: (itemId: string, variantId: string | null, optionId: string | null) => Promise<void>
}) {
  const { product, variant, variantOption } = item
  if (!product.variants?.length) return null
  const [changing, setChanging] = useState(false)
  const typeOpt = product.typeOption || 'Taille'
  const isColor = product.variants.some(v => v.couleur)

  const currentVariant = product.variants.find(v => v.id === variant?.id) ?? null
  const hasOptions     = (currentVariant?.options.length ?? 0) > 0

  const handleVariant = async (variantId: string) => {
    if (variantId === variant?.id) return
    setChanging(true)
    await onChange(item.id, variantId, null)
    setChanging(false)
  }

  const handleOption = async (optionId: string) => {
    if (optionId === variantOption?.id) return
    setChanging(true)
    await onChange(item.id, variant?.id ?? null, optionId)
    setChanging(false)
  }

  return (
    <div className="mt-2 space-y-2">
      {/* Variante (couleur / parfum) */}
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 font-semibold uppercase tracking-wide flex items-center gap-1">
          {isColor ? 'Couleur' : 'Variante'}
          {changing && <span className="text-blue-400 normal-case font-normal">mise à jour...</span>}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map(v => {
            const isSelected = v.id === variant?.id
            const outOfStock = v.options.length > 0
              ? v.options.every(o => o.stock === 0)
              : v.stock === 0
            return (
              <button key={v.id}
                onClick={() => !outOfStock && !changing && handleVariant(v.id)}
                disabled={outOfStock || changing}
                className={`relative flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : outOfStock
                      ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400'
                }`}
              >
                {v.couleur && (
                  <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-500 shrink-0"
                    style={{ backgroundColor: v.couleur }} />
                )}
                {v.nom}
                {isSelected && <Check className="w-3 h-3 text-blue-500 shrink-0" />}
                {outOfStock && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white w-3 h-3 rounded-full flex items-center justify-center">
                    <X className="w-2 h-2" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Option (taille / pointure / volume…) */}
      {hasOptions && currentVariant && (
        <div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 font-semibold uppercase tracking-wide flex items-center gap-1">
            <Ruler className="w-3 h-3" />{typeOpt}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {currentVariant.options.map(o => {
              const isSelected = o.id === variantOption?.id
              const outOfStock = o.stock === 0
              return (
                <button key={o.id}
                  onClick={() => !outOfStock && !changing && handleOption(o.id)}
                  disabled={outOfStock || changing}
                  className={`relative min-w-[2.25rem] px-2 py-1 rounded-lg border text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      : outOfStock
                        ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400'
                  }`}
                >
                  {o.valeur}
                  {outOfStock && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white w-3 h-3 rounded-full flex items-center justify-center">
                      <X className="w-2 h-2" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
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
      setPanier(await res.json())
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchPanier() }, [])

  const updateItem = async (itemId: string, variantId: string | null, optionId: string | null) => {
    await fetch(`/api/panier/${itemId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId, variantOptionId: optionId }),
    })
    fetchPanier()
  }

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
    return acc + getPrixUnitaire(item.product, item.quantite) * item.quantite
  }, 0) ?? 0

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-400 dark:text-gray-500">
      Chargement du panier...
    </div>
  )

  if (!panier || panier.items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Votre panier est vide</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Ajoutez des produits pour commencer vos achats</p>
      <Link href="/produits" className="inline-flex items-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold px-8 py-3 rounded-xl transition">
        <ArrowLeft className="w-4 h-4" /> Voir les produits
      </Link>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <ShoppingCart className="w-7 h-7" /> Mon Panier
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Items ── */}
        <div className="lg:col-span-2 space-y-3">
          {panier.items.map(item => {
            const prixUnitaire = getPrixUnitaire(item.product, item.quantite)
            const prixReduit   = (item.product.prixVariables?.length ?? 0) > 0 && prixUnitaire < item.product.prix
            const imageUrl     = getItemImage(item)
            const typeOpt      = item.product.typeOption || 'Taille'

            return (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="flex gap-3 p-3">

                  {/* Image avec swatch overlay */}
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 relative">
                    {imageUrl
                      ? <img src={imageUrl} alt={item.product.nom} className="w-full h-full object-cover transition-all duration-300" />
                      : <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                    }
                    {item.variant?.couleur && (
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 shadow"
                        style={{ backgroundColor: item.variant.couleur }} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-0.5 truncate">{item.product.category.nom}</p>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug line-clamp-2">{item.product.nom}</h3>

                    {/* Résumé variante sélectionnée */}
                    {(item.variant || item.variantOption) && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                        {item.variant?.couleur && (
                          <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 inline-block"
                            style={{ backgroundColor: item.variant.couleur }} />
                        )}
                        {item.variant && <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">{item.variant.nom}</span>}
                        {item.variantOption && (
                          <>
                            <ChevronRight className="w-3 h-3" />
                            <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                              <Ruler className="w-2.5 h-2.5" />{typeOpt} {item.variantOption.valeur}
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Sélecteur variante + option */}
                    <VariantSelector item={item} onChange={updateItem} />

                    {/* Prix */}
                    <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                      <p className={`text-base font-bold ${prixReduit ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {prixUnitaire.toFixed(2)} DA
                      </p>
                      {prixReduit && (
                        <>
                          <p className="text-xs text-gray-400 line-through">{item.product.prix.toFixed(2)} DA</p>
                          <span className="text-[10px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <TrendingDown className="w-2.5 h-2.5" />
                            −{Math.round((1 - prixUnitaire / item.product.prix) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <button onClick={() => supprimerItem(item.id)}
                    className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition self-start mt-0.5 p-1 shrink-0">
                    <X className="w-4 h-4" />
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
              const prix     = getPrixUnitaire(item.product, item.quantite)
              const typeOpt  = item.product.typeOption || 'Taille'
              return (
                <div key={item.id} className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span className="line-clamp-1 flex-1 flex items-center gap-1 flex-wrap">
                    {item.variant?.couleur && (
                      <span className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block shrink-0"
                        style={{ backgroundColor: item.variant.couleur }} />
                    )}
                    {item.product.nom}
                    {item.variant && ` — ${item.variant.nom}`}
                    {item.variantOption && ` / ${typeOpt} ${item.variantOption.valeur}`}
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
          <Link href="/produits" className="flex items-center justify-center gap-1.5 w-full text-gray-500 hover:text-black dark:hover:text-white text-sm mt-3 transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  )
}
