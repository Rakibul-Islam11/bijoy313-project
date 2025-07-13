import {
    FaHome,
    FaFileAlt,
    FaHistory,
    FaUserTie,
    FaWallet,
    FaCog,
    FaPlusCircle,
    FaSearch,
    FaStar,
    FaMoneyBillWave,
    FaUsers
} from "react-icons/fa";

const ClientDashboardContent = ({ section, userData }) => {
    // Sample data - replace with actual data from props or API
    const clientData = {
        activeProjects: 3,
        completedProjects: 12,
        totalSpent: 125000,
        walletBalance: 25000,
        pendingJobs: [
            { id: 1, title: "Website Redesign", freelancer: "John D.", deadline: "2023-12-15", status: "In Progress" },
            { id: 2, title: "Mobile App Development", freelancer: "Sarah M.", deadline: "2023-11-30", status: "Review" }
        ],
        recentTransactions: [
            { id: 1, type: 'payment', amount: 45000, description: 'Payment for Website Redesign', date: 'Today, 10:45 AM', status: 'completed' },
            { id: 2, type: 'deposit', amount: 50000, description: 'Wallet Deposit', date: 'Yesterday, 3:22 PM', status: 'completed' }
        ]
    };

    switch (section) {
        case "overview":
            return (
                <div className="space-y-6 text-black">
                    <div className="space-y-6 text-black">
                        <div>
                            <h2 className="text-2xl font-bold text-[#c5064f]">💰 Your Wallet</h2>
                            <p className="text-gray-600">Manage your funds and transactions</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Balance Card */}
                            <div className="bg-gradient-to-r from-[#c5064f] to-[#e63772] p-5 rounded-xl shadow-lg text-white">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium opacity-90">Current Balance</h3>
                                        <p className="text-3xl font-bold my-2">৳ 25,000</p>
                                    </div>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <FaWallet className="h-8 w-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Add Funds Card */}
                            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-600">Add Funds</h3>
                                        <p className="text-xl font-bold mt-1">৳ 5,000+</p>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                                <button className="mt-4 w-full py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544]">
                                    Add Money
                                </button>
                            </div>

                            {/* Total Spent Card */}
                            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-600">Total Spent</h3>
                                        <p className="text-2xl font-bold mt-1">৳ 125,000</p>
                                    </div>
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm text-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    10% from last month
                                </div>
                            </div>
                        </div>

                        {/* Transactions */}
                        <div className="bg-white p-5 rounded-xl shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">Recent Transactions</h3>
                                <button className="text-[#c5064f] text-sm font-medium">View All</button>
                            </div>
                            <div className="space-y-4">
                                {clientData.recentTransactions.map(transaction => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${transaction.type === 'payment' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {transaction.type === 'payment' ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{transaction.description}</p>
                                                <p className="text-sm text-gray-500">{transaction.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'
                                                }`}>
                                                {transaction.type === 'payment' ? '-' : '+'}৳{transaction.amount.toLocaleString()}
                                            </p>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                                                {transaction.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Welcome Header */}
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-[#c5064f]">👋 Welcome, {userData?.name || "Client"}</h2>
                        <p className="text-gray-700">Manage your projects and freelancers easily</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Active Projects */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Active Projects</h3>
                                    <p className="text-2xl font-bold mt-1">{clientData.activeProjects}</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <FaFileAlt className="h-6 w-6" />
                                </div>
                            </div>
                            <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                                View projects
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Completed Projects */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Completed Projects</h3>
                                    <p className="text-2xl font-bold mt-1">{clientData.completedProjects}</p>
                                </div>
                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                    <FaHistory className="h-6 w-6" />
                                </div>
                            </div>
                            <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                                View history
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Total Spent */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Total Spent</h3>
                                    <p className="text-2xl font-bold mt-1">৳ {clientData.totalSpent.toLocaleString()}</p>
                                </div>
                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                    <FaMoneyBillWave className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                15% from last month
                            </div>
                        </div>

                        {/* Wallet Balance */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-amber-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Wallet Balance</h3>
                                    <p className="text-2xl font-bold mt-1">৳ {clientData.walletBalance.toLocaleString()}</p>
                                </div>
                                <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                    <FaWallet className="h-6 w-6" />
                                </div>
                            </div>
                            <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                                Add Funds
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Active Projects Table */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Active Projects</h3>
                            <button className="text-[#c5064f] text-sm font-medium">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clientData.pendingJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.freelancer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.deadline}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-[#c5064f] hover:text-[#a30544]">Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Recent Transactions</h3>
                            <button className="text-[#c5064f] text-sm font-medium">View All</button>
                        </div>
                        <div className="space-y-4">
                            {clientData.recentTransactions.map(transaction => (
                                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${transaction.type === 'payment' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                            {transaction.type === 'payment' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{transaction.description}</p>
                                            <p className="text-sm text-gray-500">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'
                                            }`}>
                                            {transaction.type === 'payment' ? '-' : '+'}৳{transaction.amount.toLocaleString()}
                                        </p>
                                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544] transition flex items-center gap-2">
                                <FaPlusCircle />
                                Post New Job
                            </button>
                            <button className="px-4 py-2 border border-[#c5064f] text-[#c5064f] rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                <FaSearch />
                                Find Freelancers
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                <FaUserTie />
                                My Freelancers
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                <FaStar />
                                Leave Reviews
                            </button>
                        </div>
                    </div>
                </div>
            );

        case "post-job":
            return (
                <div className="space-y-6 text-black">
                    <div>
                        <h2 className="text-2xl font-bold text-[#c5064f]">📝 Post a New Job</h2>
                        <p className="text-gray-600">Fill out the form to find the perfect freelancer</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                                <textarea rows={4} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                                        <option>Web Development</option>
                                        <option>Mobile App</option>
                                        <option>Graphic Design</option>
                                        <option>Content Writing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Budget (৳)</label>
                                    <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                    <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Skills Required</label>
                                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="e.g. React, Node.js, Figma" />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg mr-2">Save Draft</button>
                                <button type="submit" className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544]">Post Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            );

        case "orders":
            return (
                <div className="space-y-6 text-black">
                    <div>
                        <h2 className="text-2xl font-bold text-[#c5064f]">📋 Your Orders</h2>
                        <p className="text-gray-600">View and manage all your orders</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-[#c5064f] text-white rounded-lg">All</button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg">Active</button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg">Completed</button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg">Cancelled</button>
                            </div>
                            <div>
                                <input type="text" placeholder="Search orders..." className="border border-gray-300 rounded-lg px-3 py-1" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[1, 2, 3].map((order) => (
                                        <tr key={order} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD{1000 + order}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Project {order}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Freelancer {order}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-11-{10 + order}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">৳{15000 * order}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order === 1 ? 'bg-blue-100 text-blue-800' :
                                                        order === 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order === 1 ? 'In Progress' : order === 2 ? 'Completed' : 'Cancelled'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-[#c5064f] hover:text-[#a30544]">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );

        case "freelancers":
            return (
                <div className="space-y-6 text-black">
                    <div>
                        <h2 className="text-2xl font-bold text-[#c5064f]">🧑‍💻 Your Freelancers</h2>
                        <p className="text-gray-600">Manage your hired and saved freelancers</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-[#c5064f] text-white rounded-lg">All</button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg">Hired</button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg">Saved</button>
                            </div>
                            <div>
                                <input type="text" placeholder="Search freelancers..." className="border border-gray-300 rounded-lg px-3 py-1" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((freelancer) => (
                                <div key={freelancer} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-lg font-semibold text-gray-600">F{freelancer}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Freelancer {freelancer}</h4>
                                            <p className="text-sm text-gray-500">Web Developer</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="text-xs text-gray-500 ml-1">(24)</span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-2">
                                        <button className="px-2 py-1 bg-[#c5064f] text-white text-xs rounded hover:bg-[#a30544]">
                                            Message
                                        </button>
                                        <button className="px-2 py-1 border border-gray-300 text-xs rounded hover:bg-gray-50">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "settings":
            return (
                <div className="space-y-6 text-black">
                    <div>
                        <h2 className="text-2xl font-bold text-[#c5064f]">⚙️ Account Settings</h2>
                        <p className="text-gray-600">Manage your profile and preferences</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={userData?.name?.split(' ')[0] || ''} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={userData?.name?.split(' ')[1] || ''} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={userData?.email || ''} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={userData?.phone || ''} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg mr-2">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544]">Save Changes</button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-bold text-lg mb-4">Change Password</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544]">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            );

        default:
            return (
                <div className="text-center py-10 text-black">
                    <h2 className="text-2xl font-bold text-[#c5064f]">⚠️ Section Not Found</h2>
                    <p className="text-gray-600 mt-2">The requested dashboard section doesn't exist</p>
                </div>
            );
    }
};

export default ClientDashboardContent;