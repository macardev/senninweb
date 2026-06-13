# SEO Rehberi — Structured Data (Yapılandırılmış Veri)

## Nedir?

Structured data, Google'a sitenin ne olduğunu **anlatan** bir kimlik kartıdır.
Normalde Google HTML'inizi tarar ve "Bu bir ajans galiba" diye **tahmin** eder.
Structured data ile "Ben bir Organization'ım, adım Sennin Web, hizmetim web tasarım" diye **bildirirsiniz**.

Format: **JSON-LD** (Google'ın tercih ettiği format)
```html
<script type="application/ld+json">
  { "@context": "https://schema.org", "@type": "Organization", ... }
</script>
```

## Ne İşe Yarar?

| Özellik | Etkisi |
|---|---|
| **Rich Snippet** | Arama sonucunda yıldız, fiyat, SSS gösterimi |
| **Knowledge Graph** | Google'da sağ tarafta çıkan bilgi kartı |
| **Local SEO** | Google Maps'te adres, telefon, saat bilgisi |
| **LLM/AI dostu** | Yapay zeka araçları siteni daha iyi anlar (bkz. llms.txt) |

---

## En Önemli Schema Türleri

### Organization — Tüm siteler için ortak
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sennin Web",
  "url": "https://www.senninweb.com",
  "logo": "https://www.senninweb.com/favicon/favicon.svg",
  "description": "Web tasarım ve SEO hizmetleri sunan premium dijital ajans.",
  "email": "bussiness@senninweb.com",
  "telephone": "+90 (531) 405 15 84",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11702 Çukurören",
    "addressLocality": "Gölpazarı",
    "addressRegion": "Bilecik",
    "addressCountry": "TR"
  },
  "sameAs": [
    "https://github.com/macardev/senninweb"
  ]
}
```

### WebSite — Ana sayfa için
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sennin Web",
  "url": "https://www.senninweb.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.senninweb.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Article — Blog yazıları için
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Yazı Başlığı",
  "description": "Kısa açıklama",
  "image": "https://www.senninweb.com/og-image.jpg",
  "datePublished": "2026-01-01",
  "author": {
    "@type": "Person",
    "name": "Çağatay Macar",
    "jobTitle": "Senior Web Developer"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SenninWeb"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.senninweb.com/blog/yazi-slugu"
  }
}
```

### FAQPage — SSS sayfası için
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Soru metni?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cevap metni."
      }
    }
  ]
}
```

### Service — Hizmet sayfası için
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Gebze Web Tasarım ve SEO Hizmetleri",
  "provider": {
    "@type": "Organization",
    "name": "SenninWeb"
  },
  "areaServed": {
    "@type": "City",
    "name": "Gebze"
  },
  "description": "Açıklama metni."
}
```

### CollectionPage — Blog listeleme için
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Web Tasarım ve SEO Rehberi | SenninWeb",
  "description": "Web tasarım, SEO ve dijital büyüme üzerine rehberler.",
  "url": "https://www.senninweb.com/blog"
}
```

---

## SenninWeb Envanteri (Mevcut Durum)

| Sayfa | Schema | Statü |
|---|---|---|
| Ana Sayfa `/` | Organization + WebSite | ✅ mevcut |
| Blog `/blog` | CollectionPage | ✅ mevcut |
| Blog Yazısı `/blog/:slug` | Article (image + datePublished dahil) | ✅ mevcut |
| Gebze `/gebze` | Service | ✅ mevcut |
| SSS `/sss` | FAQPage | ✅ mevcut |
| Global (index.html) | Organization | ✅ mevcut |

---

## Püf Noktaları

1. **Her sayfada sadece bir `mainEntity` olmalı** — ama birden fazla schema tipi aynı script içinde olabilir (`@graph` ile)
2. **`@id`'ler unique olmalı** — her sayfanın kendi canonical URL'sini kullan
3. **Google Rich Results Test** ile doğrula: `https://search.google.com/test/rich-results`
4. **datePublished ISO 8601 formatında olmalı**: `2026-05-22` veya `2026-05-22T10:30:00+03:00`
5. **image en az 1200px genişlikte olmalı** — Google için
6. **Organization schema global** olarak `index.html`'e veya tüm sayfalara ayrı ayrı eklenebilir
7. **JSON-LD, HTML'in herhangi bir yerinde olabilir** — `<head>` veya `<body>` fark etmez
8. **`sameAs`** ile sosyal medya hesaplarını belirt — Knowledge Graph'te görünür
