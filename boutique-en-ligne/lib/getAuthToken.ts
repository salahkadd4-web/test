import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// ── Centralisé et correct pour HTTP (dev) et HTTPS (Vercel) ──
export async function getAuthToken(req: NextRequest) {
  return getToken({
    req,
    secret: process.env.AUTH_SECRET,
    // Pas de secureCookie ni cookieName forcé
    // getToken gère automatiquement __Secure- sur HTTPS
  })
}