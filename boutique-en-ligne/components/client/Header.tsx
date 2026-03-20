'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/produits?recherche=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  if (session?.user?.role === 'ADMIN') {
    return (
      <header className="bg-black dark:bg-gray-950 text-white sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-sm font-light tracking-[0.4em] uppercase text-gray-300">
            Administration
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white text-xs uppercase tracking-widest transition-colors">
              Boutique
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/connexion' })}
              className="text-gray-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="text-lg font-light tracking-[0.4em] uppercase text-black dark:text-white shrink-0">
            Boutique
          </Link>

          {/* Nav + Recherche — partie gauche/centre */}
          <div className="flex items-center gap-6 flex-1">

            {/* Liens nav — cachés sur mobile */}
            <nav className="hidden md:flex items-center gap-6 shrink-0">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap">
                Accueil
              </Link>
              <Link href="/categories" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap">
                Catégories
              </Link>
              <Link href="/produits" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap">
                Produits
              </Link>
            </nav>

            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="flex-1 max-w-sm hidden md:flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-2 pr-8 text-xs text-gray-700 dark:text-gray-200 bg-transparent placeholder-gray-400 dark:placeholder-gray-600 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Droite — icône utilisateur */}
          <div className="flex items-center gap-3 shrink-0">

            {session ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-white dark:text-gray-900 text-xs font-semibold">
                      {session.user?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                    className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <div className="py-1">
                      {[
                        { href: '/profil',    label: 'Mon Profil',    icon: '👤' },
                        { href: '/favoris',   label: 'Mes Favoris',   icon: '🤍' },
                        { href: '/panier',    label: 'Mon Panier',    icon: '🛒' },
                        { href: '/commandes', label: 'Mes Commandes', icon: '📦' },
                        { href: '/retours',   label: 'Mes Retours',   icon: '🔄' },
                        { href: '/messages',  label: 'Messages',      icon: '💬' },
                      ].map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <span className="text-base">{item.icon}</span>
                          <span className="text-xs uppercase tracking-[0.15em]">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                      <button onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                        <span className="text-base">🚪</span>
                        <span className="text-xs uppercase tracking-[0.15em]">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/connexion" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">
                  Connexion
                </Link>
                <Link href="/inscription" className="bg-black dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 text-white text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-colors duration-300">
                  S'inscrire
                </Link>
              </>
            )}

            {/* Burger mobile */}
            <button className="md:hidden text-black dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-6 space-y-4">

            {/* Recherche mobile */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-2 pr-8 text-xs text-gray-700 dark:text-gray-200 bg-transparent placeholder-gray-400 transition-colors"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>

            {[
              { href: '/',           label: 'Accueil' },
              { href: '/categories', label: 'Catégories' },
              { href: '/produits',   label: 'Produits' },
              ...(session ? [
                { href: '/profil',    label: 'Mon Profil' },
                { href: '/favoris',   label: 'Favoris' },
                { href: '/panier',    label: 'Panier' },
                { href: '/commandes', label: 'Commandes' },
                { href: '/retours',   label: 'Retours' },
                { href: '/messages',  label: 'Messages' },
              ] : []),
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                {item.label}
              </Link>
            ))}

            {session ? (
              <button onClick={() => signOut({ callbackUrl: '/' })}
                className="block text-red-500 dark:text-red-400 text-xs uppercase tracking-[0.2em] transition-colors">
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