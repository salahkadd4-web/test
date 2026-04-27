import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/getAuthToken'

async function checkAdmin(req: NextRequest) {
  const token = await getAuthToken()
  return token?.role === 'ADMIN' ? token : null
}

export async function GET(req: NextRequest) {
  try {
    const token = await checkAdmin(req)
    if (!token) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const vendeurId  = searchParams.get('vendeurId')
    const adminOnly  = searchParams.get('adminOnly') === 'true'
    const statut     = searchParams.get('statut')
    const categoryId = searchParams.get('categoryId')
    const clientId   = searchParams.get('clientId')
    const productId  = searchParams.get('productId')
    const search     = searchParams.get('search') || ''

    const where: any = {}

    if (vendeurId)  where.product = { ...where.product, vendeurId }
    if (adminOnly)  where.product = { ...where.product, vendeurId: null }
    if (categoryId) where.product = { ...where.product, categoryId }
    if (productId)  where.productId = productId
    if (clientId)   where.userId = clientId
    if (statut)     where.returnStatus = statut

    if (search) {
      where.OR = [
        { product: { nom: { contains: search, mode: 'insensitive' } } },
        { user: { nom:    { contains: search, mode: 'insensitive' } } },
        { user: { prenom: { contains: search, mode: 'insensitive' } } },
        { user: { email:  { contains: search, mode: 'insensitive' } } },
      ]
    }

    const retours = await prisma.return.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            nom:       true,
            prenom:    true,
            email:     true,
            telephone: true,
            // ← AJOUT : compteurs pour afficher nbr retours / nbr commandes
            _count: {
              select: {
                orders:  true,
                returns: true,
              },
            },
          },
        },
        product: {
          select: {
            nom: true, images: true, prix: true,
            category: { select: { nom: true } },
            vendeur:  { select: { id: true, nomBoutique: true } },
          },
        },
        order: {
          select: {
            id: true, total: true, createdAt: true,
            items: { select: { quantite: true, productId: true } },
          },
        },
      },
    })

    return NextResponse.json(retours)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}