// app/api/vendeur/retours/[id]/route.ts — CabaStore v2
//
// PATCH : vendeur prend une décision sur un retour de ses produits
//
// body attendu :
// {
//   action:        'APPROVE_ML' | 'OVERRIDE'
//   finalDecision: 'Refund' | 'Exchange' | 'Repair' | 'Reject'  (requis si OVERRIDE)
//   vendeurNote:   string  (obligatoire si finalDecision = 'Reject', ≥ 10 car.)
// }
//
// APPROVE_ML  → applique la recommandation ML, returnStatus = APPROUVE
// OVERRIDE    → vendeur choisit une résolution différente, returnStatus = REFUSE

import { NextRequest, NextResponse }                from 'next/server'
import { auth }                                     from '@/auth'
import { prisma }                                   from '@/lib/prisma'
import { syncFlowmerceStatus, FlowmerceResolution } from '@/lib/flowmerceApi'

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

    // ── Vérifier que le vendeur est approuvé ──────────────────────────────
    const vendeur = await prisma.vendeurProfile.findUnique({
      where: { userId: session.user.id },
    })
    if (!vendeur || vendeur.statut !== 'APPROUVE') {
      return NextResponse.json({ error: 'Compte vendeur non approuvé' }, { status: 403 })
    }

    const { id } = await params

    // ── Parser le body ────────────────────────────────────────────────────
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

    // ── Vérifier que le retour appartient à un produit de ce vendeur ──────
    const retour = await prisma.return.findFirst({
      where: {
        id,
        product: { vendeurId: vendeur.id },
      },
      include: {
        product: { select: { nom: true, vendeurId: true } },
      },
    })

    if (!retour) {
      return NextResponse.json({ error: 'Retour introuvable ou non autorisé' }, { status: 404 })
    }
    if (retour.returnStatus !== 'EN_ATTENTE') {
      return NextResponse.json({ error: 'Ce retour a déjà été traité' }, { status: 409 })
    }

    // ── Calculer la décision finale ───────────────────────────────────────
    let newStatus:  'APPROUVE' | 'REFUSE'
    let resolution: FlowmerceResolution

    if (action === 'APPROVE_ML') {
      if (!retour.mlDecision || !VALID_RESOLUTIONS.includes(retour.mlDecision as FlowmerceResolution)) {
        return NextResponse.json(
          { error: 'Aucune recommandation ML disponible pour ce retour' },
          { status: 422 }
        )
      }
      newStatus  = 'APPROUVE'
      resolution = retour.mlDecision as FlowmerceResolution

    } else {
      // OVERRIDE
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
      newStatus  = 'REFUSE'
      resolution = finalDecision as FlowmerceResolution
    }

    // ── Mettre à jour en base ─────────────────────────────────────────────
    const updated = await prisma.return.update({
      where: { id },
      data: {
        returnStatus:  newStatus,
        finalDecision: resolution,
        finalNote:     (vendeurNote || '').trim() || null,
      },
    })

    // ── Synchroniser avec Flowmerce (best-effort, non bloquant) ──────────
    if (retour.flowmerceClaimId) {
      syncFlowmerceStatus(
        retour.flowmerceClaimId,
        newStatus === 'APPROUVE' ? 'APPROVED' : 'REJECTED',
        (vendeurNote || `Décision vendeur (${vendeur.nomBoutique || 'CabaStore'}) : ${resolution}`),
        resolution
      ).catch(err => console.error('[Vendeur PATCH] Flowmerce sync failed (non-bloquant):', err))
    }

    return NextResponse.json({
      retour:        updated,
      finalDecision: resolution,
      synced:        !!retour.flowmerceClaimId,
    })
  } catch (error) {
    console.error('[Vendeur PATCH retour]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}