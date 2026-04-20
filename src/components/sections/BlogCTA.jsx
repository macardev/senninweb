import { Link } from "react-router-dom"

export default function BlogCTA() {
  return (
    <section className="relative bg-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gold-500/7 blur-[120px]" />
        <div className="absolute inset-0 noise opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-gold-500/10 blur-[80px] pointer-events-none" />

          <div className="relative p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Dijital Rehber
              </div>

              <h2 className="mt-4 text-2xl md:text-4xl font-display font-bold tracking-tight text-white">
                Dijital Rehberler ile İşinizi Büyütün
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/55 leading-relaxed">
                Web tasarım, SEO ve dijital büyüme hakkında hazırladığımız rehberlerle işletmenizi bir adım öne taşıyın.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/blog"
                data-cursor
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide
                           bg-gold-500 text-black hover:bg-gold-400 transition-colors"
              >
                Rehberleri Keşfet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

