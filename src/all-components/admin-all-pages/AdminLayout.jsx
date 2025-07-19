// AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />
                <div className="flex-1 pl-64 pt-20 min-h-screen">
                    <div className="p-4">
                        <Outlet /> {/* Main content outlet */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;