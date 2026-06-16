# Blog Görselleri Üretim Kılavuzu

## Kapak Görselleri (1200×675, 16:9, webp)

Her prompt'ta şu sabit kuralları kullan:
- **Format:** 1200×675 px, 16:9, webp
- **Style:** Modern, temiz, profesyonel web tasarım estetiği
- **No text** on image (başlık yazısız)
- **Sennin Web brand color:** Sıcak altın (#D4A853) ve koyu arka plan tonları
- **Tür:** Soyut/dijital illüstrasyon, fotoğraf değil
- **Files:** `public/images/blog/<slug>.webp`

---

### 1. 2026 Renk Trendleri
**File:** `2026-grafik-tasarim-web-tasarim-renk-trendleri.webp`
**Prompt:**
> A modern digital abstract composition showing a web design color palette blending warm gold, deep navy, sage green and coral. Gradient fluid shapes floating on a dark background with subtle glowing edges. Professional web design aesthetic, no text. 1200x675 px. Dark mood with gold accents (similar to #D4A853).

---

### 2. AI Web Tasarım Araçları
**File:** `2026-en-iyi-ai-web-tasarim-araclari.webp`
**Prompt:**
> A futuristic digital workspace showing AI-powered web design tools in action: glowing wireframes, floating UI components being assembled by invisible hands, neural network nodes connecting design elements. Dark background with electric blue and gold accents. Modern tech aesthetic, no text. 1200x675 px. Minimal and clean composition.

---

### 3. Domain Seçimi SEO
**File:** `2026-seo-stratejileri-domain-secimi.webp`
**Prompt:**
> Abstract representation of domain name strategy and SEO: a glowing globe with DNS connection lines, a floating URL bar with golden lock icon, search engine result page elements in the background. Dark navy background with warm gold highlights. Professional technical SEO aesthetic, no text. 1200x675 px.

---

### 4. Küçük İşletme Web Sitesi (5 Strateji)
**File:** `kucuk-isletme-web-sitesi.webp`
**Prompt:**
> A small business storefront seamlessly blending physical and digital: a charming local shop window that transforms into a glowing website mockup. Warm ambient lighting, cozy atmosphere. Modern web design meets local business warmth. Dark background with golden accent light. No text. 1200x675 px.

---

### 5. Küçük İşletmeler İçin Web Sitesi (10 Strateji)
**File:** `kucuk-isletmeler-icin-web-sitesi-nasil-musteri-getirir.webp`
**Prompt:**
> A growth chart made of interconnected web design elements: rising arrow composed of glowing UI cards, shopping cart icons, and user avatars. Customer acquisition visualization with golden path lines. Dark professional background. Modern digital marketing aesthetic, no text. 1200x675 px.

---

### 6. Google'da Görünürlük
**File:** `kucuk-isletmeler-google-da-gorunurluk-2026.webp`
**Prompt:**
> A glowing search result page with a local business ranking at #1 position, golden spotlight illuminating the top result. Abstract Google-style search bar dissolving into particles. Map pin icons floating nearby. Dark background with warm gold highlights. No text. 1200x675 px.

---

### 7. Neden İlk Sayfada Değil?
**File:** `web-siteniz-neden-hala-ilk-sayfada-degil-2026.webp`
**Prompt:**
> A dramatic web page split diagonally: left side dark with red warning signals, loading spinners, broken elements; right side bright golden with fast-loading smooth UI components. Speed and performance contrast. No text. 1200x675 px. Dark background with metallic gold accents.

---

### 8. Web Sitesi Tasarım Fiyatları 2026
**File:** `web-sitesi-tasarim-fiyatlari-2026.webp`
**Prompt:**
> Abstract pricing visualization: glowing price tags floating upward like stars, each with different web design quality levels (basic to premium). Tiered platform with golden premium tier at top, subtle blue lower tiers. Financial and design fusion aesthetic. No text. 1200x675 px. Dark background.

---

### 9. Tasarımın 5 Temel İlkesi
**File:** `tasarimin-5-temel-ilkesi.webp`
**Prompt:**
> Five floating geometric pillars arranged in a pentagon, each representing a design principle: balance (scales), contrast (yin-yang), hierarchy (steps), alignment (grid), repetition (pattern). Golden glowing edges on dark background. Minimal architectural aesthetic. No text. 1200x675 px.

---

### 10. Web Tasarım Fiyatları Neden Değişiyor?
**File:** `web-tasarim-fiyatlari-neden-degisiyor-2026.webp`
**Prompt:**
> A dynamic market fluctuation graph where the line is made of tiny web design elements (grids, buttons, typography). Upward trend with golden glow. Floating icons representing different cost factors: custom coding, animations, complexity. Dark professional background. No text. 1200x675 px.

---

### 11. Teknik Terimler Sözlüğü
**File:** `teknik-terimler.webp`
**Prompt:**
> A glossary/dictionary visualization: floating technical terms in elegant typography, connected by fine golden lines like a knowledge graph. Core Web Vitals icons, SSL shield, mobile device icons orbiting around. Academic yet modern aesthetic. Dark background with gold highlights. No text. 1200x675 px.

---

### 12. Ödüllü Sitelerin Maliyeti
**File:** `web-tasarim-fiyatlari-ne-kadar-odullu-siteler.webp`
**Prompt:**
> A prestigious award trophy morphing into a web design interface, with golden particles rising upward. Premium quality aesthetic: dark velvet background, golden ribbons, elegant UI components floating around. Award show meets web design. No text. 1200x675 px.

---

### 13. İzmit/Kocaeli Dijital Pazarlama
**File:** `izmit-dijital-pazarlama-kocaeli.webp`
**Prompt:**
> A stylized city map of Kocaeli/İzmit with glowing digital connection points, golden data streams flowing between landmarks. Bridge silhouette, industrial elegance, modern digital transformation theme. Dark navy background with warm gold and teal accents. No text. 1200x675 px.

---

## Yazı İçi Görseller (opsiyonel)

Gerekirse şu konularda inline görsel eklenebilir:

1. **Fiyat karşılaştırma görseli** — `web-sitesi-tasarim-fiyatlari-2026` yazısı için, tablo yerine görsel
2. **SEO diyagramı** — `web-siteniz-neden-hala-ilk-sayfada-degil-2026` için, SEO faktörleri pasta grafiği
3. **Kocaeli haritası** — `izmit-dijital-pazarlama-kocaeli` için, ısı haritası

---

## Üretim Talimatı

1. ChatGPT/GPT Image'da her prompt'u tek tek çalıştır
2. 1200×675 çıktıyı webp'ye dönüştür (https://convertio.co veya benzeri)
3. Dosyayı `public/images/blog/<slug>.webp` olarak kaydet
4. Dosya boyutunu 50-100KB arasında tutmaya çalış
5. Tüm görseller hazır olunca `npm run build` ile son kontrol yap
