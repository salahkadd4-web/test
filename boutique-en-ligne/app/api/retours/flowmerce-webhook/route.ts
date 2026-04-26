// app/api/retours/flowmerce-webhook/route.ts — CabaStore
//
// Reçoit les mises à jour de statut depuis Flowmerce
// Appelé par Flowmerce quand un vendeur/admin valide ou refuse un claim
//
// Sécurité : header X-Webhook-Secret doit correspondre à FLOWMERCE_WEBHOOK_SECRET

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { FLOWMERCE_WEBHOOK_SECRET } from '@/lib/flowmerceApi'

const STATUS_MAP: Record<string, 'EN_ATTENTE' | 'APPROUVE' | 'REFUSE'> = {
  APPROVED:    'APPROUVE',
  REJECTED:    'REFUSE',
  IN_PROGRESS: 'EN_ATTENTE',
  PENDING:     'EN_ATTENTE',
}

export async function POST(req: NextRequest) {
  try {
    // ── Vérification du secret ────────────────────────────────────────────
    const receivedSecret = req.headers.get('x-webhook-secret')
    if (!receivedSecret || receivedSecret !== FLOWMERCE_WEBHOOK_SECRET) {
      console.warn('[Flowmerce Webhook] Secret invalide reçu')
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await req.json()
    const { returnId, claimId, status, resolution, note } = body

    if (!returnId || !status) {
      return NextResponse.json({ error: 'Données manquantes (returnId, status)' }, { status: 400 })
    }

    const newStatus = STATUS_MAP[status]
    if (!newStatus) {
      return NextResponse.json({ error: `Statut inconnu : ${status}` }, { status: 400 })
    }

    // ── Retrouver le retour par flowmerceClaimId ou returnId ──────────────
    const retour = await prisma.return.findFirst({
      where: {
        OR: [
          { id: returnId },
          { flowmerceClaimId: claimId || '' },
        ],
      },
    })

    if (!retour) {
      console.warn(`[Flowmerce Webhook] Retour introuvable pour returnId=${returnId}`)
      return NextResponse.json({ error: 'Retour introuvable' }, { status: 404 })
    }

    // ── Mettre à jour le statut ───────────────────────────────────────────
    await prisma.return.update({
      where: { id: retour.id },
      data: {
        returnStatus:     newStatus,
        mlDecision:       resolution || retour.mlDecision,
        mlDecisionLabel:
          resolution === 'Refund'   ? 'Remboursement accordé (Flowmerce)'
          : resolution === 'Exchange' ? 'Échange accordé (Flowmerce)'
          : resolution === 'Repair'   ? 'Réparation accordée (Flowmerce)'
          : resolution === 'Reject'   ? 'Retour refusé (Flowmerce)'
          : retour.mlDecisionLabel,
        flowmerceSynced:  true,
      },
    })

    console.log(`[Flowmerce Webhook] Retour ${retour.id} → ${newStatus} (depuis claim ${claimId})`)
    return NextResponse.json({ ok: true, returnId: retour.id, newStatus })
  } catch (error) {
    console.error('[Flowmerce Webhook] Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
