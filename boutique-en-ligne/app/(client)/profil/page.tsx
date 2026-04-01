'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const WILAYAS = [
  'Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira',
  'Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda',
  'Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem',"M'Sila",'Mascara',
  'Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf',
  'Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma',
  'Aïn Témouchent','Ghardaïa','Relizane',
]

const pwdRules = [
  { id: 'length',  label: 'Au moins 8 caractères',         test: (p: string) => p.length >= 8 },
  { id: 'upper',   label: 'Au moins une lettre majuscule', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'Au moins une lettre minuscule', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number',  label: 'Au moins un chiffre',           test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'Au moins un caractère spécial', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  return (
    <div className="mt-2 space-y-1">
      {pwdRules.map((rule) => {
        const ok = rule.test(password)
        return (
          <div key={rule.id} className="flex items-center gap-2">
            <span className={`text-xs ${ok ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>{ok ? '✓' : '○'}</span>
            <span className={`text-xs ${ok ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>{rule.label}</span>
          </div>
        )
      })}
    </div>
  )
}

type Section = 'infos' | 'password' | 'email'

export default function ProfilPage() {
  const { data: session, update } = useSession()
  const [section, setSection] = useState<Section>('infos')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [profil, setProfil] = useState({
    nom: '', prenom: '', telephone: '', age: '', genre: '', wilaya: '',
  })

  // Mot de passe de confirmation pour les infos générales
  const [motDePasseConfirm, setMotDePasseConfirm] = useState('')

  // Changement mot de passe
  const [pwd, setPwd] = useState({ actuel: '', nouveau: '', confirmer: '' })

  // Changement email
  const [emailForm, setEmailForm] = useState({
    motDePasse: '', nouvelEmail: '',
    codeAncien: '', codeNouveau: '',
    etape: 'form' as 'form' | 'codes',
  })

  useEffect(() => {
    fetch('/api/profil')
      .then(r => r.json())
      .then(data => {
        setProfil({
          nom:       data.nom       || '',
          prenom:    data.prenom    || '',
          telephone: data.telephone || '',
          age:       data.age       ? String(data.age) : '',
          genre:     data.genre     || '',
          wilaya:    data.wilaya    || '',
        })
        setLoading(false)
      })
  }, [])

  const clearMessages = () => { setError(''); setSuccess('') }

  // ── Infos générales ──────────────────────────────────────
  const handleSaveInfos = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()

    if (!motDePasseConfirm) {
      setError('Veuillez entrer votre mot de passe pour confirmer')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/profil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profil,
          age:        profil.age ? parseInt(profil.age) : null,
          motDePasse: motDePasseConfirm,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSuccess('Informations mises à jour !')
      setMotDePasseConfirm('')
      await update()
    } catch { setError('Erreur serveur') } finally { setSaving(false) }
  }

  // ── Changement mot de passe ──────────────────────────────
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    if (!pwdRules.every(r => r.test(pwd.nouveau))) {
      setError('Le nouveau mot de passe ne respecte pas les conditions')
      return
    }
    if (pwd.nouveau !== pwd.confirmer) { setError('Les mots de passe ne correspondent pas'); return }

    setSaving(true)
    try {
      const res = await fetch('/api/profil/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motDePasseActuel: pwd.actuel, nouveauMotDePasse: pwd.nouveau }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSuccess('Mot de passe modifié avec succès !')
      setPwd({ actuel: '', nouveau: '', confirmer: '' })
    } catch { setError('Erreur serveur') } finally { setSaving(false) }
  }

  // ── Changement email ─────────────────────────────────────
  const handleRequestEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    setSaving(true)
    try {
      const res = await fetch('/api/profil/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etape: 1, motDePasse: emailForm.motDePasse, nouvelEmail: emailForm.nouvelEmail }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setEmailForm({ ...emailForm, etape: 'codes' })
      setSuccess('Codes envoyés à votre ancien et nouvel email !')
    } catch { setError('Erreur serveur') } finally { setSaving(false) }
  }

  const handleConfirmEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    setSaving(true)
    try {
      const res = await fetch('/api/profil/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etape: 2, nouvelEmail: emailForm.nouvelEmail, codeAncien: emailForm.codeAncien, codeNouveau: emailForm.codeNouveau }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSuccess('Email modifié avec succès !')
      setEmailForm({ motDePasse: '', nouvelEmail: '', codeAncien: '', codeNouveau: '', etape: 'form' })
      await update()
    } catch { setError('Erreur serveur') } finally { setSaving(false) }
  }

  const inputClass = "w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors"
  const labelClass = "block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2"
  const tabClass = (s: Section) => `px-4 py-2 text-xs uppercase tracking-[0.2em] border-b-2 transition-colors ${
    section === s
      ? 'border-black dark:border-white text-black dark:text-white'
      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
  }`

  if (loading) return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">
      Chargement...
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 pt-4">

      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-xs mb-2">Compte</p>
        <h1 className="text-3xl font-extralight text-black dark:text-white tracking-wide">Mon Profil</h1>
        <div className="w-8 h-px bg-black dark:bg-white mt-4" />
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
          <span className="text-white dark:text-gray-900 text-2xl font-semibold">
            {profil.prenom?.charAt(0)?.toUpperCase() || '?'}
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {profil.prenom} {profil.nom}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-0 border-b border-gray-200 dark:border-gray-800 mb-8">
        <button onClick={() => { setSection('infos');    clearMessages(); setMotDePasseConfirm('') }} className={tabClass('infos')}>Informations</button>
        <button onClick={() => { setSection('password'); clearMessages() }} className={tabClass('password')}>Mot de passe</button>
        <button onClick={() => { setSection('email');    clearMessages() }} className={tabClass('email')}>Email</button>
      </div>

      {/* Messages */}
      {error   && <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs px-4 py-3 mb-6">{error}</div>}
      {success && <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 text-xs px-4 py-3 mb-6">✓ {success}</div>}

      {/* ── Infos générales ──────────────────────────── */}
      {section === 'infos' && (
        <form onSubmit={handleSaveInfos} className="space-y-6">

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Nom</label>
              <input type="text" value={profil.nom} onChange={e => setProfil({...profil, nom: e.target.value})} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Prénom</label>
              <input type="text" value={profil.prenom} onChange={e => setProfil({...profil, prenom: e.target.value})} required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Âge</label>
              <input type="number" value={profil.age} onChange={e => setProfil({...profil, age: e.target.value})} min="10" max="100" className={inputClass} placeholder="Ex: 25" />
            </div>
            <div>
              <label className={labelClass}>Genre</label>
              <select value={profil.genre} onChange={e => setProfil({...profil, genre: e.target.value})}
                className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors">
                <option value="">Non précisé</option>
                <option value="HOMME">Homme</option>
                <option value="FEMME">Femme</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Téléphone</label>
            <input type="tel" value={profil.telephone} onChange={e => setProfil({...profil, telephone: e.target.value})} className={inputClass} placeholder="05XX XX XX XX" />
          </div>

          <div>
            <label className={labelClass}>Wilaya</label>
            <select value={profil.wilaya} onChange={e => setProfil({...profil, wilaya: e.target.value})}
              className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-sm text-gray-800 dark:text-gray-100 bg-transparent transition-colors">
              <option value="">Sélectionner une wilaya</option>
              {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          {/* Séparateur + confirmation mot de passe */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 mb-4">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                🔒 Entrez votre mot de passe actuel pour confirmer les modifications
              </p>
            </div>
            <div>
              <label className={labelClass}>Mot de passe actuel *</label>
              <input
                type="password"
                value={motDePasseConfirm}
                onChange={e => setMotDePasseConfirm(e.target.value)}
                required
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" disabled={saving || !motDePasseConfirm}
            className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50">
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      )}

      {/* ── Mot de passe ─────────────────────────────── */}
      {section === 'password' && (
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div>
            <label className={labelClass}>Mot de passe actuel</label>
            <input type="password" value={pwd.actuel} onChange={e => setPwd({...pwd, actuel: e.target.value})} required className={inputClass} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClass}>Nouveau mot de passe</label>
            <input type="password" value={pwd.nouveau} onChange={e => setPwd({...pwd, nouveau: e.target.value})} required className={inputClass} placeholder="Minimum 8 caractères" />
            <PasswordStrength password={pwd.nouveau} />
          </div>
          <div>
            <label className={labelClass}>Confirmer le nouveau mot de passe</label>
            <input type="password" value={pwd.confirmer} onChange={e => setPwd({...pwd, confirmer: e.target.value})} required className={inputClass} placeholder="Répétez le mot de passe" />
            {pwd.confirmer && pwd.nouveau !== pwd.confirmer && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">Les mots de passe ne correspondent pas</p>
            )}
            {pwd.confirmer && pwd.nouveau === pwd.confirmer && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Les mots de passe correspondent</p>
            )}
          </div>
          <button type="submit" disabled={saving}
            className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50">
            {saving ? 'Modification...' : 'Modifier le mot de passe'}
          </button>
        </form>
      )}

      {/* ── Email ────────────────────────────────────── */}
      {section === 'email' && (
        <>
          {emailForm.etape === 'form' ? (
            <form onSubmit={handleRequestEmailChange} className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-xs text-gray-500 dark:text-gray-400">
                Email actuel : <span className="font-semibold text-gray-800 dark:text-gray-100">{session?.user?.email}</span>
              </div>
              <div>
                <label className={labelClass}>Mot de passe actuel *</label>
                <input type="password" value={emailForm.motDePasse} onChange={e => setEmailForm({...emailForm, motDePasse: e.target.value})} required className={inputClass} placeholder="••••••••" />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Requis pour confirmer votre identité</p>
              </div>
              <div>
                <label className={labelClass}>Nouvel email</label>
                <input type="email" value={emailForm.nouvelEmail} onChange={e => setEmailForm({...emailForm, nouvelEmail: e.target.value})} required className={inputClass} placeholder="nouveau@email.com" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50">
                {saving ? 'Envoi des codes...' : 'Envoyer les codes de vérification'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirmEmailChange} className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-xs text-blue-700 dark:text-blue-300">
                Deux codes ont été envoyés : un à votre <strong>ancien email</strong> et un à <strong>{emailForm.nouvelEmail}</strong>
              </div>
              <div>
                <label className={labelClass}>Code de l'ancien email</label>
                <input type="text" value={emailForm.codeAncien} onChange={e => setEmailForm({...emailForm, codeAncien: e.target.value})} required maxLength={6}
                  className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-xl text-center tracking-[0.4em] text-gray-800 dark:text-gray-100 bg-transparent transition-colors"
                  placeholder="000000" />
              </div>
              <div>
                <label className={labelClass}>Code du nouvel email</label>
                <input type="text" value={emailForm.codeNouveau} onChange={e => setEmailForm({...emailForm, codeNouveau: e.target.value})} required maxLength={6}
                  className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 text-xl text-center tracking-[0.4em] text-gray-800 dark:text-gray-100 bg-transparent transition-colors"
                  placeholder="000000" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-xs uppercase tracking-[0.3em] py-4 transition-colors disabled:opacity-50">
                {saving ? 'Confirmation...' : 'Confirmer le changement'}
              </button>
              <button type="button" onClick={() => setEmailForm({...emailForm, etape: 'form'})}
                className="w-full text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                ← Retour
              </button>
            </form>
          )}
        </>
      )}
    </div>
  )
}