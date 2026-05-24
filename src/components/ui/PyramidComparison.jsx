import { useState, useRef, useCallback, useEffect } from 'react'

const CX = 200
const TY = 50
const TW = 80
const BY = 450
const BW = 320
const LH = 100

const LAYERS = [
  { lines: ['Satış'],              color: '#FCD34D', textColor: '#1A1A1A', glow: true  },
  { lines: ['Potansiyel', 'Müşteriler'], color: '#86EFAC', textColor: '#1A1A1A', glow: false },
  { lines: ['Web Sitesi', 'Trafiği'],    color: '#22C55E', textColor: '#fff',    glow: false },
  { lines: ['Marka', 'Görünürlüğü'],     color: '#3B82F6', textColor: '#fff',    glow: false },
]

function w(y) {
  return TW + (BW - TW) * (y - TY) / (BY - TY)
}

function coords(i) {
  const yT = TY + i * LH
  const yB = TY + (i + 1) * LH
  const wT = w(yT)
  const wB = w(yB)
  return {
    yT, yB,
    xTL: CX - wT / 2, xTR: CX + wT / 2,
    xBL: CX - wB / 2, xBR: CX + wB / 2,
  }
}

function path(c) {
  return `M${c.xTL},${c.yT} L${c.xTR},${c.yT} L${c.xBR},${c.yB} L${c.xBL},${c.yB} Z`
}

export default function PyramidComparison() {
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const containerRef = useRef(null)

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  const onDown = useCallback((e) => {
    dragging.current = true
    updatePos(e.clientX ?? e.touches[0].clientX)
  }, [updatePos])

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      updatePos(e.clientX ?? e.touches[0].clientX)
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [updatePos])

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/5] select-none"
        onMouseDown={onDown}
        onTouchStart={onDown}
        style={{ touchAction: 'none' }}
      >
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {LAYERS.map((layer, i) => {
            const c = coords(i)
            return (
              <path
                key={layer.lines[0]}
                d={path(c)}
                fill="none"
                stroke={layer.color}
                strokeWidth="1"
                strokeDasharray="5 5"
                opacity="0.15"
              />
            )
          })}
          <line
            x1={CX} y1={TY} x2={CX} y2={BY}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{
            clipPath: `inset(0 0 0 ${pos}%)`,
            WebkitClipPath: `inset(0 0 0 ${pos}%)`,
          }}
        >
          <defs>
            <filter id="goldGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {LAYERS.map((layer, i) => {
            const c = coords(i)
            return (
              <g key={layer.lines[0]}>
                <path
                  d={path(c)}
                  fill={layer.color}
                  opacity={layer.glow ? 0.95 : 0.8}
                  filter={layer.glow ? 'url(#goldGlow)' : undefined}
                />
                <path
                  d={path(c)}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />
              </g>
            )
          })}

          {LAYERS.map((layer, i) => {
            const c = coords(i)
            const yMid = (c.yT + c.yB) / 2
            const lineCount = layer.lines.length
            return (
              <text
                key={layer.lines[0]}
                textAnchor="middle"
                fill={layer.textColor}
                fontSize={lineCount > 1 ? '9.5' : '11'}
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="600"
              >
                {layer.lines.map((line, li) => (
                  <tspan
                    key={li}
                    x={CX}
                    y={yMid + (li - (lineCount - 1) / 2) * 13}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            )
          })}
        </svg>

        <div
          className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute inset-y-0 w-[3px] bg-gold-500 shadow-[0_0_10px_rgba(217,119,6,0.5)]" />
          <div className="relative z-10 w-8 h-8 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(217,119,6,0.6)] flex items-center justify-center cursor-ew-resize pointer-events-auto">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="3" r="1.5" fill="black" />
              <circle cx="7" cy="7" r="1.5" fill="black" />
              <circle cx="7" cy="11" r="1.5" fill="black" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-xs font-medium">
        <span className="text-white/40">Geleneksel Pazarlama</span>
        <span className="text-gold-400">SenninWeb Stratejisi</span>
      </div>
    </div>
  )
}
