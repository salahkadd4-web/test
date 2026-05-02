// lib/flowmerceApi.ts — CabaStore
// Variables d'env requises :
//   FLOWMERCE_API_URL=http://localhost:3000  (ou URL de prod)
//   FLOWMERCE_API_KEY=flk_xxxx
//   FLOWMERCE_WEBHOOK_SECRET=secret-xyz
//   NEXTAUTH_URL=http://localhost:3001

const FLOWMERCE_URL     = (process.env.FLOWMERCE_API_URL || '').replace(/\/$/, '')
const FLOWMERCE_API_KEY = process.env.FLOWMERCE_API_KEY  || ''
const CABA_URL          = (process.env.NEXTAUTH_URL || 'http://localhost:3001').replace(/\/$/, '')

export const FLOWMERCE_WEBHOOK_SECRET = process.env.FLOWMERCE_WEBHOOK_SECRET || 'change-me-in-prod'

// ── Types ──────────────────────────────────────────────────────────────────

export type FlowmerceResolution = 'Refund' | 'Exchange' | 'Repair' | 'Reject'

export interface FlowmerceCreatePayload {
  returnId:       string
  orderId:        string
  customerName:   string
  customerEmail:  string
  customerPhone?: string
  productName:    string
  description:    string
  orderDate:      string
  orderTotal:     number
  // Identifiants externes pour enrichissement côté CabaStore
  external_product_id?:    string
  external_return_reason?: string
  desired_resolution?:     string
  // Données ML
  Customer_Gender:         string
  Customer_Age:            number
  Customer_Wilaya:         string
  Customer_Past_Returns:   number
  Product_Category:        string
  Product_Price_DA:        number
  Order_Quantity:          number
  Total_Amount_DA:         number
  Payment_Method:          string
  Shipping_Method:         string
  Shipping_Cost_DA:        number
  Return_Reason:           string
  Days_to_Return:          number
  Shop_Return_Window_Days: number
  Within_Return_Policy:    0 | 1
  Fraud_Score:             number
  Customer_Satisfaction:   number
  Is_Suspicious:           0 | 1
}

// Réponse de Flowmerce à la création
export interface FlowmerceClaimCreated {
  claim: { id: string; status: string; createdAt: string }
  ml?: {
    decision:      FlowmerceResolution
    confidence:    number
    probabilities: Record<string, number>
  }
  risk_flag?: {
    is_suspicious:   boolean
    fraud_score:     number
    above_threshold: boolean
  }
}

// Claim complet retourné par les endpoints GET
export interface FlowmerceClaim {
  id:                      string
  status:                  string
  createdAt:               string
  order_id:                string
  customer_name:           string
  customer_email:          string
  customer_phone:          string | null
  product_name:            string
  description:             string | null
  order_date:              string
  order_total:             number
  external_return_id?:     string
  external_product_id?:    string
  external_return_reason?: string
  external_source?:        string
  Return_Reason?:          string
  Days_to_Return?:         number
  Fraud_Score?:            number
  Is_Suspicious?:          number
  ml?: {
    decision:      FlowmerceResolution
    confidence:    number
    probabilities: Record<string, number>
  }
  risk_flag?: {
    is_suspicious:   boolean
    fraud_score:     number
    above_threshold: boolean
  }
  aiDecision?:   FlowmerceResolution | null
  overrideNote?: string | null
}

// Mapping raisons (enum OU chaîne française) → valeurs attendues par Flowmerce
const FLOWMERCE_REASON_MAP: Record<string, string> = {
  // Clés enum (ancien format)
  DEFECTUEUX:      'DEFECTIVE',
  MAUVAIS_ARTICLE: 'WRONG_ITEM',
  CHANGEMENT_AVIS: 'CHANGE_MIND',
  NON_CONFORME:    'DESCRIPTION',
  // Chaînes françaises (nouveau format)
  'Produit défectueux':          'DEFECTIVE',
  'Produit contrefait':          'DEFECTIVE',
  'Produit endommagé livraison': 'DEFECTIVE',
  "Changement d'avis":           'CHANGE_MIND',
  'Panne après utilisation':     'DEFECTIVE',
  'Mauvaise taille':             'DESCRIPTION',
  'Allergie/Réaction':           'DEFECTIVE',
  'Ne correspond pas':           'DESCRIPTION',
  'Erreur de commande vendeur':  'WRONG_ITEM',
  'Pièces manquantes':           'WRONG_ITEM',
}

// ── Headers communs ────────────────────────────────────────────────────────

function authHeaders() {
  return {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${FLOWMERCE_API_KEY}`,
  }
}

// ── 1. Créer un claim dans Flowmerce ──────────────────────────────────────

export async function createFlowmerceClaim(
  data: FlowmerceCreatePayload
): Promise<FlowmerceClaimCreated> {
  if (!FLOWMERCE_URL || !FLOWMERCE_API_KEY) {
    throw new Error('FLOWMERCE_API_URL ou FLOWMERCE_API_KEY manquant dans .env')
  }

  const description = data.description?.trim().length >= 10
    ? data.description
    : `Retour CabaStore : ${data.productName}.`

  const res = await fetch(`${FLOWMERCE_URL}/api/claims/external`, {
    method:  'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      order_id:                data.orderId,
      customer_name:           data.customerName,
      customer_email:          data.customerEmail,
      customer_phone:          data.customerPhone || null,
      product_name:            data.productName,
      description,
      order_date:              data.orderDate,
      order_total:             data.orderTotal,
      external_return_id:      data.returnId,
      external_product_id:     data.external_product_id || null,
      external_return_reason:  data.external_return_reason || null,
      desired_resolution:      data.desired_resolution     || null,
      external_source:         'cabastore',
      webhook_url:             `${CABA_URL}/api/retours/flowmerce-webhook`,
      webhook_secret:          FLOWMERCE_WEBHOOK_SECRET,
      Customer_Gender:         data.Customer_Gender,
      Customer_Age:            data.Customer_Age,
      Customer_Wilaya:         data.Customer_Wilaya,
      Customer_Past_Returns:   data.Customer_Past_Returns,
      Shop_Name:               'CabaStore',
      Product_Category:        data.Product_Category,
      Product_Price_DA:        data.Product_Price_DA,
      Order_Quantity:          data.Order_Quantity,
      Total_Amount_DA:         data.Total_Amount_DA,
      Payment_Method:          data.Payment_Method,
      Shipping_Method:         data.Shipping_Method,
      Shipping_Cost_DA:        data.Shipping_Cost_DA,
      reason:                  FLOWMERCE_REASON_MAP[data.external_return_reason || ''] || data.Return_Reason,
      Return_Reason:           data.Return_Reason,
      Days_to_Return:          data.Days_to_Return,
      Shop_Return_Window_Days: data.Shop_Return_Window_Days,
      Within_Return_Policy:    data.Within_Return_Policy,
      Fraud_Score:             data.Fraud_Score,
      Customer_Satisfaction:   data.Customer_Satisfaction,
      Is_Suspicious:           data.Is_Suspicious,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string }
    throw new Error(err.error || `Flowmerce API error ${res.status}`)
  }

  return res.json() as Promise<FlowmerceClaimCreated>
}

// ── 2. Lister les claims depuis Flowmerce ─────────────────────────────────

export async function getFlowmerceClaims(params?: {
  status?:        string
  customerEmail?: string
}): Promise<FlowmerceClaim[]> {
  if (!FLOWMERCE_URL || !FLOWMERCE_API_KEY) return []

  const url = new URL(`${FLOWMERCE_URL}/api/claims/external`)
  url.searchParams.set('source', 'cabastore')
  if (params?.status)        url.searchParams.set('status', params.status)
  if (params?.customerEmail) url.searchParams.set('customer_email', params.customerEmail)

  const res = await fetch(url.toString(), { headers: authHeaders() })
  if (!res.ok) return []
  return res.json() as Promise<FlowmerceClaim[]>
}

// ── 3. Récupérer un claim par ID ──────────────────────────────────────────

export async function getFlowmerceClaim(id: string): Promise<FlowmerceClaim | null> {
  if (!FLOWMERCE_URL || !FLOWMERCE_API_KEY || !id) return null

  const res = await fetch(`${FLOWMERCE_URL}/api/claims/${id}`, {
    headers: authHeaders(),
  })
  if (!res.ok) return null
  return res.json() as Promise<FlowmerceClaim>
}

// ── 4. Compter les claims passés d'un client (pour fraud score) ───────────

export async function countFlowmerceClaimsByCustomer(email: string): Promise<number> {
  const claims = await getFlowmerceClaims({ customerEmail: email })
  return claims.length
}

// ── 5. Synchroniser le statut ET la résolution finale vers Flowmerce ──────

export async function syncFlowmerceStatus(
  flowmerceClaimId: string,
  newStatus:        'APPROVED' | 'REJECTED',
  note?:            string,
  resolution?:      FlowmerceResolution
): Promise<void> {
  if (!FLOWMERCE_URL || !FLOWMERCE_API_KEY || !flowmerceClaimId) return

  await fetch(`${FLOWMERCE_URL}/api/claims/${flowmerceClaimId}`, {
    method:  'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({
      status:         newStatus,
      aiDecision:     resolution ?? null,
      overrideNote:   note || null,
      _from_external: true,
    }),
  })
}

// ── 6. URL du dashboard Flowmerce ─────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getFlowmerceClaimUrl(_flowmerceClaimId: string): string {
  return `${FLOWMERCE_URL}/dashboard/claims`
}
