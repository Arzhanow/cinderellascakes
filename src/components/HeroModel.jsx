const HeroModel = ({ eyebrow, label, modelSrc, slideId }) => {
  return (
    <div className="flex flex-col gap-6 text-white">
      <div
        aria-label={`${label} 3D модел`}
        className="relative isolate h-[360px] w-full overflow-hidden rounded-[28px] border border-white/15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_70%)]"
        data-model-id={slideId}
        data-model-src={modelSrc}
        id={`hero-model-${slideId}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent_60%)]"></div>
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl"></div>
        <div className="pointer-events-none absolute inset-8 rounded-[32px] border border-white/10"></div>
        <div className="pointer-events-none absolute inset-x-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full border border-white/30"></div>
      </div>

      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">{eyebrow}</p>
        <h2 className="mt-3 font-luxury text-3xl text-white">{label}</h2>
      </div>
    </div>
  )
}

export default HeroModel
