import { FaMoneyBillWave, FaBriefcase } from 'react-icons/fa';

    
const EarningsSection = ({ userData }) => {

    // Calculate earnings data from userData
    const completedJobs = userData?.jobs?.filter(job => job.status === 'completed') || [];
    const activeJobs = userData?.jobs?.filter(job => job.status === 'active') || [];

    // Calculate total earnings from completed jobs
    const totalEarnings = completedJobs.reduce((sum, job) => sum + (job.price || 0), 0);

    // Calculate monthly income (this month's earnings)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyIncome = completedJobs
        .filter(job => {
            const jobDate = new Date(job.completedDate || job.createdAt);
            return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
        })
        .reduce((sum, job) => sum + (job.price || 0), 0);
    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-[#c5064f]">💰 Earnings Dashboard</h2>
                <p className="text-gray-600">Track your income and financial growth</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Earnings */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Total Earnings</h3>
                            <p className="text-2xl font-bold mt-1">৳ {totalEarnings.toLocaleString()}</p>
                        </div>
                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                            <FaMoneyBillWave className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        22% from last year
                    </div>
                </div>

                {/* Monthly Income */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Monthly Income</h3>
                            <p className="text-2xl font-bold mt-1">৳ {monthlyIncome.toLocaleString()}</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        8% from last month
                    </div>
                </div>

                {/* Average Project Value */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Avg. Project Value</h3>
                            <p className="text-2xl font-bold mt-1">৳ {(totalEarnings / (completedJobs.length || 1)).toLocaleString()}</p>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        15% increase
                    </div>
                </div>

                {/* Active Projects */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-amber-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Active Projects</h3>
                            <p className="text-2xl font-bold mt-1">{activeJobs.length}</p>
                        </div>
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                            <FaBriefcase className="h-6 w-6" />
                        </div>
                    </div>
                    <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                        View projects
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Monthly Earnings Chart */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Monthly Earnings</h3>
                        <select className="text-sm border rounded px-2 py-1">
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">Monthly earnings chart visualization</p>
                    </div>
                </div>

                {/* Earnings by Category */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Earnings by Category</h3>
                        <select className="text-sm border rounded px-2 py-1">
                            <option>This Year</option>
                            <option>Last Year</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">Earnings by category chart visualization</p>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Recent Transactions</h3>
                    <button className="text-[#c5064f] text-sm font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client/Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[
                                { id: 1, date: '15 Jul 2023', client: 'Acme Corp', project: 'Website Redesign', amount: '৳ 25,000', status: 'Paid' },
                                { id: 2, date: '10 Jul 2023', client: 'Global Tech', project: 'Mobile App', amount: '৳ 42,500', status: 'Pending' },
                                { id: 3, date: '5 Jul 2023', client: 'Sunrise Media', project: 'Brand Identity', amount: '৳ 18,000', status: 'Paid' },
                                { id: 4, date: '28 Jun 2023', client: 'Data Systems', project: 'Dashboard UI', amount: '৳ 32,000', status: 'Paid' },
                            ].map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{transaction.client}</div>
                                        <div className="text-sm text-gray-500">{transaction.project}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {transaction.status}
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
        </div>
    );
};

export default EarningsSection;