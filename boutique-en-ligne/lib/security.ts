/**
 * lib/security.ts
 * Utilitaires de sécurité centralisés
 */

import { NextRequest, NextResponse } from 'next/server'

// ══════════════════════════════════════════════════════════════
//  1. RATE LIMITING — Basé sur IP (en mémoire)
//  Limite les requêtes abusives sur les endpoints sensibles
// ══════════════════════════════════════════════════════════════
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

interface RateLimitOptions {
  maxRequests: number  // nombre max de requêtes
  windowMs:    number  // fenêtre en ms
}

export function rateLimit(req: NextRequest, options: RateLimitOptions): NextResponse | null {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
             || req.headers.get('x-real-ip')
             || 'unknown'

  const key     = `${ip}:${req.nextUrl.pathname}`
  const now     = Date.now()
  const entry   = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + options.windowMs })
    return null // OK
  }

  entry.count++
  if (entry.count > options.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans quelques instants.' },
      {
        status: 429,
        headers: {
          'Retry-After':       String(retryAfter),
          'X-RateLimit-Limit': String(options.maxRequests),
          'X-RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000)),
        },
      }
    )
  }

  return null // OK
}

// Presets pour les endpoints sensibles
export const rateLimits = {
  auth:          { maxRequests: 5,   windowMs: 15 * 60 * 1000 }, // 5/15min → connexion, inscription
  passwordReset: { maxRequests: 3,   windowMs: 60 * 60 * 1000 }, // 3/h → récupération mdp
  otp:           { maxRequests: 3,   windowMs: 10 * 60 * 1000 }, // 3/10min → vérification OTP
  api:           { maxRequests: 100, windowMs: 60 * 1000        }, // 100/min → API générale
  upload:        { maxRequests: 20,  windowMs: 60 * 60 * 1000 }, // 20/h → upload images
}

// ══════════════════════════════════════════════════════════════
//  2. VALIDATION ET SANITISATION
// ══════════════════════════════════════════════════════════════

// Nettoyage des chaînes de caractères
export function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .trim()
    .slice(0, 500) // longueur max
    .replace(/[<>]/g, '') // éviter XSS basique
}

// Validation email
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

// Validation téléphone algérien
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, '')
  return /^(05|06|07)\d{8}$/.test(cleaned)
}

// Validation mot de passe fort
export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  )
}

// Validation ID Prisma (cuid format)
export function isValidId(id: string): boolean {
  return typeof id === 'string' && /^[a-z0-9]{20,30}$/.test(id)
}

// ══════════════════════════════════════════════════════════════
//  3. HEADERS DE SÉCURITÉ
// ══════════════════════════════════════════════════════════════
export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options',    'nosniff')
  response.headers.set('X-Frame-Options',           'DENY')
  response.headers.set('X-XSS-Protection',          '1; mode=block')
  response.headers.set('Referrer-Policy',           'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy',        'camera=(), microphone=(), geolocation=()')
  return response
}

// ══════════════════════════════════════════════════════════════
//  4. VÉRIFICATION OWNERSHIP
//  S'assurer qu'un utilisateur accède seulement à ses données
// ══════════════════════════════════════════════════════════════
export function isOwner(tokenId: string, resourceUserId: string): boolean {
  return tokenId === resourceUserId
}
