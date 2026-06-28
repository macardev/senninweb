import { lazy, Suspense, useEffect } from "react"

import Hero from "@/components/sections/Hero"
import BlogCTA from "@/components/sections/BlogCTA"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"

const MahirAkarReview = lazy(() => import("@/components/sections/MahirAkarReview"))
const YusufReview = lazy(() => import("@/components/sections/YusufReview"))
const PyramidSection = lazy(() => import("@/components/sections/PyramidSection"))
const Manifesto = lazy(() => import("@/components/sections/Manifesto"))
const DesignShowcase = lazy(() => import("@/components/sections/DesignShowcase"))
const Services = lazy(() => import("@/components/sections/Services"))
const HowWeWork = lazy(() => import("@/components/sections/HowWeWork"))
const References = lazy(() => import("@/components/sections/References"))
const Testimonials = lazy(() => import("@/components/sections/Testimonials"))
const Contact = lazy(() => import("@/components/sections/Contact"))

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

export default function Home() {
  const canonicalUrl = useCanonicalUrl()

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = "Web Tasarım & SEO Hizmeti | SenninWeb"
    upsertMetaByName("description", "Web siteniz Google'da yoksa müşteri kaybediyorsunuz. Premium web tasarım ve SEO ile işletmenizi dijitalde büyütün, organik müşteri kazanmaya başlayın.")
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", "Web Tasarım & SEO Hizmeti | SenninWeb")
    upsertMetaByProperty("og:description", "Web siteniz Google'da yoksa müşteri kaybediyorsunuz. Premium web tasarım ve SEO ile işletmenizi dijitalde büyütün.")
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)
    upsertMetaByProperty("og:image", "https://www.senninweb.com/og-image.svg")
    upsertMetaByProperty("og:image:width", "1200")
    upsertMetaByProperty("og:image:height", "630")

    upsertMetaByName("twitter:card", "summary_large_image")
    upsertMetaByName("twitter:title", "Web Tasarım & SEO Hizmeti | SenninWeb")
    upsertMetaByName("twitter:description", "Web siteniz Google'da yoksa müşteri kaybediyorsunuz. Premium web tasarım ve SEO ile işletmenizi dijitalde büyütün.")

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [canonicalUrl])

  const today = new Date().toISOString().split('T')[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SenninWeb",
    "url": "https://www.senninweb.com",
    "description": "KOBİ'ler için premium web tasarım, SEO ve dijital pazarlama ajansı.",
    "dateModified": today,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.senninweb.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <MahirAkarReview />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <DesignShowcase />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <YusufReview />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <PyramidSection />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Manifesto />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Services />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <HowWeWork />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <References />
      </Suspense>

      <BlogCTA />

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Contact />
      </Suspense>
    </>
  )
}
