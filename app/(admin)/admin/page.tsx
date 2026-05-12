import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminPage() {
  const [
    totalProduits, totalClients, totalCommandes,
    commandesLivrees, chiffreAffaireBrut, dernieresCommandes,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.order.count(),
    prisma.order.count({ where: { statut: 'LIVREE' } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { statut: 'LIVREE' } }),
    prisma.order.findMany({
      take: 5, orderBy: { createdAt: 'desc' },
      include: { user: { select: { nom: true, prenom: true } } },
    }),
  ])

  const ca = chiffreAffaireBrut._sum.total || 0

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-6">
        Tableau de bord
      </h1>

      {/* KPIs — 2 colonnes sur mobile, 4 sur desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Link href="/admin/produits" className="group bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Produits</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalProduits}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Voir →</p>
        </Link>
        <Link href="/admin/clients" className="group bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Clients</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalClients}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Voir →</p>
        </Link>
        <Link href="/admin/commandes" className="group bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Commandes</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalCommandes}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Voir →</p>
        </Link>
        <Link href="/admin/retours" className="group bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800 transition-all">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Retours</p>
          <p className="text-2xl font-bold text-red-500">↗</p>
          <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1 group-hover:text-indigo-600">Flowmerce →</p>
        </Link>
      </div>

      {/* CA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <Link href="/admin/commandes" className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-4 hover:bg-gray-800 dark:hover:bg-gray-700 transition-all border border-gray-800">
          <p className="text-xs text-gray-400 mb-1">Chiffre d&apos;affaires</p>
          <p className="text-xl font-bold">{ca.toLocaleString('fr-DZ')} DA</p>
          <p className="text-xs text-gray-400 mt-1">{commandesLivrees} commandes livrées →</p>
        </Link>
        <Link href="/admin/commandes" className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total commandes</p>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{totalCommandes}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{commandesLivrees} livrées →</p>
        </Link>
      </div>

      {/* Dernières commandes */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Dernières commandes</h2>
          <Link href="/admin/commandes" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Voir tout →</Link>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {dernieresCommandes.map((cmd) => (
            <div key={cmd.id} className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{cmd.user.prenom} {cmd.user.nom}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">#{cmd.id.slice(-6).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{cmd.total.toFixed(0)} DA</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  cmd.statut === 'LIVREE'     ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' :
                  cmd.statut === 'EN_ATTENTE' ? 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400' :
                  cmd.statut === 'EXPEDIEE'   ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400' :
                  cmd.statut === 'ANNULEE'    ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' :
                  'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}>{cmd.statut.replace(/_/g, ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
