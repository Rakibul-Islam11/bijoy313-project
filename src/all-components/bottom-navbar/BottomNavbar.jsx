import {
    FaHome,
    FaHandshake,
    FaShoppingBag,
    FaMoneyBillWave,
    FaUser,
    FaUserPlus
} from 'react-icons/fa';
import { useContext } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import './bottomnavbar.css';

const BottomNavbar = () => {
    const { user } = useContext(authContext);
    const location = useLocation();

    const isActiveLink = (path) => location.pathname === path;

    const navItems = [
        { icon: FaHome, text: "Home", path: "/home" },
        { icon: FaHandshake, text: "Services", path: "/services" },
        { icon: FaShoppingBag, text: "Products", path: "/all-products", isCentral: true },
        { icon: FaMoneyBillWave, text: "Earn", path: "/income-with-bijoy" },
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
                                state={{ from: 'bottom-navbar-products' }}
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
                            >
                                <item.icon className={`text-xl ${isActiveLink(item.path) ? 'text-purple-700' : 'text-white'} group-hover:text-purple-700 transition-colors`} />
                                <span className={`text-xs mt-1 font-medium ${isActiveLink(item.path) ? 'text-purple-700' : 'text-white'} group-hover:text-purple-700 transition-colors`}>
                                    {item.text}
                                </span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomNavbar;