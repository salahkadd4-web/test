import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import FavoriIconButton from '@/components/client/FavoriIconButton'
import CartIconButton from '@/components/client/CartIconButton'

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const categorie = await prisma.category.findUnique({
    where: { id },
    include: {
      products: { where: { actif: true }, orderBy: { createdAt: 'desc' } },
      _count: { select: { products: { where: { actif: true } } } },
    },
  })

  if (!categorie) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Accueil</Link>
        <span>›</span>
        <Link href="/categories" className="hover:text-blue-600 dark:hover:text-blue-400">Catégories</Link>
        <span>›</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">{categorie.nom}</span>
      </div>

      {/* Header catégorie */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center overflow-hidden">
          {categorie.image ? (
            <img src={categorie.image} alt={categorie.nom} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-3xl">🏷️</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{categorie.nom}</h1>
          {categorie.description && (
            <p className="text-gray-500 dark:text-gray-400 mt-1">{categorie.description}</p>
          )}
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            {categorie._count.products} produit{categorie._count.products > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Produits */}
      {categorie.products.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-lg">Aucun produit dans cette catégorie.</p>
          <Link href="/categories" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
            ← Retour aux catégories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categorie.products.map((produit) => (
            <Link key={produit.id} href={`/produits/${produit.id}`}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300">
              <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                {produit.images[0] ? (
                  <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <FavoriIconButton produitId={produit.id} />
                  <CartIconButton produitId={produit.id} stock={produit.stock} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{produit.nom}</h3>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{produit.prix.toFixed(2)} DA</p>
                <p className={`text-xs mt-1 ${produit.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {produit.stock > 0 ? `En stock (${produit.stock})` : 'Rupture de stock'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}