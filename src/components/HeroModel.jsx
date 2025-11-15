import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'

const LoadingOverlay = ({ label }) => (
  <Html center>
    <div className="flex flex-col items-center gap-2 text-white">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white/80"></span>
      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70">D-D��?D�DD'D�D�D� {label}</p>
    </div>
  </Html>
)

const ModelUnavailable = ({ label }) => (
  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-center text-white/80">
    <span className="text-sm uppercase tracking-[0.45em]">3D D�D_D'D�D�</span>
    <p className="text-xs uppercase tracking-[0.4em] text-white/60">{label} D� D� D�D_D'D3D_�,D_D�D�D�</p>
  </div>
)

const DessertModel = ({ src }) => {
  const { scene } = useGLTF(src)
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
      groupRef.current.rotation.y += delta * 0.35
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.65} floatIntensity={1.1} position={[0, 0, 0]}>
      <group ref={groupRef} position={[0, -0.55, 0]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  )
}

const HeroModel = ({ eyebrow, label, modelSrc, slideId, className = 'h-[420px] w-full' }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (modelSrc) {
      useGLTF.preload(modelSrc)
    }
  }, [modelSrc])

  const canRenderModel = mounted && Boolean(modelSrc)

  if (!canRenderModel) {
    return (
      <div className={className}>
        <div className="relative h-full w-full">
          <ModelUnavailable label={label} />
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        aria-label={`${label} 3D D�D_D'D�D�`}
        className="relative isolate h-full w-full text-white"
        id={`hero-model-${slideId}`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[42%] bg-gradient-to-br from-brand-accent/45 via-brand-lilac/35 to-brand-cyan/40 opacity-90 blur-[130px] sm:h-72 sm:w-72 lg:h-96 lg:w-96"></div>
          <div className="absolute inset-x-12 bottom-4 h-48 rounded-full bg-gradient-to-t from-white/45 via-white/10 to-transparent blur-[130px] sm:inset-x-16 sm:bottom-6 lg:h-64"></div>
        </div>

        <Canvas
          key={modelSrc}
          camera={{ position: [0, 1.25, 1.65], fov: 28, near: 0.1, far: 15 }}
          className="absolute inset-0"
          dpr={[1, 2.2]}
          shadows
        >
          <color attach="background" args={[0, 0, 0, 0]} />
          <ambientLight intensity={0.55} />
          <spotLight
            angle={0.5}
            castShadow
            color="#ffefff"
            intensity={70}
            penumbra={0.5}
            position={[4, 7, 3]}
            shadow-mapSize={1024}
          />
          <spotLight
            angle={0.45}
            color="#a6f0ff"
            intensity={30}
            position={[-5, 6, -2]}
          />
          <Suspense fallback={<LoadingOverlay label={label} />}>
            <DessertModel src={modelSrc} />
            <Environment preset="studio" />
            <ContactShadows opacity={0.45} scale={6} blur={2.5} far={4} resolution={512} position={[0, -1.2, 0]} />
          </Suspense>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.9}
            enablePan={false}
            enableZoom={false}
            maxDistance={2}
            minDistance={1.4}
            minPolarAngle={Math.PI * 0.38}
            maxPolarAngle={Math.PI * 0.52}
            target={[0, -0.15, 0]}
          />
        </Canvas>

        <div className="pointer-events-none absolute left-5 top-5 max-w-xs rounded-full border border-white/40 bg-white/20 px-4 py-2 text-[0.5rem] uppercase tracking-[0.45em] text-white backdrop-blur-md shadow-[0_10px_30px_rgba(255,255,255,0.25)] 2xl:text-[0.55rem]">
          {eyebrow}
        </div>
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center sm:left-auto sm:right-6 sm:translate-x-0 sm:text-right">
          <p className="font-luxury text-2xl text-white drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)] sm:text-3xl lg:text-4xl">{label}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroModel
