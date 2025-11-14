import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroModel from '../components/HeroModel'

const heroSlides = [
  {
    id: 'garash',
    label: 'Signature Garash',
    eyebrow: 'Какаов пралин · Без брашно',
    description:
      'Ръчната ни интерпретация на класическа торта Гараш – сатенен ганаш, орехов дакоаз и полирано огледално покритие.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    cta: 'Повече за продукта',
    href: '/#contact',
    model: '/models/garash.glb',
  },
  {
    id: 'midnight',
    label: 'Midnight Velvet',
    eyebrow: 'Тъмен шоколад · Без брашно',
    description:
      'Пет слоя белгийски шоколад, карамел с морска сол и сатенен ганаш. Вариантът без брашно запазва чистия силует и дълбокия вкус.',
    image: 'https://images.unsplash.com/photo-1475856034132-877a997f29d7?auto=format&fit=crop&w=1600&q=80',
    cta: 'Повече за продукта',
    href: '/#contact',
    model: null,
  },
  {
    id: 'cloudberry',
    label: 'Cloudberry Silk',
    eyebrow: 'С протеин · Ядково мляко',
    description:
      'Леки блатове от ядково мляко, мус от бяла пралина и розов грейпфрут. Подходяща за спортуващи гости и утринни дегустации.',
    image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1600&q=80',
    cta: 'Повече за продукта',
    href: '/#contact',
    model: null,
  },
  {
    id: 'arabella',
    label: 'Arabella Rose',
    eyebrow: 'Розов грейпфрут · Без захар',
    description:
      'Крем от розов грейпфрут, шамфъстък и ръчно моделирани листа. Версията без захар се подслажда с йерусалимски артишок и стевия.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
    cta: 'Повече за продукта',
    href: '/#contact',
    model: null,
  },
  {
    id: 'opera',
    label: 'Pistachio Opera',
    eyebrow: 'Разделено порциониране',
    description:
      'Торта тип “opera” с бадемов дакоаз, крем от пиемонтски шамфъстък и нежен кафеен сироп. Изглежда идентично независимо от порцията.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80',
    cta: 'Повече за продукта',
    href: '/#contact',
    model: null,
  },
  {
    id: 'citrus',
    label: 'Citrus Muse',
    eyebrow: 'Сезонна лимитирана серия',
    description:
      'Марокански портокал, лайм и прахообразен йогурт създават свежа текстура. Идеален избор за летни събития и хотели с богата закуска.',
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1600&q=80',
    cta: 'Повече за продукта',
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
    <main className="space-y-20 pb-20 pt-0" id="home">
      <section className="relative min-h-screen w-full overflow-hidden" data-surface="dark" id="hero">
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
                backgroundImage: `linear-gradient(120deg, var(--hero-gradient-start), var(--hero-gradient-end)), url(${currentSlide.image})`,
              }}
            ></motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--hero-overlay)' }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center">
          <div className="max-w-2xl text-white">
            <p className="text-xs uppercase tracking-[0.7em] text-white/60">Пловдив · Fine Pastry</p>
            <h1 className="mt-4 font-luxury text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Приказка за ценители.</h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
              Премиум сладкария от Пловдив – торти и десерти с фина ръчна изработка, включително серии без захар, без брашно и с протеин.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1"
                to="/#products"
              >
                Виж най-търсените
              </Link>
              <Link
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-white"
                to={currentSlide.href}
              >
                Повече за продукта
              </Link>
            </div>
          </div>

          <motion.div
            key={currentSlide.label}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-[32px] border border-white/15 bg-white/10 p-8 text-white/85 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <HeroModel
              eyebrow={currentSlide.eyebrow}
              label={currentSlide.label}
              modelSrc={currentSlide.model}
              slideId={currentSlide.id}
            />
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
          <Link
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan"
            to="/#about"
          >
            {storyTeaser.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6" id="products">
        <div className="flex flex-col gap-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">B2B</p>
            <h2 className="mt-2 font-luxury text-3xl">Магазини · Хотели · Кетъринг</h2>
            <p className="mt-2 text-white/80">
              Един и същ стандарт – независимо дали десертът стои във витрина, сервира се в стая или украсява сцена.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-1"
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
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-0.5"
                  to={service.path}
                >
                  Научи повече
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan"
                  to="/#contact"
                >
                  {service.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
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
                className="theme-input mt-2 w-full rounded-2xl border px-4 py-3"
                placeholder="Име и фамилия"
                type="text"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">Имейл</label>
                <input
                    className="theme-input mt-2 w-full rounded-2xl border px-4 py-3"
                    placeholder="example@domain.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">Телефон</label>
                  <input
                    className="theme-input mt-2 w-full rounded-2xl border px-4 py-3"
                    placeholder="+359 ..."
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">Повод / дата / гости</label>
                <textarea
                  className="theme-input mt-2 w-full rounded-2xl border px-4 py-3"
                  placeholder="Разкажи ни какво празнуваш и колко гости очакваш"
                  rows={4}
                ></textarea>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">Предпочитания</label>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <label className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2">
                    <input className="accent-brand-blush" type="checkbox" />
                    Без захар
                  </label>
                  <label className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2">
                    <input className="accent-brand-blush" type="checkbox" />
                    Без брашно
                  </label>
                  <label className="theme-chip inline-flex items-center gap-2 rounded-full border px-4 py-2">
                    <input className="accent-brand-blush" type="checkbox" />
                    С протеин
                  </label>
                </div>
              </div>
            <button className="w-full rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1">
              Изпрати запитване
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default HomePage
