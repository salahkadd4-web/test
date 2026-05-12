'use client'

// app/(client)/retour/page.tsx — CabaStore
// Formulaire de retour multi-étapes (4 steps) avec stepper visuel.
// URL : /retour  ou  /retour?orderId=xxx  (pré-sélectionne la commande)

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter }    from 'next/navigation'
import Link from 'next/link'
import { Banknote, Check, CheckCircle2, Loader2, Package, RefreshCw, Wrench, XCircle } from 'lucide-react'

type OrderItem = {
  id: string; quantite: number; prix: number
  product: { nom: string; images: string[] }
}
type Order = {
  id: string; statut: string; total: number
  createdAt: string; retourDemande: boolean; items: OrderItem[]
}

const REASONS = [
  'Produit défectueux',
  'Produit contrefait',
  'Produit endommagé livraison',
  "Changement d'avis",
  'Panne après utilisation',
  'Mauvaise taille',
  'Allergie/Réaction',
  'Ne correspond pas',
  'Erreur de commande vendeur',
  'Pièces manquantes',
]

const RESOLUTIONS = [
  { value: 'REFUND',   label: 'Remboursement', icon: Banknote, desc: 'Recevoir le remboursement du montant payé' },
  { value: 'EXCHANGE', label: 'Échange',        icon: RefreshCw, desc: 'Recevoir un produit de remplacement'      },
  { value: 'REPAIR',   label: 'Réparation',     icon: Wrench, desc: 'Faire réparer le produit défectueux'      },
]

const STEPS = ['Commande', 'Produit', 'Motif', 'Confirmation']

// ─────────────────────────────────────────────────────────────

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
              i < current  ? 'bg-indigo-600 border-indigo-600 text-white'
              : i === current ? 'bg-white dark:bg-gray-900 border-indigo-600 text-indigo-600'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400'
            }`}>
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1 whitespace-nowrap ${
              i === current ? 'text-indigo-600 font-semibold'
              : i < current ? 'text-indigo-400'
              : 'text-gray-400'
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${i < current ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────

function RetourContent() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const preOrderId   = searchParams.get('orderId') ?? ''

  const [step, setStep]                   = useState(0)
  const [commandes, setCommandes]         = useState<Order[]>([])
  const [loading, setLoading]             = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [reason, setReason]               = useState('')
  const [resolution, setResolution]       = useState<'REFUND'|'EXCHANGE'|'REPAIR'>('REFUND')
  const [description, setDescription]     = useState('')
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
        setSelectedOrder(pre)
        // Si la commande est déjà connue via l'URL, sauter directement à
        // l'étape 1 (sélection du produit) — ne pas pré-sélectionner de produit
        if (pre) {
          setStep(1)
          setSelectedProduct('')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [preOrderId])

  const next = () => setStep(s => Math.min(s + 1, 3))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const canNext = [
    !!selectedOrder,
    !!selectedProduct,
    !!reason,
  ][step] ?? true

  const handleSubmit = async () => {
    if (!selectedOrder || !selectedProduct || !reason) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/retours/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          productName: selectedProduct,
          reason,
          desiredResolution: resolution,
          description,
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

  // ── Succès ───────────────────────────────────────────────────
  if (result?.success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 dark:bg-green-950 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <CheckCircle2 className="w-14 h-14" />
          <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
            Demande enregistrée
          </h2>
          <p className="text-sm text-green-700 dark:text-green-400 mb-4">{result.message}</p>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-3 mb-4 border border-green-100 dark:border-green-900">
            <p className="text-xs text-gray-500 mb-1">Statut</p>
            <p className="font-bold text-amber-600 dark:text-amber-400 text-lg">
              En attente de traitement
            </p>
          </div>
          {result.processingDays && (
            <p className="text-xs text-gray-400 mb-2">
              Délai estimé : {result.processingDays} jours ouvrés
            </p>
          )}
          {result.claimId && (
            <p className="text-xs font-mono text-gray-400 mb-6">Réf. {result.claimId}</p>
          )}
          <Link href="/commandes"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition">
            ← Mes commandes
          </Link>
        </div>
      </div>
    )
  }

  if (result?.error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 dark:bg-red-950 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <XCircle className="w-14 h-14" />
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
  }

  if (loading) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center text-gray-500">Chargement...</div>
  )

  if (!loading && commandes.length === 0) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <Package className="w-14 h-14" />
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Aucune commande livrée</h2>
      <p className="text-sm text-gray-500 mb-6">Les retours ne sont disponibles que pour les commandes livrées.</p>
      <Link href="/commandes" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">← Mes commandes</Link>
    </div>
  )

  // ── Layout formulaire ────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/commandes" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 mb-4">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Demande de retour</h1>
      </div>

      <Stepper current={step} />

      {/* ── Étape 0 : Choisir la commande ── */}
      {step === 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Quelle commande souhaitez-vous retourner ?
          </p>
          <div className="space-y-2">
            {commandes.map(c => (
              <label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                selectedOrder?.id === c.id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                  : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
              }`}>
                <input type="radio" name="order" checked={selectedOrder?.id === c.id}
                  onChange={() => {
                    setSelectedOrder(c)
                    setSelectedProduct(c.items[0]?.product.nom ?? '')
                    setReason(''); setResolution('REFUND')
                  }}
                  className="accent-indigo-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    #{c.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {' — '}{c.total.toFixed(2)} DA
                  </p>
                </div>
                <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium shrink-0">
                  Livrée
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── Étape 1 : Choisir le produit ── */}
      {step === 1 && selectedOrder && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Quel produit souhaitez-vous retourner ?
          </p>
          <div className="space-y-2">
            {selectedOrder.items.map(item => (
              <label key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                selectedProduct === item.product.nom
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                  : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
              }`}>
                <input type="radio" name="product" checked={selectedProduct === item.product.nom}
                  onChange={() => setSelectedProduct(item.product.nom)}
                  className="accent-indigo-600" />
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                  {item.product.images[0]
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-xl"><Package className="w-8 h-8" /></div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{item.product.nom}</p>
                  <p className="text-xs text-gray-500 mt-0.5">x{item.quantite} — {item.prix.toFixed(2)} DA/u</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── Étape 2 : Motif + résolution ── */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Motif du retour</p>
            <div className="grid grid-cols-2 gap-2">
              {REASONS.map(r => (
                <label key={r} className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-sm transition ${
                  reason === r
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-200 dark:hover:border-gray-700'
                }`}>
                  <input type="radio" name="reason" checked={reason === r}
                    onChange={() => setReason(r)} className="accent-indigo-600 shrink-0" />
                  <span className="leading-tight">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Résolution souhaitée</p>
            <div className="grid grid-cols-3 gap-3">
              {RESOLUTIONS.map(res => (
                <label key={res.value} className={`flex flex-col items-center text-center p-3 rounded-xl border cursor-pointer transition ${
                  resolution === res.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                }`}>
                  <input type="radio" name="resolution" checked={resolution === res.value}
                    onChange={() => setResolution(res.value as typeof resolution)}
                    className="sr-only" />
                  {(() => { const Icon = res.icon; return <Icon className="w-6 h-6 mb-1" /> })()}
                  <span className={`text-xs font-semibold ${resolution === res.value ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-200'}`}>
                    {res.label}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5 leading-tight">{res.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Détails <span className="font-normal text-gray-400">(optionnel)</span>
            </p>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              maxLength={1000} rows={3} placeholder="Décrivez le problème..."
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
          </div>
        </div>
      )}

      {/* ── Étape 3 : Récapitulatif avant envoi ── */}
      {step === 3 && selectedOrder && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Récapitulatif</p>
          {[
            ['Commande',    `#${selectedOrder.id.slice(-8).toUpperCase()}`],
            ['Produit',     selectedProduct],
            ['Motif',       reason],
            ['Résolution',  RESOLUTIONS.find(r => r.value === resolution)?.label ?? resolution],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-start gap-4 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <span className="text-xs text-gray-400 shrink-0">{k}</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-right">{v}</span>
            </div>
          ))}
          {description && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Détails</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
            </div>
          )}
          <p className="text-xs text-gray-400 text-center pt-1">
            Vous recevrez une notification dès qu'une décision est rendue.
          </p>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button onClick={prev}
            className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            ← Précédent
          </button>
        )}
        {step < 3 && (
          <button onClick={next} disabled={!canNext}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition">
            Suivant →
          </button>
        )}
        {step === 3 && (
          <button onClick={handleSubmit} disabled={submitting}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold py-3 rounded-xl transition">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />{' '}Envoi...</> : '↩ Confirmer le retour'}
          </button>
        )}
      </div>
    </div>
  )
}

export default function RetourPage() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto px-4 py-20 text-center text-gray-500">Chargement...</div>}>
      <RetourContent />
    </Suspense>
  )
}