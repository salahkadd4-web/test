'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useIsMobile, useHideOnScroll } from '@/app/hooks/useIsMobile'
import SearchBar from '@/components/client/SearchBar'

const APP_URL = 'https://test-rosy-omega-60.vercel.app'

// ── Icône flèche bas ──────────────────────────────────────────
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── Menu items utilisateur ────────────────────────────────────
const userMenuItems = [
  { href: '/profil',    label: 'Mon Profil',    icon: '👤' },
  { href: '/favoris',   label: 'Mes Favoris',   icon: '🤍' },
  { href: '/panier',    label: 'Mon Panier',     icon: '🛒' },
  { href: '/commandes', label: 'Mes Commandes',  icon: '📦' },
  { href: '/retours',   label: 'Mes Retours',    icon: '🔄' },
  { href: '/messages',  label: 'Messages',       icon: '💬' },
]

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const hidden = useHideOnScroll()

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

  // ── Connexion Google adaptée Capacitor ────────────────────
  const handleGoogle = async () => {
    try {
      const { Capacitor } = await import('@capacitor/core')

      if (Capacitor.isNativePlatform()) {
        // Sur l'app native : utiliser le plugin App pour gérer le deep link
        // et ouvrir Google dans une WebView intégrée (pas Chrome externe)
        const { Browser } = await import('@capacitor/browser')
        const googleUrl = `${APP_URL}/api/auth/signin/google?callbackUrl=${encodeURIComponent(APP_URL + '/')}`

        await Browser.open({
          url:               googleUrl,
          windowName:        '_self',      // ← dans l'app, pas Chrome
          presentationStyle: 'fullscreen', // ← plein écran dans l'app
          toolbarColor:      '#000000',
        })
      } else {
        // Web normal
        const { signIn } = await import('next-auth/react')
        await signIn('google', { callbackUrl: `${APP_URL}/` })
      }
    } catch (err) {
      console.error('Erreur Google:', err)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: `${APP_URL}/`, redirect: true })
    setUserMenuOpen(false)
    setMenuOpen(false)
  }

  // ── Header Admin ──────────────────────────────────────────
  if (session?.user?.role === 'ADMIN') {
    return (
      <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-sm font-light tracking-[0.4em] uppercase text-gray-300">
            Admin
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white text-xs uppercase tracking-widest transition-colors">
              Boutique
            </Link>
            <button onClick={handleSignOut}
              className="text-gray-400 hover:text-white text-xs uppercase tracking-widest transition-colors">
              Déconnexion
            </button>
          </div>
        </div>
      </header>
    )
  }

  // ── Header Mobile ─────────────────────────────────────────
  if (isMobile) {
    return (
      <header className={`bg-white dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-sm font-light tracking-[0.3em] uppercase text-black dark:text-white">Caba</span>
            <Image src="/logo_noir.png" alt="Logo" width={32} height={32}
              className="h-7 w-auto dark:invert" priority />
            <span className="text-sm font-light tracking-[0.3em] uppercase text-black dark:text-white -ml-1">Store</span>
          </Link>

          {/* Avatar + flèche / Connexion */}
          {session ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 rounded-full pl-1 pr-2.5 py-1"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                  <span className="text-white dark:text-gray-900 text-xs font-semibold">
                    {session.user?.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                {/* Flèche bas */}
                <span className="text-gray-500 dark:text-gray-400">
                  <ChevronDown open={userMenuOpen} />
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{session.user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                  <div className="py-1">
                    {userMenuItems.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors uppercase tracking-widest">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                    <button onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors">
                      <span>🚪</span>
                      <span className="text-xs uppercase tracking-widest">Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/connexion"
              className="bg-black dark:bg-white text-white dark:text-black text-xs uppercase tracking-widest px-4 py-2 rounded-full">
              Connexion
            </Link>
          )}
        </div>
      </header>
    )
  }

  // ── Header Web ────────────────────────────────────────────
  return (
    <>
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

          <button className="md:hidden text-black dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>

          <Link href="/" className="shrink-0">
            <span className="flex items-center gap-x-2 text-lg font-light tracking-[0.4em] uppercase text-black dark:text-white">
              <span>Caba</span>
              <Image src="/logo_noir.png" alt="Caba Store Logo" width={50} height={50}
                className="h-8 w-auto block dark:invert" priority />
              <span className="-ml-1">Store</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 flex-1">
            <nav className="hidden md:flex items-center gap-6 shrink-0">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">Accueil</Link>
              <Link href="/categories" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">Catégories</Link>
              <Link href="/produits" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300">Produits</Link>
            </nav>
            <div className="flex-1 max-w-sm hidden md:flex items-center">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {session ? (
              <div className="relative" ref={userMenuRef}>
                {/* Avatar + flèche bas — version web */}
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full pl-1 pr-3 py-1 transition-colors duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                    <span className="text-white dark:text-gray-900 text-xs font-semibold">
                      {session.user?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium hidden sm:block max-w-[80px] truncate">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    <ChevronDown open={userMenuOpen} />
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <div className="py-1">
                      {userMenuItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <span>{item.icon}</span>
                          <span className="text-xs uppercase tracking-[0.15em]">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                      <button onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors">
                        <span>🚪</span>
                        <span className="text-xs uppercase tracking-[0.15em]">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/connexion" className="text-gray-500 dark:text-gray-400 hover:text-black text-xs uppercase tracking-[0.2em] transition-colors duration-300">Connexion</Link>
                <Link href="/inscription" className="bg-black dark:bg-white dark:text-black text-white text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-colors duration-300">S'inscrire</Link>
              </>
            )}
          </div>
        </div>

        {/* Menu mobile hamburger */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-6 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2 pr-8 text-xs bg-transparent placeholder-gray-400 transition-colors" />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>
            {[
              { href: '/', label: 'Accueil' },
              { href: '/categories', label: 'Catégories' },
              { href: '/produits', label: 'Produits' },
              ...(session ? userMenuItems.map(i => ({ href: i.href, label: i.label })) : []),
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block text-gray-600 dark:text-gray-300 hover:text-black text-xs uppercase tracking-[0.2em] transition-colors">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button onClick={handleSignOut} className="block text-red-500 text-xs uppercase tracking-[0.2em]">
                Déconnexion
              </button>
            ) : (
              <Link href="/connexion" onClick={() => setMenuOpen(false)}
                className="block text-gray-600 hover:text-black text-xs uppercase tracking-[0.2em]">
                Connexion
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  )
}