import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  createStagger,
  createTransition,
  fadeInUp,
  floatIn,
  glowIn,
  popIn,
  revealConfig,
  scaleIn,
  slideIn,
  tiltIn,
} from '../utils/motionPresets'

const eventTypes = [
  {
    title: 'Корпоративни формати',
    description: 'Лансирания, конференции и коктейли с персонализирани десертни станции и мини дегустации.',
  },
  {
    title: 'Частни поводи',
    description: 'Сватби, рождени дни и intimate вечери с торти на няколко етажа и тематични плата.',
  },
  {
    title: 'Pop-up преживявания',
    description: 'Интерактивни tasting барове с 3D модели и live plating, когато търсите шоу елемент.',
  },
]

const logisticsNotes = [
  'Екип за сервиз и декор на място – обучен да разказва историята на десертите.',
  'Moodboard, скица и списък с вкусове за одобрение до 5 работни дни след запитване.',
  'Логистика в рамките на Пловдив и региона, включително монтаж/демонтаж на инсталацията.',
]

const preparationSteps = ['Консултация за тема и брой гости', 'Moodboard + бюджет', 'Дегустация (по желание)', 'Финален план и тайминг', 'Изработка + инсталация на място']

const MotionLink = motion(Link)

const CateringPage = () => {
  return (
    <main className="layout-shell space-y-16 pb-20 pt-24 text-white 2xl:space-y-20 3xl:space-y-28 3xl:pb-28 4xl:pb-36 4xl:pt-32">
      <motion.section
        className="rounded-[36px] border border-white/10 bg-white/5 px-6 py-12 text-white/85 backdrop-blur-xl 2xl:px-10 2xl:py-16 4xl:px-14 4xl:py-20"
        variants={scaleIn}
        {...revealConfig}
      >
        <motion.p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base" variants={slideIn('down', 35)}>
          Производство · Кетъринг
        </motion.p>
        <motion.h1 className="mt-4 font-luxury text-4xl sm:text-5xl 2xl:text-6xl 4xl:text-7xl" variants={glowIn}>
          Десерт, който е сцена.
        </motion.h1>
        <motion.p className="mt-4 text-lg text-white/80 2xl:text-xl 4xl:text-2xl" variants={fadeInUp}>
          Създаваме сладки инсталации, които комбинират чист вкус, визуален стандарт и грижа за специални режими. От moodboard до сервиране – отговаряме за всеки детайл.
        </motion.p>
        <motion.div className="mt-8 flex flex-wrap gap-4 3xl:gap-6" variants={createStagger(0.08)}>
          <MotionLink
            className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
            to="/#contact"
            variants={popIn}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            Заяви дата
          </MotionLink>
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
      </motion.section>

      <motion.section className="grid gap-6 md:grid-cols-3 2xl:gap-8 4xl:gap-12" variants={createStagger(0.1)} {...revealConfig}>
        {eventTypes.map((event) => (
          <motion.article
            key={event.title}
            className="rounded-[30px] border border-white/10 bg-white/5 px-5 py-8 text-white/85 backdrop-blur-lg 2xl:px-7 2xl:py-10 4xl:px-10 4xl:py-12"
            variants={tiltIn}
            transition={createTransition(0, 0.65)}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60 2xl:text-sm 4xl:text-base">Формат</p>
            <h2 className="mt-2 font-luxury text-2xl text-white 2xl:text-3xl 4xl:text-4xl">{event.title}</h2>
            <p className="mt-3 text-sm leading-relaxed 2xl:text-base 4xl:text-lg">{event.description}</p>
          </motion.article>
        ))}
      </motion.section>

      <motion.section className="grid gap-8 lg:grid-cols-[1fr_1fr] 2xl:gap-10 4xl:gap-12" variants={createStagger(0.12)} {...revealConfig}>
        <motion.div
          className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg 2xl:px-10 2xl:py-10 4xl:px-12 4xl:py-14"
          variants={floatIn}
          transition={createTransition(0, 0.65)}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base">Логистика</p>
          <h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl">Подготовка и сервиз</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed 2xl:text-base 4xl:text-lg">
            {logisticsNotes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-6 rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan 4xl:h-2 4xl:w-10"></span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg 2xl:px-10 2xl:py-10 4xl:px-12 4xl:py-14"
          variants={floatIn}
          transition={createTransition(0.1, 0.65)}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base">Процес</p>
          <h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl">Как работим</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed 2xl:text-base 4xl:text-lg">
            {preparationSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs text-white/70 4xl:h-8 4xl:w-8 4xl:text-sm">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </motion.section>

      <motion.section
        className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-center text-white/85 backdrop-blur-lg 2xl:px-12 2xl:py-14 4xl:px-16 4xl:py-18"
        variants={scaleIn}
        {...revealConfig}
      >
        <motion.h2 className="font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl" variants={glowIn}>
          Имаме дата за вас
        </motion.h2>
        <motion.p className="mt-3 text-white/80 2xl:text-xl 4xl:text-2xl" variants={fadeInUp}>
          Разкажете ни темата, броя гости и любими вкусове. Ще подготвим план, бюджет и дегустация по избор.
        </motion.p>
        <MotionLink
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1 2xl:px-10 2xl:py-4 2xl:text-sm 4xl:px-12 4xl:py-5 4xl:text-base"
          to="/#contact"
          variants={popIn}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          Разкажи ни за повода
          <span aria-hidden="true">→</span>
        </MotionLink>
      </motion.section>
    </main>
  )
}

export default CateringPage
