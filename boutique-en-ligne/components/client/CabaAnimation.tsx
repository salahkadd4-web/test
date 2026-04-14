'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CabaAnimation() {
  const [phase, setPhase] = useState<'fermee' | 'ouverture' | 'ouverte'>('fermee')

  useEffect(() => {
    // Après 1.5s → début ouverture
    const t1 = setTimeout(() => setPhase('ouverture'), 1500)
    // Après 3s → complètement ouverte
    const t2 = setTimeout(() => setPhase('ouverte'), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[400px] md:h-[500px]">
      {/* Image fermée */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${
        phase === 'fermee' ? 'opacity-100' : 'opacity-0'
      }`}>
        <Image
          src="/caba_fermante.png"
          alt="CabaStore fermée"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Image ouverture (crossfade entre les deux) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        phase === 'ouverture' ? 'opacity-100' : 'opacity-0'
      }`}>
        <Image
          src="/caba_fermante.png"
          alt="CabaStore en ouverture"
          fill
          className="object-contain animate-pulse"
        />
      </div>

      {/* Image ouverte */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        phase === 'ouverte' ? 'opacity-100' : 'opacity-0'
      }`}>
        <Image
          src="/caba_ouverte.png"
          alt="CabaStore ouverte"
          fill
          className="object-contain"
        />
      </div>

      {/* Effet de lumière pendant l'ouverture */}
      <div className={`absolute inset-0 bg-white rounded-full transition-all duration-700 pointer-events-none ${
        phase === 'ouverture' ? 'opacity-20 scale-150' : 'opacity-0 scale-100'
      }`} />
    </div>
  )
}