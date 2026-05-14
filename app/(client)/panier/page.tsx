'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ShoppingCart, X, Minus, Plus, Check, TrendingDown,
  Ruler, Package, ChevronRight, ArrowLeft, AlertTriangle,
  Trash2, ShoppingBag, Tag,
} from 'lucide-react'

/* ── Types ── */
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

/* ── Contrôle quantité ─────────────────────── */
function QuantiteControl({
  item, onUpdate,
}: { item: CartItem; onUpdate: (id: string, q: number) => Promise<void> }) {
  const maxStock = item.variantOption?.stock ?? (item.variant?.stock ?? item.product.stock)
  const [val,      setVal]      = useState(String(item.quantite))
  const [stockMsg, setStockMsg] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => { setVal(String(item.quantite)) }, [item.quantite])

  const apply = useCallback(async (raw: number) => {
    const n      = Math.max(1, Math.round(raw))
    const capped = Math.min(n, maxStock)
    setStockMsg(n > maxStock ? `Max disponible : ${maxStock}` : '')
    setVal(String(capped))
    setUpdating(true)
    await onUpdate(item.id, capped)
    setUpdating(false)
  }, [item.id, maxStock, onUpdate])

  const currentQ = Number(val) || 1

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <button onClick={() => apply(currentQ - 1)} disabled={currentQ <= 1 || updating}
          className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition active:scale-95">
          <Minus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
        </button>
        <input
          type="number" min={1} max={maxStock} value={val}
          onChange={e => { setVal(e.target.value); if (Number(e.target.value) > maxStock) setStockMsg(`Max : ${maxStock}`) }}
          onBlur={() => { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n); else setVal(String(item.quantite)) }}
          onKeyDown={e => { if (e.key === 'Enter') { const n = Number(val); if (!isNaN(n) && n >= 1) apply(n) } }}
          onFocus={e => e.target.select()}
          disabled={updating}
          className="w-14 text-center font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 disabled:opacity-60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none transition"
        />
        <button onClick={() => apply(currentQ + 1)} disabled={currentQ >= maxStock || updating}
          className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition active:scale-95">
          <Plus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
        </button>
        {updating && (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        )}
      </div>
      {stockMsg && (
        <p className="text-xs text-orange-500 dark:text-orange-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />{stockMsg}
        </p>
      )}
    </div>
  )
}

/* ── Sélecteur variante inline ─────────────── */
function VariantSelector({ item, onChange }: {
  item: CartItem
  onChange: (itemId: string, variantId: string | null, optionId: string | null) => Promise<void>
}) {
  const { product, variant, variantOption } = item
  if (!product.variants?.length) return null
  const [changing, setChanging] = useState(false)
  const typeOpt    = product.typeOption || 'Taille'
  const isColor    = product.variants.some(v => v.couleur)
  const curVariant = product.variants.find(v => v.id === variant?.id) ?? null
  const hasOptions = (curVariant?.options.length ?? 0) > 0

  const handleVariant = async (variantId: string) => {
    if (variantId === variant?.id) return
    setChanging(true); await onChange(item.id, variantId, null); setChanging(false)
  }
  const handleOption = async (optionId: string) => {
    if (optionId === variantOption?.id) return
    setChanging(true); await onChange(item.id, variant?.id ?? null, optionId); setChanging(false)
  }

  return (
    <div className="mt-2 space-y-2">
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 font-bold uppercase tracking-wide">
          {isColor ? 'Couleur' : 'Variante'}
          {changing && <span className="ml-1 text-blue-400 normal-case font-normal">mise à jour…</span>}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map(v => {
            const isSel      = v.id === variant?.id
            const outOfStock = v.options.length > 0 ? v.options.every(o => o.stock === 0) : v.stock === 0
            return (
              <button key={v.id}
                onClick={() => !outOfStock && !changing && handleVariant(v.id)}
                disabled={outOfStock || changing}
                className={`relative flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium transition-all ${
                  isSel
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : outOfStock
                      ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400'
                }`}>
                {v.couleur && <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-500 shrink-0" style={{ backgroundColor: v.couleur }} />}
                {v.nom}
                {isSel && <Check className="w-3 h-3 text-blue-500 shrink-0" />}
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

      {hasOptions && curVariant && (
        <div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 font-bold uppercase tracking-wide flex items-center gap-1">
            <Ruler className="w-3 h-3" />{typeOpt}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {curVariant.options.map(o => {
              const isSel = o.id === variantOption?.id
              return (
                <button key={o.id}
                  onClick={() => o.stock > 0 && !changing && handleOption(o.id)}
                  disabled={o.stock === 0 || changing}
                  className={`relative min-w-[2.25rem] px-2 py-1 rounded-lg border text-xs font-semibold transition-all ${
                    isSel
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      : o.stock === 0
                        ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400'
                  }`}>
                  {o.valeur}
                  {o.stock === 0 && (
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

/* ── Page panier ───────────────────────────── */
export default function PanierPage() {
  const [panier,        setPanier]        = useState<Cart | null>(null)
  const [loading,       setLoading]       = useState(true)
  const [vidageLoading, setVidageLoading] = useState(false)

  const fetchPanier = async () => {
    try { const res = await fetch('/api/panier'); setPanier(await res.json()) }
    finally { setLoading(false) }
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

  const viderPanier = async () => {
    if (!panier) return
    setVidageLoading(true)
    await Promise.all(panier.items.map(i => fetch(`/api/panier/${i.id}`, { method: 'DELETE' })))
    await fetchPanier()
    setVidageLoading(false)
  }

  /* ── Calculs ── */
  const lignesCalc = (panier?.items ?? []).map(item => {
    const prixUnit  = getPrixUnitaire(item.product, item.quantite)
    const prixBase  = item.product.prix
    const estReduit = (item.product.prixVariables?.length ?? 0) > 0 && prixUnit < prixBase
    return { item, prixUnit, prixBase, estReduit, sousLigne: prixUnit * item.quantite }
  })
  const sousTotal      = lignesCalc.reduce((s, l) => s + l.sousLigne, 0)
  const totalEconomies = lignesCalc.reduce((s, l) => s + (l.estReduit ? (l.prixBase - l.prixUnit) * l.item.quantite : 0), 0)

  /* ── Loading ── */
  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-400">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
      Chargement du panier…
    </div>
  )

  /* ── Panier vide ── */
  if (!panier || panier.items.length === 0) return (
    <div className="max-w-5xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-4">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Votre panier est vide</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-xs">Ajoutez des produits pour commencer vos achats.</p>
      <Link href="/produits"
        className="mt-2 inline-flex items-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold px-8 py-3 rounded-xl transition">
        <ShoppingBag className="w-4 h-4" /> Découvrir les produits
      </Link>
    </div>
  )

  /* ── Panier rempli ── */
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Mon Panier
          <span className="text-base font-normal text-gray-400 ml-1">({panier.items.length} article{panier.items.length > 1 ? 's' : ''})</span>
        </h1>
        <button onClick={viderPanier} disabled={vidageLoading}
          className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition flex items-center gap-1 disabled:opacity-50">
          <Trash2 className="w-3.5 h-3.5" />
          {vidageLoading ? 'Vidage…' : 'Vider le panier'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Articles ── */}
        <div className="lg:col-span-2 space-y-3">
          {lignesCalc.map(({ item, prixUnit, prixBase, estReduit, sousLigne }) => {
            const imageUrl = getItemImage(item)
            const typeOpt  = item.product.typeOption || 'Taille'

            return (
              <div key={item.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition hover:shadow-sm">

                {/* Corps de la carte */}
                <div className="flex gap-3 p-4">

                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 relative">
                    {imageUrl
                      ? <img src={imageUrl} alt={item.product.nom} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-gray-300 dark:text-gray-600" /></div>
                    }
                    {item.variant?.couleur && (
                      <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                        style={{ backgroundColor: item.variant.couleur }} />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">{item.product.category.nom}</p>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug line-clamp-2">{item.product.nom}</h3>
                      </div>
                      {/* Supprimer */}
                      <button onClick={() => supprimerItem(item.id)}
                        className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition p-1 shrink-0 rounded-lg hover:bg-red-50 dark:hover:bg-red-950">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Badge variante sélectionnée */}
                    {(item.variant || item.variantOption) && (
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        {item.variant?.couleur && (
                          <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 inline-block shrink-0"
                            style={{ backgroundColor: item.variant.couleur }} />
                        )}
                        {item.variant && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                            {item.variant.nom}
                          </span>
                        )}
                        {item.variantOption && (
                          <>
                            <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Ruler className="w-2.5 h-2.5" />{typeOpt} {item.variantOption.valeur}
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Sélecteur variante */}
                    <VariantSelector item={item} onChange={updateItem} />

                    {/* Prix unitaire */}
                    <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                      <span className={`text-base font-bold ${estReduit ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {prixUnit.toFixed(2)} DA
                      </span>
                      {estReduit && (
                        <>
                          <span className="text-xs text-gray-400 line-through">{prixBase.toFixed(2)} DA</span>
                          <span className="text-[10px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <TrendingDown className="w-2.5 h-2.5" />
                            −{Math.round((1 - prixUnit / prixBase) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Barre quantité + sous-total article */}
                <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 px-4 py-2.5 flex items-center justify-between gap-4">
                  <QuantiteControl item={item} onUpdate={updateQuantite} />
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Sous-total</p>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{sousLigne.toFixed(2)} DA</p>
                    {estReduit && (
                      <p className="text-[10px] text-gray-400 line-through">{(prixBase * item.quantite).toFixed(2)} DA</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Lien continuer */}
          <Link href="/produits" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition mt-1">
            <ArrowLeft className="w-4 h-4" /> Continuer les achats
          </Link>
        </div>

        {/* ── Résumé de commande ── */}
        <div className="lg:sticky lg:top-20 h-fit space-y-3">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Résumé</h2>

            {/* Lignes articles */}
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
              {lignesCalc.map(({ item, prixUnit, sousLigne }) => {
                const typeOpt = item.product.typeOption || 'Taille'
                return (
                  <div key={item.id} className="flex justify-between items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex-1 line-clamp-2 leading-relaxed">
                      {item.variant?.couleur && (
                        <span className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block mr-1 align-middle shrink-0"
                          style={{ backgroundColor: item.variant.couleur }} />
                      )}
                      {item.product.nom}
                      {item.variant ? ` — ${item.variant.nom}` : ''}
                      {item.variantOption ? ` / ${typeOpt} ${item.variantOption.valeur}` : ''}
                      {' '}×{item.quantite}
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0 tabular-nums">
                      {sousLigne.toFixed(2)} DA
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Totaux */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2.5">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Sous-total</span>
                <span className="tabular-nums">{sousTotal.toFixed(2)} DA</span>
              </div>
              {totalEconomies > 0 && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Réductions dégressives
                  </span>
                  <span className="tabular-nums font-semibold">−{totalEconomies.toFixed(2)} DA</span>
                </div>
              )}
              <p className="text-xs text-gray-400">Frais de livraison calculés à l&apos;étape suivante</p>
              <div className="flex justify-between font-bold text-lg pt-1 border-t border-gray-100 dark:border-gray-800">
                <span className="text-gray-800 dark:text-gray-100">Total articles</span>
                <span className="text-blue-600 dark:text-blue-400 tabular-nums">{sousTotal.toFixed(2)} DA</span>
              </div>
            </div>
          </div>

          {/* Économies badge */}
          {totalEconomies > 0 && (
            <div className="bg-green-50 dark:bg-green-950/50 border border-green-100 dark:border-green-900 rounded-xl px-4 py-3 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center shrink-0">
                <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-green-700 dark:text-green-400">Vous économisez !</p>
                <p className="text-sm font-semibold text-green-800 dark:text-green-300">{totalEconomies.toFixed(2)} DA grâce aux prix dégressifs</p>
              </div>
            </div>
          )}

          {/* Bouton commander */}
          <Link href="/commandes/nouveau"
            className="flex items-center justify-center gap-2 w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-4 rounded-xl transition text-base shadow-lg shadow-black/10 dark:shadow-white/10">
            <ShoppingBag className="w-5 h-5" /> Passer la commande
          </Link>
        </div>

      </div>
    </div>
  )
}