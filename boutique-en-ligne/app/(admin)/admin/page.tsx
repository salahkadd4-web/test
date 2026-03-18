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

  const ca = chiffreAffaireBrut._sum.total || 0
  const caNet = ca - totalMontantRembourse
  const tauxRetour = totalCommandes > 0 ? Math.round((totalRetours / totalCommandes) * 100 * 10) / 10 : 0
  const tauxRemboursement = totalRetours > 0 ? Math.round((retoursRembourses / totalRetours) * 100 * 10) / 10 : 0

  const commandesParStatut = await prisma.order.groupBy({ by: ['statut'], _count: { id: true } })
  const retoursParRaison = await prisma.return.groupBy({ by: ['returnReason'], _count: { id: true } })
  const dernieresCommandes = await prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { nom: true, prenom: true } } } })
  const derniersRetours = await prisma.return.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { nom: true, prenom: true } }, product: { select: { nom: true } } } })

  const statsJson = JSON.stringify({
    commandesParStatut, retoursParRaison,
    ca: Math.round(ca), caNet: Math.round(caNet),
    totalMontantRembourse: Math.round(totalMontantRembourse),
  })

  const cardClass = "bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300"
  const linkCardClass = "group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all cursor-pointer"

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link href="/admin/produits" className={linkCardClass}>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200">Produits</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalProduits}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Voir tous →</p>
        </Link>
        <Link href="/admin/clients" className={linkCardClass}>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200">Clients</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalClients}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Voir tous →</p>
        </Link>
        <Link href="/admin/commandes" className={linkCardClass}>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200">Commandes</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalCommandes}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Voir toutes →</p>
        </Link>
        <Link href="/admin/retours" className="group bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800 hover:shadow-md transition-all">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Retours</p>
          <p className="text-3xl font-bold text-red-500">{totalRetours}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 group-hover:text-red-400">Voir tous →</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link href="/admin/commandes" className="group bg-gray-900 dark:bg-gray-800 text-white rounded-2xl p-5 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-700 transition-all border border-gray-800">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">CA Brut</p>
          <p className="text-3xl font-bold">{ca.toLocaleString('fr-DZ')} DA</p>
          <p className="text-xs text-gray-400 mt-1">{commandesLivrees} commandes livrées →</p>
        </Link>
        <Link href="/admin/retours?status=REMBOURSE" className="group bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900 rounded-2xl p-5 shadow-sm hover:border-red-300 dark:hover:border-red-700 hover:shadow-md transition-all">
          <p className="text-xs text-red-400 uppercase tracking-wider mb-1">Remboursements</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">- {totalMontantRembourse.toLocaleString('fr-DZ')} DA</p>
          <p className="text-xs text-red-400 mt-1">{retoursRembourses} retours remboursés →</p>
        </Link>
        <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">CA Net</p>
          <p className="text-3xl font-bold text-green-700 dark:text-green-400">{caNet.toLocaleString('fr-DZ')} DA</p>
          <p className="text-xs text-green-500 dark:text-green-500 mt-1">Après déduction des remboursements</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={cardClass}>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Taux de retour</p>
          <p className="text-3xl font-bold text-orange-500">{tauxRetour}%</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">retours / commandes</p>
        </div>
        <div className={cardClass}>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Taux remboursement</p>
          <p className="text-3xl font-bold text-red-500">{tauxRemboursement}%</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">des retours remboursés</p>
        </div>
        <Link href="/admin/retours?status=EN_ATTENTE" className="group bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 rounded-2xl p-5 shadow-sm hover:border-yellow-300 dark:hover:border-yellow-700 hover:shadow-md transition-all">
          <p className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-1">En attente</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{retoursPending}</p>
          <p className="text-xs text-yellow-500 mt-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-300">Traiter maintenant →</p>
        </Link>
        <Link href="/admin/retours?status=APPROUVE" className="group bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-2xl p-5 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all">
          <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Approuvés</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{retoursApprouves}</p>
          <p className="text-xs text-blue-400 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-300">Voir les approuvés →</p>
        </Link>
      </div>

      <div id="charts-data" data-stats={statsJson} />
      <DashboardCharts />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Dernières commandes</h2>
            <Link href="/admin/commandes" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Voir tout →</Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {dernieresCommandes.map((cmd) => (
              <div key={cmd.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{cmd.user.prenom} {cmd.user.nom}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">#{cmd.id.slice(-6).toUpperCase()} — {new Date(cmd.createdAt).toLocaleDateString('fr-FR')}</p>
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

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Derniers retours</h2>
            <Link href="/admin/retours" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Voir tout →</Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {derniersRetours.length === 0 ? (
              <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">Aucun retour</p>
            ) : (
              derniersRetours.map((retour) => (
                <div key={retour.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{retour.user.prenom} {retour.user.nom}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">{retour.product.nom}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">J+{retour.daysToReturn}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      retour.returnStatus === 'APPROUVE'  ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' :
                      retour.returnStatus === 'REFUSE'    ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' :
                      retour.returnStatus === 'REMBOURSE' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400' :
                      'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400'
                    }`}>{retour.returnStatus.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Statuts des commandes</h3>
        <div style={{ position: 'relative', height: '200px' }}><canvas id="chartCommandes"></canvas></div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Raisons de retour</h3>
        <div style={{ position: 'relative', height: '200px' }}><canvas id="chartRaisons"></canvas></div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Ventes vs Remboursements</h3>
        <div style={{ position: 'relative', height: '200px' }}><canvas id="chartCA"></canvas></div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  function initCharts() {
    if (typeof Chart === 'undefined') { setTimeout(initCharts, 100); return; }
    var el = document.getElementById('charts-data');
    if (!el) return;
    var stats = JSON.parse(el.getAttribute('data-stats'));
    var isDark = document.documentElement.classList.contains('dark');
    var textColor = isDark ? '#9ca3af' : '#6b7280';
    var gridColor = isDark ? '#374151' : '#f3f4f6';
    var colors = isDark
      ? ['#e5e7eb','#9ca3af','#6b7280','#4b5563','#374151','#1f2937']
      : ['#374151','#6b7280','#9ca3af','#d1d5db','#4b5563','#1f2937'];
    var sL = { EN_ATTENTE:'En attente', CONFIRMEE:'Confirmée', EN_PREPARATION:'En préparation', EXPEDIEE:'Expédiée', LIVREE:'Livrée', ANNULEE:'Annulée' };
    var rL = { DEFECTUEUX:'Défectueux', MAUVAIS_ARTICLE:'Mauvais article', CHANGEMENT_AVIS:"Chgt d'avis", NON_CONFORME:'Non conforme' };
    new Chart(document.getElementById('chartCommandes'), {
      type: 'doughnut',
      data: { labels: stats.commandesParStatut.map(function(s){ return sL[s.statut]||s.statut; }), datasets: [{ data: stats.commandesParStatut.map(function(s){ return s._count.id; }), backgroundColor: colors, borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: textColor, font: { size: 10 }, boxWidth: 10, padding: 8 } } } }
    });
    new Chart(document.getElementById('chartRaisons'), {
      type: 'bar',
      data: { labels: stats.retoursParRaison.map(function(r){ return rL[r.returnReason]||r.returnReason; }), datasets: [{ data: stats.retoursParRaison.map(function(r){ return r._count.id; }), backgroundColor: isDark ? '#e5e7eb' : '#374151', borderRadius: 4 }] },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: textColor, font: { size: 10 } } }, y: { grid: { display: false }, ticks: { color: textColor, font: { size: 10 } } } } }
    });
    new Chart(document.getElementById('chartCA'), {
      type: 'bar',
      data: { labels: ['CA Brut','Remboursements','CA Net'], datasets: [{ data: [stats.ca, stats.totalMontantRembourse, stats.caNet], backgroundColor: [isDark?'#e5e7eb':'#374151','#EF4444','#10B981'], borderRadius: 4 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: textColor, font: { size: 10 } } }, y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 9 }, callback: function(v){ return v.toLocaleString()+' DA'; } } } } }
    });
  }
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
  s.onload = initCharts;
  document.head.appendChild(s);
})();
` }} />
    </div>
  )
}
