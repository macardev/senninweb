import React, { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor({ routeKey }) {
  const cursorRef = useRef(null)
  const dotRef    = useRef(null)
  const clickablesRef = useRef(new Set())
  const listenerRef = useRef(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Büyük halka — gecikmeli, yavaş
  const springX = useSpring(mouseX, { stiffness: 80,  damping: 20, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 80,  damping: 20, mass: 0.5 })

  // Küçük nokta — anlık
  const dotX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.2 })
  const dotY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.2 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Use passive event listener and throttle if needed
    window.addEventListener('mousemove', move, { passive: true, capture: false })

    return () => {
      window.removeEventListener('mousemove', move, { capture: false })
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    // Batch DOM reads to avoid layout thrashing
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

    // Use event delegation instead of individual listeners
    const handleMouseEnter = (e) => {
      if (clickablesRef.current.has(e.target)) {
        grow()
      }
    }
    const handleMouseLeave = (e) => {
      if (clickablesRef.current.has(e.target)) {
        shrink()
      }
    }

    // Update clickables list - batch DOM reads once
    const updateClickables = () => {
      // Clear previous listeners
      if (listenerRef.current) {
        document.removeEventListener('mouseenter', handleMouseEnter, true)
        document.removeEventListener('mouseleave', handleMouseLeave, true)
      }

      // Batch DOM read: get all clickables at once
      const clickables = document.querySelectorAll('a, button, [role="button"], [data-cursor]')
      clickablesRef.current.clear()
      
      clickables.forEach(el => {
        clickablesRef.current.add(el)
      })

      // Use event delegation on document
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
  }, [routeKey])

  return (
    <>
      {/* Büyük halka */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/30 pointer-events-none z-[9999] transition-transform duration-200"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Küçük merkez nokta */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold-500 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
