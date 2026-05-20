import { useLocation } from "react-router-dom"

const BASE = "https://senninweb.com"

export default function useCanonicalUrl() {
  const { pathname } = useLocation()

  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "")

  return `${BASE}${normalized}`
}
