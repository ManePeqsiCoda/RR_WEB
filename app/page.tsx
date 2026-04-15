import HeroSection from '@/components/home/HeroSection'
import TrayectoriaSection from '@/components/home/TrayectoriaSection'
import ServiciosGrid from '@/components/home/ServiciosGrid'
import PricingSection from '@/components/home/PricingSection'
import MetricsDashboard from '@/components/home/MetricsDashboard'
import NewsletterSection from '@/components/home/NewsletterSection'

/**
 * HomePage — Landing principal de RR Aliados.
 * Ensambla todas las secciones en el orden estratégico del embudo.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="border-t border-white/5" aria-hidden="true" />
      <TrayectoriaSection />

      <div className="border-t border-white/5" aria-hidden="true" />
      <ServiciosGrid />

      <div className="border-t border-white/5" aria-hidden="true" />
      <PricingSection />

      <div className="border-t border-white/5" aria-hidden="true" />
      <MetricsDashboard />

      <div className="border-t border-white/5" aria-hidden="true" />
      <NewsletterSection />
    </>
  )
}
