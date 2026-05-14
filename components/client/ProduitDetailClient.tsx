'use client'

import { useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart, Check, X, TrendingDown, Ruler,
  Package, ChevronRight, Minus, Plus, AlertCircle,
} from 'lucide-react'

type PrixTier     = { minQte: number; maxQte: number | null; prix: number }
type VariantOption = { id: string; valeur: string; stock: number }
type Variant = {
  id: string; nom: string; couleur: string | null
  stock: number; images: string[]
  options: VariantOption[]
}
type Produit = {
  id: string; nom: string; prix: number; stock: number; images: string[]
  prixVariables: PrixTier[] | null
  typeOption: string | null
  variants: Variant[]
}

function getPrixEffectif(tiers: PrixTier[], quantite: number, prixBase: number): number {
  if (!tiers.length) return prixBase
  for (const t of [...tiers].sort((a, b) => b.minQte - a.minQte)) {
    if (quantite >= t.minQte) return t.prix
  }
  return prixBase
}

export default function ProduitDetailClient({ produit }: { produit: Produit }) {
  const { data: session } = useSession()
  const router = useRouter()

  const tiers       = useMemo(() => (produit.prixVariables ?? []).sort((a, b) => a.minQte - b.minQte), [produit.prixVariables])
  const hasTiers    = tiers.length > 0
  const hasVariants = produit.variants.length > 0
  const typeOpt     = produit.typeOption || 'Taille'

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    hasVariants ? produit.variants[0].id : null
  )
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [imageIdx, setImageIdx] = useState(0)
  const [quantite, setQuantite] = useState(1)
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)

  const selectedVariant = useMemo(
    () => produit.variants.find(v => v.id === selectedVariantId) ?? null,
    [selectedVariantId, produit.variants]
  )
  const selectedOption = useMemo(
    () => selectedVariant?.options.find(o => o.id === selectedOptionId) ?? null,
    [selectedOptionId, selectedVariant]
  )

  const images = useMemo(
    () => (selectedVariant?.images.length ? selectedVariant.images : produit.images),
    [selectedVariant, produit.images]
  )

  const handleSelectVariant = (id: string) => {
    setSelectedVariantId(id)
    setSelectedOptionId(null)
    setImageIdx(0)
  }

  const hasOptions = (selectedVariant?.options.length ?? 0) > 0
  const stock = hasOptions
    ? (selectedOption?.stock ?? 0)
    : hasVariants
      ? (selectedVariant?.stock ?? 0)
      : produit.stock
  const canAdd = hasOptions ? !!selectedOptionId : true

  const prixUnitaire = getPrixEffectif(tiers, quantite, produit.prix)
  const prixReduit   = hasTiers && prixUnitaire < produit.prix
  const prixTotal    = prixUnitaire * quantite

  const handleAddToCart = async () => {
    if (!session) { router.push('/connexion'); return }
    if (!canAdd) return
    setLoading(true)
    try {
      const res = await fetch('/api/panier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produitId: produit.id, quantite,
          variantId:       selectedVariantId || undefined,
          variantOptionId: selectedOptionId  || undefined,
        }),
      })
      if (res.ok) { setSuccess(true); setTimeout(() => setSuccess(false), 2500) }
    } finally { setLoading(false) }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* ── Galerie ── */}
      <div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl aspect-square max-h-[420px] flex items-center justify-center overflow-hidden relative">
          {images[imageIdx]
            ? <img key={images[imageIdx]} src={images[imageIdx]} alt={produit.nom} className="w-full h-full object-cover transition-opacity duration-300" />
            : <Package className="w-24 h-24 text-gray-300 dark:text-gray-600" />
          }
          {selectedVariant && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {selectedVariant.couleur && (
                <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: selectedVariant.couleur }} />
              )}
              {selectedVariant.nom}
              {selectedOption && <><ChevronRight className="w-3 h-3 opacity-60" />{typeOpt} {selectedOption.valeur}</>}
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImageIdx(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${i === imageIdx ? 'border-blue-500 shadow-md' : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Infos + Actions ── */}
      <div className="flex flex-col gap-5">

        {/* Prix */}
        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className={`text-3xl font-bold ${prixReduit ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {prixUnitaire.toFixed(2)} DA
            </span>
            {prixReduit && (
              <>
                <span className="text-xl text-gray-400 line-through font-medium">{produit.prix.toFixed(2)} DA</span>
                <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-semibold px-2 py-0.5 rounded-full">
                  −{Math.round((1 - prixUnitaire / produit.prix) * 100)}%
                </span>
              </>
            )}
          </div>
          {quantite > 1 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Sous-total : <strong className="text-gray-800 dark:text-gray-200">{prixTotal.toFixed(2)} DA</strong>
              {prixReduit && <span className="ml-2 text-gray-400 line-through text-xs">{(produit.prix * quantite).toFixed(2)} DA</span>}
            </p>
          )}
        </div>

        {/* Paliers dégressifs */}
        {hasTiers && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" /> Prix dégressifs
            </p>
            <div className="space-y-1.5">
              {tiers.map((tier, i) => {
                const isActive = quantite >= tier.minQte && (tier.maxQte === null || quantite <= tier.maxQte)
                return (
                  <div key={i} className={`flex justify-between items-center text-sm px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 font-semibold text-blue-800 dark:text-blue-200 ring-1 ring-blue-300 dark:ring-blue-700' : 'text-gray-500 dark:text-gray-400'}`}>
                    <span>{tier.maxQte ? `${tier.minQte}–${tier.maxQte} unités` : `${tier.minQte}+ unités`}</span>
                    <span className="font-bold">
                      {tier.prix.toFixed(2)} DA/u
                      {tier.prix < produit.prix && (
                        <span className="ml-1.5 text-xs text-green-600 dark:text-green-400">−{Math.round((1 - tier.prix / produit.prix) * 100)}%</span>
                      )}
                    </span>
                    {isActive && <span className="text-xs text-blue-500 shrink-0 flex items-center gap-1"><Check className="w-3 h-3" /> actif</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Sélecteur VARIANTE */}
        {hasVariants && (
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {produit.variants.some(v => v.couleur) ? 'Couleur' : 'Variante'}
              {selectedVariant && <span className="ml-2 text-gray-400 font-normal">— {selectedVariant.nom}</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {produit.variants.map(variant => {
                const isSelected = variant.id === selectedVariantId
                const outOfStock = variant.options.length > 0
                  ? variant.options.every(o => o.stock === 0)
                  : variant.stock === 0
                return (
                  <button key={variant.id}
                    onClick={() => !outOfStock && handleSelectVariant(variant.id)}
                    disabled={outOfStock}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/60 shadow-sm'
                        : outOfStock
                          ? 'border-gray-200 dark:border-gray-700 opacity-35 cursor-not-allowed'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                    }`}
                  >
                    {variant.couleur && (
                      <span className={`w-5 h-5 rounded-full border shrink-0 ${isSelected ? 'border-blue-400' : 'border-gray-300 dark:border-gray-600'}`}
                        style={{ backgroundColor: variant.couleur }} />
                    )}
                    <span className="text-gray-800 dark:text-gray-200">{variant.nom}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                    {outOfStock && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                        <X className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Sélecteur OPTION (taille, pointure, volume…) */}
        {selectedVariant && selectedVariant.options.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <Ruler className="w-4 h-4" />
              {typeOpt}
              {selectedOption
                ? <span className="text-gray-400 font-normal">— {selectedOption.valeur}</span>
                : <span className="text-orange-500 dark:text-orange-400 font-normal text-xs flex items-center gap-1 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" /> sélectionnez
                  </span>
              }
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedVariant.options.map(option => {
                const isSelected = option.id === selectedOptionId
                const outOfStock = option.stock === 0
                return (
                  <button key={option.id}
                    onClick={() => !outOfStock && setSelectedOptionId(option.id)}
                    disabled={outOfStock}
                    title={outOfStock ? `Rupture` : `${option.stock} disponibles`}
                    className={`relative min-w-[3rem] px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                      isSelected
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-sm'
                        : outOfStock
                          ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-400'
                    }`}
                  >
                    {option.valeur}
                    {outOfStock && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                        <X className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            {selectedOption && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {selectedOption.stock} disponibles en {typeOpt.toLowerCase()} {selectedOption.valeur}
              </p>
            )}
          </div>
        )}

        {/* Stock (si pas d'options) */}
        {!hasOptions && (
          <div className={`flex items-center gap-2 text-sm font-medium ${stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
            {stock > 0 ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span>{stock > 0 ? `En stock (${stock} disponibles)` : 'Rupture de stock'}</span>
          </div>
        )}

        {/* Quantité */}
        {/* Quantité */}
        {(stock > 0 && canAdd) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Quantité
              </p>

              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                Stock disponible : {stock}
              </span>
            </div>

            <div className="flex items-center gap-3">

              {/* Bouton - */}
              <button
                onClick={() => setQuantite(q => Math.max(1, q - 1))}
                disabled={quantite <= 1}
                className="
                  w-10 h-10 rounded-xl
                  bg-gray-100 dark:bg-gray-800
                  flex items-center justify-center
                  disabled:opacity-30
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition active:scale-95
                "
              >
                <Minus className="w-4 h-4 text-gray-700 dark:text-gray-200" />
              </button>

              {/* INPUT */}
              <input
                type="number"
                min={1}
                max={stock}
                value={quantite}
                onChange={(e) => {
                  let value = Number(e.target.value)

                  if (isNaN(value)) value = 1

                  // Minimum
                  if (value < 1) value = 1

                  // Maximum stock
                  if (value > stock) value = stock

                  setQuantite(value)
                }}
                className="
                  w-24 h-10 text-center
                  rounded-xl border
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-900
                  text-gray-800 dark:text-gray-100
                  font-bold text-lg
                  outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />

              {/* Bouton + */}
              <button
                onClick={() => setQuantite(q => Math.min(stock, q + 1))}
                disabled={quantite >= stock}
                className="
                  w-10 h-10 rounded-xl
                  bg-gray-100 dark:bg-gray-800
                  flex items-center justify-center
                  disabled:opacity-30
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition active:scale-95
                "
              >
                <Plus className="w-4 h-4 text-gray-700 dark:text-gray-200" />
              </button>

              {/* Prix dégressif */}
              {hasTiers && (
                <span className="text-xs text-blue-500 dark:text-blue-400 font-medium flex items-center gap-1">
                  {prixReduit
                    ? <><TrendingDown className="w-3.5 h-3.5" /> Prix réduit actif</>
                    : 'Augmentez pour un meilleur prix'}
                </span>
              )}
            </div>

            {/* Message limite stock */}
            {quantite >= stock && (
              <p className="mt-2 text-xs text-orange-500 dark:text-orange-400">
                Quantité maximale disponible atteinte.
              </p>
            )}
          </div>
        )}

        {/* Bouton panier */}
        <button
          onClick={handleAddToCart}
          disabled={loading || stock === 0 || !canAdd}
          className={`w-full font-semibold py-4 rounded-xl transition-all text-base active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
            stock === 0
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              : !canAdd
                ? 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-orange-800'
                : success
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 disabled:opacity-50'
          }`}
        >
          {stock === 0 ? (
            <><X className="w-5 h-5" /> Indisponible</>
          ) : !canAdd ? (
            <><Ruler className="w-5 h-5" /> Choisissez une {typeOpt.toLowerCase()}</>
          ) : loading ? (
            'Ajout en cours...'
          ) : success ? (
            <><Check className="w-5 h-5" /> Ajouté au panier !</>
          ) : (
            <><ShoppingCart className="w-5 h-5" />
              {quantite > 1 ? `Ajouter ×${quantite} — ${prixTotal.toFixed(2)} DA` : 'Ajouter au panier'}
            </>
          )}
        </button>

      </div>
    </div>
  )
}
