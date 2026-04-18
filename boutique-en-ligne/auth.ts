import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'

const isProd = process.env.NODE_ENV === 'production'
const PROD_URL = 'https://test-rosy-omega-60.vercel.app'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,

  // ── Cookies adaptatifs : secure en prod (HTTPS Vercel), plain en dev (localhost) ──
  useSecureCookies: isProd,
  cookies: {
    sessionToken: {
      name: isProd ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProd,
      },
    },
  },

  providers: [

    // ── 1. Email / Téléphone + mot de passe ──────────────────────────────────
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
        })

        if (!user) return null

        // ── Compte Google sans mot de passe ────────────────────────────────
        // Renvoie une erreur lisible au lieu de null silencieux
        if (!user.motDePasse) {
          throw new Error('GOOGLE_ACCOUNT')
        }

        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse)
        if (!passwordMatch) return null

        return {
          id:        user.id,
          name:      `${user.prenom} ${user.nom}`,
          email:     user.email,
          role:      user.role,
          telephone: user.telephone ?? null,
        }
      },
    }),

    // ── 2. Google natif (mobile Capacitor) ───────────────────────────────────
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
        })
        if (!user) return null

        return {
          id:        user.id,
          name:      `${user.prenom} ${user.nom}`,
          email:     user.email,
          role:      user.role,
          telephone: user.telephone ?? null,
        }
      },
    }),

    // ── 3. Google OAuth (web uniquement) ─────────────────────────────────────
    Google({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn:  '/connexion',
    signOut: '/',
    error:   '/connexion',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account }) {
      // Pour le provider Google web, créer le compte si besoin
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
        token.id        = user.id!
        token.role      = (user as any).role
        token.telephone = (user as any).telephone ?? null
      }
      if (account?.provider === 'google' && token.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
        })
        if (dbUser) {
          token.id        = dbUser.id
          token.role      = dbUser.role
          token.telephone = dbUser.telephone ?? null
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id   = token.id
        session.user.role = token.role
        ;(session.user as any).telephone = token.telephone ?? null
      }
      return session
    },

    // ── Redirect adaptatif : localhost en dev, Vercel en prod ────────────────
    async redirect({ url, baseUrl }) {
      const base = isProd ? PROD_URL : baseUrl

      if (url.startsWith('/')) return `${base}${url}`
      if (url.startsWith(base)) return url

      // Si en prod et l'url pointe encore sur localhost, forcer Vercel
      if (isProd && url.includes('localhost')) return base

      return base
    },
  },
})
