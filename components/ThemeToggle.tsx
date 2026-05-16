'use client'

import { useTheme } from '@/components/ThemeProvider'
import { useState, useRef, useEffect, useCallback } from 'react'

/* ── Icônes ── */
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

const BTN   = 48   // taille du bouton en px (w-12 h-12)
const EDGE  = 12   // marge min par rapport aux bords
const DRAG_THRESHOLD = 6 // px avant de considérer un glissement

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [open,     setOpen]     = useState(false)
  const [dragging, setDragging] = useState(false)

  /* Position du bouton mobile — null jusqu'à l'hydratation */
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const wrapRef = useRef<HTMLDivElement>(null)

  /* État interne du drag (ref → pas de re-render pendant le glissement) */
  const drag = useRef<{
    startTouchX: number; startTouchY: number
    startPosX:   number; startPosY:   number
    moved:       boolean
  } | null>(null)

  /* ── Initialisation position ── */
  useEffect(() => {
    const saved = localStorage.getItem('theme-btn-pos')
    if (saved) {
      try {
        const p = JSON.parse(saved) as { x: number; y: number }
        const x = Math.max(EDGE, Math.min(window.innerWidth  - BTN - EDGE, p.x))
        const y = Math.max(EDGE, Math.min(window.innerHeight - BTN - EDGE, p.y))
        setPos({ x, y }); return
      } catch { /* ignored */ }
    }
    /* Position par défaut : côté gauche, hauteur ~40% — loin des sélections */
    setPos({ x: EDGE, y: Math.round(window.innerHeight * 0.38) })
  }, [])

  /* ── Clamp dans l'écran ── */
  const clamp = useCallback((x: number, y: number) => ({
    x: Math.max(EDGE, Math.min(window.innerWidth  - BTN - EDGE, x)),
    y: Math.max(EDGE, Math.min(window.innerHeight - BTN - EDGE, y)),
  }), [])

  /* ── Touch handlers ── */
  const onTouchStart = (e: React.TouchEvent) => {
    if (!pos) return
    const t = e.touches[0]
    drag.current = {
      startTouchX: t.clientX, startTouchY: t.clientY,
      startPosX:   pos.x,     startPosY:   pos.y,
      moved: false,
    }
    setDragging(false)
  }

  /* touchmove doit être { passive: false } pour pouvoir appeler preventDefault */
  const onTouchMoveNative = useCallback((e: TouchEvent) => {
    if (!drag.current) return
    e.preventDefault()                                // bloque le scroll de la page
    const t = e.touches[0]
    const dx = t.clientX - drag.current.startTouchX
    const dy = t.clientY - drag.current.startTouchY
    if (!drag.current.moved &&
        (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      drag.current.moved = true
      setDragging(true)
      setOpen(false)                                  // ferme le menu si ouvert
    }
    if (drag.current.moved) {
      setPos(clamp(drag.current.startPosX + dx, drag.current.startPosY + dy))
    }
  }, [clamp])

  const onTouchEnd = () => {
    if (!drag.current) return
    if (!drag.current.moved) {
      /* Tap simple → ouvrir/fermer le menu */
      setOpen(o => !o)
    } else {
      /* Fin du glissement → sauvegarder */
      setPos(prev => {
        if (prev) localStorage.setItem('theme-btn-pos', JSON.stringify(prev))
        return prev
      })
    }
    setDragging(false)
    drag.current = null
  }

  /* Attacher touchmove en non-passif */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    el.addEventListener('touchmove', onTouchMoveNative, { passive: false })
    return () => el.removeEventListener('touchmove', onTouchMoveNative)
  }, [onTouchMoveNative])

  /* Fermer le menu si on touche ailleurs */
  useEffect(() => {
    if (!open) return
    const close = (e: TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('touchstart', close)
    return () => document.removeEventListener('touchstart', close)
  }, [open])

  /* Direction du popup selon la position dans l'écran */
  const menuAbove = pos ? pos.y > window.innerHeight * 0.5 : true
  const menuLeft  = pos ? pos.x > window.innerWidth  * 0.5 : false

  /* ══════════════════════════════════════════
     RENDU
  ══════════════════════════════════════════ */
  return (
    <>
      {/* ── Desktop — comportement original (inchangé) ── */}
      <div
        className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-center gap-2"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className={`flex flex-col gap-2 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {options.map(opt => (
            <button key={opt.key} onClick={() => setTheme(opt.key)} title={opt.label}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 border
                ${theme === opt.key
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white scale-110'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:scale-105'
                }`}>
              {icons[opt.key]}
            </button>
          ))}
        </div>
        <button
          className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl flex items-center justify-center border-2 border-gray-700 dark:border-gray-200 hover:scale-110 transition-all duration-300"
          title="Thème">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
        </button>
      </div>

      {/* ── Mobile — bouton glissable ── */}
      {pos && (
        <div
          ref={wrapRef}
          className="md:hidden fixed z-50"
          style={{
            left:        pos.x,
            top:         pos.y,
            touchAction: 'none',
            userSelect:  'none',
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >

          {/* ── Popup des options (tap) ── */}
          {open && (
            <div className={`absolute flex flex-col gap-2
              ${menuAbove ? 'bottom-14'  : 'top-14'}
              ${menuLeft  ? 'right-0'   : 'left-0'}
            `}>
              {options.map(opt => (
                <button
                  key={opt.key}
                  onTouchEnd={e => { e.stopPropagation(); setTheme(opt.key); setOpen(false) }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xl border-2 transition-all
                    ${theme === opt.key
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white scale-110'
                      : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                    }`}
                  title={opt.label}
                >
                  {icons[opt.key]}
                </button>
              ))}
            </div>
          )}

          {/* ── Bouton principal ── */}
          <button
            className={`w-12 h-12 rounded-full flex flex-col items-center justify-center gap-0.5
              bg-gray-900 dark:bg-white text-white dark:text-gray-900
              shadow-xl border-2 border-gray-700 dark:border-gray-200
              transition-all duration-200
              ${dragging ? 'scale-110 shadow-2xl opacity-75' : 'opacity-90 active:scale-95'}
            `}
            title="Thème — glissez pour déplacer"
          >
            {/* Icône thème actif */}
            {icons[theme as 'light' | 'dark' | 'system'] ?? icons.system}

            {/* Indicateur de glissement (3 points) */}
            <div className="flex gap-0.5 mt-0.5">
              {[0,1,2].map(i => (
                <span key={i} className="w-1 h-1 rounded-full bg-current opacity-50" />
              ))}
            </div>
          </button>
        </div>
      )}
    </>
  )
}