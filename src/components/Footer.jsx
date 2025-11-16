import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, revealConfig, slideIn, createTransition } from '../utils/motionPresets'
import { navLinks } from './Navigation'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="mt-16 border-t border-white/10 bg-brand-dusk/60 py-12 text-white/80 backdrop-blur-2xl 3xl:mt-24 4xl:mt-32"
      id="contact"
      variants={fadeInUp}
      {...revealConfig}
      transition={createTransition(0.1, 0.8)}
    >
      <div className="layout-shell space-y-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-black/25"
            variants={slideIn('left', 40)}
            transition={createTransition(0.2, 0.7)}
            {...revealConfig}
          >
            <p className="text-xs uppercase tracking-[0.45em] text-white/60 2xl:text-sm 4xl:text-base">Cinderella's Cakes</p>
            <p className="mt-4 text-3xl font-semibold text-white 2xl:text-4xl 4xl:text-5xl">Луксозна сладкарница в Пловдив</p>
            <p className="mt-4 text-base text-white/70 2xl:text-lg 4xl:text-xl">
              Празнични торти и изискани десерти за хора, които ценят чистите вкусове и фината изработка.
            </p>
            <address className="mt-6 not-italic space-y-2 text-sm text-white/70 2xl:text-base">
              <a
                className="inline-flex w-fit items-center font-semibold text-white transition-colors hover:text-brand-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blush/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                href="mailto:alatinovapolina@gmail.com"
              >
                alatinovapolina@gmail.com
              </a>
              <a
                className="block font-semibold text-white transition-colors hover:text-brand-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blush/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                href="tel:+359885493040"
              >
                +359 88 549 3040
              </a>
            </address>
          </motion.div>
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/0 p-6"
            variants={slideIn('right', 40)}
            transition={createTransition(0.25, 0.7)}
            {...revealConfig}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Свързани секции</p>
            <nav aria-label="Footer navigation">
              <ul className="mt-4 space-y-3 text-sm font-semibold text-white 2xl:text-base">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex w-fit items-center transition-colors hover:text-brand-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blush/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      to={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.35em] text-white/60 2xl:text-sm 4xl:text-base"
          variants={slideIn('up', 20)}
          transition={createTransition(0.25, 0.7)}
          {...revealConfig}
        >
          <span>© {currentYear} Cinderella's Cakes</span>
          <span className="text-white/40">Луксозна сладкарница в Пловдив</span>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
