const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000'
const ML_API_KEY = process.env.ML_API_KEY || ''

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': ML_API_KEY,
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
  const res = await fetch(`${ML_API_URL}/api/v1/scan/history/${orderId}`, {
    headers,
  })
  if (!res.ok) return null
  return res.json()
}