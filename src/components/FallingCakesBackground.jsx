import { useMemo } from 'react'

const CAKE_IMAGES = [
  '/images/fallingcakes/element_chococake.png',
  '/images/fallingcakes/element_coconut.png',
  '/images/fallingcakes/element_cream.png',
  '/images/fallingcakes/element_fruits.png',
  '/images/fallingcakes/element_strawberry.png',
]

const MIN_PARTICLES = 80
const MAX_PARTICLES = 140

const randomBetween = (min, max) => Math.random() * (max - min) + min
const randomInt = (min, max) => Math.floor(randomBetween(min, max + 1))

const randomViewportCoord = (min, max, unit) => `${randomBetween(min, max).toFixed(2)}${unit}`

const buildParticles = () => {
  const total = randomInt(MIN_PARTICLES, MAX_PARTICLES)

  return Array.from({ length: total }, (_, index) => {
    const scale = Number(randomBetween(0.4, 0.9).toFixed(2))
    const fallDuration = Number(randomBetween(4, 11).toFixed(2))
    const spinDuration = Number(randomBetween(5, 14).toFixed(2))
    const fallDelay = Number(randomBetween(0, 8).toFixed(2))
    const spinDelay = Number(randomBetween(0, 6).toFixed(2))
    const rotationRange = Number(randomBetween(10, 35).toFixed(2))
    const rotationDirection = Math.random() > 0.5 ? 1 : -1
    const rotationStart = `${rotationDirection * -rotationRange}deg`
    const rotationEnd = `${rotationDirection * rotationRange}deg`
    const originX = Number(randomBetween(15, 85).toFixed(2))
    const originY = Number(randomBetween(10, 90).toFixed(2))
    const width = Math.round(randomBetween(50, 110))
    const startX = randomViewportCoord(-15, 115, 'vw')
    const startY = randomViewportCoord(-20, 110, 'vh')
    const midX = randomViewportCoord(-30, 130, 'vw')
    const midY = randomViewportCoord(-10, 120, 'vh')
    const endX = randomViewportCoord(-20, 120, 'vw')
    const endY = randomViewportCoord(90, 150, 'vh')

    return {
      id: `cake-particle-${index}`,
      src: CAKE_IMAGES[Math.floor(Math.random() * CAKE_IMAGES.length)],
      startX,
      startY,
      midX,
      midY,
      endX,
      endY,
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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <img
          key={particle.id}
          src={particle.src}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute top-0 left-0 select-none opacity-0 mix-blend-screen animate-fall-and-fade"
          style={{
            top: 0,
            left: 0,
            width: `${particle.width}px`,
            animationDuration: `${particle.fallDuration}s, ${particle.spinDuration}s`,
            animationDelay: `${particle.fallDelay}s, ${particle.spinDelay}s`,
            transformOrigin: particle.transformOrigin,
            '--cake-scale': particle.scale,
            '--cake-start-x': particle.startX,
            '--cake-start-y': particle.startY,
            '--cake-mid-x': particle.midX,
            '--cake-mid-y': particle.midY,
            '--cake-end-x': particle.endX,
            '--cake-end-y': particle.endY,
            '--cake-rotation-start': particle.rotationStart,
            '--cake-rotation-end': particle.rotationEnd,
          }}
        />
      ))}
    </div>
  )
}

export default FallingCakesBackground
