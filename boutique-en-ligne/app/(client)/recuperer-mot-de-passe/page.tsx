'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Etape = 'demande' | 'verification' | 'nouveau'

export default function RecupererMotDePassePage() {
  const router = useRouter()
  const [etape, setEtape] = useState<Etape>('demande')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [identifiant, setIdentifiant] = useState('')
  const [code, setCode] = useState('')
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('')
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('')

  // Étape 1 — Demande du code
  const handleDemande = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password/demande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }

      setSuccess('Code envoyé ! Vérifiez votre email ou téléphone.')
      setEtape('verification')
    } catch {
      setError('Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  // Étape 2 — Vérification du code
  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password/verifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant, code }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }

      setSuccess('')
      setEtape('nouveau')
    } catch {
      setError('Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  // Étape 3 — Nouveau mot de passe
  const handleNouveau = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (nouveauMotDePasse !== confirmerMotDePasse) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password/nouveau', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant, code, nouveauMotDePasse }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }

      router.push('/connexion?reset=success')
    } catch {
      setError('Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Indicateur d'étapes */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {['demande', 'verification', 'nouveau'].map((e, i) => (
            <div key={e} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                etape === e
                  ? 'bg-blue-600 text-white'
                  : ['demande', 'verification', 'nouveau'].indexOf(etape) > i
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </div>
              {i < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {etape === 'demande' && 'Mot de passe oublié'}
          {etape === 'verification' && 'Vérification'}
          {etape === 'nouveau' && 'Nouveau mot de passe'}
        </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          {etape === 'demande' && 'Entrez votre email ou téléphone'}
          {etape === 'verification' && 'Entrez le code reçu'}
          {etape === 'nouveau' && 'Choisissez un nouveau mot de passe'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Étape 1 */}
        {etape === 'demande' && (
          <form onSubmit={handleDemande} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email ou téléphone
              </label>
              <input
                type="text"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre@email.com ou +213 XX XX XX XX"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le code'}
            </button>
          </form>
        )}

        {/* Étape 2 */}
        {etape === 'verification' && (
          <form onSubmit={handleVerification} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code de vérification
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="000000"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Vérification...' : 'Vérifier le code'}
            </button>
            <button
              type="button"
              onClick={() => setEtape('demande')}
              className="w-full text-sm text-gray-500 hover:text-blue-600"
            >
              ← Retour
            </button>
          </form>
        )}

        {/* Étape 3 */}
        {etape === 'nouveau' && (
          <form onSubmit={handleNouveau} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 6 caractères"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirmerMotDePasse}
                onChange={(e) => setConfirmerMotDePasse(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Répétez le mot de passe"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/connexion" className="text-blue-600 hover:underline font-medium">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  )
}