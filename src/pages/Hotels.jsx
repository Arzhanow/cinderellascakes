import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const experienceHighlights = [
  {
    title: 'Меню',
    description: 'Закуски, следобеден чай и вечерни десерти. Линии с без захар / без брашно варианти.',
  },
  {
    title: 'Сервиз',
    description: 'Настройки за буфет, plated и room-service сервиране с ясни инструкции.',
  },
  {
    title: 'Екип',
    description: 'Провеждаме кратки обучения на място и оставяме визуален наръчник за поддръжка.',
  },
]

const deliveries = [
  'График според заетостта на хотела – ежедневно или няколко пъти седмично.',
  'Температурно проследяване и протокол за прием при всяка доставка.',
  'Възможност за експресни поръчки при събития с предизвестие 48 часа.',
]

const signatureSets = [
  'Сезонни petit fours и монодесерти за afternoon tea',
  'Торти за gala dinner с ръчно моделиран декор',
  'Fitness-friendly закуски с протеин и без рафинирана захар',
]

const HotelsPage = () => {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-24 text-white">
      <section className="rounded-[36px] border border-white/10 bg-white/5 px-6 py-12 text-white/85 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">Производство · Хотели</p>
        <h1 className="mt-4 font-luxury text-4xl sm:text-5xl">Торти и десерти за петзвезден опит.</h1>
        <p className="mt-4 text-lg text-white/80">
          Работим ръчно, бавно и точно – така гарантираме, че всяка порция изглежда и вкуси еднакво, независимо дали
          е сервирана в залата, стаята или на private събитие.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night transition hover:-translate-y-1"
            to="/#contact"
          >
            Получете оферта
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
        {experienceHighlights.map((highlight) => (
          <article
            key={highlight.title}
            className="rounded-[30px] border border-white/10 bg-white/5 px-5 py-8 text-white/85 backdrop-blur-lg"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Фокус</p>
            <h2 className="mt-2 font-luxury text-2xl text-white">{highlight.title}</h2>
            <p className="mt-3 text-sm leading-relaxed">{highlight.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Сигнатура</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Колекции по повод</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {signatureSets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-6 rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan"></span>
                <span>{item}</span>
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
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Логистика</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">График и контрол</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {deliveries.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-6 rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-center text-white/85 backdrop-blur-lg">
        <h2 className="font-luxury text-3xl text-white">Поканете ни на дегустация</h2>
        <p className="mt-3 text-white/80">
          Споделете броя стаи, формати и любими вкусове. В рамките на 24 часа връщаме предложение и времеви график.
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

export default HotelsPage
