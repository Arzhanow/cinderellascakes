import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Html, OrbitControls, PerformanceMonitor, useGLTF } from '@react-three/drei'
import { Box3, MathUtils, Vector3 } from 'three'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, useId } from 'react'
import { HERO_ENV_TEXTURE } from '../constants/environment'

const resolveModelSettings = (modelSettings = {}, viewport = 'desktop') => {
  const { responsive = {}, ...baseSettings } = modelSettings ?? {}
  const fallbackOverrides =
    responsive.desktopXL || responsive.desktop || responsive.laptop || responsive.tablet || responsive.mobile || {}

  const merged = {
    modelScale: 0.92,
    modelYOffset: -0.9,
    cameraPosition: [0, 1.35, 1.95],
    orbitTarget: [0, -0.28, 0],
    fov: 32,
    lockOrientation: false,
    orbitAzimuthRange: null,
    modelRotationY: null,
    rotationSpeed: 0.35,
    modelOrientation: null,
    modelOrientationDeg: null,
    swapBacktrackRad: null,
    swapBacktrackDeg: null,
    canvasYOffset: viewport === 'mobile' ? -96 : 0,
    allowPointerInteraction: false,
    ...baseSettings,
    ...fallbackOverrides,
    ...(responsive[viewport] ?? {}),
  }

  const swapBacktrackRad =
    typeof merged.swapBacktrackRad === 'number'
      ? merged.swapBacktrackRad
      : typeof merged.swapBacktrackDeg === 'number'
        ? degToRad(merged.swapBacktrackDeg)
        : null

  return {
    ...merged,
    swapBacktrackRad,
  }
}

const viewportQueries = [
  { name: 'mobile', query: '(max-width: 639px)' },
  { name: 'tablet', query: '(min-width: 640px) and (max-width: 1023px)' },
  { name: 'laptop', query: '(min-width: 1024px) and (max-width: 1439px)' },
  { name: 'desktop', query: '(min-width: 1440px) and (max-width: 1919px)' },
  { name: 'desktopXL', query: '(min-width: 1920px)' },
]

const useViewportCategory = () => {
  const [viewport, setViewport] = useState('desktop')

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const entries = viewportQueries.map((bp) => ({
      name: bp.name,
      mql: window.matchMedia(bp.query),
    }))

    const getActiveViewport = () => entries.find(({ mql }) => mql.matches)?.name ?? 'desktop'
    const updateViewport = () => setViewport(getActiveViewport())

    updateViewport()

    const cleanups = entries.map(({ mql }) => {
      const handler = () => updateViewport()
      if (mql.addEventListener) {
        mql.addEventListener('change', handler)
      } else {
        mql.addListener(handler)
      }
      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', handler)
        } else {
          mql.removeListener(handler)
        }
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  return viewport
}

const QUALITY_LEVELS = ['high', 'medium', 'low']
const HERO_MODEL_PRELOADS = ['/models/garash.glb', '/models/chococake.glb']
const SWAP_BACKTRACK_RAD = 0 // default: stick to exact rotation when swapping

const QUALITY_PROFILES = {
  high: {
    dprRange: [1, 1.6],
    antialias: true,
    powerPreference: 'high-performance',
    ambientIntensity: 0.55,
    keySpotIntensity: 70,
    fillSpotIntensity: 30,
    shadowMapSize: 1024,
    autoRotateSpeed: 0.9,
    contactShadow: { enabled: true, opacity: 0.45, blur: 2.5, resolution: 512 },
  },
  medium: {
    dprRange: [1, 1.35],
    antialias: true,
    powerPreference: 'high-performance',
    ambientIntensity: 0.5,
    keySpotIntensity: 58,
    fillSpotIntensity: 22,
    shadowMapSize: 768,
    autoRotateSpeed: 0.78,
    contactShadow: { enabled: true, opacity: 0.4, blur: 2.1, resolution: 384 },
  },
  low: {
    dprRange: [1, 1.15],
    antialias: false,
    powerPreference: 'low-power',
    ambientIntensity: 0.46,
    keySpotIntensity: 46,
    fillSpotIntensity: 16,
    shadowMapSize: 640,
    autoRotateSpeed: 0.65,
    contactShadow: { enabled: false, opacity: 0.3, blur: 1.6, resolution: 256 },
  },
}

const LoadingOverlay = ({ label }) => (
  <Html center>
    <div className="flex flex-col items-center gap-2 text-white">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white/80"></span>
      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70">D-D��?D�DD'D�D�D� {label}</p>
    </div>
  </Html>
)

const ModelUnavailable = ({ label }) => (
  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-center text-white/80">
    <span className="text-sm uppercase tracking-[0.45em]">3D D�D_D'D�D�</span>
    <p className="text-xs uppercase tracking-[0.4em] text-white/60">{label} D� D� D�D_D'D3D_�,D_D�D�D�</p>
  </div>
)

const degToRad = (degrees) => (degrees * Math.PI) / 180
const formatCanvasOffset = (value) => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  if (typeof value === 'string') {
    return value
  }
  return '0px'
}

const DessertModel = ({
  src,
  groupScale = 0.92,
  yOffset = -0.9,
  lockOrientation = false,
  baseRotationY = null,
  rotationSpeed = 0.35,
  onHalfRotation = null,
  onRotationChange = null,
  sceneOrientation = 0,
  targetOpacity = 1,
  initialOpacity = targetOpacity,
  onFadeComplete,
  emitEvents = true,
  onModelReady,
}) => {
  const { scene } = useGLTF(src)
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true)
    if (typeof sceneOrientation === 'number') {
      cloned.rotation.y = (cloned.rotation?.y ?? 0) + sceneOrientation
    }
    return cloned
  }, [scene, sceneOrientation])
  const groupRef = useRef(null)
  const halfTurnAccumulator = useRef(0)
  const visibilityRef = useRef(initialOpacity)
  const targetVisibilityRef = useRef(targetOpacity)
  const fadeCompletedRef = useRef(targetOpacity === 0)
  const materialsRef = useRef([])
  const modelReadyRef = useRef(false)
  const pivotOffset = useMemo(() => {
    const target = new Vector3()
    const box = new Box3().setFromObject(clonedScene)
    box.getCenter(target)
    return target
  }, [clonedScene])

  useEffect(() => {
    if (!onModelReady || modelReadyRef.current) {
      return
    }
    modelReadyRef.current = true
    onModelReady()
  }, [onModelReady])

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene])

  useEffect(() => {
    if (groupRef.current && baseRotationY !== null) {
      groupRef.current.rotation.y = baseRotationY
    }
  }, [baseRotationY])

  useEffect(() => {
    halfTurnAccumulator.current = 0
  }, [src, rotationSpeed, lockOrientation, onHalfRotation])

  useEffect(() => {
    targetVisibilityRef.current = targetOpacity
    if (targetOpacity > 0) {
      fadeCompletedRef.current = false
    }
  }, [targetOpacity])

  useEffect(() => {
    if (!groupRef.current) {
      return
    }
    const collectedMaterials = []
    groupRef.current.traverse((child) => {
      if (child.isMesh) {
        const childMaterials = Array.isArray(child.material) ? child.material : [child.material]
        childMaterials.forEach((material) => {
          if (!collectedMaterials.includes(material)) {
            material.transparent = true
            material.opacity = visibilityRef.current
            material.depthWrite = visibilityRef.current >= 0.999
            material.needsUpdate = true
            collectedMaterials.push(material)
          }
        })
      }
    })
    materialsRef.current = collectedMaterials
  }, [clonedScene])

  const applyVisibility = useCallback((value) => {
    materialsRef.current.forEach((material) => {
      material.transparent = true
      material.depthWrite = value >= 0.999
      material.opacity = value
      material.needsUpdate = true
    })
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return
    }

    if (!lockOrientation) {
      const rotationDelta = delta * rotationSpeed
      groupRef.current.rotation.y += rotationDelta
      if (emitEvents && onHalfRotation) {
        halfTurnAccumulator.current += Math.abs(rotationDelta)
        if (halfTurnAccumulator.current >= Math.PI) {
          halfTurnAccumulator.current -= Math.PI
          onHalfRotation()
        }
      }
    }

    if (emitEvents && onRotationChange) {
      onRotationChange(groupRef.current.rotation.y)
    }

    if (visibilityRef.current !== targetVisibilityRef.current) {
      const nextVisibility = MathUtils.damp(visibilityRef.current, targetVisibilityRef.current, 6, delta)
      visibilityRef.current = nextVisibility
      applyVisibility(nextVisibility)
      if (!fadeCompletedRef.current && targetVisibilityRef.current === 0 && nextVisibility < 0.02) {
        fadeCompletedRef.current = true
        onFadeComplete?.()
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, yOffset, 0]} scale={[groupScale, groupScale, groupScale]}>
      <group position={[-pivotOffset.x, -pivotOffset.y, -pivotOffset.z]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
}

const HeroModel = ({
  label,
  modelSrc,
  slideId,
  className = 'h-[320px] w-full',
  modelSettings = {},
  onHalfRotation,
  onRotationChange,
  onInitialLayerReady,
}) => {
  const viewport = useViewportCategory()
  const isMobileViewport = viewport === 'mobile'
  const canvasCleanupRef = useRef(null)
  const lastRotationRef = useRef(modelSettings?.modelRotationY ?? 0)
  const modelSrcRef = useRef(modelSrc)
  const idPrefix = useId()
  const initialLayerKey = `${idPrefix}-0`
  const [renderQuality, setRenderQuality] = useState('medium')
  const [canvasRevision, setCanvasRevision] = useState(0)
  const [modelLayers, setModelLayers] = useState(() => [
    {
      key: initialLayerKey,
      label,
      modelSrc,
      modelSettings,
      emitEvents: true,
      targetOpacity: 1,
      initialOpacity: 1,
      baseRotationOverride: null,
    },
  ])
  const layerCounterRef = useRef(1)
  const activeLayerKeyRef = useRef(initialLayerKey)

  const getNextLayerKey = useCallback(() => {
    const key = `${idPrefix}-${layerCounterRef.current}`
    layerCounterRef.current += 1
    return key
  }, [idPrefix])

  const handleRotationChangeInternal = useCallback(
    (angle) => {
      lastRotationRef.current = angle
      onRotationChange?.(angle)
    },
    [onRotationChange],
  )

  const initialLayerReadyRef = useRef(false)
  const notifyInitialLayerReady = useCallback(() => {
    if (initialLayerReadyRef.current) {
      return
    }
    initialLayerReadyRef.current = true
    onInitialLayerReady?.()
  }, [onInitialLayerReady])

  const handleLayerFadeComplete = useCallback((key) => {
    setModelLayers((prev) => prev.filter((layer) => layer.key !== key))
  }, [])

  useEffect(() => {
    if (modelSrcRef.current === modelSrc) {
      setModelLayers((prev) =>
        prev.map((layer) =>
          layer.key === activeLayerKeyRef.current
            ? { ...layer, label, modelSrc, modelSettings }
            : layer,
        ),
      )
      return
    }

    modelSrcRef.current = modelSrc
    setModelLayers((prev) => {
      const fadedLayers = prev.map((layer) => ({ ...layer, targetOpacity: 0, emitEvents: false }))
      const newKey = getNextLayerKey()
      const newLayerSettings = resolveModelSettings(modelSettings, viewport)
      const layerBacktrack = newLayerSettings.swapBacktrackRad ?? SWAP_BACKTRACK_RAD
      activeLayerKeyRef.current = newKey
      return [
        ...fadedLayers,
        {
          key: newKey,
          label,
          modelSrc,
          modelSettings,
          emitEvents: true,
          targetOpacity: 1,
          initialOpacity: 0,
          baseRotationOverride: lastRotationRef.current - layerBacktrack,
        },
      ]
    })
  }, [modelSrc, modelSettings, label, slideId, getNextLayerKey, viewport])

  const activeLayer =
    modelLayers.find((layer) => layer.emitEvents) ?? modelLayers[modelLayers.length - 1] ?? null
  const activeSettings = useMemo(
    () => resolveModelSettings(activeLayer?.modelSettings, viewport),
    [activeLayer?.modelSettings, viewport],
  )
  const hasLayerTransition = modelLayers.length > 1
  const [canvasYOffsetState, setCanvasYOffsetState] = useState(() => activeSettings.canvasYOffset ?? 0)
  const resolvedCanvasYOffsetRaw = activeSettings.canvasYOffset ?? 0
  useEffect(() => {
    if (!hasLayerTransition) {
      setCanvasYOffsetState((current) =>
        Object.is(current, resolvedCanvasYOffsetRaw) ? current : resolvedCanvasYOffsetRaw,
      )
    }
  }, [resolvedCanvasYOffsetRaw, hasLayerTransition])
  const {
    cameraPosition,
    orbitTarget,
    fov,
    lockOrientation,
    orbitAzimuthRange,
    allowPointerInteraction,
  } = activeSettings

  const canvasYOffsetValue = formatCanvasOffset(canvasYOffsetState)
  const resolvedAzimuthRange = orbitAzimuthRange ?? null
  const rotateEnabled = resolvedAzimuthRange ? true : !lockOrientation
  const canvasStyle = useMemo(
    () => ({
      background: 'transparent',
      transform: `translate3d(0, ${canvasYOffsetValue}, 0)`,
      pointerEvents: allowPointerInteraction ? 'auto' : 'none',
      touchAction: allowPointerInteraction ? 'pan-y' : 'auto',
    }),
    [allowPointerInteraction, canvasYOffsetValue],
  )

  useEffect(() => {
    if (modelSrc) {
      useGLTF.preload(modelSrc)
    }
  }, [modelSrc])

  useEffect(() => {
    HERO_MODEL_PRELOADS.forEach((path) => {
      if (path) {
        useGLTF.preload(path)
      }
    })
  }, [])

  const canRenderModel = typeof window !== 'undefined' && modelLayers.length > 0

  const qualitySettings = useMemo(() => QUALITY_PROFILES[renderQuality] ?? QUALITY_PROFILES.high, [renderQuality])
  const mobileSizeClass = isMobileViewport ? 'h-[240px]' : ''
  const containerClassName = ['overflow-hidden', className, mobileSizeClass].filter(Boolean).join(' ')
  const wrapperClassName = canRenderModel ? containerClassName : className
  const degradeQuality = useCallback(() => {
    setRenderQuality((prev) => {
      const currentIndex = QUALITY_LEVELS.indexOf(prev)
      if (currentIndex === -1 || currentIndex === QUALITY_LEVELS.length - 1) {
        return prev === 'low' ? prev : 'low'
      }
      return QUALITY_LEVELS[currentIndex + 1]
    })
  }, [])

  const improveQuality = useCallback(() => {
    setRenderQuality((prev) => {
      const currentIndex = QUALITY_LEVELS.indexOf(prev)
      if (currentIndex <= 0) {
        return prev
      }
      return QUALITY_LEVELS[currentIndex - 1]
    })
  }, [])

  useEffect(() => {
    return () => {
      canvasCleanupRef.current?.()
    }
  }, [])

  const restartCanvas = useCallback(() => {
    canvasCleanupRef.current?.()
    setRenderQuality((prev) => (prev === 'low' ? 'low' : 'medium'))
    setCanvasRevision((prev) => prev + 1)
  }, [])

  return (
    <div className={wrapperClassName}>
      <div
        aria-label={`${label} 3D D�D_D'D�D�`}
        className="relative isolate h-full w-full overflow-hidden text-white"
        id={`hero-model-${slideId}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0"></div>
        {!canRenderModel && (
          <div className="relative h-full w-full">
            <ModelUnavailable label={label} />
          </div>
        )}
        {canRenderModel && (
          <>
            <Canvas
              key={`hero-canvas-${canvasRevision}`}
              camera={{ position: cameraPosition, fov, near: 0.1, far: 15 }}
              className={['absolute inset-0 transform-gpu', !isMobileViewport && 'transition-transform duration-500']
                .filter(Boolean)
                .join(' ')}
              dpr={qualitySettings.dprRange}
              gl={{
                antialias: qualitySettings.antialias,
                alpha: true,
                preserveDrawingBuffer: false,
                powerPreference: qualitySettings.powerPreference,
              }}
              shadows
              style={canvasStyle}
              onCreated={({ gl }) => {
                const handleContextLost = (event) => {
                  event?.preventDefault?.()
                  setRenderQuality('low')
                  restartCanvas()
                }
                gl.domElement.addEventListener('webglcontextlost', handleContextLost)
                canvasCleanupRef.current = () => {
                  gl.domElement.removeEventListener('webglcontextlost', handleContextLost)
                }
              }}
            >
              <PerformanceMonitor onDecline={degradeQuality} onIncline={improveQuality} flipflops={2} />
              <ambientLight intensity={qualitySettings.ambientIntensity} />
              <spotLight
                angle={0.5}
                castShadow
                color="#ffefff"
                intensity={qualitySettings.keySpotIntensity}
                penumbra={0.5}
                position={[4, 7, 3]}
                shadow-mapSize={qualitySettings.shadowMapSize}
              />
              <spotLight
                angle={0.45}
                color="#a6f0ff"
                intensity={qualitySettings.fillSpotIntensity}
                position={[-5, 6, -2]}
              />
              <Suspense fallback={<LoadingOverlay label={activeLayer?.label ?? label} />}>
                {modelLayers.map((layer) => {
                  const layerSettings = resolveModelSettings(layer.modelSettings, viewport)
                  const {
                    modelScale: layerScale,
                    modelYOffset: layerYOffset,
                    lockOrientation: layerLockOrientation,
                    modelRotationY: layerRotation,
                    rotationSpeed: layerRotationSpeed,
                    modelOrientation: layerOrientation,
                    modelOrientationDeg: layerOrientationDeg,
                  } = layerSettings
                  const normalizedOrientation =
                    typeof layerOrientation === 'number'
                      ? layerOrientation
                      : typeof layerOrientationDeg === 'number'
                        ? degToRad(layerOrientationDeg)
                        : 0
                  const baseRotationY =
                    layer.baseRotationOverride !== null ? layer.baseRotationOverride : layerRotation

                  return (
                    <DessertModel
                      key={layer.key}
                      src={layer.modelSrc}
                      groupScale={layerScale}
                      yOffset={layerYOffset}
                      lockOrientation={layerLockOrientation}
                      baseRotationY={baseRotationY}
                      rotationSpeed={layerRotationSpeed}
                      onHalfRotation={layer.emitEvents ? onHalfRotation : undefined}
                      onRotationChange={layer.emitEvents ? handleRotationChangeInternal : undefined}
                      sceneOrientation={normalizedOrientation}
                      targetOpacity={layer.targetOpacity}
                      initialOpacity={layer.initialOpacity ?? layer.targetOpacity}
                      onFadeComplete={() => handleLayerFadeComplete(layer.key)}
                      emitEvents={layer.emitEvents}
                      onModelReady={
                        layer.key === initialLayerKey ? notifyInitialLayerReady : undefined
                      }
                    />
                  )
                })}
                <Environment files={HERO_ENV_TEXTURE} />
                {qualitySettings.contactShadow.enabled && (
                  <ContactShadows
                    opacity={qualitySettings.contactShadow.opacity}
                    scale={6}
                    blur={qualitySettings.contactShadow.blur}
                    far={4}
                    resolution={qualitySettings.contactShadow.resolution}
                    position={[0, -1.2, 0]}
                  />
                )}
              </Suspense>
              <OrbitControls
                autoRotate={!lockOrientation}
                autoRotateSpeed={qualitySettings.autoRotateSpeed}
                enablePan={false}
                enableZoom={false}
                enableRotate={rotateEnabled}
                maxDistance={2}
                minDistance={1.4}
                minPolarAngle={Math.PI * 0.34}
                maxPolarAngle={Math.PI * 0.5}
                minAzimuthAngle={resolvedAzimuthRange ? resolvedAzimuthRange[0] : undefined}
                maxAzimuthAngle={resolvedAzimuthRange ? resolvedAzimuthRange[1] : undefined}
                target={orbitTarget}
              />
            </Canvas>
          </>
        )}
      </div>
    </div>
  )
}


export default HeroModel
