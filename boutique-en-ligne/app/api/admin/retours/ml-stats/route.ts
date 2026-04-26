// app/api/admin/retours/ml-stats/route.ts — CabaStore v2
//
// Le serveur FastAPI expose /health (pas /api/v1/stats)
// Header : X-Internal-Key (pas x-api-key)

import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken }              from '@/lib/getAuthToken'

export async function GET(_req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const mlUrl = (process.env.ML_API_URL || 'http://localhost:8000').replace(/\/$/, '')
    const mlKey = process.env.ML_API_KEY || 'dev-internal-key'

    const res = await fetch(`${mlUrl}/health`, {
      headers: { 'X-Internal-Key': mlKey },
      signal:  AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'API ML indisponible', ml_status: 'offline' },
        { status: 503 }
      )
    }

    const health = await res.json()

    // Adapter au format attendu par le dashboard admin
    return NextResponse.json({
      total_decisions:  0,
      avg_confidence:   0,
      total_alerts:     0,
      fraud_rate_pct:   0,
      ml_status:        health.status === 'ok' ? 'online' : 'offline',
      models_loaded:    health.models_loaded    ?? {},
      artifacts_loaded: health.artifacts_loaded ?? {},
      seuil_risque:     health.seuil_risque     ?? 60,
    })
  } catch {
    return NextResponse.json(
      { error: 'API ML indisponible', ml_status: 'offline' },
      { status: 503 }
    )
  }
}