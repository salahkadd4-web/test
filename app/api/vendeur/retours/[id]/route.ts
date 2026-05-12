// app/api/vendeur/retours/[id]/route.ts — CabaStore
//
// PATCH : vendeur prend une décision sur un claim Flowmerce de ses produits

import { NextRequest, NextResponse }                        from 'next/server'
import { auth }                                             from '@/auth'
import { prisma }                                           from '@/lib/prisma'
import { getFlowmerceClaim, syncFlowmerceStatus, FlowmerceResolution } from '@/lib/flowmerceApi'

const VALID_RESOLUTIONS: FlowmerceResolution[] = ['Refund', 'Exchange', 'Repair', 'Reject']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'VENDEUR') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    const vendeur = await prisma.vendeurProfile.findUnique({
      where: { userId: session.user.id },
    })
    if (!vendeur || vendeur.statut !== 'APPROUVE') {
      return NextResponse.json({ error: 'Compte vendeur non approuvé' }, { status: 403 })
    }

    const { id } = await params

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Body JSON invalide' }, { status: 400 })
    }

    const { action, finalDecision, vendeurNote } = body as {
      action:        string
      finalDecision: string | undefined
      vendeurNote:   string | undefined
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

    // Vérifier que le produit appartient bien à ce vendeur
    if (claim.external_product_id) {
      const product = await prisma.product.findFirst({
        where: { id: claim.external_product_id, vendeurId: vendeur.id },
      })
      if (!product) return NextResponse.json({ error: 'Claim non autorisé' }, { status: 403 })
    }

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
          { error: `finalDecision invalide — valeurs : ${VALID_RESOLUTIONS.join(', ')}` },
          { status: 400 }
        )
      }
      if (finalDecision === 'Reject') {
        const note = (vendeurNote || '').trim()
        if (note.length < 10) {
          return NextResponse.json(
            { error: 'vendeurNote obligatoire pour un Reject (minimum 10 caractères)' },
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
      vendeurNote || `Décision vendeur (${vendeur.nomBoutique || 'CabaStore'}) : ${resolution}`,
      resolution
    )

    return NextResponse.json({ claimId: id, finalDecision: resolution, synced: true })
  } catch (error) {
    console.error('[Vendeur PATCH retour]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
