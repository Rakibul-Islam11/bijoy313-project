import {
    FaHome,
    FaHandshake,
    FaShoppingBag,
    FaMoneyBillWave,
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaTh,
    FaEllipsisH,
    FaUserPlus
} from 'react-icons/fa';
import { useState, useRef, useEffect, useContext } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const BottomNavbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);
    const { user, logOut } = useContext(authContext);
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileButtonRef.current &&
                !profileButtonRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

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

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#ff0768] shadow-2xl z-50 border-t border-gray-100">
            {/* 3D Effect Base */}
            <div className="relative h-full">
                {/* Floating effect container */}
                <div className="flex justify-between items-center gap-5 px-4 pt-1.5 pb-1 relative">
                    {/* Subtle background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b bg-[#ff0768] to-gray-50 rounded-t-2xl opacity-90"></div>

                    {/* Home */}
                    <div className="flex flex-col items-center z-10 group flex-1">
                        <div className="rounded-xl group-active:scale-95 transition-all duration-200 group-hover:bg-gray-100 group-hover:shadow-sm">
                            <FaHome className="text-2xl text-gray-700 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <span className="text-[15px] mt-1 text-gray-600 group-hover:text-indigo-600 transition-colors">Home</span>
                    </div>

                    {/* Get Services */}
                    <div className="flex flex-col items-center z-10 group flex-1">
                        <div className="rounded-xl group-active:scale-95 transition-all duration-200 group-hover:bg-gray-100 group-hover:shadow-sm">
                            <FaHandshake className="text-2xl text-gray-700 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <span className="text-[15px] mt-1 text-gray-600 group-hover:text-indigo-600 transition-colors">Services</span>
                    </div>

                    {/* Products (Center Circle) - 3D Floating Button */}
                    <div className="relative z-20 group flex flex-col items-center flex-1">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                                      bg-gradient-to-br from-indigo-600 to-indigo-800 
                                      rounded-full p-4 shadow-lg 
                                      border-2 border-white border-opacity-50
                                      group-hover:shadow-xl group-hover:-translate-y-1
                                      transition-all duration-300">
                            <FaShoppingBag className="text-2xl text-white" />
                        </div>
                        <span className="text-md mt-7 text-gray-600 group-hover:text-indigo-600 transition-colors">Products</span>
                    </div>

                    {/* Start Earning */}
                    <div className="flex flex-col items-center z-10 group flex-1">
                        <div className="rounded-xl group-active:scale-95 transition-all duration-200 group-hover:bg-gray-100 group-hover:shadow-sm">
                            <FaMoneyBillWave className="text-2xl text-gray-700 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <span className="text-[15px] mt-1 text-gray-600 group-hover:text-indigo-600 transition-colors">Earn</span>
                    </div>

                    {/* Conditional rendering based on user authentication */}
                    {user ? (
                        /* Profile with Dropdown for logged in users */
                        <div className="flex flex-col items-center z-30 group flex-1 relative">
                            <button
                                ref={profileButtonRef}
                                onClick={toggleProfile}
                                className="rounded-xl group-active:scale-95 transition-all duration-200 group-hover:bg-gray-100 group-hover:shadow-sm"
                            >
                                <FaUser className="text-2xl text-gray-700 group-hover:text-indigo-600 transition-colors" />
                            </button>
                            <span className="text-[15px] mt-1 text-gray-600 group-hover:text-indigo-600 transition-colors">Dashboard</span>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute bottom-full mb-3 w-48 bg-white rounded-lg shadow-xl py-2 z-50 right-0"
                                >
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    >
                                        <FaTh className="mr-3 text-indigo-500" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    >
                                        <FaCog className="mr-3 text-indigo-500" />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    >
                                        <FaSignOutAlt className="mr-3 text-indigo-500" />
                                        Logout
                                    </button>
                                    <Link
                                        to="/more"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                    >
                                        <FaEllipsisH className="mr-3 text-indigo-500" />
                                        Profile
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Join button for guests */
                        <div className="flex flex-col items-center z-10 group flex-1">
                            <Link
                                    to="/pop-up-sign"
                                className="rounded-xl group-active:scale-95 transition-all duration-200 group-hover:bg-gray-100 group-hover:shadow-sm"
                            >
                                <FaUserPlus className="text-2xl text-gray-700 group-hover:text-indigo-600 transition-colors" />
                            </Link>
                            <span className="text-[15px] mt-1 text-gray-600 group-hover:text-indigo-600 transition-colors">Join</span>
                        </div>
                    )}
                </div>

                {/* 3D Edge Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-100 to-transparent opacity-70 rounded-t-2xl"></div>
            </div>
        </div>
    );
};

export default BottomNavbar;