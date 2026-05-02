// app/api/retours/flowmerce-webhook/route.ts — CabaStore
//
// Reçoit les notifications de Flowmerce (changement de statut d'un claim).
// Les données étant stockées dans Flowmerce, on se contente d'acquitter.

import { NextRequest, NextResponse }   from 'next/server'
import { FLOWMERCE_WEBHOOK_SECRET }    from '@/lib/flowmerceApi'

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-webhook-secret') || ''
    if (FLOWMERCE_WEBHOOK_SECRET && secret !== FLOWMERCE_WEBHOOK_SECRET) {
      console.warn('[Webhook] Secret invalide reçu:', secret?.slice(0, 8))
      return NextResponse.json({ error: 'Secret invalide' }, { status: 401 })
    }

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Body JSON invalide' }, { status: 400 })
    }

    const { claimId, status, resolution } = body as {
      claimId:    string | undefined
      status:     string | undefined
      resolution: string | undefined
    }

    console.log(`[Webhook Flowmerce] claimId=${claimId} status=${status} resolution=${resolution}`)

    return NextResponse.json({ ok: true, claimId, status, resolution })
  } catch (err) {
    console.error('[Webhook Flowmerce] Erreur:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
