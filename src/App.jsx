import React, { useEffect } from 'react'
import Lenis from 'lenis'

import CustomCursor  from '@/components/ui/CustomCursor'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import Hero          from '@/components/sections/Hero'
import Manifesto     from '@/components/sections/Manifesto'
import Services      from '@/components/sections/Services'
import HowWeWork     from '@/components/sections/HowWeWork'
import References    from '@/components/sections/References'
import Contact       from '@/components/sections/Contact'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
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
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <HowWeWork />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
