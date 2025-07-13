import { Outlet } from 'react-router-dom'
import Navbar from './all-components/navbar/Navbar'
import './App.css'
import BottomNavbar from './all-components/bottom-navbar/BottomNavbar'
import MobileMenu from './all-components/mobile-menu-page/MobileMenu'
import Footer from './all-components/footer/Footer'
import ScrollReSet from './all-components/scroll-reset/ScrollReSet'

function App() {
  return (
    <>
      <ScrollReSet /> {/* Just a component that runs scroll effect */}
      <div className="pb-16 md:pb-0">
        <Navbar />
        <Outlet />
        <MobileMenu />
        <Footer />
        <BottomNavbar />
      </div>
    </>
  )
}

export default App;
