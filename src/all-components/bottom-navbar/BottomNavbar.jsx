import {
    FaHome,
    FaHandshake,
    FaShoppingBag,
    FaMoneyBillWave,
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaTh,
    FaUserPlus
} from 'react-icons/fa';
import { useState, useRef, useEffect, useContext } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router-dom';
import './bottomnavbar.css';

const BottomNavbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);
    const { user, logOut } = useContext(authContext);
    const location = useLocation();

    const toggleProfile = (e) => {
        e.preventDefault();
        setIsProfileOpen(!isProfileOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isProfileOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileButtonRef.current &&
                !profileButtonRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from your account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success'))
                    .catch((error) => Swal.fire('Error!', error.message, 'error'));
            }
        });
    };

    const isActiveLink = (path) => location.pathname === path;

    const navItems = [
        { icon: FaHome, text: "Home", path: "/home" },
        { icon: FaHandshake, text: "Services", path: "/services" },
        { icon: FaShoppingBag, text: "Products", path: "/all-products", isCentral: true },
        { icon: FaMoneyBillWave, text: "Earn", path: "/earn" },
        { icon: user ? FaUser : FaUserPlus, text: user ? "Dashboard" : "Join", path: user ? "/dashboard" : "/pop-up-sign" }
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#ff0768] bg-opacity-60 border-t border-gray-200 shadow-2xl rounded-t-3xl overflow-visible">
            <div className="flex justify-around items-end px-2 pt-2 pb-1 relative h-16">
                {navItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center group flex-1 relative">
                        {item.isCentral ? (
                            <Link
                                to={item.path}
                                state={{ from: 'bottom-navbar-products' }}  // ✅ state পাঠানো হলো
                                className="relative flex flex-col items-center z-30"
                            >
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2
                                    bg-gradient-to-br from-pink-500 to-purple-700
                                    rounded-full p-4 shadow-xl
                                    border-4 border-white neon-glow
                                    group-hover:scale-110 -translate-y-12
                                    transition-all duration-300 ease-in-out cursor-pointer
                                    active:scale-95 z-30 flex flex-col items-center justify-center">
                                    <item.icon className="text-2xl text-white animate-pulse mb-1" />
                                    <span className="text-[10px] text-white font-semibold">{item.text}</span>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                to={item.path}
                                className={`flex flex-col items-center py-1 px-1 rounded-lg w-full
                                ${isActiveLink(item.path) ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-md' : 'text-white'}
                                group-active:scale-95 transition-all duration-200 ease-out
                                hover:bg-purple-50 hover:text-purple-700 hover:shadow-md`}
                                onClick={item.path === "/dashboard" && user ? toggleProfile : null}
                                ref={item.path === "/dashboard" && user ? profileButtonRef : null}
                            >
                                <item.icon className={`text-xl ${isActiveLink(item.path) ? 'text-purple-700' : 'text-white'} group-hover:text-purple-700 transition-colors`} />
                                <span className={`text-xs mt-1 font-medium ${isActiveLink(item.path) ? 'text-purple-700' : 'text-white'} group-hover:text-purple-700 transition-colors`}>
                                    {item.text}
                                </span>
                            </Link>
                        )}

                        {item.path === "/dashboard" && user && isProfileOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute bottom-full mb-4 w-52 bg-white rounded-xl shadow-2xl py-3 z-50 right-1/2 translate-x-1/3 transform-gpu origin-bottom scale-y-100 opacity-100 transition-all duration-300 ease-out border border-gray-200"
                            >
                                <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-t-xl text-sm font-medium">
                                    <FaTh className="mr-3 text-purple-500 text-lg" /> Dashboard Home
                                </Link>
                                <Link to="/my-profile" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors text-sm font-medium">
                                    <FaUser className="mr-3 text-purple-500 text-lg" /> My Profile
                                </Link>
                                <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors text-sm font-medium">
                                    <FaCog className="mr-3 text-purple-500 text-lg" /> Settings
                                </Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button onClick={() => { handleLogout(); setIsProfileOpen(false); }} className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-b-xl text-sm font-medium">
                                    <FaSignOutAlt className="mr-3 text-red-500 text-lg" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomNavbar;
