import { useState, useRef, useEffect } from 'react';
import { FaBriefcase, FaChartLine, FaUserPlus, FaUsers, FaEllipsisV, FaTasks, FaChevronDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const navbarRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
                setOpenSubmenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSubmenu = (index) => {
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    const closeAllMenus = () => {
        setMobileMenuOpen(false);
        setOpenSubmenu(null);
    };

    const adminMenuItems = [
        {
            to: "/admin-panel/dashboard",
            label: "Dashboard",
            icon: <FaChartLine className="mr-2" />
        },
        {
            to: "/admin-panel/users",
            label: "Users",
            icon: <FaUsers className="mr-2" />
        },
        {
            to: "/admin-panel/make-paid-user",
            label: "Make Paid",
            icon: <FaUserPlus className="mr-2" />
        },
        {
            to: "/admin-panel/active-job",
            label: "Active Jobs",
            icon: <FaBriefcase className="mr-2" />
        },
        {
            label: "Active Jobs Update",
            icon: <FaTasks className="mr-2" />,
            submenu: [
                {
                    to: "/admin-panel/active-jobs-update/demo1",
                    label: "Demo 1"
                },
                {
                    to: "/admin-panel/active-jobs-update/demo2",
                    label: "Demo 2"
                },
                {
                    to: "/admin-panel/active-jobs-update/demo3",
                    label: "Demo 3"
                }
            ]
        }
    ];

    return (
        <nav
            ref={navbarRef}
            className="fixed top-14 left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg z-50"
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Brand/Logo */}
                    <h1 className="text-white text-xl font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-pink-300">
                            Admin Panel
                        </span>
                    </h1>

                    {/* 3-dot Mobile Menu Button */}
                    <div className="relative">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-white rounded-full hover:bg-white/20 focus:outline-none transition-colors"
                            aria-label="Toggle menu"
                        >
                            <FaEllipsisV className="text-xl" />
                        </button>

                        {/* Premium Mobile Dropdown Menu */}
                        {mobileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-white/20 backdrop-blur-lg">
                                <div className="py-2 bg-gradient-to-br from-indigo-500 to-purple-600">
                                    <h3 className="px-4 py-2 text-sm font-medium text-white/90">Admin Menu</h3>
                                </div>

                                <div className="divide-y divide-white/10">
                                    {adminMenuItems.map((item, index) => (
                                        <div key={index} className="group">
                                            {item.submenu ? (
                                                <>
                                                    <button
                                                        onClick={() => toggleSubmenu(index)}
                                                        className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-all duration-300
                                    ${openSubmenu === index
                                                                ? 'bg-gradient-to-r from-indigo-100/80 to-purple-100/80 text-indigo-800'
                                                                : 'text-gray-700 hover:bg-white/90 hover:text-indigo-600'
                                                            }`
                                                        }
                                                    >
                                                        <div className="flex items-center">
                                                            <span className={`p-2 mr-2 rounded-lg ${openSubmenu === index ? 'bg-indigo-600/10 text-indigo-600' : 'bg-white/5 text-gray-600 group-hover:bg-indigo-500/10 group-hover:text-indigo-600'}`}>
                                                                {item.icon}
                                                            </span>
                                                            <span>{item.label}</span>
                                                        </div>
                                                        <span className={`transform transition-transform ${openSubmenu === index ? 'rotate-180 text-indigo-600' : 'text-gray-500'}`}>
                                                            <FaChevronDown size={12} />
                                                        </span>
                                                    </button>

                                                    {openSubmenu === index && (
                                                        <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 pl-6 pr-2 py-1 space-y-1">
                                                            {item.submenu.map((subItem, subIndex) => (
                                                                <NavLink
                                                                    key={subIndex}
                                                                    to={subItem.to}
                                                                    className={({ isActive }) =>
                                                                        `block px-4 py-2.5 text-sm rounded-lg transition-all duration-300
                                                ${isActive
                                                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                                                                            : 'text-indigo-700 hover:bg-indigo-500/10 hover:text-indigo-600'
                                                                        }`
                                                                    }
                                                                    onClick={closeAllMenus}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <span className="w-1 h-1 mr-3 rounded-full bg-indigo-400"></span>
                                                                        {subItem.label}
                                                                    </div>
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <NavLink
                                                    to={item.to}
                                                    className={({ isActive }) =>
                                                        `flex items-center px-4 py-3 text-sm transition-all duration-300
                                ${isActive
                                                            ? 'bg-gradient-to-r from-indigo-100/80 to-purple-100/80 text-indigo-800'
                                                            : 'text-gray-700 hover:bg-white/90 hover:text-indigo-600'
                                                        }`
                                                    }
                                                    onClick={closeAllMenus}
                                                >
                                                    <span className={({ isActive }) =>
                                                        `p-2 mr-2 rounded-lg ${isActive
                                                            ? 'bg-indigo-600/10 text-indigo-600'
                                                            : 'bg-white/5 text-gray-600 group-hover:bg-indigo-500/10 group-hover:text-indigo-600'
                                                        }`
                                                    }>
                                                        {item.icon}
                                                    </span>
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Menu Footer */}
                                <div className="px-4 py-3 text-xs text-center text-gray-500 bg-white/50 border-t border-white/20">
                                    © {new Date().getFullYear()} Admin Panel
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;