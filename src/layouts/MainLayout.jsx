import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import TopBar from '../components/TopBar'

const MainLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-brand-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,170,220,0.2),transparent_60%)] blur-3xl sm:left-16 lg:h-[22rem] lg:w-[22rem] 3xl:h-[28rem] 3xl:w-[28rem] 4xl:h-[36rem] 4xl:w-[36rem]"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(120,223,255,0.18),transparent_65%)] blur-3xl lg:h-[26rem] lg:w-[26rem] 3xl:h-[34rem] 3xl:w-[34rem] 4xl:h-[42rem] 4xl:w-[42rem]"></div>
        <div className="absolute inset-x-0 top-1/3 h-48 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] blur-3xl 3xl:h-64"></div>
      </div>

      <div
        className="relative z-0 flex-1 pb-16"
        style={{ paddingTop: 'calc(var(--topbar-height) + var(--navigation-height))' }}
      >
        <TopBar />
        <Navigation />
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default MainLayout
