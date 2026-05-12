'use client'

import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/app/hooks/useIsMobile'

export default function MobilePageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // La page d'accueil (/) commence par une section plein écran noire, pas de padding-top
  const isHomePage = pathname === '/'

  return (
    <div className={isMobile && !isHomePage ? 'pt-[57px]' : ''}>
      {children}
    </div>
  )
}