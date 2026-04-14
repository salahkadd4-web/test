import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import FavoriIconButton from '@/components/client/FavoriIconButton'
import CartIconButton from '@/components/client/CartIconButton'
import Image from 'next/image'
import CategoriesCarousel from '@/components/client/CategoriesCarousel'


export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center px-4 border-b border-gray-800/50">
  
        {/* LOGO EN ARRIÈRE-PLAN — centré et agrandi */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
            <Image 
              src="/logo_noir.png" 
              alt="" 
              width={1750}
              height={1750}
              className="object-contain invert opacity-20 w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
              priority
            />
          </div>         
        </div>
 
        {/* CONTENU principal */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Description */}
          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
            Première boutique online en Algérie spécialisée en importation 
          </p>
 
          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/produits"
              className="w-full sm:w-auto bg-white text-black font-bold px-12 py-5 rounded-full hover:bg-gray-200 shadow-[0_5px_25px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Explorer la Boutique
            </Link>
            
            <Link
              href="/categories"
              className="w-full sm:w-auto border-2 border-gray-700 text-white font-semibold px-12 py-5 rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              Voir les Catégories
            </Link>
          </div>
        </div>
 
        {/* Ligne de séparation */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </section>

      {/* Catégories Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Nos Catégories
        </h2>
        <CategoriesSection />
      </section>

      {/* Produits récents */}
      <section className="bg-white dark:bg-gray-950 py-16 px-4 transition-colors duration-300">
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
    include: { _count: { select: { products: { where: { actif: true } } } } },
  })

  if (categories.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Aucune catégorie disponible pour le moment.
      </p>
    )
  }

  return (
    <>
      {/* Mobile → carrousel horizontal */}
      <div className="md:hidden">
        <CategoriesCarousel categories={categories} />
      </div>

      {/* Desktop → grille normale */}
      <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md border border-transparent dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 p-6 flex flex-col items-center text-center gap-3 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
              {cat.image ? (
                <img src={cat.image} alt={cat.nom} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-3xl">🏷️</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.nom}
              </h2>
              {cat.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                  {cat.description}
                </p>
              )}
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 font-medium">
                {cat._count.products} produit{cat._count.products > 1 ? 's' : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

async function ProduitsSection() {
  const produits = await prisma.product.findMany({
    where: { actif: true },
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  })

  if (produits.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 dark:text-gray-500">
        <p className="text-5xl mb-4">📦</p>
        <p className="text-lg">Aucun produit disponible pour le moment.</p>
      </div>
    )
  }

  return (
    /* Grid 2 colonnes sur mobile, 4 sur desktop pour l'accueil */
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produits.map((produit) => (
        <Link 
          key={produit.id} 
          href={`/produits/${produit.id}`}
          className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300"
        >
          {/* Image + icônes superposées */}
          <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            {produit.images[0] ? (
              <img 
                src={produit.images[0]} 
                alt={produit.nom} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            ) : (
              <span className="text-4xl">📦</span>
            )}
            
            {/* Icônes en overlay (Favoris et Panier) */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
                              <FavoriIconButton produitId={produit.id} />
                              <CartIconButton produitId={produit.id} stock={produit.stock} />
            </div>
          </div>

          {/* Détails du produit */}
          <div className="p-4">
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{produit.category.nom}</p>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 min-h-[40px]">
              {produit.nom}
            </h3>
            
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {produit.prix.toFixed(2)} DA
            </p>

            {/* État du stock */}
            <p className={`text-[10px] uppercase tracking-wider mt-2 font-bold ${produit.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {produit.stock > 0 ? `● En stock` : '○ Rupture'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}