import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // Sur Vercel (HTTPS) le cookie s'appelle __Secure-next-auth.session-token
  // En local (HTTP) il s'appelle next-auth.session-token
  // getToken sans options gère ça automatiquement
  const token = await getToken({ 
    req,
    secret: process.env.AUTH_SECRET,
  })

  const { pathname } = req.nextUrl
  const isLoggedIn = !!token
  const isAdmin    = token?.role === 'ADMIN'

  // ── Routes admin ──────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL('/connexion', req.nextUrl))
    }
  }

  // ── Routes protégées client ───────────────────────────
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

  // ── Redirection si déjà connecté ─────────────────────
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