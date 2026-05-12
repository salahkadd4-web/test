import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id:            string
      role:          string
      telephone?:    string | null   // ← existant
      vendeurStatut?: string | null  // ← NOUVEAU : EN_ATTENTE | APPROUVE | SUSPENDU | PIECES_REQUISES
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role:           string
    telephone?:     string | null
    vendeurStatut?: string | null    // ← NOUVEAU
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id:             string
    role:           string
    telephone?:     string | null
    vendeurStatut?: string | null    // ← NOUVEAU
  }
}