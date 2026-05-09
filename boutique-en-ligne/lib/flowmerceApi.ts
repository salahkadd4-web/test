// lib/flowmerceApi.ts — CabaStore
//
// Couche d'intégration avec Flowmerce.
// Ce fichier est la SEULE source de vérité pour toute communication avec Flowmerce.
// Il peut être copié tel quel dans n'importe quelle autre plateforme Next.js.
//
// Variables d'environnement requises :
//   FLOWMERCE_URL=https://flowmerce.app         (URL de Flowmerce)
//   FLOWMERCE_API_KEY=flk_xxxx                  (clé API du compte admin CabaStore dans Flowmerce)
//
// Chaque vendeur CabaStore possède sa propre clé API Flowmerce stockée
// dans VendeurProfile.flowmerceApiKey — fournie manuellement par l'admin.

const FLOWMERCE_URL = (process.env.FLOWMERCE_URL || '').replace(/\/$/, '')

// ── Types publics ──────────────────────────────────────────────────────────

export interface FlowmerceSession {
  token:      string
  url:        string
  expires_at: string
}

export interface FlowmerceClaim {
  id:            string
  orderId:       string
  customerName:  string
  customerEmail: string
  productName:   string
  type:          'EXCHANGE' | 'REFUND' | 'REPAIR'
  status:        'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS'
  aiDecision:    string | null
  aiScore:       number | null
  fraudScore:    number | null
  source:        string
  createdAt:     string
  updatedAt:     string
  processedAt:   string | null
  prediction:    Record<string, unknown> | null
}

export interface FlowmerceClaimsResponse {
  claims: FlowmerceClaim[]
  meta: {
    total:       number
    limit:       number
    offset:      number
    vendor:      { id: string; companyName: string }
  }
}

// ── Helpers internes ───────────────────────────────────────────────────────

function headers(apiKey: string) {
  return {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }
}

function assertConfigured() {
  if (!FLOWMERCE_URL) throw new Error('FLOWMERCE_URL manquant dans .env')
}

// ── 1. Créer une session de retour ─────────────────────────────────────────
//
// Appeler quand le client clique "Faire un retour" sur une commande livrée.
// Retourne l'URL hébergée de Flowmerce à laquelle rediriger le client.
// Le formulaire de retour est entièrement géré par Flowmerce — aucun formulaire
// côté plateforme n'est nécessaire.

export async function createReturnSession(params: {
  apiKey:       string   // clé API Flowmerce du vendeur concerné
  orderId:      string
  customerEmail:string
  customerName: string
  productName:  string
  customerPhone?:string
  orderDate?:   string   // ISO-8601
  shopName?:    string
  expiresIn?:   number   // heures, défaut 72
}): Promise<FlowmerceSession> {
  assertConfigured()

  const res = await fetch(`${FLOWMERCE_URL}/api/return-sessions`, {
    method:  'POST',
    headers: headers(params.apiKey),
    body: JSON.stringify({
      order_id:       params.orderId,
      customer_email: params.customerEmail,
      customer_name:  params.customerName,
      product_name:   params.productName,
      customer_phone: params.customerPhone ?? '',
      order_date:     params.orderDate     ?? '',
      shop_name:      params.shopName      ?? '',
      expires_in:     params.expiresIn     ?? 72,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string; code?: string }
    throw Object.assign(
      new Error(err.error || `Flowmerce error ${res.status}`),
      { code: err.code, status: res.status }
    )
  }

  return res.json() as Promise<FlowmerceSession>
}

// ── 2. Lister les claims d'un vendeur ─────────────────────────────────────
//
// Utilisé par le dashboard vendeur dans CabaStore pour afficher ses retours.

export async function getVendeurClaims(params: {
  apiKey:   string
  status?:  'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS'
  limit?:   number
  offset?:  number
}): Promise<FlowmerceClaimsResponse> {
  assertConfigured()

  const url = new URL(`${FLOWMERCE_URL}/api/claims/external`)
  if (params.status) url.searchParams.set('status', params.status)
  if (params.limit)  url.searchParams.set('limit',  String(params.limit))
  if (params.offset) url.searchParams.set('offset', String(params.offset))

  const res = await fetch(url.toString(), { headers: headers(params.apiKey) })
  if (!res.ok) return { claims: [], meta: { total: 0, limit: 50, offset: 0, vendor: { id: '', companyName: '' } } }

  return res.json() as Promise<FlowmerceClaimsResponse>
}

// ── 3. Compter les claims d'un vendeur (pour dashboard KPIs) ──────────────

export async function countVendeurClaims(apiKey: string): Promise<{
  total:      number
  enAttente:  number
}> {
  if (!FLOWMERCE_URL || !apiKey) return { total: 0, enAttente: 0 }

  const [allRes, pendingRes] = await Promise.allSettled([
    getVendeurClaims({ apiKey, limit: 1 }),
    getVendeurClaims({ apiKey, status: 'PENDING', limit: 1 }),
  ])

  return {
    total:     allRes.status     === 'fulfilled' ? allRes.value.meta.total     : 0,
    enAttente: pendingRes.status === 'fulfilled' ? pendingRes.value.meta.total : 0,
  }
}

// ── 5. getFlowmerceClaims — tous les claims, usage admin ──────────────────
//
// Utilise FLOWMERCE_API_KEY (clé admin plateforme dans .env).
// Retourne les claims en snake_case pour compatibilité admin/page.tsx.

export interface FlowmerceAdminClaim {
  id:             string
  customer_name:  string
  customer_email: string
  product_name:   string
  status:         string
  aiDecision:     string | null
  order_total:    number
  createdAt:      string
}

export async function getFlowmerceClaims(params?: {
  status?: string
  limit?:  number
}): Promise<FlowmerceAdminClaim[]> {
  const adminKey = process.env.FLOWMERCE_API_KEY
  if (!FLOWMERCE_URL || !adminKey) return []

  try {
    const url = new URL(`${FLOWMERCE_URL}/api/claims/external`)
    if (params?.status) url.searchParams.set('status', params.status)
    url.searchParams.set('limit', String(params?.limit ?? 200))

    const res = await fetch(url.toString(), {
      headers: headers(adminKey),
      next: { revalidate: 60 },
    })
    if (!res.ok) return []

    const data = await res.json() as { claims: FlowmerceClaim[] }

    return data.claims.map(c => ({
      id:             c.id,
      customer_name:  c.customerName,
      customer_email: c.customerEmail,
      product_name:   c.productName,
      status:         c.status,
      aiDecision:     c.aiDecision,
      order_total:    (c.prediction as Record<string, number> | null)?.orderTotal ?? 0,
      createdAt:      c.createdAt,
    }))
  } catch {
    return []
  }
}