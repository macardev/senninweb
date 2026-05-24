import { lazy, Suspense, useEffect } from "react"

import Hero from "@/components/sections/Hero"
import BlogCTA from "@/components/sections/BlogCTA"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"

const PyramidSection = lazy(() => import("@/components/sections/PyramidSection"))
const Manifesto = lazy(() => import("@/components/sections/Manifesto"))
const Services = lazy(() => import("@/components/sections/Services"))
const HowWeWork = lazy(() => import("@/components/sections/HowWeWork"))
const References = lazy(() => import("@/components/sections/References"))
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

    document.title = "Web Tasarım & SEO Hizmeti | Sennin Web"
    upsertMetaByName("description", "Sennin Web ile premium web tasarımı, SEO danışmanlığı ve kurumsal kimlik hizmetleri alın. İşletmenizi Google'da üst sıralara taşıyın, organik müşteri kazanın.")
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", "Web Tasarım & SEO Hizmeti | Sennin Web")
    upsertMetaByProperty("og:description", "Premium web tasarım, SEO ve kurumsal kimlik hizmetleri. İşletmenizi dijitalde büyütün.")
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)

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
    "name": "Sennin Web",
    "url": "https://www.senninweb.com",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

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
        <References />
      </Suspense>

      <BlogCTA />

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Contact />
      </Suspense>
    </>
  )
}
