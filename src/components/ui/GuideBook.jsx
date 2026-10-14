// 3D cover of the lead-magnet PDF; motion lives in index.css (book-*)
export default function GuideBook() {
  return (
    <div className="book-scene" aria-hidden="true">
      <div className="book-glow" />
      <div className="book-float">
        <div className="book">
          <div className="book-pages" />
          <div className="book-cover">
            <span className="font-display font-bold text-[13px] text-white">Sennin<span className="text-gold-500">Web</span></span>
            <div className="mt-auto">
              <p className="font-display font-bold text-[26px] leading-[1.05] text-white">Yurt Dışından<br />Hasta Çekme</p>
              <p className="font-display font-bold text-[26px] leading-[1.05] text-gold-gradient">Rehberi 2026</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Saç ekimi", "Diş", "Estetik", "Veteriner"].map((t) => (
                  <span key={t} className="text-[9px] text-gold-300 border border-gold-300/30 rounded-full px-2 py-0.5">{t}</span>
                ))}
              </div>
            </div>
            <p className="mt-6 text-[9px] text-white/45">15 sayfa · Ücretsiz PDF</p>
          </div>
        </div>
      </div>
    </div>
  )
}
