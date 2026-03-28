import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import FavoriIconButton from '@/components/client/FavoriIconButton'
import CartIconButton from '@/components/client/CartIconButton'

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; recherche?: string }>
}) {
  const { categorie, recherche } = await searchParams

  const produits = await prisma.product.findMany({
    where: {
      actif: true,
      ...(categorie ? { categoryId: categorie } : {}),
      ...(recherche ? { nom: { contains: recherche, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  })

  const categories = await prisma.category.findMany({ orderBy: { nom: 'asc' } })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Produits</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {produits.length} produit{produits.length > 1 ? 's' : ''} trouvé{produits.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-20">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Recherche</h3>
              <form>
                {categorie && <input type="hidden" name="categorie" value={categorie} />}
                <input
                  type="text" name="recherche" defaultValue={recherche}
                  placeholder="Rechercher un produit..."
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                />
                <button type="submit" className="w-full mt-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg py-2 text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition">
                  Rechercher
                </button>
              </form>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Catégories</h3>
              <div className="space-y-2">
                <Link href="/produits"
                  className={`block text-sm px-3 py-2 rounded-lg transition ${!categorie ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  Toutes les catégories
                </Link>
                {categories.map((cat) => (
                  <Link key={cat.id}
                    href={`/produits?categorie=${cat.id}${recherche ? `&recherche=${recherche}` : ''}`}
                    className={`block text-sm px-3 py-2 rounded-lg transition ${categorie === cat.id ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    {cat.nom}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {produits.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-gray-500">
              <p className="text-5xl mb-4">📦</p>
              <p className="text-lg">Aucun produit trouvé.</p>
              <Link href="/produits" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
                Voir tous les produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {produits.map((produit) => (
                <Link key={produit.id} href={`/produits/${produit.id}`}
                  className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300">
                  {/* Image + icônes superposées */}
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {produit.images[0] ? (
                      <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl">📦</span>
                    )}
                    {/* Icônes en overlay */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <FavoriIconButton produitId={produit.id} />
                      <CartIconButton produitId={produit.id} stock={produit.stock} />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{produit.category.nom}</p>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{produit.nom}</h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{produit.prix.toFixed(2)} DA</p>
                    <p className={`text-xs mt-1 ${produit.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                      {produit.stock > 0 ? `En stock (${produit.stock})` : 'Rupture de stock'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}