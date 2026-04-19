import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

// Initialisation légère — seulement authConfig, sans Prisma
const { auth } = NextAuth(authConfig)

// Headers de sécurité appliqués à toutes les réponses
function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options',    'nosniff')
  response.headers.set('X-Frame-Options',           'DENY')
  response.headers.set('X-XSS-Protection',          '1; mode=block')
  response.headers.set('Referrer-Policy',           'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy',        'camera=(), microphone=(), geolocation=()')
  response.headers.set('X-DNS-Prefetch-Control',   'off')
  return response
}

export default auth(function middleware(req) {
  // En v5, la session est directement sur req.auth
  const session    = req.auth
  const isLoggedIn = !!session
  const isAdmin    = session?.user?.role === 'ADMIN'

  const { pathname } = req.nextUrl

  // ── Routes admin ──────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn || !isAdmin) {
      const res = NextResponse.redirect(new URL('/connexion', req.nextUrl))
      return applySecurityHeaders(res)
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
    const res = NextResponse.redirect(new URL('/connexion', req.nextUrl))
    return applySecurityHeaders(res)
  }

  // ── Redirection si déjà connecté ─────────────────────
  if (pathname.startsWith('/connexion') || pathname.startsWith('/inscription')) {
    if (isLoggedIn && isAdmin) {
      const res = NextResponse.redirect(new URL('/admin', req.nextUrl))
      return applySecurityHeaders(res)
    }
    if (isLoggedIn && !isAdmin) {
      const res = NextResponse.redirect(new URL('/', req.nextUrl))
      return applySecurityHeaders(res)
    }
  }

  // ── Appliquer les headers à toutes les réponses ───────
  const response = NextResponse.next()
  return applySecurityHeaders(response)
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json).*)'],
}