import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  const isLoggedIn = !!token
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith('/compte') ||
    req.nextUrl.pathname.startsWith('/panier') ||
    req.nextUrl.pathname.startsWith('/commandes')

  if (isAdminRoute) {
    if (!isLoggedIn || token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/connexion', req.nextUrl))
    }
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/connexion', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}