import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Html } from '@react-three/drei'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { createStagger, createTransition, fadeInUp, glowIn, scaleIn, tiltIn } from '../utils/motionPresets'
import { useOptimizedGLTF } from '../hooks/useOptimizedGLTF'

const MotionLink = motion.create(Link)

const repeatRevealConfig = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.3 },
}

const storyHighlights = [
  {
    period: '2024 · Hell’s Kitchen България',
    title: 'Телевизионният пробив на Полина',
    description:
      'Полина Петрова Алатинова от Пловдив впечатлява в сезон 6 на Hell’s Kitchen, където е наречена „майсторка на сладкишите и печивата“, въпреки че се определя като хоби готвач без формално образование.',
  },
  {
    period: 'Средата на 2024 · Пловдив, кв. Остромила',
    title: 'Раждането на Cinderella’s Cakes',
    description:
      'След шоуто тя изпълнява обещанието си и отваря първата бутикова сладкарница. Клиентите споделят, че изборът от вкусове е толкова голям, че „решението кое парче да опиташ е истинско предизвикателство“.',
  },
  {
    period: '2025 · Медии и отличия',
    title: 'Черешката на тортата и First Lady Awards',
    description:
      'Полина е гост-готвач в „Черешката на тортата“ и става носител на наградата „Първа дама“ 2025 в категория „Храни – сладкарство“, затвърждавайки своето име извън Пловдив.',
  },
]

const portfolioMoments = [
  {
    title: 'Бутичната витрина в Остромила',
    caption: 'Пловдив · средата на 2024',
    details:
      'Първият обект на Cinderella’s Cakes бързо печели репутация със свой богат асортимент и лично отношение – Полина посреща гостите, препоръчва вкусове и доказва, че домашните рецепти могат да изградят общност.',
  },
  {
    title: 'Halloween Street Food',
    caption: 'Благотворително събитие · октомври 2025',
    details:
      'Сладкарницата организира двудневен празник с тематични десерти, творчески работилници и музика, а 100% от приходите се даряват в партньорство с местни бизнеси. Благодарение на посетителите бяха събрани 5800 лв за фондация "Слънчеви деца".',
  },
  {
    title: 'Star Model 2025',
    caption: 'Vartane Models · домакин Cinderella’s Cakes',
    details:
      'Обектът на Полина е избран за церемонията на модния клуб Vartane Models. Гостите приемат наградите си сред витрини с десерти, което показва доверието към бранда.',
  },
]

const atelierPrinciples = [
  {
    label: 'Домашни рецепти и качество',
    description:
      'Cinderella’s Cakes залага на изцяло домашни рецепти и висококачествени съставки, както личи от отзивите на клиентите в Пловдив.',
  },
  {
    label: 'Учене чрез практика',
    description:
      'Полина е самоук майстор-сладкар, който усъвършенства уменията си чрез работа, експерименти и интензивния опит в Hell’s Kitchen.',
  },
  {
    label: 'Общност и кауза',
    description:
      'Сладкарницата е домакин на благотворителни събития, модни вечери и локални фестивали, за да подкрепя хората и бизнеса в града.',
  },
]

const portfolioLegendPanels = portfolioMoments.map((moment, index) => ({
  id: `moment-${index}`,
  order: `0${index + 1}`,
  eyebrow: moment.caption,
  title: moment.title,
  paragraph: moment.details,
}))

const atelierStats = [
  { label: 'Година на старта', value: '2024 · Пловдив' },
  { label: 'Телевизионни участия', value: 'Hell’s Kitchen 6 · Черешката на тортата 2025' },
  { label: 'Награди и общност', value: 'First Lady Awards 2025 · 500+ Facebook последователи' },
]

const useViewportBreakpoint = () => {
  const [bp, setBp] = useState('desktop')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const queries = [
      { name: 'mobile', query: '(max-width: 767px)' },
      { name: 'tablet', query: '(min-width: 768px) and (max-width: 1279px)' },
      { name: 'desktop', query: '(min-width: 1280px) and (max-width: 1599px)' },
      { name: 'wide', query: '(min-width: 1600px)' },
    ]

    const registry = queries.map((entry) => ({ ...entry, mql: window.matchMedia(entry.query) }))

    const evaluate = () => {
      const active = registry.find(({ mql }) => mql.matches)
      setBp(active?.name ?? 'desktop')
    }

    evaluate()

    registry.forEach(({ mql }) => {
      if (mql.addEventListener) {
        mql.addEventListener('change', evaluate)
      } else {
        mql.addListener(evaluate)
      }
    })

    return () => {
      registry.forEach(({ mql }) => {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', evaluate)
        } else {
          mql.removeListener(evaluate)
        }
      })
    }
  }, [])

  return bp
}

const layoutOffsets = {
  mobile: { introRight: 0, timelineRight: 0, portfolioRight: 0, principlesLeft: 0, ctaLeft: 0, spacer: false },
  tablet: { introRight: 0, timelineRight: 0, portfolioRight: 0, principlesLeft: 0, ctaLeft: 0, spacer: false },
  desktop: { introRight: 0, timelineRight: 0, portfolioRight: 0, principlesLeft: 0, ctaLeft: 0, spacer: false },
  wide: { introRight: 0, timelineRight: 0, portfolioRight: 0, principlesLeft: 0, ctaLeft: 0, spacer: false },
}

const progressRoadmap = [
  { id: 'intro', label: 'Старт' },
  { id: 'timeline', label: 'Време' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'principles', label: 'Ценности' },
  { id: 'cta', label: 'Финал' },
]

const PORTFOLIO_MODEL_SRC = '/models/cinderella3D.glb'

const PortfolioModelFallback = () => (
  <Html center className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
    Зареждаме сцената...
  </Html>
)

const AnimatedCinderella = ({ xMotion }) => {
  const groupRef = useRef(null)
  const { scene } = useOptimizedGLTF(PORTFOLIO_MODEL_SRC)
  const model = useMemo(() => scene.clone(true), [scene])
  const pendingX = useRef(-1.45)

  useMotionValueEvent(xMotion, 'change', (value) => {
    pendingX.current = value
  })

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    const current = groupRef.current.position.x
    groupRef.current.position.x = current + (pendingX.current - current) * Math.min(1, delta * 6)
    const desiredRotation = -0.25 + Math.cos(clock.getElapsedTime() * 0.18) * 0.05
    const currentRotation = groupRef.current.rotation.y
    groupRef.current.rotation.y = currentRotation + (desiredRotation - currentRotation) * Math.min(1, delta * 4.5)
    const bobOffset = Math.sin(clock.getElapsedTime() * 0.6) * 0.05
    groupRef.current.position.y = -0.95 + bobOffset
  })

  return (
    <group ref={groupRef} position={[-1.45, -0.95, 0]} scale={1.05}>
      <primitive object={model} />
    </group>
  )
}

const PortfolioCanvas = ({ xMotion }) => (
  <Canvas
    camera={{ position: [0.25, 1.8, 2.85], fov: 31 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    shadows
  >
    <ambientLight intensity={0.85} />
    <directionalLight position={[3, 4, 2]} intensity={1.05} color="#ffd6ff" />
    <directionalLight position={[-2, 3, -1]} intensity={0.9} color="#a5f0ff" />
    <Suspense fallback={<PortfolioModelFallback />}>
      <AnimatedCinderella xMotion={xMotion} />
      <Environment preset="studio" />
      <ContactShadows opacity={0.45} scale={7} blur={2.5} far={5} resolution={1024} position={[0, -0.95, 0]} />
    </Suspense>
  </Canvas>
)

const PortfolioPanel = ({ panel, index, total, progress }) => {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2
  const opacity = useTransform(progress, [start, mid, end], [0.65, 1, 0.75])
  const translateY = useTransform(progress, [start, mid, end], [35, 0, -35])

  return (
    <motion.article style={{ opacity, y: translateY }} className="story-panel p-6 text-white/85 sm:p-7">
      <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.45em] text-white/60">
        <span>{panel.eyebrow}</span>
        <span>{panel.order}</span>
      </div>
      <h3 className="mt-3 text-2xl text-white">{panel.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{panel.paragraph}</p>
    </motion.article>
  )
}

const PortfolioLegend = ({ panels }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 })
  const canvasOpacity = useTransform(progress, [0, 0.15, 0.9, 1], [0.35, 0.92, 0.92, 0.62])
  const modelTrack = useTransform(progress, [0, 0.5, 1], [-1.45, -0.95, -1.3])
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.35, 0.6, 0.4])

  return (
    <div
      ref={sectionRef}
      data-surface="dark"
      className="relative isolate overflow-hidden rounded-[44px] border border-white/10 bg-brand-night/40 px-6 py-10 text-white shadow-[0_35px_90px_rgba(5,0,25,0.55)] sm:px-10 lg:px-14"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: canvasOpacity }}>
        <div className="absolute inset-0">
          <PortfolioCanvas xMotion={modelTrack} />
        </div>
        <div aria-hidden="true" className="scene-veil absolute inset-0 rounded-[44px]" />
        <motion.div
          aria-hidden="true"
          className="absolute -right-12 top-12 h-48 w-48 rounded-full bg-brand-cyan/30 blur-[140px]"
          style={{ opacity: glowOpacity }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -left-16 bottom-0 h-60 w-60 rounded-full bg-brand-blush/30 blur-[160px]"
          style={{ opacity: glowOpacity }}
        />
      </motion.div>

      <div className="relative z-10">
        <div className="flex flex-col gap-6">
          {panels.map((panel, index) => (
            <PortfolioPanel key={panel.id} panel={panel} index={index} total={panels.length} progress={progress} />
          ))}
        </div>
      </div>
    </div>
  )
}

useOptimizedGLTF.preload(PORTFOLIO_MODEL_SRC)

const AboutPage = () => {
  const [showIntroLoader, setShowIntroLoader] = useState(true)
  const [maxStep, setMaxStep] = useState(0)
  const totalSections = progressRoadmap.length
  const progressSpring = useSpring(0, { stiffness: 120, damping: 24, mass: 0.8 })
  const breakpoint = useViewportBreakpoint()
  const sectionSpacing = layoutOffsets[breakpoint] ?? layoutOffsets.desktop

  useEffect(() => {
    progressSpring.set(maxStep / totalSections)
  }, [maxStep, totalSections, progressSpring])

  const introSpacing = sectionSpacing.introRight
    ? { paddingRight: `${sectionSpacing.introRight}px` }
    : undefined
  const timelineSpacing = sectionSpacing.timelineRight
    ? { paddingRight: `${sectionSpacing.timelineRight}px` }
    : undefined
  const portfolioSpacing = sectionSpacing.portfolioRight
    ? { paddingRight: `${sectionSpacing.portfolioRight}px` }
    : undefined
  const principlesSpacing = sectionSpacing.principlesLeft
    ? { marginLeft: `${sectionSpacing.principlesLeft}px` }
    : undefined
  const ctaSpacing = sectionSpacing.ctaLeft ? { marginLeft: `${sectionSpacing.ctaLeft}px` } : undefined

  const handleStepEnter = (index) => {
    setMaxStep((prev) => Math.max(prev, index + 1))
  }

  const handleLoaderComplete = useCallback(() => {
    setShowIntroLoader(false)
  }, [])


  return (
    <>
      {showIntroLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
      <motion.main
        aria-hidden={showIntroLoader}
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntroLoader ? 0 : 1 }}
        transition={createTransition(0, 0.6, 'easeOut')}
      >
      <div className="layout-shell relative z-40 space-y-16 pb-20 pt-28 2xl:space-y-20 3xl:space-y-28 3xl:pb-28 4xl:space-y-32 4xl:pb-36 4xl:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-2.5rem] top-24 hidden h-[calc(100%-6rem)] w-2 md:block lg:left-[-3rem]"
        >
          <div className="relative h-full w-px overflow-visible rounded-full bg-white/10">
            <motion.span
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-brand-blush via-brand-cyan to-brand-accent"
              style={{ scaleY: progressSpring, transformOrigin: 'top' }}
            />
          <div className="absolute -left-6 top-0 flex h-full flex-col justify-between text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-white/45">
            {progressRoadmap.map((step, index) => (
              <motion.div key={step.id} className="flex items-center gap-2">
                <motion.span
                  className="block h-1.5 w-1.5 rounded-full bg-white"
                  animate={{
                    opacity: index + 1 <= maxStep ? 1 : 0.35,
                    scale: index + 1 <= maxStep ? 1.25 : 0.9,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                />
                <motion.span
                  animate={{ opacity: index + 1 <= maxStep ? 1 : 0.4 }}
                  className="text-white"
                  transition={{ duration: 0.4 }}
                >
                  {step.label}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

        <motion.section
          className="grid gap-10 2xl:min-h-screen 2xl:content-center 2xl:grid-cols-[1.05fr_0.95fr]"
          style={introSpacing}
          initial="hidden"
          animate="visible"
          variants={createStagger(0.12)}
          onViewportEnter={() => handleStepEnter(0)}
          viewport={{ once: true, amount: 0.45 }}
        >
        <motion.div
          className="rounded-[40px] border border-white/15 bg-white/5 px-8 py-10 text-white/90 shadow-[0_35px_80px_rgba(6,10,34,0.45)] backdrop-blur-3xl 2xl:px-12 2xl:py-14"
          variants={glowIn}
        >
          <motion.p className="text-xs uppercase tracking-[0.65em] text-brand-cyan/80" variants={fadeInUp}>
            Полина Алатинова
          </motion.p>
          <motion.h1 className="mt-4 font-luxury text-4xl text-white 2xl:text-5xl 4xl:text-6xl" variants={fadeInUp}>
            От Hell’s Kitchen до собствена сладкарница в Пловдив.
          </motion.h1>
          <motion.p className="mt-6 text-base leading-relaxed text-white/80 2xl:text-lg" variants={fadeInUp}>
            Полина Петрова Алатинова е самоук майстор-сладкар, която спечели вниманието на цяла България в сезон 6 на
            Hell’s Kitchen. През 2024 г. тя превръща опита от шоуто в реалност и създава Cinderella’s Cakes – място за
            домашни рецепти, усмивки и персонално отношение.
          </motion.p>

          <motion.ul className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/60" variants={createStagger(0.08)}>
            <motion.li className="rounded-full border border-white/15 px-4 py-2" variants={fadeInUp}>
              Hell’s Kitchen 6 · 2024
            </motion.li>
            <motion.li className="rounded-full border border-white/15 px-4 py-2" variants={fadeInUp}>
              Черешката на тортата 2025
            </motion.li>
            <motion.li className="rounded-full border border-white/15 px-4 py-2" variants={fadeInUp}>
              First Lady Awards 2025
            </motion.li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="rounded-[40px] border border-white/10 bg-gradient-to-b from-brand-dusk/70 via-brand-dusk/40 to-transparent px-8 py-10 shadow-[0_35px_80px_rgba(3,5,15,0.55)]"
          variants={fadeInUp}
          transition={createTransition(0.1, 0.9)}
        >
          <p className="text-xs uppercase tracking-[0.55em] text-white/60">Cinderella’s Cakes</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Домашни рецепти, усмивки и лично отношение</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80 2xl:text-base">
            Първата бутикова сладкарница на Полина отваря в кв. Остромила през 2024 г. и бързо печели репутация на място
            с богат асортимент и превъзходен вкус. Клиентите споделят, че „решението кое парче да опиташ е истинско
            предизвикателство“, а самата Поли лично препоръчва любимите си десерти.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {atelierStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/15 p-4">
                <p className="text-xl font-semibold leading-snug text-white break-words sm:text-2xl lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-white/60 sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="space-y-8 snap-start"
        style={timelineSpacing}
          variants={createStagger(0.08)}
          {...repeatRevealConfig}
          onViewportEnter={() => handleStepEnter(1)}
        >
        <motion.div className="max-w-3xl" variants={fadeInUp}>
          <p className="text-xs uppercase tracking-[0.55em] text-white/60">Линия на времето</p>
          <h2 className="mt-3 font-luxury text-xl text-white leading-snug sm:text-2xl lg:text-3xl 2xl:text-4xl">
            От телевизионния старт до собствен бранд
          </h2>
          <p className="mt-4 text-white/75">
            Популярността на Cinderella’s Cakes расте естествено – всяко телевизионно участие, репортаж или местно
            събитие добавя нови приятели на бранда и води още гости към бутика в Пловдив.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {storyHighlights.map((story) => (
            <motion.article
              key={story.title}
              className="rounded-[30px] border border-white/10 bg-white/5 p-6 text-white/85 backdrop-blur-2xl"
              variants={tiltIn}
            >
              <p className="text-[0.65rem] uppercase tracking-[0.5em] text-brand-cyan/70">{story.period}</p>
              <h3 className="mt-4 text-xl text-white">{story.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{story.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="relative snap-start py-16"
        style={portfolioSpacing}
        variants={createStagger(0.08)}
        {...repeatRevealConfig}
        onViewportEnter={() => handleStepEnter(2)}
        viewport={{ once: true, amount: 0.45 }}
      >
        <motion.div variants={fadeInUp}>
          <PortfolioLegend panels={portfolioLegendPanels} />
        </motion.div>
      </motion.section>

      <motion.section
        className="space-y-8 snap-start"
        style={principlesSpacing}
          variants={createStagger(0.08)}
          {...repeatRevealConfig}
          onViewportEnter={() => handleStepEnter(3)}
        >
        <motion.div className="max-w-2xl" variants={fadeInUp}>
          <p className="text-xs uppercase tracking-[0.55em] text-white/60">Ателие</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Философията на Полина и екипа ѝ</h2>
          <p className="mt-4 text-white/70">
            Полина вярва, че талантът се развива с постоянство, обич към занаята и доверие в хората около теб. Така
            Cinderella’s Cakes комбинира домашни рецепти, нови експерименти и общностни инициативи в Пловдив.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {atelierPrinciples.map((principle) => (
            <motion.article
              key={principle.label}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur-3xl"
              variants={tiltIn}
            >
              <h3 className="text-xl text-white">{principle.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{principle.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="rounded-[48px] border border-white/10 bg-gradient-to-r from-brand-dusk/80 via-brand-night/80 to-brand-dusk/70 px-10 py-12 text-center shadow-[0_40px_90px_rgba(5,0,25,0.55)] backdrop-blur-3xl"
        style={ctaSpacing}
          variants={scaleIn}
          {...repeatRevealConfig}
          onViewportEnter={() => handleStepEnter(4)}
        >
        <motion.p className="text-xs uppercase tracking-[0.65em] text-white/55" variants={fadeInUp}>
          Следваща глава
        </motion.p>
        <motion.h2 className="mt-4 font-luxury text-4xl text-white 2xl:text-5xl" variants={fadeInUp}>
          Разкажете ни за вашия повод – Полина и екипът са на един разговор разстояние.
        </motion.h2>
        <motion.p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/75" variants={fadeInUp}>
          Cinderella’s Cakes приема поръчки на +359 88 549 3040, а Полина лично отговаря в Instagram
          (@cinderellas_cakes и @polina_alatinova). Следващата глава на тази приказка може да бъде вашето тържество в
          Пловдив или на път.
        </motion.p>
      <MotionLink
        className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-10 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-button-contrast shadow-glow-cta transition hover:-translate-y-1"
        to="/#contact"
        variants={fadeInUp}
        whileTap={{ scale: 0.96 }}
      >
        Свържете се с нас
      </MotionLink>
      </motion.section>
      {sectionSpacing.spacer && <div className="hidden lg:block lg:h-[30vh]"></div>}
    </div>
      </motion.main>
    </>
  )
}

export default AboutPage
