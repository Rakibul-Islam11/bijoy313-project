import { Link } from "react-router-dom";
import navbrandLogo from '../../assets/navbrand-logo/Untitled design (1).png';
import { useState, useRef, useEffect, useContext } from "react";
import { FiChevronDown, FiSearch, FiX, FiMenu } from "react-icons/fi";
import './navbar.css';
import { authContext } from "../auth-porvider-context/AuthContext";
import Swal from 'sweetalert2';

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const { user, logOut } = useContext(authContext);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileMenuOpen) {
            setActiveDropdown(null);
        }
    };

    const toggleDropdown = (dropdownName) => {
        if (activeDropdown === dropdownName) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdownName);
        }
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
                        Swal.fire(
                            'Logged Out!',
                            'You have been successfully logged out.',
                            'success'
                        );
                        setIsMobileMenuOpen(false);
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error!',
                            error.message,
                            'error'
                        );
                    });
            }
        });
    };

    // Close dropdown when clicking outside
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-[#ff0768] text-white shadow-md py-2 px-4 md:px-6 for_nav_font text-[17px]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Left Side: Logo with circular white background */}
                <div className="flex items-center space-x-6">
                    <Link to="/home" className="relative">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2">
                            <img
                                src={navbrandLogo}
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </Link>
                </div>

                {/* Center Text - Only visible on mobile */}
                <div className="md:hidden flex-1 text-center font-bold text-2xl">
                    <span className="text-blue-500 font-bold">bijoy</span>
                    <span className="text-red-500 font-bold">313</span>
                </div>

                {/* Mobile Menu Button (Hamburger) - Only visible on small screens */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-[#f67c01] hover:text-blue-600 focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            <FiX size={40} />
                        ) : (
                            <FiMenu size={40} />
                        )}
                    </button>
                </div>

                {/* Right Side: Navigation + Search - Hidden on mobile unless menu is open */}
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex items-center md:space-x-6 absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-[#f7f3ea] md:bg-transparent shadow-md md:shadow-none z-50 p-4 md:p-0`}>
                    {/* Navigation Items */}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full">
                        <Link
                            to="/home"
                            className="hover:text-black text-white font-bold py-2 md:py-5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-black text-white font-bold py-2 md:py-5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>

                        {/* How It Works Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                ref={buttonRef}
                                className="hover:text-black font-medium flex items-center justify-between w-full py-2 md:py-5"
                                onClick={() => toggleDropdown('howItWorks')}
                                onMouseEnter={() => setActiveDropdown('howItWorks')}
                            >
                                <span className="text-white font-bold hover:text-black">How To Work</span>
                                <FiChevronDown
                                    className={`transition-transform text-white duration-300 ${activeDropdown === 'howItWorks' ? 'rotate-180' : ''}`}
                                    size={18}
                                    style={{ strokeWidth: 3 }} // এটা "bold"-like দেখাবে
                                />


                            </button>

                            {activeDropdown === 'howItWorks' && (
                                <ul
                                    className="md:absolute md:top-15 md:left-0 w-full md:w-64 bg-white rounded-md shadow-lg border z-20 mt-2 md:mt-0"
                                    onMouseEnter={() => setActiveDropdown('howItWorks')}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <li>
                                        <Link
                                            to="/step1"
                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Registration Process
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/step2"
                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Referral System
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/step3"
                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Income Stream (Dropshipping / Micro Jobs)
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>

                        {/* Features Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                ref={buttonRef}
                                className="hover:text-black font-medium flex items-center justify-between w-full py-2 md:py-5"
                                onClick={() => toggleDropdown('features')}
                                onMouseEnter={() => setActiveDropdown('features')}
                            >
                                <span className="text-white font-bold hover:text-black">Features</span>
                                <FiChevronDown
                                    className={`transition-transform text-white font-bold duration-300 ${activeDropdown === 'features' ? 'rotate-180' : ''}`}
                                    size={18}
                                    style={{ strokeWidth: 3 }}
                                />
                            </button>

                            {activeDropdown === 'features' && (
                                <ul
                                    className="md:absolute md:top-15 md:left-0 w-full md:w-72 bg-white rounded-md shadow-lg border z-20 mt-2 md:mt-0"
                                    onMouseEnter={() => setActiveDropdown('features')}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <li>
                                        <Link
                                            to="/feature1"
                                            className="block px-4 py-2 hover:bg-blue-50 hhover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Referral Income
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/feature2"
                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Leadership Program
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/feature3"
                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Dropshipping Marketplace
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/feature4"
                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Micro Job System
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/feature5"
                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-black text-gray-800"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Training / Courses
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <Link
                            to="/support"
                            className="hover:text-black text-white font-bold py-2 md:py-5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Support
                        </Link>
                    </div>

                    {/* Search Box - Hidden on mobile */}
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-3 py-1.5 border-2 border-white rounded-md focus:outline-none focus:ring-2 hover:text-black text-sm"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-white font-bold" size={16} />
                    </div>

                    {/* Conditional Join/Logout Button */}
                    <div className="mt-4 md:mt-0">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="relative px-3 py-1.5 border-2 border-gray-800 text-white font-bold overflow-hidden group transition-all duration-300 animate-border-pulse block text-center"
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300 text-white font-bold">
                                    Logout
                                </span>
                                <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0 "></span>
                            </button>
                        ) : (
                            <Link
                                to="/sign-in"
                                    className="relative px-3 py-1.5 border-2 border-white text-white font-bold overflow-hidden group transition-all duration-300 animate-border-pulse block text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                    Join
                                </span>
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