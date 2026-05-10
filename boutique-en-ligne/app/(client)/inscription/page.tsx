'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Check, X } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Page d'inscription — design cohérent avec la page connexion (luxe minimaliste)
// Principes IHM appliqués :
//   • Loi de Hick  → 2 rôles seulement, présentés en premier pour cadrer le flow
//   • Loi de Fitts → zones tactiles larges, bouton principal pleine largeur
//   • Visibilité du système → stepper, états loading/error/success explicites
//   • Divulgation progressive → étape 1 = formulaire, étape 2 = OTP uniquement
//   • Prévention des erreurs → bouton désactivé si champs manquants
//   • Cohérence → même split-screen, même typographie, même palette que /connexion
// ─────────────────────────────────────────────────────────────────────────────

export default function InscriptionPage() {
  const router = useRouter()

  const [etape, setEtape]                     = useState<1 | 2>(1)
  const [role, setRole]                       = useState<'CLIENT' | 'VENDEUR'>('CLIENT')
  const [identifiantType, setIdentifiantType] = useState<'email' | 'telephone'>('email')
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    motDePasse: '', nomBoutique: '',
  })
  const [code, setCode]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPwd, setShowPwd] = useState(false)

  // ── AJAX — vérification disponibilité identifiant ─────────────────────────
  // Même pattern que /recuperer-mot-de-passe mais inversé :
  //   found    → ❌ "Déjà utilisé"  (rouge)
  //   notfound → ✅ "Disponible"    (vert)
  const [checkingId, setCheckingId] = useState(false)
  const [idStatus, setIdStatus]     = useState<'idle' | 'available' | 'taken'>('idle')
  const debounceRef                 = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const identifiant = identifiantType === 'email' ? form.email : form.telephone
    if (!identifiant.trim() || (identifiantType === 'email' && !identifiant.includes('@'))) {
      setIdStatus('idle')
      return
    }
    setIdStatus('idle')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setCheckingId(true)
      try {
        const res  = await fetch('/api/auth/verifier-identifiant', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ identifiant: identifiant.trim() }),
        })
        const data = await res.json()
        // Inversé par rapport à recuperer-mot-de-passe :
        // exists=true → compte déjà pris → rouge
        // exists=false → disponible → vert
        setIdStatus(data.exists ? 'taken' : 'available')
      } catch {
        setIdStatus('idle')
      } finally {
        setCheckingId(false)
      }
    }, 600)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [form.email, form.telephone, identifiantType])

  const handleChange = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const canSubmitEtape1 =
    form.nom &&
    form.prenom &&
    form.motDePasse &&
    (identifiantType === 'email' ? form.email : form.telephone) &&
    (role === 'VENDEUR' ? form.nomBoutique : true) &&
    idStatus === 'available'

  // ── Étape 1 ────────────────────────────────────────────────────────────────
  const handleEtape1 = async () => {
    setLoading(true); setError(null)
    try {
      const body: Record<string, string> = {
        etape: '1',
        nom: form.nom, prenom: form.prenom,
        motDePasse: form.motDePasse,
        role,
      }
      if (identifiantType === 'email')     body.email     = form.email
      if (identifiantType === 'telephone') body.telephone = form.telephone
      if (role === 'VENDEUR')              body.nomBoutique = form.nomBoutique

      const res  = await fetch('/api/auth/inscription', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setEtape(2)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  // ── Étape 2 ────────────────────────────────────────────────────────────────
  const handleEtape2 = async () => {
    setLoading(true); setError(null)
    try {
      const body: Record<string, string> = { etape: '2', code, role }
      if (identifiantType === 'email')     body.email     = form.email
      if (identifiantType === 'telephone') body.telephone = form.telephone

      const res  = await fetch('/api/auth/inscription', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSuccess(data.message)
      setTimeout(() => router.push('/connexion?inscription=success'), 2500)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  // ── Stepper ────────────────────────────────────────────────────────────────
  const Stepper = () => (
    <div className="flex items-center gap-3 mb-10">
      {[1, 2].map((s) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-6 h-6 text-xs font-light transition-colors duration-300 ${
            etape === s
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : s < etape
              ? 'border border-black dark:border-white text-black dark:text-white'
              : 'border border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600'
          }`}>
            {s < etape ? <Check className="w-4 h-4" /> : s}
          </div>
          <span className={`text-xs uppercase tracking-[0.2em] hidden sm:block transition-colors duration-300 ${
            etape === s
              ? 'text-black dark:text-white'
              : 'text-gray-400 dark:text-gray-600'
          }`}>
            {s === 1 ? 'Informations' : 'Confirmation'}
          </span>
          {s < 2 && <div className="w-8 h-px bg-gray-200 dark:bg-gray-800" />}
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col lg:flex-row transition-colors duration-300">

      {/* ── Panneau gauche (décoration) ────────────────────────────────────── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black dark:bg-gray-900 items-center justify-center p-12 border-r border-gray-800">
        <div className="absolute z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_-50%,black_10%)]">
          <Image
            src="/logo_noir.png"
            alt=""
            width={750}
            height={750}
            className="object-contain invert opacity-30 scale-150"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <div className="w-12 h-px bg-gray-600 mx-auto my-6" />
          <p className="text-white font-light text-sm tracking-wider drop-shadow-md">
            L'excellence à portée de main
          </p>
        </div>
      </div>

      {/* ── Panneau droit (formulaire) ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm py-8">

          {/* En-tête */}
          <div className="mb-8">
            <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">
              Nouveau compte
            </p>
            <h2 className="text-3xl font-extralight text-black dark:text-white tracking-wide">
              Inscription
            </h2>
            <div className="w-8 h-px bg-black dark:bg-white mt-4" />
          </div>

          {/* ── Succès ─────────────────────────────────────────────────────── */}
          {success ? (
            <div className="py-8 text-center space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
                {role === 'VENDEUR' ? 'Boutique créée' : 'Compte créé'}
              </p>
              <p className="text-sm font-light text-black dark:text-white">
                {success}
              </p>
              {role === 'VENDEUR' && (
                <p className="text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 px-4 py-3 tracking-wide">
                  Votre compte sera activé après validation par notre équipe.
                </p>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-600 tracking-wide mt-4">
                Redirection vers la connexion...
              </p>
            </div>
          ) : (
            <>
              <Stepper />

              {/* ── ÉTAPE 1 ─────────────────────────────────────────────── */}
              {etape === 1 && (
                <div className="space-y-7">

                  {/* Choix du rôle — Loi de Hick : 2 options max présentées en premier */}
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">
                      Je m'inscris en tant que
                    </p>
                    <div className="flex gap-0 border border-gray-200 dark:border-gray-800">
                      {(['CLIENT', 'VENDEUR'] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRole(r)}
                          className={`flex-1 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                            role === r
                              ? 'bg-black dark:bg-white text-white dark:text-black'
                              : 'bg-white dark:bg-gray-950 text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white'
                          }`}
                        >
                          {r === 'CLIENT' ? 'Client' : 'Vendeur'}
                        </button>
                      ))}
                    </div>
                    {role === 'VENDEUR' && (
                      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 tracking-wide border-l-2 border-gray-300 dark:border-gray-700 pl-3">
                        Votre compte sera bloqué jusqu'à validation par notre équipe.
                      </p>
                    )}
                  </div>

                  {/* Nom & Prénom */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={form.nom}
                        onChange={handleChange('nom')}
                        placeholder="Dupont"
                        className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300 placeholder-gray-300 dark:placeholder-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={form.prenom}
                        onChange={handleChange('prenom')}
                        placeholder="Ahmed"
                        className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300 placeholder-gray-300 dark:placeholder-gray-700"
                      />
                    </div>
                  </div>

                  {/* Nom boutique — divulgation progressive */}
                  {role === 'VENDEUR' && (
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                        Nom de la boutique *
                      </label>
                      <input
                        type="text"
                        value={form.nomBoutique}
                        onChange={handleChange('nomBoutique')}
                        placeholder="Ma Super Boutique"
                        className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300 placeholder-gray-300 dark:placeholder-gray-700"
                      />
                    </div>
                  )}

                  {/* Toggle Email / Téléphone */}
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      {(['email', 'telephone'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => { setIdentifiantType(t); setIdStatus('idle') }}
                          className={`text-xs uppercase tracking-[0.2em] pb-1 transition-colors duration-200 ${
                            identifiantType === t
                              ? 'text-black dark:text-white border-b border-black dark:border-white'
                              : 'text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400'
                          }`}
                        >
                          {t === 'email' ? 'Email' : 'Téléphone'}
                        </button>
                      ))}
                    </div>
                    {identifiantType === 'email' ? (
                      <div className="relative">
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => { handleChange('email')(e); setIdStatus('idle') }}
                          placeholder="exemple@email.com"
                          className={`w-full border-b outline-none py-2.5 pr-7 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300 placeholder-gray-300 dark:placeholder-gray-700 ${
                            idStatus === 'available' ? 'border-green-500 dark:border-green-400' :
                            idStatus === 'taken'     ? 'border-red-400 dark:border-red-500' :
                            'border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white'
                          }`}
                        />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                          {checkingId && (
                            <svg className="animate-spin w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                          )}
                          {!checkingId && idStatus === 'available' && <span className="text-green-500 text-sm font-bold"><Check className="w-4 h-4" /></span>}
                          {!checkingId && idStatus === 'taken'     && <span className="text-red-400 text-sm font-bold"><X className="w-4 h-4" /></span>}
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="tel"
                          value={form.telephone}
                          onChange={e => { handleChange('telephone')(e); setIdStatus('idle') }}
                          placeholder="05 XX XX XX XX"
                          className={`w-full border-b outline-none py-2.5 pr-7 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300 placeholder-gray-300 dark:placeholder-gray-700 ${
                            idStatus === 'available' ? 'border-green-500 dark:border-green-400' :
                            idStatus === 'taken'     ? 'border-red-400 dark:border-red-500' :
                            'border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white'
                          }`}
                        />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                          {checkingId && (
                            <svg className="animate-spin w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                          )}
                          {!checkingId && idStatus === 'available' && <span className="text-green-500 text-sm font-bold"><Check className="w-4 h-4" /></span>}
                          {!checkingId && idStatus === 'taken'     && <span className="text-red-400 text-sm font-bold"><X className="w-4 h-4" /></span>}
                        </div>
                      </div>
                    )}

                    {/* Message sous le champ */}
                    {idStatus === 'available' && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1.5"><Check className="w-4 h-4 inline mr-1" />{' '}{identifiantType === 'email' ? 'Email' : 'Numéro'} disponible
                      </p>
                    )}
                    {idStatus === 'taken' && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1.5">
                        ✗ {identifiantType === 'email' ? 'Cet email est déjà associé à un compte' : 'Ce numéro est déjà utilisé'} —{' '}
                        <Link href="/connexion" className="underline underline-offset-2">Se connecter ?</Link>
                      </p>
                    )}
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                      Mot de passe *
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? 'text' : 'password'}
                        value={form.motDePasse}
                        onChange={handleChange('motDePasse')}
                        placeholder="8+ car., maj., chiffre, symbole"
                        className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-2.5 pr-8 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300 placeholder-gray-300 dark:placeholder-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest"
                        aria-label={showPwd ? 'Masquer' : 'Afficher'}
                      >
                        {showPwd ? 'Cacher' : 'Voir'}
                      </button>
                    </div>
                    {/* Conditions temps réel */}
                    {form.motDePasse.length > 0 && (() => {
                      const pwd = form.motDePasse
                      const conditions = [
                        { ok: pwd.length >= 8,          label: '8 caractères minimum' },
                        { ok: /[A-Z]/.test(pwd),        label: 'Une lettre majuscule' },
                        { ok: /[0-9]/.test(pwd),        label: 'Un chiffre' },
                        { ok: /[^A-Za-z0-9]/.test(pwd), label: 'Un symbole (!@#$%...)' },
                      ]
                      return (
                        <div className="mt-3 space-y-1.5">
                          {conditions.map(({ ok, label }) => (
                            <p key={label} className={`text-xs flex items-center gap-2 transition-colors duration-200 ${
                              ok ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                            }`}>
                              <span className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-[9px] font-bold transition-all duration-200 ${
                                ok
                                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                                  : 'border border-gray-300 dark:border-gray-700 text-gray-300 dark:text-gray-700'
                              }`}>
                                {ok ? <Check className="w-4 h-4" /> : ''}
                              </span>
                              {label}
                            </p>
                          ))}
                        </div>
                      )
                    })()}
                  </div>

                  {/* Erreur */}
                  {error && (
                    <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 tracking-wide">
                      {error}
                    </div>
                  )}

                  {/* CTA principal — Fitts : pleine largeur, hauteur généreuse */}
                  <button
                    onClick={handleEtape1}
                    disabled={loading || !canSubmitEtape1}
                    className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors duration-300 disabled:opacity-40 mt-2"
                  >
                    {loading ? 'Envoi en cours...' : 'Recevoir le code'}
                  </button>

                  <p className="text-center text-xs text-gray-400 dark:text-gray-500 tracking-wide">
                    Déjà un compte ?{' '}
                    <Link
                      href="/connexion"
                      className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-4 transition-colors"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>
              )}

              {/* ── ÉTAPE 2 — OTP ───────────────────────────────────────── */}
              {etape === 2 && (
                <div className="space-y-7">

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-1">
                      Code envoyé à
                    </p>
                    <p className="text-sm text-black dark:text-white font-light">
                      {identifiantType === 'email' ? form.email : form.telephone}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">
                      Code de confirmation *
                    </label>
                    {/* Input OTP centré, mono, pleine largeur — Fitts */}
                    <input
                      type="text"
                      inputMode="numeric"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      placeholder="• • • • • •"
                      className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-center text-2xl font-mono tracking-[0.5em] text-gray-800 dark:text-gray-100 bg-transparent transition-colors duration-300 placeholder-gray-300 dark:placeholder-gray-700"
                    />
                    {/* Indicateur visuel de progression */}
                    <div className="flex gap-1.5 mt-2 justify-center">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-0.5 flex-1 transition-colors duration-200 ${
                            i < code.length
                              ? 'bg-black dark:bg-white'
                              : 'bg-gray-200 dark:bg-gray-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 tracking-wide">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleEtape2}
                    disabled={loading || code.length !== 6}
                    className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors duration-300 disabled:opacity-40"
                  >
                    {loading ? 'Vérification...' : 'Confirmer mon compte'}
                  </button>

                  <button
                    onClick={() => { setEtape(1); setCode(''); setError(null) }}
                    className="w-full text-xs text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white uppercase tracking-[0.2em] transition-colors py-2"
                  >
                    ← Modifier mes informations
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Logo mobile (cohérence avec connexion) */}
        <div className="lg:hidden mt-12 flex flex-col items-center gap-3 pb-8">
          <div className="w-16 h-px bg-gray-200 dark:bg-gray-800" />
          <Image
            src="/logo_noir.png"
            alt="Caba Store"
            width={80}
            height={80}
            className="object-contain dark:invert opacity-30"
          />
          <p className="text-xs text-gray-300 dark:text-gray-700 uppercase tracking-[0.3em]">
            Caba Store
          </p>
        </div>
      </div>
    </div>
  )
}