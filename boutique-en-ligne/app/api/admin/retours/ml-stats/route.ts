import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/getAuthToken'

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const res = await fetch(
      (process.env.ML_API_URL || 'http://localhost:8000') + '/api/v1/stats',
      { headers: { 'x-api-key': process.env.ML_API_KEY || '' } }
    )

    if (!res.ok) return NextResponse.json({ error: 'API ML indisponible' }, { status: 503 })

    const stats = await res.json()
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ error: 'API ML indisponible' }, { status: 503 })
  }
}