import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  const { pathname } = req.nextUrl
  const isLoggedIn = !!token
  const isAdmin    = token?.role === 'ADMIN'

  // ── 1. Routes admin → ADMIN uniquement ───────────────
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL('/connexion', req.nextUrl))
    }
  }

  // ── 2. Routes protégées client ────────────────────────
  const isProtectedRoute =
    pathname.startsWith('/panier') ||
    pathname.startsWith('/commandes') ||
    pathname.startsWith('/profil') ||
    pathname.startsWith('/retours') ||
    pathname.startsWith('/favoris') ||
    pathname.startsWith('/messages')

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/connexion', req.nextUrl))
  }

  // ── 3. Déjà connecté → redirect selon rôle ───────────
  if (pathname.startsWith('/connexion') || pathname.startsWith('/inscription')) {
    if (isLoggedIn && isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }
    if (isLoggedIn && !isAdmin) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json).*)'],
}