import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    // ── Connexion classique ──────────────────────────────
    Credentials({
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
        
        if (!user.motDePasse) return null
        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse)
        if (!passwordMatch) return null

        return {
          id:    user.id,
          name:  `${user.prenom} ${user.nom}`,
          email: user.email,
          role:  user.role,
        }
      },
    }),

    // ── Google ───────────────────────────────────────────
    Google({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Facebook et Apple → à ajouter plus tard avec leurs clés
  ],

  pages: {
    signIn: '/connexion',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
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
                motDePasse: '',
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
        token.id   = user.id!
        token.role = (user as any).role
      }
      if (account?.provider !== 'credentials' && token.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
        })
        if (dbUser) {
          token.id   = dbUser.id
          token.role = dbUser.role
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id   = token.id
        session.user.role = token.role
      }
      return session
    },
  },
})