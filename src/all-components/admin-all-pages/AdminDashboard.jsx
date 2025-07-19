// AdminDashboard.jsx
const AdminDashboard = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin panel. Select an option from the sidebar.</p>

            {/* Add your dashboard content here */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Total Users</h3>
                    <p className="text-3xl">1,234</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Active Products</h3>
                    <p className="text-3xl">567</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Pending Orders</h3>
                    <p className="text-3xl">89</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;