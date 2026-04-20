export function scrollToIdWithRetry(id, { behavior = "smooth", block = "start", maxAttempts = 240 } = {}) {
  if (typeof document === "undefined") return

  let attempts = 0

  const tick = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior, block })
      return
    }

    attempts += 1
    if (attempts < maxAttempts) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

