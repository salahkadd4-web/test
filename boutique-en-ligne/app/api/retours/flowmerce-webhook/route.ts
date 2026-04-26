// app/api/retours/flowmerce-webhook/route.ts — CabaStore v2
//
// Reçoit les mises à jour de statut depuis Flowmerce
// Appelé par Flowmerce quand un vendeur prend une décision DANS Flowmerce
//
// Body attendu :
// {
//   returnId:   string    ← ID du Return dans CabaStore
//   claimId:    string    ← ID du Claim dans Flowmerce
//   status:     'APPROVED' | 'REJECTED' | 'IN_PROGRESS'
//   resolution: 'Refund' | 'Exchange' | 'Repair' | 'Reject' | null
//   source:     'flowmerce'
// }

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/prisma'
import { FLOWMERCE_WEBHOOK_SECRET }  from '@/lib/flowmerceApi'

// Mapping statut Flowmerce → ReturnStatus CabaStore
const STATUS_MAP: Record<string, string> = {
  APPROVED:    'APPROUVE',
  REJECTED:    'REFUSE',
  IN_PROGRESS: 'EN_ATTENTE',
  PENDING:     'EN_ATTENTE',
}

export async function POST(req: NextRequest) {
  try {
    // ── 1. Vérifier le secret webhook ────────────────────────────────────
    const secret = req.headers.get('x-webhook-secret') || ''
    if (FLOWMERCE_WEBHOOK_SECRET && secret !== FLOWMERCE_WEBHOOK_SECRET) {
      console.warn('[Webhook] Secret invalide reçu:', secret?.slice(0, 8))
      return NextResponse.json({ error: 'Secret invalide' }, { status: 401 })
    }

    // ── 2. Parser le body ─────────────────────────────────────────────────
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Body JSON invalide' }, { status: 400 })
    }

    const { returnId, claimId, status, resolution, source } = body as {
      returnId:   string | undefined
      claimId:    string | undefined
      status:     string | undefined
      resolution: string | undefined
      source:     string | undefined
    }

    console.log(`[Webhook Flowmerce] returnId=${returnId} status=${status} resolution=${resolution}`)

    if (!returnId) {
      return NextResponse.json({ error: 'returnId manquant' }, { status: 400 })
    }

    // ── 3. Récupérer le retour ────────────────────────────────────────────
    const retour = await prisma.return.findUnique({ where: { id: returnId } })
    if (!retour) {
      // Idempotent : pas d'erreur si déjà supprimé
      return NextResponse.json({ ok: true, skipped: 'return not found' })
    }

    // Ne pas écraser une décision déjà prise dans CabaStore
    // (le webhook Flowmerce est reçu UNIQUEMENT quand Flowmerce prend l'initiative,
    //  pas quand CabaStore a déjà synchronisé avec _from_external: true)
    if (retour.returnStatus !== 'EN_ATTENTE') {
      return NextResponse.json({ ok: true, skipped: 'already processed in CabaStore' })
    }

    // ── 4. Mettre à jour en base ──────────────────────────────────────────
    const newStatus = status ? (STATUS_MAP[status] ?? 'EN_ATTENTE') : 'EN_ATTENTE'

    await prisma.return.update({
      where: { id: returnId },
      data: {
        returnStatus:    newStatus as any,
        finalDecision:   resolution || null,
        flowmerceSynced: true,
        flowmerceClaimId: claimId || retour.flowmerceClaimId,
      },
    })

    console.log(`[Webhook Flowmerce] ✓ Retour ${returnId} → ${newStatus} / ${resolution}`)

    return NextResponse.json({ ok: true, returnId, newStatus, resolution })
  } catch (err) {
    console.error('[Webhook Flowmerce] Erreur:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}