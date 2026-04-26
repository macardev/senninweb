import{r as c,u as L,a as y,j as e,L as w,O as R}from"./vendor-react-BWZq-Uvr.js";import{u as K,m as u,A,a as z,b as g}from"./vendor-motion-9J6HXoXH.js";function b(i,{behavior:r="smooth",block:o="start",maxAttempts:s=240}={}){if(typeof document>"u")return;let l=0;const t=()=>{const n=document.getElementById(i);if(n){n.scrollIntoView({behavior:r,block:o});return}l+=1,l<s&&requestAnimationFrame(t)};requestAnimationFrame(t)}const j=[{label:"Hizmetler",href:"/#services"},{label:"Referanslar",href:"/#references"},{label:"İletişim",href:"/#contact"},{label:"Dijital Rehber",href:"/blog"}];function M(){const[i,r]=c.useState(!1),[o,s]=c.useState(!1),{scrollY:l}=K(),t=L(),n=y();c.useEffect(()=>{let a=0;const h=100;return l.on("change",d=>{const x=Date.now();x-a>h&&(r(d>50),a=x)})},[l]);const m=(a,h)=>{a.preventDefault(),s(!1);const f=h.indexOf("#"),d=f>=0?h.slice(f+1):"";if(d){if(n.pathname!=="/"){t("/"),setTimeout(()=>b(d),0);return}b(d)}};return e.jsxs(u.header,{initial:{y:-100,opacity:0},animate:{y:0,opacity:1},transition:{duration:.8,ease:[.16,1,.3,1],delay:.1},className:`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${i?"bg-black/80 backdrop-blur-xl border-b border-white/5 py-4":"bg-transparent py-7"}`,children:[e.jsxs("div",{className:"max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between",children:[e.jsxs("a",{href:"/",onClick:a=>{a.preventDefault(),s(!1),n.pathname!=="/"&&t("/"),setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),0)},className:"flex items-center gap-3 group",children:[e.jsxs("div",{className:"relative w-8 h-8",children:[e.jsx("div",{className:"absolute inset-0 rounded-full border border-gold-500/60 group-hover:border-gold-400 transition-colors duration-300"}),e.jsx("div",{className:"absolute inset-[5px] rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors duration-300"}),e.jsx("div",{className:"absolute inset-[9px] rounded-full bg-gold-500 group-hover:scale-110 transition-transform duration-300"})]}),e.jsxs("span",{className:"font-display font-bold text-lg tracking-tight text-white",children:["Sennin",e.jsx("span",{className:"text-gold-gradient",children:"Web"})]})]}),e.jsx("nav",{className:"hidden md:flex items-center gap-10",children:j.map(a=>a.href.startsWith("/")?e.jsx(w,{to:a.href,className:"text-sm font-medium text-white/50 hover:text-white transition-colors duration-300 tracking-wide",children:a.label},a.href):e.jsx("a",{href:a.href,onClick:f=>m(f,a.href),className:"text-sm font-medium text-white/50 hover:text-white transition-colors duration-300 tracking-wide",children:a.label},a.href))}),e.jsx("div",{className:"hidden md:block",children:e.jsx("a",{href:"/#contact",onClick:a=>m(a,"/#contact"),children:e.jsxs(u.button,{whileHover:{scale:1.03},whileTap:{scale:.97},className:"relative px-6 py-2.5 text-sm font-medium tracking-wide overflow-hidden group",children:[e.jsx("span",{className:"absolute inset-0 rounded-full border border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300"}),e.jsx("span",{className:"absolute inset-0 rounded-full bg-gold-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"}),e.jsx("span",{className:"relative z-10 text-gold-400 group-hover:text-black transition-colors duration-300",children:"Teklif Al"})]})})}),e.jsxs("button",{className:"md:hidden flex flex-col gap-[5px] p-2 z-50",onClick:()=>s(a=>!a),"aria-label":"Menüyü aç",children:[e.jsx(u.span,{animate:o?{rotate:45,y:7}:{rotate:0,y:0},className:"block w-6 h-px bg-white origin-center",transition:{duration:.3}}),e.jsx(u.span,{animate:o?{opacity:0,scaleX:0}:{opacity:1,scaleX:1},className:"block w-6 h-px bg-white",transition:{duration:.3}}),e.jsx(u.span,{animate:o?{rotate:-45,y:-7}:{rotate:0,y:0},className:"block w-6 h-px bg-white origin-center",transition:{duration:.3}})]})]}),e.jsx(u.div,{initial:!1,animate:o?{opacity:1,height:"auto",pointerEvents:"auto"}:{opacity:0,height:0,pointerEvents:"none"},transition:{duration:.4,ease:[.16,1,.3,1]},className:"md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5",children:e.jsxs("div",{className:"px-6 py-8 flex flex-col gap-7",children:[j.map(a=>{const h=a.href.startsWith("/");return a.href.startsWith("/#")?e.jsx("a",{href:a.href,onClick:d=>m(d,a.href),className:"text-xl font-display font-semibold text-white/70 hover:text-white transition-colors",children:a.label},a.href):h?e.jsx(w,{to:a.href,onClick:()=>s(!1),className:"text-xl font-display font-semibold text-white/70 hover:text-white transition-colors",children:a.label},a.href):e.jsx("a",{href:a.href,onClick:d=>m(d,a.href),className:"text-xl font-display font-semibold text-white/70 hover:text-white transition-colors",children:a.label},a.href)}),e.jsx("a",{href:"/#contact",onClick:a=>m(a,"/#contact"),children:e.jsx("button",{className:"w-full py-3.5 rounded-full border border-gold-500/50 text-gold-400 text-sm font-medium tracking-wide",children:"Teklif Al"})})]})})]})}const S=[{title:"Hizmetler",links:[{label:"Web Tasarım",href:"/#services"},{label:"SEO & Büyüme",href:"/#services"},{label:"Kurumsal Kimlik",href:"/#services"}]},{title:"Şirket",links:[{label:"Referanslar",href:"/#references"},{label:"Nasıl Çalışırız",href:"/#how"},{label:"İletişim",href:"/#contact"}]}],T={kvkk:{title:"KVKK Aydınlatma Metni",content:`KİŞİSEL VERİLERİN KORUNMASI KANUNU AYDINLATMA METNİ

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

İletişim: macarcagatay@gmail.com`}};function C({type:i,onClose:r}){const o=T[i];return o?e.jsx(u.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:r,className:`fixed inset-0 z-[9998] flex items-end sm:items-center
                 justify-center p-4 bg-black/80 backdrop-blur-sm`,children:e.jsxs(u.div,{initial:{opacity:0,y:60,scale:.97},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:60,scale:.97},transition:{duration:.4,ease:[.16,1,.3,1]},onClick:s=>s.stopPropagation(),className:`relative w-full max-w-2xl max-h-[80vh] rounded-2xl
                   border border-white/10 bg-[#0f0f0f] overflow-hidden`,children:[e.jsxs("div",{className:`flex items-center justify-between px-8 py-5
                        border-b border-white/6`,children:[e.jsx("h3",{className:"font-display font-bold text-lg text-white",children:o.title}),e.jsx("button",{onClick:r,className:`w-8 h-8 rounded-full border border-white/10
                       flex items-center justify-center
                       text-white/40 hover:text-white
                       hover:border-white/30 transition-colors`,children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M1 1l10 10M11 1L1 11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]}),e.jsx("div",{className:`px-8 py-6 overflow-y-auto max-h-[60vh]
                        scrollbar-thin scrollbar-track-transparent
                        scrollbar-thumb-white/10`,children:e.jsx("pre",{className:`text-xs text-white/45 leading-relaxed
                          whitespace-pre-wrap font-sans`,children:o.content})})]})}):null}function I(){const[i,r]=c.useState(null),o=L(),s=y(),l=(t,n)=>{t.preventDefault();const m=n.indexOf("#"),a=m>=0?n.slice(m+1):"";if(a){if(s.pathname!=="/"){o("/"),setTimeout(()=>b(a),0);return}b(a)}};return e.jsxs(e.Fragment,{children:[e.jsxs("footer",{className:"relative bg-black border-t border-white/5 overflow-hidden",children:[e.jsx("div",{className:`absolute bottom-0 left-1/2 -translate-x-1/2
                        w-[500px] h-[200px] bg-gold-500/3
                        blur-[120px] pointer-events-none`}),e.jsxs("div",{className:"relative z-10 max-w-7xl mx-auto px-6 md:px-12",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-12 py-16",children:[e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-5",children:[e.jsxs("div",{className:"relative w-8 h-8",children:[e.jsx("div",{className:"absolute inset-0 rounded-full border border-gold-500/60"}),e.jsx("div",{className:"absolute inset-[5px] rounded-full bg-gold-500/20"}),e.jsx("div",{className:"absolute inset-[9px] rounded-full bg-gold-500"})]}),e.jsxs("span",{className:"font-display font-bold text-lg tracking-tight text-white",children:["Sennin",e.jsx("span",{className:"text-gold-gradient",children:"Web"})]})]}),e.jsx("p",{className:"text-sm text-white/35 leading-relaxed max-w-xs mb-6",children:"İşletmeleriniz için premium web tasarım ve SEO ajansı. Dijitalde güçlü bir varlık için buradayız."}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("a",{href:"mailto:macarcagatay@gmail.com",className:`flex items-center gap-2.5 text-xs text-white/35
                             hover:text-gold-400 transition-colors duration-300 group`,children:[e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",className:"text-gold-500/50 group-hover:text-gold-400 transition-colors",children:e.jsx("path",{d:"M1.5 3l5 4 5-4M1.5 3h10v8a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V3z",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"})}),"macarcagatay@gmail.com"]}),e.jsxs("div",{className:"flex items-center gap-2.5 text-xs text-white/35",children:[e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",className:"text-gold-500/50",children:e.jsx("path",{d:"M6.5 1a4 4 0 100 8A4 4 0 006.5 1zM1 12c0-2 2.5-3 5.5-3s5.5 1 5.5 3",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})}),"Bilecik & İstanbul, Türkiye"]})]})]}),S.map(t=>e.jsxs("div",{children:[e.jsx("h4",{className:`text-[10px] font-semibold uppercase tracking-[0.2em]
                               text-white/25 mb-5`,children:t.title}),e.jsx("ul",{className:"space-y-3",children:t.links.map(n=>e.jsx("li",{children:e.jsx("a",{href:n.href,onClick:m=>l(m,n.href),className:`text-sm text-white/40 hover:text-white
                                   transition-colors duration-300`,children:n.label})},n.label))})]},t.title))]}),e.jsx("div",{className:"gold-line opacity-10"}),e.jsxs("div",{className:`py-6 flex flex-col sm:flex-row items-center
                          justify-between gap-4`,children:[e.jsx("p",{className:"text-xs text-white/20 tracking-wide",children:"© 2025 SenninWeb. Tüm hakları saklıdır."}),e.jsx("div",{className:"flex items-center gap-6",children:[{key:"kvkk",label:"KVKK"},{key:"gizlilik",label:"Gizlilik Politikası"},{key:"kullanim",label:"Kullanım Koşulları"}].map(t=>e.jsx("button",{onClick:()=>r(t.key),className:`text-xs text-white/25 hover:text-white/60
                             transition-colors duration-300 underline
                             underline-offset-2 decoration-white/10`,children:t.label},t.key))})]})]})]}),e.jsx(A,{children:i&&e.jsx(C,{type:i,onClose:()=>r(null)})})]})}function W({routeKey:i}){const r=c.useRef(null),o=c.useRef(null),s=c.useRef(new Set),l=c.useRef(null),t=z(-100),n=z(-100),m=g(t,{stiffness:80,damping:20,mass:.5}),a=g(n,{stiffness:80,damping:20,mass:.5}),h=g(t,{stiffness:400,damping:28,mass:.2}),f=g(n,{stiffness:400,damping:28,mass:.2});return c.useEffect(()=>{const d=x=>{t.set(x.clientX),n.set(x.clientY)};return window.addEventListener("mousemove",d,{passive:!0,capture:!1}),()=>{window.removeEventListener("mousemove",d,{capture:!1})}},[t,n]),c.useEffect(()=>{const d=()=>{r.current&&r.current.classList.add("scale-[2.5]","border-gold-500","opacity-60")},x=()=>{r.current&&r.current.classList.remove("scale-[2.5]","border-gold-500","opacity-60")},p=k=>{s.current.has(k.target)&&d()},v=k=>{s.current.has(k.target)&&x()};return(()=>{l.current&&(document.removeEventListener("mouseenter",p,!0),document.removeEventListener("mouseleave",v,!0));const k=document.querySelectorAll('a, button, [role="button"], [data-cursor]');s.current.clear(),k.forEach(E=>{s.current.add(E)}),document.addEventListener("mouseenter",p,!0),document.addEventListener("mouseleave",v,!0),l.current={handleMouseEnter:p,handleMouseLeave:v}})(),()=>{l.current&&(document.removeEventListener("mouseenter",p,!0),document.removeEventListener("mouseleave",v,!0))}},[i]),e.jsxs(e.Fragment,{children:[e.jsx(u.div,{ref:r,className:"fixed top-0 left-0 w-9 h-9 rounded-full border border-white/30 pointer-events-none z-[9999] transition-transform duration-200",style:{x:m,y:a,translateX:"-50%",translateY:"-50%"}}),e.jsx(u.div,{ref:o,className:"fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold-500 pointer-events-none z-[9999]",style:{x:h,y:f,translateX:"-50%",translateY:"-50%"}})]})}function N(){return!(typeof window>"u"||window.innerWidth<=768||window.matchMedia&&window.matchMedia("(pointer: fine)").matches===!1||window.matchMedia&&window.matchMedia("(hover: hover)").matches===!1)}function B(){const i=y(),[r,o]=c.useState(N);c.useEffect(()=>{const l=()=>o(N());l(),window.addEventListener("resize",l);const t=window.matchMedia?.("(pointer: fine)"),n=window.matchMedia?.("(hover: hover)");return t?.addEventListener?.("change",l),n?.addEventListener?.("change",l),()=>{window.removeEventListener("resize",l),t?.removeEventListener?.("change",l),n?.removeEventListener?.("change",l)}},[]),c.useEffect(()=>{if(!(typeof document>"u"))return document.body.classList.toggle("cursor-none",r),()=>{document.body.classList.remove("cursor-none")}},[r]),c.useEffect(()=>{if(typeof window>"u"||i.pathname!=="/"||!i.hash)return;const l=i.hash.startsWith("#")?i.hash.slice(1):i.hash;l&&setTimeout(()=>b(l),0)},[i.pathname,i.hash]);const s=c.useMemo(()=>`${i.pathname}${i.search}${i.hash}`,[i.pathname,i.search,i.hash]);return e.jsxs(e.Fragment,{children:[r&&e.jsx(W,{routeKey:s}),e.jsx(M,{}),e.jsxs("div",{className:"min-h-screen flex flex-col bg-black text-white",children:[e.jsx("main",{className:"flex-1 pt-28",children:e.jsx(R,{})}),e.jsx(I,{})]})]})}export{B as L,b as s};
