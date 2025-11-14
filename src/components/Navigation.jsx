import { useState } from 'react'

const navLinks = [
  { label: 'Начало', href: '#home' },
  { label: 'За нас', href: '#about' },
  { label: 'Продукти', href: '#products' },
  { label: 'Истории', href: '#stories' },
  { label: 'Услуги', href: '#services' },
  { label: 'Контакт', href: '#contact' },
]

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-16 z-20 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[999px] border border-white/15 bg-brand-dusk/80 px-5 py-3 shadow-[0_20px_45px_rgba(4,0,22,0.55)] backdrop-blur-2xl lg:px-8">
        <div className="flex items-center gap-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-blush to-brand-lilac text-sm font-bold tracking-[0.08em] text-brand-night">
            CC
          </span>
          <div className="text-[0.65rem] uppercase leading-tight tracking-[0.35em] text-white/70">
            <span className="block">Cinderella&apos;s</span>
            <span className="text-sm font-semibold tracking-[0.15em] text-white">Cakes</span>
          </div>
        </div>

        <nav
          aria-label="Основна навигация"
          className="hidden items-center gap-6 text-sm font-medium text-white/60 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="group relative pb-1 transition hover:text-white"
              href={link.href}
            >
              {link.label}
              <span className="absolute inset-x-0 top-full block h-0.5 origin-right scale-x-0 bg-gradient-to-r from-brand-blush to-brand-cyan transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </a>
          ))}
        </nav>

        <button className="hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-night shadow-glow-cta transition hover:-translate-y-0.5 lg:inline-flex">
          Запази дегустация
        </button>

        <button
          aria-expanded={menuOpen}
          aria-label="Отвори мобилното меню"
          className="inline-flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full border border-white/20 text-white transition hover:border-white/40 lg:hidden"
          onClick={toggleMenu}
          type="button"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition ${
              menuOpen ? 'translate-y-1 rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition ${
              menuOpen ? '-translate-y-1 -rotate-45' : 'translate-y-1'
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-brand-night/95 px-6 py-20 text-white transition duration-300 lg:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between text-lg font-semibold">
          <p>Потопи се в света на Cinderella&apos;s Cakes</p>
          <button
            aria-label="Затвори меню"
            className="text-4xl leading-none text-white/70"
            onClick={closeMenu}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-4 text-2xl font-semibold">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="mt-10 w-full rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night"
          onClick={closeMenu}
          type="button"
        >
          Запази дегустация
        </button>
      </div>
    </header>
  )
}

export default Navigation
