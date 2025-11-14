const heroHighlights = [
  'Бутер торти без захар и брашно',
  'Луксозно дигитално портфолио',
  'Кетъринг за хотели и бутици',
]

const HomePage = () => {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-14 lg:grid-cols-[1.1fr_0.9fr]" id="home">
      <div className="text-white">
        <p className="text-xs uppercase tracking-[0.7em] text-white/60">Cinderella’s Cakes · Пловдив</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Сайт, който крещи <span className="text-brand-blush">лукс</span> и оставя вкусов спомен още преди
          първата хапка.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-white/75">
          Създаваме дигитална витрина за най-артистичната сладкарница в България – синтез на феерия,
          внимателно визуално разказване и ръчно подбрани съставки. Всичко е responsive, бързо и напълно двуезично.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-night shadow-glow-primary transition hover:-translate-y-1">
            Виж магията
          </button>
          <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-white">
            Каталог за B2B
          </button>
        </div>

        <div className="mt-8 grid gap-3">
          {heroHighlights.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-brand-accent to-brand-cyan shadow-[0_0_15px_rgba(255,176,247,0.5)]"></span>
              <p className="text-sm font-medium text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 px-6 py-20 text-center text-white/75">
        <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,176,247,0.85),transparent_65%)] blur-lg"></div>
        <div className="pointer-events-none absolute -bottom-10 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(130,210,255,0.85),transparent_70%)] blur-[35px]"></div>
        <div className="relative text-lg leading-relaxed">
          <p>Скоро тук ще живее дигитална сцена за най-емблематичните вкусове.</p>
        </div>
      </div>
    </main>
  )
}

export default HomePage
