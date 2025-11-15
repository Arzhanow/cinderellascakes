import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import LogoBadge from './LogoBadge'

const navLinks = [
  { label: 'Начало', href: '/' },
  { label: 'Принципи', href: '/#principles' },
  { label: 'За нас', href: '/#about' },
  { label: 'Продукти', href: '/#hero' },
  { label: 'Производство', href: '/#products' },
  { label: 'Контакт', href: '/#contact' },
]

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const updateNavigationHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty('--navigation-height', `${headerRef.current.offsetHeight}px`)
      }
    }

    updateNavigationHeight()
    window.addEventListener('resize', updateNavigationHeight)
    return () => window.removeEventListener('resize', updateNavigationHeight)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      ref={headerRef}
      className="sticky z-30 w-full px-0"
      style={{ top: 'var(--topbar-height)' }}
    >
      <div className="flex w-full items-center justify-between gap-3 border border-white/15 bg-brand-dusk/85 px-5 py-4 text-white shadow-[0_20px_45px_rgba(4,0,22,0.55)] backdrop-blur-2xl sm:px-8 xl:px-12 3xl:px-20 4xl:px-28">
        <div className="flex items-center gap-3 text-white">
          <LogoBadge />
          <div className="text-[0.65rem] uppercase leading-tight tracking-[0.35em] text-white/70 3xl:text-sm 4xl:text-base">
            <span className="block">Cinderella&apos;s</span>
            <span className="text-sm font-semibold tracking-[0.15em] text-white 3xl:text-base 4xl:text-lg">Cakes</span>
          </div>
        </div>

        <nav
          aria-label="Основна навигация"
          className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-white/70 lg:flex xl:text-base 3xl:text-lg"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="group relative pb-1 transition hover:text-white"
              to={link.href}
            >
              {link.label}
              <span className="absolute inset-x-0 top-full block h-0.5 origin-right scale-x-0 bg-gradient-to-r from-brand-blush to-brand-cyan transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeSwitcher />
          <Link
            className="rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-6 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-button-contrast shadow-glow-cta transition hover:-translate-y-0.5 xl:px-8 xl:py-3 xl:text-sm 3xl:px-10 3xl:py-3.5 3xl:text-base 4xl:px-12 4xl:py-4 4xl:text-lg"
            to="/#contact"
          >
            Направи запитване
          </Link>
        </div>

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
            <Link key={link.href} to={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </nav>

        <ThemeSwitcher layout="stack" />

        <Link
          className="w-full rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast"
          onClick={closeMenu}
          to="/#contact"
        >
          Направи запитване
        </Link>
      </div>
    </header>
  )
}

export default Navigation
