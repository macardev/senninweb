import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
  useEffect(() => {
    document.title = "Sayfa Bulunamadı | SenninWeb"
    const desc = document.head.querySelector('meta[name="description"]')
    const orig = desc?.getAttribute("content") ?? ""
    upsertMetaByName("description", "Aradığınız sayfa mevcut değil. SenninWeb ana sayfasına dönün.")
    upsertMetaByName("robots", "noindex, follow")
    return () => {
      if (orig) upsertMetaByName("description", orig)
      upsertMetaByName("robots", "index, follow")
    }
  }, [])

  return (
    <div className="px-6 md:px-12 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">404</h1>
        <p className="text-lg text-white/60 mb-8">Aradığınız sayfa bulunamadı.</p>
        <Link
          to="/"
          data-cursor
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium tracking-wide bg-gold-500 text-black hover:bg-gold-400 transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}

function upsertMetaByName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}
