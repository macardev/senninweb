import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { scrollToIdWithRetry } from "@/utils/scrollToId"
import { getBlogPost } from "@/data/blogPosts"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9çşğüöı]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

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

function renderSection(section, index) {
  switch (section.type) {
    case "heroSection":
      return (
        <div key={index} className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            {section.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-display font-semibold text-white/80">
            {section.subtitle}
          </h3>
        </div>
      )

    case "heading2":
      return (
        <h2 key={index} id={slugify(section.content)} className="text-2xl md:text-3xl font-display font-semibold text-white pt-8 scroll-mt-28">
          {section.isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: section.content }} />
          ) : (
            section.content
          )}
        </h2>
      )

    case "heading3":
      return (
        <h3 key={index} className="text-xl md:text-2xl font-display font-semibold text-white">
          {section.isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: section.content }} />
          ) : (
            section.content
          )}
        </h3>
      )

    case "paragraph":
      return (
        <p key={index} className="text-sm md:text-base text-white/65 leading-relaxed">
          {section.isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: section.content }} />
          ) : (
            section.content
          )}
        </p>
      )

    case "intro":
      return (
        <p key={index} className="text-sm md:text-base text-white/65 leading-relaxed">
          {section.isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: section.content }} />
          ) : (
            section.content
          )}
        </p>
      )

    case "bulletList":
      return (
        <ul key={index} className="space-y-2 text-sm md:text-base text-white/65 leading-relaxed list-disc pl-5 marker:text-gold-500/80">
          {section.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {section.isHtml ? (
                <span dangerouslySetInnerHTML={{ __html: item }} />
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      )

    case "question":
      return (
        <div key={index} className="space-y-3">
          <p className="text-sm md:text-base text-white/65 leading-relaxed">
            {section.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: section.question }} />
            ) : (
              section.question
            )}
          </p>
          <p className="text-sm md:text-base text-white/65 leading-relaxed font-semibold">
            {section.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: section.answer }} />
            ) : (
              section.answer
            )}
          </p>
        </div>
      )

    case "conclusion":
      return (
        <div key={index} className="space-y-3">
          <p className="text-sm md:text-base text-white/65 leading-relaxed">
            {section.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: section.intro }} />
            ) : (
              section.intro
            )}
          </p>
          <ul className="space-y-2 text-sm md:text-base text-white/65 leading-relaxed list-disc pl-5 marker:text-gold-500/80">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {section.isHtml ? (
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base text-white/65 leading-relaxed">
            {section.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: section.closing }} />
            ) : (
              section.closing
            )}
          </p>
        </div>
      )

    case "finalParagraph":
      return (
        <p key={index} className="text-sm md:text-base text-white/65 leading-relaxed">
          {section.isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: section.content }} />
          ) : (
            section.content
          )}
        </p>
      )

    case "finalCta":
      return (
        <div key={index} className="space-y-3">
          <p className="text-sm md:text-base text-white/65 leading-relaxed font-semibold">
            {section.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: section.question }} />
            ) : (
              section.question
            )}
          </p>
          <p className="text-sm md:text-base text-white/65 leading-relaxed">
            {section.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: section.ctaText }} />
            ) : (
              section.ctaText
            )}
          </p>
        </div>
      )

    case "section":
      return (
        <div key={index} className="space-y-5">
          <p className="text-sm md:text-base text-white/65 leading-relaxed">
            {section.isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: section.content }} />
            ) : (
              section.content
            )}
          </p>
          <div className="space-y-8">
            {section.subsections?.map((subsection, subIndex) => (
              <div key={subIndex} className="space-y-3">
                <h3 id={slugify(subsection.heading)} className="text-xl md:text-2xl font-display font-semibold text-white scroll-mt-28">
                  {subsection.isHtml ? (
                    <span dangerouslySetInnerHTML={{ __html: subsection.heading }} />
                  ) : (
                    subsection.heading
                  )}
                </h3>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  {subsection.isHtml ? (
                    <span dangerouslySetInnerHTML={{ __html: subsection.content }} />
                  ) : (
                    subsection.content
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

export default function BlogPost() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const canonicalUrl = useCanonicalUrl()

  useEffect(() => {
    setLoading(true)
    getBlogPost(slug).then(data => {
      setPost(data)
      setLoading(false)
    })
  }, [slug])

  useEffect(() => {
    if (!post) return
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevViewport = document.head.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? null
    const prevRobots = document.head.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevOgType = document.head.querySelector('meta[property="og:type"]')?.getAttribute("content") ?? null
    const prevOgUrl = document.head.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = post.title
    upsertMetaByName("description", post.metaDescription)
    upsertMetaByName("viewport", "width=device-width, initial-scale=1.0")
    upsertMetaByName("robots", "index, follow")

    upsertMetaByProperty("og:title", post.title)
    upsertMetaByProperty("og:description", post.metaDescription)
    upsertMetaByProperty("og:type", "article")
    upsertMetaByProperty("og:url", canonicalUrl)

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevViewport !== null) upsertMetaByName("viewport", prevViewport)
      if (prevRobots !== null) upsertMetaByName("robots", prevRobots)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevOgType !== null) upsertMetaByProperty("og:type", prevOgType)
      if (prevOgUrl !== null) upsertMetaByProperty("og:url", prevOgUrl)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [post, canonicalUrl])

  const tocEntries = useMemo(() => {
    if (!post) return []
    const entries = []
    for (const section of post.sections) {
      if (section.type === "heading2" && section.content) {
        entries.push({
          id: slugify(section.content),
          label: section.content,
        })
      }
      if (section.type === "section" && section.subsections) {
        for (const sub of section.subsections) {
          if (sub.heading) {
            entries.push({
              id: slugify(sub.heading),
              label: sub.heading,
            })
          }
        }
      }
    }
    return entries
  }, [post])

  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    if (!tocEntries.length) return
    const ids = tocEntries.map(e => e.id)
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [tocEntries])

  if (loading) {
    return (
      <div className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-white/60">
            <div className="w-4 h-4 rounded-full border border-gold-500/30 border-t-gold-500 animate-spin" />
            Yükleniyor...
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Sayfa Bulunamadı</h1>
          <p className="text-white/60 mb-8">Bu blog yazısı mevcut değil.</p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide bg-gold-500 text-black hover:bg-gold-400 transition-colors"
          >
            Blog'a Dön
          </Link>
        </div>
      </div>
    )
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.shortTitle,
    description: post.metaDescription,
    image: "https://www.senninweb.com/og-image.jpg",
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorTitle,
    },
    publisher: {
      "@type": "Organization",
      name: "SenninWeb",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.schemaUrl,
    },
  }

  return (
    <article className="px-6 md:px-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={tocEntries.length > 0 ? "lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 max-w-6xl mx-auto" : "max-w-3xl mx-auto"}>
        {tocEntries.length > 0 && (
          <aside className="hidden lg:block relative">
            <nav className="sticky top-32 space-y-1.5 border-l border-white/10 pl-5 max-h-[calc(100vh-10rem)] overflow-y-auto">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4 font-semibold">
                İçindekiler
              </p>
              {tocEntries.map(entry => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  onClick={e => {
                    e.preventDefault()
                    const el = document.getElementById(entry.id)
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`block text-xs leading-relaxed py-1.5 border-l-2 transition-all duration-200 -ml-5 pl-5 ${
                    activeId === entry.id
                      ? "border-gold-500 text-white font-medium"
                      : "border-transparent text-white/50 hover:text-white/80 hover:border-white/30"
                  }`}
                >
                  {entry.label}
                </a>
              ))}
            </nav>
          </aside>
        )}

        <div className="min-w-0">
          <div className="pt-6 pb-10">
            <div className="flex flex-wrap items-center gap-2">
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
              <Link
                to="/blog"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03]
                           px-4 py-2 text-xs text-white/70 hover:text-white hover:border-white/20 transition-colors"
              >
                <span className="text-base leading-none">←</span>
                Dijital Rehber
              </Link>
            </div>

             <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
              <span className="text-gold-400/90 font-semibold">{post.tag}</span>
              <span className="text-white/55">•</span>
              <span className="text-white/60">{post.readingTime}</span>
              <span className="text-white/55">•</span>
              <span className="text-white/60">{post.date}</span>
            </div>

            <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
              {post.shortTitle}
            </h1>
            <p className="mt-3 text-xs md:text-sm text-white/65">
              Yazar: {post.author} • {post.authorTitle}
            </p>
            <p className="mt-5 text-sm md:text-base text-white/65 leading-relaxed">
              {post.description}
            </p>

            <div className="mt-8 gold-line opacity-20" />
          </div>

          <div className="space-y-10 text-white/70 leading-relaxed">
            {post.sections.map((section, index) => renderSection(section, index))}

            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 blur-[70px] pointer-events-none" />

              <h2 className="relative text-lg md:text-2xl font-display font-semibold text-white">
                Hazır mısınız?
              </h2>
              <p className="relative mt-3 text-sm md:text-base text-white/65 leading-relaxed max-w-xl">
                Web sitenizi müşteri kazandıran, premium bir sisteme dönüştürelim. Hız, SEO ve dönüşüm odaklı bir planı birlikte çıkaralım.
              </p>

              <div className="relative mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/#contact"
                  data-cursor
                  onClick={(e) => {
                    e.preventDefault()
                    navigate("/")
                    setTimeout(() => scrollToIdWithRetry("contact"), 0)
                  }}
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium tracking-wide
                             bg-gold-500 text-black hover:bg-gold-400 transition-colors w-full sm:w-auto"
                >
                  Ücretsiz Teklif Al
                </Link>
                <span className="text-xs text-white/60">
                  Ortalama dönüş süresi: 24 saat
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}
