import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'
import RetailPage from './pages/Retail'
import HotelsPage from './pages/Hotels'
import CateringPage from './pages/Catering'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/retail" element={<RetailPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/catering" element={<CateringPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
