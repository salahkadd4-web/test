import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function getAuthToken(req: NextRequest) {
  return getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: false,
    cookieName: 'next-auth.session-token',
  })
}