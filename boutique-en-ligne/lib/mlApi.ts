// lib/mlApi.ts  — CabaStore
// Remplace le fichier existant dans ton projet CabaStore
//
// Variables d'env requises :
//   ML_API_URL=https://xxxx.ngrok-free.app   ← URL ngrok
//   ML_API_KEY=change-me                      ← doit = INTERNAL_API_SECRET dans la FastAPI

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000'
const ML_API_KEY = process.env.ML_API_KEY || 'change-me'

export interface MLPredictRequest {
  Customer_Age:            number
  Customer_Gender:         string
  Customer_Wilaya:         string
  Customer_Past_Returns:   number
  Product_Category:        string
  Product_Price_DA:        number
  Order_Quantity:          number
  Payment_Method:          string
  Shipping_Method:         string
  Shipping_Cost_DA:        number
  Days_to_Return:          number
  Within_Return_Policy:    boolean
  Return_Reason:           string
  Fraud_Score:             number
  Total_Amount_DA?:        number
  Shop_Return_Window_Days?: number
}

export interface MLPredictResponse {
  shop_id:   string
  shop_name: string
  decision: {
    resolution:      'Refund' | 'Exchange' | 'Reject' | 'Repair'
    confidence:      number
    probabilities:   Record<string, number>
    policy_override: string | null
    shipping: {
      responsible:   string
      confidence:    number
      probabilities: Record<string, number>
    } | null
    partial_refund: null
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
}

export async function analyzeReturn(data: MLPredictRequest): Promise<MLPredictResponse> {
  const res = await fetch(ML_API_URL + '/predict', {
    method:  'POST',
    headers: {
      'Content-Type':   'application/json',
      // La FastAPI Flowmerce attend X-Internal-Key (pas x-api-key)
      'X-Internal-Key': ML_API_KEY,
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
      Customer_Satisfaction:   3,
      Is_Suspicious:           data.Fraud_Score > 60 ? 1 : 0,
      Refund_Amount_DA:        data.Total_Amount_DA ?? data.Product_Price_DA * data.Order_Quantity,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
    throw new Error(err.detail || 'Erreur API ML')
  }

  const raw = await res.json()

  // Normaliser la réponse FastAPI → format attendu par CabaStore
  const resProbs = raw.resolution?.probabilities ?? {}
  const shipProbs = raw.shipping_paid_by?.probabilities ?? {}

  return {
    shop_id:   'cabastore',
    shop_name: 'CabaStore',
    decision: {
      resolution:      raw.resolution?.prediction ?? 'Reject',
      confidence:      Math.max(...Object.values(resProbs as Record<string, number>), 0) * 100,
      probabilities:   Object.fromEntries(
        Object.entries(resProbs).map(([k, v]) => [k, (v as number) * 100])
      ),
      policy_override: null,
      shipping: raw.shipping_paid_by ? {
        responsible:   raw.shipping_paid_by.prediction,
        confidence:    Math.max(...Object.values(shipProbs as Record<string, number>), 0) * 100,
        probabilities: Object.fromEntries(
          Object.entries(shipProbs).map(([k, v]) => [k, (v as number) * 100])
        ),
      } : null,
      partial_refund: null,
    },
    policy_applied: {
      return_window_days:     30,
      fraud_score_threshold:  60,
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
  }
}

export async function getMLStats() {
  const res = await fetch(ML_API_URL + '/health', {
    headers: { 'X-Internal-Key': ML_API_KEY },
  })
  return res.json()
}