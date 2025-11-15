import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'

const CinderellaModel = () => {
  const { scene } = useGLTF('/models/cinderella3D.glb')
  const clonedScene = useMemo(() => scene.clone(true), [scene])
  const groupRef = useRef(null)

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -1.4, 0]} scale={[1.15, 1.15, 1.15]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  )
}

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextValue = Math.min(prev + 1, 100)
        if (nextValue === 100) {
          clearInterval(interval)
        }
        return nextValue
      })
    }, 28)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100 && typeof onComplete === 'function') {
      const timeout = setTimeout(() => onComplete(), 450)
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  const arc = (progress / 100) * 360
  const progressStyle = useMemo(
    () => ({
      background: `conic-gradient(var(--brand-accent, #fbd0ff) ${arc}deg, rgba(255,255,255,0.08) ${arc}deg 360deg)`,
    }),
    [arc],
  )

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#05020a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="flex w-full max-w-[420px] flex-col items-center gap-10 px-4 text-center sm:gap-12">
        <div className="relative h-48 w-full sm:h-56">
          <Canvas
            camera={{ position: [0.3, 0.8, 3], fov: 30 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 5, 2]} intensity={1.2} color="#ffd1ff" />
            <directionalLight position={[-4, 3, -2]} intensity={0.6} color="#a3f6ff" />
            <Suspense fallback={null}>
              <CinderellaModel />
              <Environment preset="studio" />
              <ContactShadows
                position={[0, -1.6, 0]}
                opacity={0.5}
                blur={2.5}
                far={4}
                scale={5}
                color="#14041f"
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative h-32 w-32 sm:h-36 sm:w-36">
            <div
              className="absolute inset-0 rounded-full p-[2px]"
              style={progressStyle}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#11021c] shadow-[0_0_25px_rgba(219,173,255,0.25)]">
                <span className="text-3xl font-semibold tracking-tight sm:text-4xl">{progress}%</span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-1 rounded-full border border-white/10"></div>
          </div>
          <p className="text-[0.75rem] uppercase tracking-[0.5em] text-white/60">Зареждане</p>
          <p className="max-w-xs text-sm text-white/70">
            Приказката се подготвя...
          </p>
        </div>
      </div>
    </motion.div>
  )
}

useGLTF.preload('/models/cinderella3D.glb')

export default LoadingScreen
