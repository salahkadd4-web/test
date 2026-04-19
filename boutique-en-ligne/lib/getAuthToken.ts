import { auth } from '@/auth'

/**
 * Helper v5 — utilise auth() au lieu de getToken()
 * Retourne la session ou null si non connecté.
 */
export async function getAuthToken() {
  const session = await auth()
  if (!session?.user) return null
  return session.user as {
    id: string
    email?: string | null
    role: string
    telephone?: string | null
  }
}