import { Canvas, useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'

const LOGO_MODEL_SRC = '/models/cinderella3D.glb'

const LogoLoading = () => (
  <Html center>
    <span className="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-white"></span>
  </Html>
)

const CinderellaLogo = () => {
  const { scene } = useGLTF(LOGO_MODEL_SRC)
  const groupRef = useRef(null)
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.35, 0]} scale={0.9}>
      <primitive object={clonedScene} />
    </group>
  )
}

const LogoBadge = ({ className = 'h-12 w-12 3xl:h-16 3xl:w-16 4xl:h-20 4xl:w-20' }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0.8, 3], fov: 28 }}
        className="absolute inset-0"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} color="#ffd6ff" />
        <directionalLight position={[-2, 2, 2]} intensity={0.8} color="#a5f0ff" />
        <Suspense fallback={<LogoLoading />}>
          <CinderellaLogo />
        </Suspense>
      </Canvas>
      <span className="pointer-events-none absolute inset-0 rounded-full border border-white/15 bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-[0_10px_25px_rgba(4,0,22,0.35)]"></span>
      <span className="sr-only">Cinderella&apos;s Cakes logo</span>
    </div>
  )
}

useGLTF.preload(LOGO_MODEL_SRC)

export default LogoBadge
