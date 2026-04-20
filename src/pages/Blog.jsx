import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const posts = [
  {
    slug: "kucuk-isletme-web-sitesi",
    title: "Küçük İşletmeler İçin Web Sitesi Nasıl Müşteri Getirir?",
    desc: "Web sitesi ile müşteri kazanmanın temel stratejileri.",
    tag: "Büyüme",
    readingTime: "6 dk",
    date: "2026"
  }
]

function upsertMetaByName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
  return el
}

export default function Blog() {
  const navigate = useNavigate()

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null

    document.title = "Web Tasarım ve SEO Rehberi | SenninWeb"
    upsertMetaByName(
      "description",
      "Web tasarım, SEO ve dijital büyüme üzerine rehberler. İşletmenizi internette büyütmek için stratejiler."
    )

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
    }
  }, [])

  return (
    <section className="px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="pt-6 pb-10 md:pb-14">
          <button
            type="button"
            data-cursor
            onClick={() => {
              navigate("/")
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03]
                       px-4 py-2 text-xs text-white/70 hover:text-white hover:border-white/20 transition-colors"
          >
            <span className="text-base leading-none">←</span>
            Ana Sayfaya Dön
          </button>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Dijital Rehber
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight">
            Web Tasarım ve SEO Rehberi
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/55 max-w-2xl leading-relaxed">
            Küçük işletmeler için modern web tasarım, dönüşüm optimizasyonu ve SEO üzerine pratik yazılar.
          </p>

          <div className="mt-8 gold-line opacity-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              data-cursor
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]
                         hover:border-white/20 hover:bg-white/[0.05] transition-colors"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400/90">
                      {post.tag}
                    </span>
                    <span className="text-[10px] text-white/30">•</span>
                    <span className="text-[10px] text-white/40">{post.readingTime}</span>
                  </div>
                  <span className="text-[10px] text-white/35">{post.date}</span>
                </div>

                <h2 className="mt-4 text-xl md:text-2xl font-display font-semibold leading-snug text-white">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-white/55 leading-relaxed">
                  {post.desc}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors">
                  Devamını oku
                  <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}