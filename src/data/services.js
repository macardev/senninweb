// Service pages content. Plain data (no JSX) so postbuild.mjs can prerender it too.
// Keyword plan: each page owns one primary phrase (H1 + title) and repeats the shared
// cluster (yurt dışından hasta, yabancı hasta, sağlık turizmi, klinik türleri) naturally.

export const ICP_LINE = "saç ekim merkezleri, diş klinikleri, estetik ve güzellik klinikleri ile veteriner klinikleri"

// No public price range (kept off the site on purpose): tailored monthly quote after a free analysis
const PRICE_SECTION = [
  { type: "heading2", content: "Fiyatlandırma: kliniğinize özel aylık teklif" },
  {
    type: "paragraph",
    content: "Web sitesi tasarımı, sağlık turizmi SEO'su ve WhatsApp hasta akışı tek bir aylık pakette, <strong>Hasta Kazanım Paketi</strong>'nde yer alır. Web sitesi ayrıca ücretlendirilmez. Teklifi hedef ülke ve dil sayısı, tedavi ve sayfa sayısı, hedef ülkeden alınacak bağlantı hacmi ile tasarım ve animasyon kapsamına göre hazırlarız. Önce WhatsApp'tan ücretsiz kısa bir analiz yapıyor, ardından kliniğinize özel net bir teklif sunuyoruz.",
  },
]
export const SERVICES = {
  "web-tasarim": {
    path: "/hizmet/web-tasarim",
    breadcrumb: "Sağlık Turizmi Web Sitesi",
    title: "Sağlık Turizmi Web Sitesi: Klinikler İçin Çok Dilli, Size Özel Tasarım | SenninWeb",
    shortTitle: "Sağlık turizmi web sitesi tasarımı",
    metaDescription: "Saç ekim, diş, estetik ve veteriner klinikleri için yurt dışına yönelik, çok dilli ve size özel web sitesi. Hazır şablon yok. Aylık Hasta Kazanım Paketi'ne dahildir.",
    description: "Yurt dışından hasta çekmek isteyen klinikler için tasarlanan, hastanın kendi dilinde güven veren ve her ziyaretçiyi WhatsApp'ta ön değerlendirmeye yönlendiren sağlık turizmi web siteleri. Her site sıfırdan, kliniğin ihtiyacına göre tasarlanır.",
    serviceType: ["Sağlık turizmi web sitesi", "Klinik web sitesi tasarımı", "Çok dilli web sitesi"],
    sections: [
      {
        type: "paragraph",
        content: `Yabancı hasta sizi ilk kez sitenizde görür. Bir <strong>sağlık turizmi web sitesi</strong> bu yüzden kliniğinizin resepsiyonu, broşürü ve ilk muayenesi gibi çalışmalıdır. SenninWeb olarak ${ICP_LINE} için yurt dışından hasta çekmeye odaklanan, çok dilli ve tamamen size özel siteler tasarlıyoruz.`,
      },
      { type: "heading2", content: "Neden yurt dışına yönelik ayrı bir site?" },
      {
        type: "paragraph",
        content: "12 Kasım 2025 tarihli Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik'e göre yurt dışına yönelik tanıtım, ayrı bir internet sitesi veya sosyal medya hesabı üzerinden yapılmalı. Bu platformda sağlık turizmi kapsamında hizmet sunulduğu açıkça belirtilmeli ve yetki belgesi yayımlanmalı. Yani yabancı hasta kazanmak isteyen bir klinik için ayrı, çok dilli bir site artık pratikte zorunlu.",
      },
      {
        type: "callout",
        content: "Bu bilgi genel bilgilendirme amaçlıdır, hukuki danışmanlık değildir. Kaynak: Resmî Gazete, 12.11.2025, Sayı 33075 ve TÜRSAB duyurusu.",
      },
      { type: "heading2", content: "Hazır şablon yok: tasarım ihtiyacınıza göre şekillenir" },
      {
        type: "paragraph",
        content: "Hiçbir projede hazır tema ya da template kullanmıyoruz. Bir saç ekim kliniği zengin animasyonlu, etkileyici bir deneyim isteyebilir. Bir diş kliniği ise sade, hızlı ve bilgi odaklı bir yapıyı tercih edebilir. Tasarım tamamen kliniğinizin hedef ülkesine, tedavilerine ve hastasının sorularına göre sıfırdan oluşturulur.",
      },
      {
        type: "comparisonTable",
        title: "Hazır şablon mu, size özel klinik sitesi mi?",
        headers: ["Kriter", "Hazır şablon", "Size özel sağlık turizmi sitesi"],
        rows: [
          ["Güven algısı", "Onlarca klinikle aynı görünüm", "Kliniğe, doktora ve hedef ülkeye özel"],
          ["Çok dilli yapı", "Eklenti ile, çoğu zaman eksik", "Her dil kendi URL'sinde, doğru hreflang"],
          ["Hız (Core Web Vitals)", "Kullanılmayan kodla yavaş", "Yalnızca gereken kod, mobilde hızlı"],
          ["Dönüşüm", "Genel iletişim formu", "WhatsApp + fotoğraflı ön değerlendirme akışı"],
          ["Yönetmelik uyumu", "Ayrıca düzenlenmesi gerekir", "Yetki belgesi ve sağlık turizmi beyanı baştan kurgulanır"],
        ],
      },
      { type: "heading2", content: "Klinik web sitenizde neler var?" },
      {
        type: "section",
        content: "Her sayfa tek bir amaca hizmet eder: yabancı hastanın güvenini kazanmak ve onu ön değerlendirmeye taşımak.",
        subsections: [
          { heading: "Tedavi sayfaları", content: "Saç ekimi (FUE, DHI), diş implantı, all-on-4, zirkonyum, estetik işlemler ya da evcil hayvan seyahat hizmetleri için ayrı sayfalar: nedir, kimlere uygun, süreç, kalınacak gün sayısı ve SSS." },
          { heading: "Doktor ve ekip profilleri", content: "Eğitim, uzmanlık, deneyim ve gerçek fotoğraflar. Yabancı hastanın en çok sorduğu soru: \"Beni kim tedavi edecek?\"" },
          { heading: "Çok dilli yapı", content: "İngilizce, Almanca, Arapça, Rusça gibi hedef dillerde, her dil kendi adresinde (<em>/en/</em>, <em>/de/</em>) ve insan eliyle düzenlenmiş metinlerle." },
          { heading: "WhatsApp ve ön değerlendirme", content: "Her sayfada görünür WhatsApp butonu, ülke koduyla telefon ve fotoğraf yüklenebilen ücretsiz ön değerlendirme formu." },
          { heading: "Hız ve ölçüm", content: "Mobilde hızlı açılış, MedicalClinic ve FAQPage schema işaretlemeleri, her WhatsApp tıklamasının ülke ve sayfa bazında ölçülmesi." },
        ],
      },
      ...PRICE_SECTION,
      {
        type: "faq",
        title: "Sık sorulan sorular",
        items: [
          { q: "Web sitesi tasarımı ayrıca ücretli mi?", a: "Hayır. Web sitesi tasarımı ve geliştirmesi aylık Hasta Kazanım Paketi'ne dahildir; ayrıca ücretlendirilmez." },
          { q: "Hazır şablon kullanıyor musunuz?", a: "Hayır, hiçbir projede hazır tema veya template kullanmıyoruz. Her sağlık turizmi web sitesi kliniğin ihtiyacına, hedef ülkesine ve tercih ettiği tasarım diline göre sıfırdan tasarlanır." },
          { q: "Hangi dillerde site yapıyorsunuz?", a: "Hedef ülkenize göre İngilizce, Almanca, Arapça, Rusça ve diğer diller. Önce 1 ana ve 1 ikincil dil ile başlamanızı öneriyoruz." },
        ],
      },
      {
        type: "finalCta",
        question: "Kliniğiniz için yurt dışına yönelik bir site mi planlıyorsunuz?",
        ctaText: "Önce ücretsiz Yurt Dışından Hasta Çekme Rehberi'ni okuyun, ardından WhatsApp'tan kısa bir analiz isteyin.",
      },
    ],
    related: [
      ["/blog/yurt-disindan-hasta-nasil-cekilir", "Yurt dışından hasta nasıl çekilir?"],
      ["/hizmet/seo-ve-buyume", "Sağlık turizmi SEO hizmetimiz"],
      ["/rehber/yurt-disindan-hasta-cekme", "Ücretsiz rehber (PDF)"],
    ],
  },

  "seo-ve-buyume": {
    path: "/hizmet/seo-ve-buyume",
    breadcrumb: "Sağlık Turizmi SEO",
    title: "Sağlık Turizmi SEO: Klinikler İçin Uluslararası SEO | SenninWeb",
    shortTitle: "Sağlık turizmi SEO ve uluslararası büyüme",
    metaDescription: "Saç ekim, diş, estetik ve veteriner klinikleri için sağlık turizmi SEO'su: hedef ülkede anahtar kelime, hreflang, schema, hedef ülkeden backlink ve yapay zekâ aramalarında görünürlük.",
    description: "Sağlık turizmi SEO'su, kliniğinizin yabancı hastanın kendi dilinde ve kendi ülkesinin Google'ında bulunmasını sağlayan çok dilli, çok pazarlı arama motoru optimizasyonudur. Amacımız trafik değil, yurt dışından gelen sıcak hasta talebidir.",
    serviceType: ["Sağlık turizmi SEO", "Uluslararası SEO", "Medikal turizm SEO"],
    sections: [
      {
        type: "paragraph",
        content: `Londra'daki bir hasta "dental implants turkey cost", Düsseldorf'taki bir hasta "Haartransplantation Türkei Erfahrungen" diye arar. <strong>Sağlık turizmi SEO</strong> çalışmamızla ${ICP_LINE} bu aramalarda, hastanın kendi dilinde karşısına çıkar. Reklam bütçesi bittiği gün duran trafik yerine, her ay birikerek büyüyen bir yabancı hasta akışı kurarız.`,
      },
      { type: "heading2", content: "Hastanın arama diliyle anahtar kelime stratejisi" },
      {
        type: "paragraph",
        content: "Her hedef ülke ve dil için üç niyeti ayrı ayrı hedefleriz: fiyat aramaları (\"Zahnimplantat Türkei Kosten\"), güven aramaları (\"best hair transplant clinic istanbul reviews\") ve bilgi aramaları (\"veneers vs crowns\"). Her niyet için ayrı bir sayfa kurgular, aynı metni şehir adı değiştirerek çoğaltan ve Google'ın cezalandırdığı \"kapı sayfalarından\" kaçınırız.",
      },
      { type: "heading2", content: "Hedef ülkeden otorite: backlink ve dizinler" },
      {
        type: "paragraph",
        content: "Almanya'da sıralama istiyorsanız Almanya'daki saygın sitelerin sizden bahsetmesi gerekir. Hedef ülkenin sağlık ve seyahat yayınlarından, yerel dizinlerinden ve diaspora platformlarından düzenli, kaliteli bağlantılar alırız. Toplu ve ucuz backlink paketleri kullanmayız; sağlık sektöründe kötü bağlantılar sizi yükseltmez, aksine geriye düşürür.",
      },
      { type: "heading2", content: "Teknik SEO ve yapay zekâ aramalarında görünürlük" },
      {
        type: "bulletList",
        items: [
          "Her dil için doğru <em>hreflang</em> ve kendi URL yapısı",
          "MedicalClinic, Physician, MedicalProcedure ve FAQPage schema işaretlemeleri",
          "Doktor tarafından incelenmiş tıbbi içerik ve güncelleme tarihleri (E-E-A-T)",
          "Google İşletme Profili'nin İngilizce ve hedef dillerde optimizasyonu",
          "ChatGPT, Gemini ve Claude gibi asistanların kaynak gösterebileceği net cevap blokları",
        ],
      },
      {
        type: "comparisonTable",
        title: "Sponsorlu reklam mı, sağlık turizmi SEO'su mu?",
        headers: ["", "Yurt dışı hedefli reklam", "Sağlık turizmi SEO'su"],
        rows: [
          ["İlk sonuç", "Günler içinde", "Genellikle 4–6 ay"],
          ["Maliyet", "Her tıklama için ödeme", "Aylık sabit yatırım"],
          ["Bütçe durunca", "Talep de durur", "Sıralamalar ve trafik kalır"],
          ["Güven algısı", "\"Reklam\" etiketiyle görünür", "Organik sonuç olarak görünür"],
          ["Doğru kullanım", "Hızlı test ve ilk hastalar", "Kalıcı ve kontrolü sizde olan kanal"],
        ],
      },
      { type: "heading2", content: "Ölçüm ve aylık rapor" },
      {
        type: "paragraph",
        content: "Her ay hedef ülkedeki gösterim ve sıralamaları, ülke ve sayfa bazında organik ziyaretleri ve en önemlisi WhatsApp ile form üzerinden gelen hasta taleplerini raporlarız. Hangi sayfanın, hangi ülkeden kaç yabancı hasta talebi getirdiğini net görürsünüz.",
      },
      ...PRICE_SECTION,
      {
        type: "faq",
        title: "Sık sorulan sorular",
        items: [
          { q: "Sağlık turizmi SEO'su ne kadar sürede sonuç verir?", a: "Yeni bir dilde ve ülkede ilk belirgin sonuçlar genellikle 4–6 ay içinde görülür. Saç ekimi gibi rekabetçi alanlarda bu süre uzayabilir. Kurulan altyapı ise kalıcıdır ve büyümeye devam eder." },
          { q: "Hangi ülkelere SEO yapıyorsunuz?", a: "Kliniğinizin fiyat avantajı, uçuş süresi, dil kapasitesi ve mevcut hasta verisine göre 1 ana ve 1 ikincil hedef ülke belirliyoruz. Ana ülkede ilk sayfaya oturduktan sonra yeni bir dil ekliyoruz." },
          { q: "Backlink çalışması pakete dahil mi?", a: "Evet. Hedef ülkeden kaliteli bağlantı ve dizin çalışmaları Hasta Kazanım Paketi'ne dahildir; bağlantı hacmi, kliniğinize özel teklifi belirleyen etkenlerden biridir." },
        ],
      },
      {
        type: "finalCta",
        question: "Kliniğiniz hedef ülkede Google'da görünüyor mu?",
        ctaText: "Ücretsiz rehberi indirin; ardından sitenizi ve hedef ülkenizi inceleyip WhatsApp'tan kısa bir analiz gönderelim.",
      },
    ],
    related: [
      ["/blog/yurt-disindan-hasta-nasil-cekilir", "Yurt dışından hasta nasıl çekilir?"],
      ["/hizmet/web-tasarim", "Sağlık turizmi web sitesi"],
      ["/blog/ai-gorunurluk-geo-llmo-seo-rehberi", "Yapay zekâda görünürlük (GEO) rehberi"],
    ],
  },

  "dijital-pazarlama": {
    path: "/hizmet/dijital-pazarlama",
    breadcrumb: "Sağlık Turizmi Dijital Pazarlama",
    title: "Sağlık Turizmi Dijital Pazarlama: Yurt Dışından Hasta Kazanımı | SenninWeb",
    shortTitle: "Sağlık turizmi dijital pazarlama ve hasta kazanımı",
    metaDescription: "Yurt dışından hasta kazanımı için sağlık turizmi dijital pazarlama: yönetmeliğe uygun yurt dışı tanıtım, WhatsApp hasta akışı, ölçüm ve aylık rapor. Klinikler için tek paket.",
    description: "Sağlık turizmi dijital pazarlama, yurt dışından gelen ilgiyi ölçülebilir hasta taleplerine ve randevulara dönüştüren sistemdir. Site, SEO, yurt dışına yönelik tanıtım ve WhatsApp iletişimini tek bir hasta kazanım akışında birleştiririz.",
    serviceType: ["Sağlık turizmi dijital pazarlama", "Uluslararası hasta kazanımı", "Medikal turizm pazarlama"],
    sections: [
      {
        type: "paragraph",
        content: `Yabancı hasta aynı anda 3–5 kliniğe yazar ve ilk net, insani cevabı veren klinik öne geçer. <strong>Sağlık turizmi dijital pazarlama</strong> hizmetimizle ${ICP_LINE} için ziyaretçiyi WhatsApp'ta sıcak hasta adayına, ardından randevuya dönüştüren akışı kurar ve her ay ölçerek büyütürüz.`,
      },
      { type: "heading2", content: "Yönetmeliğe uygun yurt dışı tanıtım" },
      {
        type: "bulletList",
        items: [
          "Tanıtım yalnızca yurt dışına yönelik ayrı site ve sosyal medya hesapları üzerinden yürütülür",
          "Sponsorlu tanıtımlar Türkçe dışındaki dillerde ve yalnızca yurt dışı hedef kitleye yapılır",
          "Yurt içi hedefleme ve otomatik hedef kitle tanımları kapatılır",
          "Yetki belgesi ve sağlık turizmi beyanı tüm yurt dışı platformlarda görünür olur",
        ],
      },
      {
        type: "callout",
        content: "Genel bilgilendirme amaçlıdır, hukuki danışmanlık değildir. Kaynak: Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik (Resmî Gazete, 12.11.2025) ve TÜRSAB duyurusu.",
      },
      { type: "heading2", content: "WhatsApp hasta akışı: talepten randevuya" },
      {
        type: "section",
        content: "Gelen her talebin aynı standartla karşılanması için klinik ekibinizle birlikte basit ama disiplinli bir akış kurarız.",
        subsections: [
          { heading: "Karşılama", content: "Hastanın dilinde, ismiyle ve dakikalar içinde ilk cevap. Mesai dışı için ne zaman dönüleceğini net söyleyen otomatik mesaj." },
          { heading: "Ön değerlendirme", content: "Doğru sorular, fotoğraf ve röntgen toplama, doktor değerlendirmesi sonrası net bir tedavi planı." },
          { heading: "Görüntülü görüşme ve takip", content: "10–15 dakikalık görüntülü görüşme ve 2., 5. ve 10. günde baskı kurmayan, bilgi veren takip mesajları." },
          { heading: "Takip panosu", content: "Yeni talep → bilgi toplandı → plan gönderildi → görüşme → randevu aşamalarıyla hiçbir yabancı hasta adayının kaybolmaması." },
        ],
      },
      {
        type: "comparisonTable",
        title: "Yurtdışından hasta bulma kanalları",
        headers: ["Kanal", "Hız", "Kalıcılık", "Kontrol"],
        rows: [
          ["Kendi siteniz + SEO", "Yavaş (4–6 ay)", "Yüksek", "Tamamen sizde"],
          ["Yurt dışı hedefli reklam", "Hızlı", "Bütçeyle durur", "Sizde"],
          ["Sağlık turizmi platformları", "Orta", "Orta", "Platformda"],
          ["Aracı kuruluşlar", "Orta", "Anlaşmaya bağlı", "Aracıda"],
        ],
      },
      { type: "heading2", content: "Ölçüm: neyin hasta getirdiğini bilin" },
      {
        type: "paragraph",
        content: "Her WhatsApp tıklamasını, form gönderimini ve aramayı ülke, sayfa ve kanal bazında ölçeriz. Aylık raporda yalnızca trafik değil; talep, nitelikli talep, görüşme ve randevu sayılarını birlikte görürsünüz.",
      },
      ...PRICE_SECTION,
      {
        type: "faq",
        title: "Sık sorulan sorular",
        items: [
          { q: "Sosyal medya yönetimi yapıyor musunuz?", a: "Yurt dışına yönelik hesapların strateji, içerik planı ve ölçümünü hasta kazanım akışının parçası olarak kurguluyoruz. Önceliğimiz takipçi değil, WhatsApp'a gelen nitelikli yabancı hasta talebidir." },
          { q: "WhatsApp'a cevap vermeyi siz mi yapıyorsunuz?", a: "Hasta iletişimini klinik ekibiniz yürütür; biz karşılama metinlerini, takip akışını, panoyu ve ölçümü kurar, aylık verilerle iyileştiririz." },
          { q: "Hasta Kazanım Paketi'ne neler dahil?", a: "Size özel çok dilli web sitesi, sağlık turizmi SEO'su ve hedef ülkeden backlink çalışmaları, WhatsApp hasta akışı, ölçüm ve aylık rapor. Teklif kliniğinize özel, aylık olarak hazırlanır." },
        ],
      },
      {
        type: "finalCta",
        question: "Yabancı hasta talepleriniz randevuya dönüşüyor mu?",
        ctaText: "Ücretsiz rehberdeki WhatsApp akışıyla başlayın; kliniğinize özel kısa analiz için bize yazın.",
      },
    ],
    related: [
      ["/blog/yurt-disindan-hasta-nasil-cekilir", "Yurt dışından hasta nasıl çekilir?"],
      ["/hizmet/seo-ve-buyume", "Sağlık turizmi SEO"],
      ["/rehber/yurt-disindan-hasta-cekme", "Ücretsiz rehber (PDF)"],
    ],
  },
}

export function serviceJsonLd(service, url) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.shortTitle,
    "url": url,
    "description": service.metaDescription,
    "serviceType": service.serviceType,
    "provider": { "@id": "https://www.senninweb.com" },
    "areaServed": "Worldwide",
    "audience": { "@type": "BusinessAudience", "name": "Saç ekim, diş, estetik ve veteriner klinikleri" },
  }
}

export function serviceFaqJsonLd(service) {
  const faq = service.sections.find((s) => s.type === "faq")
  if (!faq) return null
  const strip = (h = "") => h.replace(/<[^>]+>/g, "").trim()
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.items.map((i) => ({ "@type": "Question", "name": strip(i.q), "acceptedAnswer": { "@type": "Answer", "text": strip(i.a) } })),
  }
}
