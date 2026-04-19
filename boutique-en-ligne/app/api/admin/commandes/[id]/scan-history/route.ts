import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/getAuthToken'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken()
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    // Appel à l'API ML pour l'historique des scans
    const res = await fetch(
      `${process.env.ML_API_URL}/api/v1/scan/history/${id}`,
      {
        headers: { 'x-api-key': process.env.ML_API_KEY || '' },
        signal: AbortSignal.timeout(5000),
      }
    )

    if (!res.ok) {
      return NextResponse.json({ order_id: id, total_scans: 0, scans: [] })
    }

    const data = await res.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Erreur scan history:', error)
    // Si ML indisponible — retourner vide sans erreur
    return NextResponse.json({ order_id: '', total_scans: 0, scans: [] })
  }
}
