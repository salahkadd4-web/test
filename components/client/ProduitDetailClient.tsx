'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart, Check, X, TrendingDown,
  Package, ChevronRight, Minus, Plus,
  Trash2, ShoppingBag, Loader2, Info,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   QteInput — input numérique avec +/−
   • Tape librement, valide au blur ou Entrée
   • Si vide/0 → onZero() (supprime la ligne)
   • Clampé entre 0 et stockMax
   • size="sm" pour les chips, "md" pour le récap
───────────────────────────────────────────── */
function QteInput({
  value, stockMax, onChange, onZero, size = 'md',
}: {
  value: number
  stockMax: number
  onChange: (v: number) => void
  onZero?: () => void
  size?: 'sm' | 'md'
}) {
  const [raw, setRaw] = useState(String(value))
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync si la valeur externe change (ex: +/- boutons)
  // On ne sync que si le champ n'est pas en cours d'édition
  const isFocused = () => document.activeElement === inputRef.current

  const commit = (str: string) => {
    const n = parseInt(str, 10)
    if (isNaN(n) || n <= 0) {
      if (onZero) { onZero(); return }
      setRaw('1'); onChange(1); return
    }
    const clamped = Math.min(n, stockMax)
    setRaw(String(clamped))
    onChange(clamped)
  }

  const btnMinus = () => {
    const next = value - 1
    if (next <= 0) { if (onZero) onZero(); else { setRaw('1'); onChange(1) }; return }
    setRaw(String(next)); onChange(next)
  }
  const btnPlus = () => {
    if (value >= stockMax) return
    const next = value + 1
    setRaw(String(next)); onChange(next)
  }

  // Sync raw quand valeur externe change et champ non focalisé
  const prevValue = useRef(value)
  if (prevValue.current !== value && !isFocused()) {
    prevValue.current = value
    setRaw(String(value))
  }

  const isSm = size === 'sm'
  const btnCls = isSm
    ? 'w-6 h-6 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition disabled:opacity-30 shrink-0'
    : 'w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-30 shrink-0'
  const inputCls = isSm
    ? 'w-9 text-center font-bold text-sm tabular-nums bg-transparent text-blue-700 dark:text-blue-300 outline-none border border-blue-300 dark:border-blue-600 rounded-md py-0.5 focus:ring-1 focus:ring-blue-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
    : 'w-12 text-center font-bold text-sm tabular-nums bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none border border-gray-200 dark:border-gray-700 rounded-lg py-1 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'

  return (
    <div className="flex items-center gap-1">
      <button onClick={btnMinus} disabled={value <= (onZero ? 1 : 1)} className={btnCls} tabIndex={-1}>
        <Minus className={isSm ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
      </button>
      <input
        ref={inputRef}
        type="number" min={1} max={stockMax}
        value={raw}
        onChange={e => setRaw(e.target.value)}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { commit(raw); inputRef.current?.blur() } }}
        onFocus={e => e.target.select()}
        className={inputCls}
      />
      <button onClick={btnPlus} disabled={value >= stockMax} className={btnCls} tabIndex={-1}>
        <Plus className={isSm ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════
   Types
═══════════════════════════════════════════ */
type PrixTier      = { minQte: number; maxQte: number | null; prix: number }
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

/* Ligne du récap local (avant envoi au panier) */
type LigneSelection = {
  key: string          // `${variantId}__${optionId}` ou `${variantId}`
  variantId: string
  optionId?: string
  variantNom: string
  couleur: string | null
  optionValeur?: string
  stockMax: number
  quantite: number
  image?: string
}

/* ═══════════════════════════════════════════
   Helpers
═══════════════════════════════════════════ */
function getPrixEffectif(tiers: PrixTier[], qte: number, prixBase: number): number {
  if (!tiers.length) return prixBase
  for (const t of [...tiers].sort((a, b) => b.minQte - a.minQte)) {
    if (qte >= t.minQte) return t.prix
  }
  return prixBase
}

/* ═══════════════════════════════════════════
   Composant principal
═══════════════════════════════════════════ */
export default function ProduitDetailClient({ produit }: { produit: Produit }) {
  const { data: session } = useSession()
  const router = useRouter()

  const tiers       = useMemo(() => (produit.prixVariables ?? []).sort((a, b) => a.minQte - b.minQte), [produit.prixVariables])
  const hasTiers    = tiers.length > 0
  const hasVariants = produit.variants.length > 0
  const typeOpt     = produit.typeOption || 'Taille'
  const hasOptions  = produit.variants.some(v => v.options.length > 0)

  // ── Galerie ──────────────────────────────
  const [imageIdx, setImageIdx] = useState(0)
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null)

  // Images affichées = celles de la variante survolée, sinon produit
  const previewVariant = useMemo(
    () => produit.variants.find(v => v.id === hoveredVariant) ?? null,
    [hoveredVariant, produit.variants]
  )
  const images = previewVariant?.images.length ? previewVariant.images : produit.images

  // ── Sélection couleur active (pour afficher ses tailles) ──
  const [activeVariantId, setActiveVariantId] = useState<string | null>(
    hasVariants ? produit.variants[0].id : null
  )
  const activeVariant = useMemo(
    () => produit.variants.find(v => v.id === activeVariantId) ?? null,
    [activeVariantId, produit.variants]
  )

  // ── Panier local (récap avant envoi) ──────
  const [lignes, setLignes] = useState<LigneSelection[]>([])
  const [sending,  setSending]  = useState(false)
  const [sent,     setSent]     = useState(false)
  const [errors,   setErrors]   = useState<string[]>([])

  // ── Stats totales ─────────────────────────
  const totalQte   = lignes.reduce((s, l) => s + l.quantite, 0)
  const prixUnit   = getPrixEffectif(tiers, totalQte, produit.prix)
  const prixReduit = hasTiers && prixUnit < produit.prix
  const totalPrix  = prixUnit * totalQte

  // Prochain palier (pour inciter à augmenter)
  const prochainPalier = useMemo(() => {
    if (!hasTiers) return null
    return tiers.find(t => t.minQte > totalQte) ?? null
  }, [tiers, totalQte, hasTiers])

  // ── Ajouter / modifier une ligne ──────────
  const upsertLigne = useCallback((
    variantId: string, variantNom: string, couleur: string | null,
    stockMax: number, delta: number,
    optionId?: string, optionValeur?: string, image?: string
  ) => {
    const key = optionId ? `${variantId}__${optionId}` : variantId
    setLignes(prev => {
      const existing = prev.find(l => l.key === key)
      const newQte   = Math.max(0, Math.min(stockMax, (existing?.quantite ?? 0) + delta))
      if (existing) {
        if (newQte === 0) return prev.filter(l => l.key !== key)
        return prev.map(l => l.key === key ? { ...l, quantite: newQte } : l)
      }
      if (newQte === 0) return prev
      return [...prev, { key, variantId, optionId, variantNom, couleur, optionValeur, stockMax, quantite: newQte, image }]
    })
  }, [])

  const setLigneQte = useCallback((key: string, qte: number) => {
    setLignes(prev => {
      const l = prev.find(l => l.key === key)
      if (!l) return prev
      const capped = Math.max(0, Math.min(l.stockMax, qte))
      if (capped === 0) return prev.filter(l => l.key !== key)
      return prev.map(l => l.key === key ? { ...l, quantite: capped } : l)
    })
  }, [])

  const removeLigne = useCallback((key: string) => {
    setLignes(prev => prev.filter(l => l.key !== key))
  }, [])

  // Quantité d'une ligne donnée
  const qteOf = (key: string) => lignes.find(l => l.key === key)?.quantite ?? 0

  // ── Envoi au panier ───────────────────────
  const handleAjouter = async () => {
    if (!session) { router.push('/connexion'); return }
    if (lignes.length === 0) return
    setSending(true); setErrors([])
    const errs: string[] = []
    for (const l of lignes) {
      try {
        const res = await fetch('/api/panier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            produitId: produit.id,
            quantite: l.quantite,
            variantId: l.variantId,
            variantOptionId: l.optionId,
          }),
        })
        if (!res.ok) {
          const d = await res.json()
          errs.push(`${l.variantNom}${l.optionValeur ? ` / ${l.optionValeur}` : ''} : ${d.error ?? 'Erreur'}`)
        }
      } catch { errs.push(`${l.variantNom} : erreur réseau`) }
    }
    setSending(false)
    if (errs.length) { setErrors(errs); return }
    setSent(true)
    setLignes([])
    setTimeout(() => setSent(false), 3000)
  }

  // Produit sans variantes : juste stepper simple
  const [qteSimple, setQteSimple] = useState(1)
  const [loadingSimple, setLoadingSimple] = useState(false)
  const [successSimple, setSuccessSimple] = useState(false)

  const handleAddSimple = async () => {
    if (!session) { router.push('/connexion'); return }
    setLoadingSimple(true)
    try {
      const res = await fetch('/api/panier', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produitId: produit.id, quantite: qteSimple }),
      })
      if (res.ok) { setSuccessSimple(true); setTimeout(() => setSuccessSimple(false), 2500) }
    } finally { setLoadingSimple(false) }
  }

  /* ══════════════════════════════════════════
     RENDU
  ══════════════════════════════════════════ */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* ────────── GALERIE ────────── */}
      <div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl aspect-square max-h-[440px] flex items-center justify-center overflow-hidden relative">
          {images[imageIdx]
            ? <img key={`${images[imageIdx]}-${imageIdx}`}
                src={images[imageIdx]} alt={produit.nom}
                className="w-full h-full object-cover transition-opacity duration-300" />
            : <Package className="w-24 h-24 text-gray-300 dark:text-gray-600" />
          }
          {/* Badge variante survolée */}
          {previewVariant && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/65 text-white text-xs px-2.5 py-1.5 rounded-full backdrop-blur-sm animate-fade-in">
              {previewVariant.couleur && (
                <span className="w-3 h-3 rounded-full border border-white/40 shrink-0" style={{ backgroundColor: previewVariant.couleur }} />
              )}
              <span>{previewVariant.nom}</span>
            </div>
          )}
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImageIdx(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                  i === imageIdx
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100'
                }`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ────────── SÉLECTION + RÉCAP ────────── */}
      <div className="flex flex-col gap-6">

        {/* PRIX + paliers */}
        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className={`text-3xl font-bold transition-colors duration-300 ${
              prixReduit && totalQte > 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              {prixUnit.toFixed(2)} DA
              {totalQte > 1 && <span className="text-base font-normal text-gray-400 ml-1">/u.</span>}
            </span>
            {prixReduit && totalQte > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through font-medium">{produit.prix.toFixed(2)} DA</span>
                <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-semibold px-2 py-0.5 rounded-full">
                  −{Math.round((1 - prixUnit / produit.prix) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Incitation palier suivant */}
          {prochainPalier && totalQte > 0 && (
            <p className="mt-1.5 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5 animate-pulse">
              <TrendingDown className="w-3.5 h-3.5 shrink-0" />
              Ajoutez <strong>{prochainPalier.minQte - totalQte}</strong> de plus → {prochainPalier.prix.toFixed(2)} DA/u.
            </p>
          )}
        </div>

        {/* Paliers dégressifs (compact) */}
        {hasTiers && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900 rounded-xl p-3">
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Prix dégressifs
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tiers.map((tier, i) => {
                const isActive = totalQte >= tier.minQte && (tier.maxQte === null || totalQte <= tier.maxQte)
                const isPast   = tier.maxQte !== null && totalQte > tier.maxQte
                return (
                  <div key={i} className={`flex flex-col items-center px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                      : isPast
                        ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 opacity-60'
                        : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                  }`}>
                    <span className="font-bold">{tier.prix.toFixed(2)} DA</span>
                    <span className="opacity-75">{tier.maxQte ? `${tier.minQte}–${tier.maxQte}u.` : `≥${tier.minQte}u.`}</span>
                    {isActive && <Check className="w-3 h-3 mt-0.5" />}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ══ CAS : produit sans variantes ══ */}
        {!hasVariants && (
          <div className="space-y-4">
            <div className={`flex items-center gap-2 text-sm font-medium ${produit.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
              {produit.stock > 0 ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {produit.stock > 0 ? `En stock (${produit.stock} disponibles)` : 'Rupture de stock'}
            </div>
            {produit.stock > 0 && (
              <div className="flex items-center gap-3">
                <QteInput
                  value={qteSimple}
                  stockMax={produit.stock}
                  onChange={setQteSimple}
                />
                <span className="text-xs text-gray-400">{produit.stock} dispo.</span>
              </div>
            )}
            <button onClick={handleAddSimple} disabled={loadingSimple || produit.stock === 0}
              className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-base ${
                successSimple ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
              }`}>
              {successSimple ? <><Check className="w-5 h-5" /> Ajouté !</> : loadingSimple ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5" /> Ajouter au panier</>}
            </button>
          </div>
        )}

        {/* ══ CAS : produit avec variantes ══ */}
        {hasVariants && (
          <>
            {/* ── Swatches couleur ── */}
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {produit.variants.some(v => v.couleur) ? 'Couleur' : 'Variante'}
                {activeVariant && (
                  <span className="ml-2 font-normal text-gray-400 text-xs">— {activeVariant.nom}</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {produit.variants.map(variant => {
                  const isActive = variant.id === activeVariantId
                  const qteLigne = hasOptions
                    ? variant.options.reduce((s, o) => s + qteOf(`${variant.id}__${o.id}`), 0)
                    : qteOf(variant.id)
                  const outOfStock = hasOptions
                    ? variant.options.every(o => o.stock === 0)
                    : variant.stock === 0

                  return (
                    <button key={variant.id}
                      onClick={() => { if (!outOfStock) { setActiveVariantId(variant.id); setImageIdx(0) } }}
                      onMouseEnter={() => setHoveredVariant(variant.id)}
                      onMouseLeave={() => setHoveredVariant(null)}
                      disabled={outOfStock}
                      title={outOfStock ? 'Rupture de stock' : variant.nom}
                      className={`relative flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        isActive
                          ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/60 shadow-sm'
                          : outOfStock
                            ? 'border-gray-200 dark:border-gray-700 opacity-30 cursor-not-allowed'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      {variant.couleur && (
                        <span className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-500 shrink-0 shadow-sm"
                          style={{ backgroundColor: variant.couleur }} />
                      )}
                      <span className="text-gray-800 dark:text-gray-200">{variant.nom}</span>

                      {/* Badge quantité sélectionnée */}
                      {qteLigne > 0 && (
                        <span className="ml-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow">
                          {qteLigne}
                        </span>
                      )}
                      {outOfStock && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center shadow">
                          <X className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Tailles de la variante active ── */}
            {activeVariant && (
              <div>
                {hasOptions ? (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {typeOpt}
                      <span className="ml-2 font-normal text-gray-400 text-xs">— cliquez pour ajouter</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeVariant.options.map(option => {
                        const key = `${activeVariant.id}__${option.id}`
                        const qt  = qteOf(key)
                        const outOfStock = option.stock === 0
                        const maxReached = qt >= option.stock

                        return (
                          <div key={option.id}
                            className={`relative flex items-center rounded-xl border-2 overflow-hidden text-sm transition-all ${
                              outOfStock
                                ? 'border-gray-200 dark:border-gray-700 opacity-30 cursor-not-allowed'
                                : qt > 0
                                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/50 shadow-sm'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                            }`}
                          >
                            {/* Label taille — clic = ajouter si pas encore sélectionné */}
                            <button
                              onClick={() => !outOfStock && qt === 0 && upsertLigne(activeVariant.id, activeVariant.nom, activeVariant.couleur, option.stock, 1, option.id, option.valeur, activeVariant.images[0] ?? produit.images[0])}
                              disabled={outOfStock}
                              title={outOfStock ? 'Rupture' : `${option.stock} disponibles`}
                              className={`min-w-[2.5rem] px-2 h-9 flex items-center justify-center font-semibold transition-all ${
                                outOfStock ? 'cursor-not-allowed line-through text-gray-400' : qt > 0 ? 'cursor-default' : 'cursor-pointer'
                              } ${qt > 0 ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}
                            >
                              {option.valeur}
                            </button>

                            {/* Input quantité (visible seulement si qt > 0) */}
                            {qt > 0 && (
                              <div className="pr-1.5">
                                <QteInput
                                  size="sm"
                                  value={qt}
                                  stockMax={option.stock}
                                  onChange={v => setLigneQte(key, v)}
                                  onZero={() => removeLigne(key)}
                                />
                              </div>
                            )}

                            {/* Badge max atteint */}
                            {maxReached && (
                              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-full shadow leading-none">
                                MAX
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {/* Stock info */}
                    <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                      <Info className="w-3 h-3 shrink-0" />
                      Cliquez sur une taille pour l&apos;ajouter — tapez ou utilisez +/− pour ajuster
                    </p>
                  </div>
                ) : (
                  /* Variante sans options : QteInput direct */
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quantité</p>
                    <QteInput
                      value={qteOf(activeVariant.id) || 0}
                      stockMax={activeVariant.stock}
                      onChange={v => {
                        const key = activeVariant.id
                        if (v === 0) { removeLigne(key); return }
                        const existing = lignes.find(l => l.key === key)
                        if (existing) { setLigneQte(key, v) }
                        else upsertLigne(activeVariant.id, activeVariant.nom, activeVariant.couleur, activeVariant.stock, v, undefined, undefined, activeVariant.images[0] ?? produit.images[0])
                      }}
                      onZero={() => removeLigne(activeVariant.id)}
                    />
                    <span className="text-xs text-gray-400">{activeVariant.stock} dispo.</span>
                  </div>
                )}
              </div>
            )}

            {/* ══ RÉCAP SÉLECTION ══ */}
            {lignes.length > 0 && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                {/* En-tête */}
                <div className="bg-gray-50 dark:bg-gray-800/60 px-4 py-2.5 flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                    Ma sélection
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {totalQte} article{totalQte > 1 ? 's' : ''}
                    </span>
                    {totalQte > 0 && (
                      <span className={`text-sm font-bold ${prixReduit ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        = {totalPrix.toFixed(2)} DA
                      </span>
                    )}
                  </div>
                </div>

                {/* Lignes */}
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {lignes.map(ligne => (
                    <div key={ligne.key} className="flex items-center gap-3 px-4 py-2.5 group">
                      {/* Image */}
                      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 flex items-center justify-center">
                        {ligne.image
                          ? <img src={ligne.image} alt="" className="w-full h-full object-cover" />
                          : <Package className="w-4 h-4 text-gray-400" />
                        }
                      </div>

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {ligne.couleur && (
                            <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 shrink-0" style={{ backgroundColor: ligne.couleur }} />
                          )}
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{ligne.variantNom}</span>
                          {ligne.optionValeur && (
                            <>
                              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                              <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{typeOpt} {ligne.optionValeur}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* QteInput inline dans le récap */}
                      <div className="shrink-0">
                        <QteInput
                          value={ligne.quantite}
                          stockMax={ligne.stockMax}
                          onChange={v => setLigneQte(ligne.key, v)}
                          onZero={() => removeLigne(ligne.key)}
                        />
                      </div>

                      {/* Prix ligne */}
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-20 text-right shrink-0">
                        {(prixUnit * ligne.quantite).toFixed(2)} DA
                      </span>

                      {/* Supprimer */}
                      <button onClick={() => removeLigne(ligne.key)}
                        className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-600 dark:hover:text-red-400 p-1 shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pied : prix total */}
                {hasTiers && prixReduit && (
                  <div className="bg-green-50 dark:bg-green-950/40 border-t border-green-100 dark:border-green-900 px-4 py-2 flex items-center justify-between">
                    <span className="text-xs text-green-700 dark:text-green-400 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Prix dégressif appliqué — {prixUnit.toFixed(2)} DA/u.
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                      Économie : {((produit.prix - prixUnit) * totalQte).toFixed(2)} DA
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ── Erreurs ── */}
            {errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 space-y-1">
                {errors.map((e, i) => (
                  <p key={i} className="text-sm text-red-600 dark:text-red-400">{e}</p>
                ))}
              </div>
            )}

            {/* ── Bouton principal ── */}
            <button
              onClick={handleAjouter}
              disabled={sending || lignes.length === 0}
              className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 text-base active:scale-[0.98] ${
                sent
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                  : lignes.length === 0
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default'
                    : sending
                      ? 'bg-blue-600 text-white opacity-70 cursor-wait'
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg shadow-blue-600/20'
              }`}
            >
              {sent ? (
                <><Check className="w-5 h-5" /> Ajouté au panier !</>
              ) : sending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Ajout en cours…</>
              ) : lignes.length === 0 ? (
                <><ShoppingBag className="w-5 h-5" /> Sélectionnez des articles</>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    Ajouter {totalQte} article{totalQte > 1 ? 's' : ''} au panier
                  </span>
                  <span className="ml-auto text-sm font-bold opacity-90">
                    {totalPrix.toFixed(2)} DA
                  </span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}