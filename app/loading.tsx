/**
 * Loading — Global loading spinner for route transitions.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent animate-pulse">
          Sincronizando Protocolo
        </span>
      </div>
    </div>
  )
}
