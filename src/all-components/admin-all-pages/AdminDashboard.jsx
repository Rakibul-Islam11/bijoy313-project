import { FaUsers, FaBoxOpen, FaClock, FaChartPie, FaArrowUp, FaRegBell, FaSearch, FaCog } from 'react-icons/fa';
import { BsGraphUp, BsCurrencyDollar } from 'react-icons/bs';

const AdminDashboard = () => {
    // Sample data with more metrics
    const stats = [
        {
            title: "Total Users",
            value: "5,842",
            change: "+12.5%",
            icon: <FaUsers className="text-2xl" />,
            bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
            trend: [3, 5, 6, 8, 7, 9, 12]
        },
        {
            title: "Active Products",
            value: "1,256",
            change: "+8.2%",
            icon: <FaBoxOpen className="text-2xl" />,
            bg: "bg-gradient-to-br from-teal-500 to-emerald-600",
            trend: [2, 4, 5, 7, 6, 8, 8]
        },
        {
            title: "Pending Orders",
            value: "128",
            change: "-3.1%",
            icon: <FaClock className="text-2xl" />,
            bg: "bg-gradient-to-br from-amber-500 to-orange-600",
            trend: [5, 4, 3, 2, 3, 2, 1]
        },
        {
            title: "Monthly Revenue",
            value: "$28,950",
            change: "+24.7%",
            icon: <BsCurrencyDollar className="text-2xl" />,
            bg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
            trend: [4, 6, 7, 9, 10, 12, 15]
        }
    ];

    const activities = [
        { id: 1, action: "New order #12345", time: "5 mins ago", icon: <FaBoxOpen />, color: "text-blue-500" },
        { id: 2, action: "User registration", time: "32 mins ago", icon: <FaUsers />, color: "text-green-500" },
        { id: 3, action: "System update", time: "2 hours ago", icon: <FaCog />, color: "text-purple-500" },
        { id: 4, action: "Payment processed", time: "5 hours ago", icon: <BsCurrencyDollar />, color: "text-amber-500" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            {/* Header with Search and Notifications */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">Welcome back, Admin! Here's your analytics summary.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        />
                    </div>
                    <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md text-gray-600 relative">
                        <FaRegBell />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.bg} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                    >
                        <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                            {stat.icon}
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-medium opacity-90 mb-1">{stat.title}</p>
                            <p className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</p>

                            <div className="flex items-center justify-between">
                                <div className={`flex items-center text-sm ${stat.change.startsWith('+') ? 'text-green-200' : 'text-red-200'}`}>
                                    <FaArrowUp className={`mr-1 ${!stat.change.startsWith('+') ? 'transform rotate-180' : ''}`} />
                                    {stat.change} this month
                                </div>

                                {/* Animated Trend Graph */}
                                <div className="flex items-end h-10 w-20">
                                    {stat.trend.map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 mx-0.5 bg-white bg-opacity-30 rounded-t-sm transition-all duration-300 hover:bg-opacity-50"
                                            style={{ height: `${h * 2}px` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <BsGraphUp className="mr-2 text-purple-600" />
                            Recent Activities
                        </h2>
                        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">View All</button>
                    </div>

                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 group">
                                <div className={`p-2 rounded-lg mr-3 ${activity.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">{activity.action}</p>
                                    <p className="text-sm text-gray-500">{activity.time}</p>
                                </div>
                                <button className="text-gray-400 hover:text-purple-600 p-1">
                                    <FaArrowUp className="transform rotate-45" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    {/* Performance Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3">System Performance</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>CPU Usage</span>
                                    <span>42%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '42%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Memory</span>
                                    <span>65%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Storage</span>
                                    <span>28%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '28%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Add User", icon: <FaUsers className="text-blue-500" /> },
                                { label: "New Product", icon: <FaBoxOpen className="text-emerald-500" /> },
                                { label: "View Orders", icon: <FaClock className="text-amber-500" /> },
                                { label: "Settings", icon: <FaCog className="text-purple-500" /> }
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                                >
                                    <div className="p-2 rounded-lg bg-opacity-10 group-hover:bg-opacity-20 mb-2 transition-all">
                                        {action.icon}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;