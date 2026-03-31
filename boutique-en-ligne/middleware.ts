import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  const { pathname } = req.nextUrl
  const isLoggedIn   = !!token
  const isAdmin      = token?.role === 'ADMIN'

  const isAdminRoute     = pathname.startsWith('/admin')
  const isProtectedRoute = pathname.startsWith('/compte') ||
                           pathname.startsWith('/panier') ||
                           pathname.startsWith('/commandes') ||
                           pathname.startsWith('/profil') ||
                           pathname.startsWith('/retours') ||
                           pathname.startsWith('/favoris') ||
                           pathname.startsWith('/messages')

  const isAuthRoute = pathname.startsWith('/connexion') ||
                      pathname.startsWith('/inscription')

  // ── 1. Routes admin ───────────────────────────────────
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/connexion', req.nextUrl))
    }
    if (!isAdmin) {
      // Client essaie d'accéder à /admin → accueil
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  // ── 2. Routes protégées client ────────────────────────
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/connexion', req.nextUrl))
  }

  // ── 3. Si déjà connecté va sur /connexion ou /inscription
  if (isAuthRoute && isLoggedIn) {
    if (isAdmin) return NextResponse.redirect(new URL('/admin', req.nextUrl))
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json).*)'],
}