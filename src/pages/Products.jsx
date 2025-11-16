import { Suspense, useEffect, useMemo } from 'react'
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

const ModelFallback = ({ label }) => (
  <Html center>
    <div className="flex flex-col items-center gap-2 text-white">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/25 border-t-white/80" />
      <p className="text-[0.55rem] uppercase tracking-[0.4em] text-white/65">{label}</p>
    </div>
  </Html>
)

const ProductModel = ({ src }) => {
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
    <group position={[0, -0.55, 0]} scale={[0.88, 0.88, 0.88]}>
      <primitive object={clonedScene} />
    </group>
  )
}

const ProductCanvas = ({ label, modelSrc }) => (
  <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 via-white/0 to-brand-night/30">
    <Canvas
      camera={{ position: [0.25, 1.6, 3.1], fov: 34, near: 0.1, far: 12 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.8, 4.2, 2.5]} intensity={1.1} color="#ffe9ff" castShadow />
      <spotLight position={[-3, 5, 1]} intensity={0.7} angle={0.6} color="#a6f1ff" />
      <Suspense fallback={<ModelFallback label={`зареждане · ${label}`} />}>
        <ProductModel src={modelSrc} />
        <Environment preset="studio" />
        <ContactShadows opacity={0.45} scale={6} blur={2.2} far={4} resolution={512} position={[0, -0.95, 0]} />
      </Suspense>
      <OrbitControls
        enablePan
        enableZoom
        minDistance={1.7}
        maxDistance={3.6}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.62}
        target={[0, -0.55, 0]}
      />
    </Canvas>
  </div>
)

const ProductCard = ({ product, index }) => (
  <motion.article
    variants={fadeInUp}
    transition={createTransition(index * 0.03, 0.65)}
    className="group flex h-full flex-col rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_60px_rgba(8,7,25,0.45)] backdrop-blur-2xl"
  >
    <ProductCanvas label={product.title} modelSrc={product.modelSrc} />
    <div className="mt-6 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.5em] text-white/50">най-харесвани</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{product.title}</h3>
      </div>
      <button
        type="button"
        className="rounded-full border border-white/30 px-4 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-white/80 transition group-hover:border-white/70 group-hover:text-white"
      >
        {product.cta}
      </button>
    </div>
  </motion.article>
)

const ProductsPage = () => {
  return (
    <main className="relative isolate w-full overflow-hidden px-5 py-16 sm:px-10 lg:px-16 3xl:px-24">
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
          <p className="max-w-3xl text-base text-white/70 sm:text-lg lg:text-xl">
            Подбрахме шест емблематични десерта, които винаги търсят нашите гости, партньори и HoReCa клиенти. Всеки
            панел показва 3D визуализация на торта „Гараш“, докато финализираме останалите модели.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          variants={glowIn}
          transition={createTransition(0.08, 0.9)}
        >
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
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
            <p className="mt-3 text-base text-white/70 lg:max-w-2xl">
              Съдържа технически спецификации, налични формати и информация за логистика. Файлът се обновява при всяко
              ново издание.
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-button-contrast shadow-glow-cta transition hover:-translate-y-0.5"
            href="/pastrycatalog.pdf"
            download
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
