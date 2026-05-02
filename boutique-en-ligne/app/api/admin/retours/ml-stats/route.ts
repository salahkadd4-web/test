import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/getAuthToken'
import { getFlowmerceClaims } from '@/lib/flowmerceApi'

export async function GET(_req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const claims = await getFlowmerceClaims()

    const withDecision  = claims.filter(c => c.ml?.decision)
    const avgConfidence = withDecision.length
      ? withDecision.reduce((sum, c) => sum + (c.ml?.confidence ?? 0), 0) / withDecision.length
      : 0
    const fraudAlerts = claims.filter(c => (c.Fraud_Score ?? 0) > 60).length

    return NextResponse.json({
      total_decisions: withDecision.length,
      avg_confidence:  Math.round(avgConfidence * 10) / 10,
      total_alerts:    fraudAlerts,
      fraud_rate_pct:  claims.length ? Math.round((fraudAlerts / claims.length) * 100) : 0,
      ml_status:       'flowmerce',
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
