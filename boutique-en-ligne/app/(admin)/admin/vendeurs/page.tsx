'use client'

// ── DIFF vs version originale ──────────────────────────────────────────────
// 1. import useRef + useCallback ajoutés
// 2. searching state ajouté
// 3. useDebounce hook ajouté
// 4. fetchVendeurs converti en useCallback avec AbortController
// 5. useEffect déclenche sur [fetchVendeurs] (= debouncedSearch + filterStatut)
// 6. Input de recherche : remplace <form> par <div relative> + spinner
// 7. API route mise à jour pour inclure telephone dans OR (voir api_admin_vendeurs_route.ts)
// ──────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import { AlertTriangle, Ban, Banknote, CheckCircle2, ClipboardList, KeyRound, Loader2, Package, Paperclip, Phone, Play, Search, ShoppingCart, X, XCircle } from 'lucide-react'

interface Doc {
  id: string; type: string; label: string; description: string | null
  fichier: string | null; statut: string; adminNote: string | null
}
interface Vendeur {
  id: string; nomBoutique: string | null; statut: string
  adminNote: string | null; createdAt: string
  totalCommandes: number; chiffreAffaire: number
  user: { nom: string; prenom: string; email: string | null; telephone: string | null }
  documents: Doc[]
  _count: { products: number; categories: number }
  flowmerceApiKey: string | null
}

const statutConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  EN_ATTENTE:      { label: 'En attente',      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',   icon: Loader2 },
  APPROUVE:        { label: 'Approuvé',        color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',       icon: CheckCircle2 },
  SUSPENDU:        { label: 'Suspendu',        color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',               icon: Ban },
  PIECES_REQUISES: { label: 'Pièces requises', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',   icon: ClipboardList },
}

const DOC_TYPES = [
  { type: 'carte_nationale',    label: "Carte nationale d'identité",                description: 'Recto et verso de votre CNI'          },
  { type: 'registre_commerce',  label: 'Registre de commerce',                      description: 'Document officiel du RC'              },
  { type: 'carte_entrepreneur', label: 'Carte auto-entrepreneur / micro-importateur', description: "Carte d'activité micro-importateur" },
  { type: 'carte_fiscale',      label: 'Carte fiscale / NIF',                        description: "Numéro d'identification fiscale"     },
  { type: 'justif_domicile',    label: 'Justificatif de domicile',                   description: 'Facture récente (électricité, eau, APC...)' },
  { type: 'autre',              label: 'Autre document',                             description: 'Précisez dans la description'        },
]

function useDebounce<T>(value: T, delay: number): T {
  const [d, setD] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setD(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return d
}

export default function AdminVendeursPage() {
  const [vendeurs,       setVendeurs]       = useState<Vendeur[]>([])
  const [loading,        setLoading]        = useState(true)
  const [searching,      setSearching]      = useState(false)
  const [filterStatut,   setFilterStatut]   = useState('')
  const [search,         setSearch]         = useState('')
  const [selected,       setSelected]       = useState<Vendeur | null>(null)
  const [saving,         setSaving]         = useState(false)
  const [showDocModal,   setShowDocModal]   = useState(false)
  const [adminNote,      setAdminNote]      = useState('')
  const [newDocs,        setNewDocs]        = useState<{ type: string; label: string; description: string }[]>([])
  const [docAction,      setDocAction]      = useState<{ docId: string; action: 'accepter' | 'refuser'; note: string } | null>(null)
  const [toastMsg,       setToastMsg]       = useState<string | null>(null)
  const [flowmerceKey,   setFlowmerceKey]   = useState('')
  const [savingKey,      setSavingKey]      = useState(false)

  const debouncedSearch = useDebounce(search, 350)
  const abortRef        = useRef<AbortController | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  // ── AJAX : se déclenche automatiquement ───────────────────
  const fetchVendeurs = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()
    debouncedSearch ? setSearching(true) : setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterStatut)    params.set('statut', filterStatut)
      if (debouncedSearch) params.set('search', debouncedSearch)
      const res = await fetch(`/api/admin/vendeurs?${params}`, { signal: abortRef.current.signal })
      if (res.ok) setVendeurs(await res.json())
    } catch (e: any) {
      if (e.name !== 'AbortError') console.error(e)
    } finally {
      setLoading(false)
      setSearching(false)
    }
  }, [filterStatut, debouncedSearch])

  useEffect(() => { fetchVendeurs() }, [fetchVendeurs])

  const fetchDetail = async (id: string) => {
    const res = await fetch(`/api/admin/vendeurs/${id}`)
    if (res.ok) {
      const data = await res.json()
      setSelected(data)
      setFlowmerceKey(data.flowmerceApiKey ?? '')
    }
  }

  const saveFlowmerceKey = async () => {
    if (!selected) return
    setSavingKey(true)
    const res = await fetch(`/api/admin/vendeurs/${selected.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ action: 'set_flowmerce_key', flowmerceApiKey: flowmerceKey.trim() }),
    })
    const data = await res.json()
    showToast(res.ok ? <><KeyRound className="w-5 h-5" />{' '}Clé Flowmerce enregistrée</> : (data.error || 'Erreur'))
    if (res.ok) setSelected(prev => prev ? { ...prev, flowmerceApiKey: flowmerceKey.trim() || null } : prev)
    setSavingKey(false)
  }

  const doAction = async (id: string, action: string, extra: object = {}) => {
    setSaving(true)
    const res = await fetch(`/api/admin/vendeurs/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ action, adminNote, ...extra }),
    })
    const data = await res.json()
    if (res.ok) {
      showToast(data.message)
      await fetchVendeurs()
      if (selected?.id === id) await fetchDetail(id)
      setShowDocModal(false)
      setAdminNote('')
    } else {
      showToast(data.error || 'Erreur')
    }
    setSaving(false)
  }

  const handleDocAction = async () => {
    if (!docAction || !selected) return
    setSaving(true)
    const res = await fetch(`/api/admin/vendeurs/${selected.id}/documents/${docAction.docId}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ action: docAction.action, adminNote: docAction.note }),
    })
    const data = await res.json()
    if (res.ok) {
      showToast(data.message)
      await fetchDetail(selected.id)
      await fetchVendeurs()
    } else {
      showToast(data.error || 'Erreur')
    }
    setDocAction(null)
    setSaving(false)
  }

  const toggleNewDoc = (doc: typeof DOC_TYPES[0]) => {
    setNewDocs((prev) => {
      const exists = prev.find((d) => d.type === doc.type)
      if (exists) return prev.filter((d) => d.type !== doc.type)
      return [...prev, { type: doc.type, label: doc.label, description: doc.description }]
    })
  }

  const docStatutColor: Record<string, string> = {
    EN_ATTENTE: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
    ACCEPTE:    'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    REFUSE:     'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  }

  return (
    <div>
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
          {toastMsg}
        </div>
      )}

      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Gestion des Vendeurs
      </h1>

      {/* ── Filtres ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        {/* Recherche AJAX avec debounce */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {searching ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : <Search className="w-4 h-4" />}
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Boutique, nom, email, téléphone..."
            className="w-full pl-9 pr-8 border border-gray-200 dark:border-gray-700 rounded-xl py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            ><X className="w-4 h-4" /></button>
          )}
        </div>

        <select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          <option value="">Tous les statuts</option>
          {Object.entries(statutConfig).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* KPIs rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {Object.entries(statutConfig).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setFilterStatut(k === filterStatut ? '' : k)}
            className={`bg-white dark:bg-gray-900 rounded-xl p-3 border text-left transition-all ${
              filterStatut === k ? 'border-purple-400 dark:border-purple-600' : 'border-gray-100 dark:border-gray-800'
            }`}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{(() => { const Icon = v.icon; return Icon ? <Icon className="w-3 h-3 inline mr-1" /> : null })()} {v.label}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {vendeurs.filter((vd) => vd.statut === k).length}
            </p>
          </button>
        ))}
      </div>

      {/* Liste vendeurs */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Chargement...</div>
      ) : vendeurs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {debouncedSearch ? `Aucun résultat pour "${debouncedSearch}"` : 'Aucun vendeur trouvé'}
        </div>
      ) : (
        <div className="space-y-3">
          {vendeurs.map((v) => {
            const sc = statutConfig[v.statut] || { label: v.statut, color: '', icon: null as unknown as React.ElementType }
            return (
              <div
                key={v.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 hover:border-purple-300 dark:hover:border-purple-700 transition-all cursor-pointer"
                onClick={() => fetchDetail(v.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                        {v.nomBoutique || `${v.user.prenom} ${v.user.nom}`}
                      </p>
                      {v.nomBoutique && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">({v.user.prenom} {v.user.nom})</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{v.user.email || v.user.telephone}</p>
                    {/* Téléphone visible directement dans la liste */}
                    {v.user.telephone && v.user.email && (
                      <p className="text-xs text-gray-400 dark:text-gray-500"><Phone className="w-4 h-4 inline mr-1" />{' '}{v.user.telephone}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-400 dark:text-gray-500">
                      <span><Package className="w-4 h-4 inline mr-1" />{' '}{v._count.products} produits</span>
                      <span><ShoppingCart className="w-4 h-4 inline mr-1" />{' '}{v.totalCommandes} cmd</span>
                      <span><Banknote className="w-4 h-4 inline mr-1" />{' '}{v.chiffreAffaire.toLocaleString('fr-DZ')} DA</span>
                    </div>
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-1 rounded-full font-medium ${sc.color}`}>
                    {(() => { const Icon = sc.icon; return Icon ? <Icon className="w-3 h-3 inline mr-1" /> : null })()} {sc.label}
                  </span>
                </div>
                {v.documents.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.documents.map((d) => (
                      <span key={d.id} className={`text-xs px-2 py-0.5 rounded-full ${docStatutColor[d.statut] || ''}`}>
                        {d.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── Panel de détail ───────────────────────── (identique à l'original) */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 z-10">
              <div>
                <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
                  {selected.nomBoutique || `${selected.user.prenom} ${selected.user.nom}`}
                </h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statutConfig[selected.statut]?.color}`}>
                  {(() => { const Icon = statutConfig[selected.statut]?.icon; return Icon ? <Icon className="w-3 h-3 inline mr-1" /> : null })()} {statutConfig[selected.statut]?.label}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl p-1"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Nom', `${selected.user.prenom} ${selected.user.nom}`],
                  ['Email', selected.user.email || '—'],
                  ['Téléphone', selected.user.telephone || '—'],
                  ['Inscription', new Date(selected.createdAt).toLocaleDateString('fr-DZ')],
                  ['Produits', String((selected as any)._count?.products ?? 0)],
                  ['Commandes', String((selected as any).totalCommandes ?? 0)],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{k}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Chiffre d'affaires</p>
                <p className="text-xl font-bold">{(selected as any).chiffreAffaire?.toLocaleString('fr-DZ') ?? 0} DA</p>
              </div>

              {selected.adminNote && (
                <div className="bg-yellow-50 dark:bg-yellow-950 rounded-xl p-3 text-sm text-yellow-700 dark:text-yellow-300">
                  <span className="font-semibold">Note interne : </span>{selected.adminNote}
                </div>
              )}

              {selected.documents.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Pièces justificatives</h3>
                  <div className="space-y-3">
                    {selected.documents.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{doc.label}</p>
                            {doc.description && <p className="text-xs text-gray-400 dark:text-gray-500">{doc.description}</p>}
                          </div>
                          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${docStatutColor[doc.statut] || ''}`}>
                            {doc.statut}
                          </span>
                        </div>
                        {doc.adminNote && <p className="text-xs text-red-500 dark:text-red-400 mb-2">Note : {doc.adminNote}</p>}
                        {doc.fichier ? (
                          <div className="flex items-center gap-3">
                            <a href={`/api/admin/documents/${doc.fichier}`} target="_blank" rel="noopener noreferrer"
                              className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"><Paperclip className="w-4 h-4 inline mr-1" />{' '}Voir le fichier
                            </a>
                            {doc.statut === 'EN_ATTENTE' && (
                              <div className="flex gap-2 ml-auto">
                                <button onClick={() => setDocAction({ docId: doc.id, action: 'accepter', note: '' })}
                                  className="text-xs bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-all"><CheckCircle2 className="w-4 h-4 inline mr-1" />{' '}Accepter
                                </button>
                                <button onClick={() => setDocAction({ docId: doc.id, action: 'refuser', note: '' })}
                                  className="text-xs bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-3 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-all"><XCircle className="w-4 h-4 inline mr-1" />{' '}Refuser
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 dark:text-gray-500 italic">En attente du fichier du vendeur...</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Note interne (optionnelle)</label>
                <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={2}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  placeholder="Motif, commentaire..." />
              </div>

              {/* ── Clé API Flowmerce ── */}
              {selected.statut === 'APPROUVE' && (
                <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-0.5"><KeyRound className="w-4 h-4 inline mr-1" />{' '}Clé API Flowmerce</p>
                    <p className="text-xs text-indigo-500 dark:text-indigo-400">
                      Permet d'activer la gestion des retours pour ce vendeur.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={flowmerceKey}
                      onChange={e => setFlowmerceKey(e.target.value)}
                      placeholder="flk_xxxxxxxxxxxx"
                      className="flex-1 text-sm border border-indigo-200 dark:border-indigo-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      onClick={saveFlowmerceKey}
                      disabled={savingKey}
                      className="shrink-0 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                    >
                      {savingKey ? '...' : 'Sauver'}
                    </button>
                  </div>
                  {selected.flowmerceApiKey && (
                    <p className="text-xs text-indigo-400 dark:text-indigo-500">
                      ✅ Clé active : <span className="font-mono">{selected.flowmerceApiKey.slice(0, 8)}…</span>
                    </p>
                  )}
                  {!selected.flowmerceApiKey && (
                    <p className="text-xs text-orange-500"><AlertTriangle className="w-4 h-4 inline mr-1" />{' '}Aucune clé — les retours sont désactivés pour ce vendeur</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {(selected.statut === 'EN_ATTENTE' || selected.statut === 'PIECES_REQUISES') && (
                  <button onClick={() => doAction(selected.id, 'approuver')} disabled={saving}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm py-3 rounded-xl font-medium transition-all"><CheckCircle2 className="w-4 h-4 inline mr-1" />{' '}Approuver
                  </button>
                )}
                {selected.statut === 'APPROUVE' && (
                  <button onClick={() => doAction(selected.id, 'suspendre')} disabled={saving}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm py-3 rounded-xl font-medium transition-all"><Ban className="w-4 h-4 inline mr-1" />{' '}Suspendre
                  </button>
                )}
                {selected.statut === 'SUSPENDU' && (
                  <button onClick={() => doAction(selected.id, 'reactiver')} disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm py-3 rounded-xl font-medium transition-all"><Play className="w-4 h-4 inline mr-1" />{' '}Réactiver
                  </button>
                )}
                {selected.statut !== 'SUSPENDU' && (
                  <button onClick={() => { setNewDocs([]); setShowDocModal(true) }}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-3 rounded-xl font-medium transition-all"><ClipboardList className="w-4 h-4 inline mr-1" />{' '}Demander des pièces
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal action document */}
      {docAction && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-5">
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">
              {docAction.action === 'accepter' ? <><CheckCircle2 className="w-5 h-5" />{' '}Accepter le document</> : <><XCircle className="w-5 h-5" />{' '}Refuser le document</>}
            </h3>
            {docAction.action === 'refuser' && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Motif du refus *</label>
                <textarea value={docAction.note} onChange={(e) => setDocAction({ ...docAction, note: e.target.value })} rows={3}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  placeholder="Expliquez pourquoi le document est refusé..." />
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setDocAction(null)} className="flex-1 border border-gray-200 dark:border-gray-700 text-sm py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                Annuler
              </button>
              <button onClick={handleDocAction} disabled={saving || (docAction.action === 'refuser' && !docAction.note.trim())}
                className={`flex-1 text-white text-sm py-2.5 rounded-xl font-medium disabled:opacity-50 transition-all ${
                  docAction.action === 'accepter' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}>
                {saving ? '...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal demande de pièces */}
      {showDocModal && selected && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100"><ClipboardList className="w-4 h-4 inline mr-1" />{' '}Demander des pièces jointes</h3>
              <button onClick={() => setShowDocModal(false)} className="text-gray-400 text-xl"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sélectionnez les documents à demander. Le compte sera bloqué jusqu'à validation.
              </p>
              <div className="space-y-2">
                {DOC_TYPES.map((doc) => {
                  const checked = newDocs.some((d) => d.type === doc.type)
                  return (
                    <button key={doc.type} onClick={() => toggleNewDoc(doc)}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                        checked ? 'border-purple-400 bg-purple-50 dark:bg-purple-950 dark:border-purple-600'
                                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                      }`}>
                      <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                        checked ? 'bg-purple-600 border-purple-600' : 'border-gray-400'
                      }`}>
                        {checked && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{doc.label}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{doc.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Note pour le vendeur (optionnelle)</label>
                <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={2}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  placeholder="Instructions supplémentaires..." />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => setShowDocModal(false)} className="flex-1 border border-gray-200 dark:border-gray-700 text-sm py-2.5 rounded-xl text-gray-600 dark:text-gray-300">
                Annuler
              </button>
              <button onClick={() => doAction(selected.id, 'demander_pieces', { documents: newDocs })}
                disabled={saving || newDocs.length === 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm py-2.5 rounded-xl font-medium">
                {saving ? 'Envoi...' : `Demander (${newDocs.length})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}