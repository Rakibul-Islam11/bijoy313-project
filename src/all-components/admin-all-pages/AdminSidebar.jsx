import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaBriefcase, FaChartLine, FaTasks, FaTimes, FaUserPlus, FaUsers, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleSubmenu = (index) => {
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    const menuItemClasses = {
        base: "flex items-center w-full p-3 rounded-lg mx-2 transition-all duration-300",
        active: "bg-white/20 backdrop-blur-md text-white shadow-lg",
        inactive: "text-gray-300 hover:bg-white/10 hover:shadow-md",
        hoverEffect: "transform hover:scale-[1.02]",
        icon: "mr-3 transition-transform",
        iconHover: "scale-110"
    };

    const subMenuItemClasses = {
        base: "flex items-center p-2 pl-8 rounded-lg mx-2 text-sm transition-all duration-300",
        active: "bg-purple-100 text-purple-800",
        inactive: "text-gray-300 hover:bg-purple-500/20"
    };

    const adminMenuItems = [
        {
            to: "/admin-panel/dashboard",
            label: "Dashboard",
            icon: <FaChartLine />
        },
        {
            to: "/admin-panel/users",
            label: "Users",
            icon: <FaUsers />
        },
        {
            to: "/admin-panel/make-paid-user",
            label: "Make User Paid",
            icon: <FaUserPlus />
        },
        {
            to: "/admin-panel/active-job",
            label: "Active Jobs",
            icon: <FaBriefcase />
        },
        {
            label: "Active Jobs Update",
            icon: <FaTasks />,
            submenu: [
                { to: "/admin-panel/active-jobs-update/demo1", label: "all active job update" },
                { to: "/admin-panel/active-jobs-update/demo2", label: "Demo 2" },
                { to: "/admin-panel/active-jobs-update/demo3", label: "Demo 3" }
            ]
        }
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-40 h-full w-56 bg-gradient-to-b from-indigo-900 to-purple-900 shadow-2xl
                    transform transition-all duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:top-0 md:mt-0
                `}
            >
                <div className="p-4 pt-20 h-full flex flex-col">
                    <div className="mb-8 px-2">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                            Admin Panel
                        </h2>
                        <div className="h-1 mt-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    </div>

                    <ul className="space-y-2 flex-1">
                        {adminMenuItems.map((item, index) => (
                            <li key={index}>
                                {item.submenu ? (
                                    <>
                                        <button
                                            onClick={() => toggleSubmenu(index)}
                                            className={`
                                                ${menuItemClasses.base}
                                                ${openSubmenu === index ? menuItemClasses.active : menuItemClasses.inactive}
                                                ${menuItemClasses.hoverEffect}
                                            `}
                                            onMouseEnter={() => setHoveredItem(index)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <span className={`${menuItemClasses.icon} ${hoveredItem === index ? menuItemClasses.iconHover : ''}`}>
                                                {item.icon}
                                            </span>
                                            <span className="font-medium flex-1 text-left">{item.label}</span>
                                            <span className="text-xs">
                                                {openSubmenu === index ? <FaChevronDown /> : <FaChevronRight />}
                                            </span>
                                        </button>

                                        {openSubmenu === index && (
                                            <ul className="space-y-1 mt-1">
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <NavLink
                                                            to={subItem.to}
                                                            className={({ isActive }) =>
                                                                `${subMenuItemClasses.base}
                                                                ${isActive ? subMenuItemClasses.active : subMenuItemClasses.inactive}`
                                                            }
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {subItem.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `${menuItemClasses.base}
                                            ${isActive ? menuItemClasses.active : menuItemClasses.inactive}
                                            ${menuItemClasses.hoverEffect}`
                                        }
                                        onClick={() => setIsOpen(false)}
                                        onMouseEnter={() => setHoveredItem(index)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <span className={`${menuItemClasses.icon} ${hoveredItem === index ? menuItemClasses.iconHover : ''}`}>
                                            {item.icon}
                                        </span>
                                        <span className="font-medium flex-1">{item.label}</span>
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto p-2 text-center text-xs text-gray-400">
                        © {new Date().getFullYear()} Admin Panel
                    </div>
                </div>
            </aside>

            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                />
            )}
        </>
    );
};

export default AdminSidebar;