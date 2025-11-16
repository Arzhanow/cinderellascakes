import { useMemo } from 'react'

const CAKE_IMAGES = [
  '/images/fallingcakes/element_chococake.png',
  '/images/fallingcakes/element_coconut.png',
  '/images/fallingcakes/element_cream.png',
  '/images/fallingcakes/element_fruits.png',
  '/images/fallingcakes/element_strawberry.png',
]

const MIN_PARTICLES = 40
const MAX_PARTICLES = 80

const randomBetween = (min, max) => Math.random() * (max - min) + min
const randomInt = (min, max) => Math.floor(randomBetween(min, max + 1))

const buildParticles = () => {
  const total = randomInt(MIN_PARTICLES, MAX_PARTICLES)

  return Array.from({ length: total }, (_, index) => {
    const scale = Number(randomBetween(0.4, 0.9).toFixed(2))
    const fallDuration = Number(randomBetween(8, 18).toFixed(2))
    const spinDuration = Number(randomBetween(12, 24).toFixed(2))
    const fallDelay = Number(randomBetween(0, 10).toFixed(2))
    const spinDelay = Number(randomBetween(0, 8).toFixed(2))
    const rotationRange = Number(randomBetween(6, 25).toFixed(2))
    const rotationDirection = Math.random() > 0.5 ? 1 : -1
    const rotationStart = `${rotationDirection * -rotationRange}deg`
    const rotationEnd = `${rotationDirection * rotationRange}deg`
    const originX = Number(randomBetween(15, 85).toFixed(2))
    const originY = Number(randomBetween(10, 90).toFixed(2))
    const width = Math.round(randomBetween(60, 110))
    const offset = Number(randomBetween(-20, -5).toFixed(2))

    return {
      id: `cake-particle-${index}`,
      src: CAKE_IMAGES[Math.floor(Math.random() * CAKE_IMAGES.length)],
      left: Number(randomBetween(0, 100).toFixed(2)),
      top: offset,
      width,
      scale,
      fallDuration,
      fallDelay,
      spinDuration,
      spinDelay,
      rotationStart,
      rotationEnd,
      transformOrigin: `${originX}% ${originY}%`,
    }
  })
}

const FallingCakesBackground = () => {
  const particles = useMemo(() => buildParticles(), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <img
          key={particle.id}
          src={particle.src}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute select-none opacity-0 mix-blend-screen animate-fall-and-fade"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.width}px`,
            animationDuration: `${particle.fallDuration}s, ${particle.spinDuration}s`,
            animationDelay: `${particle.fallDelay}s, ${particle.spinDelay}s`,
            transformOrigin: particle.transformOrigin,
            '--cake-scale': particle.scale,
            '--cake-rotation-start': particle.rotationStart,
            '--cake-rotation-end': particle.rotationEnd,
          }}
        />
      ))}
    </div>
  )
}

export default FallingCakesBackground
