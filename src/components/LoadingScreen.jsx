import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const themePalettes = {
  midnight: {
    background: 'radial-gradient(circle at 20% 20%, #2b0f4e 0%, #090114 55%, #020007 100%)',
    text: '#f8f5ff',
    textMuted: 'rgba(248, 245, 255, 0.75)',
    label: 'rgba(248, 245, 255, 0.6)',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    accent: '#fbd0ff',
    accentAlt: '#8be9fd',
    ringTrack: 'rgba(255, 255, 255, 0.12)',
    ringBackground: 'rgba(8, 0, 18, 0.92)',
    ringShadow: '0 0 35px rgba(219, 173, 255, 0.4)',
    shadowTint: '#14041f',
  },
  rose: {
    background: 'radial-gradient(circle at 20% 20%, #fff7fb 0%, #f6cfe3 55%, #ea9fc7 100%)',
    text: '#2d1221',
    textMuted: 'rgba(45, 18, 33, 0.75)',
    label: 'rgba(45, 18, 33, 0.55)',
    cardBorder: 'rgba(45, 18, 33, 0.15)',
    accent: '#c6407b',
    accentAlt: '#8740f2',
    ringTrack: 'rgba(45, 18, 33, 0.2)',
    ringBackground: 'rgba(255, 255, 255, 0.95)',
    ringShadow: '0 0 35px rgba(198, 64, 123, 0.3)',
    shadowTint: '#b4457d',
  },
  peach: {
    background: 'radial-gradient(circle at 20% 20%, #fff4ec 0%, #f8cfac 60%, #f0a873 100%)',
    text: '#3d1b07',
    textMuted: 'rgba(61, 27, 7, 0.78)',
    label: 'rgba(61, 27, 7, 0.6)',
    cardBorder: 'rgba(61, 27, 7, 0.17)',
    accent: '#ef5a2c',
    accentAlt: '#f3a536',
    ringTrack: 'rgba(61, 27, 7, 0.25)',
    ringBackground: 'rgba(255, 252, 248, 0.95)',
    ringShadow: '0 0 35px rgba(239, 90, 44, 0.3)',
    shadowTint: '#c96337',
  },
}

const CinderellaModel = () => {
  const { scene } = useGLTF('/models/cinderella3D.glb')
  const clonedScene = useMemo(() => scene.clone(true), [scene])
  const groupRef = useRef(null)

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5} position={[0, 0.2, 0]}>
      <group ref={groupRef} position={[0, -0.65, 0]} scale={[1.15, 1.15, 1.15]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  )
}

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const { theme } = useTheme()
  const palette = themePalettes[theme] ?? themePalettes.midnight
  const {
    background,
    text,
    textMuted,
    label,
    cardBorder,
    accent,
    accentAlt,
    ringTrack,
    ringBackground,
    ringShadow,
    shadowTint,
  } = palette

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextValue = Math.min(prev + 1, 100)
        if (nextValue === 100) {
          clearInterval(interval)
        }
        return nextValue
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const shouldFadeOut = progress >= 100

  useEffect(() => {
    if (shouldFadeOut && typeof onComplete === 'function') {
      const timeout = setTimeout(() => onComplete(), 500)
      return () => clearTimeout(timeout)
    }
  }, [shouldFadeOut, onComplete])

  const arc = (progress / 100) * 360
  const progressStyle = useMemo(
    () => ({
      background: `conic-gradient(${accent} ${arc}deg, ${ringTrack} ${arc}deg 360deg)`,
    }),
    [accent, arc, ringTrack],
  )

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        shouldFadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background,
        color: text,
      }}
    >
      <div className="flex w-full max-w-[420px] flex-col items-center gap-10 px-4 text-center sm:gap-12">
        <div className="relative h-48 w-full sm:h-56">
          <Canvas
            className="relative h-full w-full"
            camera={{ position: [0.3, 0.8, 3], fov: 30 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 5, 2]} intensity={1.2} color={accent} />
            <directionalLight position={[-4, 3, -2]} intensity={0.6} color={accentAlt} />
            <Suspense fallback={null}>
              <CinderellaModel />
              <Environment preset="studio" />
              <ContactShadows
                position={[0, -1, 0]}
                opacity={0.5}
                blur={2.5}
                far={4}
                scale={5}
                color={shadowTint}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative h-32 w-32 sm:h-36 sm:w-36">
            <div
              className="absolute inset-0 rounded-full p-[2px]"
              style={progressStyle}
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-full"
                style={{
                  background: ringBackground,
                  boxShadow: ringShadow,
                }}
              >
                <span
                  aria-live="polite"
                  className="text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {progress}%
                </span>
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-1 rounded-full"
              style={{ border: `1px solid ${cardBorder}` }}
            ></div>
          </div>
          <p
            className="text-[0.75rem] uppercase tracking-[0.5em]"
            style={{ color: label }}
          >
            Зареждане
          </p>
          <p className="max-w-xs text-sm" style={{ color: textMuted }}>
            Приказката започва...
          </p>
        </div>
      </div>
    </div>
  )
}

useGLTF.preload('/models/cinderella3D.glb')

export default LoadingScreen
