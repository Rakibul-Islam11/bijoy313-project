import { useContext, useEffect, useRef, useState } from "react";
import { MobileMenuContext } from "../all-contexts/MobileMenuContext";
import { FiHome, FiEye, FiEyeOff, FiCopy } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { MdWallet } from "react-icons/md";
import navlogo from '../../assets/navbrand-logo/Untitled design (1).png';
import { authContext } from "../auth-porvider-context/AuthContext";
import Swal from 'sweetalert2';
import './mobilemenu.css';

const MobileMenu = () => {
    const { isMobileMenuOpen, setIsMobileMenuOpen, setPopupOpen } = useContext(MobileMenuContext);
    const menuRef = useRef(null);
    const [userProfile, setUserProfile] = useState(null);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const { user, loading, logOut } = useContext(authContext);
    const [copied, setCopied] = useState(false);

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
            const interval = setInterval(() => {
                fetchUserData();
            }, 5000);
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

    const togglePhoneNumberVisibility = () => {
        setShowPhoneNumber(!showPhoneNumber);
    };

    const copyReferralCode = () => {
        if (userProfile?.referralCode) {
            navigator.clipboard.writeText(userProfile.referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shouldShowVerifyButton = userProfile && !(userProfile.isOtpVerified || userProfile.emailVerified);

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
                    .then(() => {
                        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
                        setIsMobileMenuOpen(false);
                    })
                    .catch((error) => Swal.fire('Error!', error.message, 'error'));
            }
        });
    };

    return (
        <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out 
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} w-[85%] sm:w-72 flex flex-col`}
        >
            {/* Profile Section */}
            <div className="sticky top-0 bg-blue-100 z-10 ">
                <div className="flex flex-col items-center pt-5">
                    <img
                        src={userProfile?.photoURL || navlogo}
                        alt="Profile"
                        className="w-24 h-24 mb-2 rounded-full object-cover"
                    />
                    {userProfile ? (
                        <>
                            <div className="flex flex-row items-center">
                                <h2 className="text-blue-700 font-bold text-lg text-center">
                                    {userProfile.displayName || 'No Name'}
                                </h2>
                                <span>
                                    {userProfile.payment == "paid" ? (
                                        <div className="flex items-center ml-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="ml-1 text-green-500">Verified</span>
                                        </div>
                                    ) : (
                                        <Link to={'/verify-alert'} className="text-red-500 animate-blink hover:animate-none ml-2">verify now</Link>
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-red-600 font-bold mt-1 text-sm">
                                    {userProfile.phone ?
                                        (showPhoneNumber ? userProfile.phone : maskPhoneNumber(userProfile.phone))
                                        : 'No Phone'}
                                </p>
                                {userProfile.phone && (
                                    <button
                                        onClick={togglePhoneNumberVisibility}
                                        className="text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        {showPhoneNumber ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <p className="text-black text-sm">Refer Code:</p>
                                <p className="text-gray-600 font-medium text-sm">{userProfile.referralCode}</p>
                                {userProfile.referralCode && (
                                    <button
                                        onClick={copyReferralCode}
                                        className="text-gray-500 hover:text-blue-500 transition-colors relative"
                                        title="Copy referral code"
                                    >
                                        <FiCopy size={16} />
                                        {copied && (
                                            <span className="absolute -top-6 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                Copied!
                                            </span>
                                        )}
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="mt-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 text-sm rounded-full flex items-center justify-center gap-2 font-medium hover:from-red-600 hover:to-red-700 transition-all"
                            >
                                <FaSignOutAlt className="text-sm" />
                                লগ আউট
                            </button>

                            {shouldShowVerifyButton && (
                                <button
                                    onClick={popUpFn}
                                    className="mt-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-0.5 text-sm rounded-full shadow-md hover:from-red-600 hover:to-orange-600 transition-all flex items-center cursor-pointer gap-2 animate-bounce"
                                >
                                    Verify Now
                                </button>
                            )}

                            <div className="relative w-full flex items-center justify-center mt-2 mb-2">
                                <div className="absolute left-0 top-1/2 w-full h-px bg-gray-500"></div>
                                <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 text-sm rounded-full font-bold shadow-md max-w-[200px] w-full text-white z-10">
                                    {(userProfile.isOtpVerified || userProfile.emailVerified) ? (
                                        <span className="font-medium">Profile Complete 93%</span>
                                    ) : (
                                        <span className="text-yellow-300 font-bold animate-pulse">⚠️ Not Verified! Please verify</span>
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
                    <li><Link to="/my-profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"><FaUserAlt className="text-blue-500" /> আমার প্রোফাইল</Link></li>
                    <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"><FaInfoCircle className="text-blue-600" /> আমাদের সম্পর্কে</Link></li>
                    <li><Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        ফেভারিটা প্রোডাক্ট
                    </Link></li>
                    <li><Link to="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"><FaLock className="text-purple-700" /> গোপনীয়তা নীতি</Link></li>
                    <li><Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        সেটিংস
                    </Link></li>
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;