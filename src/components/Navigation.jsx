import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import LogoBadge from './LogoBadge'
import { createStagger, createTransition, fadeInUp, glowIn, slideIn } from '../utils/motionPresets'

const navLinks = [
  { label: 'Начало', href: '/' },
  { label: 'За нас', href: '/about' },
  { label: 'Продукти', href: '/#hero' },
  { label: 'HoReCa', href: '/horeca' },
  { label: 'Контакт', href: '/#contact' },
]

const MotionLink = motion.create(Link)

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
    <motion.header
      ref={headerRef}
      variants={slideIn('down', 85)}
      initial="hidden"
      animate="visible"
      transition={createTransition(0.35, 0.9)}
      className="fixed inset-x-0 z-40 w-full px-0"
      style={{ top: 'var(--topbar-height)' }}
    >
      <motion.div
        className="flex w-full items-center justify-between gap-3 border border-white/15 bg-brand-dusk/85 px-5 py-4 text-white shadow-[0_20px_45px_rgba(4,0,22,0.55)] backdrop-blur-2xl sm:px-8 xl:px-12 3xl:px-20 4xl:px-28"
        variants={glowIn}
        initial="hidden"
        animate="visible"
        transition={createTransition(0.2, 0.8)}
      >
        <div className="flex items-center gap-3 text-white">
          <LogoBadge />
          <span className="inline-flex items-center font-script text-3xl tracking-[0.02em] text-white/90 whitespace-nowrap leading-tight self-center relative top-1 3xl:text-[2.75rem] 4xl:text-[3.25rem]">
            Cinderella&apos;s Cakes
          </span>
        </div>

        <motion.nav
          aria-label="Основна навигация"
          className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-white/70 lg:flex xl:text-base 3xl:text-lg"
          variants={createStagger(0.07)}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <MotionLink
              key={link.href}
              className="group relative pb-1 transition hover:text-white"
              to={link.href}
              variants={fadeInUp}
              transition={createTransition(0, 0.55)}
            >
              {link.label}
              <span className="absolute inset-x-0 top-full block h-0.5 origin-right scale-x-0 bg-gradient-to-r from-brand-blush to-brand-cyan transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </MotionLink>
          ))}
        </motion.nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeSwitcher />
          <MotionLink
            className="rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-6 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-button-contrast shadow-glow-cta transition hover:-translate-y-0.5 xl:px-8 xl:py-3 xl:text-sm 3xl:px-10 3xl:py-3.5 3xl:text-base 4xl:px-12 4xl:py-4 4xl:text-lg"
            to="/#contact"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={createTransition(0, 0.35)}
          >
            Направи запитване
          </MotionLink>
        </div>

        <motion.button
          aria-expanded={menuOpen}
          aria-label="Отвори мобилното меню"
          className="inline-flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full border border-white/20 text-white transition hover:border-white/40 lg:hidden"
          onClick={toggleMenu}
          whileTap={{ scale: 0.92 }}
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
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={createTransition(0, 0.4)}
            className="fixed inset-0 z-40 flex min-h-screen flex-col items-center justify-center gap-10 bg-brand-night/95 px-8 py-12 text-center text-white lg:hidden"
          >
            <motion.button
              aria-label="Затвори меню"
              className="absolute right-8 top-8 text-4xl leading-none text-white/70"
              onClick={closeMenu}
              type="button"
              whileTap={{ scale: 0.8 }}
            >
              ×
            </motion.button>

            <motion.p
              className="font-script text-4xl text-white whitespace-nowrap"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={createTransition(0.15, 0.5)}
            >
              Cinderella&apos;s Cakes
            </motion.p>

            <motion.nav
              className="flex flex-col gap-4 text-2xl font-semibold"
              variants={createStagger(0.08)}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <MotionLink key={link.href} to={link.href} onClick={closeMenu} variants={fadeInUp}>
                  {link.label}
                </MotionLink>
              ))}
            </motion.nav>

            <ThemeSwitcher layout="stack" />

            <MotionLink
              className="w-full rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-button-contrast"
              onClick={closeMenu}
              to="/#contact"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={createTransition(0.1, 0.45)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              Направи запитване
            </MotionLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navigation

