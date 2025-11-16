import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { createTransition, slideIn } from '../utils/motionPresets'

const TopBar = () => {
  const barRef = useRef(null)

  useEffect(() => {
    const updateTopBarHeight = () => {
      const element = barRef.current
      if (!element) {
        document.documentElement.style.setProperty('--topbar-height', '0px')
        return
      }

      const computedStyle = window.getComputedStyle(element)
      const isHidden = computedStyle.display === 'none'
      const nextHeight = isHidden ? 0 : element.offsetHeight

      document.documentElement.style.setProperty('--topbar-height', `${nextHeight}px`)
    }

    updateTopBarHeight()

    const topBarElement = barRef.current
    let resizeObserver
    const handleResize = () => updateTopBarHeight()
    let mediaQuery

    if (topBarElement && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(topBarElement)
    } else {
      window.addEventListener('resize', handleResize)
    }

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      mediaQuery = window.matchMedia('(min-width: 768px)')
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleResize)
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleResize)
      }
    }

    return () => {
      if (resizeObserver && topBarElement) {
        resizeObserver.unobserve(topBarElement)
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', handleResize)
      }

      if (mediaQuery) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleResize)
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handleResize)
        }
      }
    }
  }, [])

  return (
    <motion.div
      ref={barRef}
      variants={slideIn('down', 65)}
      initial="hidden"
      animate="visible"
      transition={createTransition(0.2, 0.9)}
      className="fixed inset-x-0 top-0 z-50 hidden w-full border-b border-white/15 bg-brand-night shadow-[0_25px_45px_rgba(4,0,22,0.65)] md:block"
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
            href="mailto:alatinovapolina@gmail.com"
          >
            alatinovapolina@gmail.com
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default TopBar
