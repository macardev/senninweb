import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Trail } from '@react-three/drei'
import useInView from '@/hooks/useInView'

// ─── Utsuri 3D Sahne ────────────────────────────────────────────────
function UtsuriOrb() {
  const meshRef  = useRef()
  const groupRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x  = t * 0.3
    meshRef.current.rotation.y  = t * 0.2
    ringRef1.current.rotation.z = t * 0.4
    ringRef1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.1
    ringRef2.current.rotation.z = -t * 0.25
    ringRef2.current.rotation.y = t * 0.15
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08
  })

  return (
    <group ref={groupRef}>
      {/* Ana küre */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshTransmissionMaterial
          backside
          samples={12}
          resolution={256}
          transmission={0.95}
          roughness={0.08}
          thickness={0.5}
          ior={1.6}
          chromaticAberration={0.08}
          distortion={0.15}
          distortionScale={0.4}
          temporalDistortion={0.08}
          color="#9333EA"
          attenuationColor="#C084FC"
          attenuationDistance={0.6}
        />
      </mesh>

      {/* Mor halka 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.012, 16, 120]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.5} />
      </mesh>

      {/* Pembe halka 2 */}
      <mesh ref={ringRef2} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.006, 16, 120]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.3} />
      </mesh>

      {/* Küçük yörüngeli top */}
      <mesh position={[1.6, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#C084FC" />
      </mesh>
    </group>
  )
}

function UtsuriParticles({ count = 50 }) {
  const mesh = useRef()
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r     = 2 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.random() * Math.PI
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#A855F7" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function UtsuriScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]}   intensity={2}   color="#A855F7" />
      <pointLight position={[-3, -2, -3]} intensity={1}   color="#EC4899" />
      <pointLight position={[0, 0, 3]}   intensity={0.8} color="#ffffff" />
      <UtsuriOrb />
      <UtsuriParticles />
    </Canvas>
  )
}

// ─── Utsuri Featured Kart ───────────────────────────────────────────
function UtsuriCard() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden border border-purple-500/20
                 bg-white/[0.02] group col-span-1 md:col-span-2"
      style={{ minHeight: 480 }}
    >
      {/* Arka plan glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br
                        from-purple-900/20 via-transparent to-pink-900/10" />
        <motion.div
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br
                     from-purple-800/10 via-transparent to-pink-800/10"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full">

        {/* Sol — 3D sahne */}
        <div className="relative h-64 md:h-full min-h-[280px]">
          <UtsuriScene />

          {/* Floating etiket */}
          <motion.div
            animate={hovered ? { y: -4, opacity: 1 } : { y: 0, opacity: 0.7 }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 left-5 px-3 py-1.5 rounded-full
                       bg-purple-500/20 border border-purple-400/30
                       text-xs text-purple-300 font-medium tracking-wide"
          >
            ✦ Canlı Referans
          </motion.div>
        </div>

        {/* Sağ — içerik */}
        <div className="p-8 md:p-10 flex flex-col justify-center">

          {/* Kategori */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-purple-400" />
            <span className="text-xs tracking-[0.25em] uppercase text-purple-400/70 font-medium">
              AI SaaS · Moda Teknolojisi
            </span>
          </div>

          {/* Logo / İsim */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20
                            border border-purple-400/30
                            flex items-center justify-center text-lg">
              ✦
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                Utsuri AI
              </h3>
              <p className="text-xs text-white/35">utsuriai.com</p>
            </div>
          </div>

          {/* Açıklama */}
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Moda markaları için yapay zeka destekli model fotoğrafı üretim platformu.
            Gerçek fotoğraf çekimi olmadan, dakikalar içinde profesyonel ürün görselleri.
            Türkiye'nin öncü AI fashion platformu.
          </p>

          {/* Özellikler */}
          <div className="space-y-2.5 mb-8">
            {[
              'AI destekli model fotoğrafı üretimi',
              'Çoklu şablon & stil sistemi',
              'Türkçe arayüz & yerel destek',
              'SaaS abonelik altyapısı',
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-1 h-1 rounded-full bg-purple-400/70 flex-shrink-0" />
                <span className="text-sm text-white/45">{feat}</span>
              </motion.div>
            ))}
          </div>

          {/* Ayraç */}
          <div className="w-full h-px bg-white/6 mb-6" />

          {/* Metrikler */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { value: 'SaaS',   label: 'Platform türü'   },
              { value: 'AI',     label: 'Teknoloji'        },
              { value: 'TR #1',  label: 'AI Fashion'       },
            ].map((m, i) => (
              <div key={i}>
                <p className={`font-display font-bold text-base mb-0.5 ${
                  i === 0 ? 'text-purple-400' : 'text-white'
                }`}>
                  {m.value}
                </p>
                <p className="text-[11px] text-white/30">{m.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="[utsuriai.com](https://utsuriai.com)"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 text-sm font-medium
                        text-purple-300 hover:text-purple-200
                        transition-colors duration-300 group/btn"
            >
              <span>Siteyi Ziyaret Et</span>
              <span className="w-7 h-7 rounded-full border border-purple-400/30
                              group-hover/btn:border-purple-300/60
                              flex items-center justify-center
                              transition-colors duration-300">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 9L9 2M9 2H4M9 2v5"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Küçük Showcase Kartları ────────────────────────────────────────
const showcases = [
  {
    id: '02',
    name: 'Özkan Mobilya',
    category: 'Mobilya & İç Tasarım · Bilecik',
    description: 'Yerel mobilya ustasının dijital vitrini. Ürün galerisi ve yerel SEO.',
    tags: ['Web Tasarım', 'SEO'],
    color: '#D97706',
    metrics: { value: '3x', label: 'Daha fazla müşteri' },
  },
  {
    id: '03',
    name: 'Dr. Ayşe Kaya',
    category: 'Diş Kliniği · Bilecik',
    description: 'Modern diş kliniği için premium dijital varlık ve online randevu.',
    tags: ['Web Tasarım', 'SEO'],
    color: '#34D399',
    metrics: { value: '2x', label: 'Online randevu' },
  },
]

function ShowcaseCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl overflow-hidden border border-white/6
                 bg-white/[0.02] hover:border-white/12 transition-all duration-500 p-7"
    >
      {/* Numara */}
      <span className="text-[10px] tracking-[0.3em] uppercase font-medium"
        style={{ color: project.color }}>
        {project.id}
      </span>

      {/* Mock ekran */}
      <div className="relative h-32 my-5 rounded-xl bg-surface-100 overflow-hidden">
        {/* Tarayıcı bar */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-surface-200
                        flex items-center px-3 gap-1.5">
          {[1,2,3].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-white/10" />
          ))}
        </div>
        {/* İçerik */}
        <div className="absolute inset-0 top-6 p-3 flex flex-col gap-2">
          <div className="h-1 rounded-full w-3/4"
            style={{ background: project.color, opacity: 0.6 }} />
          <div className="h-2.5 w-1/2 rounded bg-white/8" />
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="h-10 rounded bg-white/[0.04]" />
            <div className="h-10 rounded bg-white/[0.04]" />
          </div>
        </div>
      </div>

      {/* İsim */}
      <h3 className="font-display font-bold text-lg text-white tracking-tight mb-1">
        {project.name}
      </h3>
      <p className="text-[11px] text-white/30 mb-3">{project.category}</p>
      <p className="text-sm text-white/45 leading-relaxed mb-5">
        {project.description}
      </p>

      {/* Metrik */}
      <div className="flex items-center justify-between pt-4 border-t border-white/6">
        <div>
          <p className="font-display font-bold text-base"
            style={{ color: project.color }}>
            {project.metrics.value}
          </p>
          <p className="text-[11px] text-white/30">{project.metrics.label}</p>
        </div>
        <div className="flex gap-2">
          {project.tags.map(tag => (
            <span key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium
                         bg-white/4 border border-white/8 text-white/35">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Ana Section ─────────────────────────────────────────────────────
export default function References() {
  const { ref, inView } = useInView()

  return (
    <section id="references" className="relative bg-black section-pad overflow-hidden">

      {/* Arka plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px]
                        bg-purple-900/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px]
                        bg-gold-500/4 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-500/70 font-medium">
              Referanslar
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-5xl md:text-6xl
                           tracking-tight leading-tight">
              <span className="text-white">Sonuçlar</span>
              <br />
              <span className="text-gold-gradient">konuşuyor.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs md:text-right">
              Gerçek projeler, gerçek büyüme.
              Her biri sektöründe dijitalin gücünü kanıtlıyor.
            </p>
          </div>
        </motion.div>

        {/* Grid — Utsuri büyük + 2 küçük */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <UtsuriCard />
          {showcases.map((p, i) => (
            <ShowcaseCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Alt not */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center text-xs text-white/20 mt-10 tracking-wide"
        >
          * Özkan Mobilya ve Dr. Ayşe Kaya showcase amaçlıdır.
          Utsuri AI canlı ve aktif referanstır.
        </motion.p>
      </div>
    </section>
  )
}
