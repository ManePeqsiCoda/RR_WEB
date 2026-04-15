'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

// ── TIPOS Y DATOS MOCK ──

interface Quote {
  id: string
  concept: string
  amountInCents: number
  currency: 'COP'
  customerEmail: string
  status: 'ACTIVA' | 'EXPIRADA'
}

const MOCK_QUOTES: Quote[] = [
  {
    id: 'COT-2026',
    concept: 'Desarrollo Ecosistema Digital RR',
    amountInCents: 350000000,
    currency: 'COP',
    customerEmail: 'cliente@ejemplo.com',
    status: 'ACTIVA'
  },
  {
    id: 'COT-001',
    concept: 'Soberanía Total - Plan Anual',
    amountInCents: 500000000,
    currency: 'COP',
    customerEmail: 'soporte@rr.aliados',
    status: 'ACTIVA'
  }
]

interface QuotePaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

type ModalView = 'search' | 'results'

/**
 * QuotePaymentModal — Flujo de pago para usuarios recurrentes.
 * Usa Wompi Web Checkout (redirección) — el método más robusto
 * según docs oficiales: https://docs.wompi.co/en/docs/colombia/widget-checkout-web/#web-checkout
 */
export default function QuotePaymentModal({ isOpen, onClose }: QuotePaymentModalProps) {
  const [view, setView] = useState<ModalView>('search')
  const [quoteNumber, setQuoteNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [foundQuote, setFoundQuote] = useState<Quote | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // ── LÓGICA DE BÚSQUEDA ──

  const handleSearch = () => {
    if (!quoteNumber.trim()) return

    setIsLoading(true)
    setError(null)

    setTimeout(() => {
      const quote = MOCK_QUOTES.find(
        q => q.id.toUpperCase() === quoteNumber.toUpperCase().trim()
      )

      if (quote) {
        setFoundQuote(quote)
        setView('results')
      } else {
        setError('Cotización no encontrada. Verifique el ID.')
        toast.error('Registro no encontrado')
      }
      setIsLoading(false)
    }, 800)
  }

  // ── WOMPI WEB CHECKOUT (REDIRECCIÓN OFICIAL) ──

  const handlePayment = useCallback(async () => {
    if (!foundQuote) return

    setIsPaymentLoading(true)

    try {
      // 1. Generar referencia única
      const reference = `${foundQuote.id}-${Date.now()}`

      // 2. Obtener firma de integridad desde el servidor
      const res = await fetch('/api/wompi/integrity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference,
          amountInCents: foundQuote.amountInCents,
          currency: foundQuote.currency,
        }),
      })

      if (!res.ok) throw new Error('Error generando firma de integridad')
      const { signature } = await res.json()

      // 3. Construir URL de Wompi Web Checkout con todos los parámetros
      const params: Record<string, string> = {
        'public-key': process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!,
        'currency': foundQuote.currency,
        'amount-in-cents': String(foundQuote.amountInCents),
        'reference': reference,
        'signature:integrity': signature,
        'customer-data:email': foundQuote.customerEmail,
        'customer-data:full-name': 'Cliente RR Aliados',
      }

      // Wompi WAF bloquea localhost en redirect-url (arroja 403). Solo lo agregamos en Prod/Staging.
      if (window.location.hostname !== 'localhost') {
        params['redirect-url'] = window.location.origin
      }

      const wompiParams = new URLSearchParams(params)

      // 4. Redirigir a la página de pago de Wompi
      const wompiUrl = `https://checkout.wompi.co/p/?${wompiParams.toString()}`
      window.open(wompiUrl, '_blank')

      setIsPaymentLoading(false)
      toast.success('Ventana de pago Wompi abierta')

    } catch (err: any) {
      console.error('Wompi Payment Error:', err)
      toast.error(err.message || 'Error al conectar con Wompi.')
      setIsPaymentLoading(false)
    }
  }, [foundQuote])

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setView('search')
      setQuoteNumber('')
      setError(null)
      setFoundQuote(null)
      setIsPaymentLoading(false)
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A24] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
          >
            <button
              onClick={handleClose}
              className="absolute right-5 top-5 text-txt-secondary hover:text-txt-primary transition-colors z-10"
              aria-label="Cerrar modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* ── ESTADO 1: BÚSQUEDA ── */}
            {view === 'search' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-outfit text-2xl font-bold tracking-tight text-txt-primary">
                    Consulta tu Cotización
                  </h2>
                  <p className="text-sm text-txt-secondary leading-relaxed">
                    Ingresa el identificador asignado (ej. <span className="text-accent/80 font-mono">COT-2026</span>) para continuar con el protocolo de pago.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="ID de cotización"
                        value={quoteNumber}
                        onChange={(e) => setQuoteNumber(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className={`form-input focus:ring-1 ${error ? 'border-red-500/50' : 'focus:ring-accent/30'}`}
                        disabled={isLoading}
                        autoFocus
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {isLoading && (
                          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </div>
                    {error && <p className="text-[11px] text-red-400 pl-1">{error}</p>}
                  </div>

                  <button
                    onClick={handleSearch}
                    disabled={!quoteNumber.trim() || isLoading}
                    className="btn-primary w-full justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'VERIFICANDO...' : 'BUSCAR REGISTRO'}
                    {!isLoading && (
                      <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── ESTADO 2: RESULTADOS + PAGO CON WOMPI ── */}
            {view === 'results' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-outfit text-2xl font-bold tracking-tight text-txt-primary">
                    Resumen de Pago
                  </h2>
                  <p className="text-xs text-txt-secondary uppercase tracking-[0.2em]">Datos verificados</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/40 p-6 space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-txt-faint font-bold mb-1">Registro ID</p>
                      <p className="text-lg font-mono text-accent">{foundQuote?.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-txt-faint font-bold mb-1">Estado</p>
                      <p className="text-[10px] text-success font-bold bg-success/10 px-2 py-0.5 rounded border border-success/20 inline-block tracking-widest">
                        {foundQuote?.status}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-txt-faint font-bold mb-1">Descripción</p>
                    <p className="text-sm text-txt-secondary mt-1 font-medium italic">&quot;{foundQuote?.concept}&quot;</p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-txt-faint font-bold leading-none mb-2">Total a Cancelar</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-outfit font-black text-txt-primary">
                        ${((foundQuote?.amountInCents || 0) / 100).toLocaleString('es-CO')}
                      </p>
                      <p className="text-xs font-mono text-txt-secondary">{foundQuote?.currency}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handlePayment}
                    disabled={isPaymentLoading}
                    className="
                      w-full py-4 rounded-button font-outfit font-bold text-xs tracking-[0.2em] uppercase
                      bg-[#4A9EFF] text-bg-primary shadow-[0_0_24px_rgba(74,158,255,0.3)]
                      hover:shadow-[0_0_35px_rgba(74,158,255,0.5)] hover:brightness-110
                      active:scale-[0.98] transition-all duration-300
                      disabled:opacity-60 disabled:cursor-wait
                    "
                  >
                    {isPaymentLoading ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                        GENERANDO ENLACE DE PAGO...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        PAGAR CON WOMPI
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => { setView('search'); setError(null) }}
                    className="flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-widest text-txt-secondary hover:text-txt-primary transition-colors font-bold"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5"></path>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Realizar otra búsqueda
                  </button>
                </div>

                {/* Wompi Sandbox info */}
                <div className="text-center space-y-1 pt-2 border-t border-white/5">
                  <p className="text-[9px] text-txt-faint uppercase tracking-widest">
                    Entorno Sandbox · Pagos seguros por Wompi
                  </p>
                  <p className="text-[9px] text-txt-faint font-mono">
                    Tarjeta de prueba: 4242 4242 4242 4242 · CVC: 123 · Exp: 12/29
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
