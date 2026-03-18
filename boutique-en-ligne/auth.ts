import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        identifiant: { label: 'Email ou téléphone', type: 'text' },
        motDePasse: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifiant || !credentials?.motDePasse) return null

        const identifiant = credentials.identifiant as string
        const motDePasse = credentials.motDePasse as string

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifiant },
              { telephone: identifiant },
            ],
          },
        })

        if (!user) return null

        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse)
        if (!passwordMatch) return null

        return {
          id: user.id,
          name: `${user.prenom} ${user.nom}`,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: '/connexion',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
})