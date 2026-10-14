# SenninWeb SEO Performans Raporu: Son 3 Ay

**Kaynak:** Google Search Console dışa aktarımı (12 Temmuz – 13 Ekim 2026, Web araması)
**Hazırlanma:** 14 Ekim 2026

## 1. Özet

| Metrik | Değer |
|---|---|
| Tıklama | **18** |
| Gösterim | **1.897** |
| Ortalama TO (CTR) | %0,95 |
| Ortalama pozisyon | ~36 |

| Ay | Tıklama | Gösterim |
|---|---|---|
| Temmuz (12–31) | 7 | 415 |
| Ağustos | 6 | 564 |
| Eylül | 4 | 696 |
| Ekim (1–13) | 1 | 222 |

**Ana sonuç:** Gösterimler her ay artıyor (+%35, +%23), tıklamalar ise artmıyor. Asıl sorun başlık/açıklama (CTR) değil, **sıralama**. Gösterimlerin büyük kısmı 3–9. sayfadan geliyor. Google sitenizi doğru konularla eşleştiriyor ama yeterince güvenmiyor.

Cihaz: Masaüstü %70 gösterim (pozisyon 41,6), Mobil %30 (pozisyon 34,8). Ülke: Türkiye 1.506 gösterim. ABD/Brezilya gösterimleri (131) alakasız, görmezden gelinebilir.

## 2. Üç ana sorgu kümesi

| Küme | Sorgu sayısı | Gösterim | Durum |
|---|---|---|---|
| **Fiyat** (web tasarım fiyatları, ücretleri, maliyet) | 40 | 451 | Ağırlıklı ort. pozisyon **~75**, 0 tıklama |
| **Kocaeli / İzmit** | 42 | 384 | /kocaeli pozisyon 28,6 |
| **Gebze** | 43 | 375 | /gebze **301 ile kapatılmış**, pozisyon 55–90 |

## 3. Bulgular ve yapılacaklar (öncelik sırasıyla)

### 🔴 P1: Tüm alt sayfalar ilk HTML'de ana sayfanın H1'ini sunuyordu ✅ DÜZELTİLDİ
`postbuild.mjs` her sayfaya yalnızca `<title>`/meta basıyordu. `<body>` her URL'de aynıydı: "Sennin Web ile işletmeniz için profesyonel web tasarım ve SEO hizmeti". Blog yazıları, /kocaeli, /hizmet/* JS çalışana kadar birbirinin kopyası görünüyordu. JS çalıştırmayan AI botları (ChatGPT, Perplexity, Claude) da içeriği hiç göremiyordu.
**Yapılan:** Her sayfa artık kendi H1'i + açıklaması + iç linkleriyle prerender ediliyor. Blog yazıları **tam metinle** (H2/H3, listeler, SSS) ve statik `Article` schema'sıyla geliyor.

### 🔴 P1: Gebze sayfasını geri getirin (öneri, kod değişikliği yapılmadı)
`vercel.json`: `/gebze → /hizmet/web-tasarim` (301). Ama:
- `/gebze` hâlâ **403 gösterim** alıyor (pozisyon 55)
- 43 Gebze sorgusu var, toplam 375 gösterim: *gebze seo* (73, poz. 17), *seo gebze* (30, poz. 14), *gebze web tasarım* (64, poz. 77)
- Outreach pipeline'ınız tamamen Gebze işletmelerini hedefliyor. Cold e-postayı alan kişi "gebze web tasarım" diye arattığında sizi bulamıyor.
- Blog içeriğinde 8 iç link hâlâ `/gebze`'ye gidiyor (301 zinciri).

**Yapılacak:** Kocaeli.jsx şablonuyla özgün bir `/gebze` sayfası açın: Gebze OSB / Çayırova / Darıca / Dilovası bölümleri, Gebze'den referans ve yorum, "Gebze SEO" H2'si ve yerel SSS. Sonra 301'i kaldırın.

### 🟠 P2: "Web tasarım fiyatları"nda kendi kendinizle yarışıyorsunuz
4 yazı aynı niyeti hedefliyor:

| Sayfa | Gösterim | Pozisyon |
|---|---|---|
| web-sitesi-tasarim-fiyatlari-2026 | 296 | 63,9 |
| profesyonel-web-sitesi-tasarim-maliyeti | 188 | 81,7 |
| web-tasarim-fiyatlari-neden-degisiyor-2026 | – | – |
| web-tasarim-fiyatlari-ne-kadar-odullu-siteler | 17 | 17,4 |

Google hangisini sıralayacağını seçemiyor ve hepsi 6–9. sayfada kalıyor.
**Yapılacak:** `web-sitesi-tasarim-fiyatlari-2026`'yı tek "pillar" yapın. Diğer ikisinin en iyi bölümlerini buraya taşıyıp 301 verin. "Ödüllü siteler" yazısını farklı bir niyete ("premium/özel tasarım maliyeti") konumlandırın. Pillar'a gerçek paket fiyat tablosu, "Gebze/Kocaeli'de web sitesi fiyatı" bölümü ve basit bir fiyat hesaplayıcı ekleyin. Bu sorgular para kazandıran sorgular, dönüşüm niyeti en yüksek küme bu.

### 🟠 P2: İlk sayfaya en yakın sorgular (pozisyon 5–20)

| Sorgu / Sayfa | Gösterim | Pozisyon | Aksiyon |
|---|---|---|---|
| kocaeli seo | 78 | 12,2 | /kocaeli'ye "Kocaeli SEO Hizmeti" H2 + SSS ekleyin |
| gebze seo / seo gebze | 103 | 14–17 | Gebze sayfası (P1) |
| bilecik seo | 24 | 6,2 | /bilecik title'ına "SEO" önde: "Bilecik SEO & Web Tasarım" |
| bilecik web tasarım | 14 | 11,3 | aynı |
| izmit seo | 14 | 12,8 | /kocaeli'de İzmit bölümü + izmit-dijital-pazarlama yazısından iç link |
| google da görünür olmak | 18 | 6,9 | kucuk-isletmeler-google-da-gorunurluk-2026 title'ında bu ifade geçsin |
| /blog/dijital-pazarlama-kanallari-nedir | 81 | 8,2 | **0 tıklama**, title/meta yeniden yazılmalı |
| /blog/bir-web-sitesi-ne-kadar-kazandirir | 150 | 7,8 | En iyi blog sayfası. İçine hizmet CTA'sı + /hizmet/web-tasarim linki |
| /hizmet/web-tasarim | 61 | 14,2 | Ana sayfa ve bloglardan daha fazla iç link (Services kartlarına eklendi ✅) |

### 🟠 P2: /kocaeli en çok gösterim alan sayfa (436, poz. 28,6)
"kocaeli web tasarım" 154 gösterim, pozisyon 21. Sayfa doğru sorguya eşleşmiş ama ince içerikli.
**Yapılacak:** İlçe bölümleri (İzmit, Gebze, Körfez, Gölcük, Derince), Kocaeli'den 1–2 vaka çalışması (Mira Balıkçılık formatında), Google yorumları, Kocaeli içerikli blog yazılarından bu sayfaya bağlam içi linkler.

### 🟡 P3: Marka sinyali zayıf
- "senninweb.com" araması pozisyon **16**, "sennin" pozisyon 5,9. Kendi alan adınızda 1. olmalısınız.
- Google İşletme Profili adresi Gölpazarı/Bilecik, hedef pazar ise Kocaeli/Gebze.
**Yapılacak:** GBP'de hizmet bölgelerine Gebze/Kocaeli ekleyin ve müşterilerden düzenli yorum isteyin. Instagram/LinkedIn şirket sayfasını `sameAs`'e ekleyin. Yerel rehberlerde (Yandex Harita, Foursquare, sektör dizinleri) tutarlı NAP bilgisi kullanın.

### 🟡 P3: AI görünürlüğü fırsatı
"yapay zeka görünürlük platformları…" gibi uzun soru sorguları pozisyon **1**'de (AI Mode tarzı sorgular). Hacim küçük ama trend yükseliyor. Prerender düzeltmesiyle artık AI botları tam metni okuyabiliyor. GEO yazısını güncel tutun.

## 4. Bu oturumda yapılan teknik SEO düzeltmeleri ✅

1. **Sayfaya özel prerender gövdesi** (H1 + içerik + iç linkler). Blog yazıları tam metin.
2. **Statik Article schema** (JSON-LD). Çift kayıt olmaması için JS açılışında kaldırılıyor, React kendi schema'sını basıyor.
3. **Sahte SearchAction kaldırıldı.** Sitede arama yok ama schema `/?s=` gösteriyordu ve bu URL GSC'ye girmişti (5 gösterim). Her gün değişen sahte `dateModified` de kaldırıldı.
4. **og:image SVG → JPG** (1200×630). WhatsApp, Facebook, LinkedIn ve X SVG önizlemeyi **göstermez**. Outreach e-postalarında ve WhatsApp'ta paylaşılan linkler görselsiz gidiyordu.
5. **Sitemap `lastmod`**: blog yazıları artık gerçek `dateModified` tarihini kullanıyor (önceden her build'de tüm URL'ler "bugün" oluyordu, Google bu sinyali yok saymaya başlar).
6. **Blog H1 = tam başlık** (`shortTitle` yerine `title`): anahtar kelime kapsamı arttı.
7. **Ana sayfa → hizmet sayfaları iç linkleri** (Services kartları + E-ticaret/Dijital Pazarlama/Kocaeli/Bilecik linkleri).

## 5. Ölçüm (zorunlu)

Sitede artık her WhatsApp / telefon / e-posta tıklaması ve form gönderimi GA4'e `generate_lead` olayı olarak gidiyor (`lead_channel`, `lead_placement`, `page_path` parametreleriyle).
**GA4'te yapmanız gereken:** Yönetici → Etkinlikler → `generate_lead` → **Önemli etkinlik olarak işaretle**. Ayrıca GSC ↔ GA4 bağlantısını kurun. Böylece hangi sorgu/sayfanın lead getirdiğini göreceksiniz.

## 6. Tutarlılık uyarıları (güven sinyali)

- "Ortalama 8 günde teslim" (ana sayfa), "2–4 haftada yayında" (hizmet meta) ve "48 saatte demo" birbiriyle çelişiyor. Tek bir söz seçin.
- "%100 müşteri memnuniyeti" doğrulanamaz bir iddia. Bunun yerine "X Google yorumu, 5.0 ★" gibi kanıtlanabilir bir metrik kullanın.
- `scripts/generate-md-mirrors.mjs` `image` bölüm tipini tanımıyor (Mira Balıkçılık yazısı, build uyarısı).
