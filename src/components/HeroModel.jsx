import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'

const viewportQueries = [
  { name: 'mobile', query: '(max-width: 639px)' },
  { name: 'tablet', query: '(min-width: 640px) and (max-width: 1023px)' },
  { name: 'laptop', query: '(min-width: 1024px) and (max-width: 1439px)' },
  { name: 'desktop', query: '(min-width: 1440px) and (max-width: 1919px)' },
  { name: 'desktopXL', query: '(min-width: 1920px)' },
]

const useViewportCategory = () => {
  const [viewport, setViewport] = useState('desktop')

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const entries = viewportQueries.map((bp) => ({
      name: bp.name,
      mql: window.matchMedia(bp.query),
    }))

    const getActiveViewport = () => entries.find(({ mql }) => mql.matches)?.name ?? 'desktop'
    const updateViewport = () => setViewport(getActiveViewport())

    updateViewport()

    const cleanups = entries.map(({ mql }) => {
      const handler = () => updateViewport()
      if (mql.addEventListener) {
        mql.addEventListener('change', handler)
      } else {
        mql.addListener(handler)
      }
      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', handler)
        } else {
          mql.removeListener(handler)
        }
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  return viewport
}

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

const DessertModel = ({
  src,
  groupScale = 0.92,
  yOffset = -0.9,
  lockOrientation = false,
  baseRotationY = null,
}) => {
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

  useEffect(() => {
    if (groupRef.current && baseRotationY !== null) {
      groupRef.current.rotation.y = baseRotationY
    }
  }, [baseRotationY])

  useFrame((_, delta) => {
    if (groupRef.current && !lockOrientation) {
      groupRef.current.rotation.y += delta * 0.35
    }
  })

  return (
    <group ref={groupRef} position={[0, yOffset, 0]} scale={[groupScale, groupScale, groupScale]}>
      <primitive object={clonedScene} />
    </group>
  )
}

const HeroModel = ({
  label,
  modelSrc,
  slideId,
  className = 'h-[320px] w-full',
  modelSettings = {},
}) => {
  const viewport = useViewportCategory()
  const isMobileViewport = viewport === 'mobile'
  const appliedSettings = useMemo(() => {
    const { responsive = {}, ...baseSettings } = modelSettings ?? {}
    const fallbackOverrides =
      responsive.desktopXL ||
      responsive.desktop ||
      responsive.laptop ||
      responsive.tablet ||
      responsive.mobile ||
      {}

    return {
      modelScale: 0.92,
      modelYOffset: -0.9,
      cameraPosition: [0, 1.35, 1.95],
      orbitTarget: [0, -0.28, 0],
      fov: 32,
      lockOrientation: false,
      orbitAzimuthRange: null,
      modelRotationY: null,
      ...baseSettings,
      ...fallbackOverrides,
      ...(responsive[viewport] ?? {}),
    }
  }, [modelSettings, viewport])

  const {
    modelScale,
    modelYOffset,
    cameraPosition,
    orbitTarget,
    fov,
    lockOrientation,
    orbitAzimuthRange,
    modelRotationY,
  } = appliedSettings
  const resolvedAzimuthRange = orbitAzimuthRange ?? null
  const rotateEnabled = resolvedAzimuthRange ? true : !lockOrientation

  useEffect(() => {
    if (modelSrc) {
      useGLTF.preload(modelSrc)
    }
  }, [modelSrc])

  const canRenderModel = typeof window !== 'undefined' && Boolean(modelSrc)

  if (!canRenderModel) {
    return (
      <div className={className}>
        <div className="relative h-full w-full">
          <ModelUnavailable label={label} />
        </div>
      </div>
    )
  }

  const mobileSizeClass = isMobileViewport ? 'h-[240px]' : ''

  return (
    <div className={`${className} ${mobileSizeClass}`.trim()}>
      <div
        aria-label={`${label} 3D D�D_D'D�D�`}
        className="relative isolate h-full w-full overflow-hidden text-white"
        id={`hero-model-${slideId}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0"></div>

        <Canvas
          key={modelSrc}
          camera={{ position: cameraPosition, fov, near: 0.1, far: 15 }}
          className={`absolute inset-0 transform transition-transform duration-500 ${
            isMobileViewport ? '-translate-y-24' : ''
          }`}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
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
            <DessertModel
              src={modelSrc}
              groupScale={modelScale}
              yOffset={modelYOffset}
              lockOrientation={lockOrientation}
              baseRotationY={modelRotationY}
            />
            <Environment preset="studio" />
            <ContactShadows opacity={0.45} scale={6} blur={2.5} far={4} resolution={512} position={[0, -1.2, 0]} />
          </Suspense>
          <OrbitControls
            autoRotate={!lockOrientation}
            autoRotateSpeed={0.9}
            enablePan={false}
            enableZoom={false}
            enableRotate={rotateEnabled}
            maxDistance={2}
            minDistance={1.4}
            minPolarAngle={Math.PI * 0.34}
            maxPolarAngle={Math.PI * 0.5}
            minAzimuthAngle={resolvedAzimuthRange ? resolvedAzimuthRange[0] : undefined}
            maxAzimuthAngle={resolvedAzimuthRange ? resolvedAzimuthRange[1] : undefined}
            target={orbitTarget}
          />
        </Canvas>

      </div>
    </div>
  )
}

export default HeroModel
