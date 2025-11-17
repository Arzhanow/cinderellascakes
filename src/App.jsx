import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const AboutPage = lazy(() => import('./pages/About'))
const HomePage = lazy(() => import('./pages/Home'))
const ProductionPage = lazy(() => import('./pages/Production'))
const ProductsPage = lazy(() => import('./pages/Products'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetails'))

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-brand-night text-white">
            Зареждане на преживяването...
          </div>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productSlug" element={<ProductDetailsPage />} />
            <Route path="/horeca" element={<ProductionPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
