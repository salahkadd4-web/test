'use client'

import { useTheme } from '@/components/ThemeProvider'
import { useState } from 'react'

const icons = {
  light: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  dark: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ),
  system: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
}

const options: { key: 'light' | 'dark' | 'system'; label: string }[] = [
  { key: 'light',  label: 'Clair'   },
  { key: 'dark',   label: 'Sombre'  },
  { key: 'system', label: 'Système' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div
      className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col items-center gap-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Options — apparaissent au survol */}
      <div className={`flex flex-col gap-2 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setTheme(opt.key)}
            title={opt.label}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 border
              ${theme === opt.key
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white scale-110'
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:scale-105'
              }`}
          >
            {icons[opt.key]}
          </button>
        ))}
      </div>

      {/* Bouton principal — icône écran */}
      <button
        className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl flex items-center justify-center border-2 border-gray-700 dark:border-gray-200 hover:scale-110 transition-all duration-300"
        title="Thème"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-500 ${open ? '-translate-y-0.5' : 'translate-y-0.5'}`}>
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      </button>
    </div>
  )
}