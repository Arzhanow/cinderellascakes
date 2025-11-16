import { motion } from 'framer-motion'
import { fadeInUp, revealConfig, slideIn, createTransition } from '../utils/motionPresets'

const Footer = () => {
  return (
    <motion.footer
      className="mt-16 border-t border-white/10 bg-brand-dusk/50 py-10 text-white/80 backdrop-blur-xl 3xl:mt-24 4xl:mt-32"
      id="contact"
      variants={fadeInUp}
      {...revealConfig}
      transition={createTransition(0.1, 0.8)}
    >
      <div className="layout-shell flex flex-wrap items-center justify-between gap-6">
        <motion.div variants={slideIn('left', 40)} transition={createTransition(0.2, 0.7)} {...revealConfig}>
          <p className="text-xs uppercase tracking-[0.45em] text-white/50 2xl:text-sm 4xl:text-base">Cinderella’s Cakes</p>
          <p className="text-2xl font-semibold text-white 2xl:text-3xl 4xl:text-4xl">Луксозна сладкария от Пловдив</p>
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-4 text-sm font-semibold text-white 2xl:text-base 4xl:text-lg"
          variants={slideIn('right', 40)}
          transition={createTransition(0.3, 0.7)}
          {...revealConfig}
        >
          <a className="transition hover:text-brand-blush" href="mailto:alatinovapolina@gmail.com">
            alatinovapolina@gmail.com
          </a>
          <a className="transition hover:text-brand-blush" href="tel:+359884123456">
            +359 88 412 34 56
          </a>
          <a className="transition hover:text-brand-blush" href="/horeca">
            HoReCa
          </a>
          <a className="transition hover:text-brand-blush" href="#products">
            Продукти
          </a>
        </motion.div>
      </div>
      <motion.div
        className="layout-shell mt-6 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.35em] text-white/60 2xl:text-sm 4xl:text-base"
        variants={slideIn('up', 20)}
        transition={createTransition(0.25, 0.7)}
        {...revealConfig}
      >
        <span>© {new Date().getFullYear()} Cinderella’s Cakes</span>
        <span>Създадено с React + Vite</span>
      </motion.div>
    </motion.footer>
  )
}

export default Footer
