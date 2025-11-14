const Footer = () => {
  return (
    <footer
      className="mt-16 border-t border-white/10 bg-brand-dusk/50 px-6 py-10 text-white/80 backdrop-blur-xl"
      id="contact"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-white/50">Cinderella’s Cakes</p>
          <p className="text-2xl font-semibold text-white">Луксозна сладкария от Пловдив</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-white">
          <a className="transition hover:text-brand-blush" href="mailto:hello@cinderellascakes.bg">
            hello@cinderellascakes.bg
          </a>
          <a className="transition hover:text-brand-blush" href="tel:+359884123456">
            +359 88 412 34 56
          </a>
          <a className="transition hover:text-brand-blush" href="#services">
            Услуги
          </a>
          <a className="transition hover:text-brand-blush" href="#products">
            Продукти
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.35em] text-white/60">
        <span>© {new Date().getFullYear()} Cinderella’s Cakes</span>
        <span>Създадено с React + Vite</span>
      </div>
    </footer>
  )
}

export default Footer
