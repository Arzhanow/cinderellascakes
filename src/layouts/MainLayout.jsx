import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import TopBar from '../components/TopBar'

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-brand-night text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,170,220,0.2),transparent_60%)] blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(120,223,255,0.18),transparent_65%)] blur-3xl"></div>
      </div>

      <div className="relative z-10 pb-16">
        <TopBar />
        <Navigation />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
