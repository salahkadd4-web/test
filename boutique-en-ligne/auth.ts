import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

const isProd = process.env.NODE_ENV === 'production'
const PROD_URL = 'https://test-rosy-omega-60.vercel.app'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  providers: [

    // ── 1. Email / Téléphone + mot de passe ────────────────────────────────
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifiant: { label: 'Email ou téléphone', type: 'text' },
        motDePasse:  { label: 'Mot de passe',        type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifiant || !credentials?.motDePasse) return null

        const identifiant = credentials.identifiant as string
        const motDePasse  = credentials.motDePasse  as string

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email:     identifiant },
              { telephone: identifiant },
            ],
          },
          include: { vendeurProfile: true },
        })

        if (!user) return null

        if (!user.motDePasse) {
          throw new Error('GOOGLE_ACCOUNT')
        }

        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse)
        if (!passwordMatch) return null

        // ── Statut vendeur : on laisse TOUJOURS passer la connexion ──
        // VendeurGuard (Server Component) affiche la page adaptée selon le statut :
        //   EN_ATTENTE      → page "en cours de validation"
        //   SUSPENDU        → page "compte suspendu"
        //   PIECES_REQUISES → page d'upload des documents
        //   APPROUVE        → dashboard normal

        return {
          id:              user.id,
          name:            `${user.prenom} ${user.nom}`,
          email:           user.email,
          role:            user.role,
          telephone:       user.telephone ?? null,
          vendeurStatut:   user.vendeurProfile?.statut ?? null,
        }
      },
    }),

    // ── 2. Google natif (mobile Capacitor) ──────────────────────────────────
    Credentials({
      id: 'credentials-google',
      name: 'Google Native',
      credentials: {
        userId: { label: 'User ID', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.userId) return null

        const user = await prisma.user.findUnique({
          where: { id: credentials.userId as string },
          include: { vendeurProfile: true },
        })
        if (!user) return null

        return {
          id:            user.id,
          name:          `${user.prenom} ${user.nom}`,
          email:         user.email,
          role:          user.role,
          telephone:     user.telephone ?? null,
          vendeurStatut: user.vendeurProfile?.statut ?? null,
        }
      },
    }),

    // ── 3. Google OAuth (web uniquement) ────────────────────────────────────
    Google({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const existing = await prisma.user.findFirst({
            where: { email: user.email ?? '' },
          })
          if (!existing) {
            const parts = (user.name ?? '').split(' ')
            await prisma.user.create({
              data: {
                email:      user.email ?? '',
                prenom:     parts[0] || '',
                nom:        parts.slice(1).join(' ') || '',
                role:       'CLIENT',
                motDePasse: null,
              },
            })
          }
        } catch (err) {
          console.error('Erreur création compte OAuth:', err)
          return false
        }
      }
      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id            = user.id!
        token.role          = (user as any).role
        token.telephone     = (user as any).telephone ?? null
        token.vendeurStatut = (user as any).vendeurStatut ?? null
      }
      if (account?.provider === 'google' && token.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
          include: { vendeurProfile: true },
        })
        if (dbUser) {
          token.id            = dbUser.id
          token.role          = dbUser.role
          token.telephone     = dbUser.telephone ?? null
          token.vendeurStatut = dbUser.vendeurProfile?.statut ?? null
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id            = token.id   as string
        session.user.role          = token.role as string
        ;(session.user as any).telephone     = token.telephone     ?? null
        ;(session.user as any).vendeurStatut = token.vendeurStatut ?? null
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      const base = isProd ? PROD_URL : baseUrl
      if (url.startsWith('/')) return `${base}${url}`
      if (url.startsWith(base)) return url
      if (isProd && url.includes('localhost')) return base
      return base
    },
  },
})