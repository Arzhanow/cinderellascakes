import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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

const CateringPage = () => {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-24 text-white">
      <section className="rounded-[36px] border border-white/10 bg-white/5 px-6 py-12 text-white/85 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">Производство · Кетъринг</p>
        <h1 className="mt-4 font-luxury text-4xl sm:text-5xl">Десерт, който е сцена.</h1>
        <p className="mt-4 text-lg text-white/80">
          Създаваме сладки инсталации, които комбинират чист вкус, визуален стандарт и грижа за специални режими. От
          moodboard до сервиране – отговаряме за всеки детайл.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night transition hover:-translate-y-1"
            to="/#contact"
          >
            Заяви дата
          </Link>
          <a
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-1 hover:border-white"
            href="/catalog.pdf"
          >
            Каталог (PDF)
          </a>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {eventTypes.map((event) => (
          <article
            key={event.title}
            className="rounded-[30px] border border-white/10 bg-white/5 px-5 py-8 text-white/85 backdrop-blur-lg"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Формат</p>
            <h2 className="mt-2 font-luxury text-2xl text-white">{event.title}</h2>
            <p className="mt-3 text-sm leading-relaxed">{event.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Логистика</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Подготовка и сервиз</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {logisticsNotes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-6 rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan"></span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Процес</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Как работим</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed">
            {preparationSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs text-white/70">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-center text-white/85 backdrop-blur-lg">
        <h2 className="font-luxury text-3xl text-white">Имаме дата за вас</h2>
        <p className="mt-3 text-white/80">
          Разкажете ни темата, броя гости и любими вкусове. Ще подготвим план, бюджет и дегустация по избор.
        </p>
        <Link
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-night shadow-glow-primary transition hover:-translate-y-1"
          to="/#contact"
        >
          Разкажи ни за повода
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  )
}

export default CateringPage
