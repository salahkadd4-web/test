// middleware.ts
// ⚠️  On importe UNIQUEMENT authConfig (sans Prisma ni bcryptjs)
//     pour rester compatible avec l'Edge Runtime.
//     Le fichier auth.ts complet est réservé aux API routes / Server Components.

import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // ── Routes admin ──────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/connexion', req.url))
    }
    if (session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // ── Routes vendeur ────────────────────────────────────────
  if (pathname.startsWith('/vendeur')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/connexion', req.url))
    }
    if (session.user.role !== 'VENDEUR') {
      return NextResponse.redirect(new URL('/', req.url))
    }
    // Note : la vérification du statut (EN_ATTENTE / SUSPENDU / PIECES_REQUISES)
    // est gérée dans chaque page via VendeurGuard — le middleware ne bloque pas
    // l'accès ici pour permettre l'affichage de la page de statut/documents.
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/vendeur/:path*',
  ],
}