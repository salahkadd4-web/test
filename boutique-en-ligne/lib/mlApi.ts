const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000'
const ML_API_KEY = process.env.ML_API_KEY || ''

export interface MLPredictRequest {
  Customer_Age: number
  Customer_Gender: string
  Customer_Wilaya: string
  Customer_Past_Returns: number
  Product_Category: string
  Product_Price_DA: number
  Order_Quantity: number
  Payment_Method: string
  Shipping_Method: string
  Shipping_Cost_DA: number
  Days_to_Return: number
  Within_Return_Policy: boolean
  Return_Reason: string
  Fraud_Score: number
  Total_Amount_DA?: number
  Shop_Return_Window_Days?: number
}

export interface MLPredictResponse {
  shop_id: string
  shop_name: string
  decision: {
    resolution: 'Refund' | 'Exchange' | 'Reject' | 'Repair'
    confidence: number
    probabilities: Record<string, number>
    policy_override: string | null
    shipping: {
      responsible: string
      confidence: number
      probabilities: Record<string, number>
    } | null
    partial_refund: {
      refund_percentage: number
      refund_amount_DA: number
      notes: string[]
    } | null
  }
  policy_applied: {
    return_window_days: number
    fraud_score_threshold: number
    partial_refund_enabled: boolean
  }
  input_summary: {
    product_category: string
    product_category_normalized: string
    price_da: number
    days_to_return: number
    fraud_score: number
    return_reason: string
  }
  predicted_at: string
}

export async function analyzeReturn(data: MLPredictRequest): Promise<MLPredictResponse> {
  const res = await fetch(ML_API_URL + '/api/v1/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ML_API_KEY,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Erreur API ML')
  }
  return res.json()
}

export async function getMLStats() {
  const res = await fetch(ML_API_URL + '/api/v1/stats', {
    headers: { 'x-api-key': ML_API_KEY },
  })
  return res.json()
}

export async function getMLConfig() {
  const res = await fetch(ML_API_URL + '/api/v1/config', {
    headers: { 'x-api-key': ML_API_KEY },
  })
  return res.json()
}