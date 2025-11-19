import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import RouteLoadingOverlay from './components/RouteLoadingOverlay'
import { ThemeProvider } from './context/ThemeContext'
import { preloadInitialAssets } from './utils/preloadInitialAssets'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const AboutPage = lazy(() => import('./pages/About'))
const HomePage = lazy(() => import('./pages/Home'))
const ProductionPage = lazy(() => import('./pages/Production'))
const ProductsPage = lazy(() => import('./pages/Products'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetails'))

const RootShell = () => (
  <>
    <ScrollToTop />
    <RouteLoadingOverlay />
    <Outlet />
  </>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootShell />}>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productSlug" element={<ProductDetailsPage />} />
        <Route path="/horeca" element={<ProductionPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Route>,
  ),
)

const App = () => {
  const [windowReady, setWindowReady] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }
    return document.readyState === 'complete'
  })
  const [assetsReady, setAssetsReady] = useState(false)
  const [initialOverlayActive, setInitialOverlayActive] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || windowReady) {
      return
    }
    const handleLoad = () => setWindowReady(true)
    window.addEventListener('load', handleLoad, { once: true })
    return () => window.removeEventListener('load', handleLoad)
  }, [windowReady])

  useEffect(() => {
    let cancelled = false

    preloadInitialAssets()
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          setAssetsReady(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleInitialLoaderComplete = useCallback(() => {
    setInitialOverlayActive(false)
  }, [])

  const initialReady = windowReady && assetsReady

  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <RouterProvider router={router} fallbackElement={null} />
      </Suspense>
      {initialOverlayActive && (
        <LoadingScreen
          blocking
          isReady={initialReady}
          minVisibleTime={1600}
          onComplete={handleInitialLoaderComplete}
          speedMultiplier={0.85}
        />
      )}
    </ThemeProvider>
  )
}

export default App
