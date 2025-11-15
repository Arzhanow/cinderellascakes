import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { createTransition, slideIn } from '../utils/motionPresets'

const TopBar = () => {
  const barRef = useRef(null)

  useEffect(() => {
    const updateTopBarHeight = () => {
      if (barRef.current) {
        document.documentElement.style.setProperty('--topbar-height', `${barRef.current.offsetHeight}px`)
      }
    }

    updateTopBarHeight()
    window.addEventListener('resize', updateTopBarHeight)
    return () => window.removeEventListener('resize', updateTopBarHeight)
  }, [])

  return (
    <motion.div
      ref={barRef}
      variants={slideIn('down', 65)}
      initial="hidden"
      animate="visible"
      transition={createTransition(0.2, 0.9)}
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/15 bg-brand-night shadow-[0_25px_45px_rgba(4,0,22,0.65)]"
    >
      <div className="layout-shell flex flex-wrap items-center justify-between gap-2 py-2 text-[0.7rem] uppercase tracking-[0.42em] text-white/80 sm:text-[0.75rem] 3xl:gap-4 3xl:text-sm 4xl:text-base">
        <span className="font-semibold">Серии без захар и без брашно · Премиум ръчна изработка</span>
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] tracking-[0.2em] text-brand-cyan 3xl:text-sm 4xl:text-base">
          <a
            className="font-semibold transition-colors hover:text-brand-blush"
            href="tel:+359884123456"
          >
            +359 88 412 34 56
          </a>
          <span aria-hidden="true" className="text-white/40">
            /
          </span>
          <a
            className="font-semibold transition-colors hover:text-brand-blush"
            href="mailto:hello@cinderellascakes.bg"
          >
            hello@cinderellascakes.bg
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default TopBar
