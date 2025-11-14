import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useState } from 'react'

const LoadingOverlay = ({ label }) => (
  <Html center>
    <div className="flex flex-col items-center gap-2 text-white">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white/80"></span>
      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70">Зареждаме {label}</p>
    </div>
  </Html>
)

const ModelUnavailable = ({ label }) => (
  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-center text-white/80">
    <span className="text-sm uppercase tracking-[0.45em]">3D модел</span>
    <p className="text-xs uppercase tracking-[0.4em] text-white/60">{label} е в подготовка</p>
  </div>
)

const DessertModel = ({ src }) => {
  const { scene } = useGLTF(src)
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene])

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <primitive object={clonedScene} position={[0, -0.45, 0]} dispose={null} />
    </Float>
  )
}

const HeroModel = ({ eyebrow, label, modelSrc, slideId }) => {
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

  return (
    <div className="flex flex-col gap-6 text-white">
      <div
        aria-label={`${label} 3D модел`}
        className="relative isolate h-[360px] w-full overflow-hidden rounded-[28px] border border-white/15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_70%)]"
        id={`hero-model-${slideId}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent_60%)]"></div>
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl"></div>
        <div className="pointer-events-none absolute inset-8 rounded-[32px] border border-white/10"></div>
        <div className="pointer-events-none absolute inset-x-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full border border-white/30"></div>

        {canRenderModel ? (
          <Canvas
            key={modelSrc}
            camera={{ position: [0, 0.9, 3], fov: 35, near: 0.1, far: 20 }}
            className="absolute inset-0"
            dpr={[1, 1.8]}
            shadows
          >
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
              autoRotateSpeed={0.8}
              enablePan={false}
              target={[0, -0.2, 0]}
              maxDistance={4}
              minDistance={2}
              enableZoom
            />
          </Canvas>
        ) : (
          <ModelUnavailable label={label} />
        )}
      </div>

      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">{eyebrow}</p>
        <h2 className="mt-3 font-luxury text-3xl text-white">{label}</h2>
      </div>
    </div>
  )
}

export default HeroModel
