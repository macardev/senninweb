export const WHATSAPP_NUMBER = "905314051584"
export const PHONE_HREF = "tel:+905314051584"
export const EMAIL = "business@senninweb.com"

export const GUIDE_PATH = "/rehber/yurt-disindan-hasta-cekme"
export const GUIDE_PDF_URL = "/rehber/yurt-disindan-hasta-cekme-rehberi.pdf"

const DEFAULT_MESSAGE = "Merhaba, kliniğim için yurt dışından hasta kazanımı hakkında bilgi almak istiyorum."

// Path-aware opener so the first WhatsApp message already tells us what the lead wants
const PATH_MESSAGES = [
  ["/hizmet/web-tasarim", "Merhaba, kliniğim için yurt dışına yönelik çok dilli bir web sitesi planlıyorum. Kısa analiz alabilir miyim?"],
  ["/hizmet/seo-ve-buyume", "Merhaba, kliniğimin hedef ülkede Google'da görünmesi için sağlık turizmi SEO hizmetiniz hakkında bilgi almak istiyorum."],
  ["/hizmet/dijital-pazarlama", "Merhaba, kliniğim için yurt dışından hasta kazanımı (WhatsApp akışı ve pazarlama) hakkında bilgi almak istiyorum."],
  ["/blog/yurt-disindan-hasta", "Merhaba, yurt dışından hasta çekme yazınızı okudum. Kliniğim için kısa analiz istiyorum."],
  ["/kocaeli", "Merhaba, Kocaeli'deki işletmem için web sitesi / SEO hakkında bilgi almak istiyorum."],
  ["/bilecik", "Merhaba, Bilecik'teki işletmem için web sitesi / SEO hakkında bilgi almak istiyorum."],
  ["/blog/", "Merhaba, blogunuzdaki yazıyı okudum. İşletmemin sitesi için destek almak istiyorum."],
  ["/rehber/", "Merhaba, yurt dışından hasta çekme rehberinizi inceledim. Kliniğim için kısa analiz istiyorum."],
]

export function whatsappMessageFor(pathname = "/") {
  const hit = PATH_MESSAGES.find(([prefix]) => pathname.startsWith(prefix))
  return hit ? hit[1] : DEFAULT_MESSAGE
}

export function whatsappHref(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function mailtoHref(subject, body = "") {
  const params = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20")
  return `mailto:${EMAIL}?${params}`
}

// GA4 loads lazily (index.html); queued dataLayer entries are replayed once gtag.js arrives
export function trackLead(channel, placement) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  // gtag() expects the arguments object, not an array
  ;(function gtag() { window.dataLayer.push(arguments) })("event", "generate_lead", {
    lead_channel: channel,
    lead_placement: placement || "unknown",
    page_path: window.location.pathname,
  })
}

function channelForHref(href) {
  if (href.startsWith("https://wa.me/")) return "whatsapp"
  if (href.startsWith("mailto:")) return "email"
  if (href.startsWith("tel:")) return "phone"
  return null
}

// One delegated listener tracks every WhatsApp/mail/phone link sitewide, including blog HTML
export function initLeadTracking() {
  if (typeof document === "undefined") return
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest?.("a[href]")
      if (!a) return
      const channel = channelForHref(a.getAttribute("href"))
      if (!channel) return
      trackLead(channel, a.dataset.leadPlacement || a.closest("[data-lead-zone]")?.dataset.leadZone)
    },
    { capture: true, passive: true }
  )
}
