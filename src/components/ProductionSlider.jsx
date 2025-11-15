import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/production-slider.css'

 const wrapIndex = (value, length) => {
   if (length === 0) {
     return 0
   }
   return (value % length + length) % length
 }

const backgroundTransition = {
  duration: 0.8,
  ease: [0.4, 0, 0.2, 1],
}

const ProductionSlider = ({ slides = [], initialIndex = 0, onSlideSelect }) => {
  const [activeIndex, setActiveIndex] = useState(() => wrapIndex(initialIndex, slides.length || 1))
  const normalizedIndex = slides.length ? wrapIndex(activeIndex, slides.length) : 0

  const selectIndex = (nextIndex) => {
    if (!slides.length) return
    const resolvedIndex = wrapIndex(nextIndex, slides.length)
    setActiveIndex(resolvedIndex)
    onSlideSelect?.(slides[resolvedIndex], resolvedIndex)
  }

  const activeSlide = slides[normalizedIndex] ?? null

  const getState = (index) => {
    if (!slides.length) return 'rest'
    if (index === normalizedIndex) return 'current'
    if (index === wrapIndex(normalizedIndex + 1, slides.length)) return 'next'
    if (index === wrapIndex(normalizedIndex - 1, slides.length)) return 'previous'
    return 'rest'
  }

  const changeSlide = (direction) => {
    selectIndex(normalizedIndex + direction)
  }

  return (
    <div className="production-slider" role="region" aria-label="Услуги производство">
      <div className="production-slider__viewport">
        <div className="production-slider__stack" aria-live="polite">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className="production-slide"
              data-state={getState(index)}
              aria-current={index === normalizedIndex}
              onClick={() => selectIndex(index)}
            >
              <div className="production-slide__inner">
                <img
                  src={slide.image}
                  alt={slide.imageAlt ?? slide.title}
                   loading={index === 0 ? 'eager' : 'lazy'}
                   className="production-slide__image"
                 />
                 <div className="production-slide__gradient" />
                 <div className="production-slide__content">
                   <span className="production-slide__eyebrow">{slide.eyebrow}</span>
                   <span className="production-slide__title">{slide.title}</span>
                   <span className="production-slide__subtitle">{slide.subtitle}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="production-slider__background" aria-hidden="true">
          <AnimatePresence mode="wait">
            {activeSlide && (
              <motion.div
                key={activeSlide.id}
                className="production-slider__background-layer"
                style={{ backgroundImage: `url(${activeSlide.backdrop ?? activeSlide.image})` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={backgroundTransition}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="production-slider__controls">
          <button
            className="production-slider__control-btn"
            type="button"
            onClick={() => changeSlide(-1)}
          >
            <span className="sr-only">Предишна услуга</span>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 6L8 12L14 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="production-slider__control-btn"
            type="button"
            onClick={() => changeSlide(1)}
          >
            <span className="sr-only">Следваща услуга</span>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 6L16 12L10 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="production-slider__bullets">
          {slides.map((slide, index) => (
            <button
              key={`${slide.id}-bullet`}
              type="button"
              className="production-slider__bullet"
              aria-current={index === activeIndex}
              onClick={() => selectIndex(index)}
            >
              <span className="sr-only">{slide.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductionSlider
