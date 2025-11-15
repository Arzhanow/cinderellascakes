import { useEffect, useState } from 'react'
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
  floatIn,
  glowIn,
  heroRevealConfig,
  popIn,
  revealConfig,
  scaleIn,
  slideIn,
  tiltIn,
} from '../utils/motionPresets'

const MotionLink = motion.create(Link)

const heroSlides = [
  {
    id: 'garash',
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
      responsive: {
        mobile: {
          cameraPosition: [3.55, 3.65, 2.35],
          modelScale: 0.44,
          modelYOffset: -4.2,
          orbitTarget: [0, -4.1, 0],
          fov: 36,
        },
        tablet: {
          cameraPosition: [2.3, 2.4, 1.05],
          modelScale: 0.4,
          modelYOffset: -2.62,
          orbitTarget: [0, -2.58, 0],
          fov: 34,
        },
        laptop: {
          cameraPosition: [2.1, 2.25, 0.92],
          modelScale: 0.43,
          modelYOffset: -2.55,
          orbitTarget: [0, -2.5, 0],
          fov: 32,
        },
        desktop: {
          cameraPosition: [1.95, 2.18, 0.78],
          modelScale: 0.5,
          modelYOffset: -2.45,
          orbitTarget: [0, -2.45, 0],
          fov: 30,
        },
        desktopXL: {
          cameraPosition: [1.85, 2.1, 0.68],
          modelScale: 0.50,
          modelYOffset: -2.38,
          orbitTarget: [0, -2.38, 0],
          fov: 28,
        },
      },
    },
  },
  {
    id: 'yadesh',
    label: 'Ядеш и ревеш',
    description:
      'Слоеста торта с печени ядки, карамелен мус и солен карамел - толкова богата, че оставя без думи.',
    image: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1600&q=80',
    cta: 'Резервирай парче',
    href: '/#contact',
    model: null,
  },
  {
    id: 'carrot',
    label: 'Морковена',
    description:
      'Сочни блатове с морков, портокал и канела, комбинирани с лек крем сирене и цитрусова кора.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80',
    cta: 'Поръчай торта',
    href: '/#contact',
    model: null,
  },
  {
    id: 'no-sugar-choco',
    label: 'Шоколадова без захар и брашно',
    description:
      'Интензивен шоколадов мус без рафинирана захар и без брашно - чист вкус за хората на специален режим.',
    image: 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1600&q=80',
    cta: 'Попитай за наличности',
    href: '/#contact',
    model: null,
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
  title: "От Hell's Kitchen до собствена сладкарница в Пловдив",
  text: "Полина Петрова Алатинова стъпи под светлините на Hell's Kitchen България (сезон 6, 2024) като самоук любител, но впечатли журито със сладкарските си умения и получи похвали от шеф Виктор Ангелов. Събраната увереност прерасна в Cinderella's Cakes - бутикова работилница за домашни торти, която тя управлява лично в родния си Пловдив.",
  cta: 'Научи повече за историята ни',
}

const founderHighlights = [
  {
    label: '2024',
    title: "Hell's Kitchen България",
    description:
      'Полина блести като ,,майсторка на сладкишите" - участието ѝ в сезон 6 дава силен старт на професионалния ѝ път.',
  },
  {
    label: 'юни 2024',
    title: 'Първа локация · ул. Остромила 6',
    description:
      'Бутикова сладкарница в квартал Остромила, която е едновременно витрина с десерти и производствена база за всички поръчки.',
  },
  {
    label: 'юли 2025',
    title: "Cinderella's Cakes 2 · ул. Белград 19",
    description:
      'Втори салон в центъра на Пловдив - до Гранд Хотел Пловдив, за бързи дегустации и срещи с почитателите на десерта.',
  },
  {
    label: 'Признание',
    title: 'Награда ,,Първа дама" 2025',
    description:
      'Полина е отличена в категория ,,Храни - сладкарство" за авторските си десерти и социални инициативи като Halloween Street Food.',
  },
]

const businessServices = [
  {
    id: 'retail',
    title: 'Ритейл',
    text: 'Постоянно качество и чиста визия за премиум витрини. Асортимент от торти, монодесерти и сезонни серии.',
    details: ['Опаковка и етикетиране по изискване', 'Доставки по график в Пловдив и региона'],
    cta: 'Запитване за договор',
    path: '/retail',
  },
  {
    id: 'hotels',
    title: 'Хотели',
    text: 'Закуски, десерти и торти за събития. Визуален стандарт за петзвезден опит.',
    details: ['Гъвкави менюта с опции без захар/брашно', 'Предварително планирани срокове и сервиз'],
    cta: 'Получете оферта',
    path: '/hotels',
  },
  {
    id: 'catering',
    title: 'Кетъринг',
    text: 'Скалируеми решения за корпоративни и частни събития.',
    details: ['Мини размери и персонализирани плата', 'Логистика в Пловдив и региона'],
    cta: 'Заяви дата',
    path: '/catering',
  },
]

const sliderDuration = 14000

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [showIntroLoader, setShowIntroLoader] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, sliderDuration)

    return () => clearInterval(timer)
  }, [])

  const currentSlide = heroSlides[activeSlide]

  const goToPrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length)
  }

  return (
    <>
      {showIntroLoader && <LoadingScreen onComplete={() => setShowIntroLoader(false)} />}
      <motion.main
        aria-hidden={showIntroLoader}
        className="space-y-20 pb-20 pt-0 2xl:space-y-24 3xl:space-y-32 3xl:pb-28 4xl:pb-36"
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntroLoader ? 0 : 1 }}
        transition={createTransition(0, 0.8, 'easeOut')}
        style={{ pointerEvents: showIntroLoader ? 'none' : 'auto' }}
      >
      <section className="relative min-h-[90vh] w-full overflow-hidden" data-surface="dark" id="hero">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide.id}-background`}
              animate={{ opacity: 1 }}
              className="absolute inset-0 overflow-hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={createTransition(0, 0.8)}
            >
              <img
                alt=""
                className="h-full w-full object-cover"
                decoding="async"
                fetchPriority="high"
                loading="eager"
                src={currentSlide.image}
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
          {currentSlide.model && (
            <div className="absolute inset-0">
              <div className="relative h-full w-full">
                <div className="pointer-events-auto absolute left-1/2 bottom-6 z-30 h-[clamp(340px,90vw,520px)] w-[clamp(340px,90vw,520px)] -translate-x-1/2 opacity-95 sm:bottom-12 sm:h-[clamp(380px,75vw,600px)] sm:w-[clamp(380px,75vw,600px)] md:bottom-auto md:left-auto md:right-[6%] md:top-1/2 md:h-[540px] md:w-[540px] md:-translate-y-1/2 md:translate-x-0 lg:h-[660px] lg:w-[660px] xl:h-[780px] xl:w-[780px] 2xl:h-[920px] 2xl:w-[920px] 3xl:h-[980px] 3xl:w-[980px] 4xl:h-[1080px] 4xl:w-[1080px]">
                  <div className="relative h-full w-full">
                    <HeroModel
                      eyebrow={currentSlide.eyebrow}
                      label={currentSlide.label}
                      modelSrc={currentSlide.model}
                      slideId={currentSlide.id}
                      modelSettings={currentSlide.modelSettings}
                      className="h-full w-full"
                    />
                    <div className="pointer-events-none absolute left-1/2 hidden w-full max-w-[520px] -translate-x-1/2 flex-col items-center text-center text-white drop-shadow-[0_18px_35px_rgba(0,0,0,0.45)] md:flex md:top-4 lg:top-8 xl:top-10 2xl:top-14 3xl:top-16">
                      <span className="text-sm uppercase tracking-[0.6em] text-white/60 lg:text-base 2xl:text-lg">
                        {currentSlide.eyebrow}
                      </span>
                      <p className="mt-4 font-script text-5xl text-white lg:text-6xl xl:text-[4.75rem] 2xl:text-[5.5rem] 3xl:text-[6rem] 4xl:text-[6.75rem]">
                        {currentSlide.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 layout-shell flex min-h-[90vh] w-full flex-col justify-center gap-8 pt-4 pb-[14rem] text-left sm:pt-8 sm:pb-[18rem] md:pb-10 2xl:gap-12 3xl:pt-12 3xl:pb-20 4xl:pt-16 4xl:pb-24">
          <motion.div
            className="max-w-2xl text-white -translate-y-6 sm:translate-y-0 2xl:max-w-3xl 4xl:max-w-[60rem]"
            variants={createStagger(0.12)}
            {...heroRevealConfig}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.7em] text-white/60 2xl:text-sm 4xl:text-base"
              variants={slideIn('down', 40)}
              transition={createTransition(0, 0.7)}
            >
              Пловдив · лукс сладкарство
            </motion.p>
            <motion.h1
              className="mt-4 font-luxury text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-[5.5rem] 4xl:text-[6.25rem]"
              variants={glowIn}
              transition={createTransition(0.1, 0.85)}
            >
              Приказка за ценители.
            </motion.h1>
            <motion.p
              className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg 2xl:text-xl 4xl:text-2xl"
              variants={fadeInUp}
              transition={createTransition(0.2, 0.7)}
            >
              Премиум сладкария от Пловдив - торти и десерти с фина ръчна изработка, включително серии без захар, без брашно и с протеин.
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap gap-4 3xl:gap-6" variants={createStagger(0.1)}>
              <MotionLink
                className="rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
                to="/#products"
                variants={popIn}
                transition={createTransition(0.3, 0.6)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
              >
                Виж най-търсените
              </MotionLink>
              <MotionLink
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-white 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
                to={currentSlide.href}
                variants={popIn}
                transition={createTransition(0.35, 0.6)}
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
            transition={createTransition(0.6, 0.5)}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.5em] text-white/60">
              {currentSlide.eyebrow}
            </span>
            <p className="mt-2 font-script text-4xl leading-none text-white drop-shadow-lg sm:text-5xl">
              {currentSlide.label}
            </p>
          </motion.div>
          <motion.div
            className="pointer-events-auto inline-flex items-center gap-4 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-white shadow-lg backdrop-blur-lg"
            variants={createStagger(0.05)}
            {...heroRevealConfig}
          >
            <motion.button
              aria-label="Предишна торта"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-2xl transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={goToPrev}
              whileTap={{ scale: 0.85 }}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </motion.button>
            <div className="flex items-center gap-3">
              {heroSlides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  aria-label={`Показване на ${slide.label}`}
                  className={`h-3 w-3 rounded-full border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    activeSlide === index
                      ? 'scale-110 border-white bg-white shadow-glow-primary'
                      : 'border-white/40 bg-white/10 hover:border-white/70'
                  }`}
                  onClick={() => setActiveSlide(index)}
                  whileTap={{ scale: 0.8 }}
                  type="button"
                >
                  <span className="sr-only">{slide.label}</span>
                </motion.button>
              ))}
            </div>
            <motion.button
              aria-label="Следваща торта"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-2xl transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={goToNext}
              whileTap={{ scale: 0.85 }}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <motion.section className="layout-shell" id="principles" variants={createStagger(0.08)} {...revealConfig}>
        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:gap-8 4xl:gap-10" variants={createStagger(0.1)}>
          {principles.map((principle) => (
            <motion.article
              key={principle.title}
              className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg 2xl:px-8 2xl:py-10 4xl:px-10 4xl:py-12"
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
        <motion.div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white/85 backdrop-blur-lg 2xl:px-10 2xl:py-14 4xl:px-14 4xl:py-16" variants={createStagger(0.1)}>
          <motion.p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base" variants={slideIn('down', 35)}>
            История
          </motion.p>
          <motion.h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl" variants={glowIn}>
            {storyTeaser.title}
          </motion.h2>
          <motion.p className="mt-4 text-base leading-relaxed 2xl:text-xl 4xl:text-2xl" variants={fadeInUp}>
            {storyTeaser.text}
          </motion.p>
          <motion.div className="mt-8 grid gap-4 md:grid-cols-2 2xl:gap-6" variants={createStagger(0.08)}>
            {founderHighlights.map((highlight) => (
              <motion.article
                key={`${highlight.label}-${highlight.title}`}
                className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5 text-white/85 backdrop-blur"
                variants={floatIn}
                transition={createTransition(0, 0.6)}
              >
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50 2xl:text-xs">{highlight.label}</p>
                <h3 className="mt-2 font-semibold text-white 2xl:text-xl">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 2xl:text-base">{highlight.description}</p>
              </motion.article>
            ))}
          </motion.div>
          <MotionLink
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan 2xl:text-base 4xl:text-lg"
            to="/#about"
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
            <p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base">B2B</p>
            <h2 className="mt-2 font-luxury text-3xl 2xl:text-4xl 4xl:text-5xl">Магазини · Хотели · Кетъринг</h2>
            <p className="mt-2 text-white/80 2xl:text-xl 4xl:text-2xl">
              Един и същ стандарт - независимо дали десертът стои във витрина, сервира се в стая или украсява сцена.
            </p>
          </motion.div>
          <motion.div className="flex flex-wrap gap-4 3xl:gap-6" variants={createStagger(0.08)}>
            <motion.a
              className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
              href="#contact"
              variants={popIn}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              Искам оферта
            </motion.a>
            <motion.a
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-1 hover:border-white 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
              href="/catalog.pdf"
              variants={popIn}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              Каталог (PDF)
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div className="grid gap-6 md:grid-cols-3 2xl:gap-8 4xl:gap-12" variants={createStagger(0.08)}>
          {businessServices.map((service) => (
            <motion.article
              key={service.id}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/85 backdrop-blur-lg 2xl:p-8 4xl:p-10"
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
                  to={service.path}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Научи повече
                  <span aria-hidden="true">→</span>
                </MotionLink>
                <MotionLink
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan 2xl:text-base 4xl:text-lg"
                  to="/#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {service.cta}
                  <span aria-hidden="true">→</span>
                </MotionLink>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="layout-shell max-w-4xl 3xl:max-w-[1100px]" id="contact" variants={scaleIn} {...revealConfig}>
        <motion.div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white/85 backdrop-blur-lg 2xl:px-10 2xl:py-14 4xl:px-12 4xl:py-16" variants={createStagger(0.12)}>
          <motion.p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base" variants={slideIn('down', 30)}>
            Свържи се с нас
          </motion.p>
          <motion.h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl" variants={glowIn}>
            Запази своето сладко изживяване
          </motion.h2>
          <motion.p className="mt-2 text-white/80 2xl:text-lg 4xl:text-xl" variants={fadeInUp}>
            Двата адреса на Cinderella's Cakes в Пловдив работят паралелно като уютни салони и работилници, а Полина лично
            консултира всяка торта - от домашни рецепти до здравословни алтернативи без захар или глутен.
          </motion.p>
          <motion.div className="mt-8 grid gap-6 lg:grid-cols-2" variants={createStagger(0.08)}>
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
                  <span className="font-semibold text-white">Поръчки:</span> 0885 493 040
                </li>
                <li>
                  <span className="font-semibold text-white">Кетъринг и събития:</span> 0889 979 565
                </li>
                <li>
                  <span className="font-semibold text-white">Имейл:</span> polinaalatinova@bigenergy.bg
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.form className="mt-8 space-y-4 2xl:space-y-6 4xl:space-y-8" variants={createStagger(0.08)}>
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
                <input className="theme-input mt-2 w-full rounded-2xl border px-4 py-3" placeholder="+359 ..." type="tel" />
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
      </motion.section>
    </motion.main>
    </>
  )
}

export default HomePage
