import { useEffect, useMemo, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CustomCursor from "@/components/ui/CustomCursor"
import { scrollToIdWithRetry } from "@/utils/scrollToId"

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

  const cursorKey = useMemo(
    () => `${location.pathname}${location.search}${location.hash}`,
    [location.pathname, location.search, location.hash]
  )

  return (
    <>
      {cursorEnabled && <CustomCursor routeKey={cursorKey} />}

      <Navbar />

      <div className="min-h-screen flex flex-col bg-black text-white">
        <main className="flex-1 pt-28">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

