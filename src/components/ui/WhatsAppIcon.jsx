import { WHATSAPP_PATH } from "@/content/icons"

export default function WhatsAppIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={WHATSAPP_PATH} />
    </svg>
  )
}
