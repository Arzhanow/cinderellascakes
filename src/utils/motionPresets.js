const baseEase = [0.22, 1, 0.36, 1]
const tempoScale = 1.15

export const createTransition = (delay = 0, duration = 0.8) => ({
  duration: duration * tempoScale,
  delay,
  ease: baseEase,
})

export const revealConfig = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
}

export const heroRevealConfig = {
  initial: 'hidden',
  animate: 'visible',
}

export const createStagger = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
}

export const floatIn = {
  hidden: { opacity: 0, y: 25, rotateX: -12 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
}

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(20px)', y: 25 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

export const tiltIn = {
  hidden: { opacity: 0, y: 35, rotateZ: -2.5 },
  visible: { opacity: 1, y: 0, rotateZ: 0 },
}

export const slideIn = (direction = 'up', distance = 45) => {
  const vertical = direction === 'up' || direction === 'down'
  const axis = vertical ? 'y' : 'x'
  const multiplier = direction === 'left' || direction === 'up' ? -1 : 1

  return {
    hidden: { opacity: 0, [axis]: multiplier * distance },
    visible: { opacity: 1, [axis]: 0 },
  }
}

export const popIn = {
  hidden: { opacity: 0, scale: 0.85, rotateX: 6 },
  visible: { opacity: 1, scale: 1, rotateX: 0 },
}

export const glowIn = {
  hidden: { opacity: 0, filter: 'brightness(0.6) blur(8px)', scale: 0.97 },
  visible: { opacity: 1, filter: 'brightness(1) blur(0px)', scale: 1 },
}
