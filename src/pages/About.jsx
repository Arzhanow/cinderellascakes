import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroModel from '../components/HeroModel'
import { createStagger, createTransition, fadeInUp, glowIn, scaleIn, tiltIn } from '../utils/motionPresets'

const MotionLink = motion.create(Link)

const repeatRevealConfig = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: false, amount: 0.3 },
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

const progressRoadmap = [
  { id: 'intro', label: 'Старт' },
  { id: 'timeline', label: 'Време' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'principles', label: 'Ценности' },
  { id: 'cta', label: 'Финал' },
]

const AboutPage = () => {
  const portfolioSectionRef = useRef(null)
  const [maxStep, setMaxStep] = useState(0)
  const totalSections = progressRoadmap.length
  const progressSpring = useSpring(0, { stiffness: 120, damping: 24, mass: 0.8 })

  const { scrollYProgress } = useScroll({
    target: portfolioSectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    progressSpring.set(maxStep / totalSections)
  }, [maxStep, totalSections, progressSpring])

  const handleStepEnter = (index) => {
    setMaxStep((prev) => Math.max(prev, index + 1))
  }

  const modelX = useTransform(scrollYProgress, [0, 1], [-80, 220])
  const modelY = useTransform(scrollYProgress, [0, 1], [-20, 320])
  const modelRotate = useTransform(scrollYProgress, [0, 1], [-5, 6])
  const modelScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.08])
  const modelGlow = useTransform(scrollYProgress, [0, 1], [0.35, 0.8])

  return (
    <main className="layout-shell relative space-y-16 pb-20 pt-28 text-white 2xl:space-y-20 3xl:space-y-28 3xl:pb-28 4xl:space-y-32 4xl:pb-36 4xl:pt-32">
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
        className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        initial="hidden"
        animate="visible"
        variants={createStagger(0.12)}
        onViewportEnter={() => handleStepEnter(0)}
        viewport={{ once: false, amount: 0.45 }}
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {atelierStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/15 p-4">
                <p className="text-4xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="space-y-8"
        variants={createStagger(0.08)}
        {...repeatRevealConfig}
        onViewportEnter={() => handleStepEnter(1)}
      >
        <motion.div className="max-w-3xl" variants={fadeInUp}>
          <p className="text-xs uppercase tracking-[0.55em] text-white/60">Линия на времето</p>
          <h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl">От телевизионния старт до собствен бранд</h2>
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
        className="relative"
        ref={portfolioSectionRef}
        onViewportEnter={() => handleStepEnter(2)}
        viewport={{ once: false, amount: 0.45 }}
      >
        <div className="relative min-h-[130vh]">
          <motion.div
            className="absolute left-0 top-0 z-20 w-full max-w-[540px] rounded-[44px] border border-white/15 bg-white/5 p-5 shadow-[0_50px_120px_rgba(4,0,22,0.55)] backdrop-blur-3xl sm:left-6 lg:left-12"
            style={{ x: modelX, y: modelY, rotate: modelRotate, scale: modelScale }}
          >
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[50px] bg-gradient-to-br from-brand-blush/35 via-brand-cyan/25 to-transparent blur-3xl"
              style={{ opacity: modelGlow }}
            />
            <HeroModel
              className="h-[420px] w-full 3xl:h-[520px]"
              label="Cinderella"
              modelSrc="/models/cinderella3D.glb"
              modelSettings={cinderellaModelSettings}
              slideId="about-cinderella"
            />
          </motion.div>

          <div className="pt-[520px] sm:pt-[560px]">
            <motion.div className="space-y-10 md:pl-[55%]" variants={createStagger(0.12)} {...repeatRevealConfig}>
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
          </div>
        </div>
      </motion.section>

      <motion.section
        className="space-y-8"
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
          Cinderella’s Cakes приема поръчки на 0885 493040 и 0889 979565, а Полина лично отговаря в Instagram
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
    </main>
  )
}

export default AboutPage
