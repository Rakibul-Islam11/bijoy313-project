import {
    FaCheckCircle,
    FaHourglassHalf,
    FaBookOpen,
    FaUsers,
    FaCrown,
    FaBriefcase,
    FaMoneyBillWave
} from "react-icons/fa";

import walletImg from '../../assets/wallet-img/image.png'
import { useState } from "react";


const DashboardContent = ({ section, userData }) => {
    const [activeButton, setActiveButton] = useState("withdraw");

    const {
        totalEarnings = 0,
        monthlyIncome = 0,
        completedJobs = [],
        pendingJobs = [],
        purchasedCourses = [],
        referrals = 0,
    } = userData || {};

    const isLeader = referrals >= 13;
    const referLeft = 13 - referrals;

    // Sample active jobs data
    const activeJobs = [
        {
            id: 1,
            title: "E-commerce Website",
            client: "ABC Corporation",
            deadline: "2023-12-15",
            progress: 65,
            value: "৳45,000"
        },
        {
            id: 2,
            title: "Mobile App UI Design",
            client: "XYZ Tech",
            deadline: "2023-11-30",
            progress: 30,
            value: "৳32,500"
        }
    ];

    const getButtonClass = (type) =>
        `flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${activeButton === type
            ? "bg-white text-[#c5064f] shadow-md"
            : "bg-transparent border border-white/30 text-white hover:bg-white/10"
    }`;
    
    switch (section) {
        case "overview":
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
                                    <p className="text-3xl font-bold my-2">৳ {totalEarnings.toLocaleString()}</p>
                                    <p className="text-sm opacity-80">Available to withdraw: ৳ {(totalEarnings * 0.7).toLocaleString()}</p>
                                </div>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <FaMoneyBillWave className="h-8 w-8" />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                    <p className="text-xs opacity-80">This Month</p>
                                    <p className="font-semibold">৳ {monthlyIncome.toLocaleString()}</p>
                                </div>
                                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                    <p className="text-xs opacity-80">Pending</p>
                                    <p className="font-semibold">৳ {(totalEarnings * 0.3).toLocaleString()}</p>
                                </div>
                                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                    <p className="text-xs opacity-80">Withdrawn</p>
                                    <p className="font-semibold">৳ {(totalEarnings * 0.7).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                {/* Deposit */}
                                <button
                                    onClick={() => setActiveButton("deposit")}
                                    className={getButtonClass("deposit")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Deposit
                                </button>

                                {/* Withdraw */}
                                <button
                                    onClick={() => setActiveButton("withdraw")}
                                    className={getButtonClass("withdraw")}
                                >
                                    <FaMoneyBillWave className="h-5 w-5" />
                                    Withdraw
                                </button>

                                {/* Transfer */}
                                <button
                                    onClick={() => setActiveButton("transfer")}
                                    className={getButtonClass("transfer")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                    Transfer
                                </button>

                                {/* History */}
                                <button
                                    onClick={() => setActiveButton("history")}
                                    className={getButtonClass("history")}
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
                                        <p className="text-2xl font-bold mt-1">৳ {totalEarnings.toLocaleString()}</p>
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
                                        <p className="text-2xl font-bold mt-1">{activeJobs.length}</p>
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
                                        <p className="text-2xl font-bold mt-1">{purchasedCourses.length}</p>
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
                                        <p className="text-2xl font-bold mt-1">{referrals}</p>
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
                                        <p className="text-2xl font-bold my-1">৳ {totalEarnings.toLocaleString()}</p>
                                        <p className="text-sm opacity-80">Available: ৳ {(totalEarnings * 0.7).toLocaleString()}</p>
                                    </div>
                                </div>
                            </summary>
                            <div className="mt-4 space-y-2">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <p className="text-xs opacity-80">This Month</p>
                                        <p className="font-semibold">৳ {monthlyIncome.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <p className="text-xs opacity-80">Pending</p>
                                        <p className="font-semibold">৳ {(totalEarnings * 0.3).toLocaleString()}</p>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <p className="text-xs opacity-80">Withdrawn</p>
                                        <p className="font-semibold">৳ {(totalEarnings * 0.7).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    {["deposit", "withdraw", "transfer", "history"].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setActiveButton(type)}
                                            className={getButtonClass(type)}
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
                                <p className="text-xl font-bold mt-1">৳ {totalEarnings.toLocaleString()}</p>
                            </div>
                            <div className="min-w-[220px] snap-start bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
                                <h3 className="font-semibold text-gray-600">Jobs</h3>
                                <p className="text-xl font-bold mt-1">{activeJobs.length}</p>
                            </div>
                            <div className="min-w-[220px] snap-start bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
                                <h3 className="font-semibold text-gray-600">Courses</h3>
                                <p className="text-xl font-bold mt-1">{purchasedCourses.length}</p>
                            </div>
                            <div className="min-w-[220px] snap-start bg-white p-4 rounded-xl shadow border-l-4 border-amber-500">
                                <h3 className="font-semibold text-gray-600">Referrals</h3>
                                <p className="text-xl font-bold mt-1">{referrals}</p>
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


        case "earnings":
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{transaction.amount}</td>
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

        case "jobs":
            return (
                <div className="space-y-6 text-black">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#c5064f]">💼 Job Dashboard</h2>
                        <p className="text-gray-600">Manage your current and completed projects</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Active Jobs */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Active Jobs</h3>
                                    <p className="text-2xl font-bold mt-1">{activeJobs.length}</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <FaBriefcase className="h-6 w-6" />
                                </div>
                            </div>
                            <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                                View all
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Pending Jobs */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-yellow-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Pending Jobs</h3>
                                    <p className="text-2xl font-bold mt-1">{pendingJobs.length}</p>
                                </div>
                                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                                    <FaHourglassHalf className="h-6 w-6" />
                                </div>
                            </div>
                            <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                                View requests
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Completed Jobs */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Completed Jobs</h3>
                                    <p className="text-2xl font-bold mt-1">{completedJobs.length}</p>
                                </div>
                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                    <FaCheckCircle className="h-6 w-6" />
                                </div>
                            </div>
                            <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                                View history
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Earnings from Jobs */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Job Earnings</h3>
                                    <p className="text-2xl font-bold mt-1">৳ {totalEarnings.toLocaleString()}</p>
                                </div>
                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                    <FaMoneyBillWave className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                12% from last month
                            </div>
                        </div>
                    </div>

                    {/* Jobs Lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Completed Jobs */}
                        <div className="bg-white p-5 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                                <FaCheckCircle /> Completed Jobs
                            </h3>
                            <ul className="mt-2 text-gray-700 list-disc list-inside">
                                {completedJobs.map((job, i) => (
                                    <li key={i} className="py-1">{job}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Pending Jobs */}
                        <div className="bg-white p-5 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
                                <FaHourglassHalf /> Pending Jobs
                            </h3>
                            <ul className="mt-2 text-gray-700 list-disc list-inside">
                                {pendingJobs.length ? (
                                    pendingJobs.map((job, i) => <li key={i} className="py-1">{job}</li>)
                                ) : (
                                    <li>No pending jobs</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Active Jobs Table */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-bold text-lg mb-4">Active Projects</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activeJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.client}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.deadline}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${job.progress < 30 ? 'bg-red-500' : job.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                        style={{ width: `${job.progress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">{job.progress}%</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{job.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544] flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Create New Proposal
                            </button>
                            <button className="px-4 py-2 border border-[#c5064f] text-[#c5064f] rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Browse Jobs
                            </button>
                        </div>
                    </div>
                </div>
            );

        case "courses":
            return (
                <div className="space-y-6 text-black">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#c5064f]">📚 My Courses</h2>
                        <p className="text-gray-600">Continue learning and upgrade your skills</p>
                    </div>

                    {/* Courses Section */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Your Courses</h3>
                            <button className="text-[#c5064f] text-sm font-medium">Browse All Courses</button>
                        </div>

                        {purchasedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {purchasedCourses.map((course, i) => (
                                    <div key={i} className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                                            <FaBookOpen className="h-12 w-12 text-gray-400" />
                                        </div>
                                        <h4 className="font-semibold">{course}</h4>
                                        <p className="text-sm text-gray-600 mb-2">Course description here</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">In Progress</span>
                                            <span className="text-sm text-gray-500">5h 15m</span>
                                        </div>
                                        <button className="mt-3 w-full py-2 bg-[#c5064f] text-white rounded hover:bg-[#a30544] transition">
                                            Continue Learning
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <FaBookOpen className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No courses purchased yet</h3>
                                <p className="mt-1 text-gray-500">Browse our courses to upgrade your skills</p>
                                <button className="mt-4 px-4 py-2 bg-[#c5064f] text-white rounded hover:bg-[#a30544] transition">
                                    Explore Courses
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Recommended Courses */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-bold text-lg mb-4">Recommended For You</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold">Advanced React Techniques</h4>
                                <p className="text-sm text-gray-600 mb-2">Master modern React patterns</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Premium</span>
                                    <span className="text-sm text-gray-500">8h 42m</span>
                                </div>
                            </div>
                            <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold">Freelance Business Mastery</h4>
                                <p className="text-sm text-gray-600 mb-2">Grow your freelance career</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Free</span>
                                    <span className="text-sm text-gray-500">5h 15m</span>
                                </div>
                            </div>
                            <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold">Client Management 101</h4>
                                <p className="text-sm text-gray-600 mb-2">Build lasting client relationships</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Premium</span>
                                    <span className="text-sm text-gray-500">3h 28m</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "referrals":
            return (
                <div className="space-y-6 text-black">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#c5064f]">👥 Referral Program</h2>
                        <p className="text-gray-600">Earn by inviting friends to our platform</p>
                    </div>

                    {/* Referral Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Total Referrals */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-indigo-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Total Referrals</h3>
                                    <p className="text-2xl font-bold mt-1">{referrals}</p>
                                </div>
                                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                    <FaUsers className="h-6 w-6" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">People you've invited</p>
                        </div>

                        {/* Earnings from Referrals */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Referral Earnings</h3>
                                    <p className="text-2xl font-bold mt-1">৳ {referrals * 50}</p>
                                </div>
                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                    <FaMoneyBillWave className="h-6 w-6" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">$50 per successful referral</p>
                        </div>

                        {/* Leader Status */}
                        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-yellow-500">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-600">Leader Status</h3>
                                    {isLeader ? (
                                        <p className="text-2xl font-bold mt-1 flex items-center">
                                            <FaCrown className="text-yellow-500 mr-2" /> Achieved
                                        </p>
                                    ) : (
                                        <p className="text-2xl font-bold mt-1">{referLeft} more to go</p>
                                    )}
                                </div>
                                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                                    <FaCrown className="h-6 w-6" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                {isLeader ? "You're a platform leader!" : "Refer 13 friends to become a leader"}
                            </p>
                        </div>
                    </div>

                    {/* Referral Content */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-bold text-lg mb-4">Your Referral Link</h3>
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                value={`https://yourplatform.com/ref/${userData?.userId || 'yourusername'}`}
                                readOnly
                                className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
                            />
                            <button className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544] transition">
                                Copy Link
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                            Share this link with friends. When they sign up and complete their first job, you'll earn $50!
                        </p>
                    </div>

                    {/* Referral Tips */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-bold text-lg mb-4">Tips to Get More Referrals</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Share on social media platforms</li>
                            <li>Include in your email signature</li>
                            <li>Mention in freelance communities</li>
                            <li>Offer to help friends get started</li>
                            <li>Explain the benefits they'll receive</li>
                        </ul>
                    </div>

                    {/* Referral History */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Your Referrals</h3>
                            <button className="text-[#c5064f] text-sm font-medium">View All</button>
                        </div>

                        {referrals > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earned</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Array.from({ length: Math.min(3, referrals) }).map((_, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Friend {i + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">৳50</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <FaUsers className="mx-auto h-10 w-10 text-gray-400" />
                                <p className="mt-2 text-gray-600">No referrals yet. Share your link to start earning!</p>
                            </div>
                        )}
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

export default DashboardContent;