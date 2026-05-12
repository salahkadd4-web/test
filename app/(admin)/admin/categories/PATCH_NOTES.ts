// PATCH pour app/(admin)/admin/categories/page.tsx
// Ajoutez cette section en haut de votre page existante pour afficher
// les catégories en attente de validation proposées par les vendeurs.
//
// Insérez ce code AVANT le tableau des catégories existant :

import { prisma } from '@/lib/prisma'

// Dans votre composant serveur, ajoutez cette requête :
/*
const categoriesEnAttente = await prisma.category.findMany({
  where: { statut: 'EN_ATTENTE' },
  include: {
    vendeur: {
      include: { user: { select: { nom: true, prenom: true } } }
    }
  },
  orderBy: { createdAt: 'asc' },
})
*/

// Puis ajoutez ce bloc JSX dans le rendu, avant les catégories approuvées :
/*
{categoriesEnAttente.length > 0 && (
  <div className="mb-6">
    <h2 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-3">
      📋 Catégories en attente de validation ({categoriesEnAttente.length})
    </h2>
    <div className="space-y-2">
      {categoriesEnAttente.map((cat) => (
        <div key={cat.id} className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{cat.nom}</p>
            {cat.description && <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>}
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              Proposée par : {cat.vendeur?.user.prenom} {cat.vendeur?.user.nom}
              {cat.vendeur?.nomBoutique ? ` (${cat.vendeur.nomBoutique})` : ''}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <form action={async () => {
              'use server'
              await prisma.category.update({ where: { id: cat.id }, data: { statut: 'APPROUVEE' } })
            }}>
              <button type="submit" className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg">
                ✅ Approuver
              </button>
            </form>
            <form action={async () => {
              'use server'
              await prisma.category.update({ where: { id: cat.id }, data: { statut: 'REFUSEE' } })
            }}>
              <button type="submit" className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg">
                ❌ Refuser
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
*/

// OU utilisez l'API route déjà créée : PATCH /api/admin/categories/[id]
// avec { action: "approuver" } ou { action: "refuser" }

export {}
