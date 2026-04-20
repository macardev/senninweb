import { lazy, Suspense } from "react"

import Hero from "@/components/sections/Hero"
import BlogCTA from "@/components/sections/BlogCTA"

const Manifesto = lazy(() => import("@/components/sections/Manifesto"))
const Services = lazy(() => import("@/components/sections/Services"))
const HowWeWork = lazy(() => import("@/components/sections/HowWeWork"))
const References = lazy(() => import("@/components/sections/References"))
const Contact = lazy(() => import("@/components/sections/Contact"))

export default function Home() {
  return (
    <>
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

      <BlogCTA />

      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Contact />
      </Suspense>
    </>
  )
}

