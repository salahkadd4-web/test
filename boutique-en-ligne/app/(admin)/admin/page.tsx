import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminPage() {
  const [
    totalProduits, totalClients, totalCommandes, totalRetours,
    retoursPending, retoursApprouves, retoursRembourses, commandesLivrees,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.order.count(),
    prisma.return.count(),
    prisma.return.count({ where: { returnStatus: 'EN_ATTENTE' } }),
    prisma.return.count({ where: { returnStatus: 'APPROUVE' } }),
    prisma.return.count({ where: { returnStatus: 'REMBOURSE' } }),
    prisma.order.count({ where: { statut: 'LIVREE' } }),
  ])

  const chiffreAffaireBrut = await prisma.order.aggregate({ _sum: { total: true }, where: { statut: 'LIVREE' } })
  const montantRembourse = await prisma.return.findMany({
    where: { returnStatus: 'REMBOURSE' },
    include: { order: { include: { items: { include: { product: true } } } } },
  })
  const totalMontantRembourse = montantRembourse.reduce((acc, retour) => {
    const item = retour.order.items.find((i) => i.productId === retour.productId)
    return acc + (item ? item.prix * item.quantite : 0)
  }, 0)

  const ca    = chiffreAffaireBrut._sum.total || 0
  const caNet = ca - totalMontantRembourse
  const tauxRetour = totalCommandes > 0 ? Math.round((totalRetours / totalCommandes) * 1000) / 10 : 0

  const dernieresCommandes = await prisma.order.findMany({
    take: 5, orderBy: { createdAt: 'desc' },
    include: { user: { select: { nom: true, prenom: true } } },
  })
  const derniersRetours = await prisma.return.findMany({
    take: 5, orderBy: { createdAt: 'desc' },
    include: { user: { select: { nom: true, prenom: true } }, product: { select: { nom: true } } },
  })

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
          <p className="text-2xl font-bold text-red-500">{totalRetours}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 group-hover:text-red-400">Voir →</p>
        </Link>
      </div>

      {/* CA — stack sur mobile, 3 colonnes sur desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Link href="/admin/commandes" className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-4 hover:bg-gray-800 dark:hover:bg-gray-700 transition-all border border-gray-800">
          <p className="text-xs text-gray-400 mb-1">CA Brut</p>
          <p className="text-xl font-bold">{ca.toLocaleString('fr-DZ')} DA</p>
          <p className="text-xs text-gray-400 mt-1">{commandesLivrees} commandes →</p>
        </Link>
        <Link href="/admin/retours?status=REMBOURSE" className="bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900 rounded-xl p-4 hover:border-red-300 dark:hover:border-red-700 transition-all">
          <p className="text-xs text-red-400 mb-1">Remboursements</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">- {totalMontantRembourse.toLocaleString('fr-DZ')} DA</p>
          <p className="text-xs text-red-400 mt-1">{retoursRembourses} retours →</p>
        </Link>
        <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-xl p-4">
          <p className="text-xs text-green-600 dark:text-green-400 mb-1">CA Net</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-400">{caNet.toLocaleString('fr-DZ')} DA</p>
          <p className="text-xs text-green-500 mt-1">Après remboursements</p>
        </div>
      </div>

      {/* Indicateurs retours */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Taux retour</p>
          <p className="text-2xl font-bold text-orange-500">{tauxRetour}%</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Approuvés</p>
          <p className="text-2xl font-bold text-blue-500">{retoursApprouves}</p>
        </div>
        <Link href="/admin/retours?status=EN_ATTENTE" className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 rounded-xl p-4 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all">
          <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">En attente</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{retoursPending}</p>
          <p className="text-xs text-yellow-500 mt-1">Traiter →</p>
        </Link>
        <Link href="/admin/retours?status=APPROUVE" className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Approuvés</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{retoursApprouves}</p>
          <p className="text-xs text-blue-400 mt-1">Voir →</p>
        </Link>
      </div>

      {/* Activité récente — stack sur mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

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

        {/* Derniers retours */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Derniers retours</h2>
            <Link href="/admin/retours" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Voir tout →</Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {derniersRetours.length === 0 ? (
              <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-6">Aucun retour</p>
            ) : (
              derniersRetours.map((retour) => (
                <div key={retour.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{retour.user.prenom} {retour.user.nom}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">{retour.product.nom}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                    retour.returnStatus === 'APPROUVE'  ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' :
                    retour.returnStatus === 'REFUSE'    ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' :
                    retour.returnStatus === 'REMBOURSE' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400' :
                    'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400'
                  }`}>{retour.returnStatus.replace(/_/g, ' ')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}