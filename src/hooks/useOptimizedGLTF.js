import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF as useDreiGLTF } from '@react-three/drei'
import { KTX2Loader } from 'three-stdlib'
import { WebGLRenderer } from 'three'

const BASIS_TRANSCODER_PATH = '/basis/'
let sharedKTX2Loader = null
let hasDetectedSupport = false

const ensureRendererSupport = (renderer) => {
  if (typeof window === 'undefined') {
    return null
  }

  if (!sharedKTX2Loader) {
    sharedKTX2Loader = new KTX2Loader().setTranscoderPath(BASIS_TRANSCODER_PATH)
  }

  if (renderer) {
    sharedKTX2Loader.detectSupport(renderer)
    return sharedKTX2Loader
  }

  if (hasDetectedSupport) {
    return sharedKTX2Loader
  }

  try {
    const canvas = document.createElement('canvas')
    const tempRenderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      canvas,
      powerPreference: 'high-performance',
    })
    sharedKTX2Loader.detectSupport(tempRenderer)
    tempRenderer.dispose()
    hasDetectedSupport = true
  } catch (error) {
    console.warn('[useOptimizedGLTF] Failed to initialize KTX2 support', error)
  }

  return sharedKTX2Loader
}

const createExtensionHandler = (renderer, extendLoader) => {
  return (loader) => {
    const ktx2Loader = ensureRendererSupport(renderer)
    if (ktx2Loader) {
      loader.setKTX2Loader(ktx2Loader)
    }
    if (typeof extendLoader === 'function') {
      extendLoader(loader)
    }
  }
}

export const useOptimizedGLTF = (path, useDraco = true, useMeshopt = true, extendLoader) => {
  const renderer = useThree((state) => state.gl)
  const loaderExtensions = useMemo(
    () => createExtensionHandler(renderer, extendLoader),
    [renderer, extendLoader],
  )

  return useDreiGLTF(path, useDraco, useMeshopt, loaderExtensions)
}

useOptimizedGLTF.preload = (path, useDraco = true, useMeshopt = true, extendLoader) => {
  const extensions = createExtensionHandler(null, extendLoader)
  return useDreiGLTF.preload(path, useDraco, useMeshopt, extensions)
}

useOptimizedGLTF.clear = (...args) => useDreiGLTF.clear(...args)
useOptimizedGLTF.setDecoderPath = (...args) => useDreiGLTF.setDecoderPath(...args)
