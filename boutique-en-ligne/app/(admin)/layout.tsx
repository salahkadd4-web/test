import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex transition-colors duration-300">

      <aside className="w-64 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">⚙️ Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { href: '/admin',            label: '📊 Tableau de bord' },
            { href: '/admin/produits',   label: '📦 Produits' },
            { href: '/admin/categories', label: '🏷️ Catégories' },
            { href: '/admin/clients',    label: '👥 Clients' },
            { href: '/admin/commandes',  label: '🛒 Commandes' },
            { href: '/admin/retours',    label: '🔄 Retours' },
            { href: '/admin/messages',   label: '💬 Messages' },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950 hover:text-purple-600 dark:hover:text-purple-400 transition text-sm font-medium">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
