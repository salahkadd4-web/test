import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/getAuthToken'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken()
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    const commande = await prisma.order.findUnique({
      where:  { id },
      select: { scan2Done: true, scan2Result: true, updatedAt: true },
    })

    if (!commande || !commande.scan2Done) {
      return NextResponse.json({ order_id: id, total_scans: 0, scans: [] })
    }

    return NextResponse.json({
      order_id:    id,
      total_scans: 1,
      scans: [
        {
          decision:  commande.scan2Result ?? 'CONFIRME',
          scanned_at: commande.updatedAt.toISOString(),
        },
      ],
    })
  } catch (error) {
    console.error('Erreur scan history:', error)
    return NextResponse.json({ order_id: '', total_scans: 0, scans: [] })
  }
}
