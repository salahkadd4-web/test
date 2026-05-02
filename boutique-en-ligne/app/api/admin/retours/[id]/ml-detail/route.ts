import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/getAuthToken'
import { getFlowmerceClaim } from '@/lib/flowmerceApi'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken()
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    const claim = await getFlowmerceClaim(id)
    if (!claim) return NextResponse.json({ error: 'Claim introuvable' }, { status: 404 })

    return NextResponse.json({
      shop_id:   'cabastore',
      shop_name: 'CabaStore',
      decision: {
        resolution:    claim.ml?.decision      ?? null,
        confidence:    claim.ml?.confidence    ?? null,
        probabilities: claim.ml?.probabilities ?? {},
      },
      input_summary: {
        return_reason:  claim.Return_Reason    ?? null,
        days_to_return: claim.Days_to_Return   ?? null,
        fraud_score:    claim.Fraud_Score      ?? null,
        is_suspicious:  claim.Is_Suspicious    ?? null,
      },
      predicted_at: claim.createdAt,
    })
  } catch (error) {
    console.error('Erreur ml-detail:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
