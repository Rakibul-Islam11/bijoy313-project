import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <nav className="fixed text-white top-0 left-0 w-full bg-blue-500 mt-15 shadow-md z-50">
            <div className="container mx-auto px-4 py-2">
                <h1 className='text-black text-2xl font-bold mb-2'>Admin Panel</h1>
                <ul className="flex space-x-6 text-black">
                    <li>
                        <NavLink
                            to="/admin-panel/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? 'font-bold text-red-600 text-white'
                                    : 'hover:text-blue-300 text-white'
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin-panel/users"
                            className={({ isActive }) =>
                                isActive
                                    ? 'font-bold text-red-600 text-white'
                                    : 'hover:text-blue-300 text-white'
                            }
                        >
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin-panel/make-paid-user"
                            className={({ isActive }) =>
                                isActive
                                    ? 'font-bold text-red-600 text-white'
                                    : 'hover:text-blue-300 text-white'
                            }
                        >
                            Make User Paid
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNavbar;
