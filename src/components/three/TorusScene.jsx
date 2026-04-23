import React, { useRef, useMemo, Suspense, lazy } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Torus() {
  const meshRef    = useRef()
  const groupRef   = useRef()

  // Mouse takibi - memoized to avoid recreating object
  const mouse = useMemo(() => ({ x: 0, y: 0 }), [])

  React.useEffect(() => {
    const handleMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouse])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Sürekli yavaş dönüş
    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.22
    meshRef.current.rotation.z = t * 0.08

    // Mouse'a göre group eğilmesi — smooth
    groupRef.current.rotation.x += (mouse.y * 0.3 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.04

    // Nefes efekti — scale
    const breath = 1 + Math.sin(t * 0.8) * 0.025
    groupRef.current.scale.setScalar(breath)
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.4, 0.45, 128, 200]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.05}
          thickness={0.4}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
          attenuationColor="#D97706"
          attenuationDistance={0.5}
        />
      </mesh>

      {/* İnce altın halka — dışta döner */}
      <mesh rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[2.1, 0.008, 16, 200]} />
        <meshBasicMaterial color="#D97706" transparent opacity={0.4} />
      </mesh>

      {/* Daha ince ikinci halka */}
      <mesh rotation={[Math.PI / 1.6, 0.4, 0]}>
        <torusGeometry args={[2.4, 0.004, 16, 200]} />
        <meshBasicMaterial color="#FBBF24" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// Ambient parçacıklar
function Particles({ count = 80 }) {
  const mesh = useRef()

  const [positions, sizes] = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const size = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r     = 2.5 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.random() * Math.PI
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      size[i] = Math.random() * 0.03 + 0.005
    }
    return [pos, size]
  }, [count])

  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.05
    mesh.current.rotation.x = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#D97706"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function TorusScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          antialias:  true,
          alpha:      true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]}   intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#D97706" />
        <pointLight       position={[0, 0, 3]}    intensity={0.8} color="#FBBF24" />

        <Environment preset="city" />

        <Torus />
        <Particles />
      </Canvas>
    </div>
  )
}
