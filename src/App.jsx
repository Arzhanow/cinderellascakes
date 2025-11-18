import { Suspense, lazy } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import RouteLoadingOverlay from './components/RouteLoadingOverlay'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'

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

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
      </Suspense>
    </ThemeProvider>
  </HelmetProvider>
)

export default App
