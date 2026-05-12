'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, CheckCircle2, ClipboardList, CreditCard, MapPin, Package, ShoppingBag, ShoppingCart, Smartphone, Truck } from 'lucide-react'

type CartItem = {
  id: string
  quantite: number
  product: { id: string; nom: string; prix: number; images: string[] }
}

type Cart = { id: string; items: CartItem[] }

const MODES_PAIEMENT = [
  'Paiement à la livraison',
  'CCP',
  'Dahabia',
  'Virement bancaire',
  'BaridiMob',
]

const METHODES_EXPEDITION = [
  { label: 'Livraison standard',    frais: 700  },
  { label: 'Livraison express',     frais: 1200 },
  { label: 'Retrait en point relais', frais: 400 },
]

export default function NouvelleCommandePage() {
  const router = useRouter()
  const [panier,    setPanier]    = useState<Cart | null>(null)
  const [loading,   setLoading]   = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error,     setError]     = useState('')
  const [showModal, setShowModal] = useState(false)

  const [adresse,            setAdresse]            = useState('')
  const [modePaiement,       setModePaiement]        = useState(MODES_PAIEMENT[0])
  const [methodeExpedition,  setMethodeExpedition]   = useState(METHODES_EXPEDITION[0].label)

  // Téléphone
  const [telephone,    setTelephone]    = useState('')
  const [hasTelephone, setHasTelephone] = useState(true)
  const [savingTel,    setSavingTel]    = useState(false)
  const [telError,     setTelError]     = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/panier').then(r => r.json()),
      fetch('/api/profil').then(r => r.json()),
    ]).then(([panierData, profilData]) => {
      setPanier(panierData)
      setHasTelephone(!!profilData.telephone)
      setLoading(false)
    })
  }, [])

  const selectedExpedition = METHODES_EXPEDITION.find(m => m.label === methodeExpedition) ?? METHODES_EXPEDITION[0]
  const sousTotal      = panier?.items.reduce((acc, i) => acc + i.product.prix * i.quantite, 0) ?? 0
  const fraisLivraison = selectedExpedition.frais
  const total          = sousTotal + fraisLivraison

  const handleSaveTelephone = async () => {
    setTelError('')
    const telRegex = /^(05|06|07)[0-9]{8}$/
    if (!telRegex.test(telephone.replace(/\s/g, ''))) {
      setTelError('Format invalide. Ex: 05XX XX XX XX')
      return
    }
    setSavingTel(true)
    try {
      const res  = await fetch('/api/profil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telephone: telephone.replace(/\s/g, '') }),
      })
      const data = await res.json()
      if (!res.ok) { setTelError(data.error); return }
      setHasTelephone(true)
    } catch { setTelError('Erreur serveur') } finally { setSavingTel(false) }
  }

  const handleConfirmer = async () => {
    setError(''); setSubmitting(true); setShowModal(false)
    try {
      const res = await fetch('/api/commandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adresse,
          modePaiement,
          methodeExpedition,
          fraisLivraison,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      router.push('/commandes?success=true')
    } catch { setError('Erreur serveur, veuillez réessayer') } finally { setSubmitting(false) }
  }

  const inputClass = 'w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500'
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-4 text-center text-gray-500 dark:text-gray-400">
      Chargement...
    </div>
  )

  if (!panier || panier.items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-4 text-center">
      <p className="text-6xl mb-4"><ShoppingCart className="w-5 h-5" /></p>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Votre panier est vide</h1>
      <Link href="/produits" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition">
        Voir les produits
      </Link>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Passer la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="space-y-4">

          {/* Téléphone manquant */}
          {!hasTelephone && (
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl"><Smartphone className="w-8 h-8" /></span>
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">Numéro de téléphone requis</h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                    Nous avons besoin de votre numéro pour le suivi de la livraison.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-amber-800 dark:text-amber-300 mb-1">Numéro de téléphone *</label>
                  <input
                    type="tel" value={telephone}
                    onChange={e => { setTelephone(e.target.value); setTelError('') }}
                    placeholder="05XX XX XX XX"
                    className="w-full border border-amber-300 dark:border-amber-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  {telError && <p className="text-xs text-red-500 mt-1">{telError}</p>}
                  <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">Format : 05XX, 06XX ou 07XX XX XX XX</p>
                </div>
                <button
                  onClick={handleSaveTelephone} disabled={savingTel || !telephone}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
                >
                  {savingTel ? 'Enregistrement...' : <><Check className="w-4 h-4" />{' '}Enregistrer le numéro</>}
                </button>
              </div>
            </div>
          )}

          {/* Formulaire */}
          <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 ${!hasTelephone ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6"><ClipboardList className="w-4 h-4 inline mr-1" />{' '}Détails de la commande</h2>

            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={e => { e.preventDefault(); setShowModal(true) }} className="space-y-5">

              {/* Adresse */}
              <div>
                <label className={labelClass}><MapPin className="w-4 h-4 inline mr-1" />{' '}Adresse de livraison *</label>
                <textarea
                  value={adresse} onChange={e => setAdresse(e.target.value)}
                  required rows={3}
                  className={inputClass}
                  placeholder="Numéro, rue, cité, commune, wilaya..."
                />
              </div>

              {/* Mode de paiement */}
              <div>
                <label className={labelClass}><CreditCard className="w-4 h-4 inline mr-1" />{' '}Mode de paiement *</label>
                <select value={modePaiement} onChange={e => setModePaiement(e.target.value)} className={inputClass}>
                  {MODES_PAIEMENT.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Méthode d'expédition */}
              <div>
                <label className={labelClass}><Truck className="w-4 h-4 inline mr-1" />{' '}Méthode d&apos;expédition *</label>
                <div className="space-y-2">
                  {METHODES_EXPEDITION.map(opt => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setMethodeExpedition(opt.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition ${
                        methodeExpedition === opt.label
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <span className={`font-medium ${methodeExpedition === opt.label ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {opt.label}
                      </span>
                      <span className={`font-semibold ${methodeExpedition === opt.label ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {opt.frais} DA
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit" disabled={submitting || !hasTelephone}
                className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                {submitting ? 'Traitement...' : `Confirmer — ${total.toFixed(2)} DA`}
              </button>

              <Link href="/panier" className="block text-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition">
                ← Retour au panier
              </Link>
            </form>
          </div>
        </div>

        {/* Résumé panier */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Résumé ({panier.items.length} article{panier.items.length > 1 ? 's' : ''})
          </h2>
          <div className="space-y-3 mb-4">
            {panier.items.map(item => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                  {item.product.images[0]
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5" /></div>
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-1">{item.product.nom}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">x{item.quantite}</p>
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                  {(item.product.prix * item.quantite).toFixed(2)} DA
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Sous-total</span>
              <span>{sousTotal.toFixed(2)} DA</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Frais de livraison</span>
              <span>{fraisLivraison} DA</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100 dark:border-gray-800">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-blue-600 dark:text-blue-400">{total.toFixed(2)} DA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-800">
            <div className="text-center mb-6">
              <ShoppingBag className="w-14 h-14" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Confirmer la commande ?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Vérifiez les détails avant de confirmer</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1"><MapPin className="w-4 h-4 inline mr-1" />{' '}Adresse</p>
                <p className="text-sm text-gray-800 dark:text-gray-200">{adresse}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1"><CreditCard className="w-4 h-4 inline mr-1" />{' '}Paiement</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{modePaiement}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1"><Truck className="w-4 h-4 inline mr-1" />{' '}Livraison</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{methodeExpedition}</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 max-h-36 overflow-y-auto">
                <p className="text-xs text-gray-400 mb-2"><Package className="w-4 h-4 inline mr-1" />{' '}Articles</p>
                {panier.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <span className="line-clamp-1 flex-1">{item.product.nom} x{item.quantite}</span>
                    <span className="ml-2 font-medium">{(item.product.prix * item.quantite).toFixed(2)} DA</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1 mb-5">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Sous-total</span><span>{sousTotal.toFixed(2)} DA</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Livraison</span><span>{fraisLivraison} DA</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-800 dark:text-gray-100">Total</span>
                <span className="text-blue-600 dark:text-blue-400">{total.toFixed(2)} DA</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Annuler
              </button>
              <button onClick={handleConfirmer} disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-2.5 rounded-xl transition disabled:opacity-50">
                {submitting ? 'En cours...' : <><span>Confirmer</span><CheckCircle2 className="w-5 h-5" /></>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
