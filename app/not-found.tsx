import Link from 'next/link'

/**
 * Custom 404 — Premium Dark Aesthetic
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-8 max-w-lg">
        {/* Visual Decoration */}
        <div className="relative">
          <span className="font-outfit font-black text-[120px] md:text-[160px] leading-none opacity-5 select-none">
            404
          </span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent text-5xl">
            ⬡
          </span>
        </div>
        
        <div className="flex flex-col gap-4 mt-[-20px]">
          <h2 className="font-outfit font-bold text-3xl text-txt-primary uppercase tracking-tight">
            Protocolo <em className="text-accent not-italic">Inexistente</em>
          </h2>
          <p className="text-txt-secondary text-[15px] leading-relaxed">
            La ruta solicitada no forma parte de nuestra infraestructura digital. 
            Es posible que el acceso haya sido revocado o la dirección sea incorrecta.
          </p>
        </div>

        <Link
          href="/"
          className="bg-accent text-bg-primary font-outfit font-bold text-xs tracking-widest uppercase px-12 py-5 rounded-button shadow-[0_20px_40px_rgba(207,174,58,0.2)] hover:shadow-[0_25px_50px_rgba(207,174,58,0.3)] hover:-translate-y-1 transition-all duration-300"
        >
          REGRESAR AL NÚCLEO
        </Link>
      </div>
    </div>
  )
}
