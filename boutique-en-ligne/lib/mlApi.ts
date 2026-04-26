// lib/mlApi.ts — CabaStore v3
//
// Variables d'env requises dans Caba Store/.env :
//   ML_API_URL=http://localhost:8000
//   ML_API_KEY=dev-internal-key          ← doit = INTERNAL_API_KEY du serveur Python
//
// Lancer le serveur Python :
//   Windows : $env:INTERNAL_API_KEY="dev-internal-key"; uvicorn api.server:app --port 8000 --reload
//   Linux   : INTERNAL_API_KEY=dev-internal-key uvicorn api.server:app --port 8000 --reload

const ML_API_URL = (process.env.ML_API_URL || 'http://localhost:8000').replace(/\/$/, '')
const ML_API_KEY = process.env.ML_API_KEY || 'dev-internal-key'

// ── Types entrée ──────────────────────────────────────────────────────────

export interface MLPredictRequest {
  Customer_Age:             number
  Customer_Gender:          string
  Customer_Wilaya:          string
  Customer_Past_Returns:    number
  Product_Category:         string
  Product_Price_DA:         number
  Order_Quantity:           number
  Payment_Method:           string
  Shipping_Method:          string
  Shipping_Cost_DA:         number
  Days_to_Return:           number
  Within_Return_Policy:     boolean
  Return_Reason:            string
  Fraud_Score:              number
  Total_Amount_DA?:         number
  Shop_Return_Window_Days?: number
}

// ── Types sortie (normalisée pour CabaStore) ──────────────────────────────

export interface MLPredictResponse {
  shop_id:   string
  shop_name: string
  decision: {
    resolution:      'Refund' | 'Exchange' | 'Reject' | 'Repair'
    confidence:      number   // 0-100
    probabilities:   Record<string, number>   // valeurs 0-100
    policy_override: string | null
    shipping:        null     // retiré dans ML v3
    partial_refund:  null
  }
  policy_applied: {
    return_window_days:     number
    fraud_score_threshold:  number
    partial_refund_enabled: boolean
  }
  input_summary: {
    product_category:            string
    product_category_normalized: string
    price_da:       number
    days_to_return: number
    fraud_score:    number
    return_reason:  string
  }
  predicted_at: string
  risk_flag?: {
    is_suspicious:   boolean
    fraud_score:     number
    above_threshold: boolean
  }
}

// ── Appel principal ───────────────────────────────────────────────────────

export async function analyzeReturn(data: MLPredictRequest): Promise<MLPredictResponse> {
  const controller = new AbortController()
  const timeout    = setTimeout(() => controller.abort(), 10_000)

  let res: Response
  try {
    res = await fetch(`${ML_API_URL}/predict`, {
      method:  'POST',
      headers: {
        'Content-Type':   'application/json',
        'X-Internal-Key': ML_API_KEY,   // ← header attendu par le serveur FastAPI
      },
      body: JSON.stringify({
        Customer_Gender:         data.Customer_Gender,
        Customer_Age:            data.Customer_Age,
        Customer_Wilaya:         data.Customer_Wilaya,
        Customer_Past_Returns:   data.Customer_Past_Returns,
        Shop_Name:               'CabaStore',
        Product_Category:        data.Product_Category,
        Product_Price_DA:        data.Product_Price_DA,
        Order_Quantity:          data.Order_Quantity,
        Total_Amount_DA:         data.Total_Amount_DA ?? data.Product_Price_DA * data.Order_Quantity,
        Payment_Method:          data.Payment_Method,
        Shipping_Method:         data.Shipping_Method,
        Shipping_Cost_DA:        data.Shipping_Cost_DA,
        Return_Reason:           data.Return_Reason,
        Days_to_Return:          data.Days_to_Return,
        Shop_Return_Window_Days: data.Shop_Return_Window_Days ?? 30,
        Within_Return_Policy:    data.Within_Return_Policy ? 1 : 0,
        Fraud_Score:             data.Fraud_Score,
        // ⚠️  Customer_Satisfaction, Is_Suspicious, Refund_Amount_DA
        //     ont été retirés du schéma ML v3 (data leakage / calculé auto)
      }),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
    throw new Error((err as any).detail || `Erreur API ML (${res.status})`)
  }

  // ── Réponse brute du serveur FastAPI v3 ───────────────────────────────
  // {
  //   "resolution": {
  //     "prediction":    "Refund",
  //     "confidence":    0.85,        ← entre 0 et 1
  //     "probabilities": { "Exchange": 0.05, "Refund": 0.85, "Reject": 0.07, "Repair": 0.03 }
  //   },
  //   "risk_flag": {
  //     "is_suspicious":   false,
  //     "fraud_score":     12.0,
  //     "seuil_risque":    60,
  //     "above_threshold": false
  //   }
  // }

  const raw = await res.json()

  const resProbs: Record<string, number> = raw.resolution?.probabilities ?? {}

  // Convertir les probabilités 0-1 → 0-100 pour l'affichage
  const probabilities100 = Object.fromEntries(
    Object.entries(resProbs).map(([k, v]) => [k, Math.round((v as number) * 100 * 10) / 10])
  )

  // Confiance = valeur max des probabilités × 100
  const confidence100 = raw.resolution?.confidence != null
    ? Math.round(raw.resolution.confidence * 100 * 10) / 10
    : Math.max(...Object.values(resProbs as Record<string, number>), 0) * 100

  return {
    shop_id:   'cabastore',
    shop_name: 'CabaStore',
    decision: {
      resolution:      (raw.resolution?.prediction as any) ?? 'Reject',
      confidence:      confidence100,
      probabilities:   probabilities100,
      policy_override: null,
      shipping:        null,   // retiré dans ML v3
      partial_refund:  null,
    },
    policy_applied: {
      return_window_days:     30,
      fraud_score_threshold:  raw.risk_flag?.seuil_risque ?? 60,
      partial_refund_enabled: false,
    },
    input_summary: {
      product_category:            data.Product_Category,
      product_category_normalized: data.Product_Category,
      price_da:       data.Product_Price_DA,
      days_to_return: data.Days_to_Return,
      fraud_score:    data.Fraud_Score,
      return_reason:  data.Return_Reason,
    },
    predicted_at: new Date().toISOString(),
    risk_flag: raw.risk_flag ?? undefined,
  }
}

// ── Health check ──────────────────────────────────────────────────────────

export async function getMLHealth(): Promise<{
  status: string
  models_loaded: Record<string, boolean>
  online: boolean
}> {
  try {
    const res = await fetch(`${ML_API_URL}/health`, {
      headers: { 'X-Internal-Key': ML_API_KEY },
      signal:  AbortSignal.timeout(5000),
    })
    if (!res.ok) return { status: 'error', models_loaded: {}, online: false }
    const data = await res.json()
    return { ...data, online: data.status === 'ok' }
  } catch {
    return { status: 'offline', models_loaded: {}, online: false }
  }
}