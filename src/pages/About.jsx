import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroModel from '../components/HeroModel'
import { createStagger, createTransition, fadeInUp, glowIn, revealConfig, scaleIn, tiltIn } from '../utils/motionPresets'

const MotionLink = motion.create(Link)

const storyHighlights = [
  {
    period: '2004 — 2008',
    title: 'Началото в семейната кухня',
    description:
      'Мария изпича първите дванадесет блата в малкия апартамент в Овча купел. Всеки пласт се записва прецизно в тефтер, а тестовите дегустации с приятели се превръщат в ритуал.',
  },
  {
    period: '2009 — 2015',
    title: 'Първото ателие и смелите поръчки',
    description:
      'Отваряме собствено пространство с две пещи и витрина, в която се редуват лимитирани колекции. Създаваме 3D макети и въвеждаме печат върху кадифен шоколадов велур.',
  },
  {
    period: '2016 — днес',
    title: 'Партньор на топ хотели и дворци',
    description:
      'Работим съвместно с екипите на бутик хотели, организираме дегустации на място и внедряваме устойчиви опаковки за международни доставки.',
  },
]

const portfolioMoments = [
  {
    title: 'Royal Waltz',
    caption: 'Сватба в Торонто, 2023',
    details:
      'Шестетажна торта с ръчно рисувани перли и мус от шампанско розе. Изискването беше „да изглежда като движение“. Отне 92 часа моделиране на кралските гънки.',
  },
  {
    title: 'Midnight Garden',
    caption: 'Гранд хотел София, 2022',
    details:
      'Концепция за корпоративен гала бал – триизмерна композиция от шоколадово огледало, теменужен гриляж и живи цветя в захарен купол.',
  },
  {
    title: 'Bas-Relief Couture',
    caption: 'Ателие колекция 2024',
    details:
      'Серия от 3D стенописи върху торти за персонални събития. Използвахме сканиране на платове и създадохме дигитални релефи, които отпечатахме в какаово кадифе.',
  },
]

const atelierPrinciples = [
  {
    label: 'Вкус преди всичко',
    description:
      'Комбинираме френски техники с български сезонни продукти. След всяка нова рецепта правим слепи дегустации с външни майстори.',
  },
  {
    label: 'Чиста технология',
    description:
      'Проследяваме всеки слой чрез дигитално досие – от произхода на какаото до последната глазура. Така можем да възпроизведем всяка торта след години.',
  },
  {
    label: 'Екип & семейство',
    description:
      'Нашето ядро е от 12 души – дизайнери, сладкари и сценограф. Учим се взаимно, пътуваме заедно и споделяме всеки успех с клиентите.',
  },
]

const atelierStats = [
  { label: 'Бутикови торти годишно', value: '312' },
  { label: 'Сватбени двойки, които ни повериха деня си', value: '148' },
  { label: 'Партньорски хотела и бутикови пространства', value: '24' },
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

const AboutPage = () => {
  const portfolioRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ['start start', 'end end'],
  })

  const modelX = useTransform(scrollYProgress, [0, 1], [-80, 220])
  const modelY = useTransform(scrollYProgress, [0, 1], [-20, 320])
  const modelRotate = useTransform(scrollYProgress, [0, 1], [-5, 6])
  const modelScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.08])
  const modelGlow = useTransform(scrollYProgress, [0, 1], [0.35, 0.8])

  return (
    <main className="layout-shell space-y-16 pb-20 pt-28 text-white 2xl:space-y-20 3xl:space-y-28 3xl:pb-28 4xl:space-y-32 4xl:pb-36 4xl:pt-32">
      <motion.section
        className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        initial="hidden"
        animate="visible"
        variants={createStagger(0.12)}
      >
        <motion.div
          className="rounded-[40px] border border-white/15 bg-white/5 px-8 py-10 text-white/90 shadow-[0_35px_80px_rgba(6,10,34,0.45)] backdrop-blur-3xl 2xl:px-12 2xl:py-14"
          variants={glowIn}
        >
          <motion.p className="text-xs uppercase tracking-[0.65em] text-brand-cyan/80" variants={fadeInUp}>
            За нас
          </motion.p>
          <motion.h1 className="mt-4 font-luxury text-4xl text-white 2xl:text-5xl 4xl:text-6xl" variants={fadeInUp}>
            Историята на Cinderella&apos;s Cakes е движение – като 3D торта, която оживява пред гостите.
          </motion.h1>
          <motion.p className="mt-6 text-base leading-relaxed text-white/80 2xl:text-lg" variants={fadeInUp}>
            Създаваме торти, които съчетават висока сладкария, моден дизайн и технологии. Всеки слой е документиран,
            за да можем да повторим магията където и да е по света.
          </motion.p>

          <motion.ul className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/60" variants={createStagger(0.08)}>
            <motion.li className="rounded-full border border-white/15 px-4 py-2" variants={fadeInUp}>
              Авторски рецепти
            </motion.li>
            <motion.li className="rounded-full border border-white/15 px-4 py-2" variants={fadeInUp}>
              3D моделиране
            </motion.li>
            <motion.li className="rounded-full border border-white/15 px-4 py-2" variants={fadeInUp}>
              Сезонни вкусове
            </motion.li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="rounded-[40px] border border-white/10 bg-gradient-to-b from-brand-dusk/70 via-brand-dusk/40 to-transparent px-8 py-10 shadow-[0_35px_80px_rgba(3,5,15,0.55)]"
          variants={fadeInUp}
          transition={createTransition(0.1, 0.9)}
        >
          <p className="text-xs uppercase tracking-[0.55em] text-white/60">Нашият подпис</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Женска сила, прецизност и технологии</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80 2xl:text-base">
            Работим с motion дизайнери, за да превръщаме скиците в триизмерни макети. Екипът ни планира всяка торта като
            мини спектакъл – от светлината до аромата, в който гостите се потапят.
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

      <motion.section className="space-y-8" variants={createStagger(0.08)} {...revealConfig}>
        <motion.div className="max-w-3xl" variants={fadeInUp}>
          <p className="text-xs uppercase tracking-[0.55em] text-white/60">Линия на времето</p>
          <h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl">От тетрадката на мама до 3D ателието</h2>
          <p className="mt-4 text-white/75">
            Историите ни са писани от хората, които ни довериха най-важните си поводи. Всеки нов проект добавя още един
            ред в архивата ни, съхраняван в дигитално портфолио.
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

      <section className="relative" ref={portfolioRef}>
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
            <motion.div className="space-y-10 md:pl-[55%]" variants={createStagger(0.12)} {...revealConfig}>
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
      </section>

      <motion.section className="space-y-8" variants={createStagger(0.08)} {...revealConfig}>
        <motion.div className="max-w-2xl" variants={fadeInUp}>
          <p className="text-xs uppercase tracking-[0.55em] text-white/60">Ателие</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Принципи, които защитаваме всеки ден</h2>
          <p className="mt-4 text-white/70">
            Тортите ни са резултат от много разговори – с производители, клиенти и помежду ни. Ето какво никога не
            пропускаме.
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
        {...revealConfig}
      >
        <motion.p className="text-xs uppercase tracking-[0.65em] text-white/55" variants={fadeInUp}>
          Следваща глава
        </motion.p>
        <motion.h2 className="mt-4 font-luxury text-4xl text-white 2xl:text-5xl" variants={fadeInUp}>
          Нека построим следващия ви сладкарски спомен – в 3D, със светлина и с много вкус.
        </motion.h2>
        <motion.p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/75" variants={fadeInUp}>
          Създаваме лимитирани проекти всеки сезон. Разкажете ни за вашето събитие, за да моделираме персонален десерт,
          който говори на езика на вашия бранд или семейство.
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
