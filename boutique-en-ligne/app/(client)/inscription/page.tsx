'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Etape = 'formulaire' | 'otp'

export default function InscriptionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [methode, setMethode] = useState<'email' | 'telephone'>('email')
  const [etape, setEtape] = useState<Etape>('formulaire')
  const [code, setCode] = useState('')

  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    motDePasse: '', confirmerMotDePasse: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.motDePasse !== form.confirmerMotDePasse) { setError('Les mots de passe ne correspondent pas'); return }
    if (form.motDePasse.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          etape: 1, nom: form.nom, prenom: form.prenom,
          email: methode === 'email' ? form.email : null,
          telephone: methode === 'telephone' ? form.telephone : null,
          motDePasse: form.motDePasse,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      if (data.requireOTP) setEtape('otp')
      else router.push('/connexion?inscription=success')
    } catch { setError('Erreur serveur') } finally { setLoading(false) }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          etape: 2,
          email: methode === 'email' ? form.email : null,
          telephone: methode === 'telephone' ? form.telephone : null,
          code,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      router.push('/connexion?inscription=success')
    } catch { setError('Erreur serveur') } finally { setLoading(false) }
  }

  const inputClass = "w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300"
  const labelClass = "block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2"

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex transition-colors duration-300">

      <div className="hidden lg:flex w-1/2 bg-black dark:bg-gray-900 items-center justify-center p-12 border-r border-gray-800">
        <div className="text-center text-white">
          <h1 className="text-5xl font-extralight tracking-[0.3em] uppercase mb-4">Boutique</h1>
          <div className="w-12 h-px bg-gray-600 mx-auto my-6" />
          <p className="text-gray-400 font-light text-sm tracking-wider">Rejoignez notre communauté exclusive</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm py-8">

          {etape === 'formulaire' && (
            <>
              <div className="mb-10">
                <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">Nouveau Client</p>
                <h2 className="text-3xl font-extralight text-black dark:text-white tracking-wide">Inscription</h2>
                <div className="w-8 h-px bg-black dark:bg-white mt-4" />
              </div>

              {error && (
                <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nom</label>
                    <input type="text" name="nom" value={form.nom} onChange={handleChange} required className={inputClass} placeholder="Nom" />
                  </div>
                  <div>
                    <label className={labelClass}>Prénom</label>
                    <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required className={inputClass} placeholder="Prénom" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>S'inscrire avec</label>
                  <div className="flex border border-gray-200 dark:border-gray-700">
                    <button type="button" onClick={() => setMethode('email')}
                      className={`flex-1 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${methode === 'email' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
                      Email
                    </button>
                    <button type="button" onClick={() => setMethode('telephone')}
                      className={`flex-1 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${methode === 'telephone' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
                      Téléphone
                    </button>
                  </div>
                  {methode === 'email' ? (
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass + ' mt-4'} placeholder="votre@email.com" />
                  ) : (
                    <div>
                      <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required className={inputClass + ' mt-4'} placeholder="05XX XX XX XX" />
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Format : 05XX, 06XX ou 07XX XX XX XX</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Mot de Passe</label>
                  <input type="password" name="motDePasse" value={form.motDePasse} onChange={handleChange} required className={inputClass} placeholder="Minimum 6 caractères" />
                </div>

                <div>
                  <label className={labelClass}>Confirmer</label>
                  <input type="password" name="confirmerMotDePasse" value={form.confirmerMotDePasse} onChange={handleChange} required className={inputClass} placeholder="Répétez le mot de passe" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors duration-300 disabled:opacity-50 mt-4">
                  {loading ? 'Envoi du code...' : methode === 'telephone' ? 'Recevoir le Code SMS' : 'Recevoir le Code Email'}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8">
                Déjà client ?{' '}
                <Link href="/connexion" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-4">
                  Se connecter
                </Link>
              </p>
            </>
          )}

          {etape === 'otp' && (
            <>
              <div className="mb-10">
                <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">Vérification</p>
                <h2 className="text-3xl font-extralight text-black dark:text-white tracking-wide">
                  {methode === 'email' ? 'Code Email' : 'Code SMS'}
                </h2>
                <div className="w-8 h-px bg-black dark:bg-white mt-4" />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Un code a été envoyé {methode === 'email' ? 'à' : 'au'}{' '}
                <span className="text-black dark:text-white font-medium">{methode === 'email' ? form.email : form.telephone}</span>
              </p>

              {error && (
                <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className={labelClass}>Code de Vérification</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setError('') }}
                    required maxLength={6}
                    className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-2xl text-center tracking-[0.5em] text-gray-800 dark:text-gray-100 bg-transparent transition-colors"
                    placeholder="000000"
                  />
                </div>

                <button type="submit" disabled={loading || code.length < 6}
                  className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50">
                  {loading ? 'Vérification...' : 'Confirmer'}
                </button>

                <button type="button" onClick={() => { setEtape('formulaire'); setError(''); setCode('') }}
                  className="w-full text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                  ← Retour
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
