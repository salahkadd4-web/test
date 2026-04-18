'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type Etape = 'identifiant' | 'infos' | 'otp' | 'google-password'

const rules = [
  { id: 'length',  label: 'Au moins 8 caractères',         test: (p: string) => p.length >= 8 },
  { id: 'upper',   label: 'Au moins une lettre majuscule', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'Au moins une lettre minuscule', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number',  label: 'Au moins un chiffre',           test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'Au moins un caractère spécial', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  return (
    <div className="mt-3 space-y-1.5">
      {rules.map((rule) => {
        const ok = rule.test(password)
        return (
          <div key={rule.id} className="flex items-center gap-2">
            <span className={`text-xs ${ok ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
              {ok ? '✓' : '○'}
            </span>
            <span className={`text-xs ${ok ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
              {rule.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function InscriptionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [error, setError] = useState('')
  const [methode, setMethode] = useState<'email' | 'telephone'>('email')
  const [etape, setEtape] = useState<Etape>((searchParams.get('etape') as Etape) || 'identifiant')
  const [code, setCode] = useState('')

  // ── Vérification AJAX ───────────────────────────────
  const [identifiantStatus, setIdentifiantStatus] = useState<'idle' | 'checking' | 'ok' | 'exists' | 'invalid'>('idle')
  const [checkTimer, setCheckTimer] = useState<NodeJS.Timeout | null>(null)

  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    motDePasse: '', confirmerMotDePasse: '', age: '', genre: '',
  })

  const [googlePassword, setGooglePassword] = useState('')
  const [googlePasswordConfirm, setGooglePasswordConfirm] = useState('')

  useEffect(() => {
    const e = searchParams.get('etape') as Etape
    if (e) setEtape(e)
  }, [searchParams])

  // ── Vérification identifiant en temps réel ──────────
  const checkIdentifiant = useCallback(async (value: string) => {
    if (!value.trim()) { setIdentifiantStatus('idle'); return }

    // Validation format basique
    if (methode === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setIdentifiantStatus('invalid'); return
    }
    if (methode === 'telephone' && !/^(05|06|07)\d{8}$/.test(value.replace(/\s/g, ''))) {
      setIdentifiantStatus('invalid'); return
    }

    setIdentifiantStatus('checking')
    try {
      const res = await fetch('/api/auth/verifier-identifiant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant: value.trim() }),
      })
      const data = await res.json()
      setIdentifiantStatus(data.exists ? 'exists' : 'ok')
    } catch {
      setIdentifiantStatus('idle')
    }
  }, [methode])

  const handleIdentifiantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const field = methode === 'email' ? 'email' : 'telephone'
    setForm(f => ({ ...f, [field]: value }))
    setIdentifiantStatus('idle')
    setError('')
    if (checkTimer) clearTimeout(checkTimer)
    const timer = setTimeout(() => checkIdentifiant(value), 600)
    setCheckTimer(timer)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  // Validation mot de passe
  const passwordValid = rules.every(r => r.test(form.motDePasse))
  const passwordMatch = form.motDePasse === form.confirmerMotDePasse && form.confirmerMotDePasse.length > 0

  // Bouton "Suivant" cliquable seulement si tout est ok
  const canProceed = identifiantStatus === 'ok' && passwordValid && passwordMatch

  // ── Étape 1 → Étape 2 ───────────────────────────────
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canProceed) return
    setEtape('infos')
  }

  // ── Soumission finale ────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          etape: 1,
          nom: form.nom, prenom: form.prenom,
          email:     methode === 'email'     ? form.email     : null,
          telephone: methode === 'telephone' ? form.telephone : null,
          motDePasse: form.motDePasse,
          age:   form.age   ? parseInt(form.age)   : null,
          genre: form.genre || null,
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
          email:     methode === 'email'     ? form.email     : null,
          telephone: methode === 'telephone' ? form.telephone : null,
          code,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      router.push('/connexion?inscription=success')
    } catch { setError('Erreur serveur') } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setLoadingGoogle(true)
    try {
      const { Capacitor } = await import('@capacitor/core')

      if (Capacitor.isNativePlatform()) {
        // ✅ Connexion native — dans l'app
        const { SocialLogin } = await import('@capgo/capacitor-social-login')

        await SocialLogin.initialize({
          google: {
            webClientId: process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
          },
        })

        const result = await SocialLogin.login({
          provider: 'google',
          options: { scopes: ['email', 'profile'] },
        })

        const googleResult = result.result
        if (!googleResult || !('idToken' in googleResult) || !googleResult.idToken) {
          setError('Impossible de récupérer le token Google.')
          return
        }
        const idToken = googleResult.idToken
        if (!idToken) { setLoadingGoogle(false); return }

        // Vérifier/créer le compte via notre route existante
        const res = await fetch('/api/auth/google-native', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        })
        const data = await res.json()
        if (!res.ok || !data.ok) { setError(data.error || 'Erreur Google'); setLoadingGoogle(false); return }

        // Connecter la session
        await signIn('credentials-google', { userId: data.userId, redirect: false })

        // Aller à l'étape mot de passe (même flow que sur web)
        router.push('/inscription?etape=google-password')

      } else {
        // Web normal
        await signIn('google', { callbackUrl: '/inscription?etape=google-password' })
      }
    } catch {
      setError('Connexion Google annulée.')
    } finally {
      setLoadingGoogle(false)
    }
  }

  const handleGooglePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!rules.every(r => r.test(googlePassword))) { setError('Le mot de passe ne respecte pas toutes les conditions'); return }
    if (googlePassword !== googlePasswordConfirm) { setError('Les mots de passe ne correspondent pas'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/inscription/google-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motDePasse: googlePassword }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      router.push('/')
      router.refresh()
    } catch { setError('Erreur serveur') } finally { setLoading(false) }
  }

  const inputClass = "w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300"
  const labelClass = "block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2"

  // ── Statut identifiant ──────────────────────────────
  const IdentifiantFeedback = () => {
    if (identifiantStatus === 'idle') return null
    if (identifiantStatus === 'checking') return (
      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
        <span className="animate-spin">⟳</span> Vérification...
      </p>
    )
    if (identifiantStatus === 'ok') return (
      <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Disponible</p>
    )
    if (identifiantStatus === 'exists') return (
      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
        ✗ Ce {methode === 'email' ? 'email' : 'numéro'} est déjà utilisé —{' '}
        <Link href="/connexion" className="underline">Se connecter</Link>
      </p>
    )
    if (identifiantStatus === 'invalid') return (
      <p className="text-xs text-orange-500 dark:text-orange-400 mt-1">
        Format invalide {methode === 'telephone' ? '(ex: 0612345678)' : '(ex: nom@email.com)'}
      </p>
    )
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col lg:flex-row transition-colors duration-300">

      {/* ── Panneau gauche desktop ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black dark:bg-gray-900 items-center justify-center p-12 border-r border-gray-800">
        <div className="absolute z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_-50%,black_10%)]">
          <Image src="/logo_noir.png" alt="" width={750} height={750}
            className="object-contain invert opacity-30 scale-150" priority />
        </div>
        <div className="relative z-10 text-center text-white">
          <div className="w-12 h-px bg-gray-600 mx-auto my-6" />
          <p className="text-white font-light text-sm tracking-wider">L'excellence à portée de main</p>
        </div>
      </div>

      {/* ── Formulaire ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm py-8">

          {/* ══════════════════════════════════════════════
              ÉTAPE 1 — Identifiant + Mot de passe
          ══════════════════════════════════════════════ */}
          {etape === 'identifiant' && (
            <>
              <div className="mb-8">
                <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">Nouveau Client</p>
                <h2 className="text-3xl font-extralight text-black dark:text-white tracking-wide">Inscription</h2>
                <div className="w-8 h-px bg-black dark:bg-white mt-4" />
                {/* Indicateur étapes */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs flex items-center justify-center font-bold">1</div>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 text-gray-400 text-xs flex items-center justify-center">2</div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Identifiant & mot de passe</p>
              </div>

              {error && (
                <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6">
                  {error}
                </div>
              )}

              {/* Google */}
              <button onClick={handleGoogle} disabled={loadingGoogle || loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 text-xs uppercase tracking-[0.15em] py-3.5 transition-colors disabled:opacity-50 mb-6">
                {loadingGoogle ? <span className="text-gray-400">...</span> : <GoogleIcon />}
                S'inscrire avec Google
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                <span className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">ou</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>

              <form onSubmit={handleNextStep} className="space-y-5">

                {/* Méthode */}
                <div>
                  <label className={labelClass}>S'inscrire avec</label>
                  <div className="flex border border-gray-200 dark:border-gray-700 mb-4">
                    <button type="button" onClick={() => { setMethode('email'); setIdentifiantStatus('idle'); setForm(f => ({ ...f, telephone: '' })) }}
                      className={`flex-1 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${methode === 'email' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
                      Email
                    </button>
                    <button type="button" onClick={() => { setMethode('telephone'); setIdentifiantStatus('idle'); setForm(f => ({ ...f, email: '' })) }}
                      className={`flex-1 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${methode === 'telephone' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
                      Téléphone
                    </button>
                  </div>

                  {methode === 'email' ? (
                    <div>
                      <input type="email" value={form.email} onChange={handleIdentifiantChange} required
                        className={inputClass} placeholder="votre@email.com" />
                      <IdentifiantFeedback />
                    </div>
                  ) : (
                    <div>
                      <input type="tel" value={form.telephone} onChange={handleIdentifiantChange} required
                        className={inputClass} placeholder="0612345678" />
                      <IdentifiantFeedback />
                    </div>
                  )}
                </div>

                {/* Mot de passe */}
                <div>
                  <label className={labelClass}>Mot de Passe</label>
                  <input type="password" name="motDePasse" value={form.motDePasse}
                    onChange={handleChange} required className={inputClass} placeholder="Minimum 8 caractères" />
                  <PasswordStrength password={form.motDePasse} />
                </div>

                {/* Confirmer */}
                <div>
                  <label className={labelClass}>Confirmer</label>
                  <input type="password" name="confirmerMotDePasse" value={form.confirmerMotDePasse}
                    onChange={handleChange} required className={inputClass} placeholder="Répétez le mot de passe" />
                  {form.confirmerMotDePasse && !passwordMatch && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1">✗ Les mots de passe ne correspondent pas</p>
                  )}
                  {form.confirmerMotDePasse && passwordMatch && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Les mots de passe correspondent</p>
                  )}
                </div>

                {/* Bouton Suivant — désactivé si conditions non remplies */}
                <button type="submit" disabled={!canProceed || loading}
                  className={`w-full text-xs uppercase tracking-[0.3em] py-4 transition-all duration-300 mt-2 ${
                    canProceed
                      ? 'bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black cursor-pointer'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }`}>
                  {loading ? 'Chargement...' : 'Suivant →'}
                </button>

                {/* Message d'aide si bouton désactivé */}
                {!canProceed && (form.email || form.telephone) && (
                  <p className="text-xs text-center text-gray-400 dark:text-gray-600">
                    {identifiantStatus === 'exists' ? 'Cet identifiant est déjà utilisé' :
                     identifiantStatus === 'invalid' ? 'Format d\'identifiant invalide' :
                     identifiantStatus === 'checking' ? 'Vérification en cours...' :
                     !passwordValid ? 'Le mot de passe ne respecte pas les conditions' :
                     !passwordMatch ? 'Les mots de passe ne correspondent pas' :
                     'Complétez tous les champs'}
                  </p>
                )}
              </form>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8">
                Déjà client ?{' '}
                <Link href="/connexion" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-4">
                  Se connecter
                </Link>
              </p>
            </>
          )}

          {/* ══════════════════════════════════════════════
              ÉTAPE 2 — Informations personnelles
          ══════════════════════════════════════════════ */}
          {etape === 'infos' && (
            <>
              <div className="mb-8">
                <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">Nouveau Client</p>
                <h2 className="text-3xl font-extralight text-black dark:text-white tracking-wide">Vos infos</h2>
                <div className="w-8 h-px bg-black dark:bg-white mt-4" />
                {/* Indicateur étapes */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">✓</div>
                  <div className="flex-1 h-px bg-black dark:bg-white" />
                  <div className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs flex items-center justify-center font-bold">2</div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Informations personnelles</p>
              </div>

              {error && (
                <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Âge</label>
                    <input type="number" name="age" value={form.age} onChange={handleChange} min="10" max="100"
                      className={inputClass} placeholder="Ex: 25" />
                  </div>
                  <div>
                    <label className={labelClass}>Genre</label>
                    <select name="genre" value={form.genre} onChange={handleChange}
                      className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors">
                      <option value="">Non précisé</option>
                      <option value="HOMME">Homme</option>
                      <option value="FEMME">Femme</option>
                    </select>
                  </div>
                </div>

                {/* Résumé identifiant */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider">Identifiant choisi</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {methode === 'email' ? form.email : form.telephone}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setEtape('identifiant')}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
                    ← Retour
                  </button>
                  <button type="submit" disabled={loading || !form.nom || !form.prenom}
                    className="flex-2 flex-grow bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50">
                    {loading ? 'Envoi...' : methode === 'telephone' ? 'Code SMS' : 'Code Email'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── OTP ── */}
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
                <span className="text-black dark:text-white font-medium">
                  {methode === 'email' ? form.email : form.telephone}
                </span>
              </p>
              {error && <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6">{error}</div>}
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className={labelClass}>Code de Vérification</label>
                  <input type="text" value={code} onChange={(e) => { setCode(e.target.value); setError('') }} required maxLength={6}
                    className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-2xl text-center tracking-[0.5em] text-gray-800 dark:text-gray-100 bg-transparent transition-colors"
                    placeholder="000000" />
                </div>
                <button type="submit" disabled={loading || code.length < 6}
                  className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50">
                  {loading ? 'Vérification...' : 'Confirmer'}
                </button>
                <button type="button" onClick={() => { setEtape('infos'); setError(''); setCode('') }}
                  className="w-full text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                  ← Retour
                </button>
              </form>
            </>
          )}

          {/* ── Mot de passe Google ── */}
          {etape === 'google-password' && (
            <>
              <div className="mb-8">
                <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">Dernière étape</p>
                <h2 className="text-3xl font-extralight text-black dark:text-white tracking-wide">Choisir un mot de passe</h2>
                <div className="w-8 h-px bg-black dark:bg-white mt-4" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Créez un mot de passe pour vous connecter directement avec votre email si besoin.
              </p>
              {error && <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6">{error}</div>}
              <form onSubmit={handleGooglePassword} className="space-y-5">
                <div>
                  <label className={labelClass}>Mot de Passe</label>
                  <input type="password" value={googlePassword} onChange={(e) => { setGooglePassword(e.target.value); setError('') }} required className={inputClass} placeholder="Minimum 8 caractères" />
                  <PasswordStrength password={googlePassword} />
                </div>
                <div>
                  <label className={labelClass}>Confirmer</label>
                  <input type="password" value={googlePasswordConfirm} onChange={(e) => { setGooglePasswordConfirm(e.target.value); setError('') }} required className={inputClass} placeholder="Répétez le mot de passe" />
                  {googlePasswordConfirm && googlePassword !== googlePasswordConfirm && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1">✗ Les mots de passe ne correspondent pas</p>
                  )}
                  {googlePasswordConfirm && googlePassword === googlePasswordConfirm && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Les mots de passe correspondent</p>
                  )}
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50 mt-2">
                  {loading ? 'Enregistrement...' : 'Confirmer et accéder à la boutique'}
                </button>
                <Link href="/" className="block w-full text-center text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                  Ignorer pour l'instant →
                </Link>
              </form>
            </>
          )}
        </div>

        {/* ── Logo mobile — sous le formulaire ── */}
        <div className="lg:hidden mt-8 flex flex-col items-center gap-3 pb-8">
          <div className="w-16 h-px bg-gray-200 dark:bg-gray-800" />
          <Image src="/logo_noir.png" alt="Caba Store" width={80} height={80}
            className="object-contain dark:invert opacity-30" />
          <p className="text-xs text-gray-300 dark:text-gray-700 uppercase tracking-[0.3em]">Caba Store</p>
        </div>
      </div>
    </div>
  )
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
      </div>
    }>
      <InscriptionContent />
    </Suspense>
  )
}