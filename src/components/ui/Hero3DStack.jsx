import { useEffect, useRef } from "react"
import { getMotionTier } from "@/utils/motionTier"

// Isometric layer stack that tells the funnel story bottom → top:
// Google result → website → traffic → incoming lead.
// Motion lives in index.css (h3d-*): entrance assemble, ambient float,
// scroll-driven layer separation, pointer tilt via --tx/--ty.

function SerpLayer() {
  return (
    <div className="h3d-card p-5">
      <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-white/[0.06] border border-white/10 mb-4">
        <span className="w-3 h-3 rounded-full border-2 border-white/40" />
        <span className="text-[11px] text-white/70">dental implants turkey</span>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg border border-gold-500/50 bg-gold-500/10 p-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] font-bold text-black bg-gold-400 rounded px-1">1</span>
            <span className="text-[10px] text-gold-300">kliniginiz.com</span>
          </div>
          <div className="h-1.5 w-4/5 rounded bg-gold-300/70" />
        </div>
        {[0.55, 0.4].map((w) => (
          <div key={w} className="px-2.5">
            <div className="h-1.5 rounded bg-white/15 mb-1.5" style={{ width: `${w * 100}%` }} />
            <div className="h-1 rounded bg-white/10 w-11/12" />
          </div>
        ))}
      </div>
    </div>
  )
}

function SiteLayer() {
  return (
    <div className="h3d-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/25" />
          <span className="w-2 h-2 rounded-full bg-white/25" />
          <span className="w-2 h-2 rounded-full bg-white/25" />
        </div>
        <div className="flex gap-2">
          <span className="w-8 h-1.5 rounded bg-white/20" />
          <span className="w-8 h-1.5 rounded bg-white/20" />
          <span className="w-10 h-3 rounded-full bg-gold-500" />
        </div>
      </div>
      <div className="h-2.5 w-3/4 rounded bg-white/80 mb-2" />
      <div className="h-2.5 w-1/2 rounded bg-gradient-to-r from-gold-300 to-gold-600 mb-3" />
      <div className="h-1.5 w-2/3 rounded bg-white/20 mb-4" />
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-md border border-white/10 bg-white/[0.04]" />
        ))}
      </div>
    </div>
  )
}

function TrafficLayer() {
  const bars = [28, 36, 32, 48, 44, 62, 70, 86]
  return (
    <div className="h3d-card p-5 flex flex-col">
      <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1">Yurt dışı ziyaret</p>
      <p className="font-display font-bold text-lg text-white mb-3">Her ay artıyor</p>
      <div className="flex items-end gap-2 flex-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-gold-600/60 to-gold-300"
            style={{ height: `${h}%`, opacity: 0.45 + i * 0.07 }}
          />
        ))}
      </div>
    </div>
  )
}

function LeadLayer() {
  return (
    <div className="h3d-card h3d-card--lead p-5 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-3">
        <span className="relative flex w-9 h-9 items-center justify-center rounded-full bg-[#25D366] text-white text-sm font-bold">
          W
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-gold-400 border-2 border-surface-100" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-white leading-tight">Yeni hasta talebi</p>
          <p className="text-[10px] text-white/50">şimdi · WhatsApp · +44</p>
        </div>
      </div>
      <div className="rounded-xl rounded-tl-sm bg-white/[0.07] border border-white/10 px-3 py-2.5">
        <p className="text-[12px] text-white/85 leading-snug">
          Hi, I found your clinic on Google. Can I get a quote for implants?
        </p>
      </div>
    </div>
  )
}

const LAYERS = [SerpLayer, SiteLayer, TrafficLayer, LeadLayer]

export default function Hero3DStack() {
  const sceneRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fine = window.matchMedia("(pointer: fine)")
    if (reduce.matches || !fine.matches || getMotionTier() !== "full") return

    const host = scene.closest("section") || scene
    let frame = 0
    let nx = 0
    let ny = 0

    const apply = () => {
      frame = 0
      scene.style.setProperty("--tx", `${(nx * 8).toFixed(2)}deg`)
      scene.style.setProperty("--ty", `${(-ny * 6).toFixed(2)}deg`)
    }
    const onMove = (e) => {
      const r = host.getBoundingClientRect()
      nx = (e.clientX - r.left) / r.width - 0.5
      ny = (e.clientY - r.top) / r.height - 0.5
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      nx = 0
      ny = 0
      if (!frame) frame = requestAnimationFrame(apply)
    }

    host.addEventListener("pointermove", onMove, { passive: true })
    host.addEventListener("pointerleave", onLeave)
    return () => {
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={sceneRef} className="h3d-scene" aria-hidden="true">
      <div className="h3d-glow" />
      <div className="h3d-tilt">
        <div className="h3d-float">
          <div className="h3d-stack">
            {LAYERS.map((Layer, i) => (
              <div key={i} className="h3d-layer" style={{ "--i": i }}>
                <Layer />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
