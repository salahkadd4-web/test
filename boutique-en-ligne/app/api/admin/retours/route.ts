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
    const vendeurId    = searchParams.get('vendeurId')    // filtre par vendeur spécifique
    const adminOnly    = searchParams.get('adminOnly') === 'true' // produits admin (vendeurId null)
    const statut       = searchParams.get('statut')        // ← NOUVEAU filtre statut
    const categoryId   = searchParams.get('categoryId')   // ← NOUVEAU filtre catégorie
    const clientId     = searchParams.get('clientId')     // ← NOUVEAU filtre client
    const productId    = searchParams.get('productId')    // ← NOUVEAU filtre produit
    const search       = searchParams.get('search') || ''

    const where: any = {}

    // Filtre vendeur spécifique
    if (vendeurId) {
      where.product = { ...where.product, vendeurId }
    }

    // Filtre admin uniquement (produits sans vendeur)
    if (adminOnly) {
      where.product = { ...where.product, vendeurId: null }
    }

    // Filtre catégorie
    if (categoryId) {
      where.product = {
        ...where.product,
        categoryId,
      }
    }

    // Filtre produit
    if (productId) {
      where.productId = productId
    }

    // Filtre client
    if (clientId) {
      where.userId = clientId
    }

    // Filtre statut
    if (statut) {
      where.returnStatus = statut
    }

    // Filtre recherche
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
          select: { nom: true, prenom: true, email: true, telephone: true },
        },
        product: {
          select: {
            nom: true, images: true, prix: true,
            category: { select: { nom: true } },
            vendeur:  { select: { id: true, nomBoutique: true } }, // ← inclure vendeur
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