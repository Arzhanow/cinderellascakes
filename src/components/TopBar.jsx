import { useEffect, useRef } from 'react'

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
    <div
      ref={barRef}
      className="sticky top-0 z-30 border-b border-white/15 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.18),rgba(14,12,37,0.9))] backdrop-blur-2xl"
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
    </div>
  )
}

export default TopBar
