
import { Outlet } from 'react-router-dom'
import Navbar from './all-components/navbar/Navbar'
import './App.css'
import BottomNavbar from './all-components/bottom-navbar/BottomNavbar'
import MobileMenu from './all-components/mobile-menu-page/MobileMenu'

function App() {
  

  return (
    <>
      <div className="pb-16 md:pb-0">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <MobileMenu />
        <BottomNavbar></BottomNavbar>
      </div>
    </>
  )
}

export default App
