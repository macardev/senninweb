import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function CustomCursor() {
  const location = useLocation()
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const rafRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const ringRef = useRef({ x: -100, y: -100 })
  const clickablesRef = useRef(new Set())
  const listenerRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const ring = ringRef.current
      const pos = posRef.current
      ring.x += (pos.x - ring.x) * 0.08
      ring.y += (pos.y - ring.y) * 0.08

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${ring.x - 18}px, ${ring.y - 18}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x - 3}px, ${pos.y - 3}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', move, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const grow = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('scale-[2.5]', 'border-gold-500', 'opacity-60')
      }
    }
    const shrink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('scale-[2.5]', 'border-gold-500', 'opacity-60')
      }
    }

    const handleMouseEnter = (e) => {
      if (clickablesRef.current.has(e.target)) grow()
    }
    const handleMouseLeave = (e) => {
      if (clickablesRef.current.has(e.target)) shrink()
    }

    const updateClickables = () => {
      if (listenerRef.current) {
        document.removeEventListener('mouseenter', handleMouseEnter, true)
        document.removeEventListener('mouseleave', handleMouseLeave, true)
      }
      const clickables = document.querySelectorAll('a, button, [role="button"], [data-cursor]')
      clickablesRef.current.clear()
      clickables.forEach(el => clickablesRef.current.add(el))

      document.addEventListener('mouseenter', handleMouseEnter, true)
      document.addEventListener('mouseleave', handleMouseLeave, true)
      listenerRef.current = { handleMouseEnter, handleMouseLeave }
    }

    updateClickables()

    return () => {
      if (listenerRef.current) {
        document.removeEventListener('mouseenter', handleMouseEnter, true)
        document.removeEventListener('mouseleave', handleMouseLeave, true)
      }
    }
  }, [location.pathname])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/30 pointer-events-none z-[9999] transition-transform duration-200 will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold-500 pointer-events-none z-[9999] will-change-transform"
      />
    </>
  )
}
