import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import FavoriIconButton from '@/components/client/FavoriIconButton'
import CartIconButton from '@/components/client/CartIconButton'

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      <section className="bg-black dark:bg-gray-900 text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <p className="text-gray-500 uppercase tracking-[0.5em] text-xs font-light mb-6">Collection Exclusive</p>
          <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.1em] mb-6 leading-none">
            L'Art du
            <span className="block font-light text-gray-300 italic mt-2">Raffinement</span>
          </h1>
          <div className="w-px h-16 bg-gray-600 mx-auto my-8" />
          <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-lg mx-auto mb-12">
            Une sélection exclusive de produits d'exception pour les esprits les plus exigeants.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/produits" className="bg-white dark:bg-gray-100 text-black hover:bg-gray-100 text-xs uppercase tracking-[0.3em] px-12 py-4 transition-all duration-300">
              Explorer
            </Link>
            <Link href="/categories" className="border border-gray-600 text-gray-300 hover:border-white hover:text-white text-xs uppercase tracking-[0.3em] px-12 py-4 transition-all duration-300">
              Catégories
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 dark:divide-gray-800">
          {[
            { label: 'Qualité Premium', desc: 'Produits sélectionnés' },
            { label: 'Livraison Express', desc: 'Partout en Algérie' },
            { label: 'Paiement Sécurisé', desc: 'Transactions protégées' },
            { label: 'Support Dédié', desc: 'À votre écoute' },
          ].map((item) => (
            <div key={item.label} className="px-8 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-black dark:text-white font-medium mb-1">{item.label}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] text-xs mb-4">Parcourir</p>
          <h2 className="text-4xl font-extralight tracking-[0.1em] text-black dark:text-white">Catégories</h2>
          <div className="w-12 h-px bg-black dark:bg-white mx-auto mt-6" />
        </div>
        <CategoriesSection />
      </section>

      <div className="bg-black dark:bg-gray-900 py-16 px-6 text-center border-y border-gray-800">
        <p className="text-gray-500 uppercase tracking-[0.5em] text-xs mb-4">Notre Promesse</p>
        <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-wider">L'Excellence, Toujours</h2>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 py-24 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] text-xs mb-4">Nouveautés</p>
            <h2 className="text-4xl font-extralight tracking-[0.1em] text-black dark:text-white">Dernières Arrivées</h2>
            <div className="w-12 h-px bg-black dark:bg-white mx-auto mt-6" />
          </div>
          <ProduitsSection />
          <div className="text-center mt-16">
            <Link href="/produits" className="border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs uppercase tracking-[0.3em] px-12 py-4 transition-all duration-300 inline-block">
              Voir Tout
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-black dark:bg-gray-950 text-white py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-extralight tracking-[0.5em] uppercase mb-4">Boutique</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">L'excellence à portée de main.</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Navigation</h4>
              <div className="space-y-2">
                {['/produits', '/categories', '/commandes', '/messages'].map((href, i) => (
                  <Link key={href} href={href} className="block text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300">
                    {['Produits', 'Catégories', 'Mes Commandes', 'Contact'][i]}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Mon Compte</h4>
              <div className="space-y-2">
                {['/connexion', '/inscription', '/favoris', '/panier'].map((href, i) => (
                  <Link key={href} href={href} className="block text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300">
                    {['Connexion', 'Inscription', 'Favoris', 'Panier'][i]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">© 2026 Boutique. Tous droits réservés.</p>
            <p className="text-gray-600 text-xs uppercase tracking-widest">Élégance & Qualité</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

async function CategoriesSection() {
  const categories = await prisma.category.findMany({
    take: 6,
    include: { _count: { select: { products: { where: { actif: true } } } } },
  })

  if (categories.length === 0) {
    return <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">Aucune catégorie disponible.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.id}`}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center hover:shadow-md transition hover:border-blue-500 border border-transparent dark:border-gray-700"
        >
          {/* Changement : Icône bg-blue-100 -> dark:bg-blue-900/30 */}
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🏷️</span>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{cat.nom}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{cat._count.products} produits</p>
        </Link>
      ))}
    </div>
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
    return <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">Aucun produit disponible.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {produits.map((produit) => (
        <Link
          key={produit.id}
          href={`/produits/${produit.id}`}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-md transition border border-transparent dark:border-gray-700"
        >
          {/* Changement : fond d'image bg-gray-200 -> dark:bg-gray-700 */}
          <div className="relative h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {produit.images[0] ? (
              <img
                src={produit.images[0]}
                alt={produit.nom}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">📦</span>
            )}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <FavoriIconButton produitId={produit.id} />
              <CartIconButton produitId={produit.id} stock={produit.stock} />
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{produit.category.nom}</p>
            {/* Changement : text-gray-800 -> dark:text-white */}
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
              {produit.nom}
            </h3>
            {/* Changement : text-blue-600 -> dark:text-blue-400 */}
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {produit.prix.toFixed(2)} DA
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
