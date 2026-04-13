import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import useInView from '@/hooks/useInView'
import emailjs from '@emailjs/browser'
 

const services = [
  'Web Tasarım',
  'SEO & Büyüme',
  'Kurumsal Kimlik',
  'Hepsi',
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const [form, setForm] = useState({
    name:    '',
    email:   '',
    phone:   '',
    service: '',
    message: '',
  })
  const [sending, setSending]   = useState(false)
  const [sent,    setSent]      = useState(false)
  const [focused, setFocused]   = useState(null)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  setSending(true)

  try {
    await emailjs.send(
      'service_fku436a',    // Adım 2'den aldığın Service ID
      'template_h8x9ylc',   // Adım 3'ten aldığın Template ID
      {
        from_name:  form.name,
        from_email: form.email,
        phone:      form.phone    || 'Belirtilmedi',
        service:    form.service  || 'Belirtilmedi',
        message:    form.message  || 'Mesaj girilmedi',
      },
      'xx85OmC9vAmhoFav0'     // Adım 4'ten aldığın Public Key
    )

    setSending(false)
    setSent(true)

  } catch (error) {
    console.error('EmailJS hata:', error)
    setSending(false)
    alert('Bir hata oluştu. Lütfen doğrudan macarcagatay@gmail.com adresine yazın.')
  }
}


  const inputClass = (name) => `
    w-full bg-white/[0.03] border rounded-xl px-5 py-4
    text-sm text-white placeholder-white/25
    outline-none transition-all duration-300
    ${focused === name
      ? 'border-gold-500/60 bg-white/[0.05]'
      : 'border-white/8 hover:border-white/15'
    }
  `

  return (
    <section id="contact" className="relative bg-black section-pad overflow-hidden">

      {/* Arka plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                        w-[700px] h-[400px] rounded-full
                        bg-gold-500/5 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Sol — bilgi */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Etiket */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold-500/70 font-medium">
                İletişim
              </span>
            </div>

            {/* Başlık */}
            <h2 className="font-display font-bold text-5xl md:text-6xl
                           tracking-tight leading-tight mb-6">
              <span className="text-white">Projenizi</span>
              <br />
              <span className="text-gold-gradient">konuşalım.</span>
            </h2>

            <p className="text-white/40 text-sm leading-relaxed mb-12 max-w-sm">
              İşletmeniz için doğru dijital stratejiyi birlikte belirleyelim.
              İlk görüşme tamamen ücretsiz.
            </p>

            {/* İletişim bilgileri */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4l6 5 6-5M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"
                        stroke="currentColor" strokeWidth="1.2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  label: 'E-posta',
                  value: 'macarcagatay@gmail.com',
                  href:  'mailto:macarcagatay@gmail.com',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 10.7c-1.2 0-2.4-.2-3.5-.5a1 1 0 00-1 .2l-1.5 1.5A10.4 10.4 0 014.1 7.9L5.6 6.4a1 1 0 00.2-1A11 11 0 015.3 2a1 1 0 00-1-1H2a1 1 0 00-1 1 13 13 0 0013 13 1 1 0 001-1v-2.3a1 1 0 00-1-1z"
                        stroke="currentColor" strokeWidth="1.2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  label: 'Telefon',
                  value: '+90 (555) 000 00 00',
                  href:  'tel:+905550000000',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5A4.5 4.5 0 018 10.5C5.5 10.5 2 7 2 5.5a6 6 0 0112 0c0 1.5-3.5 5-6 5z"
                        stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="8" cy="5.5" r="1.5"
                        stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4 13c0-1.1 1.8-2 4-2s4 .9 4 2"
                        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  ),
                  label: 'Konum',
                  value: 'Bilecik & İstanbul',
                  href:  null,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl border border-white/8
                                  bg-white/[0.03] flex items-center justify-center
                                  text-gold-400 group-hover:border-gold-500/30
                                  transition-colors duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-white/30 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href}
                        className="text-sm text-white/60 hover:text-white
                                   transition-colors duration-300">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/60">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response time badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="inline-flex items-center gap-3 mt-12 px-5 py-3
                         rounded-full border border-gold-500/20 bg-gold-500/5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-sm text-gold-400/80">
                Ortalama yanıt süresi: 48 saat içinde
              </span>
            </motion.div>
          </motion.div>

          {/* Sağ — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              // Başarı mesajı
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full flex flex-col items-center justify-center
                           text-center p-12 rounded-2xl border border-gold-500/20
                           bg-gold-500/5"
              >
                <div className="w-16 h-16 rounded-full border border-gold-500/40
                                bg-gold-500/10 flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 6L23 8"
                      stroke="#D97706" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Mesajınız alındı!
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  En kısa sürede macarcagatay@gmail.com
                  adresinden size dönüş yapacağız.
                </p>
              </motion.div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Ad Soyad + Telefon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/30
                                      uppercase tracking-wider mb-2">
                      Ad Soyad
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Ahmet Yılmaz"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      className={inputClass('name')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/30
                                      uppercase tracking-wider mb-2">
                      Telefon
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+90 555 000 00 00"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('phone')}
                    />
                  </div>
                </div>

                {/* E-posta */}
                <div>
                  <label className="block text-xs text-white/30
                                    uppercase tracking-wider mb-2">
                    E-posta
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="isletme@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                    className={inputClass('email')}
                  />
                </div>

                {/* Hizmet seçimi */}
                <div>
                  <label className="block text-xs text-white/30
                                    uppercase tracking-wider mb-2">
                    İlgilendiğiniz Hizmet
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, service: s }))}
                        className={`px-4 py-2 rounded-full text-xs font-medium
                                   border transition-all duration-300 ${
                          form.service === s
                            ? 'border-gold-500/60 bg-gold-500/10 text-gold-400'
                            : 'border-white/8 bg-white/[0.02] text-white/40 hover:border-white/20'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mesaj */}
                <div>
                  <label className="block text-xs text-white/30
                                    uppercase tracking-wider mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="İşletmeniz ve hedefleriniz hakkında kısaca bilgi verin..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className={`${inputClass('message')} resize-none`}
                  />
                </div>

                {/* Gönder butonu */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { scale: 1.02 } : {}}
                  whileTap={!sending  ? { scale: 0.98 } : {}}
                  className="relative w-full py-4 rounded-xl font-medium
                             text-sm tracking-wide overflow-hidden group
                             disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gold-500
                                   group-hover:bg-gold-400
                                   transition-colors duration-300" />
                  <span className="relative z-10 flex items-center justify-center
                                   gap-2 text-black font-semibold">
                    {sending ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="block w-4 h-4 border-2 border-black/30
                                     border-t-black rounded-full"
                        />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Mesaj Gönder
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M7 3l4 4-4 4"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>

                <p className="text-center text-xs text-white/20 pt-1">
                  Bilgileriniz üçüncü şahıslarla paylaşılmaz.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
