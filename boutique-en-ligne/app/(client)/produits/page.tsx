import { prisma } from '@/lib/prisma'
import ProduitsSearch from '@/components/client/ProduitsSearch'

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; recherche?: string }>
}) {
  const { categorie, recherche } = await searchParams

  const [produits, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        actif: true,
        ...(categorie ? { categoryId: categorie } : {}),
        ...(recherche ? { nom: { contains: recherche, mode: 'insensitive' } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nom: true,
        images: true,
        prix: true,
        stock: true,
        prixVariables: true,
        category: { select: { nom: true } },
        variants: { select: { id: true, couleur: true, nom: true }, orderBy: { createdAt: 'asc' } },
      },
    }),
    prisma.category.findMany({ orderBy: { nom: 'asc' } }),
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Produits</h1>
      </div>
      <ProduitsSearch
        categories={categories}
        initialProduits={produits as any}
        initialRecherche={recherche}
        initialCategorie={categorie}
      />
    </div>
  )
}
