import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue sur notre Boutique
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Découvrez nos produits de qualité à des prix imbattables
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/produits"
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Voir les produits
            </Link>
            <Link
              href="/categories"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Parcourir les catégories
            </Link>
          </div>
        </div>
      </section>

      {/* Catégories Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Nos Catégories
        </h2>
        <CategoriesSection />
      </section>

      {/* Produits récents */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Nouveaux Produits
          </h2>
          <ProduitsSection />
        </div>
      </section>
    </div>
  )
}

async function CategoriesSection() {
  const categories = await prisma.category.findMany({
    take: 6,
    include: { _count: { select: { products: true } } },
  })

  if (categories.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Aucune catégorie disponible pour le moment.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.id}`}
          className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition hover:border-blue-500 border border-transparent"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🏷️</span>
          </div>
          <p className="text-sm font-medium text-gray-700">{cat.nom}</p>
          <p className="text-xs text-gray-400">{cat._count.products} produits</p>
        </Link>
      ))}
    </div>
  )
}

async function ProduitsSection() {
  const produits = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  })

  if (produits.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Aucun produit disponible pour le moment.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {produits.map((produit) => (
        <Link
          key={produit.id}
          href={`/produits/${produit.id}`}
          className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition"
        >
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {produit.images[0] ? (
              <img
                src={produit.images[0]}
                alt={produit.nom}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">📦</span>
            )}
          </div>
          <div className="p-4">
            <p className="text-xs text-blue-600 mb-1">{produit.category.nom}</p>
            <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
              {produit.nom}
            </h3>
            <p className="text-lg font-bold text-blue-600">
              {produit.prix.toFixed(2)} DA
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}