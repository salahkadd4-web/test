// app/api/admin/retours/[id]/route.ts — CabaStore
//
// PATCH : admin prend une décision sur un claim Flowmerce
//
// body attendu :
// {
//   action:        'APPROVE_ML' | 'OVERRIDE'
//   finalDecision: 'Refund' | 'Exchange' | 'Repair' | 'Reject'  (requis si OVERRIDE)
//   adminNote:     string  (obligatoire si finalDecision = 'Reject', ≥ 10 car.)
// }

import { NextRequest, NextResponse }                        from 'next/server'
import { getAuthToken }                                     from '@/lib/getAuthToken'
import { getFlowmerceClaim, syncFlowmerceStatus, FlowmerceResolution } from '@/lib/flowmerceApi'

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
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params

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

    // Récupérer le claim depuis Flowmerce
    const claim = await getFlowmerceClaim(id)
    if (!claim) return NextResponse.json({ error: 'Claim introuvable' }, { status: 404 })

    if (claim.status !== 'PENDING' && claim.status !== 'EN_ATTENTE') {
      return NextResponse.json({ error: 'Ce claim a déjà été traité' }, { status: 409 })
    }

    let newStatus:  'APPROVED' | 'REJECTED'
    let resolution: FlowmerceResolution

    if (action === 'APPROVE_ML') {
      if (!claim.ml?.decision || !VALID_RESOLUTIONS.includes(claim.ml.decision)) {
        return NextResponse.json(
          { error: 'Aucune recommandation ML disponible pour ce claim' },
          { status: 422 }
        )
      }
      newStatus  = 'APPROVED'
      resolution = claim.ml.decision

    } else {
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
      newStatus  = 'REJECTED'
      resolution = finalDecision as FlowmerceResolution
    }

    await syncFlowmerceStatus(
      id,
      newStatus,
      adminNote || `Décision admin CabaStore : ${resolution}`,
      resolution
    )

    return NextResponse.json({ claimId: id, finalDecision: resolution, synced: true })
  } catch (error) {
    console.error('[Admin PATCH retour]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
