import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor({ routeKey }) {
  const cursorRef = useRef(null)
  const dotRef    = useRef(null)

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

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  useEffect(() => {
    // Hover: tıklanabilir elementlerde cursor büyüsün
    const grow = () => {
      cursorRef.current?.classList.add('scale-[2.5]', 'border-gold-500', 'opacity-60')
    }
    const shrink = () => {
      cursorRef.current?.classList.remove('scale-[2.5]', 'border-gold-500', 'opacity-60')
    }

    const clickables = document.querySelectorAll('a, button, [role="button"], [data-cursor]')
    clickables.forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
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
