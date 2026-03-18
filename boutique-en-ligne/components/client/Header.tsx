'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  if (session?.user?.role === 'ADMIN') {
    return (
      <header className="bg-black dark:bg-gray-950 text-white sticky top-0 z-50 border-b border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-sm font-light tracking-[0.4em] uppercase text-gray-300 dark:text-gray-200">
            Administration
          </Link>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/" className="text-gray-400 dark:text-gray-300 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300">
              Boutique
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/connexion' })}
              className="text-gray-400 dark:text-gray-300 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <Link href="/" className="text-xl font-light tracking-[0.5em] uppercase text-black dark:text-white">
            Boutique
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">
              Accueil
            </Link>
            <Link href="/categories" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">
              Catégories
            </Link>
            <Link href="/produits" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">
              Produits
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session ? (
              <>
                <Link href="/favoris" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 hidden md:block">
                  Favoris
                </Link>
                <Link href="/panier" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 hidden md:block">
                  Panier
                </Link>
                <Link href="/commandes" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 hidden md:block">
                  Commandes
                </Link>
                <Link href="/messages" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 hidden md:block">
                  Messages
                </Link>
                <Link href="/retours" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 hidden md:block">
                  Retours
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/connexion" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">
                  Connexion
                </Link>
                <Link href="/inscription" className="bg-black dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 text-white text-xs uppercase tracking-[0.2em] px-6 py-3 transition-colors duration-300">
                  S'inscrire
                </Link>
              </>
            )}
            <button className="md:hidden text-black dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-6 space-y-4">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/categories', label: 'Catégories' },
              { href: '/produits', label: 'Produits' },
              ...(session ? [
                { href: '/favoris', label: 'Favoris' },
                { href: '/panier', label: 'Panier' },
                { href: '/commandes', label: 'Commandes' },
                { href: '/messages', label: 'Messages' },
                { href: '/retours', label: 'Retours' },
              ] : []),
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button onClick={() => signOut({ callbackUrl: '/' })}
                className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                Déconnexion
              </button>
            ) : (
              <Link href="/connexion" onClick={() => setMenuOpen(false)}
                className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em]">
                Connexion
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  )
}
