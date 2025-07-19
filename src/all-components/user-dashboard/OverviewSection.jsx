import { FaBookOpen, FaBriefcase, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import walletImg from '../../assets/wallet-img/image.png'
const OverviewSection = ({ userData }) => {
    // overview এর সকল কোড এখানে পেস্ট করুন
    
    return (
        <div className="space-y-6 text-black">
            {/* Desktop Layout */}
            <div className="hidden md:block">

                {/* Welcome Header */}
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-[#c5064f]">👋 Welcome to your Dashboard</h2>
                    <p className="text-gray-700">Manage your freelance business and earnings</p>
                </div>

                {/* Premium Wallet Section */}
                <div className="bg-gradient-to-r from-[#c5064f] to-[#e63772] p-6 rounded-2xl shadow-lg text-white">
                    <div
                        className="flex justify-between items-start text-white bg-cover bg-center rounded-xl p-[10px]"
                        style={{
                            backgroundImage: `url(${walletImg})`,
                            backdropFilter: 'blur(10px)',
                            backgroundBlendMode: 'soft-light',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.18)',
                        }}
                    >
                        <div>
                            <h3 className="font-medium opacity-90">Total Balance</h3>
                            <p className="text-3xl font-bold my-2">৳ </p>
                            <p className="text-sm opacity-80">Available to withdraw: ৳ </p>
                        </div>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <FaMoneyBillWave className="h-8 w-8" />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <p className="text-xs opacity-80">This Month</p>
                            <p className="font-semibold">৳ </p>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <p className="text-xs opacity-80">Pending</p>
                            <p className="font-semibold">৳ </p>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <p className="text-xs opacity-80">Withdrawn</p>
                            <p className="font-semibold">৳ </p>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        {/* Deposit */}
                        <button
                            
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Deposit
                        </button>

                        {/* Withdraw */}
                        <button
                           
                        >
                            <FaMoneyBillWave className="h-5 w-5" />
                            Withdraw
                        </button>

                        {/* Transfer */}
                        <button
                            
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Transfer
                        </button>

                        {/* History */}
                        <button
                           
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                            History
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Earnings Card */}
                    <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-600">Earnings</h3>
                                <p className="text-2xl font-bold mt-1">৳ </p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                <FaMoneyBillWave className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            18% from last month
                        </div>
                    </div>

                    {/* Jobs Card */}
                    <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-600">Active Jobs</h3>
                                <p className="text-2xl font-bold mt-1"></p>
                            </div>
                            <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                <FaBriefcase className="h-6 w-6" />
                            </div>
                        </div>
                        <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                            View all jobs
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Courses Card */}
                    <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-600">My Courses</h3>
                                <p className="text-2xl font-bold mt-1"></p>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                <FaBookOpen className="h-6 w-6" />
                            </div>
                        </div>
                        <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                            Continue learning
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Referrals Card */}
                    <div className="bg-white p-5 rounded-xl shadow border-l-4 border-amber-500">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-600">Referrals</h3>
                                <p className="text-2xl font-bold mt-1"></p>
                            </div>
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                <FaUsers className="h-6 w-6" />
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Earn $50 per referral</p>
                    </div>
                </div>

                {/* Transaction History Preview */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Recent Transactions</h3>
                        <button className="text-[#c5064f] text-sm font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 1, type: 'credit', amount: 450.00, description: 'Project Payment - Website Redesign', date: 'Today, 10:45 AM', status: 'completed' },
                            { id: 2, type: 'debit', amount: 120.00, description: 'Withdrawal to Bank', date: 'Yesterday, 3:22 PM', status: 'completed' },
                            { id: 3, type: 'credit', amount: 275.50, description: 'Project Payment - Mobile App', date: 'Jul 8, 2023', status: 'pending' }
                        ].map(transaction => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {transaction.type === 'credit' ? (
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
                                    <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.type === 'credit' ? '+' : '-'}৳{transaction.amount.toFixed(2)}
                                    </p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Post a New Service
                        </button>
                        <button className="px-4 py-2 border border-[#c5064f] text-[#c5064f] rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Invite Friends
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Browse Jobs
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Explore Courses
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="block md:hidden space-y-6">
                {/* Welcome Header */}
                <div>
                    <h2 className="text-xl font-bold mb-1 text-[#c5064f]">👋 Welcome!</h2>
                    <p className="text-sm text-gray-700">Manage your freelance business</p>
                </div>

                {/* Accordion Wallet Summary */}
                <details className="bg-gradient-to-r from-[#c5064f] to-[#e63772] p-2 rounded-2xl shadow-lg text-white overflow-hidden group">
                    <summary className="cursor-pointer list-none">
                        <div
                            className="relative bg-gradient-to-r from-[#c5064f] to-[#e63772] text-white p-4 rounded-t-2xl"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${walletImg})`,
                                backdropFilter: 'blur(10px)',
                                backgroundBlendMode: 'soft-light',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            {/* Arrow toggle */}
                            {/* Global CSS for breathing animation */}
                            <style>{`
                                        @keyframes breathe {
                                        0%, 100% {
                                            transform: scale(1);
                                        }
                                        50% {
                                            transform: scale(1.17);
                                        }
                                        }
                                        .animate-breathe {
                                        animation: breathe 1s ease-in-out infinite;
                                        }
                                    `}</style>


                            <span className="absolute top-4 right-4 text-white">
                                {/* Down Arrow */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 transition-transform duration-300 group-open:hidden animate-breathe"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>

                                {/* Up Arrow */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 transition-transform duration-300 hidden group-open:inline animate-breathe"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </span>

                            <p className="font-semibold text-lg">💰 Wallet Summary</p>
                            <div className="mt-2">
                                <h3 className="font-medium opacity-90">Total Balance</h3>
                                <p className="text-2xl font-bold my-1">৳ </p>
                                <p className="text-sm opacity-80">Available: ৳ </p>
                            </div>
                        </div>
                    </summary>
                    <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-1 gap-2">
                            <div className="bg-white/10 p-2 rounded-lg">
                                <p className="text-xs opacity-80">This Month</p>
                                <p className="font-semibold">৳ </p>
                            </div>
                            <div className="bg-white/10 p-2 rounded-lg">
                                <p className="text-xs opacity-80">Pending</p>
                                <p className="font-semibold">৳ </p>
                            </div>
                            <div className="bg-white/10 p-2 rounded-lg">
                                <p className="text-xs opacity-80">Withdrawn</p>
                                <p className="font-semibold">৳ </p>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {["deposit", "withdraw", "transfer", "history"].map(type => (
                                <button
                                    key={type}
                                    
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </details>

                {/* Stats Cards - Horizontal Scroll */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-2">
                    {/* Each card: add min-width and snap */}
                    <div className="min-w-[220px] snap-start bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
                        <h3 className="font-semibold text-gray-600">Earnings</h3>
                        <p className="text-xl font-bold mt-1">৳ </p>
                    </div>
                    <div className="min-w-[220px] snap-start bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
                        <h3 className="font-semibold text-gray-600">Jobs</h3>
                        <p className="text-xl font-bold mt-1"></p>
                    </div>
                    <div className="min-w-[220px] snap-start bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
                        <h3 className="font-semibold text-gray-600">Courses</h3>
                        <p className="text-xl font-bold mt-1"></p>
                    </div>
                    <div className="min-w-[220px] snap-start bg-white p-4 rounded-xl shadow border-l-4 border-amber-500">
                        <h3 className="font-semibold text-gray-600">Referrals</h3>
                        <p className="text-xl font-bold mt-1"></p>
                    </div>
                </div>

                {/* Transactions - 2 Preview */}
                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="font-bold text-md mb-3">Recent Transactions</h3>
                    {[...[
                        { id: 1, type: 'credit', amount: 450.00, description: 'Project Payment', date: 'Today', status: 'completed' },
                        { id: 2, type: 'debit', amount: 120.00, description: 'Withdraw', date: 'Yesterday', status: 'completed' }
                    ]].map(tx => (
                        <div key={tx.id} className="flex justify-between items-center py-2 border-b">
                            <div>
                                <p className="font-medium">{tx.description}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                            <div className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                {tx.type === 'credit' ? '+' : '-'}৳{tx.amount.toFixed(2)}
                            </div>
                        </div>
                    ))}
                    <button className="mt-3 text-[#c5064f] text-sm font-medium">View All</button>
                </div>

                {/* Quick Actions - Grid 2-cols */}
                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="font-bold text-md mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="px-3 py-2 bg-[#c5064f] text-white rounded-lg text-sm">Post Service</button>
                        <button className="px-3 py-2 border border-[#c5064f] text-[#c5064f] rounded-lg text-sm">Invite Friends</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm">Browse Jobs</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm">Explore Courses</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;