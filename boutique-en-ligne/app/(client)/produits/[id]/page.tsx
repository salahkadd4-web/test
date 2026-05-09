import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import FavoriButton from '@/components/client/FavoriButton'
import FavoriIconButton from '@/components/client/FavoriIconButton'
import CartIconButton from '@/components/client/CartIconButton'
import ProduitDetailClient from '@/components/client/ProduitDetailClient'

export default async function ProduitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const produit = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      variants: { orderBy: { createdAt: 'asc' } },
    },
  })

  if (!produit || !produit.actif) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-4">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Accueil</Link>
        <span>›</span>
        <Link href="/produits" className="hover:text-blue-600 dark:hover:text-blue-400">Produits</Link>
        <span>›</span>
        <Link href={`/categories/${produit.category.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {produit.category.nom}
        </Link>
        <span>›</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium line-clamp-1">{produit.nom}</span>
      </div>

      {/* Catégorie + Titre */}
      <div className="mb-6">
        <Link href={`/categories/${produit.category.id}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {produit.category.nom}
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{produit.nom}</h1>
        {produit.description && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">{produit.description}</p>
        )}
      </div>

      {/* Composant interactif : galerie + variantes + quantité + panier */}
      <ProduitDetailClient
        produit={{
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix,
          stock: produit.stock,
          images: produit.images,
          prixVariables: produit.prixVariables as any,
          variants: produit.variants,
        }}
      />

      {/* Favoris */}
      <div className="mt-6">
        <FavoriButton produitId={produit.id} />
      </div>

      {/* Produits similaires */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Produits similaires</h2>
        <ProduitsSimilaires categoryId={produit.category.id} produitId={produit.id} />
      </div>
    </div>
  )
}

async function ProduitsSimilaires({ categoryId, produitId }: { categoryId: string; produitId: string }) {
  const produits = await prisma.product.findMany({
    where: { categoryId, actif: true, NOT: { id: produitId } },
    take: 4,
    include: { category: true },
  })

  if (produits.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {produits.map((produit) => (
        <Link key={produit.id} href={`/produits/${produit.id}`}
          className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300">
          <div className="relative h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            {produit.images[0] ? (
              <img src={produit.images[0]} alt={produit.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <span className="text-3xl">📦</span>
            )}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <FavoriIconButton produitId={produit.id} />
              <CartIconButton produitId={produit.id} stock={produit.stock} />
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">{produit.nom}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">{produit.prix.toFixed(2)} DA</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
