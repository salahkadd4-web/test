// lib/flowmerceApi.ts — CabaStore v2
// Gère toute la communication entre CabaStore et l'API Flowmerce
//
// Variables d'env requises dans CabaStore :
//   FLOWMERCE_API_URL=https://votre-flowmerce.vercel.app  (ou http://localhost:3000)
//   FLOWMERCE_API_KEY=flo_xxxx                            ← clé API générée dans Flowmerce dashboard
//   FLOWMERCE_WEBHOOK_SECRET=secret-xyz                   ← partagé entre les deux apps
//   NEXTAUTH_URL=https://cabastore.vercel.app

const FLOWMERCE_URL      = (process.env.FLOWMERCE_API_URL || '').replace(/\/$/, '')
const FLOWMERCE_API_KEY  = process.env.FLOWMERCE_API_KEY  || ''
const CABA_URL           = (process.env.NEXTAUTH_URL || 'http://localhost:3001').replace(/\/$/, '')

export const FLOWMERCE_WEBHOOK_SECRET = process.env.FLOWMERCE_WEBHOOK_SECRET || 'change-me-in-prod'

// ── Types ──────────────────────────────────────────────────────────────────

export type FlowmerceResolution = 'Refund' | 'Exchange' | 'Repair' | 'Reject'

// Mapping raisons CabaStore → Flowmerce
const REASON_MAP: Record<string, string> = {
  DEFECTUEUX:      'DEFECTIVE',
  MAUVAIS_ARTICLE: 'WRONG_ITEM',
  CHANGEMENT_AVIS: 'CHANGE_MIND',
  NON_CONFORME:    'DESCRIPTION',
}

export interface FlowmerceCreatePayload {
  returnId:        string
  orderId:         string
  customerName:    string
  customerEmail:   string
  customerPhone?:  string
  productName:     string
  returnReason:    string   // clé enum CabaStore (DEFECTUEUX, etc.)
  description:     string
  mlDecision:      string | null
  mlConfidence:    number | null
  mlProbabilities: Record<string, number> | null
  fraudScore:      number
  orderDate:       string   // ISO string
  orderTotal:      number
}

export interface FlowmerceClaimCreated {
  claim: { id: string; status: string; createdAt: string }
}

// ── 1. Créer un claim dans Flowmerce depuis un retour CabaStore ────────────

export async function createFlowmerceClaim(
  data: FlowmerceCreatePayload
): Promise<FlowmerceClaimCreated> {
  if (!FLOWMERCE_URL || !FLOWMERCE_API_KEY) {
    throw new Error('FLOWMERCE_API_URL ou FLOWMERCE_API_KEY manquant dans .env')
  }

  const description = data.description?.trim().length >= 10
    ? data.description
    : `Retour CabaStore : ${data.productName}. Raison : ${data.returnReason}.`

  const res = await fetch(`${FLOWMERCE_URL}/api/claims/external`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${FLOWMERCE_API_KEY}`,
    },
    body: JSON.stringify({
      order_id:            data.orderId,
      customer_name:       data.customerName,
      customer_email:      data.customerEmail,
      customer_phone:      data.customerPhone || null,
      product_name:        data.productName,
      reason:              REASON_MAP[data.returnReason] || 'CHANGE_MIND',
      description,
      fraud_score:         data.fraudScore,
      ai_decision:         data.mlDecision,
      ai_confidence:       data.mlConfidence,
      ai_probabilities:    data.mlProbabilities,
      order_date:          data.orderDate,
      order_total:         data.orderTotal,
      // Métadonnées de synchronisation
      external_return_id:  data.returnId,
      external_source:     'cabastore',
      webhook_url:         `${CABA_URL}/api/retours/flowmerce-webhook`,
      webhook_secret:      FLOWMERCE_WEBHOOK_SECRET,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as any).error || `Flowmerce API error ${res.status}`)
  }

  return res.json() as Promise<FlowmerceClaimCreated>
}

// ── 2. Synchroniser le statut ET la résolution finale vers Flowmerce ───────
//    Appelé quand admin/vendeur prend une décision dans CabaStore
//
//  newStatus  : 'APPROVED' si admin approuve, 'REJECTED' si admin refuse/override
//  note       : note / motif (obligatoire si resolution = 'Reject')
//  resolution : décision finale humaine (Refund | Exchange | Repair | Reject)

export async function syncFlowmerceStatus(
  flowmerceClaimId: string,
  newStatus:        'APPROVED' | 'REJECTED',
  note?:            string,
  resolution?:      FlowmerceResolution
): Promise<void> {
  if (!FLOWMERCE_URL || !FLOWMERCE_API_KEY || !flowmerceClaimId) return

  await fetch(`${FLOWMERCE_URL}/api/claims/${flowmerceClaimId}`, {
    method:  'PATCH',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${FLOWMERCE_API_KEY}`,
    },
    body: JSON.stringify({
      status:         newStatus,
      aiDecision:     resolution ?? null,   // ← décision finale transmise à Flowmerce
      overrideNote:   note || null,
      _from_external: true,                  // anti-boucle webhook
    }),
  })
  // Best-effort — on ignore les erreurs de sync pour ne pas bloquer CabaStore
}

// ── 3. URL du dashboard Flowmerce (pour les liens dans les pages admin/vendeur)

export function getFlowmerceClaimUrl(_flowmerceClaimId: string): string {
  return `${FLOWMERCE_URL}/dashboard/claims`
}