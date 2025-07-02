import { useContext, useEffect, useRef, useState } from "react";
import { MobileMenuContext } from "../../all-contexts/MobileMenuContext";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock, FaInfoCircle } from "react-icons/fa";
import { MdWallet } from "react-icons/md";
import navlogo from '../../assets/navbrand-logo/Untitled design (4).png';
import { getAuth } from "firebase/auth";

const MobileMenu = () => {
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(MobileMenuContext);
    const menuRef = useRef(null);
    const [userProfile, setUserProfile] = useState(null);
    const auth = getAuth();

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const response = await fetch(`/users/by-uid/${user.uid}`);
                    const data = await response.json();
                    if (data.success) {
                        setUserProfile(data.user);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [auth.currentUser]);

    // Detect click outside
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

    // Phone number masking function
    const maskPhoneNumber = (phone) => {
        if (!phone) return '';
        const digits = phone.replace(/\D/g, '');
        if (digits.length <= 5) return phone;
        return `${digits.substring(0, 3)}****${digits.substring(digits.length - 2)}`;
    };

    return (
        <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out 
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} w-[85%] sm:w-72 flex flex-col`}
        >
            {/* Profile Section - Sticky */}
            <div className="sticky top-0 bg-white z-10 border-b">
                <div className="flex flex-col items-center px-4 pt-5 pb-5">
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
                            {userProfile.businessId && (
                                <p className="text-gray-600 text-sm">
                                    Business ID: {userProfile.businessId}
                                </p>
                            )}
                            <button className={`mt-3 bg-gradient-to-r text-white px-4 py-1.5 text-sm rounded-full font-bold shadow ${userProfile.profileComplete ?
                                    'from-green-500 to-teal-500' :
                                    'from-indigo-500 to-purple-500'
                                }`}>
                                Profile {userProfile.profileComplete ? 'Complete' : 'Incomplete'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="animate-pulse space-y-2 w-full">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                                <div className="h-8 bg-gray-200 rounded-full w-3/4 mx-auto mt-2"></div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Menu Items - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2 px-4 py-2 text-gray-800 text-sm font-medium">
                    <li>
                        <Link
                            to="/home"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FiHome className="text-orange-500" /> হোম
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FaUserAlt className="text-blue-500" /> আমার প্রোফাইল
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile/edit-name"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FaUserAlt className="text-blue-500" /> আমার নাম
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile/edit-photo"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FaUserAlt className="text-blue-500" /> আমার ছবি
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/earned"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdWallet className="text-purple-600" /> উপার্জিত পয়েন্টস
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/voucher"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdWallet className="text-purple-600" /> ভাউচার পয়েন্টস
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/stg-voucher"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdWallet className="text-purple-600" /> STG ভাউচার পয়েন্টস
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/recharge"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdWallet className="text-purple-600" /> রিচার্জ পয়েন্টস
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/recharge-matching"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdWallet className="text-purple-600" /> রিচার্জ ম্যাচিং পয়েন্টস
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/subscription"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdWallet className="text-purple-600" /> সাবস্ক্রিপশন পয়েন্টস
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FaInfoCircle className="text-blue-600" /> আমাদের সম্পর্কে
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/privacy-policy"
                            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FaLock className="text-purple-700" /> গোপনীয়তা নীতি
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;