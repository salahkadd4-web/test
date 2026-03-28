import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { registerProductReference } from '@/lib/scanApi'

async function checkAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  return token?.role === 'ADMIN' ? token : null
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { id } = await params
    const { statut } = await req.json()

    const validStatuts = ['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE', 'ANNULEE']
    if (!validStatuts.includes(statut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }

    const commande = await prisma.order.update({
      where: { id },
      data:  { statut },
      include: {
        items: {
          include: { product: { select: { id: true, images: true, nom: true } } },
          take: 1,
        },
      },
    })

    // ── Étape 2 : Enregistrer la photo de référence ──────────
    // Quand l'admin passe à CONFIRMEE, on enregistre la photo
    // du produit comme référence pour le scan vendeur
    if (statut === 'CONFIRMEE') {
      const item = commande.items[0]
      if (item?.product?.images?.[0]) {
        // Enregistrement asynchrone — ne bloque pas la réponse
        setImmediate(async () => {
          try {
            const imageUrl = item.product.images[0]

            // Timeout 15s pour Cloudinary
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 15000)

            const imgRes = await fetch(imageUrl, { signal: controller.signal })
            clearTimeout(timeout)

            if (imgRes.ok) {
              const buffer   = await imgRes.arrayBuffer()
              const base64   = Buffer.from(buffer).toString('base64')
              const mime     = imgRes.headers.get('content-type') || 'image/jpeg'
              const imageB64 = `data:${mime};base64,${base64}`

              const refResult = await registerProductReference(
                id,
                item.product.id,
                imageB64,
              )

              if (refResult) {
                console.log(`✅ Référence enregistrée — commande ${id.slice(-6)} — ${item.product.nom}`)
              }
            }
          } catch (refError: any) {
            // Ne jamais bloquer — juste un log
            if (refError?.cause?.code === 'UND_ERR_CONNECT_TIMEOUT') {
              console.warn(`⚠️ Timeout Cloudinary — référence non enregistrée pour commande ${id.slice(-6)}`)
            } else {
              console.warn('Référence ML non enregistrée:', refError?.message || refError)
            }
          }
        })
      }
    }

    return NextResponse.json(commande)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}