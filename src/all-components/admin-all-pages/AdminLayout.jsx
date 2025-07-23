import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar - Only shown on screens smaller than md (768px) */}
            <div className="md:hidden">
                <AdminNavbar />
            </div>

            <div className="flex">
                {/* Sidebar - Only shown on screens md (768px) and larger */}
                <div className="hidden md:block">
                    <AdminSidebar />
                </div>

                {/* Main content area */}
                <div className="flex-1 md:pl-64 pt-6 md:pt-0 min-h-screen mt-24 md:mt-14">
                    <div className="p-4">
                        <Outlet /> {/* Main content outlet */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;