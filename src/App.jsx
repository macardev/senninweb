import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { lazy, Suspense } from "react"

import CustomCursor  from '@/components/ui/CustomCursor'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
const Manifesto = lazy(() => import('@/components/sections/Manifesto'))
const Services = lazy(() => import('@/components/sections/Services'))
const HowWeWork = lazy(() => import('@/components/sections/HowWeWork'))
const References = lazy(() => import('@/components/sections/References'))
const Contact = lazy(() => import('@/components/sections/Contact'))

export default function App() {
    useEffect(() => {
      const isMobile = window.innerWidth < 768

      if (isMobile) return // 📱 mobilde Lenis çalışmaz

      const lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => lenis.destroy()
    }, [])

  return (
  <>
    {typeof window !== "undefined" && window.innerWidth > 768 && <CustomCursor />}
    
    <Navbar />

    <main>
      <Hero />

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

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Contact />
      </Suspense>
    </main>

    <Footer />
  </>
)
}
