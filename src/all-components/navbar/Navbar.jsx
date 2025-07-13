import { Link } from "react-router-dom";
import navbrandLogo from '../../assets/navbrand-logo/Untitled design (1).png';
import { useState, useRef, useEffect, useContext } from "react";
import { FiChevronDown, FiSearch, FiX, FiMenu, FiShoppingCart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { authContext } from "../auth-porvider-context/AuthContext";
import Swal from 'sweetalert2';
import { MobileMenuContext } from "../../all-contexts/MobileMenuContext";
import NotificationBell from "./NotificationBell";
import axios from "axios";


const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const howItWorksRef = useRef(null);
    const featuresRef = useRef(null);
    const profileRef = useRef(null);

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, loading, logOut } = useContext(authContext);
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(MobileMenuContext);
    const [isOpen, setIsOpen] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loadingSid, setLoadingSide] = useState(true);
    useEffect(() => {
        if (!user?.uid) return;

        const fetchCart = async () => {
            try {
                const res = await axios.get(`https://bijoy-server.vercel.app/api/carts/${user.uid}`);
                if (res.data.success) {
                    setCartItems(res.data.cartItems);
                }
            } catch (err) {
                console.error('Cart fetch error:', err);
            }
        };

        // প্রথমবার ফেচ করুন
        fetchCart();

        // প্রতি ৫ সেকেন্ডে আপডেট চেক করুন
        const interval = setInterval(fetchCart, 1000);

        return () => clearInterval(interval);
    }, [user]);


    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    useEffect(() => {
        if (showBalance) {
            const timer = setTimeout(() => {
                setShowBalance(false);
            }, 3000); // ৩ সেকেন্ড পরে Tap লেখা দেখাবে

            return () => clearTimeout(timer); // Cleanup
        }
    }, [showBalance]);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
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
                    .then(() => Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success'))
                    .catch((error) => Swal.fire('Error!', error.message, 'error'));
            }
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                howItWorksRef.current && !howItWorksRef.current.contains(event.target) &&
                featuresRef.current && !featuresRef.current.contains(event.target) &&
                profileRef.current && !profileRef.current.contains(event.target)
            ) {
                setActiveDropdown(null);
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);



    


    return (
        <nav className="bg-[#ff0768] text-white shadow-lg sticky top-0 z-50">
            <div className="px-2 xl:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/home" className="flex items-center group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-lg transform group-hover:scale-105 transition-all duration-300">
                                <img src={navbrandLogo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="ml-3 hidden xl:block">
                                <span className="text-white font-bold text-xl group-hover:text-gray-100 transition-colors">bijoy</span>
                                <span className="text-gray-200 font-bold text-xl group-hover:text-gray-300 transition-colors">313</span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Title */}
                    <div className="hidden lg:flex-1 text-center">
                        <span className="text-white font-bold text-xl">bijoy</span>
                        <span className="text-gray-200 font-bold text-xl">313</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
                        {/* Navigation Links */}
                        <div className="flex items-center space-x-1">
                            <Link
                                to="/home"
                                className="px-2 py-2 rounded-lg text-sm font-medium hover:bg-[#e6065d] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="px-2 py-2 rounded-lg text-sm font-medium hover:bg-[#e6065d] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                About Us
                            </Link>

                            {/* How To Work Dropdown */}
                            <div className="relative group" ref={howItWorksRef}>
                                <button
                                    onClick={() => toggleDropdown('howItWorks')}
                                    onMouseEnter={() => setActiveDropdown('howItWorks')}
                                    className="px-2 py-2.5 rounded-xl text-sm font-medium text-white hover:text-white/90 bg-gradient-to-r from-[#ff0768]/90 to-[#e6065d] hover:from-[#ff0768] hover:to-[#e6065d] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center">
                                        How To Work
                                        <FiChevronDown className={`ml-1.5 transition-all duration-300 ${activeDropdown === 'howItWorks' ? 'rotate-180' : ''}`} />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#ff0768] to-[#e6065d] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                                </button>

                                {activeDropdown === 'howItWorks' && (
                                    <div
                                        className="absolute left-0 mt-3 w-72 bg-white/95 rounded-xl shadow-2xl py-3 z-50 border border-white/20 backdrop-blur-lg"
                                        onMouseEnter={() => setActiveDropdown('howItWorks')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <div className="relative">
                                            {/* Decorative triangle */}
                                            <div className="absolute -top-3 left-6 w-5 h-5 bg-white transform rotate-45 border-t border-l border-white/20 z-10"></div>

                                            {/* Menu items with icons */}
                                            <div className="space-y-1.5 px-3">
                                                <Link
                                                    to="/step1"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Registration Process</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Step-by-step guide</div>
                                                    </div>
                                                    <FiChevronDown className="ml-auto text-gray-400 group-hover/item:text-[#ff0768] rotate-90 transition-colors" />
                                                </Link>

                                                <Link
                                                    to="/step2"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Referral System</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Invite friends & earn</div>
                                                    </div>
                                                    <FiChevronDown className="ml-auto text-gray-400 group-hover/item:text-[#ff0768] rotate-90 transition-colors" />
                                                </Link>

                                                <Link
                                                    to="/step3"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Income Stream</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Multiple earning methods</div>
                                                    </div>
                                                    <FiChevronDown className="ml-auto text-gray-400 group-hover/item:text-[#ff0768] rotate-90 transition-colors" />
                                                </Link>

                                                <div className="border-t border-gray-100 my-1"></div>

                                                <Link
                                                    to="/step4"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Dashboard Overview</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Manage your account</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Features Dropdown */}
                            <div className="relative group" ref={featuresRef}>
                                <button
                                    onClick={() => toggleDropdown('features')}
                                    onMouseEnter={() => setActiveDropdown('features')}
                                    className="px-2 py-2.5 rounded-xl text-sm font-medium text-white hover:text-white/90 bg-gradient-to-r from-[#ff0768]/90 to-[#e6065d] hover:from-[#ff0768] hover:to-[#e6065d] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Features
                                        <FiChevronDown className={`ml-1.5 transition-all duration-300 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#ff0768] to-[#e6065d] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                                </button>

                                {activeDropdown === 'features' && (
                                    <div
                                        className="absolute left-0 mt-3 w-72 bg-white/95 rounded-xl shadow-2xl py-3 z-50 border border-white/20 backdrop-blur-lg"
                                        onMouseEnter={() => setActiveDropdown('features')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <div className="relative">
                                            {/* Decorative triangle */}
                                            <div className="absolute -top-3 left-6 w-5 h-5 bg-white transform rotate-45 border-t border-l border-white/20 z-10"></div>

                                            {/* Menu items with icons */}
                                            <div className="space-y-1.5 px-3">
                                                <Link
                                                    to="/feature1"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Referral Income</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Earn through referrals</div>
                                                    </div>
                                                    <FiChevronDown className="ml-auto text-gray-400 group-hover/item:text-[#ff0768] rotate-90 transition-colors" />
                                                </Link>

                                                <Link
                                                    to="/feature2"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Leadership Program</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Advance your leadership</div>
                                                    </div>
                                                    <FiChevronDown className="ml-auto text-gray-400 group-hover/item:text-[#ff0768] rotate-90 transition-colors" />
                                                </Link>

                                                <Link
                                                    to="/feature3"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Dropshipping Marketplace</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Start your online store</div>
                                                    </div>
                                                    <FiChevronDown className="ml-auto text-gray-400 group-hover/item:text-[#ff0768] rotate-90 transition-colors" />
                                                </Link>

                                                <div className="border-t border-gray-100 my-1"></div>

                                                <Link
                                                    to="/feature4"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Micro Job System</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Earn with small tasks</div>
                                                    </div>
                                                </Link>

                                                <Link
                                                    to="/feature5"
                                                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-rose-50/80 hover:text-[#ff0768] rounded-lg transition-all duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#ff0768]/10 flex items-center justify-center mr-3 group-hover/item:bg-[#ff0768]/20 transition-colors">
                                                        <svg className="w-4 h-4 text-[#ff0768]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Training / Courses</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">Boost your skills</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/support"
                                className="px-2 py-2 rounded-lg text-sm font-medium hover:bg-[#e6065d] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Support
                            </Link>

                            {user && (
                                <Link
                                    to="/dashboard"
                                    className="px-2 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>

                        {/* Modern Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-4 w-4 text-pink-200 group-hover:text-white transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full pl-10 py-2 rounded-full bg-[rgba(0,0,0,0.6)] bg-opacity-70 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-[#c5064f] transition-all duration-300 group-hover:bg-opacity-90"
                            />
                        </div>

                        {/* Balance Display - Between Search and Profile */}
                        {user && (
                            <div
                                onClick={() => setShowBalance(!showBalance)}
                                className="hidden md:flex items-center mx-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-pink-400/30 shadow-[0_0_15px_rgba(255,0,120,0.2)] animate-pulse hover:animate-none transition-all duration-300 group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    {/* Neon Icon Bubble */}
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500/20 border border-pink-500/30 shadow-[0_0_8px_rgba(255,0,120,0.5)] group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            className="w-4 h-4 text-pink-300 drop-shadow"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-6v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                                            />
                                        </svg>
                                    </div>

                                    {/* Balance Text */}
                                    <div className="text-white leading-tight">
                                        <p className="text-[10px] uppercase font-semibold tracking-widest opacity-100">
                                            Balance
                                        </p>
                                        <p className="text-sm font-extrabold tracking-wide animate-glow">
                                            {showBalance ? `৳${user.balance?.toFixed(2) || '0.00'}` : 'Tap'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='hidden lg:block'>
                            <Link to="/cart" className="relative">
                                <button className="p-2 rounded-full bg-black/30 backdrop-blur-md border border-pink-400/30 shadow-[0_0_15px_rgba(255,0,120,0.2)] hover:shadow-[0_0_20px_rgba(255,0,120,0.3)] transition-all duration-300">
                                    <FiShoppingCart className="w-5 h-5 text-pink-300" />
                                    {itemCount > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                            {itemCount}
                                        </span>
                                    )}
                                </button>
                            </Link>
                        </div>

                        <div className='hidden lg:block'>
                            <NotificationBell></NotificationBell>
                        </div>

                        {/* Profile / Join Button */}
                        <div className="relative ml-2" ref={profileRef}>
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        onMouseEnter={() => setIsProfileOpen(true)}
                                        className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-2 rounded-full transition-all duration-300 hover:shadow-md group"
                                    >
                                        {
                                            userProfile && <img
                                                src={userProfile.photoURL}
                                                alt="Profile"
                                                className="h-8 w-8 rounded-full border-2 border-white object-cover group-hover:border-pink-200 transition-colors"
                                            />
                                        }

                                        <span className="text-sm font-medium text-black hidden lg:inline group-hover:text-pink-800 transition-colors">Profile</span>
                                        <FiChevronDown className={`text-black transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''} group-hover:text-pink-800`} />
                                    </button>

                                    {isProfileOpen && (
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-1 z-50 border border-gray-200 backdrop-blur-sm bg-opacity-95"
                                            onMouseLeave={() => setIsProfileOpen(false)}
                                        >
                                            {/* User Info with Balance */}
                                            <div className="py-3 px-4 border-b relative">
                                                <p className="text-sm font-medium text-gray-900 truncate">{user.displayName || "Your Name"}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>

                                                {/* Premium Balance Card */}
                                                <div className="mt-3 bg-gradient-to-r from-[#fff4f7] to-[#ffeef2] p-3 rounded-lg border border-[#ffebf1] relative overflow-hidden">
                                                    {/* Decorative elements */}
                                                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff0768] opacity-10 rounded-full -mr-4 -mt-4"></div>
                                                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#ff5e18] opacity-10 rounded-full -ml-2 -mb-2"></div>

                                                    <div className="flex justify-between items-center relative z-10">
                                                        <div>
                                                            <span className="text-xs font-medium text-gray-500">Account Balance</span>
                                                            <p className="text-lg font-bold text-[#ff0768] mt-1">$1,245.00</p>
                                                        </div>
                                                        <svg className="w-6 h-6 text-[#ff0768]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <button className="mt-2 w-full bg-gradient-to-r from-[#ff0768] to-[#ff5e18] text-white text-xs font-medium py-1.5 px-2 rounded-md hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]">
                                                        Add Funds
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-1 space-y-1">
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#ff0768] transition-all duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-2 text-[#ff0768]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    to="/my-profile"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#ff0768] transition-all duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-2 text-[#ff0768]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    My Profile
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#ff0768] transition-all duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-2 text-[#ff0768]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Settings
                                                </Link>
                                            </div>
                                            <div className="py-1 border-t">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-[#ff0768] hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/pop-up-sign"
                                    className="ml-2 inline-flex items-center px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 group relative overflow-hidden border border-[#ff0768]/20"
                                >
                                    {/* White background with hover effect */}
                                    <span className="absolute inset-0 rounded-full bg-white opacity-100 group-hover:bg-gray-50 transition-colors duration-300"></span>

                                    {/* Colored text and icon */}
                                    <span className="relative flex items-center z-10">
                                        <svg
                                            className="w-5 h-5 mr-2 text-[#ff0768] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>

                                        <span className="text-[#ff0768] font-bold text-sm tracking-wider">
                                            JOIN NOW
                                        </span>
                                    </span>

                                    {/* Subtle border glow on hover */}
                                    <span className="absolute inset-0 rounded-full border-2 border-[#ff0768]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Modern Search Bar - Mobile Optimized */}
                    <div className="relative group w-[180px] md:w-auto pl-[10px] hidden md:block lg:hidden">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-4 w-4 text-pink-200 group-hover:text-white transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full pl-10 pr-3 py-2 rounded-full bg-[rgba(0,0,0,0.6)] text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-[#c5064f] transition-all duration-300 group-hover:bg-opacity-90 text-sm"
                        />
                    </div>

                    {/* small screen search bar */}
                    <div className="relative md:hidden">
                        {/* Search Icon Button - Always Visible */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-pink-200 hover:text-white transition-colors"
                        >
                            <FiSearch className="h-7 w-7" />
                        </button>

                        {/* Floating Search Bar - Animated */}
                        <div
                            className={`
          absolute top-12 -right-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px] pointer-events-none'}
          z-50
        `}
                        >
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="h-4 w-4 text-pink-800" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="block w-64 pl-10 pr-10 py-2 rounded-full 
                     bg-white shadow-lg text-gray-800 placeholder-pink-800 
                     focus:outline-none focus:ring-2 focus:ring-pink-500
                     transition-all duration-200"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-800 hover:text-pink-500"
                                >
                                    <FiX className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Balance Display - Between Search and Profile */}
                    {user && (
                        <div
                            onClick={() => setShowBalance(true)}
                            className="flex lg:hidden items-center mx-2 px-2.5 sm:px-4 py-0.5 sm:py-2 rounded-full bg-black/30 backdrop-blur-md border border-pink-400/30 shadow-[0_0_15px_rgba(255,0,120,0.2)] animate-pulse hover:animate-none transition-all duration-300 group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* Neon Icon Bubble */}
                                <div className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-full bg-pink-500/20 border border-pink-500/30 shadow-[0_0_8px_rgba(255,0,120,0.5)] group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-4 h-4 text-pink-300 drop-shadow"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-6v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                                        />
                                    </svg>
                                </div>

                                {/* Balance Text */}
                                <div className="text-white leading-tight">
                                    <p className="text-[9.5px] sm:text-[10px] uppercase font-medium tracking-widest">
                                        Balance
                                    </p>
                                    <p className="text-sm font-extrabold tracking-wide animate-glow">
                                        {showBalance ? `৳${user.balance?.toFixed(2) || '0.00'}` : 'Tap'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}



                    <div className="block lg:hidden">
                        <Link to={'/'}>
                            <FaShoppingCart />
                        </Link>
                    </div>

                    <div className="block lg:hidden">
                        <NotificationBell></NotificationBell>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#d80757] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 hover:scale-110"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="block h-6 w-6" />
                            ) : (
                                <FiMenu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-[#e6065d] px-4 pb-4 animate-slideDown">
                    <div className="pt-2 pb-3 space-y-2">
                        <Link
                            to="/home"
                            className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-[#d80757] transition-all duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-[#d80757] transition-all duration-200"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/support"
                            className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-[#d80757] transition-all duration-200"
                        >
                            Support
                        </Link>
                        {user && (
                            <Link
                                to="/dashboard"
                                className="block px-3 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 hover:from-yellow-300 hover:to-yellow-200 transition-all duration-200"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                    <div className="pt-4 pb-2 border-t border-[#d80757]">
                        {user ? (
                            <div className="flex items-center px-4 py-3">
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full border-2 border-white"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white">{user.displayName}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-pink-200 hover:text-white transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/pop-up-sign"
                                className="block w-full px-4 py-3 text-center text-[#ff0768] bg-white rounded-full font-medium hover:bg-gray-100 transition-all duration-200"
                            >
                                Join Now
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;