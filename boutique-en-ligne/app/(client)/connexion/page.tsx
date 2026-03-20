'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ConnexionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inscription = searchParams.get('inscription')
  const reset = searchParams.get('reset')

  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ identifiant: '', motDePasse: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        identifiant: form.identifiant,
        motDePasse: form.motDePasse,
        redirect: false,
      })
      if (result?.error) { setError('Identifiant ou mot de passe incorrect'); return }
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      router.push(session?.user?.role === 'ADMIN' ? '/admin' : '/')
      router.refresh()
    } catch { setError('Erreur serveur, veuillez réessayer') } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setLoadingGoogle(true)
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex transition-colors duration-300">

      <div className="hidden lg:flex w-1/2 bg-black dark:bg-gray-900 items-center justify-center p-12 border-r border-gray-800">
        <div className="text-center text-white">
          <h1 className="text-5xl font-extralight tracking-[0.3em] uppercase mb-4">Boutique</h1>
          <div className="w-12 h-px bg-gray-600 mx-auto my-6" />
          <p className="text-gray-400 font-light text-sm tracking-wider">L'excellence à portée de main</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm py-8">

          <div className="mb-10">
            <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">Bienvenue</p>
            <h2 className="text-3xl font-extralight text-black dark:text-white tracking-wide">Connexion</h2>
            <div className="w-8 h-px bg-black dark:bg-white mt-4" />
          </div>

          {inscription === 'success' && (
            <div className="border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs px-4 py-3 mb-6 tracking-wide">
              Compte créé avec succès. Connectez-vous.
            </div>
          )}
          {reset === 'success' && (
            <div className="border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs px-4 py-3 mb-6 tracking-wide">
              Mot de passe mis à jour avec succès.
            </div>
          )}
          {error && (
            <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6 tracking-wide">
              {error}
            </div>
          )}

          {/* Bouton Google */}
          <button
            onClick={handleGoogle}
            disabled={loadingGoogle || loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 text-xs uppercase tracking-[0.15em] py-3.5 transition-colors duration-300 disabled:opacity-50 mb-6"
          >
            {loadingGoogle ? (
              <span className="text-gray-400">...</span>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continuer avec Google
          </button>

          {/* Séparateur */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            <span className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">ou</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                Email ou Téléphone
              </label>
              <input
                type="text" name="identifiant" value={form.identifiant}
                onChange={handleChange} required
                className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Mot de Passe
                </label>
                <Link href="/recuperer-mot-de-passe"
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors tracking-wide">
                  Oublié ?
                </Link>
              </div>
              <input
                type="password" name="motDePasse" value={form.motDePasse}
                onChange={handleChange} required
                className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit" disabled={loading || loadingGoogle}
              className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors duration-300 disabled:opacity-50 mt-4"
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8 tracking-wide">
            Pas encore de compte ?{' '}
            <Link href="/inscription"
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-4 transition-colors">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}