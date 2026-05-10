import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  Gem,
  Moon,
  Star,
  Tag,
  TrendingDown,
  Trophy,
} from 'lucide-react'

async function getStats() {
  const [
    totalClients,
    totalVendeurs,
    totalVendeursApprouves,
    totalProduits,
    totalCommandes,
    totalRetours,
    caData,
  ] = await Promise.all([
    prisma.user.count({
      where: { role: 'CLIENT' },
    }),

    prisma.user.count({
      where: { role: 'VENDEUR' },
    }),

    prisma.vendeurProfile.count({
      where: { statut: 'APPROUVE' },
    }),

    prisma.product.count(),

    prisma.order.count(),

    prisma.order.count({
      where: { retourDemande: true },
    }),

    prisma.order.aggregate({
      _sum: { total: true },
      where: { statut: 'LIVREE' },
    }),
  ])

  // Top produits
  const topProduits = await prisma.product.findMany({
    select: {
      id: true,
      nom: true,
      prix: true,
      images: true,

      category: {
        select: {
          nom: true,
        },
      },

      vendeur: {
        select: {
          nomBoutique: true,
        },
      },

      _count: {
        select: {
          orderItems: true,
        },
      },
    },

    orderBy: {
      orderItems: {
        _count: 'desc',
      },
    },

    take: 5,
  })

  // Flop produits
  const flopProduits = await prisma.product.findMany({
    where: {
      orderItems: {
        some: {},
      },
    },

    select: {
      id: true,
      nom: true,
      prix: true,
      images: true,

      category: {
        select: {
          nom: true,
        },
      },

      vendeur: {
        select: {
          nomBoutique: true,
        },
      },

      _count: {
        select: {
          orderItems: true,
        },
      },
    },

    orderBy: {
      orderItems: {
        _count: 'asc',
      },
    },

    take: 5,
  })

  // Catégories
  const categories = await prisma.category.findMany({
    where: {
      statut: 'APPROUVEE',
    },

    select: {
      id: true,
      nom: true,

      _count: {
        select: {
          products: true,
        },
      },
    },
  })

  const catsAvecVentes = await Promise.all(
    categories.map(async (c) => {
      const ventes = await prisma.orderItem.count({
        where: {
          product: {
            categoryId: c.id,
          },
        },
      })

      return {
        ...c,
        ventes,
      }
    })
  )

  catsAvecVentes.sort((a, b) => b.ventes - a.ventes)

  // Vendeurs
  const vendeursRaw = await prisma.vendeurProfile.findMany({
    where: {
      statut: 'APPROUVE',
    },

    include: {
      user: {
        select: {
          nom: true,
          prenom: true,
        },
      },

      _count: {
        select: {
          products: true,
        },
      },
    },
  })

  const vendeursAvecCA = await Promise.all(
    vendeursRaw.map(async (v) => {
      const [ca, nb] = await Promise.all([
        prisma.orderItem.aggregate({
          _sum: {
            prix: true,
          },

          where: {
            product: {
              vendeurId: v.id,
            },

            order: {
              statut: 'LIVREE',
            },
          },
        }),

        prisma.orderItem.count({
          where: {
            product: {
              vendeurId: v.id,
            },
          },
        }),
      ])

      return {
        ...v,
        ca: ca._sum.prix ?? 0,
        nb,
      }
    })
  )

  vendeursAvecCA.sort((a, b) => b.ca - a.ca)

  // Clients
  const clients = await prisma.user.findMany({
    where: {
      role: 'CLIENT',
    },

    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,

      _count: {
        select: {
          orders: true,
          returns: true,
        },
      },
    },

    take: 50,
  })

  const clientsAvecCA = await Promise.all(
    clients.map(async (c) => {
      const ca = await prisma.order.aggregate({
        _sum: {
          total: true,
        },

        where: {
          userId: c.id,
          statut: 'LIVREE',
        },
      })

      return {
        ...c,
        ca: ca._sum.total ?? 0,
      }
    })
  )

  clientsAvecCA.sort((a, b) => b.ca - a.ca)

  return {
    resume: {
      totalClients,
      totalVendeurs,
      totalVendeursApprouves,
      totalProduits,
      totalCommandes,
      totalRetours,
      ca: caData._sum.total ?? 0,
    },

    topProduits,
    flopProduits,

    topCategories: catsAvecVentes.slice(0, 5),

    flopCategories: [...catsAvecVentes]
      .sort((a, b) => a.ventes - b.ventes)
      .slice(0, 5),

    topVendeurs: vendeursAvecCA.slice(0, 5),

    flopVendeurs: [...vendeursAvecCA]
      .sort((a, b) => a.ca - b.ca)
      .slice(0, 5),

    topClients: clientsAvecCA.slice(0, 5),

    flopClients: clientsAvecCA
      .filter((c) => c.ca > 0)
      .sort((a, b) => a.ca - b.ca)
      .slice(0, 5),
  }
}

function StatTable({
  title,
  icon,
  rows,
  getValue,
  getLabel,
  getSubLabel,
}: {
  title: string
  icon: React.ElementType
  rows: any[]
  getValue: (r: any) => string
  getLabel: (r: any) => string
  getSubLabel?: (r: any) => string
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {(() => {
            const Icon = icon

            return <Icon className="w-4 h-4 inline mr-1" />
          })()}

          {title}
        </h3>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-800">
        {rows.length === 0 ? (
          <p className="p-4 text-xs text-gray-400 text-center">
            Aucune donnée
          </p>
        ) : (
          rows.map((r, i) => (
            <div
              key={r.id}
              className="p-3 flex items-center gap-3"
            >
              <span
                className={`text-lg font-bold shrink-0 w-6 ${
                  i === 0
                    ? 'text-yellow-400'
                    : i === 1
                    ? 'text-gray-400'
                    : i === 2
                    ? 'text-amber-600'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              >
                {i + 1}
              </span>

              {r.images?.[0] && (
                <img
                  src={r.images[0]}
                  alt={r.nom}
                  className="w-8 h-8 rounded-lg object-cover shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {getLabel(r)}
                </p>

                {getSubLabel && (
                  <p className="text-xs text-gray-400 truncate">
                    {getSubLabel(r)}
                  </p>
                )}
              </div>

              <p className="text-sm font-bold text-gray-700 dark:text-gray-200 shrink-0">
                {getValue(r)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default async function AdminStatsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/connexion')
  }

  const stats = await getStats()

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Statistiques avancées
      </h1>

      {/* Résumé */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          {
            label: 'CA Total',
            value: `${stats.resume.ca.toLocaleString('fr-DZ')} DA`,
            dark: true,
          },

          {
            label: 'Commandes',
            value: stats.resume.totalCommandes,
          },

          {
            label: 'Clients',
            value: stats.resume.totalClients,
          },

          {
            label: 'Vendeurs actifs',
            value: `${stats.resume.totalVendeursApprouves} / ${stats.resume.totalVendeurs}`,
          },

          {
            label: 'Produits',
            value: stats.resume.totalProduits,
          },

          {
            label: 'Retours',
            value: stats.resume.totalRetours,
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className={`rounded-xl p-4 border ${
              kpi.dark
                ? 'bg-gray-900 dark:bg-gray-800 text-white border-gray-800'
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
            }`}
          >
            <p
              className={`text-xs mb-1 ${
                kpi.dark
                  ? 'text-gray-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {kpi.label}
            </p>

            <p
              className={`text-2xl font-bold ${
                kpi.dark
                  ? 'text-white'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {String(kpi.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Produits */}
      <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 mb-3">
        Produits
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <StatTable
          title="Meilleurs produits"
          icon={Trophy}
          rows={stats.topProduits}
          getLabel={(r) => r.nom}
          getSubLabel={(r) =>
            `${r.category?.nom ?? '—'} • ${
              r.vendeur?.nomBoutique ?? 'Admin'
            }`
          }
          getValue={(r) => `${r._count.orderItems} ventes`}
        />

        <StatTable
          title="Produits les moins vendus"
          icon={TrendingDown}
          rows={stats.flopProduits}
          getLabel={(r) => r.nom}
          getSubLabel={(r) => `${r.category?.nom ?? '—'}`}
          getValue={(r) => `${r._count.orderItems} ventes`}
        />
      </div>

      {/* Catégories */}
      <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 mb-3">
        Catégories
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <StatTable
          title="Meilleures catégories"
          icon={Tag}
          rows={stats.topCategories}
          getLabel={(r) => r.nom}
          getSubLabel={(r) => `${r._count.products} produits`}
          getValue={(r) => `${r.ventes} ventes`}
        />

        <StatTable
          title="Catégories les moins vendues"
          icon={TrendingDown}
          rows={stats.flopCategories}
          getLabel={(r) => r.nom}
          getSubLabel={(r) => `${r._count.products} produits`}
          getValue={(r) => `${r.ventes} ventes`}
        />
      </div>

      {/* Vendeurs */}
      <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 mb-3">
        Vendeurs
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <StatTable
          title="Meilleurs vendeurs"
          icon={Star}
          rows={stats.topVendeurs}
          getLabel={(r) =>
            r.nomBoutique || `${r.user.prenom} ${r.user.nom}`
          }
          getSubLabel={(r) => `${r.nb} commandes`}
          getValue={(r) =>
            `${r.ca.toLocaleString('fr-DZ')} DA`
          }
        />

        <StatTable
          title="Vendeurs les moins actifs"
          icon={Moon}
          rows={stats.flopVendeurs}
          getLabel={(r) =>
            r.nomBoutique || `${r.user.prenom} ${r.user.nom}`
          }
          getSubLabel={(r) => `${r.nb} commandes`}
          getValue={(r) =>
            `${r.ca.toLocaleString('fr-DZ')} DA`
          }
        />
      </div>

      {/* Clients */}
      <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 mb-3">
        Clients
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatTable
          title="Meilleurs clients"
          icon={Gem}
          rows={stats.topClients}
          getLabel={(r) => `${r.prenom} ${r.nom}`}
          getSubLabel={(r) =>
            `${r._count.orders} commandes · ${r._count.returns} retours`
          }
          getValue={(r) =>
            `${r.ca.toLocaleString('fr-DZ')} DA`
          }
        />

        <StatTable
          title="Clients inactifs"
          icon={Moon}
          rows={stats.flopClients}
          getLabel={(r) => `${r.prenom} ${r.nom}`}
          getSubLabel={(r) =>
            `${r._count.orders} commandes`
          }
          getValue={(r) =>
            `${r.ca.toLocaleString('fr-DZ')} DA`
          }
        />
      </div>
    </div>
  )
}