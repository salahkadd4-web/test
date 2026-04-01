import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { nom: 'asc' },
    include: {
      products: { where: { actif: true }, orderBy: { createdAt: 'desc' } },
      _count: { select: { products: { where: { actif: true } } } },
    },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Catégories</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Parcourez nos catégories de produits</p>

      {categories.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <p className="text-5xl mb-4">🏷️</p>
          <p className="text-lg">Aucune catégorie disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.id}`}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md border border-transparent dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 p-6 flex flex-col items-center text-center gap-3 transition-all duration-300">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                {cat.image ? (
                  <img src={cat.image} alt={cat.nom} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-3xl">🏷️</span>
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{cat.nom}</h2>
                {cat.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{cat.description}</p>
                )}
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 font-medium">
                  {cat._count.products} produit{cat._count.products > 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
