import { createContext, useState } from "react";

export const MobileMenuContext = createContext();

const MobileMenuProvider = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

  
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const serveData = {
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
        setPopupOpen,
        popupOpen
    };
    return (
        <MobileMenuContext.Provider value={serveData}>
            {children}
        </MobileMenuContext.Provider>
    );
};

export default MobileMenuProvider;
