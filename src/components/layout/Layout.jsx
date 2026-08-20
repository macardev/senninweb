import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { scrollToIdWithRetry } from "@/utils/scrollToId"

const BASE = "https://www.senninweb.com"

const CustomCursor = lazy(() => import("@/components/ui/CustomCursor"))

const breadcrumbLabels = {
  "/hakkimizda": "Hakkımızda",
  "/blog": "Dijital Rehber",
  "/bilecik": "Bilecik",
  "/kocaeli": "Kocaeli",
  "/sss": "Sıkça Sorulan Sorular",
  "/hizmet/web-tasarim": "Web Tasarım",
  "/hizmet/seo-ve-buyume": "SEO & Büyüme",
  "/hizmet/eticaret-cozumleri": "E-Ticaret Çözümleri",
  "/hizmet/dijital-pazarlama": "Dijital Pazarlama",
}

function getCursorEnabled() {
  if (typeof window === "undefined") return false
  if (window.innerWidth <= 768) return false
  if (window.matchMedia && window.matchMedia("(pointer: fine)").matches === false) return false
  if (window.matchMedia && window.matchMedia("(hover: hover)").matches === false) return false
  return true
}

export default function Layout() {
  const location = useLocation()
  const [cursorEnabled, setCursorEnabled] = useState(getCursorEnabled)

  const breadcrumbItems = useMemo(() => {
    const items = [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": BASE }
    ]
    const path = location.pathname === "/" ? null : location.pathname.replace(/\/+$/, "")
    if (path) {
      const label = breadcrumbLabels[path] || path.replace("/", "").replace(/-/g, " ")
      items.push({ "@type": "ListItem", "position": 2, "name": label, "item": `${BASE}${path}` })
      if (path.startsWith("/blog/")) {
        items[1] = { "@type": "ListItem", "position": 2, "name": "Dijital Rehber", "item": `${BASE}/blog` }
        items.push({ "@type": "ListItem", "position": 3, "name": "Makale", "item": `${BASE}${path}` })
      }
    }
    return items
  }, [location.pathname])

  useEffect(() => {
    const update = () => setCursorEnabled(getCursorEnabled())
    update()

    window.addEventListener("resize", update)
    const fine = window.matchMedia?.("(pointer: fine)")
    const hover = window.matchMedia?.("(hover: hover)")
    fine?.addEventListener?.("change", update)
    hover?.addEventListener?.("change", update)

    return () => {
      window.removeEventListener("resize", update)
      fine?.removeEventListener?.("change", update)
      hover?.removeEventListener?.("change", update)
    }
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return
    document.body.classList.toggle("cursor-none", cursorEnabled)
    return () => {
      document.body.classList.remove("cursor-none")
    }
  }, [cursorEnabled])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (location.pathname !== "/") return
    if (!location.hash) return

    const id = location.hash.startsWith("#") ? location.hash.slice(1) : location.hash
    if (!id) return

    setTimeout(() => scrollToIdWithRetry(id), 0)
  }, [location.pathname, location.hash])

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {cursorEnabled && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}

      <Navbar />

      <div className="min-h-screen flex flex-col bg-black text-white max-w-full relative z-10">
        <main className="flex-1 pt-28 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
