import { Link } from "react-router-dom";
import navbrandLogo from '../../assets/navbrand-logo/Untitled design (1).png';
import { useState, useRef, useEffect, useContext } from "react";
import { FiChevronDown, FiSearch, FiX, FiMenu } from "react-icons/fi";
import './navbar.css';
import { authContext } from "../auth-porvider-context/AuthContext";
import Swal from 'sweetalert2';
import { MobileMenuContext } from "../../all-contexts/MobileMenuContext";

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useContext(authContext);
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(MobileMenuContext);
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // Only toggling icon, no menu
    };

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from your account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
                    })
                    .catch((error) => {
                        Swal.fire('Error!', error.message, 'error');
                    });
            }
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-[#ff0768] text-white shadow-md py-1 px-4 md:px-6 for_nav_font text-[17px]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center space-x-6">
                    <Link to="/home" className="relative">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center p-0.5 md:p-2">
                            <img src={navbrandLogo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                    </Link>
                </div>

                {/* Center Text (Mobile Only) */}
                <div className="md:hidden flex-1 text-center font-bold text-2xl">
                    <span className="text-white font-bold">bijoy</span>
                    <span className="text-gray-500 font-bold">313</span>
                </div>

                {/* Hamburger Icon Only */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white hover:text-blue-600 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <FiX size={35} /> : <FiMenu size={35} />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Nav Items */}
                    <Link to="/home" className="hover:text-black text-white font-bold py-5">Home</Link>
                    <Link to="/about" className="hover:text-black text-white font-bold py-5">About Us</Link>

                    {/* How To Work Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            ref={buttonRef}
                            className="hover:text-black font-medium flex items-center py-5"
                            onClick={() => toggleDropdown('howItWorks')}
                            onMouseEnter={() => setActiveDropdown('howItWorks')}
                        >
                            <span className="text-white font-bold">How To Work</span>
                            <FiChevronDown className={`transition-transform text-white duration-300 ${activeDropdown === 'howItWorks' ? 'rotate-180' : ''}`} size={18} style={{ strokeWidth: 3 }} />
                        </button>
                        {activeDropdown === 'howItWorks' && (
                            <ul
                                className="absolute top-16 left-0 w-64 bg-white rounded-md shadow-lg border z-20"
                                onMouseEnter={() => setActiveDropdown('howItWorks')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <li><Link to="/step1" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Registration Process</Link></li>
                                <li><Link to="/step2" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Referral System</Link></li>
                                <li><Link to="/step3" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Income Stream</Link></li>
                            </ul>
                        )}
                    </div>

                    {/* Features Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            ref={buttonRef}
                            className="hover:text-black font-medium flex items-center py-5"
                            onClick={() => toggleDropdown('features')}
                            onMouseEnter={() => setActiveDropdown('features')}
                        >
                            <span className="text-white font-bold">Features</span>
                            <FiChevronDown className={`transition-transform text-white duration-300 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} size={18} style={{ strokeWidth: 3 }} />
                        </button>
                        {activeDropdown === 'features' && (
                            <ul
                                className="absolute top-16 left-0 w-72 bg-white rounded-md shadow-lg border z-20"
                                onMouseEnter={() => setActiveDropdown('features')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <li><Link to="/feature1" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Referral Income</Link></li>
                                <li><Link to="/feature2" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Leadership Program</Link></li>
                                <li><Link to="/feature3" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Dropshipping Marketplace</Link></li>
                                <li><Link to="/feature4" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Micro Job System</Link></li>
                                <li><Link to="/feature5" className="block px-4 py-2 hover:bg-blue-50 text-gray-800">Training / Courses</Link></li>
                            </ul>
                        )}
                    </div>

                    <Link to="/support" className="hover:text-black text-white font-bold py-5">Support</Link>

                    {user && (
                        <Link to="/dashboard" className="hover:text-black text-yellow-400 font-bold py-5">Dashboard</Link>
                    )}

                    {/* Search Box */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-3 py-1.5 border-2 text-white border-white rounded-sm focus:outline-none text-sm placeholder-amber-50"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-white" size={16} />
                    </div>

                    {/* Join / Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        {user ? (
                            <div
                                className="flex items-center space-x-2 cursor-pointer"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden">
                                    <img src={user.photoURL} alt="Admin" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-white font-bold">Profile</span>
                                <FiChevronDown className="text-white" />
                                {isOpen && (
                                    <div
                                        className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg z-50"
                                        onMouseEnter={() => setIsOpen(true)}
                                        onMouseLeave={() => setIsOpen(false)}
                                    >
                                        <ul className="py-2 text-gray-800 text-sm">
                                            <li><Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link></li>
                                            <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link></li>
                                            <li><Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link></li>
                                            <li><button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Logout</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/pop-up-sign"
                                className="relative px-3 py-[2px] border-2 border-white text-white font-bold overflow-hidden group transition-all duration-300 block text-center"
                            >
                                <span className="relative z-10 group-hover:text-white">Join</span>
                                <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
