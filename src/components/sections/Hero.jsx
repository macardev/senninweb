import { useNavigate, useLocation } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'
import { scrollToIdWithRetry } from '@/utils/scrollToId'
import DesignEditorial from '@/components/sections/DesignEditorial'
import DesignDarkTech from '@/components/sections/DesignDarkTech'
import DesignNeobrutalist from '@/components/sections/DesignNeobrutalist'

function DesktopHero() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleScrollTo = (targetId) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => scrollToIdWithRetry(targetId), 0)
    } else {
      scrollToIdWithRetry(targetId)
    }
  }

  const handleBlogNavigation = () => {
    if (location.pathname !== "/blog") {
      navigate("/blog")
    }
  }

  return (
    <section className="relative bg-black min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 md:right-[40%] bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-full md:w-2/5 h-full bg-black pointer-events-none z-0" />

      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12 items-center">
          <div>
            <div className="animate-heroIn" style={{ animationDelay: '0s' }}>
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gold-500 mb-8">
                <span className="w-8 h-px bg-gold-500" />
                Premium Web Tasarım & SEO
              </span>
            </div>

            <div className="animate-heroIn" style={{ animationDelay: '0.1s' }}>
              <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-6 max-w-full overflow-hidden break-words">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  İşletmeniz için
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  profesyonel
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold-gradient">
                  web tasarım ve Seo hizmeti
                </span>
              </h1>
            </div>

            <div className="animate-heroIn" style={{ animationDelay: '0.2s' }}>
              <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
                Etkileyici web tasarımı ve güçlü SEO ile işletmenizi dijitalde
                rakiplerinizin önüne geçiriyoruz.
              </p>
            </div>

            <div className="animate-heroIn" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => handleScrollTo("contact")}
                  className="w-full sm:w-auto relative px-8 sm:px-10 py-4 sm:py-5 rounded-full font-medium text-base tracking-wide overflow-hidden group cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                >
                  <span className="absolute inset-0 rounded-full bg-gold-500 group-hover:bg-gold-400 transition-colors duration-300" />
                  <span className="relative z-10 text-black font-semibold whitespace-nowrap">
                    Ücretsiz Teklif Al
                  </span>
                </button>

                <button
                  onClick={handleBlogNavigation}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-white/20 hover:border-white/40 text-base font-medium text-white/70 hover:text-white transition-all duration-200 group cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span className="whitespace-nowrap">Blog'a Git</span>
                </button>
              </div>
            </div>

            <div className="animate-heroIn" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-16 pt-8 border-t border-white/8">
                {[
                  { value: '24s',  label: 'Ortalama yanıt süresi' },
                  { value: 'SEO',  label: 'Dahil her pakette'     },
                  { value: '100%', label: 'Müşteri memnuniyeti'   },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-display font-bold text-lg sm:text-xl text-white mb-0.5">
                      {item.value}
                    </p>
                    <p className="text-xs text-white/60 tracking-wide">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-black" style={{ minHeight: '400px' }}>
            <DesignNeobrutalist compact />
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileHero() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleScrollTo = (targetId) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => scrollToIdWithRetry(targetId), 0)
    } else {
      scrollToIdWithRetry(targetId)
    }
  }

  const handleBlogNavigation = () => {
    if (location.pathname !== "/blog") {
      navigate("/blog")
    }
  }

  return (
    <section className="relative w-full bg-black pt-28 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gold-500 mb-8">
            <span className="w-8 h-px bg-gold-500" />
            Premium Web Tasarım & SEO
          </span>

          <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-6">
            <span className="block text-4xl text-white">İşletmeniz için</span>
            <span className="block text-4xl text-white">profesyonel</span>
            <span className="block text-4xl text-gold-gradient">web tasarım ve Seo hizmeti</span>
          </h1>

          <p className="text-base text-white/60 leading-relaxed mb-8 max-w-lg">
            Etkileyici web tasarımı ve güçlü SEO ile işletmenizi dijitalde
            rakiplerinizin önüne geçiriyoruz.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto relative px-8 py-4 rounded-full font-medium text-base tracking-wide overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full bg-gold-500" />
              <span className="relative z-10 text-black font-semibold whitespace-nowrap">
                Ücretsiz Teklif Al
              </span>
            </button>

            <button
              onClick={handleBlogNavigation}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-base font-medium text-white/70"
            >
              <span className="whitespace-nowrap">Blog'a Git</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/8 mb-10">
            {[
              { value: '24s',  label: 'Ortalama yanıt süresi' },
              { value: 'SEO',  label: 'Dahil her pakette'     },
              { value: '100%', label: 'Müşteri memnuniyeti'   },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display font-bold text-lg text-white mb-0.5">{item.value}</p>
                <p className="text-xs text-white/60 tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ maxHeight: '320px' }}>
          <DesignEditorial compact />
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileHero />
  return <DesktopHero />
}
