// app/api/admin/retours/[id]/route.ts — CabaStore v2
//
// PATCH : admin prend une décision sur un retour
//
// body attendu :
// {
//   action:        'APPROVE_ML' | 'OVERRIDE'
//   finalDecision: 'Refund' | 'Exchange' | 'Repair' | 'Reject'  (requis si OVERRIDE)
//   adminNote:     string  (obligatoire si finalDecision = 'Reject', ≥ 10 car.)
// }
//
// APPROVE_ML  → applique la recommandation ML, returnStatus = APPROUVE
// OVERRIDE    → admin choisit une résolution différente, returnStatus = REFUSE

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/prisma'
import { getAuthToken }              from '@/lib/getAuthToken'
import { syncFlowmerceStatus, FlowmerceResolution } from '@/lib/flowmerceApi'

async function checkAdmin() {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

const VALID_RESOLUTIONS: FlowmerceResolution[] = ['Refund', 'Exchange', 'Repair', 'Reject']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin()
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    // ── Parser le body ────────────────────────────────────────────────────
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Body JSON invalide' }, { status: 400 })
    }

    const { action, finalDecision, adminNote } = body as {
      action:        string
      finalDecision: string | undefined
      adminNote:     string | undefined
    }

    if (!action || !['APPROVE_ML', 'OVERRIDE'].includes(action)) {
      return NextResponse.json(
        { error: "action invalide — attendu : 'APPROVE_ML' ou 'OVERRIDE'" },
        { status: 400 }
      )
    }

    // ── Récupérer le retour ───────────────────────────────────────────────
    const retour = await prisma.return.findUnique({ where: { id } })
    if (!retour) {
      return NextResponse.json({ error: 'Retour introuvable' }, { status: 404 })
    }
    if (retour.returnStatus !== 'EN_ATTENTE') {
      return NextResponse.json(
        { error: 'Ce retour a déjà été traité' },
        { status: 409 }
      )
    }

    // ── Calculer la décision finale ───────────────────────────────────────
    let newStatus:   'APPROUVE' | 'REFUSE'
    let resolution:  FlowmerceResolution

    if (action === 'APPROVE_ML') {
      // Admin approuve → on applique la recommandation ML telle quelle
      if (!retour.mlDecision || !VALID_RESOLUTIONS.includes(retour.mlDecision as FlowmerceResolution)) {
        return NextResponse.json(
          { error: 'Aucune recommandation ML disponible pour ce retour' },
          { status: 422 }
        )
      }
      newStatus  = 'APPROUVE'
      resolution = retour.mlDecision as FlowmerceResolution

    } else {
      // OVERRIDE → admin choisit une résolution différente
      if (!finalDecision || !VALID_RESOLUTIONS.includes(finalDecision as FlowmerceResolution)) {
        return NextResponse.json(
          { error: `finalDecision invalide — valeurs acceptées : ${VALID_RESOLUTIONS.join(', ')}` },
          { status: 400 }
        )
      }
      if (finalDecision === 'Reject') {
        const note = (adminNote || '').trim()
        if (note.length < 10) {
          return NextResponse.json(
            { error: 'adminNote obligatoire pour un Reject (minimum 10 caractères)' },
            { status: 422 }
          )
        }
      }
      newStatus  = 'REFUSE'
      resolution = finalDecision as FlowmerceResolution
    }

    // ── Mettre à jour en base ─────────────────────────────────────────────
    const updated = await prisma.return.update({
      where: { id },
      data: {
        returnStatus:  newStatus,
        finalDecision: resolution,
        finalNote:     (adminNote || '').trim() || null,
      },
    })

    // ── Synchroniser avec Flowmerce (best-effort, non bloquant) ──────────
    if (retour.flowmerceClaimId) {
      syncFlowmerceStatus(
        retour.flowmerceClaimId,
        newStatus === 'APPROUVE' ? 'APPROVED' : 'REJECTED',
        (adminNote || `Décision admin CabaStore : ${resolution}`),
        resolution
      ).catch(err => console.error('[Admin PATCH] Flowmerce sync failed (non-bloquant):', err))
    }

    return NextResponse.json({
      retour:       updated,
      finalDecision: resolution,
      synced:        !!retour.flowmerceClaimId,
    })
  } catch (error) {
    console.error('[Admin PATCH retour]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}