// AdminSidebar.jsx
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="fixed left-0 mt-15 text-black top-20 w-64 h-screen bg-white shadow-md z-40">
            <div className="p-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/admin-panel/dashboard"
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
                            }
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
                        >
                            Active job Report
                        </NavLink>
                    </li>
                    {/* Add more admin links as needed */}
                </ul>
            </div>
        </aside>
    );
};

export default AdminSidebar;