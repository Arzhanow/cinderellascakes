import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const valuePillars = [
  {
    title: 'Асортимент',
    description: 'Торти, монодесерти и сезонни серии, които запазват формата си във витрина 6+ часа.',
  },
  {
    title: 'Опаковка',
    description: 'Кутии и кофрети с ваш или наш брандинг, етикети на два езика и ясни инструкции за съхранение.',
  },
  {
    title: 'Поддръжка',
    description: 'Доставяме по график, проверяваме витрината и актуализираме списъка според сезона.',
  },
]

const logistics = [
  'Доставки в Пловдив и региона – преди отваряне на обекта или в договорен прозорец.',
  'Температурно контролиран транспорт, подписан протокол за приемане.',
  'Документи за произход на продуктите и списък с алергени за всяка партида.',
]

const processSteps = ['Консултация за асортимент и оборот', 'Пробни мостри (по желание)', 'Договор и график', 'Производство + доставка', 'Актуализации според сезона']

const RetailPage = () => {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-24 text-white">
      <section className="rounded-[36px] border border-white/10 bg-white/5 px-6 py-12 text-white/85 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">Производство · Ритейл</p>
        <h1 className="mt-4 font-luxury text-4xl sm:text-5xl">Витрина с постоянен стандарт.</h1>
        <p className="mt-4 text-lg text-white/80">
          Постоянно качество и чиста визия за премиум магазини. Подготвяме асортимент, който изглежда като подарък и
          се съхранява сигурно дори при натоварени часове.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-1"
            to="/#contact"
          >
            Искам оферта
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
        {valuePillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-[30px] border border-white/10 bg-white/5 px-5 py-8 text-white/85 backdrop-blur-lg"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Фокус</p>
            <h2 className="mt-2 font-luxury text-2xl text-white">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-relaxed">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg"
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Логистика</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Доставка и документи</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {logistics.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-6 rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg"
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Процес</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Работим в ясни стъпки</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed">
            {processSteps.map((step, index) => (
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
        <h2 className="font-luxury text-3xl text-white">Готови ли сте за дегустация?</h2>
        <p className="mt-3 text-white/80">
          Споделете оборот, брой витрини и предпочитани вкусове. Подготвяме мостри и график до 3 работни дни.
        </p>
        <Link
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1"
          to="/#contact"
        >
          Разкажи ни за повода
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  )
}

export default RetailPage
