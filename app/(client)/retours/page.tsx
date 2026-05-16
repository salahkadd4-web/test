'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Banknote, Check, CheckCircle2, Loader2, Package,
  RefreshCw, Wrench, XCircle, ChevronDown, ChevronUp,
  Minus, Plus, AlertCircle, RotateCcw, Info,
} from 'lucide-react'

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
type OrderItem = {
  id: string
  quantite: number
  prix: number
  variantNom: string | null
  variantOptionValeur: string | null
  product: {
    id: string
    nom: string
    images: string[]
    category?: { nom: string }
  }
}

type Order = {
  id: string
  statut: string
  total: number
  createdAt: string
  retourDemande: boolean
  items: OrderItem[]
}

/* Sélection de retour : itemId → quantité choisie */
type RetourSelection = Record<string, number>

/* ══════════════════════════════════════════
   CONSTANTES
══════════════════════════════════════════ */
const REASONS = [
  { label: 'Produit défectueux',          icon: '⚠️' },
  { label: 'Produit contrefait',           icon: '🚫' },
  { label: 'Produit endommagé livraison',  icon: '📦' },
  { label: "Changement d'avis",           icon: '🔄' },
  { label: 'Panne après utilisation',     icon: '🔧' },
  { label: 'Mauvaise taille',             icon: '📏' },
  { label: 'Allergie/Réaction',           icon: '🩺' },
  { label: 'Ne correspond pas',           icon: '❌' },
  { label: 'Erreur de commande vendeur',  icon: '🏷️' },
  { label: 'Pièces manquantes',           icon: '🔩' },
]

const RESOLUTIONS = [
  { value: 'REFUND',   label: 'Remboursement', icon: Banknote,  desc: 'Recevoir le montant payé'          },
  { value: 'EXCHANGE', label: 'Échange',        icon: RefreshCw, desc: 'Recevoir un produit de remplacement' },
  { value: 'REPAIR',   label: 'Réparation',     icon: Wrench,    desc: 'Faire réparer le produit'           },
]

const STEPS = ['Commande', 'Articles', 'Motif', 'Confirmation']

/* ══════════════════════════════════════════
   COMPOSANTS UTILITAIRES
══════════════════════════════════════════ */

/* Stepper */
function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center shrink-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
              i < current  ? 'bg-indigo-600 border-indigo-600 text-white'
              : i === current ? 'bg-white dark:bg-gray-900 border-indigo-600 text-indigo-600 shadow-md shadow-indigo-100 dark:shadow-indigo-900'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400'
            }`}>
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1.5 whitespace-nowrap font-medium ${
              i === current ? 'text-indigo-600 dark:text-indigo-400'
              : i < current ? 'text-indigo-400 dark:text-indigo-500'
              : 'text-gray-400'
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500 ${
              i < current ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

/* QteInput saisie libre + stepper */
function QteInput({ value, max, onChange }: { value: number; max: number; onChange: (v: number) => void }) {
  const [raw, setRaw] = useState(String(value))
  const ref           = useRef<HTMLInputElement>(null)
  const focused       = () => document.activeElement === ref.current
  const prev          = useRef(value)
  if (prev.current !== value && !focused()) { prev.current = value; setRaw(String(value)) }

  const commit = (s: string) => {
    const n = parseInt(s, 10)
    const c = isNaN(n) || n < 0 ? 0 : Math.min(n, max)
    setRaw(String(c)); onChange(c)
  }

  return (
    <div className="flex items-center gap-1">
      <button type="button" tabIndex={-1}
        onClick={() => { const n = Math.max(0, value - 1); setRaw(String(n)); onChange(n) }}
        disabled={value <= 0}
        className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">
        <Minus className="w-3 h-3" />
      </button>
      <input ref={ref} type="number" min={0} max={max} value={raw}
        onChange={e => setRaw(e.target.value)}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { commit(raw); ref.current?.blur() } }}
        onFocus={e => e.target.select()}
        className="w-12 text-center font-bold text-sm tabular-nums bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none transition"
      />
      <button type="button" tabIndex={-1}
        onClick={() => { const n = Math.min(max, value + 1); setRaw(String(n)); onChange(n) }}
        disabled={value >= max}
        className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">
        <Plus className="w-3 h-3" />
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════
   ÉTAPE 1 — Sélection des articles à retourner
   (groupés par produit, chips couleur/taille, QteInput)
══════════════════════════════════════════ */
function ProductGroup({
  productId,
  productNom,
  productImage,
  items,
  selection,
  onSelect,
}: {
  productId:    string
  productNom:   string
  productImage: string | null
  items:        OrderItem[]
  selection:    RetourSelection
  onSelect:     (itemId: string, qte: number) => void
}) {
  const [open, setOpen] = useState(true)

  /* Qté totale sélectionnée pour ce produit */
  const qteChoisie  = items.reduce((s, i) => s + (selection[i.id] ?? 0), 0)
  const qteTotal    = items.reduce((s, i) => s + i.quantite, 0)
  const allSelected = items.every(i => (selection[i.id] ?? 0) === i.quantite)

  const toggleAll = () => {
    if (allSelected) items.forEach(i => onSelect(i.id, 0))
    else items.forEach(i => onSelect(i.id, i.quantite))
  }

  /* Libellé chip pour un item */
  const chipLabel = (item: OrderItem) => {
    const parts = []
    if (item.variantNom)         parts.push(item.variantNom)
    if (item.variantOptionValeur) parts.push(item.variantOptionValeur)
    return parts.join(' / ') || 'Sans variante'
  }

  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
      qteChoisie > 0
        ? 'border-indigo-400 dark:border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-indigo-900/20'
        : 'border-gray-100 dark:border-gray-800'
    } bg-white dark:bg-gray-900`}>

      {/* En-tête produit */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
          {productImage
            ? <img src={productImage} alt={productNom} className="w-full h-full object-cover" />
            : <Package className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          }
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm line-clamp-2 leading-snug">
            {productNom}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-400">{items.length} ligne{items.length > 1 ? 's' : ''} · {qteTotal} article{qteTotal > 1 ? 's' : ''}</span>
            {qteChoisie > 0 && (
              <span className="text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold px-2 py-0.5 rounded-full">
                {qteChoisie} sél.
              </span>
            )}
          </div>
        </div>

        {/* Bouton tout sélectionner / désélectionner */}
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={toggleAll}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
              allSelected
                ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}>
            {allSelected ? <><Check className="w-3 h-3 inline mr-1" />Tout</>
                         : <><RotateCcw className="w-3 h-3 inline mr-1" />Tout</>}
          </button>
          <button type="button" onClick={() => setOpen(o => !o)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Lignes articles — expansibles */}
      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800">
          {items.map((item, idx) => {
            const qte   = selection[item.id] ?? 0
            const isOn  = qte > 0
            const label = chipLabel(item)

            return (
              <div key={item.id}
                className={`flex items-center gap-3 px-4 py-3 transition ${
                  idx < items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''
                } ${isOn ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''}`}>

                {/* Toggle clic pour activer/désactiver la ligne */}
                <button type="button"
                  onClick={() => onSelect(item.id, isOn ? 0 : item.quantite)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                    isOn
                      ? 'border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-600'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                  }`}>
                  {isOn && <Check className="w-3.5 h-3.5 text-white" />}
                </button>

                {/* Infos variante */}
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-semibold ${isOn ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {label}
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.prix.toFixed(2)} DA/u · commandé ×{item.quantite}
                  </p>
                </div>

                {/* Quantité à retourner */}
                <div className="shrink-0 flex flex-col items-end gap-0.5">
                  {isOn ? (
                    <>
                      <QteInput
                        value={qte}
                        max={item.quantite}
                        onChange={v => onSelect(item.id, v)}
                      />
                      <p className="text-[10px] text-gray-400">sur {item.quantite} commandé{item.quantite > 1 ? 's' : ''}</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Non sélectionné</p>
                  )}
                </div>
              </div>
            )
          })}

          {/* Sous-total retour produit */}
          {qteChoisie > 0 && (
            <div className="px-4 py-2 bg-indigo-50/60 dark:bg-indigo-950/30 flex items-center justify-between border-t border-indigo-100 dark:border-indigo-900">
              <span className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Info className="w-3 h-3" /> Montant potentiellement remboursé
              </span>
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                {items.reduce((s, i) => s + i.prix * (selection[i.id] ?? 0), 0).toFixed(2)} DA
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   CONTENU PRINCIPAL
══════════════════════════════════════════ */
function RetourContent() {
  const searchParams = useSearchParams()
  const preOrderId   = searchParams.get('orderId') ?? ''

  const [step, setStep]                   = useState(0)
  const [commandes, setCommandes]         = useState<Order[]>([])
  const [loading, setLoading]             = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  /* Étape 1 — sélection des articles */
  const [selection, setSelection]         = useState<RetourSelection>({})

  /* Étape 2 */
  const [reason, setReason]               = useState('')
  const [resolution, setResolution]       = useState<'REFUND' | 'EXCHANGE' | 'REPAIR'>('REFUND')
  const [description, setDescription]     = useState('')

  /* Envoi */
  const [submitting, setSubmitting]       = useState(false)
  const [result, setResult]               = useState<{
    success?: boolean; message?: string; claimId?: string
    processingDays?: number; error?: string
  } | null>(null)

  useEffect(() => {
    fetch('/api/commandes')
      .then(r => r.json())
      .then((data: Order[]) => {
        const livrees = data.filter(c => c.statut === 'LIVREE' && !c.retourDemande)
        setCommandes(livrees)
        const pre = livrees.find(c => c.id === preOrderId) ?? null
        if (pre) { setSelectedOrder(pre); setStep(1) }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [preOrderId])

  /* Grouper les items d'une commande par produit */
  const productGroups = (order: Order) => {
    const map = new Map<string, OrderItem[]>()
    for (const item of order.items) {
      const pid = item.product.id
      if (!map.has(pid)) map.set(pid, [])
      map.get(pid)!.push(item)
    }
    return [...map.entries()].map(([pid, items]) => ({
      productId: pid,
      productNom: items[0].product.nom,
      productImage: items[0].product.images?.[0] ?? null,
      items,
    }))
  }

  /* Lignes avec qte > 0 */
  const lignesSelectionnees = selectedOrder
    ? selectedOrder.items.filter(i => (selection[i.id] ?? 0) > 0)
    : []

  const totalRetour = lignesSelectionnees.reduce((s, i) => s + i.prix * (selection[i.id] ?? 0), 0)

  /* Validation étape 1 : au moins un article sélectionné */
  const canNextStep1 = lignesSelectionnees.length > 0

  /* Compiler productName + description auto pour l'API */
  const buildApiPayload = () => {
    const lines = lignesSelectionnees.map(item => {
      const label = [item.variantNom, item.variantOptionValeur].filter(Boolean).join(' / ')
      const qte   = selection[item.id]
      return `${item.product.nom}${label ? ` (${label})` : ''} ×${qte}`
    })
    const productName   = [...new Set(lignesSelectionnees.map(i => i.product.nom))].join(', ')
    const autoDesc      = lines.join(' | ')
    const finalDesc     = description
      ? `${description}\n\nDétail articles : ${autoDesc}`
      : `Articles retournés : ${autoDesc}`
    return { productName, description: finalDesc }
  }

  const handleSubmit = async () => {
    if (!selectedOrder || lignesSelectionnees.length === 0 || !reason) return
    setSubmitting(true)
    const { productName, description: desc } = buildApiPayload()
    try {
      const res = await fetch('/api/retours/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          productName,
          reason,
          desiredResolution: resolution,
          description: desc,
        }),
      })
      const data = await res.json()
      setResult(res.ok ? { success: true, ...data } : { error: data.error })
    } catch {
      setResult({ error: 'Erreur réseau, réessayez.' })
    } finally {
      setSubmitting(false)
    }
  }

  /* Navigation */
  const canNext = [
    !!selectedOrder,
    canNextStep1,
    !!reason,
  ][step] ?? true

  const next = () => setStep(s => Math.min(s + 1, 3))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  /* ── États terminaux ── */
  if (result?.success) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-green-50 dark:bg-green-950 rounded-2xl p-8 border border-green-200 dark:border-green-800">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Demande enregistrée</h2>
        <p className="text-sm text-green-700 dark:text-green-400 mb-4">{result.message}</p>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 mb-4 border border-green-100 dark:border-green-900 space-y-1">
          <p className="text-xs text-gray-500">Statut</p>
          <p className="font-bold text-amber-600 dark:text-amber-400">En attente de traitement</p>
          {result.processingDays && <p className="text-xs text-gray-400">Délai estimé : {result.processingDays} jours ouvrés</p>}
          {result.claimId && <p className="text-xs font-mono text-gray-400">Réf. {result.claimId}</p>}
        </div>
        <Link href="/commandes"
          className="inline-block px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition">
          ← Mes commandes
        </Link>
      </div>
    </div>
  )

  if (result?.error) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-red-50 dark:bg-red-950 rounded-2xl p-8 border border-red-200 dark:border-red-800">
        <XCircle className="w-14 h-14 text-red-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">Erreur</h2>
        <p className="text-sm text-red-700 dark:text-red-400 mb-6">{result.error}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setResult(null)}
            className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-semibold hover:opacity-80 transition">
            Réessayer
          </button>
          <Link href="/commandes"
            className="px-5 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            Mes commandes
          </Link>
        </div>
      </div>
    </div>
  )

  if (loading) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center text-gray-400">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
      Chargement…
    </div>
  )

  if (commandes.length === 0) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <Package className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Aucune commande livrée</h2>
      <p className="text-sm text-gray-500 mb-6">Les retours sont disponibles uniquement pour les commandes livrées.</p>
      <Link href="/commandes" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">← Mes commandes</Link>
    </div>
  )

  /* ══════════════════════════════════════════
     RENDU FORMULAIRE
  ══════════════════════════════════════════ */
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/commandes" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 mb-4">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Demande de retour</h1>
      </div>

      <Stepper current={step} />

      {/* ══ ÉTAPE 0 — Choisir la commande ══ */}
      {step === 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Quelle commande souhaitez-vous retourner ?
          </p>
          <div className="space-y-2">
            {commandes.map(c => (
              <label key={c.id}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedOrder?.id === c.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60'
                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                }`}>
                <input type="radio" name="order" checked={selectedOrder?.id === c.id}
                  onChange={() => {
                    setSelectedOrder(c)
                    setSelection({})
                    setReason(''); setResolution('REFUND')
                  }}
                  className="accent-indigo-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                    #{c.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {' · '}{c.items.length} article{c.items.length > 1 ? 's' : ''}
                    {' · '}{c.total.toFixed(2)} DA
                  </p>
                </div>
                <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium shrink-0">Livrée</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ══ ÉTAPE 1 — Sélection des articles ══ */}
      {step === 1 && selectedOrder && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Quels articles retourner ?
            </p>
            {lignesSelectionnees.length > 0 && (
              <button type="button"
                onClick={() => setSelection({})}
                className="text-xs text-gray-400 hover:text-red-500 transition flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Réinitialiser
              </button>
            )}
          </div>

          {/* Hint IHM */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl px-4 py-2.5 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-700 dark:text-indigo-400 leading-relaxed">
              Cochez les articles à retourner, puis ajustez la quantité si nécessaire. Vous pouvez retourner plusieurs couleurs ou tailles en une seule demande.
            </p>
          </div>

          {/* Cartes produits */}
          {productGroups(selectedOrder).map(group => (
            <ProductGroup
              key={group.productId}
              {...group}
              selection={selection}
              onSelect={(id, qte) => setSelection(prev => ({ ...prev, [id]: qte }))}
            />
          ))}

          {/* Récap flottant si sélection active */}
          {lignesSelectionnees.length > 0 && (
            <div className="sticky bottom-4 bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800 rounded-2xl px-4 py-3 shadow-lg shadow-indigo-100/50 dark:shadow-indigo-900/30 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">
                  {lignesSelectionnees.reduce((s, i) => s + (selection[i.id] ?? 0), 0)} article{lignesSelectionnees.reduce((s, i) => s + (selection[i.id] ?? 0), 0) > 1 ? 's' : ''} sélectionné{lignesSelectionnees.reduce((s, i) => s + (selection[i.id] ?? 0), 0) > 1 ? 's' : ''}
                </p>
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{totalRetour.toFixed(2)} DA</p>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Prêt pour l&apos;étape suivante
              </span>
            </div>
          )}
        </div>
      )}

      {/* ══ ÉTAPE 2 — Motif + résolution ══ */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Motif */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Motif du retour</p>
            <div className="grid grid-cols-2 gap-2">
              {REASONS.map(r => (
                <label key={r.label}
                  className={`flex items-start gap-2 p-3 rounded-xl border-2 cursor-pointer text-sm transition-all ${
                    reason === r.label
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700'
                  }`}>
                  <input type="radio" name="reason" checked={reason === r.label}
                    onChange={() => setReason(r.label)} className="sr-only" />
                  <span className="text-base shrink-0 mt-0.5">{r.icon}</span>
                  <span className="leading-tight">{r.label}</span>
                  {reason === r.label && <Check className="w-3.5 h-3.5 ml-auto shrink-0 text-indigo-500 mt-0.5" />}
                </label>
              ))}
            </div>
            {!reason && (
              <p className="text-xs text-orange-500 dark:text-orange-400 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3.5 h-3.5" /> Sélectionnez un motif pour continuer
              </p>
            )}
          </div>

          {/* Résolution */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Résolution souhaitée</p>
            <div className="grid grid-cols-3 gap-3">
              {RESOLUTIONS.map(res => {
                const Icon = res.icon
                return (
                  <label key={res.value}
                    className={`flex flex-col items-center text-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      resolution === res.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 shadow-sm shadow-indigo-100 dark:shadow-indigo-900'
                        : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}>
                    <input type="radio" name="resolution" checked={resolution === res.value}
                      onChange={() => setResolution(res.value as typeof resolution)} className="sr-only" />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
                      resolution === res.value ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <Icon className={`w-5 h-5 ${resolution === res.value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`} />
                    </div>
                    <span className={`text-xs font-bold ${resolution === res.value ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-200'}`}>
                      {res.label}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">{res.desc}</span>
                    {resolution === res.value && <Check className="w-3.5 h-3.5 text-indigo-500 mt-1.5" />}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
              Détails <span className="font-normal text-gray-400">(optionnel)</span>
            </p>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              maxLength={1000} rows={3} placeholder="Décrivez le problème en détails…"
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
            <p className="text-[10px] text-gray-400 mt-1">{description.length}/1000</p>
          </div>
        </div>
      )}

      {/* ══ ÉTAPE 3 — Récapitulatif ══ */}
      {step === 3 && selectedOrder && (
        <div className="space-y-4">
          {/* Articles sélectionnés */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200">Articles à retourner</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {lignesSelectionnees.map(item => {
                const label = [item.variantNom, item.variantOptionValeur].filter(Boolean).join(' / ')
                const qte   = selection[item.id]
                return (
                  <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      {item.product.images?.[0]
                        ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        : <Package className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{item.product.nom}</p>
                      {label && <p className="text-xs text-gray-500">{label}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100">×{qte}</p>
                      <p className="text-xs text-gray-400">{(item.prix * qte).toFixed(2)} DA</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="px-5 py-3 bg-indigo-50 dark:bg-indigo-950/40 border-t border-indigo-100 dark:border-indigo-900 flex justify-between items-center">
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Total potentiel</span>
              <span className="text-base font-bold text-indigo-700 dark:text-indigo-300">{totalRetour.toFixed(2)} DA</span>
            </div>
          </div>

          {/* Infos récap */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            {[
              ['Commande',   `#${selectedOrder.id.slice(-8).toUpperCase()}`],
              ['Motif',      reason],
              ['Résolution', RESOLUTIONS.find(r => r.value === resolution)?.label ?? resolution],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <span className="text-xs text-gray-400 shrink-0">{k}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 text-right ml-4">{v}</span>
              </div>
            ))}
            {description && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mt-2">
                <p className="text-xs text-gray-400 mb-1">Détails</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center">
            Vous recevrez une notification dès qu&apos;une décision est rendue.
          </p>
        </div>
      )}

      {/* ══ NAVIGATION ══ */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button type="button" onClick={prev}
            className="flex-1 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            ← Précédent
          </button>
        )}
        {step < 3 && (
          <button type="button" onClick={next} disabled={!canNext}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
            Suivant →
            {step === 1 && lignesSelectionnees.length > 0 && (
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {lignesSelectionnees.reduce((s, i) => s + (selection[i.id] ?? 0), 0)} art.
              </span>
            )}
          </button>
        )}
        {step === 3 && (
          <button type="button" onClick={handleSubmit} disabled={submitting}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
            {submitting
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
              : '↩ Confirmer le retour'}
          </button>
        )}
      </div>
    </div>
  )
}

export default function RetourPage() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
        Chargement…
      </div>
    }>
      <RetourContent />
    </Suspense>
  )
}