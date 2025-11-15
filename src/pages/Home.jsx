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
      'Ръчната ни интерпретация на класическа торта Гараш - сатенен ганаш, орехов дакоаз и полирано огледално покритие.',
    image: '/images/cakes/garash/20250128_145936.jpg',
    cta: 'Повече за продукта',
    href: '/#contact',
    model: '/models/garash.glb',
    modelSettings: {
      cameraPosition: [0, 1.15, 2.8],
      modelScale: 0.6,
      modelYOffset: -1.4,
      orbitTarget: [0, -0.45, 0],
    },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, sliderDuration)

    return () => clearInterval(timer)
  }, [])

  const currentSlide = heroSlides[activeSlide]

  return (
    <main className="space-y-20 pb-20 pt-0 2xl:space-y-24 3xl:space-y-32 3xl:pb-28 4xl:pb-36" id="home">
      <section className="relative min-h-[90vh] w-full overflow-hidden" data-surface="dark" id="hero">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide.id}-background`}
              animate={{ opacity: 1 }}
              className="absolute inset-0 overflow-hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                alt={currentSlide.label}
                className="h-full w-full object-cover"
                decoding="async"
                fetchpriority="high"
                loading="eager"
                src={currentSlide.image}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'linear-gradient(120deg, var(--hero-gradient-start), var(--hero-gradient-end))',
                  mixBlendMode: 'soft-light',
                }}
              ></div>
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--hero-overlay)' }}
          ></div>
          {currentSlide.model && (
            <div className="pointer-events-none absolute inset-0">
              <HeroModel
                eyebrow={currentSlide.eyebrow}
                label={currentSlide.label}
                modelSrc={currentSlide.model}
                slideId={currentSlide.id}
                modelSettings={currentSlide.modelSettings}
                className="pointer-events-none absolute left-[55%] top-[18%] h-[420px] w-[420px] -translate-x-[40%] opacity-95 sm:left-[62%] sm:top-[17%] sm:h-[520px] sm:w-[520px] sm:-translate-x-[32%] md:left-[64%] md:top-[16%] md:h-[580px] md:w-[580px] lg:left-[66%] lg:top-[15%] lg:h-[660px] lg:w-[660px] xl:left-[68%] xl:top-[14%] xl:h-[760px] xl:w-[760px] 2xl:left-[68%] 2xl:top-[13%] 2xl:h-[820px] 2xl:w-[820px] 4xl:left-[69%] 4xl:top-[12%] 4xl:h-[880px] 4xl:w-[880px]"
              />
            </div>
          )}
        </div>

        <div className="relative z-10 layout-shell flex w-full flex-col gap-6 py-10 lg:flex-row lg:items-center 2xl:gap-12 3xl:py-16 4xl:py-20">
          <div className="max-w-2xl text-white 2xl:max-w-3xl 4xl:max-w-[60rem]">
            <p className="text-xs uppercase tracking-[0.7em] text-white/60 2xl:text-sm 4xl:text-base">Пловдив · Fine Pastry</p>
            <h1 className="mt-4 font-luxury text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-[5.5rem] 4xl:text-[6.25rem]">Приказка за ценители.</h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg 2xl:text-xl 4xl:text-2xl">
              Премиум сладкария от Пловдив - торти и десерти с фина ръчна изработка, включително серии без захар, без брашно и с протеин.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 3xl:gap-6">
              <Link
                className="rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
                to="/#products"
              >
                Виж най-търсените
              </Link>
              <Link
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-white 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
                to={currentSlide.href}
              >
                Повече за продукта
              </Link>
            </div>
          </div>

        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 sm:bottom-18 lg:bottom-20">
          <div className="layout-shell pointer-events-auto">
            <div className="flex flex-wrap gap-3 3xl:gap-4">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition hover:border-white hover:text-white 2xl:px-5 2xl:py-2.5 2xl:text-base 4xl:px-6 4xl:py-3 4xl:text-lg ${
                    activeSlide === index ? 'border-white bg-white/20 text-white' : 'border-white/30 text-white/70'
                  }`}
                  onClick={() => setActiveSlide(index)}
                  type="button"
                >
                  <span className="text-[0.7rem] uppercase tracking-[0.3em] 3xl:text-sm 4xl:text-base">
                    0{index + 1}
                  </span>
                  <span className="text-sm 2xl:text-base 4xl:text-lg">{slide.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="layout-shell" id="principles">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:gap-8 4xl:gap-10">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 backdrop-blur-lg 2xl:px-8 2xl:py-10 4xl:px-10 4xl:py-12"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/60 2xl:text-sm 4xl:text-base">Основни принципи</p>
              <h3 className="mt-2 font-luxury text-2xl text-white 2xl:text-3xl 4xl:text-4xl">{principle.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80 2xl:text-base 4xl:text-lg">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="layout-shell" id="about">
        <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white/85 backdrop-blur-lg 2xl:px-10 2xl:py-14 4xl:px-14 4xl:py-16">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base">История</p>
          <h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl">{storyTeaser.title}</h2>
          <p className="mt-4 text-base leading-relaxed 2xl:text-xl 4xl:text-2xl">{storyTeaser.text}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 2xl:gap-6">
            {founderHighlights.map((highlight) => (
              <article
                key={`${highlight.label}-${highlight.title}`}
                className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5 text-white/85 backdrop-blur"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50 2xl:text-xs">{highlight.label}</p>
                <h3 className="mt-2 font-semibold text-white 2xl:text-xl">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 2xl:text-base">{highlight.description}</p>
              </article>
            ))}
          </div>
          <Link
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan 2xl:text-base 4xl:text-lg"
            to="/#about"
          >
            {storyTeaser.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="layout-shell space-y-8 2xl:space-y-10 4xl:space-y-12" id="products">
        <div className="flex flex-col gap-4 text-white 3xl:gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base">B2B</p>
            <h2 className="mt-2 font-luxury text-3xl 2xl:text-4xl 4xl:text-5xl">Магазини · Хотели · Кетъринг</h2>
            <p className="mt-2 text-white/80 2xl:text-xl 4xl:text-2xl">
              Един и същ стандарт - независимо дали десертът стои във витрина, сервира се в стая или украсява сцена.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 3xl:gap-6">
            <a
              className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
              href="#contact"
            >
              Искам оферта
            </a>
            <a
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-1 hover:border-white 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg"
              href="/catalog.pdf"
            >
              Каталог (PDF)
            </a>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3 2xl:gap-8 4xl:gap-12">
          {businessServices.map((service) => (
            <article key={service.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/85 backdrop-blur-lg 2xl:p-8 4xl:p-10">
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
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-button-contrast transition hover:-translate-y-0.5 2xl:px-7 2xl:py-3 2xl:text-sm 4xl:px-9 4xl:py-4 4xl:text-base"
                  to={service.path}
                >
                  Научи повече
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-brand-cyan 2xl:text-base 4xl:text-lg"
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

      <section className="layout-shell max-w-4xl 3xl:max-w-[1100px]" id="contact">
        <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white/85 backdrop-blur-lg 2xl:px-10 2xl:py-14 4xl:px-12 4xl:py-16">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60 2xl:text-sm 4xl:text-base">Свържи се с нас</p>
          <h2 className="mt-3 font-luxury text-3xl text-white 2xl:text-4xl 4xl:text-5xl">Запази своето сладко изживяване</h2>
          <p className="mt-2 text-white/80 2xl:text-lg 4xl:text-xl">
            Двата адреса на Cinderella's Cakes в Пловдив работят паралелно като уютни салони и работилници, а Полина лично
            консултира всяка торта - от домашни рецепти до здравословни алтернативи без захар или глутен.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
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
            </div>
            <div>
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
            </div>
          </div>
          <form className="mt-8 space-y-4 2xl:space-y-6 4xl:space-y-8">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Вашето име</label>
              <input className="theme-input mt-2 w-full rounded-2xl border px-4 py-3" placeholder="Име и фамилия" type="text" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 2xl:gap-6 4xl:gap-8">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Имейл</label>
                <input className="theme-input mt-2 w-full rounded-2xl border px-4 py-3" placeholder="example@domain.com" type="email" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Телефон</label>
                <input className="theme-input mt-2 w-full rounded-2xl border px-4 py-3" placeholder="+359 ..." type="tel" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60 2xl:text-sm 4xl:text-base">Събитие / повод / детайли</label>
              <textarea
                className="theme-input mt-2 w-full rounded-2xl border px-4 py-3"
                placeholder="Опишете тортата, брой порции или специални изисквания."
                rows={4}
              ></textarea>
            </div>
            <div>
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
            </div>
            <button className="w-full rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-base 4xl:px-12 4xl:py-5 4xl:text-lg">
              Изпрати запитване
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default HomePage










