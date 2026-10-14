import { lazy, Suspense, useEffect } from "react"

import Hero from "@/components/sections/Hero"
import LazySection from "@/components/ui/LazySection"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"

// Below-the-fold sections, in page order. `anchor` = id used by navbar hash links.
const SECTIONS = [
  { load: () => import("@/components/sections/MahirAkarReview") },
  { load: () => import("@/components/sections/YusufReview") },
  { load: () => import("@/components/sections/PyramidSection") },
  { load: () => import("@/components/sections/Manifesto") },
  { load: () => import("@/components/sections/Services"), anchor: "services" },
  { load: () => import("@/components/sections/HowWeWork"), anchor: "how" },
  { load: () => import("@/components/sections/LeadMagnet"), anchor: "ucretsiz-rehber" },
  { load: () => import("@/components/sections/Testimonials") },
  { load: () => import("@/components/sections/References"), anchor: "references" },
  { load: () => import("@/components/sections/BlogCTA") },
  { load: () => import("@/components/sections/Contact"), anchor: "contact" },
].map((s) => ({ ...s, Component: lazy(s.load) }))

// Warm the section chunks once the user starts interacting (or the page goes idle),
// so scrolling never waits on the network but first load stays light.
function usePrefetchSections() {
  useEffect(() => {
    let done = false
    const prefetch = () => {
      if (done) return
      done = true
      SECTIONS.forEach((s) => s.load())
      cleanup()
    }
    const events = ["scroll", "pointerdown", "keydown", "touchstart"]
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 5000))
    const idleId = idle(prefetch, { timeout: 8000 })
    events.forEach((e) => window.addEventListener(e, prefetch, { passive: true, once: true }))
    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, prefetch))
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
    }
    return cleanup
  }, [])
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

export default function Home() {
  const canonicalUrl = useCanonicalUrl()
  usePrefetchSections()

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = "Klinikler İçin Web Sitesi & SEO | Yurt Dışından Hasta | SenninWeb"
    upsertMetaByName("description", "Saç ekim, diş, estetik ve veteriner klinikleri için sağlık turizmi web sitesi ve SEO. Yurt dışından sıcak hasta talepleri alın. Ücretsiz rehberi indirin.")
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", "Klinikler İçin Web Sitesi & SEO | Yurt Dışından Hasta | SenninWeb")
    upsertMetaByProperty("og:description", "Saç ekim, diş, estetik ve veteriner klinikleri için sağlık turizmi web sitesi ve SEO. Yurt dışından sıcak hasta talepleri alın. Ücretsiz rehberi indirin.")
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)
    upsertMetaByProperty("og:image", "https://www.senninweb.com/og-image.jpg")
    upsertMetaByProperty("og:image:width", "1200")
    upsertMetaByProperty("og:image:height", "630")

    upsertMetaByName("twitter:card", "summary_large_image")
    upsertMetaByName("twitter:title", "Klinikler İçin Web Sitesi & SEO | Yurt Dışından Hasta | SenninWeb")
    upsertMetaByName("twitter:description", "Saç ekim, diş, estetik ve veteriner klinikleri için sağlık turizmi web sitesi ve SEO. Yurt dışından sıcak hasta talepleri alın. Ücretsiz rehberi indirin.")

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [canonicalUrl])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SenninWeb",
    "url": "https://www.senninweb.com",
    "inLanguage": "tr-TR",
    "description": "Yurt dışından hasta çekmek isteyen sağlık klinikleri için web sitesi, uluslararası SEO ve hasta kazanım ajansı.",
    "publisher": { "@id": "https://www.senninweb.com" }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {SECTIONS.map(({ Component, anchor }, i) => (
        <LazySection key={i} anchor={anchor}>
          <Suspense fallback={<div style={{ height: "400px" }} />}>
            <Component />
          </Suspense>
        </LazySection>
      ))}
    </>
  )
}
