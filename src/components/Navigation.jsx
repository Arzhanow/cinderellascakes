import { useState } from 'react'

const navLinks = [
  { label: 'Начало', href: '#home' },
  { label: 'Принципи', href: '#principles' },
  { label: 'За нас', href: '#about' },
  { label: 'Продукти', href: '#products' },
  { label: 'Производство', href: '#services' },
  { label: 'Контакт', href: '#contact' },
]

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className="sticky z-30 w-screen max-w-[100vw] px-0"
      style={{ top: 'var(--topbar-height)' }}
    >
      <div className="flex w-screen max-w-[100vw] items-center justify-between gap-3 border border-white/15 bg-brand-dusk/85 px-5 py-4 text-white shadow-[0_20px_45px_rgba(4,0,22,0.55)] backdrop-blur-2xl sm:px-8 lg:rounded-[999px]">
        <div className="flex items-center gap-3 text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-blush to-brand-lilac text-base font-bold tracking-[0.08em] text-brand-night">
            CC
          </span>
          <div className="text-[0.65rem] uppercase leading-tight tracking-[0.35em] text-white/70">
            <span className="block">Cinderella&apos;s</span>
            <span className="text-sm font-semibold tracking-[0.15em] text-white">Cakes</span>
          </div>
        </div>

        <nav
          aria-label="Основна навигация"
          className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-white/70 lg:flex"
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

        <button className="hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-6 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-night shadow-glow-cta transition hover:-translate-y-0.5 lg:inline-flex">
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
        className={`fixed inset-0 z-40 flex min-h-screen flex-col items-center justify-center gap-10 bg-brand-night/95 px-8 py-12 text-center text-white transition duration-300 lg:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          aria-label="Затвори меню"
          className="absolute right-8 top-8 text-4xl leading-none text-white/70"
          onClick={closeMenu}
          type="button"
        >
          ×
        </button>

        <p className="font-luxury text-2xl text-white">Cinderella&apos;s Cakes</p>

        <nav className="flex flex-col gap-4 text-2xl font-semibold">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="w-full rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night"
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
