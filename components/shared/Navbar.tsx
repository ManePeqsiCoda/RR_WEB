'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import QuotePaymentModal from './QuotePaymentModal'

/** Navigation link item definition */
interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
]

/**
 * Navbar — Componente de navegación global sticky con glassmorphism.
 * Incluye menú hamburguesa para mobile e indicador de sección activa.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 h-16
        glass border-b border-accent-border
        transition-shadow duration-300
        ${isScrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : ''}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* ── LOGO ── */}
        <Link
          href="/"
          onClick={closeMenu}
          className="
            font-mono font-medium text-accent tracking-widest uppercase
            text-[14px] hover:text-accent-light transition-colors duration-200
          "
        >
          RR ALIADOS
        </Link>

        {/* ── LINKS DESKTOP ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`
                    transition-colors duration-200
                    text-sm tracking-wider uppercase font-outfit
                    ${isActive ? 'text-accent font-semibold' : 'text-txt-secondary hover:text-txt-primary'}
                  `}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* ── CTA DESKTOP ── */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="
              text-xs tracking-widest uppercase font-outfit font-semibold
              text-txt-secondary hover:text-accent transition-all duration-300
              px-4 py-2 hover:bg-white/[0.03] rounded-button
            "
          >
            Pagar Cotización
          </button>
          
          <Link
            href="/contacto"
            className="
              bg-accent text-bg-primary font-outfit font-bold
              text-xs tracking-widest uppercase px-5 py-2.5 rounded-button
              hover:brightness-110 transition-all duration-200
              inline-flex items-center gap-1.5
            "
          >
            INICIAR PROTOCOLO
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ── HAMBURGUESA MOBILE ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`
              block w-5 h-0.5 bg-txt-primary transition-all duration-300
              ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}
            `}
          />
          <span
            className={`
              block w-5 h-0.5 bg-txt-primary transition-all duration-300
              ${isMenuOpen ? 'opacity-0' : ''}
            `}
          />
          <span
            className={`
              block w-5 h-0.5 bg-txt-primary transition-all duration-300
              ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}
            `}
          />
        </button>
      </nav>

      {/* ── MENÚ MOBILE DESPLEGABLE ── */}
      <div
        className={`
          md:hidden glass border-t border-accent-border
          transition-all duration-300 overflow-hidden
          ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`
                    block transition-colors duration-200
                    text-sm tracking-wider uppercase font-outfit py-2
                    ${isActive ? 'text-accent font-semibold' : 'text-txt-secondary hover:text-txt-primary'}
                  `}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                closeMenu()
                setIsQuoteModalOpen(true)
              }}
              className="btn-secondary w-full justify-center"
            >
              Pagar Cotización
            </button>
            <Link
              href="/contacto"
              onClick={closeMenu}
              className="
                btn-primary w-full justify-center
              "
            >
              INICIAR PROTOCOLO →
            </Link>
          </li>
        </ul>
      </div>

      <QuotePaymentModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </header>
  )
}

