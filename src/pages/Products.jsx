import { Suspense, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { createStagger, createTransition, fadeInUp, glowIn } from '../utils/motionPresets'

const GARASH_MODEL_SRC = '/models/garash.glb'

const featuredProducts = Array.from({ length: 6 }, (_, index) => ({
  id: `garash-${index + 1}`,
  title: 'Гараш',
  cta: 'Виж повече',
  modelSrc: GARASH_MODEL_SRC,
}))

const viewportQueries = [
  { name: 'mobile', query: '(max-width: 639px)' },
  { name: 'tablet', query: '(min-width: 640px) and (max-width: 1023px)' },
  { name: 'laptop', query: '(min-width: 1024px) and (max-width: 1439px)' },
  { name: 'desktop', query: '(min-width: 1440px) and (max-width: 1899px)' },
  { name: 'desktopXL', query: '(min-width: 1900px)' },
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

const canvasPresets = {
  mobile: {
    heightClass: 'h-[220px]',
    camera: { position: [0.15, 1.35, 3.8], fov: 35, near: 0.1, far: 12 },
    model: { scale: 0.8, yOffset: -0.38 },
    controls: {
      enablePan: true,
      enableZoom: true,
      minDistance: 1.7,
      maxDistance: 4.1,
      minPolarAngle: Math.PI * 0.2,
      maxPolarAngle: Math.PI * 0.62,
      target: [0, -0.4, 0],
    },
    shadowY: -0.72,
  },
  tablet: {
    heightClass: 'h-[250px]',
    camera: { position: [0.18, 1.45, 3.4], fov: 34, near: 0.1, far: 12 },
    model: { scale: 0.84, yOffset: -0.46 },
    controls: {
      enablePan: true,
      enableZoom: true,
      minDistance: 1.65,
      maxDistance: 3.8,
      minPolarAngle: Math.PI * 0.19,
      maxPolarAngle: Math.PI * 0.6,
      target: [0, -0.48, 0],
    },
    shadowY: -0.78,
  },
  laptop: {
    heightClass: 'h-[270px]',
    camera: { position: [0.22, 1.55, 3.1], fov: 33, near: 0.1, far: 12 },
    model: { scale: 0.88, yOffset: -0.52 },
    controls: {
      enablePan: true,
      enableZoom: true,
      minDistance: 1.55,
      maxDistance: 3.4,
      minPolarAngle: Math.PI * 0.18,
      maxPolarAngle: Math.PI * 0.58,
      target: [0, -0.52, 0],
    },
    shadowY: -0.85,
  },
  desktop: {
    heightClass: 'h-[300px]',
    camera: { position: [0.2, 1.65, 2.8], fov: 32, near: 0.1, far: 12 },
    model: { scale: 0.92, yOffset: -0.58 },
    controls: {
      enablePan: true,
      enableZoom: true,
      minDistance: 1.45,
      maxDistance: 3.2,
      minPolarAngle: Math.PI * 0.17,
      maxPolarAngle: Math.PI * 0.55,
      target: [0, -0.58, 0],
    },
    shadowY: -0.92,
  },
  desktopXL: {
    heightClass: 'h-[340px]',
    camera: { position: [0.15, 1.8, 2.45], fov: 31, near: 0.1, far: 12 },
    model: { scale: 0.98, yOffset: -0.65 },
    controls: {
      enablePan: true,
      enableZoom: true,
      minDistance: 1.3,
      maxDistance: 3,
      minPolarAngle: Math.PI * 0.16,
      maxPolarAngle: Math.PI * 0.52,
      target: [0, -0.64, 0],
    },
    shadowY: -1,
  },
}

const cloneCanvasConfig = (config) => ({
  ...config,
  camera: { ...config.camera },
  model: { ...config.model },
  controls: { ...config.controls, target: [...config.controls.target] },
})

const getCanvasConfig = (viewport) => {
  const preset = canvasPresets[viewport] ?? canvasPresets.desktop
  return cloneCanvasConfig(preset)
}

const ModelFallback = ({ label }) => (
  <Html center>
    <div className="flex flex-col items-center gap-2 text-white">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/25 border-t-white/80" />
      <p className="text-[0.55rem] uppercase tracking-[0.4em] text-white/65">{label}</p>
    </div>
  </Html>
)

const ProductModel = ({ src, yOffset = -0.55, scale = 0.88 }) => {
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
    <group position={[0, yOffset, 0]} scale={[scale, scale, scale]}>
      <primitive object={clonedScene} />
    </group>
  )
}

const ProductCanvas = ({ label, modelSrc, config }) => {
  const { heightClass, camera, model, controls, shadowY } = config ?? canvasPresets.desktop
  const target = controls?.target ?? [0, -0.55, 0]

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 via-white/0 to-brand-night/30 ${heightClass}`}
    >
      <Canvas
        camera={camera}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2.8, 4.2, 2.5]} intensity={1.1} color="#ffe9ff" castShadow />
        <spotLight position={[-3, 5, 1]} intensity={0.7} angle={0.6} color="#a6f1ff" />
        <Suspense fallback={<ModelFallback label={`зареждане · ${label}`} />}>
          <ProductModel src={modelSrc} yOffset={model?.yOffset} scale={model?.scale} />
          <Environment preset="studio" />
          <ContactShadows opacity={0.45} scale={6} blur={2.2} far={4} resolution={512} position={[0, shadowY ?? -0.95, 0]} />
        </Suspense>
        <OrbitControls
          enablePan={controls?.enablePan}
          enableZoom={controls?.enableZoom}
          minDistance={controls?.minDistance}
          maxDistance={controls?.maxDistance}
          minPolarAngle={controls?.minPolarAngle}
          maxPolarAngle={controls?.maxPolarAngle}
          target={target}
          zoomSpeed={0.55}
          rotateSpeed={0.6}
          panSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}

const ProductCard = ({ product, index, canvasConfig }) => (
  <motion.article
    variants={fadeInUp}
    transition={createTransition(index * 0.03, 0.65)}
    className="group flex h-full w-full max-w-[480px] flex-col rounded-[2.25rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_60px_rgba(8,7,25,0.45)] backdrop-blur-2xl sm:p-6 xl:p-7"
  >
    <ProductCanvas label={product.title} modelSrc={product.modelSrc} config={canvasConfig} />
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <p className="text-[0.65rem] uppercase tracking-[0.55em] text-white/50">най-харесвани</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">{product.title}</h3>
      </div>
      <button
        type="button"
        className="w-full rounded-full border border-white/30 px-4 py-2 text-[0.62rem] uppercase tracking-[0.4em] text-white/80 transition group-hover:border-white/70 group-hover:text-white sm:w-auto"
      >
        {product.cta}
      </button>
    </div>
  </motion.article>
)

const ProductsPage = () => {
  const viewport = useViewportCategory()
  const canvasConfig = useMemo(() => getCanvasConfig(viewport), [viewport])

  return (
    <main className="relative isolate mx-auto w-full max-w-[1900px] overflow-hidden px-4 py-14 sm:px-8 sm:py-16 lg:px-16 2xl:px-20 3xl:px-28 4xl:px-32 4xl:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,180,221,0.15),transparent_65%)] blur-3xl lg:h-[26rem] lg:w-[26rem]" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(122,209,255,0.12),transparent_70%)] blur-3xl lg:h-[24rem] lg:w-[24rem]" />
        <div className="absolute inset-x-0 bottom-12 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-[180px]" />
      </div>

      <motion.section
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-12"
        variants={createStagger(0.12)}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeInUp}
          transition={createTransition(0.02, 0.65)}
          className="flex flex-col gap-4 text-center lg:text-left"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-white/60">най-харесвани</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Продукти</h1>
          <p className="max-w-3xl text-balance text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
            Подбрахме шест емблематични десерта, които винаги търсят нашите гости, партньори и HoReCa клиенти. Всеки
            панел показва 3D визуализация на торта „Гараш“, докато финализираме останалите модели.
          </p>
        </motion.div>

        <motion.div
          className="grid w-full justify-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-10"
          variants={glowIn}
          transition={createTransition(0.08, 0.9)}
        >
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} canvasConfig={canvasConfig} />
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="relative z-10 mx-auto mt-12 w-full max-w-[1100px]"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={createTransition(0.1, 0.7)}
      >
        <div className="flex flex-col gap-6 rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/10 via-brand-dusk/40 to-brand-night/60 p-8 text-center shadow-[0_35px_65px_rgba(5,5,15,0.55)] backdrop-blur-3xl lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">каталог 2025</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Изтегли каталога с цялото портфолио</h2>
            <p className="mt-3 text-balance text-base leading-relaxed text-white/70 lg:max-w-2xl">
              Съдържа технически спецификации, налични формати и информация за логистика. Файлът се обновява при всяко
              ново издание.
            </p>
          </div>
          <a
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-button-contrast shadow-glow-cta transition hover:-translate-y-0.5 sm:w-auto"
            href="/pastrycatalog.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Изтегли каталог
          </a>
        </div>
      </motion.section>
    </main>
  )
}

useGLTF.preload(GARASH_MODEL_SRC)

export default ProductsPage
