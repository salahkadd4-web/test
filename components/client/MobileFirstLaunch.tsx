'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

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

        const alreadyLaunched = localStorage.getItem(FIRST_LAUNCH_KEY)

        if (!alreadyLaunched) {
          // Marquer comme lancé immédiatement pour éviter toute boucle
          localStorage.setItem(FIRST_LAUNCH_KEY, 'true')

          // Rediriger vers connexion seulement si on n'y est pas déjà
          const isOnAuthPage = AUTH_PATHS.some(p => pathname?.startsWith(p))
          if (!isOnAuthPage) {
            router.replace('/connexion')
          }
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
