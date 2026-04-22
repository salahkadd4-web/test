const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000'
const ML_API_KEY = process.env.ML_API_KEY || ''

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': ML_API_KEY,
}

// ── Étape 2 — Admin confirme la commande ─────────────────────
// Enregistre la photo du produit comme référence officielle
export async function registerProductReference(
  orderId:    string,
  productId:  string,
  imageB64:   string,
) {
  try {
    const res = await fetch(`${ML_API_URL}/api/v1/order/confirm`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        order_id:   orderId,
        product_id: productId,
        image_b64:  imageB64,
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.warn('Référence produit non enregistrée:', res.status)
      return null
    }
    return res.json()
  } catch (e) {
    console.warn('ML indisponible — référence non enregistrée')
    return null
  }
}

// ── Scan 1 — Vendeur avant expédition ────────────────────────
export async function scanProduct(orderId: string, imagesB64: string[]) {
  const res = await fetch(`${ML_API_URL}/api/v1/scan/product`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ order_id: orderId, images_b64: imagesB64 }),
  })
  if (!res.ok) throw new Error(`Scan 1 échoué: ${res.status}`)
  return res.json()
}

// ── Scan 2 — Client à la réception ───────────────────────────
export async function scanDelivery(orderId: string, imagesB64: string[]) {
  const res = await fetch(`${ML_API_URL}/api/v1/scan/delivery`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ order_id: orderId, images_b64: imagesB64 }),
  })
  if (!res.ok) throw new Error(`Scan 2 échoué: ${res.status}`)
  return res.json()
}

// ── Historique scans d'une commande ──────────────────────────
export async function getScanHistory(orderId: string) {
  try {
    const res = await fetch(`${ML_API_URL}/api/v1/scan/history/${orderId}`, {
      headers,
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
