const FALLBACK_VERSION = '0.0.0'

const sanitizeRenderer = (renderer) => {
  if (!renderer) return
  const version = renderer.version
  if (typeof version === 'string' && version.trim().length > 0) return
  renderer.version = FALLBACK_VERSION
  if (
    renderer.renderer &&
    typeof renderer.renderer === 'object' &&
    (!renderer.renderer.version ||
      (typeof renderer.renderer.version === 'string' && renderer.renderer.version.trim().length === 0))
  ) {
    renderer.renderer.version = FALLBACK_VERSION
  }
}

const patchHook = (hook) => {
  if (!hook || hook.__cinderellasCakesSemverPatched) {
    return false
  }
  hook.__cinderellasCakesSemverPatched = true

  if (hook.renderers && typeof hook.renderers.forEach === 'function') {
    hook.renderers.forEach((renderer) => sanitizeRenderer(renderer))
  }

  if (typeof hook.inject === 'function') {
    const originalInject = hook.inject
    hook.inject = function patchedInject(...args) {
      sanitizeRenderer(args[0])
      return originalInject.apply(this, args)
    }
  }

  return true
}

const tryPatchHook = () => {
  if (typeof window === 'undefined') {
    return true
  }
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  if (!hook) {
    return false
  }
  return patchHook(hook)
}

if (typeof window !== 'undefined') {
  if (!tryPatchHook()) {
    const intervalId = window.setInterval(() => {
      if (tryPatchHook()) {
        window.clearInterval(intervalId)
      }
    }, 50)
  }
}
