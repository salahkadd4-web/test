'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const FIRST_LAUNCH_KEY = 'cabastore_first_launch_done'

// Pages d'auth où on ne doit pas rediriger (pour éviter la boucle)
const AUTH_PATHS = ['/connexion', '/inscription']

export default function MobileFirstLaunch() {
  const router   = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const init = async () => {
      try {
        const { Capacitor } = await import('@capacitor/core')
        if (!Capacitor.isNativePlatform()) return

        const isOnAuthPage = AUTH_PATHS.some(p => pathname?.startsWith(p))
        if (isOnAuthPage) return

        const alreadyLaunched = localStorage.getItem(FIRST_LAUNCH_KEY)

        if (!alreadyLaunched) {
          // ✅ Premier lancement : effacer toute session résiduelle
          //    (ex: session admin laissée depuis les tests) avant de rediriger
          localStorage.setItem(FIRST_LAUNCH_KEY, 'true')
          await signOut({ redirect: false })
          router.replace('/connexion')
          return
        }

        // ✅ Lancements suivants : une session ADMIN ne doit jamais
        //    persister sur l'app mobile → la détruire si détectée
        const res = await fetch('/api/auth/session')
        const session = await res.json()

        if (session?.user?.role === 'ADMIN') {
          await signOut({ redirect: false })
          router.replace('/connexion')
        }

      } catch {
        // Capacitor non disponible : version web, on ne fait rien
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}