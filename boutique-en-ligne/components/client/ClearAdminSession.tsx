'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ClearAdminSession() {
  const { data: session } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    // Si admin essaie d'accéder à une page non-admin → déconnexion
    if (session?.user?.role === 'ADMIN' && !pathname.startsWith('/admin')) {
      signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/connexion` })
    }
  }, [session, pathname])

  return null
}