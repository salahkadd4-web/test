import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/lib/prisma'
import { scanProduct } from '@/lib/scanApi'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { imagesB64 } = await req.json()

    if (!imagesB64 || !Array.isArray(imagesB64) || imagesB64.length === 0) {
      return NextResponse.json({ error: 'Au moins une image requise' }, { status: 400 })
    }

    const commande = await prisma.order.findUnique({ where: { id } })
    if (!commande) {
      return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
    }

    const scanResult = await scanProduct(id, imagesB64)

    await prisma.order.update({
      where: { id },
      data: {
        scan1Result:          scanResult.decision,
        scan1Done:            true,
        scan1ShippingAllowed: scanResult.shipping_allowed,
      },
    })

    return NextResponse.json(scanResult)
  } catch (error) {
    console.error('Erreur scan 1:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}