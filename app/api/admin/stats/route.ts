import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/stats — Statistiques globales avancées
export async function GET() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const [
    totalClients,
    totalVendeurs,
    totalVendeursApprouves,
    totalProduits,
    totalCommandes,
    caData,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.user.count({ where: { role: 'VENDEUR' } }),
    prisma.vendeurProfile.count({ where: { statut: 'APPROUVE' } }),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { statut: 'LIVREE' } }),
  ])

  // ── Meilleurs / Pires Vendeurs (par CA)
  const vendeursRaw = await prisma.vendeurProfile.findMany({
    where: { statut: 'APPROUVE' },
    include: {
      user: { select: { nom: true, prenom: true, email: true } },
      _count: { select: { products: true } },
    },
  })

  const vendeursAvecCA = await Promise.all(
    vendeursRaw.map(async (v) => {
      const [ca, nbCommandes] = await Promise.all([
        prisma.orderItem.aggregate({
          _sum: { prix: true },
          where: { product: { vendeurId: v.id }, order: { statut: 'LIVREE' } },
        }),
        prisma.orderItem.count({ where: { product: { vendeurId: v.id } } }),
      ])
      return {
        id:          v.id,
        nomBoutique: v.nomBoutique,
        user:        v.user,
        nbProduits:  v._count.products,
        nbCommandes,
        ca:          ca._sum.prix ?? 0,
      }
    })
  )
  vendeursAvecCA.sort((a, b) => b.ca - a.ca)
  const meilleursVendeurs = vendeursAvecCA.slice(0, 5)
  const pireVendeurs      = [...vendeursAvecCA].sort((a, b) => a.ca - b.ca).slice(0, 5)

  // ── Meilleurs / Pires Produits (par ventes)
  const topProduits = await prisma.product.findMany({
    select: {
      id: true, nom: true, prix: true, images: true,
      category: { select: { nom: true } },
      vendeur: { select: { nomBoutique: true } },
      _count: { select: { orderItems: true } },
    },
    orderBy: { orderItems: { _count: 'desc' } },
    take: 10,
  })
  const flopProduits = await prisma.product.findMany({
    where: { orderItems: { some: {} } },
    select: {
      id: true, nom: true, prix: true, images: true,
      category: { select: { nom: true } },
      vendeur: { select: { nomBoutique: true } },
      _count: { select: { orderItems: true } },
    },
    orderBy: { orderItems: { _count: 'asc' } },
    take: 10,
  })

  // ── Meilleures / Pires Catégories (par ventes)
  const categories = await prisma.category.findMany({
    where: { statut: 'APPROUVEE' },
    select: {
      id: true, nom: true,
      _count: { select: { products: true } },
    },
  })
  const catsAvecVentes = await Promise.all(
    categories.map(async (c) => {
      const ventes = await prisma.orderItem.count({
        where: { product: { categoryId: c.id } },
      })
      return { ...c, ventes }
    })
  )
  catsAvecVentes.sort((a, b) => b.ventes - a.ventes)
  const meilleuresCategories = catsAvecVentes.slice(0, 5)
  const piresCategories      = [...catsAvecVentes].sort((a, b) => a.ventes - b.ventes).slice(0, 5)

  // ── Meilleurs / Pires Clients (par CA)
  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    select: {
      id: true, nom: true, prenom: true, email: true, wilaya: true,
      _count: { select: { orders: true } },
    },
    take: 100,
    orderBy: { createdAt: 'asc' },
  })
  const clientsAvecCA = await Promise.all(
    clients.map(async (c) => {
      const ca = await prisma.order.aggregate({
        _sum: { total: true },
        where: { userId: c.id, statut: 'LIVREE' },
      })
      return { ...c, ca: ca._sum.total ?? 0 }
    })
  )
  clientsAvecCA.sort((a, b) => b.ca - a.ca)
  const meilleursClients = clientsAvecCA.slice(0, 5)
  const piresClients     = clientsAvecCA
    .filter((c) => c.ca > 0)
    .sort((a, b) => a.ca - b.ca)
    .slice(0, 5)

  return NextResponse.json({
    resume: {
      totalClients,
      totalVendeurs,
      totalVendeursApprouves,
      totalProduits,
      totalCommandes,
      chiffreAffaire: caData._sum.total ?? 0,
    },
    vendeurs:   { meilleurs: meilleursVendeurs, pires: pireVendeurs },
    produits:   { top: topProduits, flop: flopProduits },
    categories: { meilleures: meilleuresCategories, pires: piresCategories },
    clients:    { meilleurs: meilleursClients, pires: piresClients },
  })
}
