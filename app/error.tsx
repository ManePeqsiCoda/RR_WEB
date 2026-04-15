'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Global Error Boundary — Premium dark style.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Runtime Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-8 max-w-lg">
        <span className="text-error text-6xl" aria-hidden="true">
          ⚠
        </span>
        
        <div className="flex flex-col gap-4">
          <h2 className="font-syne font-bold text-3xl text-txt-primary">
            Error en el <em className="text-accent not-italic">Sistema</em>
          </h2>
          <p className="text-txt-secondary text-[15px] leading-relaxed">
            Se ha detectado una anomalía en la carga de la arquitectura.
            Nuestros agentes están analizando los logs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 bg-accent text-bg-primary font-syne font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-button hover:brightness-110 active:scale-[0.98] transition-all"
          >
            REINTENTAR ACCESO
          </button>
          
          <Link
            href="/"
            className="flex-1 border border-white/10 text-txt-primary font-syne font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-button hover:border-accent/40 transition-all"
          >
            VOLVER AL INICIO
          </Link>
        </div>
      </div>
    </div>
  )
}
