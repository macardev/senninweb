// Home hero as plain HTML: injected into index.html at build time (vite.config.js)
// so it paints before any JS, then adopted as-is by <Hero /> instead of being
// re-rendered. Keeping the same DOM node keeps LCP at first paint.
// Styles live in the inline critical CSS in index.html (.sh-*), not Tailwind,
// because the Tailwind stylesheet loads asynchronously.
import { WHATSAPP_PATH } from "./icons.js"
import { GUIDE_PATH, whatsappHref } from "../utils/leads.js"

const WA_HREF = whatsappHref("Merhaba, kliniğim için yurt dışından hasta kazanımı hakkında kısa bir analiz istiyorum.")

const STATS = [
  ["0", "Hazır şablon, her site size özel"],
  ["SEO", "Hedef ülkede, her pakette"],
  ["24s", "Ortalama yanıt süresi"],
]

export const HERO_HTML = `
<section class="sh" id="static-hero" data-static-hero>
  <div class="sh-inner">
    <div class="sh-copy">
      <span class="sh-eyebrow animate-heroIn"><span class="sh-line"></span>Sağlık klinikleri için hasta kazanımı</span>
      <h1 class="sh-h1 animate-heroIn">Kliniğinize yurt dışından <span class="sh-gold">hasta getiren web sitesi ve SEO</span></h1>
      <p class="sh-sub animate-heroIn">Saç ekim merkezleri, diş, estetik ve veteriner klinikleri için: size özel tasarlanan çok dilli site, hedef ülkede Google'da görünürlük ve WhatsApp'a düşen sıcak hasta talepleri.</p>
      <div class="sh-ctas animate-heroIn">
        <a class="sh-btn sh-btn--gold" href="${GUIDE_PATH}" data-lead-placement="hero">Ücretsiz Rehberi İndir</a>
        <a class="sh-btn sh-btn--wa" href="${WA_HREF}" target="_blank" rel="noopener noreferrer" data-lead-placement="hero"><svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="${WHATSAPP_PATH}"/></svg>WhatsApp'tan Yaz</a>
      </div>
      <dl class="sh-stats animate-heroIn">
        ${STATS.map(([v, l]) => `<div><dt>${v}</dt><dd>${l}</dd></div>`).join("")}
      </dl>
    </div>
    <div class="sh-visual" data-hero-3d></div>
  </div>
</section>`.trim()

// Critical CSS for the hero; inlined into index.html <head>
export const HERO_CSS = `
.sh{position:relative;background:#0A0A0A;overflow:hidden;font-family:'Inter',system-ui,-apple-system,sans-serif}
#hero-host .sh{padding-top:112px}
.sh-inner{position:relative;z-index:2;max-width:90rem;margin:0 auto;padding:16px 24px 48px;display:grid;gap:32px;align-items:center}
.sh-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#D97706;margin-bottom:32px}
.sh-line{width:32px;height:1px;background:#D97706}
.sh-h1{font-family:'Syne',system-ui,-apple-system,sans-serif;font-weight:700;font-size:2.25rem;line-height:1.05;letter-spacing:-.025em;color:#fff;margin:0 0 24px}
.sh-gold{display:block;background:linear-gradient(135deg,#FCD34D 0%,#D97706 50%,#B45309 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sh-sub{font-size:16px;line-height:1.625;color:rgba(255,255,255,.6);max-width:32rem;margin:0 0 32px}
.sh-ctas{display:flex;flex-direction:column;gap:12px;margin-bottom:40px}
.sh-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:56px;padding:0 32px;border-radius:9999px;font-size:16px;font-weight:600;text-decoration:none;white-space:nowrap;transition:transform .18s cubic-bezier(.2,0,0,1),background-color .2s,border-color .2s}
.sh-btn:active{transform:scale(.97)}
.sh-btn--gold{background:#D97706;color:#0A0A0A}
.sh-btn--gold:hover{background:#FBBF24}
.sh-btn--wa{border:1px solid rgba(37,211,102,.45);color:rgba(255,255,255,.85);font-weight:500}
.sh-btn--wa:hover{border-color:#25D366;background:rgba(37,211,102,.1)}
.sh-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:28px;border-top:1px solid rgba(255,255,255,.08);margin:0}
.sh-stats dt{font-family:'Syne',system-ui,sans-serif;font-weight:700;font-size:18px;color:#fff;margin-bottom:2px}
.sh-stats dd{font-size:12px;color:rgba(255,255,255,.6);margin:0}
.sh-visual{display:none}
@media (min-width:640px){.sh-h1{font-size:3rem}.sh-ctas{flex-direction:row}}
@media (min-width:769px){.sh{min-height:100vh;display:flex;align-items:center}.sh-inner{width:100%;padding:80px 48px}.sh-h1{font-size:3.75rem}.sh-sub{font-size:18px;margin-bottom:40px}.sh-btn:hover{transform:scale(1.03)}.sh-stats{margin-top:24px;padding-top:32px;gap:32px}.sh-stats dt{font-size:20px}}
@media (min-width:1024px){.sh-inner{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}.sh-h1{font-size:3.6rem}.sh-visual{display:block;min-height:560px}}
@media (min-width:1536px){.sh-h1{font-size:4.5rem}}
`.trim().replace(/\n/g, "")
