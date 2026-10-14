import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { HERO_HTML } from '@/content/heroMarkup'
import { getMotionTier } from '@/utils/motionTier'

const Hero3DStack = lazy(() => import('@/components/ui/Hero3DStack'))

function getHost() {
  return typeof document === 'undefined' ? null : document.getElementById('hero-host')
}

// The hero is prerendered into #hero-host (index.html). On a first visit to "/" we keep
// that exact DOM node on screen instead of re-rendering it, so the browser's first paint
// stays the LCP. After client-side navigation the host is gone, so we render the same
// markup ourselves.
export default function Hero() {
  const navigate = useNavigate()
  const fallbackRef = useRef(null)
  const [useStatic] = useState(() => Boolean(getHost()?.querySelector('[data-static-hero]')))
  const [slot, setSlot] = useState(null)

  useLayoutEffect(() => {
    const host = getHost()
    const root = useStatic ? host : fallbackRef.current
    if (!root) return

    if (useStatic) {
      host.hidden = false
      document.body.classList.add('has-static-hero')
    }

    // Plain <a> tags in the markup: route internal links through the router
    const onClick = (e) => {
      const a = e.target.closest('a[href^="/"]')
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      navigate(a.getAttribute('href'))
    }
    root.addEventListener('click', onClick)
    setSlot(root.querySelector('[data-hero-3d]'))

    return () => {
      root.removeEventListener('click', onClick)
      if (useStatic) {
        host.hidden = true
        document.body.classList.remove('has-static-hero')
      }
    }
  }, [useStatic, navigate])

  // 3D scene only where it is visible (lg+) and the device can afford it
  const [show3D, setShow3D] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setShow3D(mq.matches && getMotionTier() !== 'off')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const scene = slot && show3D
    ? createPortal(<Suspense fallback={null}><Hero3DStack /></Suspense>, slot)
    : null

  if (useStatic) return scene

  return (
    <>
      <div ref={fallbackRef} dangerouslySetInnerHTML={{ __html: HERO_HTML }} />
      {scene}
    </>
  )
}
