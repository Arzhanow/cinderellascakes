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

const DessertModel = ({ src, groupScale = 0.92, yOffset = -0.9 }) => {
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
      <group ref={groupRef} position={[0, yOffset, 0]} scale={[groupScale, groupScale, groupScale]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  )
}

const HeroModel = ({
  eyebrow,
  label,
  modelSrc,
  slideId,
  className = 'h-[320px] w-full',
  modelSettings = {},
}) => {
  const {
    modelScale = 0.92,
    modelYOffset = -0.9,
    cameraPosition = [0, 1.35, 1.95],
  } = modelSettings
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
        <div className="pointer-events-none absolute inset-0 opacity-0"></div>

        <Canvas
          key={modelSrc}
          camera={{ position: cameraPosition, fov: 32, near: 0.1, far: 15 }}
          className="absolute inset-0"
          dpr={[1, 2.2]}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          shadows
          style={{ background: 'transparent' }}
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
            <DessertModel src={modelSrc} groupScale={modelScale} yOffset={modelYOffset} />
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
            minPolarAngle={Math.PI * 0.34}
            maxPolarAngle={Math.PI * 0.5}
            target={[0, -0.28, 0]}
          />
        </Canvas>

      </div>
    </div>
  )
}

export default HeroModel
