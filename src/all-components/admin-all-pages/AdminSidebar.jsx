import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Toggle Button for Mobile */}
            <div className="md:hidden fixed top-40 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-800 p-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0  left-0 z-40 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:top-20 md:mt-0 md:block
                `}
            >
                <div className="p-4 mt-16 md:mt-20 text-black">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/admin-panel/dashboard"
                                className={({ isActive }) =>
                                    `block p-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
                                }
                                onClick={() => setIsOpen(false)} // close sidebar on mobile
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin-panel/active-job"
                                className={({ isActive }) =>
                                    `block p-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Active Job Report
                            </NavLink>
                        </li>
                        {/* Add more links as needed */}
                    </ul>
                </div>
            </aside>

            {/* Backdrop for mobile when sidebar is open */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                />
            )}
        </>
    );
};

export default AdminSidebar;
