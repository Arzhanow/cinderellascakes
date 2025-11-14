import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const heroSlides = [
  {
    id: 'signature',
    label: 'Подписани торти',
    eyebrow: 'Колекция за ценители',
    description:
      'Чисти линии, балансирани кремове и ръчно изписани карамелени орнаменти. Част от моделите са налични без захар, без брашно или с протеин.',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80',
    cta: 'Виж най-търсените',
    href: '#products',
  },
  {
    id: 'retail',
    label: 'Магазини и бутици',
    eyebrow: 'Ритейл партньорства',
    description:
      'Мини десерти и торти с ясно етикетиране, стабилна логистика и визуален стандарт за премиум витрини.',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80',
    cta: 'Искам оферта',
    href: '#services',
  },
  {
    id: 'hotels',
    label: 'Хотели и спа',
    eyebrow: 'Гостоприемство',
    description:
      'Закуски, следобедни чаи и гала десерти със зададен стандарт на сервиране. Включени са варианти без захар и без брашно.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80',
    cta: 'Разгледай колекцията',
    href: '#services',
  },
  {
    id: 'catering',
    label: 'Кетъринг и събития',
    eyebrow: 'Преживявания',
    description:
      'Създаваме сладки инсталации за корпоративни и частни формати. Темата, диетите и сервизът са синхронизирани предварително.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    cta: 'Запази консултация',
    href: '#contact',
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
      'Слушаме повода и човека. Предлагаме без захар, без брашно и с протеин – без компромис с вкуса.',
  },
  {
    title: 'Отговорен избор',
    description: 'Даваме ясни инструкции за съхранение и транспорт. Само обещания, които изпълняваме.',
  },
]

const storyTeaser = {
  title: 'От малка работилница до премиум марка.',
  text: 'Започнахме с няколко форми и убеждението, че фината сладкария е характер, не декор. Днес създаваме десерти за хора, които търсят повече от „нещо сладко“.',
  cta: 'Прочети нашата история',
}

const bestSellers = [
  {
    name: 'Midnight Velvet',
    description: 'Тъмен шоколад, бавен ганаш и минималистичен силует. Любима на феновете на чистите линии.',
    tag: 'Без брашно',
  },
  {
    name: 'Cloudberry Silk',
    description: 'Леки блатове с ядково мляко, мус от бяла пралина и шушулки тонка. Създадена за сезонни поводи.',
    tag: 'С протеин',
  },
  {
    name: 'Arabella Rose',
    description: 'Розов грейпфрут, шамфъстък и ръчно моделирани листа. Вариант без захар е наличен по заявка.',
    tag: 'Без захар',
  },
]

const businessServices = [
  {
    id: 'retail',
    title: 'Ритейл',
    text: 'Постоянно качество и чиста визия за премиум витрини. Асортимент от торти, монодесерти и сезонни серии.',
    details: ['Опаковка и етикетиране по изискване', 'Доставки по график в Пловдив и региона'],
    cta: 'Запитване за договор',
  },
  {
    id: 'hotels',
    title: 'Хотели',
    text: 'Закуски, десерти и торти за събития. Визуален стандарт за петзвезден опит.',
    details: ['Гъвкави менюта с опции без захар/брашно', 'Предварително планирани срокове и сервиз'],
    cta: 'Получете оферта',
  },
  {
    id: 'catering',
    title: 'Кетъринг',
    text: 'Скалируеми решения за корпоративни и частни събития.',
    details: ['Мини размери и персонализирани плата', 'Логистика в Пловдив и региона'],
    cta: 'Заяви дата',
  },
]

const sliderDuration = 9000

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, sliderDuration)

    return () => clearInterval(timer)
  }, [])

  const currentSlide = heroSlides[activeSlide]

  return (
    <main className="space-y-20 pb-20 pt-14" id="home">
      <section className="relative min-h-screen w-full overflow-hidden" id="hero">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(5,1,10,0.85), rgba(5,1,10,0.35)), url(${currentSlide.image})`,
              }}
            ></motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-brand-night/70"></div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center">
          <div className="max-w-2xl text-white">
            <p className="text-xs uppercase tracking-[0.7em] text-white/60">Пловдив · Fine Pastry</p>
            <h1 className="mt-4 font-luxury text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Приказка за ценители.</h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
              Премиум сладкария от Пловдив – торти и десерти с фина ръчна изработка, включително серии без захар, без брашно и с протеин.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                className="rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-night shadow-glow-primary transition hover:-translate-y-1"
                href="#products"
              >
                Виж най-търсените
              </a>
              <a
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-white"
                href="/catalog.pdf"
              >
                Изтегли каталога (PDF)
              </a>
            </div>
          </div>

          <motion.div
            key={currentSlide.label}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-[32px] border border-white/15 bg-white/10 p-8 text-white/85 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">{currentSlide.eyebrow}</p>
            <h2 className="mt-2 font-luxury text-3xl text-white">{currentSlide.label}</h2>
            <p className="mt-4 leading-relaxed">{currentSlide.description}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/60">Навигирай модела – завърти, приближи, открий детайла.</p>
            <a
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-night transition hover:-translate-y-1"
              href={currentSlide.href}
            >
              {currentSlide.cta}
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        <div className="relative z-10 mt-6 px-6">
          <div className="flex flex-wrap gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition hover:border-white hover:text-white ${
                  activeSlide === index ? 'border-white bg-white/20 text-white' : 'border-white/30 text-white/70'
                }`}
                onClick={() => setActiveSlide(index)}
                type="button"
              >
                <span className="text-[0.7rem] uppercase tracking-[0.3em]">0{index + 1}</span>
                <span>{slide.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6" id="principles">
        <div className="grid gap-6 md:grid-cols-2">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Основни принципи</p>
              <h3 className="mt-2 font-luxury text-2xl text-white">{principle.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6" id="about">
        <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white/85 backdrop-blur-lg">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">История</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">{storyTeaser.title}</h2>
          <p className="mt-4 text-base leading-relaxed">{storyTeaser.text}</p>
          <a
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan"
            href="/about"
          >
            {storyTeaser.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6" id="products">
        <div className="flex flex-col gap-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">Най-търсени</p>
            <h2 className="mt-2 font-luxury text-3xl">Избраното от нашите клиенти</h2>
            <p className="mt-2 text-white/80">Колекция от десерти с собствена история.</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {bestSellers.map((item) => (
            <article key={item.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/85 backdrop-blur-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-luxury text-2xl text-white">{item.name}</h3>
                <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                  {item.tag}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed">{item.description}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan">
                Виж историята
                <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6" id="services">
        <div className="flex flex-col gap-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">B2B</p>
            <h2 className="mt-2 font-luxury text-3xl">Производство за бизнес</h2>
            <p className="mt-2 text-white/80">Консистентно качество, коректни срокове, визуален стандарт.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night transition hover:-translate-y-1"
              href="#contact"
            >
              Искам оферта
            </a>
            <a
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-1 hover:border-white"
              href="/catalog.pdf"
            >
              Каталог (PDF)
            </a>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {businessServices.map((service) => (
            <article key={service.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/85 backdrop-blur-lg">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">{service.title}</p>
              <h3 className="mt-2 font-luxury text-2xl text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed">{service.text}</p>
              <ul className="mt-4 space-y-2 text-sm text-white">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-6 rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan">
                {service.cta}
                <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6" id="contact">
        <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white/85 backdrop-blur-lg">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Контакт</p>
          <h2 className="mt-3 font-luxury text-3xl text-white">Разкажи ни за повода</h2>
          <p className="mt-2 text-white/80">Име, дата, гости и вкусови предпочитания – отговорът идва до един работен ден.</p>
          <form className="mt-8 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Как да се обърнем към теб?</label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/40 focus:border-white"
                placeholder="Име и фамилия"
                type="text"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">Имейл</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/40 focus:border-white"
                  placeholder="example@domain.com"
                  type="email"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">Телефон</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/40 focus:border-white"
                  placeholder="+359 ..."
                  type="tel"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Повод / дата / гости</label>
              <textarea
                className="mt-2 w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/40 focus:border-white"
                placeholder="Разкажи ни какво празнуваш и колко гости очакваш"
                rows={4}
              ></textarea>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Предпочитания</label>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                {['Без захар', 'Без брашно', 'С протеин'].map((option) => (
                  <label key={option} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/70">
                    <input className="accent-brand-blush" type="checkbox" />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night shadow-glow-primary transition hover:-translate-y-1">
              Изпрати запитване
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default HomePage
