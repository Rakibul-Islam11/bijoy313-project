import { useContext, useEffect, useRef, useState } from "react";
import { MobileMenuContext } from "../../all-contexts/MobileMenuContext";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock, FaInfoCircle } from "react-icons/fa";
import { MdWallet } from "react-icons/md";
import navlogo from '../../assets/navbrand-logo/Untitled design (4).png';
import { authContext } from "../auth-porvider-context/AuthContext";
import './mobilemenu.css';

const MobileMenu = () => {
    const { isMobileMenuOpen, setIsMobileMenuOpen, setPopupOpen } = useContext(MobileMenuContext);
    const menuRef = useRef(null);
    const [userProfile, setUserProfile] = useState(null);
    const { user, loading } = useContext(authContext);

    const popUpFn = () => {
        setPopupOpen(true);
    };

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) {
                    setUserProfile(data.user);
                }
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();

            // Set Interval for polling
            const interval = setInterval(() => {
                fetchUserData();
            }, 5000); // every 5 seconds

            return () => clearInterval(interval);
        }
    }, [user, loading]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen, setIsMobileMenuOpen]);

    const maskPhoneNumber = (phone) => {
        if (!phone) return '';
        const digits = phone.replace(/\D/g, '');
        if (digits.length <= 5) return phone;
        return `${digits.substring(0, 3)}****${digits.substring(digits.length - 2)}`;
    };

    const shouldShowVerifyButton = userProfile && !(userProfile.isOtpVerified || userProfile.emailVerified);
    
    

    return (
        <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out 
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} w-[85%] sm:w-72 flex flex-col`}
        >
            {/* Profile Section */}
            <div className="sticky top-0 bg-blue-100 z-10 ">
                <div className="flex flex-col items-center  pt-5 ">
                    <img
                        src={userProfile?.photoURL || navlogo}
                        alt="Profile"
                        className="w-24 h-24 mb-2 rounded-full object-cover"
                    />
                    {userProfile ? (
                        <>
                            <h2 className="text-blue-700 font-bold text-lg text-center">
                                {userProfile.displayName || 'No Name'}
                            </h2>
                            <p className="text-red-600 font-bold mt-1 text-sm">
                                {userProfile.phone ? maskPhoneNumber(userProfile.phone) : 'No Phone'}
                            </p>
                            <p className="text-gray-700 text-sm">
                                {userProfile.userType === 'businessAssociate' ? 'Business Associate' : 'User'}
                            </p>

                            {shouldShowVerifyButton && (
                                <button
                                    onClick={popUpFn}
                                    className="mt-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-0.5 text-sm rounded-full shadow-md hover:from-red-600 hover:to-orange-600 transition-all flex items-center cursor-pointer gap-2 animate-bounce"
                                >
                                    Verify Now
                                </button>
                            )}

                            <div className="relative w-full flex items-center justify-center my-4">

                                {/* Horizontal Line */}
                                <div className="absolute  left-0 top-1/2 w-full h-px bg-gray-500"></div>

                                {/* Button */}
                                <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 text-sm rounded-full font-bold shadow-md max-w-[200px] w-full text-white z-10">
                                    {(userProfile.isOtpVerified || userProfile.emailVerified) ? (
                                        <span className="font-medium">
                                            ✅ Profile Complete 93%
                                        </span>
                                    ) : (
                                        <span className="text-yellow-300 font-bold animate-pulse">
                                            ⚠️ Not Verified! Please verify
                                        </span>
                                    )}
                                </button>
                            </div>


                        </>
                    ) : (
                        <div className="animate-pulse space-y-2 w-full">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                            <div className="h-8 bg-gray-200 rounded-full w-3/4 mx-auto mt-2"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2 px-4 py-2 text-gray-800 text-sm font-medium">
                    <li><Link to="/home" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"><FiHome className="text-orange-500" /> হোম</Link></li>
                    <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"><FaUserAlt className="text-blue-500" /> আমার প্রোফাইল</Link></li>
                    
                   
                    
                    
                    <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"><FaInfoCircle className="text-blue-600" /> আমাদের সম্পর্কে</Link></li>
                    <li><Link to="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"><FaLock className="text-purple-700" /> গোপনীয়তা নীতি</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;
