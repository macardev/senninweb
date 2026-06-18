import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllBlogPosts } from "@/data/blogPosts"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"

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

function upsertMetaByProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("property", property)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
  return el
}

function upsertLinkByRel(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
  return el
}

export default function Blog() {
  const navigate = useNavigate()
  const canonicalUrl = useCanonicalUrl()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBlogPosts().then(data => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevOgUrl = document.head.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = "Blog | SenninWeb - Web Tasarım ve SEO Rehberleri"
    upsertMetaByName(
      "description",
      "Web siteniz neden müşteri getirmiyor? 2026 web tasarım fiyatları, SEO stratejileri ve dijital büyüme rehberleriyle işletmenizi Google'da üst sıralara taşıyın."
    )
    upsertMetaByProperty("og:title", "Blog | SenninWeb - Web Tasarım ve SEO Rehberleri")
    upsertMetaByProperty("og:description", "Web siteniz neden müşteri getirmiyor? 2026 web tasarım fiyatları, SEO stratejileri ve dijital büyüme rehberleri.")
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)
    upsertMetaByProperty("og:image", "https://www.senninweb.com/og-image.svg")
    upsertMetaByProperty("og:image:width", "1200")
    upsertMetaByProperty("og:image:height", "630")

    upsertMetaByName("twitter:card", "summary_large_image")
    upsertMetaByName("twitter:title", "Blog | SenninWeb - Web Tasarım ve SEO Rehberleri")
    upsertMetaByName("twitter:description", "Web siteniz neden müşteri getirmiyor? 2026 web tasarım fiyatları, SEO stratejileri ve dijital büyüme rehberleri.")

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevOgUrl !== null) upsertMetaByProperty("og:url", prevOgUrl)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [canonicalUrl])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog | SenninWeb - Web Tasarım ve SEO Rehberleri",
    "description": "Web siteniz neden müşteri getirmiyor? 2026 web tasarım fiyatları, SEO stratejileri ve dijital büyüme rehberleri.",
    "url": canonicalUrl,
  }

  return (
    <section className="px-6 md:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <p className="mt-3 text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
            Küçük işletmeler için modern web tasarım, dönüşüm optimizasyonu ve SEO üzerine pratik yazılar.
          </p>

          <div className="mt-8 gold-line opacity-20" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <div className="w-4 h-4 rounded-full border border-gold-500/30 border-t-gold-500 animate-spin" />
              Yükleniyor...
            </div>
          </div>
        ) : (
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
                      <span className="text-[10px] text-white/55">•</span>
                      <span className="text-[10px] text-white/60">{post.readingTime}</span>
                    </div>
                    <span className="text-[10px] text-white/60">{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>

                  {post.coverImage && (
                    <div className="mt-4 -mx-7 rounded-none overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.shortTitle}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <h2 className="mt-4 text-xl md:text-2xl font-display font-semibold leading-snug text-white">
                    {post.shortTitle}
                  </h2>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">
                    {post.desc}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors min-h-[44px]">
                    Devamını oku
                    <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
