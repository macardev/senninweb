const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CustomCursor-dflkN2pT.js","assets/vendor-react-BWZq-Uvr.js","assets/vendor-motion-DBZmjNl2.js","assets/vendor-other-B1oI4NoE.js"])))=>i.map(i=>d[i]);
import{r as m,u as j,a as g,j as e,L as v,O as L}from"./vendor-react-BWZq-Uvr.js";const E="modulepreload",R=function(r){return"/"+r},y={},K=function(c,n,t){let h=Promise.resolve();if(n&&n.length>0){let b=function(d){return Promise.all(d.map(x=>Promise.resolve(x).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),s=l?.nonce||l?.getAttribute("nonce");h=b(n.map(d=>{if(d=R(d),d in y)return;y[d]=!0;const x=d.endsWith(".css"),f=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const i=document.createElement("link");if(i.rel=x?"stylesheet":E,x||(i.as="script"),i.crossOrigin="",i.href=d,s&&i.setAttribute("nonce",s),document.head.appendChild(i),x)return new Promise((k,u)=>{i.addEventListener("load",k),i.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return h.then(l=>{for(const s of l||[])s.status==="rejected"&&a(s.reason);return c().catch(a)})};function p(r,{behavior:c="smooth",block:n="start",maxAttempts:t=240}={}){if(typeof document>"u")return;let h=0;const a=()=>{const l=document.getElementById(r);if(l){l.scrollIntoView({behavior:c,block:n});return}h+=1,h<t&&requestAnimationFrame(a)};requestAnimationFrame(a)}const w=[{label:"Hizmetler",href:"/#services"},{label:"Referanslar",href:"/#references"},{label:"İletişim",href:"/#contact"},{label:"Dijital Rehber",href:"/blog"},{label:"Hizmet Verdiğimiz Bölgeler",href:"#",submenu:[{label:"Gebze",href:"/gebze"},{label:"Kocaeli (Yakında)",href:"#",disabled:!0},{label:"İstanbul (Yakında)",href:"#",disabled:!0},{label:"Bursa (Yakında)",href:"#",disabled:!0}]}];function A(){const[r,c]=m.useState(!1),[n,t]=m.useState(!1),[h,a]=m.useState(!1),[l,s]=m.useState(!1),b=j(),d=g(),x=m.useRef(null);m.useEffect(()=>{const i=()=>{x.current||(x.current=requestAnimationFrame(()=>{c(window.scrollY>50),x.current=null}))};return window.addEventListener("scroll",i,{passive:!0}),()=>{window.removeEventListener("scroll",i),x.current&&cancelAnimationFrame(x.current)}},[]);const f=m.useCallback((i,k)=>{i.preventDefault(),t(!1);const u=k.indexOf("#"),o=u>=0?k.slice(u+1):"";if(o){if(d.pathname!=="/"){b("/"),setTimeout(()=>p(o),0);return}p(o)}},[d.pathname,b]);return e.jsxs("header",{className:`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slideDown ${r?"bg-black/80 backdrop-blur-xl border-b border-white/5 py-4":"bg-transparent py-7"}`,children:[e.jsxs("div",{className:"max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between",children:[e.jsxs("a",{href:"/",onClick:i=>{i.preventDefault(),t(!1),d.pathname!=="/"&&b("/"),setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),0)},className:"flex items-center gap-3 group",children:[e.jsxs("div",{className:"relative w-8 h-8",children:[e.jsx("div",{className:"absolute inset-0 rounded-full border border-gold-500/60 group-hover:border-gold-400 transition-colors duration-300"}),e.jsx("div",{className:"absolute inset-[5px] rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors duration-300"}),e.jsx("div",{className:"absolute inset-[9px] rounded-full bg-gold-500 group-hover:scale-110 transition-transform duration-300"})]}),e.jsxs("span",{className:"font-display font-bold text-lg tracking-tight text-white",children:["Sennin",e.jsx("span",{className:"text-gold-gradient",children:"Web"})]})]}),e.jsx("nav",{className:"hidden md:flex items-center gap-10",children:w.map(i=>i.submenu?e.jsxs("div",{className:"relative",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[e.jsxs("button",{className:"text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide flex items-center gap-1",children:[i.label,e.jsx("svg",{className:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),h&&e.jsx("div",{className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 z-50",children:i.submenu.map((u,o)=>u.disabled?e.jsx("span",{className:"block px-4 py-2 text-sm text-white/55 cursor-not-allowed",children:u.label},o):e.jsx(v,{to:u.href,className:"block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center",onClick:()=>a(!1),children:u.label},u.href))})]},i.label):i.href.startsWith("/")?e.jsx(v,{to:i.href,className:"text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide",children:i.label},i.href):e.jsx("a",{href:i.href,onClick:u=>f(u,i.href),className:"text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide",children:i.label},i.href))}),e.jsx("div",{className:"hidden md:block",children:e.jsx("a",{href:"/#contact",onClick:i=>f(i,"/#contact"),children:e.jsxs("button",{className:"relative px-8 py-3 text-base font-medium tracking-wide overflow-hidden group rounded-full hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200",children:[e.jsx("span",{className:"absolute inset-0 rounded-full border border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300"}),e.jsx("span",{className:"absolute inset-0 rounded-full bg-gold-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"}),e.jsx("span",{className:"relative z-10 text-gold-400 group-hover:text-black transition-colors duration-300",children:"Teklif Al"})]})})}),e.jsxs("button",{className:"md:hidden flex flex-col gap-[5px] p-3 z-50 min-w-[44px] min-h-[44px] items-center justify-center",onClick:()=>t(i=>!i),"aria-label":"Menüyü aç",children:[e.jsx("span",{className:`block w-6 h-px bg-white origin-center transition-transform duration-300 ${n?"rotate-45 translate-y-[7px]":""}`}),e.jsx("span",{className:`block w-6 h-px bg-white transition-all duration-300 ${n?"opacity-0 scale-x-0":""}`}),e.jsx("span",{className:`block w-6 h-px bg-white origin-center transition-transform duration-300 ${n?"-rotate-45 -translate-y-[7px]":""}`})]})]}),e.jsx("div",{className:`md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${n?"opacity-100 max-h-[600px] pointer-events-auto":"opacity-0 max-h-0 pointer-events-none"}`,children:e.jsxs("div",{className:"px-6 py-8 flex flex-col gap-7",children:[w.map(i=>{if(i.submenu)return e.jsxs("div",{children:[e.jsxs("button",{onClick:()=>s(o=>!o),className:"text-xl font-display font-semibold text-white/70 hover:text-white transition-colors flex items-center gap-2 min-h-[44px]",children:[i.label,e.jsx("svg",{className:`w-4 h-4 transition-transform duration-300 ${l?"rotate-180":""}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),l&&e.jsx("div",{className:"ml-4 mt-3 flex flex-col gap-3",children:i.submenu.map((o,N)=>o.disabled?e.jsx("span",{className:"text-lg text-white/55 cursor-not-allowed min-h-[44px] flex items-center",children:o.label},N):e.jsx(v,{to:o.href,onClick:()=>{t(!1),s(!1)},className:"text-lg text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center",children:o.label},o.href))})]},i.label);const k=i.href.startsWith("/");return i.href.startsWith("/#")?e.jsx("a",{href:i.href,onClick:o=>{f(o,i.href),t(!1)},className:"text-xl font-display font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center",children:i.label},i.href):k?e.jsx(v,{to:i.href,onClick:()=>t(!1),className:"text-xl font-display font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center",children:i.label},i.href):e.jsx("a",{href:i.href,onClick:o=>{f(o,i.href),t(!1)},className:"text-xl font-display font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center",children:i.label},i.href)}),e.jsx("a",{href:"/#contact",onClick:i=>f(i,"/#contact"),children:e.jsx("button",{className:"w-full py-4 rounded-full border border-gold-500/50 text-gold-400 text-base font-medium tracking-wide hover:bg-gold-500/10 transition-colors",children:"Teklif Al"})})]})})]})}const M=[{title:"Hizmetler",links:[{label:"Web Tasarım",href:"/#services"},{label:"SEO & Büyüme",href:"/#services"},{label:"Kurumsal Kimlik",href:"/#services"}]},{title:"Şirket",links:[{label:"Referanslar",href:"/#references"},{label:"Nasıl Çalışırız",href:"/#how"},{label:"İletişim",href:"/#contact"}]}],S={kvkk:{title:"KVKK Aydınlatma Metni",content:`KİŞİSEL VERİLERİN KORUNMASI KANUNU AYDINLATMA METNİ

WebRise ("Şirket") olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, Şirket olarak ürün ve hizmetlerimizden faydalanan kişiler dahil, Şirket ile ilişkili tüm şahıslara ait her türlü kişisel verinin 6698 sayılı Kişisel Verilerin Korunması Kanunu'na ("KVK Kanunu") uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.

VERİ SORUMLUSU

KVK Kanunu kapsamında kişisel verileriniz; veri sorumlusu sıfatıyla WebRise tarafından aşağıda açıklanan kapsamda işlenecektir.

HANGİ KİŞİSEL VERİLERİNİZİ İŞLİYORUZ?

Şirketimiz tarafından işlenen kişisel veriler şu şekilde sıralanabilir:
• Ad, soyad, telefon numarası, e-posta adresi gibi kimlik ve iletişim bilgileri
• Şirketinizin adı, sektörü ve iletişim bilgileri
• İnternet sitesi kullanım verileri (çerezler aracılığıyla toplanan veriler dahil)
• Tarafımıza ilettiğiniz her türlü talep ve şikayete ilişkin veriler

KİŞİSEL VERİLERİNİZİ HANGİ AMAÇLARLA İŞLİYORUZ?

Toplanan kişisel verileriniz; sunduğumuz hizmetlerin ifası, sizinle iletişim kurulması, hizmetlerimizin iyileştirilmesi ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.

VERİ GÜVENLİĞİ

Kişisel verilerinizin yetkisiz kişilerce erişilmesini engellemek ve güvenli biçimde saklanmasını sağlamak amacıyla gerekli teknik ve idari güvenlik önlemleri alınmaktadır.

HAKLARINIZ

KVK Kanunu'nun 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme haklarına sahipsiniz.

İletişim: macarcagatay@gmail.com`},gizlilik:{title:"Gizlilik Politikası",content:`GİZLİLİK POLİTİKASI

Son güncelleme: Ocak 2025

WebRise olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.

TOPLANAN BİLGİLER

Hizmetlerimizi kullanmanız sırasında aşağıdaki bilgileri toplayabiliriz:
• İletişim formu aracılığıyla sağladığınız ad, soyad, e-posta ve telefon bilgileri
• Tarayıcı türü, IP adresi ve ziyaret edilen sayfalar gibi teknik veriler
• Çerezler ve benzer izleme teknolojileri aracılığıyla toplanan kullanım verileri

BİLGİLERİN KULLANIMI

Topladığımız bilgileri; hizmet taleplerinize yanıt vermek, size özelleştirilmiş teklifler sunmak, hizmet kalitemizi geliştirmek ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanmaktayız.

ÇEREZLER

Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerez kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı hizmetlerimizden tam olarak yararlanamayabilirsiniz.

ÜÇÜNCÜ TARAFLARLA PAYLAŞIM

Kişisel verileriniz; yasal zorunluluklar dışında üçüncü taraflarla paylaşılmamaktadır.

İLETİŞİM

Gizlilik politikamıza ilişkin sorularınız için: macarcagatay@gmail.com`},kullanim:{title:"Kullanım Koşulları",content:`KULLANIM KOŞULLARI

Son güncelleme: Ocak 2025

Bu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.

HİZMETLERİN KAPSAMI

WebRise, küçük ve orta ölçekli işletmelere web tasarım, SEO danışmanlığı ve kurumsal kimlik hizmetleri sunmaktadır. Sunulan hizmetlerin kapsamı ve bedeli, taraflar arasında imzalanacak sözleşme ile belirlenir.

FİKRİ MÜLKİYET

Bu web sitesinde yer alan tüm içerik, tasarım, metin, görsel ve yazılım unsurları WebRise'ın mülkiyetindedir ve telif hukuku kapsamında korunmaktadır. İzinsiz kopyalanması ve kullanılması yasaktır.

MÜŞTERİ PROJELERİ

Proje sürecinde müşteriden temin edilen tüm bilgi ve belgeler gizli tutulur. WebRise, müşteri onayı olmaksızın bu bilgileri üçüncü taraflarla paylaşmaz. Tamamlanan projeler, müşteri izniyle referans olarak kullanılabilir.

SORUMLULUK SINIRI

WebRise, sunduğu hizmetleri özenle ve profesyonellikle yerine getirmeyi taahhüt eder. Ancak internet ortamının doğasından kaynaklanan aksaklıklar, üçüncü taraf platform değişiklikleri veya mücbir sebepler nedeniyle oluşabilecek zararlardan sorumlu tutulamaz.

DEĞİŞİKLİKLER

WebRise, kullanım koşullarını önceden haber vermeksizin güncelleme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayınlanacaktır.

İletişim: macarcagatay@gmail.com`}};function C({type:r,onClose:c}){const n=S[r];return n?e.jsx("div",{className:`fixed inset-0 z-[9998] flex items-end sm:items-center
                 justify-center p-4 bg-black/80 backdrop-blur-sm`,onClick:c,children:e.jsxs("div",{onClick:t=>t.stopPropagation(),className:`relative w-full max-w-2xl max-h-[80vh] rounded-2xl
                   border border-white/10 bg-[#0f0f0f] overflow-hidden
                   animate-modalIn`,children:[e.jsxs("div",{className:`flex items-center justify-between px-8 py-5
                        border-b border-white/6`,children:[e.jsx("h3",{className:"font-display font-bold text-lg text-white",children:n.title}),e.jsx("button",{onClick:c,className:`w-8 h-8 rounded-full border border-white/10
                               flex items-center justify-center
                               text-white/55 hover:text-white
                       hover:border-white/30 transition-colors`,children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M1 1l10 10M11 1L1 11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]}),e.jsx("div",{className:`px-8 py-6 overflow-y-auto max-h-[60vh]
                        scrollbar-thin scrollbar-track-transparent
                        scrollbar-thumb-white/10`,children:e.jsx("pre",{className:`text-xs text-white/60 leading-relaxed
                          whitespace-pre-wrap font-sans`,children:n.content})})]})}):null}function T(){const[r,c]=m.useState(null),n=j(),t=g(),h=(a,l)=>{a.preventDefault();const s=l.indexOf("#"),b=s>=0?l.slice(s+1):"";if(b){if(t.pathname!=="/"){n("/"),setTimeout(()=>p(b),0);return}p(b)}};return e.jsxs(e.Fragment,{children:[e.jsxs("footer",{className:"relative bg-black border-t border-white/5 overflow-hidden",children:[e.jsx("div",{className:`absolute bottom-0 left-1/2 -translate-x-1/2
                        w-[500px] h-[200px] bg-gold-500/3
                        blur-[120px] pointer-events-none`}),e.jsxs("div",{className:"relative z-10 max-w-7xl mx-auto px-6 md:px-12",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-12 py-16",children:[e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-5",children:[e.jsxs("div",{className:"relative w-8 h-8",children:[e.jsx("div",{className:"absolute inset-0 rounded-full border border-gold-500/60"}),e.jsx("div",{className:"absolute inset-[5px] rounded-full bg-gold-500/20"}),e.jsx("div",{className:"absolute inset-[9px] rounded-full bg-gold-500"})]}),e.jsxs("span",{className:"font-display font-bold text-lg tracking-tight text-white",children:["Sennin",e.jsx("span",{className:"text-gold-gradient",children:"Web"})]})]}),e.jsx("p",{className:"text-sm text-white/60 leading-relaxed max-w-xs mb-6",children:"İşletmeleriniz için premium web tasarım ve SEO ajansı. Dijitalde güçlü bir varlık için buradayız."}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("a",{href:"mailto:macarcagatay@gmail.com",className:`flex items-center gap-2.5 text-xs text-white/60
                             hover:text-gold-400 transition-colors duration-300 group`,children:[e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",className:"text-gold-500/50 group-hover:text-gold-400 transition-colors",children:e.jsx("path",{d:"M1.5 3l5 4 5-4M1.5 3h10v8a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V3z",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"})}),"macarcagatay@gmail.com"]}),e.jsxs("div",{className:"flex items-center gap-2.5 text-xs text-white/60",children:[e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",className:"text-gold-500/50",children:e.jsx("path",{d:"M6.5 1a4 4 0 100 8A4 4 0 006.5 1zM1 12c0-2 2.5-3 5.5-3s5.5 1 5.5 3",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})}),"Bilecik & İstanbul, Türkiye"]})]})]}),M.map(a=>e.jsxs("div",{children:[e.jsx("h4",{className:`text-[10px] font-semibold uppercase tracking-[0.2em]
                               text-white/55 mb-5`,children:a.title}),e.jsx("ul",{className:"space-y-3",children:a.links.map(l=>e.jsx("li",{children:e.jsx("a",{href:l.href,onClick:s=>h(s,l.href),className:`text-sm text-white/60 hover:text-white
                                   transition-colors duration-300`,children:l.label})},l.label))})]},a.title))]}),e.jsx("div",{className:"gold-line opacity-10"}),e.jsxs("div",{className:`py-6 flex flex-col sm:flex-row items-center
                          justify-between gap-4`,children:[e.jsx("p",{className:"text-xs text-white/55 tracking-wide",children:"© 2025 SenninWeb. Tüm hakları saklıdır."}),e.jsx("div",{className:"flex items-center gap-6",children:[{key:"kvkk",label:"KVKK"},{key:"gizlilik",label:"Gizlilik Politikası"},{key:"kullanim",label:"Kullanım Koşulları"}].map(a=>e.jsx("button",{onClick:()=>c(a.key),className:`text-xs text-white/55 hover:text-white/70
                             transition-colors duration-300 underline
                             underline-offset-2 decoration-white/10 min-h-[44px] flex items-center`,children:a.label},a.key))})]})]})]}),r&&e.jsx(C,{type:r,onClose:()=>c(null)})]})}const O=m.lazy(()=>K(()=>import("./CustomCursor-dflkN2pT.js"),__vite__mapDeps([0,1,2,3])));function z(){return!(typeof window>"u"||window.innerWidth<=768||window.matchMedia&&window.matchMedia("(pointer: fine)").matches===!1||window.matchMedia&&window.matchMedia("(hover: hover)").matches===!1)}function I(){const r=g(),[c,n]=m.useState(z);return m.useEffect(()=>{const t=()=>n(z());t(),window.addEventListener("resize",t);const h=window.matchMedia?.("(pointer: fine)"),a=window.matchMedia?.("(hover: hover)");return h?.addEventListener?.("change",t),a?.addEventListener?.("change",t),()=>{window.removeEventListener("resize",t),h?.removeEventListener?.("change",t),a?.removeEventListener?.("change",t)}},[]),m.useEffect(()=>{if(!(typeof document>"u"))return document.body.classList.toggle("cursor-none",c),()=>{document.body.classList.remove("cursor-none")}},[c]),m.useEffect(()=>{if(typeof window>"u"||r.pathname!=="/"||!r.hash)return;const t=r.hash.startsWith("#")?r.hash.slice(1):r.hash;t&&setTimeout(()=>p(t),0)},[r.pathname,r.hash]),e.jsxs(e.Fragment,{children:[c&&e.jsx(m.Suspense,{fallback:null,children:e.jsx(O,{})}),e.jsx(A,{}),e.jsxs("div",{className:"min-h-screen flex flex-col bg-black text-white overflow-x-hidden max-w-full",children:[e.jsx("main",{className:"flex-1 pt-28 w-full",children:e.jsx(L,{})}),e.jsx(T,{})]})]})}export{I as L,K as _,p as s};
