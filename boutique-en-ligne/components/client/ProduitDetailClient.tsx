'use client'

import { useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Flower2, Package, Palette, ShoppingCart, XCircle } from 'lucide-react'

type PrixTier = { minQte: number; maxQte: number | null; prix: number }
type Variant = {
  id: string
  nom: string
  couleur: string | null
  stock: number
  images: string[]
}
type Produit = {
  id: string
  nom: string
  prix: number          // prix de base (pour 1 unité sans palier)
  stock: number
  images: string[]
  prixVariables: PrixTier[] | null
  variants: Variant[]
}

/** Retourne le prix unitaire actif selon la quantité */
function getPrixEffectif(tiers: PrixTier[], quantite: number, prixBase: number): number {
  if (!tiers.length) return prixBase
  const sorted = [...tiers].sort((a, b) => b.minQte - a.minQte)
  for (const t of sorted) {
    if (quantite >= t.minQte) return t.prix
  }
  return prixBase
}

export default function ProduitDetailClient({ produit }: { produit: Produit }) {
  const { data: session } = useSession()
  const router = useRouter()

  const tiers: PrixTier[] = useMemo(
    () => (produit.prixVariables ?? []).sort((a, b) => a.minQte - b.minQte),
    [produit.prixVariables]
  )
  const hasTiers     = tiers.length > 0
  const hasVariants  = produit.variants.length > 0

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    hasVariants ? produit.variants[0].id : null
  )
  const [imageIdx,  setImageIdx]  = useState(0)
  const [quantite,  setQuantite]  = useState(1)
  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)

  const selectedVariant = useMemo(
    () => produit.variants.find(v => v.id === selectedVariantId) ?? null,
    [selectedVariantId, produit.variants]
  )

  // Images : variante en priorité si elle en a
  const images = useMemo(
    () => selectedVariant?.images.length ? selectedVariant.images : produit.images,
    [selectedVariant, produit.images]
  )

  const handleSelectVariant = (id: string) => {
    setSelectedVariantId(id)
    setImageIdx(0)
  }

  const stock = hasVariants ? (selectedVariant?.stock ?? 0) : produit.stock

  // ─── Prix ─────────────────────────────────────────────
  const prixUnitaire  = getPrixEffectif(tiers, quantite, produit.prix)
  const prixBase      = produit.prix
  const prixReduit    = hasTiers && prixUnitaire < prixBase   // true = on affiche le barré
  const prixTotal     = prixUnitaire * quantite

  const handleAddToCart = async () => {
    if (!session) { router.push('/connexion'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/panier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produitId: produit.id,
          quantite,
          variantId: selectedVariantId || undefined,
        }),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2500)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* ══════════════ GALERIE ══════════════ */}
      <div>
        {/* Image principale */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl aspect-square max-h-[420px] flex items-center justify-center overflow-hidden relative">
          {images[imageIdx] ? (
            <img
              key={images[imageIdx]}
              src={images[imageIdx]}
              alt={produit.nom}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            <span className="text-8xl"><Package className="w-5 h-5" /></span>
          )}
          {/* Badge variante */}
          {selectedVariant && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {selectedVariant.couleur && (
                <span
                  className="w-3 h-3 rounded-full inline-block border border-white/40"
                  style={{ backgroundColor: selectedVariant.couleur }}
                />
              )}
              {selectedVariant.nom}
            </div>
          )}
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImageIdx(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                  imageIdx === i
                    ? 'border-blue-500 dark:border-blue-400 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════ INFOS + ACTIONS ══════════════ */}
      <div className="flex flex-col gap-5">

        {/* ── Bloc Prix ── */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-3 flex-wrap">
            {/* Prix actif (peut être réduit) */}
            <span className={`text-3xl font-bold ${prixReduit ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {prixUnitaire.toFixed(2)} DA
            </span>

            {/* Prix de base barré — affiché seulement si un palier réduit le prix */}
            {prixReduit && (
              <span className="text-xl text-gray-400 dark:text-gray-500 line-through font-medium">
                {prixBase.toFixed(2)} DA
              </span>
            )}

            {/* Badge économie */}
            {prixReduit && (
              <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-semibold px-2 py-0.5 rounded-full">
                −{Math.round((1 - prixUnitaire / prixBase) * 100)}%
              </span>
            )}
          </div>

          {/* Sous-total si qty > 1 */}
          {quantite > 1 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Sous-total :{' '}
              <strong className="text-gray-800 dark:text-gray-200 font-semibold">
                {prixTotal.toFixed(2)} DA
              </strong>
              {prixReduit && (
                <span className="ml-2 text-gray-400 line-through text-xs">
                  {(prixBase * quantite).toFixed(2)} DA
                </span>
              )}
            </p>
          )}
        </div>

        {/* ── Tableau des paliers ── */}
        {hasTiers && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-widest flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              Prix dégressifs
            </p>
            <div className="space-y-1.5">
              {/* Ligne prix de base */}
              {(() => {
                const firstTier = tiers[0]
                if (firstTier && firstTier.minQte > 1) {
                  const isBase = quantite < firstTier.minQte
                  return (
                    <div className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg transition ${
                      isBase
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold ring-1 ring-blue-300 dark:ring-blue-700'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      <span>1 – {firstTier.minQte - 1} unité{firstTier.minQte > 2 ? 's' : ''}</span>
                      <span className="font-bold">{prixBase.toFixed(2)} DA/u</span>
                      {isBase && <span className="text-xs text-blue-500 dark:text-blue-300 font-medium">← vous êtes ici</span>}
                    </div>
                  )
                }
                return null
              })()}

              {tiers.map((tier, i) => {
                const isActive = quantite >= tier.minQte && (tier.maxQte === null || quantite <= tier.maxQte)
                return (
                  <div
                    key={i}
                    className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg transition ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold ring-1 ring-blue-300 dark:ring-blue-700'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950'
                    }`}
                  >
                    <span>
                      {tier.maxQte
                        ? `${tier.minQte} – ${tier.maxQte} unités`
                        : `${tier.minQte}+ unités`}
                    </span>
                    <span className="font-bold">
                      {tier.prix.toFixed(2)} DA/u
                      {tier.prix < prixBase && (
                        <span className="ml-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
                          −{Math.round((1 - tier.prix / prixBase) * 100)}%
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <span className="text-xs text-blue-500 dark:text-blue-300 font-medium shrink-0">← vous êtes ici</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Variantes ── */}
        {hasVariants && (
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {produit.variants.some(v => v.couleur) ? <><Palette className="w-5 h-5" />{' '}Couleur</> : <><Flower2 className="w-5 h-5" />{' '}Parfum / Variante</>}
              {selectedVariant && (
                <span className="ml-2 text-gray-400 font-normal">— {selectedVariant.nom}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {produit.variants.map((variant) => {
                const isSelected   = variant.id === selectedVariantId
                const outOfStock   = variant.stock === 0
                return (
                  <button
                    key={variant.id}
                    onClick={() => !outOfStock && handleSelectVariant(variant.id)}
                    disabled={outOfStock}
                    title={outOfStock ? `${variant.nom} — rupture de stock` : `${variant.nom} — ${variant.stock} en stock`}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/60 shadow-sm'
                        : outOfStock
                          ? 'border-gray-200 dark:border-gray-700 opacity-35 cursor-not-allowed'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                    }`}
                  >
                    {variant.couleur && (
                      <span
                        className={`w-5 h-5 rounded-full border shrink-0 inline-block ${isSelected ? 'border-blue-400' : 'border-gray-300 dark:border-gray-600'}`}
                        style={{ backgroundColor: variant.couleur }}
                      />
                    )}
                    <span className="text-gray-800 dark:text-gray-200">{variant.nom}</span>
                    {outOfStock && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">×</span>
                    )}
                    {isSelected && !outOfStock && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Stock ── */}
        <div className={`flex items-center gap-2 text-sm font-medium ${stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          <span>{stock > 0 ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}</span>
          <span>{stock > 0 ? `En stock (${stock} disponibles)` : 'Rupture de stock'}</span>
        </div>

        {/* ── Quantité ── */}
        {stock > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Quantité</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantite(q => Math.max(1, q - 1))}
                disabled={quantite <= 1}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-200 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition active:scale-95"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-gray-800 dark:text-gray-100 text-xl tabular-nums">
                {quantite}
              </span>
              <button
                onClick={() => setQuantite(q => Math.min(stock, q + 1))}
                disabled={quantite >= stock}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-200 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition active:scale-95"
              >
                +
              </button>
              {hasTiers && (
                <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">
                  {prixReduit ? `💰 Prix réduit actif !` : '↑ Augmentez pour un meilleur prix'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Bouton panier ── */}
        <button
          onClick={handleAddToCart}
          disabled={loading || stock === 0}
          className={`w-full font-semibold py-4 rounded-xl transition-all text-base active:scale-[0.98] disabled:cursor-not-allowed ${
            stock === 0
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              : success
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 disabled:opacity-50'
          }`}
        >
          {stock === 0
            ? <><XCircle className="w-5 h-5" />{' '}Indisponible</>
            : loading
              ? 'Ajout en cours...'
              : success
                ? <><CheckCircle2 className="w-5 h-5" />{' '}Ajouté au panier !</>
                : quantite > 1
                  ? `🛒 Ajouter ×${quantite} — ${prixTotal.toFixed(2)} DA`
                  : <><ShoppingCart className="w-5 h-5" />{' '}Ajouter au panier</>}
        </button>

      </div>
    </div>
  )
}
