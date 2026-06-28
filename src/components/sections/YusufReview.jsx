import useInView from '@/hooks/useInView'
import TestimonialCard from '@/components/sections/TestimonialCard'

const yusuf = {
  quote: 'Çok güzel bir şekilde site oluşturuldu. 48 saat içinde tasarımlar teslim ettiler. İstediğim şekilde düzenleyerek tasarımları ve internet sitesini oluşturdular.',
  author: 'Yusuf',
  initials: 'Y',
}

export default function YusufReview() {
  const { ref, inView } = useInView()

  return (
    <section id="yusuf-review" className="relative bg-black section-pad">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: 'rgba(217,119,6,0.04)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
          }`}
        >
          <TestimonialCard
            quote={yusuf.quote}
            author={yusuf.author}
            initials={yusuf.initials}
          />
        </div>
      </div>
    </section>
  )
}
