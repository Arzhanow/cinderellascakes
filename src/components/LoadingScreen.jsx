import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import FallingCakesBackground from './FallingCakesBackground'

const themePalettes = {
  midnight: {
    background: 'radial-gradient(circle at 20% 20%, #2b0f4e 0%, #090114 55%, #020007 100%)',
    text: '#f8f5ff',
    textMuted: 'rgba(248, 245, 255, 0.75)',
    label: 'rgba(248, 245, 255, 0.6)',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    accent: '#fbd0ff',
    ringTrack: 'rgba(255, 255, 255, 0.12)',
    ringBackground: 'rgba(8, 0, 18, 0.92)',
    ringShadow: '0 0 35px rgba(219, 173, 255, 0.4)',
  },
  rose: {
    background: 'radial-gradient(circle at 20% 20%, #fff7fb 0%, #f6cfe3 55%, #ea9fc7 100%)',
    text: '#2d1221',
    textMuted: 'rgba(45, 18, 33, 0.75)',
    label: 'rgba(45, 18, 33, 0.55)',
    cardBorder: 'rgba(45, 18, 33, 0.15)',
    accent: '#c6407b',
    ringTrack: 'rgba(45, 18, 33, 0.2)',
    ringBackground: 'rgba(255, 255, 255, 0.95)',
    ringShadow: '0 0 35px rgba(198, 64, 123, 0.3)',
  },
  peach: {
    background: 'radial-gradient(circle at 20% 20%, #fff4ec 0%, #f8cfac 60%, #f0a873 100%)',
    text: '#3d1b07',
    textMuted: 'rgba(61, 27, 7, 0.78)',
    label: 'rgba(61, 27, 7, 0.6)',
    cardBorder: 'rgba(61, 27, 7, 0.17)',
    accent: '#ef5a2c',
    ringTrack: 'rgba(61, 27, 7, 0.25)',
    ringBackground: 'rgba(255, 252, 248, 0.95)',
    ringShadow: '0 0 35px rgba(239, 90, 44, 0.3)',
  },
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())

const LoadingScreen = ({
  blocking = false,
  isReady = false,
  minVisibleTime = 900,
  onComplete,
  speedMultiplier = 1,
}) => {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const mountedAtRef = useRef(now())
  const { theme } = useTheme()
  const palette = themePalettes[theme] ?? themePalettes.midnight
  const { background, text, label, cardBorder, accent, ringTrack, ringBackground, ringShadow } = palette

  useEffect(() => {
    const normalizedSpeed = Number.isFinite(speedMultiplier) && speedMultiplier > 0 ? speedMultiplier : 1
    const interval = setInterval(() => {
      setProgress((prev) => {
        const target = blocking ? (isReady ? 100 : 95) : 100
        if (prev >= target) {
          return prev
        }
        const baseDelta = blocking ? (isReady ? 4 : 1.2) : 2.4
        const delta = baseDelta * normalizedSpeed
        return Math.min(prev + delta, target)
      })
    }, Math.max(16, 30 / normalizedSpeed))

    return () => clearInterval(interval)
  }, [blocking, isReady, speedMultiplier])

  const readyToClose = progress >= 100 && (!blocking || isReady)

  useEffect(() => {
    if (!readyToClose || isFadingOut) {
      return undefined
    }

    const elapsed = now() - mountedAtRef.current
    const waitTime = Math.max(0, minVisibleTime - elapsed)
    const timeout = setTimeout(() => setIsFadingOut(true), waitTime)
    return () => clearTimeout(timeout)
  }, [readyToClose, isFadingOut, minVisibleTime])

  useEffect(() => {
    if (!isFadingOut || typeof onComplete !== 'function') {
      return undefined
    }
    const timeout = setTimeout(() => onComplete(), 450)
    return () => clearTimeout(timeout)
  }, [isFadingOut, onComplete])

  const arc = (progress / 100) * 360
  const progressStyle = useMemo(
    () => ({
      background: `conic-gradient(${accent} ${arc}deg, ${ringTrack} ${arc}deg 360deg)`,
    }),
    [accent, arc, ringTrack],
  )

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-xl transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background,
        color: text,
      }}
    >
      <FallingCakesBackground />
      <div className="flex w-full max-w-[420px] flex-col items-center gap-8 px-4 text-center sm:gap-10">
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <div className="relative h-32 w-32 sm:h-36 sm:w-36">
            <div className="absolute inset-0 rounded-full p-[2px]" style={progressStyle}>
              <div
                className="flex h-full w-full items-center justify-center rounded-full"
                style={{
                  background: ringBackground,
                  boxShadow: ringShadow,
                }}
              >
                <span aria-live="polite" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-1 rounded-full" style={{ border: `1px solid ${cardBorder}` }}></div>
          </div>
          <p className="text-sm uppercase tracking-[0.4em]" style={{ color: label }}>
            Приказката започва
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
