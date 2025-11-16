import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Html, useGLTF } from '@react-three/drei'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

const GARASH_MODEL_SRC = '/models/garash.glb'

const productStories = {
  garash: {
    hero: {
      eyebrow: 'Легенда от Дунавската Виена',
      title: 'Торта "Гараш"',
      intro:
        'Нашата интерпретация на тортата "Гараш" е разказ в три панела – от първите скици върху нотни тетрадки, през пътя по Дунава, до ритуалите в ателието на Cinderella’s Cakes. Скролът превключва сцените плавно и с всяко движение легендата оживява.',
    },
    panels: [
      {
        id: 'legend',
        order: 'I',
        eyebrow: 'Виена, 1890 г.',
        title: 'Легендата започва',
        layout: 'right',
        paragraph:
          'В края на XIX век младият унгарец Коста Гараш пристига във Виена със скицник и буркан с лешникова паста. Докато акомпанира на пианист от императорски бал, той записва в полетата на партитурата първата рецепта за десерт, съчетаващ шоколад, фина ядкова пралина и въздушни белтъци.',
      },
      {
        id: 'danube',
        order: 'II',
        eyebrow: 'Пътят по Дунава',
        title: 'Предаване на тайната',
        layout: 'left',
        paragraph:
          'По пътя към Русе майсторът оставя рецептата на сестрите Кербабаджиеви. Те я превеждат на езика на дунавските салони – мока сироп, темпериран белгийски шоколад и трийсет и два крехки блата, подредени ръчно, за да се роди първата българска торта "Гараш".',
      },
      {
        id: 'atelier',
        order: 'III',
        eyebrow: 'Cinderella’s Cakes днес',
        title: 'Ритуалът в ателието',
        layout: 'center',
        paragraph:
          'В нашето ателие пазим легендата като ритуал. Всеки пласт зрее отделно, кремът почива 24 часа, а карамелизираните лешници се поставят точно преди сервиране. Така всяко парче носи същата тиха елегантност, омагьосала някога виенските балове.',
      },
    ],
  },
}

const panelAlignments = {
  right: 'items-center justify-end text-right',
  left: 'items-center justify-start text-left',
  center: 'items-center justify-center text-center',
}

const ModelFallback = () => (
  <Html center className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
    Зареждаме легендата...
  </Html>
)

const AnimatedGarash = ({ xMotion }) => {
  const groupRef = useRef(null)
  const { scene } = useGLTF(GARASH_MODEL_SRC)
  const model = useMemo(() => scene.clone(true), [scene])
  const pendingX = useRef(-1.5)

  useMotionValueEvent(xMotion, 'change', (value) => {
    pendingX.current = value
  })

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const current = groupRef.current.position.x
    groupRef.current.position.x = current + (pendingX.current - current) * Math.min(1, delta * 6)
    groupRef.current.rotation.y += delta * 0.22
  })

  return (
    <group ref={groupRef} position={[-1.5, -0.45, 0]} scale={0.95}>
      <primitive object={model} />
    </group>
  )
}

const LegendCanvas = ({ xMotion }) => (
  <Canvas camera={{ position: [0.2, 1.75, 2.85], fov: 31 }} dpr={[1, 2]}>
    <color attach="background" args={['transparent']} />
    <ambientLight intensity={0.85} />
    <directionalLight position={[3, 4, 2]} intensity={1.1} color="#ffd6ff" />
    <directionalLight position={[-2, 3, -1]} intensity={0.9} color="#a5f0ff" />
    <Suspense fallback={<ModelFallback />}>
      <AnimatedGarash xMotion={xMotion} />
      <Environment preset="studio" />
      <ContactShadows opacity={0.45} scale={7} blur={2.5} far={5} resolution={1024} position={[0, -0.95, 0]} />
    </Suspense>
  </Canvas>
)

const LegendPanel = ({ panel, index, total, progress, viewportHeight }) => {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2
  const opacity = useTransform(progress, [start, mid, end], [0.15, 1, 0.15])
  const translateY = useTransform(progress, [start, mid, end], [80, 0, -80])
  const filter = useTransform(progress, [start, mid, end], ['blur(16px)', 'blur(0px)', 'blur(16px)'])
  const alignmentClass = panelAlignments[panel.layout] ?? panelAlignments.center

  return (
    <motion.section
      style={{ minHeight: viewportHeight, opacity, y: translateY, filter }}
      className={`relative flex px-4 py-10 sm:px-10 lg:px-20 ${alignmentClass}`}
    >
      <div className="w-full max-w-2xl rounded-[2.8rem] border border-white/15 bg-brand-night/70 p-8 shadow-[0_30px_60px_rgba(5,5,15,0.6)] backdrop-blur-2xl">
        <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-white/60">
          <span>{panel.eyebrow}</span>
          <span className="text-white/70">{panel.order}</span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-[2.4rem]">{panel.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{panel.paragraph}</p>
      </div>
    </motion.section>
  )
}

const ProductDetailsPage = () => {
  const { productSlug } = useParams()
  const story = productStories[productSlug] ?? productStories.garash
  const containerRef = useRef(null)
  const viewportHeight = 'calc(100vh - var(--topbar-height) - var(--navigation-height))'
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 })
  const canvasOpacity = useTransform(progress, [0, 0.02, 0.95, 1], [0.2, 1, 1, 0.6])
  const modelTrack = useTransform(progress, [0, 0.5, 1], [-1.5, 1.5, -1.5])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const targets = [document.body, document.documentElement]
    targets.forEach((node) => node?.classList.add('hide-scrollbar'))
    return () => targets.forEach((node) => node?.classList.remove('hide-scrollbar'))
  }, [])

  return (
    <main
      ref={containerRef}
      className="relative isolate px-4 pb-20 pt-10 sm:px-8 lg:px-16 3xl:px-28"
      style={{ scrollBehavior: 'smooth' }}
    >
      <motion.div className="pointer-events-none fixed inset-0 -z-10" style={{ opacity: canvasOpacity }}>
        <LegendCanvas xMotion={modelTrack} />
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,173,222,0.18),transparent_65%)] blur-[150px]" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,216,255,0.15),transparent_70%)] blur-[160px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-[200px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-col gap-32">
        <header
          className="mx-auto flex w-full max-w-4xl flex-col justify-end gap-6 text-left"
          style={{ minHeight: viewportHeight }}
        >
          <p className="text-xs uppercase tracking-[0.6em] text-white/60">{story.hero.eyebrow}</p>
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-white sm:text-[3rem] lg:text-[3.8rem]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {story.hero.title}
          </motion.h1>
          <motion.p
            className="text-base leading-relaxed text-white/75 sm:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {story.hero.intro}
          </motion.p>
        </header>

        {story.panels.map((panel, index) => (
          <LegendPanel
            key={panel.id}
            panel={panel}
            index={index}
            total={story.panels.length}
            progress={progress}
            viewportHeight={viewportHeight}
          />
        ))}

        <div className="flex min-h-[200px] items-center justify-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-10 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-white hover:text-white"
          >
            ← Назад към продуктите
          </Link>
        </div>
      </div>
    </main>
  )
}

useGLTF.preload(GARASH_MODEL_SRC)

export default ProductDetailsPage
