import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroModel from '../components/HeroModel'
import { createStagger, createTransition, fadeInUp, glowIn, scaleIn, tiltIn } from '../utils/motionPresets'

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
      'Сладкарницата организира двудневен празник с тематични десерти, работилници и музика, като 100% от приходите се даряват за кауза в партньорство с местни бизнеси.',
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

const atelierStats = [
  { label: 'Година на старта', value: '2024 · Пловдив' },
  { label: 'Телевизионни участия', value: 'Hell’s Kitchen 6 · Черешката на тортата 2025' },
  { label: 'Награди и общност', value: 'First Lady Awards 2025 · 500+ Facebook последователи' },
]

const cinderellaModelSettings = {
  modelScale: 0.95,
  modelYOffset: -1.6,
  cameraPosition: [0.4, 1.55, 2.4],
  orbitTarget: [0, -1.3, 0],
  fov: 30,
  responsive: {
    mobile: {
      cameraPosition: [0.6, 2.2, 3.1],
      modelScale: 0.8,
      modelYOffset: -2.05,
      orbitTarget: [0, -1.8, 0],
      fov: 36,
    },
    tablet: {
      cameraPosition: [0.4, 1.8, 2.7],
      modelScale: 0.88,
      modelYOffset: -1.8,
      orbitTarget: [0, -1.35, 0],
      fov: 32,
    },
    laptop: {
      cameraPosition: [0.3, 1.6, 2.4],
      modelScale: 0.92,
      modelYOffset: -1.65,
      orbitTarget: [0, -1.28, 0],
      fov: 30,
    },
    desktop: {
      cameraPosition: [0.25, 1.5, 2.2],
      modelScale: 0.96,
      modelYOffset: -1.5,
      orbitTarget: [0, -1.25, 0],
      fov: 28,
    },
    desktopXL: {
      cameraPosition: [0.15, 1.45, 2],
      modelScale: 1.04,
      modelYOffset: -1.42,
      orbitTarget: [0, -1.22, 0],
      fov: 26,
    },
  },
}

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

const heroPathVariants = {
  mobile: [
    { progress: 0, x: -120, y: -220 },
    { progress: 0.25, x: 120, y: -40 },
    { progress: 0.5, x: -100, y: 200 },
    { progress: 0.75, x: 110, y: 420 },
    { progress: 1, x: -80, y: 580 },
  ],
  tablet: [
    { progress: 0, x: -200, y: -260 },
    { progress: 0.25, x: 220, y: -40 },
    { progress: 0.5, x: -180, y: 240 },
    { progress: 0.75, x: 200, y: 460 },
    { progress: 1, x: -160, y: 360 },
  ],
  desktop: [
    { progress: 0, x: -300, y: -320 },
    { progress: 0.23, x: 320, y: -20 },
    { progress: 0.5, x: -280, y: 280 },
    { progress: 0.77, x: 300, y: 520 },
    { progress: 1, x: -260, y: 260 },
  ],
  wide: [
    { progress: 0, x: -380, y: -340 },
    { progress: 0.23, x: 400, y: 0 },
    { progress: 0.5, x: -360, y: 320 },
    { progress: 0.77, x: 380, y: 560 },
    { progress: 1, x: -340, y: 220 },
  ],
}

const heroPathViewBoxes = {
  mobile: '-260 -360 620 1020',
  tablet: '-360 -420 860 1200',
  desktop: '-520 -480 1180 1360',
  wide: '-620 -520 1420 1480',
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

const AboutPage = () => {
  const pageRef = useRef(null)
  const [maxStep, setMaxStep] = useState(0)
  const totalSections = progressRoadmap.length
  const progressSpring = useSpring(0, { stiffness: 120, damping: 24, mass: 0.8 })
  const breakpoint = useViewportBreakpoint()
  const heroPathPoints = heroPathVariants[breakpoint] ?? heroPathVariants.desktop
  const pathViewBox = heroPathViewBoxes[breakpoint] ?? heroPathViewBoxes.desktop
  const sectionSpacing = layoutOffsets[breakpoint] ?? layoutOffsets.desktop

  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  })

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

  const stageProgress = useSpring(pageScroll, { stiffness: 100, damping: 30, mass: 0.65 })

  const computePathCoordinate = (axis, progressValue) => {
    const clamped = Math.min(Math.max(progressValue, 0), 1)
    for (let i = 0; i < heroPathPoints.length - 1; i++) {
      const current = heroPathPoints[i]
      const next = heroPathPoints[i + 1]
      if (clamped >= current.progress && clamped <= next.progress) {
        const span = Math.max(next.progress - current.progress, 0.0001)
        const localT = (clamped - current.progress) / span
        const eased = localT * localT * (3 - 2 * localT)
        return current[axis] + (next[axis] - current[axis]) * eased
      }
    }
    return heroPathPoints[heroPathPoints.length - 1][axis]
  }

  const modelX = useTransform(stageProgress, (value) => computePathCoordinate('x', value))
  const modelY = useTransform(stageProgress, (value) => computePathCoordinate('y', value))
  const modelScale = useTransform(stageProgress, [0, 0.4, 0.8, 1], [0.7, 0.86, 0.94, 0.78])
  const modelGlow = useTransform(stageProgress, [0, 1], [0.2, 0.6])
  const colorShift = useTransform(stageProgress, [0, 0.5, 1], ['hue-rotate(0deg) saturate(1)', 'hue-rotate(-35deg) saturate(1.3)', 'hue-rotate(18deg) saturate(1.1)'])
  const trailOpacity = useTransform(stageProgress, [0, 0.5, 1], [0.08, 0.4, 0.2])
  const stageOpacity = useTransform(stageProgress, [0, 0.05, 0.95, 1], [0.04, 0.3, 0.3, 0.1])


  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{ x: modelX, y: modelY, scale: modelScale, opacity: stageOpacity, filter: colorShift }}
      >
        <motion.span
          className="absolute -top-32 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-cyan/30 blur-3xl mix-blend-screen"
          style={{ opacity: trailOpacity }}
        />
        <motion.span
          className="absolute -bottom-24 right-0 h-60 w-40 rounded-[120px] bg-brand-blush/25 blur-3xl mix-blend-screen"
          style={{ opacity: modelGlow }}
        />
        <HeroModel
          className="h-[400px] w-[360px] sm:h-[460px] sm:w-[420px] lg:h-[520px] lg:w-[480px]"
          label="Cinderella"
          modelSrc="/models/cinderella3D.glb"
          modelSettings={{
            ...cinderellaModelSettings,
            modelScale: 0.38,
            modelYOffset: -1.75,
            lockOrientation: true,
            orbitAzimuthRange: [-0.45, 0.45],
            modelRotationY: 0,
            responsive: {
              ...cinderellaModelSettings.responsive,
              mobile: { ...(cinderellaModelSettings.responsive?.mobile ?? {}), modelScale: 0.32, modelYOffset: -2.3 },
              tablet: { ...(cinderellaModelSettings.responsive?.tablet ?? {}), modelScale: 0.36, modelYOffset: -2.05 },
              laptop: { ...(cinderellaModelSettings.responsive?.laptop ?? {}), modelScale: 0.4, modelYOffset: -1.82 },
              desktop: { ...(cinderellaModelSettings.responsive?.desktop ?? {}), modelScale: 0.44, modelYOffset: -1.65 },
              desktopXL: { ...(cinderellaModelSettings.responsive?.desktopXL ?? {}), modelScale: 0.48, modelYOffset: -1.55 },
            },
          }}
          slideId="about-floating"
        />
      </motion.div>

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
            Историята на Cinderella’s Cakes е разказана от местните медии – от Hell’s Kitchen и „Черешката на тортата“ до
            репортажите на localstore.bg, nova.bg и marica.bg. Всяко участие води Полина към собствения ѝ адрес за
            сладки изкушения в Пловдив.
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
          onViewportEnter={() => handleStepEnter(2)}
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.div className="space-y-10 lg:space-y-12" variants={createStagger(0.12)} {...repeatRevealConfig}>
            {portfolioMoments.map((moment) => (
              <motion.article
                key={moment.title}
                className="rounded-[32px] border border-white/10 bg-brand-night/40 p-8 text-white/85 shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
                variants={fadeInUp}
              >
                <p className="text-[0.7rem] uppercase tracking-[0.45em] text-white/50">{moment.caption}</p>
                <h3 className="mt-3 text-2xl text-white">{moment.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/75">{moment.details}</p>
              </motion.article>
            ))}
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
  </main>
)
}

export default AboutPage
