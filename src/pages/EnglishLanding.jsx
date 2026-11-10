import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useReleaseStaticBody from "@/hooks/useReleaseStaticBody"
import { EMAIL, whatsappHref } from "@/utils/leads"

const TITLE = "Web Design & International SEO for Irish Clinics | SenninWeb"
const DESCRIPTION = "Patient-focused websites and international SEO for dental, aesthetic, hair restoration and private clinics in Ireland. Reach patients across Europe with SenninWeb."
const CANONICAL = "https://www.senninweb.com/en"

const clinicTypes = {
  dental: {
    label: "Dental",
    title: "Make complex treatment feel clear",
    text: "Build treatment pages around patient questions, clinician credentials, recovery, pricing context and an enquiry path that works on mobile.",
  },
  aesthetics: {
    label: "Aesthetics",
    title: "Turn visual interest into informed enquiries",
    text: "Present procedures, practitioners and safety information with an editorial site that feels credible before a patient books a consultation.",
  },
  hair: {
    label: "Hair restoration",
    title: "Own the research journey",
    text: "Answer comparison and suitability searches, show the clinical process and guide prospective patients from research to a private assessment.",
  },
  private: {
    label: "Private practice",
    title: "Be found for the care you provide",
    text: "Give each specialty a clear search destination and connect local trust with international visibility, without flattening your practice into a template.",
  },
}

const journey = [
  ["Clarify", "Define the treatments, markets and patient questions worth building around.", "/images/en/irish-fog.webp"],
  ["Build", "Create a custom English website with strong clinical information and a direct enquiry route.", "/images/en/irish-water.webp"],
  ["Reach", "Structure international SEO around real search intent, language and location.", "/images/en/irish-hills.webp"],
  ["Convert", "Measure calls, messages and forms so visibility becomes a useful business signal.", "/images/en/irish-coast.webp"],
]

const faqItems = [
  ["Do you only work with clinics in Turkey?", "No. This English service is built for private clinics in Ireland that want a stronger website, clearer patient journeys and visibility in selected European markets."],
  ["Can you work with our existing brand?", "Yes. We can retain your identity and rebuild the website around clearer treatment information, stronger proof and a more direct enquiry path."],
  ["Do you guarantee patient numbers or Google rankings?", "No responsible agency can guarantee either. We agree on measurable work: technical health, qualified visibility, enquiry quality and conversion points."],
  ["What does the first review include?", "We review your website, treatment structure, search visibility and enquiry journey. You receive a short list of the most important opportunities before any proposal."],
  ["Will the site support more than one country?", "Yes. We plan country and language architecture before content production, including URL structure, hreflang, local search intent and market-specific treatment pages."],
]

function updateMeta(selector, attr, value) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement(selector.startsWith("link") ? "link" : "meta")
    const match = selector.match(/\[([^=]+)=\"([^\"]+)\"\]/)
    if (match) node.setAttribute(match[1], match[2])
    document.head.appendChild(node)
  }
  node.setAttribute(attr, value)
}

export default function EnglishLanding() {
  const [clinicType, setClinicType] = useState("dental")
  useReleaseStaticBody(true)

  useEffect(() => {
    const previousLang = document.documentElement.lang
    const previousTitle = document.title
    document.body.classList.add("en-page")
    document.documentElement.lang = "en-IE"
    document.title = TITLE
    updateMeta('meta[name="description"]', "content", DESCRIPTION)
    updateMeta('meta[name="robots"]', "content", "index, follow")
    updateMeta('meta[property="og:title"]', "content", TITLE)
    updateMeta('meta[property="og:description"]', "content", DESCRIPTION)
    updateMeta('meta[property="og:type"]', "content", "website")
    updateMeta('meta[property="og:url"]', "content", CANONICAL)
    updateMeta('meta[name="twitter:card"]', "content", "summary_large_image")
    updateMeta('link[rel="canonical"]', "href", CANONICAL)

    const alternates = [
      ["en-IE", CANONICAL],
      ["tr", "https://www.senninweb.com/"],
      ["x-default", "https://www.senninweb.com/"],
    ].map(([language, href]) => {
      let link = document.head.querySelector(`link[rel="alternate"][hreflang="${language}"]`)
      if (!link) {
        link = document.createElement("link")
        link.rel = "alternate"
        link.hreflang = language
        document.head.appendChild(link)
      }
      link.href = href
      return link
    })

    return () => {
      document.body.classList.remove("en-page")
      document.documentElement.lang = previousLang || "tr"
      document.title = previousTitle
      alternates.forEach(link => {
        if (link.hreflang === "en-IE" || link.hreflang === "x-default") link.remove()
      })
    }
  }, [])

  const selected = clinicTypes[clinicType]
  const whatsapp = whatsappHref("Hello, I run a clinic in Ireland and would like a website and international SEO review.")
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SenninWeb",
    url: CANONICAL,
    description: DESCRIPTION,
    areaServed: { "@type": "Country", name: "Ireland" },
    availableLanguage: ["English", "Turkish"],
    serviceType: ["Healthcare website design", "International SEO", "Patient acquisition strategy"],
  }

  return (
    <div className="en-landing bg-[#080808] text-white overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="absolute inset-x-0 top-0 z-40 px-5 md:px-12 py-7 flex items-center justify-between">
        <Link to="/en" className="font-display font-bold text-xl text-white" aria-label="SenninWeb English home">
          Sennin<span className="text-[#D97706]">Web</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/85" aria-label="English navigation">
          <a href="#approach" className="hover:text-white">Approach</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="#contact" className="bg-[#D97706] text-black px-5 py-3 font-semibold hover:bg-[#FCD34D]">Request a review</a>
          <Link to="/" lang="tr" className="hover:text-white">TR</Link>
        </nav>
        <div className="md:hidden flex items-center gap-5 text-sm">
          <a href="#contact" className="text-[#FCD34D]">Contact</a>
          <Link to="/" lang="tr" className="text-white/75">TR</Link>
        </div>
      </header>

      <section className="relative min-h-[100svh] flex items-end en-shutter">
        <img src="/images/en/irish-coast.webp" alt="A quiet Atlantic coastline representing the Irish market" className="absolute inset-0 w-full h-full object-cover object-center" width="1600" height="1000" fetchPriority="high" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full px-5 md:px-12 pb-16 md:pb-20 pt-32">
          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,6rem)] leading-[1.02] tracking-[-0.045em] max-w-[23ch] text-balance">
            Having Trouble with getting more patient enquiries?
          </h1>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-6 items-end">
            <p className="md:col-span-5 text-lg md:text-xl leading-relaxed text-white max-w-xl">
              Custom websites and international SEO for private clinics in Ireland, built to help patients find your treatments and take the next step.
            </p>
            <div className="md:col-start-9 md:col-span-4 flex md:justify-end">
              <a href={whatsapp} data-lead-placement="en-hero-review" className="inline-flex bg-[#D97706] text-black px-7 py-4 font-semibold hover:bg-[#FCD34D] transition-colors min-h-[52px] items-center">
                Get my free review on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="px-5 md:px-12 py-28 md:py-48 bg-[#0e0e0e] en-reveal">
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-[-0.045em] max-w-[12ch]">Trust before treatment</h2>
        <p className="mt-8 text-xl md:text-2xl leading-relaxed max-w-[31ch]">A clinic website has to earn confidence before a patient ever enters the room.</p>
        <p className="mt-10 md:ml-[50%] max-w-xl text-lg leading-relaxed text-white/75">
          SenninWeb combines clear treatment content, custom design, technical SEO and a practical enquiry journey. The result is a website that explains care properly and gives international patients a reason to contact your clinic.
        </p>
      </section>

      <section id="services" className="bg-[#d9d4c8] text-[#111] px-5 md:px-12 py-28 md:py-44 en-reveal">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.92] tracking-[-0.05em] text-balance">Start with your clinic</h2>
          </div>
          <div className="lg:col-start-7 lg:col-span-6">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a clinic type">
              {Object.entries(clinicTypes).map(([key, item]) => (
                <button key={key} type="button" role="tab" aria-selected={clinicType === key} onClick={() => setClinicType(key)} className={`px-4 py-3 text-sm font-semibold transition-colors ${clinicType === key ? "bg-[#111] text-white" : "bg-[#c8c2b5] text-[#111] hover:bg-[#bcb5a7]"}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-12 min-h-[210px]" role="tabpanel">
              <h3 className="font-display text-3xl md:text-5xl leading-tight tracking-[-0.035em] max-w-[16ch]">{selected.title}</h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75">{selected.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-44 bg-[#080808] en-reveal">
        <div className="px-5 md:px-12 mb-16 md:mb-24 grid md:grid-cols-12 gap-8 items-end">
          <h2 className="md:col-span-7 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] tracking-[-0.05em] text-balance">Measure the journey</h2>
          <p className="md:col-start-9 md:col-span-4 text-lg leading-relaxed text-white/70">Four connected parts, planned as one system from the first search to the first conversation.</p>
        </div>
        <div className="grid md:grid-cols-2">
          {journey.map(([word, text, image]) => (
            <article key={word} className="relative min-h-[70svh] flex items-end overflow-hidden group">
              <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.025] transition duration-700" width="1200" height="900" loading="lazy" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 p-6 md:p-10 w-full">
                <h3 className="font-display text-[clamp(3.2rem,8vw,8rem)] leading-none tracking-[-0.05em]">{word}</h3>
                <p className="mt-5 text-lg leading-relaxed max-w-md">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="px-5 md:px-12 py-28 md:py-48 bg-[#121212] en-reveal">
        <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.92] tracking-[-0.05em] max-w-[12ch]">Before we begin</h2>
        <div className="mt-20 md:ml-[34%] max-w-3xl space-y-8">
          {faqItems.map(([question, answer]) => (
            <details key={question} className="group open:bg-[#1c1c1c] open:px-6 open:py-5 transition-[background-color,padding]">
              <summary className="cursor-pointer list-none text-xl md:text-2xl font-medium flex justify-between gap-6 min-h-[44px] items-center">
                {question}<span className="text-[#D97706] group-open:rotate-45 transition-transform text-3xl font-light" aria-hidden="true">+</span>
              </summary>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-white/70 max-w-[52ch]">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer id="contact" className="min-h-[90svh] bg-[#D97706] text-black px-5 md:px-12 py-12 md:py-20 flex flex-col justify-between en-reveal">
        <div className="flex justify-between gap-6 text-base md:text-xl">
          <p className="max-w-md">Tell us about your clinic, your strongest treatment and the market you want to reach.</p>
          <Link to="/" lang="tr" className="underline underline-offset-4">Türkçe</Link>
        </div>
        <a href={`mailto:${EMAIL}?subject=Irish%20clinic%20review`} data-lead-placement="en-contact-email" className="font-display text-[clamp(2.7rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.055em] break-words hover:text-white transition-colors my-20">
          business@<br className="md:hidden" />senninweb.com
        </a>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-base">
          <div>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-lead-placement="en-contact-whatsapp" className="font-semibold underline underline-offset-4">Start on WhatsApp</a>
            <p className="mt-2">Working with clinics across Ireland and Europe</p>
          </div>
          <div className="md:text-right text-sm max-w-2xl">
            <p>Photography: Ivan Slade, Aleksi Tappura, Jonathan Bean and Francesco Gallarotti via Lorem Picsum.</p>
            <p className="mt-2">© 2026 SenninWeb</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
