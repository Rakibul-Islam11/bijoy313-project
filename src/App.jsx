import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './all-components/navbar/Navbar';
import './App.css';
import BottomNavbar from './all-components/bottom-navbar/BottomNavbar';
import MobileMenu from './all-components/mobile-menu-page/MobileMenu';
import Footer from './all-components/footer/Footer';
import ScrollReSet from './all-components/scroll-reset/ScrollReSet';
import VerifyAlertPage from './all-components/paid-vierify-now/VerifyAlertPage';

function App() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem('verifyAlertShown');
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowAlert(true);
        localStorage.setItem('verifyAlertShown', 'true');
      }, 2000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, []);

  const closeAlert = () => setShowAlert(false);

  return (
    <>
      <ScrollReSet />
      <div className="pb-16 md:pb-0">
        <Navbar />
        <Outlet />
        <MobileMenu />
        <Footer />
        <BottomNavbar />
      </div>

      {showAlert && (
        <div className="fixed inset-0 z-50 px-10 bg-opacity-50 flex items-center justify-center">
          <div className="relative  rounded-lg shadow-xl ">
            <button
              onClick={closeAlert}
              className="absolute top-8 md:top-10 right-2 text-white hover:text-red-500 text-4xl"
            >
              &times;
            </button>
            <VerifyAlertPage />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
