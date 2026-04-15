'use client'

import { useEffect, useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'

/** Contenido interno que usa hooks del cliente */
function ModalContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [isOpen, setIsOpen] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  useEffect(() => {
    // Cuando Wompi redirige, envía en la URL algo como: ?id=01-1531231271-19365&env=test
    const wompiId = searchParams.get('id')
    
    if (wompiId) {
      setTransactionId(wompiId)
      setIsOpen(true)
      
      // Limpiamos la URL para que, si el usuario recarga, no vuelva a salir
      // Se hace con replace para no ensuciar el historial
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
    }
  }, [searchParams])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="
              relative w-full max-w-sm overflow-hidden rounded-2xl 
              border border-success/30 bg-[#1A1A24] p-8 
              shadow-[0_20px_60px_rgba(74,222,128,0.15)]
              flex flex-col items-center text-center
            "
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-txt-secondary hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Ícono de Éxito */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center border border-success/40 shadow-[0_0_40px_rgba(74,222,128,0.3)] mb-6"
            >
              <svg className="text-success w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="font-syne text-2xl font-bold tracking-tight text-white mb-2">
              Pago Exitoso
            </h2>
            <p className="text-sm text-txt-secondary leading-relaxed mb-6">
              El protocolo de cobro ha concluido correctamente. Hemos notificado al equipo para procesar tu proyecto.
            </p>

            <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5 space-y-1 mb-8">
              <p className="text-[10px] text-txt-faint uppercase tracking-widest font-bold">
                Referencia Wompi
              </p>
              <p className="font-mono text-success text-xs break-all">
                {transactionId}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary w-full justify-center text-xs tracking-widest uppercase py-3"
            >
              CONTINUAR NAVEGANDO
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/** 
 * Envoltura Suspense para no arruinar el Server-Side Rendering de la app 
 * por culpa de useSearchParams().
 */
export default function WompiSuccessModal() {
  return (
    <Suspense fallback={null}>
      <ModalContent />
    </Suspense>
  )
}
