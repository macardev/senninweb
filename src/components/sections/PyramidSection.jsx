import PyramidComparison from '@/components/ui/PyramidComparison'

export default function PyramidSection() {
  return (
    <section className="relative bg-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2
                        w-[800px] h-[500px] rounded-full
                        bg-gold-500/5 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="gold-line opacity-20 mb-20" />

        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-gold-500" />
          <span className="text-xs tracking-[0.25em] uppercase text-gold-400 font-medium">
            Dönüşüm
          </span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl
                       tracking-tight leading-tight mb-6 max-w-4xl">
          <span className="text-white">Tıklamaları Raporlayan Pazarlamadan,</span>
          <br />
          <span className="text-gold-gradient">Gelir Raporlayan Pazarlamaya Geçin</span>
        </h2>

        <p className="text-white/60 text-sm leading-relaxed mb-12 max-w-2xl">
          Geleneksel pazarlama metrikleri size tıklamaları gösterir.
          Gerçek büyüme ise satışla ölçülür. SenninWeb stratejisiyle her adımı
          gelire dönüştürün.
        </p>

        <PyramidComparison />

        <div className="gold-line opacity-20 mt-20" />
      </div>
    </section>
  )
}
