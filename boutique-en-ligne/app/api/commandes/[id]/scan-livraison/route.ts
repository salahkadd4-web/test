import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/getAuthToken'
import { prisma } from '@/lib/prisma'
import Pusher from 'pusher'

const pusher = new Pusher({
  appId:   process.env.PUSHER_APP_ID!,
  key:     process.env.PUSHER_KEY!,
  secret:  process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS:  true,
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = await getAuthToken()
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { imagesB64 } = await req.json()

    if (!imagesB64 || !Array.isArray(imagesB64) || imagesB64.length === 0) {
      return NextResponse.json({ error: 'Au moins une image requise' }, { status: 400 })
    }

    const commande = await prisma.order.findFirst({
      where: { id, userId: token.id as string, statut: 'EXPEDIEE' },
      include: { user: { select: { nom: true, prenom: true } } },
    })
    if (!commande) {
      return NextResponse.json({ error: 'Commande introuvable ou non expédiée' }, { status: 404 })
    }

    // Essayer le scan ML — si indisponible, continuer quand même
    let scanResult: any = {
      decision:           'CONFIRME_SANS_ML',
      delivery_confirmed: true,
      message:            'Réception confirmée ✅',
      similarity_pct:     null,
    }

    try {
      const mlRes = await fetch(`${process.env.ML_API_URL}/api/v1/scan/delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':    process.env.ML_API_KEY || '',
        },
        body: JSON.stringify({ order_id: id, images_b64: imagesB64 }),
        signal: AbortSignal.timeout(5000),
      })
      if (mlRes.ok) {
        const mlData = await mlRes.json()
        scanResult = {
          ...mlData,
          delivery_confirmed: true,
          message: mlData.delivery_confirmed
            ? 'Réception confirmée ✅ Produit conforme'
            : `Réception confirmée ✅ (Note: ${mlData.message || mlData.decision})`,
        }
      }
    } catch (mlError) {
      console.warn('API ML indisponible — livraison confirmée sans scan')
    }

    // Mettre à jour le statut en DB
    await prisma.order.update({
      where: { id },
      data: {
        statut:      'LIVREE',
        scan2Result: scanResult.decision,
        scan2Done:   true,
      },
    })

    // ── Notifier l'admin en temps réel via Pusher ─────────
    await pusher.trigger('admin-commandes', 'statut-change', {
      commandeId: id,
      statut:     'LIVREE',
      client:     `${commande.user.prenom} ${commande.user.nom}`,
      message:    '📦 Client a confirmé la réception par scan',
      updatedAt:  new Date().toISOString(),
    })

    return NextResponse.json({
      ...scanResult,
      delivery_confirmed: true,
      message: scanResult.message || 'Réception confirmée ✅',
    })

  } catch (error) {
    console.error('Erreur scan livraison:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
