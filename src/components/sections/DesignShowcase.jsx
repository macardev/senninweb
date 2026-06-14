import { useIsMobile } from '@/hooks/useIsMobile'
import DesignEditorial from '@/components/sections/DesignEditorial'
import DesignDarkTech from '@/components/sections/DesignDarkTech'
import DesignNeobrutalist from '@/components/sections/DesignNeobrutalist'

const showcaseItems = [
  {
    num: '01',
    title: 'Editöryal Tasarım',
    desc: 'Dergi estetiğinde dijital deneyim. Krem zemin, serif tipografi ve gazete grid\'i ile sofistike bir görünüm.',
    tags: ['Editorial', 'Serif', 'Magazine'],
    Component: DesignEditorial,
  },
  {
    num: '02',
    title: 'Dark Tech Tasarım',
    desc: 'Teknoloji odaklı karanlık tema. Neon yeşil vurgular, terminal estetiği ve edge computing havası.',
    tags: ['Dark Mode', 'Tech', 'Terminal'],
    Component: DesignDarkTech,
  },
  {
    num: '03',
    title: 'Neobrutalist Tasarım',
    desc: 'Cesur ve sıradışı. Kalın konturlar, canlı sarı ve kırmızı aksanlar, organik blob animasyonları.',
    tags: ['Brutalist', 'Bold', 'Abstract'],
    Component: DesignNeobrutalist,
  },
]

function DesktopShowcase() {
  return (
    <section className="relative w-full bg-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gold-500 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            Tasarım Stilleri
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mt-3">
            Size özel <span className="text-gold-gradient">tasarım</span> yaklaşımları
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Her biri farklı bir estetik anlayışıyla hazırlanmış üç özgün tasarım stili.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {showcaseItems.map((item) => {
            const Comp = item.Component
            return (
              <div key={item.num} className="relative rounded-2xl overflow-hidden border border-white/10" style={{ height: '520px' }}>
                <div className="w-full h-full">
                  <Comp />
                </div>

                <div className="absolute top-0 left-0 z-20 w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                  <span className="text-gold-500 text-xs font-mono tracking-widest">
                    {item.num}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-display font-bold mt-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-widest uppercase text-white/40 border border-white/10 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MobileShowcase() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gold-500 mb-4">
          <span className="w-8 h-px bg-gold-500" />
          Tasarım Stilleri
        </span>
        <h2 className="font-display font-bold text-3xl text-white leading-tight mt-3 mb-10">
          Size özel <span className="text-gold-gradient">tasarım</span> yaklaşımları
        </h2>

        {showcaseItems.map((item) => {
          const Comp = item.Component
          return (
            <div key={item.num} className="mb-8">
              <div className="rounded-xl overflow-hidden" style={{ height: '380px' }}>
                <Comp />
              </div>
              <div className="mt-4">
                <span className="text-gold-500 text-xs font-mono tracking-widest">
                  {item.num}
                </span>
                <h3 className="text-white text-xl font-display font-bold mt-1">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm mt-1 leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-widest uppercase text-white/40 border border-white/10 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function DesignShowcase() {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileShowcase />
  return <DesktopShowcase />
}
