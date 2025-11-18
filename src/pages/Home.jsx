import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroModel from '../components/HeroModel'
import LoadingScreen from '../components/LoadingScreen'
import {
  blurIn,
  createStagger,
  createTransition,
  fadeIn,
  fadeInUp,
  glowIn,
  heroRevealConfig,
  popIn,
  revealConfig,
  scaleIn,
  slideIn,
  tiltIn,
} from '../utils/motionPresets'

const MotionLink = motion.create(Link)
const panelHoverClasses =
  'transform-gpu transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_25px_45px_rgba(15,23,42,0.45)]'
const heroTitleVariants = {
  initial: { opacity: 0, filter: 'blur(8px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(6px)' },
}
const heroTitleTransition = createTransition(0.02, 0.4, 'easeInOut')

const heroDesserts = [
  {
    id: 'garash',
    eyebrow: 'Гланцирана класика',
    label: 'Гараш',
    description:
      'Класически орехов блат с тъмен ганаш и полирано огледално покритие - любимата ни торта за ценители.',
    image: '/images/cakes/garash/20250128_150003.jpg',
    cta: 'Поръчай Гараш',
    href: '/#contact',
    model: '/models/garash.glb',
    modelSettings: {
      cameraPosition: [2, 2.15, 0.8],
      modelScale: 0.45,
      modelYOffset: -2.5,
      orbitTarget: [0, -2.5, 0],
      canvasYOffset: 24,
      modelOrientationDeg: 89.7,
      swapBacktrackDeg: 0,
      responsive: {
        mobile: {
          cameraPosition: [3.55, 3.65, 2.35],
          modelScale: 0.44,
          modelYOffset: -4.2,
          orbitTarget: [0, -4.1, 0],
          fov: 36,
          canvasYOffset: -48,
        },
        tablet: {
          cameraPosition: [2.3, 2.4, 1.05],
          modelScale: 0.4,
          modelYOffset: -2.62,
          orbitTarget: [0, -2.58, 0],
          fov: 34,
          canvasYOffset: -12,
        },
        laptop: {
          cameraPosition: [2.1, 2.25, 0.92],
          modelScale: 0.43,
          modelYOffset: -2.55,
          orbitTarget: [0, -2.5, 0],
          fov: 32,
          canvasYOffset: 6,
        },
        desktop: {
          cameraPosition: [1.45, 2.25, 0.95],
          modelScale: 0.30,
          modelYOffset: -2.45,
          orbitTarget: [0, -2.45, 0],
          fov: 29,
          canvasYOffset: 20,
        },
        desktopXL: {
          cameraPosition: [1.3, 2.15, 0.82],
          modelScale: 0.42,
          modelYOffset: -2.38,
          orbitTarget: [0, -2.38, 0],
          fov: 27,
          canvasYOffset: 32,
        },
      },
    },
  },
  {
    id: 'no-sugar-choco',
    eyebrow: 'Без захар · Без брашно',
    label: 'Шоколадова без захар и брашно',
    description:
      'Интензивен шоколадов мус без рафинирана захар и без брашно - чист вкус за хората на специален режим.',
    image: '/images/cakes/chococake/20250128_145732.jpg',
    cta: 'Попитай за наличности',
    href: '/#contact',
    model: '/models/chococake.glb',
    modelSettings: {
      cameraPosition: [1.65, 2.3, 0.78],
      modelScale: 0.46,
      modelYOffset: -2.45,
      orbitTarget: [0, -2.45, 0],
      canvasYOffset: 22,
      modelOrientationDeg: 134.81,
      responsive: {
        mobile: {
          cameraPosition: [3.3, 3.5, 2.15],
          modelScale: 0.45,
          modelYOffset: -4.05,
          orbitTarget: [0, -3.95, 0],
          fov: 36,
          canvasYOffset: -52,
        },
        tablet: {
          cameraPosition: [2.35, 2.4, 1.02],
          modelScale: 0.41,
          modelYOffset: -2.64,
          orbitTarget: [0, -2.6, 0],
          fov: 34,
          canvasYOffset: -16,
        },
        laptop: {
          cameraPosition: [2.05, 2.2, 0.9],
          modelScale: 0.43,
          modelYOffset: -2.52,
          orbitTarget: [0, -2.48, 0],
          fov: 32,
          canvasYOffset: 6,
        },
        desktop: {
          cameraPosition: [1.5, 2.25, 0.82],
          modelScale: 0.42,
          modelYOffset: -2.45,
          orbitTarget: [0, -2.42, 0],
          fov: 30,
          canvasYOffset: 18,
        },
        desktopXL: {
          cameraPosition: [1.35, 2.12, 0.72],
          modelScale: 0.44,
          modelYOffset: -2.38,
          orbitTarget: [0, -2.36, 0],
          fov: 28,
          canvasYOffset: 30,
        },
      },
    },
  },
]

const principles = [
  {
    title: 'Качество',
    description:
      'Подбираме кратък списък съставки и работим с партньори, които гарантират повторяем резултат. Всяка партида е като предходната.',
  },
  {
    title: 'Лукс в детайла',
    description: 'Фини линии, чисти форми, балансирани вкусове. Десертът изглежда като подарък, преди да го опиташ.',
  },
  {
    title: 'Отношение',
    description:
      'Слушаме повода и човека. Предлагаме без захар, без брашно и с протеин - без компромис с вкуса.',
  },
  {
    title: 'Отговорен избор',
    description: 'Даваме ясни инструкции за съхранение и транспорт. Само обещания, които изпълняваме.',
  },
]

const storyTeaser = {
  title: 'Историята на Полина и Cinderella’s Cakes',
  text: 'Полина Петрова Алатинова блесна като „майсторка на сладкишите“ в Hell’s Kitchen България 2024 и оттам смело доведе мечтата си до собствена сладкарница. Днес Cinderella’s Cakes в Пловдив съчетава домашни рецепти, втори обект в центъра и признание от First Lady Awards 2025 – а общността расте с всяка споделена торта.',
  cta: 'Прочети цялата история',
}

const founderHighlights = [
  {
    title: "Hell's Kitchen България 2024",
    description: 'Кулинарното шоу я представя на цялата страна и дори без формално образование получава похвали от шеф Виктор Ангелов.',
  },
  {
    title: 'Сладкарницата в Остромила',
    description: 'През лятото на 2024 г. отваря първата бутикова витрина, където Поли лично посреща гостите и препоръчва специалитети.',
  },
  {
    title: 'Cinderella’s Cakes 2 · ул. Белград 19',
    description: 'Вторият обект от юли 2025 г. носи „оазис на сладките изкушения“ в центъра на Пловдив, за да е по-близо до феновете.',
  },
  {
    title: 'Медийни участия 2025',
    description: 'Черешката на тортата, репортажи и интервюта поддържат историята ѝ пред широка аудитория и отварят нови възможности.',
  },
  {
    title: 'Първа дама · категория „Храни – сладкарство“',
    description: 'First Lady Awards 2025, както и благотворителни събития като Halloween Street Food, поставят акцент върху каузите и общността.',
  },
]

const businessServices = [
  {
    id: 'retail',
    title: 'Ритейл',
    text: 'Постоянно качество и чиста визия за премиум витрини. Асортимент от торти, монодесерти и сезонни серии.',
    details: ['Опаковка и етикетиране по изискване', 'Доставки по график в Пловдив и региона'],
  },
  {
    id: 'hotels',
    title: 'Хотели',
    text: 'Закуски, десерти и торти за събития. Визуален стандарт за петзвезден опит.',
    details: ['Гъвкави менюта с опции без захар/брашно', 'Предварително планирани срокове и сервиз'],
  },
  {
    id: 'catering',
    title: 'Кетъринг',
    text: 'Скалируеми решения за корпоративни и частни събития.',
    details: ['Мини размери и персонализирани плата', 'Логистика в Пловдив и региона'],
  },
]

const mapLocations = [
  {
    id: 'ostromila',
    name: 'Остромила',
    street: 'ул. Остромила 6',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44.66049509984441!2d24.723269230712667!3d42.11549187073368!2m3!1f41.3262054833626!2f46.62220418710541!3f0!3m2!1i1024!2i768!4f54.002700629379184!3m3!1m2!1s0x14acd10017adc899%3A0x89418724d4acc8f4!2sCinderella%27s%20cakes%20by%20Polina%20Alatinova!5e1!3m2!1sbg!2sbg!4v1763227593142!5m2!1sbg!2sbg',
  },
  {
    id: 'belgrad',
    name: 'Център · Белград 19',
    street: 'ул. Белград 19 (до Гранд Хотел Пловдив)',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93.1754255197011!2d24.747196832376392!3d42.15703068009086!2m3!1f250.68440604797843!2f54.21000084914744!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x14acd1c04d8bb463%3A0x46c404a293c347c7!2sCinderella%27s%20cakes%20by%20Polina%20Alatinova!5e1!3m2!1sbg!2sbg!4v1763227386930!5m2!1sbg!2sbg',
  },
]

const HomePage = () => {
  const [activeDessertIndex, setActiveDessertIndex] = useState(0)
  const [showIntroLoader, setShowIntroLoader] = useState(true)
  const [activeMap, setActiveMap] = useState(null)
  const closeButtonRef = useRef(null)
  const heroRotationRef = useRef(0)
  const heroDessertCount = heroDesserts.length

  const handleHalfRotation = useCallback(() => {
    if (heroDessertCount < 2) {
      return
    }
    setActiveDessertIndex((prev) => (prev + 1) % heroDessertCount)
  }, [heroDessertCount])

  const handleRotationChange = useCallback((angle) => {
    heroRotationRef.current = angle
  }, [])

  const handleLoaderComplete = useCallback(() => {
    setShowIntroLoader(false)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [])

  const currentDessert = heroDesserts[activeDessertIndex] ?? heroDesserts[0]
  const activeLocation = mapLocations.find((location) => location.id === activeMap)

  const logRotationSnapshot = useCallback(() => {
    const rawAngle = heroRotationRef.current
    const normalizedRadians = ((rawAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const normalizedDegrees = Number(((normalizedRadians * 180) / Math.PI).toFixed(2))
    const rawDegrees = Number(((rawAngle * 180) / Math.PI).toFixed(2))
    console.info('[Hero rotation]', {
      dessertId: currentDessert.id,
      normalizedRadians,
      normalizedDegrees,
      rawDegrees,
      hint: 'Use -normalizedDegrees as modelOrientationDeg when this view faces forward.',
    })
  }, [currentDessert.id])

  useEffect(() => {
    if (typeof window === 'undefined' || !import.meta?.env?.DEV) {
      return undefined
    }

    const handleDebugHotkey = (event) => {
      if (event.shiftKey && (event.key === 'O' || event.key === 'o')) {
        event.preventDefault()
        logRotationSnapshot()
      }
    }

    window.addEventListener('keydown', handleDebugHotkey)
    return () => window.removeEventListener('keydown', handleDebugHotkey)
  }, [logRotationSnapshot])

  useEffect(() => {
    if (!activeMap || typeof window === 'undefined') {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveMap(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const focusTimeout = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 10)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(focusTimeout)
    }
  }, [activeMap])

  return (
    <>
      {showIntroLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
      <motion.main
        aria-hidden={showIntroLoader}
        className="relative space-y-20 pb-20 pt-0 2xl:space-y-24 3xl:space-y-32 3xl:pb-28 4xl:pb-36"
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntroLoader ? 0 : 1 }}
        transition={createTransition(0, 0.6, 'easeOut')}
      >
        <section
          className="relative min-h-[80vh] w-full overflow-hidden"
          data-surface="dark"
          id="hero"
          style={{
            minHeight: 'max(80vh, calc(100vh - (var(--topbar-height, 0px) + var(--navigation-height, 0px))))',
          }}
        >
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentDessert.id}-background`}
              animate={{ opacity: 1 }}
              className="absolute inset-0 overflow-hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={createTransition(0, 0.5)}
            >
              <img
                alt=""
                className="h-full w-full object-cover"
                decoding="async"
                fetchPriority="high"
                loading="eager"
                src={currentDessert.image}
              />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(120deg, var(--hero-gradient-start), var(--hero-gradient-end))',
              mixBlendMode: 'soft-light',
            }}
          ></div>
            </motion.div>
          </AnimatePresence>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: 'var(--hero-overlay)' }}
          ></div>
          {currentDessert?.model && (
            <div className="absolute inset-0">
              <div className="relative h-full w-full">
                {/* Bounded frame keeps the 3D model from overwhelming small viewports */}
                <div className="pointer-events-auto absolute left-1/2 bottom-6 z-30 h-[clamp(340px,90vw,520px)] w-[clamp(340px,90vw,520px)] -translate-x-1/2 opacity-95 sm:bottom-12 sm:h-[clamp(380px,75vw,600px)] sm:w-[clamp(380px,75vw,600px)] md:bottom-auto md:left-auto md:right-[4%] md:top-1/2 md:h-[540px] md:w-[540px] md:-translate-y-1/2 md:translate-x-0 lg:right-[3%] lg:h-[660px] lg:w-[660px] xl:right-[2%] xl:h-[780px] xl:w-[780px] 2xl:right-[1%] 2xl:h-[920px] 2xl:w-[920px] 3xl:right-0 3xl:h-[980px] 3xl:w-[980px] 4xl:right-0 4xl:h-[1080px] 4xl:w-[1080px]">
                  <div className="relative h-full w-full">
                    <HeroModel
                      label={currentDessert.label}
                      modelSrc={currentDessert.model}
                      slideId={currentDessert.id}
                      modelSettings={currentDessert.modelSettings}
                      onHalfRotation={handleHalfRotation}
                      onRotationChange={handleRotationChange}
                      className="h-full w-full"
                    />
                    <div className="pointer-events-none absolute left-1/2 hidden w-full max-w-[520px] -translate-x-1/2 flex-col items-center text-center text-white drop-shadow-[0_18px_35px_rgba(0,0,0,0.45)] md:flex md:top-12 lg:top-16 xl:top-20 2xl:top-24 3xl:top-28 4xl:top-32">
                      <span className="text-sm uppercase tracking-[0.6em] text-white/60 lg:text-base 2xl:text-lg">
                        {currentDessert.eyebrow}
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`hero-desktop-title-${currentDessert.id}`}
                          className="mt-4 font-script text-5xl text-white lg:text-6xl xl:text-[4.75rem] 2xl:text-[5.5rem] 3xl:text-[6rem] 4xl:text-[6.75rem]"
                          variants={heroTitleVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={heroTitleTransition}
                        >
                          {currentDessert.label}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 layout-shell flex min-h-[70vh] w-full flex-col justify-center gap-8 pt-6 pb-32 text-left sm:pt-10 sm:pb-36 md:pb-16 lg:pt-14 lg:pb-12 2xl:gap-12 3xl:pt-16 3xl:pb-12 4xl:pt-20 4xl:pb-14">
          <motion.div
            className="max-w-2xl text-white -translate-y-6 sm:translate-y-0 md:ml-auto md:mr-20 xl:ml-4 2xl:max-w-3xl 2xl:ml-8 3xl:ml-14 3xl:mr-6 4xl:max-w-[60rem] 4xl:ml-22"
            variants={createStagger(0.12)}
            {...heroRevealConfig}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.7em] text-white/60 2xl:text-sm 4xl:text-base"
              variants={slideIn('down', 40)}
              transition={createTransition(0, 0.45)}
            >
              Пловдив · лукс сладкарство
            </motion.p>
            <motion.h1
              className="mt-4 font-luxury text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-[5.5rem] 4xl:text-[6.25rem]"
              variants={glowIn}
              transition={createTransition(0.08, 0.55)}
            >
              Приказка за ценители.
            </motion.h1>
            <motion.p
              className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg 2xl:text-xl 4xl:text-2xl"
              variants={fadeInUp}
              transition={createTransition(0.18, 0.48)}
            >
              Премиум сладкария Пловдив - домашно приготвени торти и десерти с фина ръчна изработка, включително серии без захар, без брашно и с протеин.
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap gap-4 3xl:gap-6" variants={createStagger(0.08)}>
              <MotionLink
                className="rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
                to="/horeca"
                variants={popIn}
                transition={createTransition(0.24, 0.42)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
              >
                HoReCa програми
              </MotionLink>
              <MotionLink
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-white 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
                to={currentDessert.href}
                variants={popIn}
                transition={createTransition(0.28, 0.42)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
              >
                Повече за продукта
              </MotionLink>
            </motion.div>
          </motion.div>

        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-18 z-30 flex flex-col items-center gap-4 sm:bottom-20 lg:bottom-24 md:flex-col md:gap-5">
          <motion.div
            className="text-center text-white md:hidden"
            variants={fadeIn}
            {...heroRevealConfig}
            transition={createTransition(0.5, 0.35)}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.5em] text-white/60">
              {currentDessert.eyebrow}
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={`hero-mobile-title-${currentDessert.id}`}
                className="mt-2 font-script text-4xl leading-none text-white drop-shadow-lg sm:text-5xl"
                variants={heroTitleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={heroTitleTransition}
              >
                {currentDessert.label}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <motion.section className="layout-shell" id="principles" variants={createStagger(0.08)} {...revealConfig}>
        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:gap-8 4xl:gap-10" variants={createStagger(0.1)}>
          {principles.map((principle) => (
            <motion.article
              key={principle.title}
              className={`rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg 2xl:px-8 2xl:py-10 4xl:px-10 4xl:py-12 ${panelHoverClasses}`}
              variants={tiltIn}
              transition={createTransition(0, 0.65)}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60 2xl:text-sm 4xl:text-base">Основни принципи</p>
              <h3 className="mt-2 font-luxury text-2xl text-white 2xl:text-3xl 4xl:text-4xl">{principle.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80 2xl:text-base 4xl:text-lg">{principle.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="layout-shell" id="about" variants={scaleIn} {...revealConfig} transition={createTransition(0.1, 0.8)}>
        <motion.div className={`rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg 2xl:px-8 2xl:py-10 4xl:px-10 4xl:py-12 ${panelHoverClasses}`} variants={createStagger(0.1)}>
          <motion.p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base" variants={slideIn('down', 35)}>
            История
          </motion.p>
          <motion.h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl" variants={glowIn}>
            {storyTeaser.title}
          </motion.h2>
          <motion.p className="mt-4 text-base leading-relaxed 2xl:text-xl 4xl:text-2xl" variants={fadeInUp}>
            {storyTeaser.text}
          </motion.p>
          <motion.ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-white/85 2xl:space-y-4 2xl:text-base 4xl:text-lg" variants={createStagger(0.08)}>
            {founderHighlights.map((highlight) => (
              <motion.li key={highlight.title} variants={fadeInUp}>
                <span className="font-semibold text-white">{highlight.title}:</span> {highlight.description}
              </motion.li>
            ))}
          </motion.ul>
          <MotionLink
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan 2xl:text-base 4xl:text-lg"
            to="/about"
              variants={popIn}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {storyTeaser.cta}
            <span aria-hidden="true">→</span>
          </MotionLink>
        </motion.div>
      </motion.section>

      <motion.section
        className="layout-shell space-y-8 2xl:space-y-10 4xl:space-y-12"
        id="products"
        variants={createStagger(0.12)}
        {...revealConfig}
      >
        <motion.div className="flex flex-col gap-4 text-white 3xl:gap-6" variants={createStagger(0.1)}>
          <motion.div variants={slideIn('up', 40)}>
            <p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base">Производство</p>
            <h2 className="mt-2 font-luxury text-3xl 2xl:text-4xl 4xl:text-5xl">Магазини · Хотели · Кетъринг</h2>
            <p className="mt-2 text-white/80 2xl:text-xl 4xl:text-2xl">
              Един и същ стандарт - независимо дали десертът стои във витрина, сервира се или украсява сцена.
            </p>
          </motion.div>
        </motion.div>
        <motion.div className="grid gap-6 md:grid-cols-3 2xl:gap-8 4xl:gap-12" variants={createStagger(0.08)}>
          {businessServices.map((service) => (
            <motion.article
              key={service.id}
              className={`rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/85 backdrop-blur-lg 2xl:p-8 4xl:p-10 ${panelHoverClasses}`}
              variants={blurIn}
              transition={createTransition(0, 0.7)}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60 2xl:text-sm 4xl:text-base">{service.title}</p>
              <h3 className="mt-2 font-luxury text-2xl text-white 2xl:text-3xl 4xl:text-4xl">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed 2xl:text-base 4xl:text-lg">{service.text}</p>
              <ul className="mt-4 space-y-2 text-sm text-white 2xl:text-base 4xl:text-lg">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-6 rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 3xl:gap-4">
                <MotionLink
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-0.5 2xl:px-7 2xl:py-3 2xl:text-sm 4xl:px-9 4xl:py-4 4xl:text-base"
                  to="/horeca"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Научи повече
                  <span aria-hidden="true">→</span>
                </MotionLink>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="layout-shell" id="contact" variants={scaleIn} {...revealConfig}>
        <motion.div className={`rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white/85 backdrop-blur-lg 2xl:px-10 2xl:py-14 4xl:px-12 4xl:py-16 ${panelHoverClasses}`} variants={createStagger(0.12)}>
          <motion.div className="grid gap-10 lg:grid-cols-[1.15fr,0.95fr] 2xl:gap-14" variants={createStagger(0.12)}>
            <motion.div className="space-y-8 2xl:space-y-10" variants={createStagger(0.08)}>
              <motion.div className="space-y-3" variants={createStagger(0.06)}>
                <motion.p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base" variants={slideIn('down', 30)}>
                  Свържи се с нас
                </motion.p>
                <motion.h2 className="font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl" variants={glowIn}>
                  Запази своето сладко изживяване
                </motion.h2>
                <motion.p className="text-white/80 2xl:text-lg 4xl:text-xl" variants={fadeInUp}>
                  Двата адреса на Cinderella's Cakes в Пловдив работят паралелно като уютни салони и работилници, а Полина лично
                  консултира всяка торта - от домашни рецепти до здравословни алтернативи без захар или глутен.
                </motion.p>
              </motion.div>
              <motion.div className="grid gap-6 lg:grid-cols-2" variants={createStagger(0.08)}>
                <motion.div variants={slideIn('left', 40)}>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Локации</p>
                  <ul className="mt-3 space-y-3 text-sm text-white/80 2xl:text-base 4xl:text-lg">
                    <li>
                      <span className="font-semibold text-white">Остромила ·</span> ул. Остромила 6 - първият бутиков салон и
                      производствена база.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Център ·</span> ул. Белград 19 (до Гранд Хотел Пловдив) - Cinderella's
                      Cakes 2 за бързи дегустации.
                    </li>
                  </ul>
                </motion.div>
                <motion.div variants={slideIn('right', 40)}>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Контакти</p>
                  <ul className="mt-3 space-y-3 text-sm text-white/80 2xl:text-base 4xl:text-lg">
                    <li>
                      <span className="font-semibold text-white">Поръчки:</span> +359 88 549 3040
                    </li>
                    <li>
                      <span className="font-semibold text-white">Кетъринг и събития:</span> +359 88 549 3040
                    </li>
                    <li>
                      <span className="font-semibold text-white">Имейл:</span> alatinovapolina@gmail.com
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
              <motion.div className="grid gap-4 sm:grid-cols-2" variants={createStagger(0.05)}>
                {mapLocations.map((location) => (
                  <motion.button
                    key={location.id}
                    aria-label={`Отвори карта за ${location.name}`}
                    className="rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-left text-white/85 backdrop-blur-lg transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
                    onClick={() => setActiveMap(location.id)}
                    type="button"
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xs uppercase tracking-[0.4em] text-white/60">Карта</span>
                    <span className="mt-2 block font-semibold text-white">{location.name}</span>
                    <span className="text-sm text-white/70">{location.street}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
            <motion.form className="space-y-4 2xl:space-y-6 4xl:space-y-8" variants={createStagger(0.08)}>
              <motion.div variants={fadeInUp}>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Вашето име</label>
                <input className="theme-input mt-2 w-full rounded-2xl border px-4 py-3" placeholder="Име и фамилия" type="text" />
              </motion.div>
              <motion.div className="grid gap-4 sm:grid-cols-2 2xl:gap-6 4xl:gap-8" variants={createStagger(0.05)}>
                <motion.div variants={fadeInUp}>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Имейл</label>
                  <input className="theme-input mt-2 w-full rounded-2xl border px-4 py-3" placeholder="example@domain.com" type="email" />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Телефон</label>
                  <input
                    className="theme-input mt-2 w-full rounded-2xl border px-4 py-3"
                    placeholder="+359 88 549 3040"
                    type="tel"
                  />
                </motion.div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Събитие / повод / детайли</label>
                <textarea
                  className="theme-input mt-2 w-full rounded-2xl border px-4 py-3"
                  placeholder="Опишете тортата, брой порции или специални изисквания."
                  rows={4}
                ></textarea>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Интересува ме</label>
                <div className="mt-2 flex flex-wrap gap-3 text-sm 2xl:gap-4 2xl:text-base 4xl:text-lg">
                  <label className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2">
                    <input className="accent-brand-blush" type="checkbox" />
                    Торти за вкъщи
                  </label>
                  <label className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2">
                    <input className="accent-brand-blush" type="checkbox" />
                    Кетъринг
                  </label>
                  <label className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2">
                    <input className="accent-brand-blush" type="checkbox" />
                    Дегустация на място
                  </label>
                </div>
              </motion.div>
              <motion.button
                className="w-full rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-12 4xl:py-5 4xl:text-lg"
                variants={popIn}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.94 }}
                type="submit"
              >
                Изпрати запитване
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.main>
    <AnimatePresence>
      {activeLocation && (
        <motion.div
          key="map-modal"
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-md"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => setActiveMap(null)}
          transition={createTransition(0, 0.3, 'easeOut')}
        >
          <motion.div
            aria-labelledby={`map-modal-title-${activeLocation.id}`}
            aria-modal="true"
            className="relative w-full max-w-4xl rounded-[32px] border border-white/15 bg-[#0B1120]/95 p-6 text-white shadow-[0_35px_120px_rgba(2,6,23,0.65)] sm:p-8"
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            transition={createTransition(0.05, 0.45, 'easeOut')}
          >
            <button
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-sm text-white transition hover:border-white/60 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
              onClick={() => setActiveMap(null)}
              ref={closeButtonRef}
              type="button"
              aria-label="Затвори картата"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Локация</p>
            <h3 className="mt-2 font-luxury text-3xl text-white" id={`map-modal-title-${activeLocation.id}`}>
              {activeLocation.name}
            </h3>
            <p className="text-sm text-white/70">{activeLocation.street}</p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <iframe
                allowFullScreen
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={activeLocation.iframeSrc}
                style={{ border: 0 }}
                title={`Карта - ${activeLocation.name}`}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

export default HomePage
