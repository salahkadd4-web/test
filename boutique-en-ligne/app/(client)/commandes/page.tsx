'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type OrderItem = {
  id: string
  quantite: number
  prix: number
  product: { nom: string; images: string[] }
}

type Order = {
  id: string
  statut: string
  total: number
  adresse: string
  createdAt: string
  items: OrderItem[]
}

const statutConfig: Record<string, { label: string; color: string; emoji: string }> = {
  EN_ATTENTE:     { label: 'En attente',     color: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400', emoji: '⏳' },
  CONFIRMEE:      { label: 'Confirmée',      color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',         emoji: '✅' },
  EN_PREPARATION: { label: 'En préparation', color: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400', emoji: '🔧' },
  EXPEDIEE:       { label: 'Expédiée',       color: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400', emoji: '🚚' },
  LIVREE:         { label: 'Livrée',         color: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',     emoji: '📦' },
  ANNULEE:        { label: 'Annulée',        color: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400',             emoji: '❌' },
}

function CommandesContent() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const [commandes, setCommandes] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/commandes')
      .then((res) => res.json())
      .then((data) => { setCommandes(data); setLoading(false) })
  }, [])

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">Chargement des commandes...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {success && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold">Commande passée avec succès !</p>
            <p className="text-sm">Vous pouvez suivre votre commande ci-dessous.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Mes Commandes</h1>
        <Link href="/commandes/nouveau"
          className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black text-sm font-semibold px-4 py-2 rounded-lg transition">
          + Nouvelle commande
        </Link>
      </div>

      {commandes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📦</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Aucune commande</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Vous n'avez pas encore passé de commande.</p>
          <Link href="/produits"
            className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold px-8 py-3 rounded-xl transition">
            Voir les produits
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {commandes.map((commande) => {
            const statut = statutConfig[commande.statut] ?? statutConfig.EN_ATTENTE
            const isExpanded = expanded === commande.id
            return (
              <div key={commande.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  onClick={() => setExpanded(isExpanded ? null : commande.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">#{commande.id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(commande.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statut.color}`}>
                      {statut.emoji} {statut.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{commande.total.toFixed(2)} DA</p>
                    <span className="text-gray-400 dark:text-gray-500 text-sm">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4 space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">📍 Adresse de livraison</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{commande.adresse}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">🚀 Suivi de commande</p>
                      <div className="flex items-center gap-1">
                        {['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE'].map((s, i) => {
                          const statutList = ['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE']
                          const currentIndex = statutList.indexOf(commande.statut)
                          const isDone = i <= currentIndex
                          const config = statutConfig[s]
                          return (
                            <div key={s} className="flex items-center flex-1">
                              <div className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isDone ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                                  {config.emoji}
                                </div>
                                <p className={`text-xs mt-1 text-center hidden sm:block ${isDone ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>
                                  {config.label}
                                </p>
                              </div>
                              {i < 4 && <div className={`h-0.5 flex-1 ${i < currentIndex ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">📦 Articles commandés</p>
                      <div className="space-y-2">
                        {commande.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                              {item.product.images[0] ? (
                                <img src={item.product.images[0]} alt={item.product.nom} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg">📦</div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.product.nom}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">x{item.quantite} — {item.prix.toFixed(2)} DA/unité</p>
                            </div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                              {(item.prix * item.quantite).toFixed(2)} DA
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between font-bold text-lg">
                      <span className="text-gray-800 dark:text-gray-100">Total</span>
                      <span className="text-blue-600 dark:text-blue-400">{commande.total.toFixed(2)} DA</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function CommandesPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">Chargement...</div>}>
      <CommandesContent />
    </Suspense>
  )
}