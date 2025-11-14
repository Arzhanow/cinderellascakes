const TopBar = () => {
  return (
    <div className="sticky top-0 z-30 border-b border-white/15 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.18),rgba(14,12,37,0.9))] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-2 text-[0.7rem] uppercase tracking-[0.42em] text-white/80 sm:text-[0.75rem]">
        <span className="font-semibold">Ръчно изработени торти с магия и научна прецизност</span>
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] tracking-[0.2em] text-brand-cyan">
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
