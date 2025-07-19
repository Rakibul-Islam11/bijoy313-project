import React, { useState } from 'react';
import { FaRocket, FaHome, FaQuestionCircle, FaClipboardList, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import banner from '../../../assets/micro-job-img/banner.png';
import youtube from '../../../assets/micro-job-img/youtube.png';
import fb from '../../../assets/micro-job-img/facebook.png';
import gmail from '../../../assets/micro-job-img/gmail.png';
import sb from '../../../assets/micro-job-img/subscribe.png';
import  Marquee  from 'react-fast-marquee';

const jobs = [
    {
        title: "Youtube channel subscribe",
        vacancies: 50,
        date: "27-04-25",
        pay: "$0.05",
        img: youtube
    },
    {
        title: "FB Video Watch/Page Like/Post...",
        vacancies: 250,
        date: "12-03-24",
        pay: "$0.02",
        img: fb
    },
    {
        title: "Sign-up and verify your gmail.",
        vacancies: 65,
        date: "14-12-23",
        pay: "$0.03",
        img: gmail
    },
    {
        title: "YouTube subscriber",
        vacancies: 150,
        date: "27-08-23",
        pay: "$0.02",
        img: sb
    },
];

const categories = [
    "All Category", "Collect / Extract Contact", "Data Entry", "Facebook",
    "Influencer Marketing", "Instagram", "Link Building", "Logo Design",
    "Mobile Application", "Others", "Review"
];

const featuredJobs = [
    {
        title: "Twitter Follow Campaign",
        pay: "$0.04"
    },
    {
        title: "Instagram Story View",
        pay: "$0.03"
    },
    {
        title: "Website Testing",
        pay: "$0.10"
    }
];

const menuItems = [
    { id: 1, icon: <FaHome />, label: "Home" },
    { id: 2, icon: <FaQuestionCircle />, label: "FAQs" },
    { id: 3, icon: <FaClipboardList />, label: "All jobs" },
    { id: 4, icon: <FaSignInAlt />, label: "Login" },
    { id: 5, icon: <FaUserPlus />, label: "Register" },
];

const MicroJobs = () => {
    const [activeItem, setActiveItem] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleItemClick = (id) => {
        setActiveItem(id);
        // এখানে আপনি রাউটিং লজিক বা অন্যান্য ফাংশনালিটি যোগ করতে পারেন
        console.log(`Clicked: ${menuItems.find(item => item.id === id).label}`);
    };

    const toggleCategory = (category) => {
        if (category === "All Category") {
            setSelectedCategories(prev =>
                prev.includes("All Category") ? [] : ["All Category"]
            );
        } else {
            setSelectedCategories(prev => {
                const newSelection = prev.includes(category)
                    ? prev.filter(c => c !== category && c !== "All Category")
                    : [...prev.filter(c => c !== "All Category"), category];
                return newSelection;
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen text-gray-800 relative">
            {/* Left Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-white/95 to-indigo-50/30 backdrop-blur-xl p-6 hidden lg:block lg:fixed lg:h-screen z-30 shadow-2xl border-r border-white/30">
                {/* Brand Area */}
                <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FaRocket className="text-amber-300 text-xl" />
                    </div>
                    <h2 className="text-xl font-bold">bijoy313</h2>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 text-left
                            ${activeItem === item.id ?
                                    'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border border-indigo-400/20 shadow-sm' :
                                    'hover:bg-white/80 border border-transparent hover:border-white/30 text-gray-700 hover:text-indigo-600'
                                }`
                            }
                        >
                            <div className={`p-2 rounded-lg shadow-sm transition-all duration-300
                            ${activeItem === item.id ?
                                    'bg-gradient-to-r from-indigo-500 to-purple-500' :
                                    'bg-indigo-100 group-hover:bg-gradient-to-r from-indigo-100 to-purple-100'
                                }`
                            }>
                                {React.cloneElement(item.icon, {
                                    className: `${activeItem === item.id ? 'text-white' : 'text-indigo-600'
                                        } transition-colors duration-300`
                                })}
                            </div>
                            <span className={`font-medium ${activeItem === item.id ? 'text-indigo-700' : 'text-gray-700'
                                }`}>
                                {item.label}
                            </span>
                            {activeItem === item.id && (
                                <div className="ml-auto w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-white/20">
                    <p className="text-xs text-center text-gray-500 mb-1">Premium Membership</p>
                    <p className="text-xs text-center text-indigo-400/80 font-medium">© 2025 Capital eWork</p>
                </div>
            </aside>

            {/* For lg to small screen left sidebar */}
            <div className="w-full bg-gradient-to-r from-white/95 to-indigo-50/30 backdrop-blur-xl sm:p-4 shadow-2xl border-b border-white/30 block lg:hidden sticky top-0 z-40">
                {/* Marquee কম্পোনেন্ট ব্যবহার করুন */}
                <Marquee
                    pauseOnHover={true}
                    pauseOnClick={true}
                    speed={40}
                    gradient={false}
                    className="py-2 space-x-4"
                >
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id, item.path)}
                            className={`flex-shrink-0 flex items-center gap-2 px-2 sm:px-5 py-1 sm:py-2.5 mx-1 rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-400
                    ${activeItem === item.id ?
                                    'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' :
                                    'bg-white/90 text-indigo-600 hover:bg-indigo-50 shadow-sm border border-white/30'
                                }`
                            }
                        >
                            <span className={`text-lg ${activeItem === item.id ? 'text-white' : 'text-indigo-500'}`}>
                                {React.cloneElement(item.icon, {
                                    className: `text-lg ${activeItem === item.id ? 'text-white' : 'text-indigo-500'}`
                                })}
                            </span>
                            <span className="font-medium">{item.label}</span>
                            {activeItem === item.id && (
                                <span className="ml-1 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            )}
                        </button>
                    ))}
                </Marquee>
            </div>


            {/* For lg to small screen right sidebar */}
            <div className="w-full bg-gradient-to-r from-white/95 to-indigo-50/30 backdrop-blur-xl p-1 sm:p-4 shadow-2xl border-t border-white/30 block lg:hidden sm:mt-2 sticky bottom-0 z-30">
                {/* Header */}
                <div className="flex items-center justify-between sm:mb-3">
                    <h3 className="font-extrabold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Job Categories {selectedCategories.length > 0 && `(${selectedCategories.length} selected)`}
                    </h3>
                    {selectedCategories.length > 0 && (
                        <button
                            onClick={() => setSelectedCategories([])}
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Marquee Categories */}
                <Marquee pauseOnHover pauseOnClick speed={45} gradient={false} className="space-x-3 py-1">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => toggleCategory(cat)}
                            className={`mr-3 group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex-shrink-0
                            ${selectedCategories.includes(cat)
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                                    : 'bg-white/90 hover:bg-white text-indigo-700 shadow-sm hover:shadow-md border border-white/30'
                                }`
                            }
                        >
                            <span className="font-medium text-sm whitespace-nowrap">
                                {cat}
                            </span>
                            {selectedCategories.includes(cat) && (
                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </Marquee>

                {/* Selected Categories Preview */}
                {selectedCategories.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/30">
                        <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((cat, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1 text-xs bg-indigo-500 text-white px-3 py-1.5 rounded-full"
                                >
                                    {cat}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCategory(cat);
                                        }}
                                        className="ml-1 hover:text-indigo-200 text-sm"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={() => console.log("Applied filters:", selectedCategories)}
                            className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            Apply Filters ({selectedCategories.length})
                        </button>
                    </div>
                )}
            </div>


            {/* Main Content */}
            <div className="w-[100%] flex-1 flex flex-col min-h-screen lg:ml-72 lg:mr-80">
                <main className="w-[100%] flex-1 p-4 sm:p-6 overflow-y-auto">
                    {/* Header */}
                    <div className="bg-white/80 backdrop-blur-lg p-6 lg:p-8 rounded-2xl shadow-2xl flex flex-col xl:flex-row justify-between items-center gap-6 mb-8 border border-white/20">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Find the Best Micro Jobs in Our Marketplace</h2>
                            <p className="text-gray-600 mt-3">Capital eWork is the premier platform for micro job opportunities and talent.</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                                    Find Jobs
                                </button>
                                <button className="bg-white text-gray-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:-translate-y-0.5">
                                    Post A Job
                                </button>
                            </div>
                        </div>
                        <div className="hidden xl:block relative">
                            <img src={banner} alt="banner" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-lg opacity-30 -z-10"></div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-8 p-5 bg-gradient-to-br from-white/90 to-indigo-50/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 gap-5 transition-all duration-300 hover:shadow-2xl">
                        {/* Title with Animated Gradient */}
                        <div className="relative">
                            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                                Latest Jobs
                            </h3>
                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-80"></div>
                        </div>

                        {/* Interactive Filter Controls */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            {/* Sort Select - Glass Morphic */}
                            <div className="relative group flex-1 sm:flex-none">
                                <select className="w-full bg-white/90 backdrop-blur-sm border border-white/30 pl-4 pr-10 py-2.5 rounded-xl shadow-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent transition-all duration-200 hover:bg-white/95 hover:shadow-md cursor-pointer appearance-none">
                                    <option className="bg-white">Sort By Rate</option>
                                    <option className="bg-white">Highest Pay</option>
                                    <option className="bg-white">Newest First</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Filter Select - Glass Morphic */}
                            <div className="relative group flex-1 sm:flex-none">
                                <select className="w-full bg-white/90 backdrop-blur-sm border border-white/30 px-4 py-2.5 rounded-xl shadow-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-200 hover:bg-white/95 hover:shadow-md cursor-pointer appearance-none">
                                    <option className="bg-white">Filter By</option>
                                    <option className="bg-white">Social Media</option>
                                    <option className="bg-white">Data Entry</option>
                                    <option className="bg-white">Verification</option>
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style jsx global>{`
                    @keyframes gradient {
                        0% { background-position: 0% 50% }
                        50% { background-position: 100% 50% }
                        100% { background-position: 0% 50% }
                    }
                    .animate-gradient {
                        background-size: 200% 200%;
                        animation: gradient 6s ease infinite;
                    }
                    `}</style>

                    {/* Job List */}
                    <div className="grid grid-cols-1 gap-6 px-4 sm:px-0">
                        {jobs.map((job, idx) => (
                            <div
                                key={idx}
                                className="relative isolate overflow-hidden rounded-3xl p-[2px] transition-all duration-300 hover:shadow-2xl group"
                                style={{
                                    background: 'linear-gradient(45deg, hsl(263, 85%, 70%), hsl(335, 87%, 70%), hsl(189, 85%, 70%))',
                                    backgroundSize: '300% 300%',
                                    animation: 'gradientPulse 8s ease infinite'
                                }}
                            >
                                {/* Glass Morphic Container */}
                                <div className="bg-white/10 backdrop-blur-xl rounded-[calc(1.5rem-2px)] p-5 lg:p-6 flex flex-col lg:flex-row items-stretch justify-between border border-white/20">

                                    {/* Glowing Orb */}
                                    <div className="absolute -left-10 -top-10 w-32 h-32 bg-purple-500/30 rounded-full filter blur-3xl -z-10"></div>

                                    {/* Left Content */}
                                    <div className="flex flex-col sm:flex-row items-center gap-5 mb-4 lg:mb-0 flex-1 min-w-0">
                                        {/* 3D Avatar */}
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl shadow-inner -z-10"></div>
                                            <img
                                                src={job.img}
                                                alt={job.title}
                                                className="w-16 h-16 object-cover rounded-xl border-2 border-white/50 shadow-lg relative transform transition-transform group-hover:rotate-[5deg]"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full shadow-md z-10">
                                                {idx + 1}
                                            </div>
                                        </div>

                                        {/* Job Details */}
                                        <div className="text-center sm:text-left flex-1 min-w-0">
                                            <h4 className="font-extrabold text-xl text-white text-shadow-black truncate drop-shadow-md text-wrap">
                                                {job.title}
                                            </h4>
                                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                                                <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                                                    ⚡ {job.vacancies} Positions
                                                </span>
                                                <span className="px-3 py-1 bg-white/5 text-white/80 text-xs font-medium rounded-full backdrop-blur-sm border border-white/5 flex items-center">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    {job.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 lg:gap-3 border-t lg:border-t-0 lg:border-l border-white/30 pt-4 lg:pt-0 lg:pl-5 lg:ml-5">
                                        {/* Animated Price - Darker Gradient */}
                                        <div className="relative">
                                            <p className="font-black text-black bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500 text-2xl whitespace-nowrap drop-shadow-md">
                                                {job.pay}
                                            </p>
                                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-black to-black rounded-full shadow-md"></div>
                                        </div>

                                        {/* Holographic Button - Darker & More Vibrant */}
                                        <button className="relative overflow-hidden px-6 py-2.5 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 group">
                                            <span className="relative z-10 flex items-center">
                                                Apply Now
                                                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-purple-700/30 to-pink-700/30 rounded-xl backdrop-blur-sm border border-white/30"></span>
                                            <span className="absolute inset-0 rounded-xl shadow-inner opacity-20"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <style jsx global>{`
                    @keyframes gradientPulse {
                        0% { background-position: 0% 50% }
                        50% { background-position: 100% 50% }
                        100% { background-position: 0% 50% }
                    }
                    `}</style>
                </main>

                <footer className="bg-white/80 backdrop-blur-lg p-4 text-center text-sm text-gray-600 border-t border-white/20">
                    © 2025 Capital eWork - All Rights Reserved
                </footer>
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:block w-80 p-6 bg-gradient-to-b from-white/95 to-indigo-50/20 backdrop-blur-xl fixed right-0 h-screen overflow-y-auto z-20 shadow-2xl border-l border-white/30">
                {/* Categories Section */}
                <div className="mb-8">
                    <h3 className="font-extrabold text-2xl pb-3 mb-5 border-b border-white/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                        Job Categories
                    </h3>
                    <ul className="space-y-2">
                        {categories.map((cat, idx) => (
                            <li key={idx}>
                                <label className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/30">
                                    <div className="relative flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute h-0 w-0 peer"
                                            id={`category-${idx}`}
                                        />
                                        <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center transition-all duration-200 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 group-hover:border-indigo-400 peer-checked:[&>svg]:opacity-100">
                                            <svg className="w-3 h-3 text-white opacity-0 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="flex-1 font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                                        {cat}
                                    </span>
                                    <span className="text-xs bg-indigo-100/80 text-indigo-700 px-2.5 py-1 rounded-full font-medium min-w-[2.5rem] text-center">
                                        {Math.floor(Math.random() * 50) + 10}
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Featured Jobs Section */}
                <div className="mt-8 pt-6 border-t border-white/30">
                    <h4 className="font-bold text-xl mb-5 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Featured Jobs
                    </h4>
                    <div className="space-y-4">
                        {featuredJobs.map((job, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-r from-indigo-50/70 to-purple-50/70 p-4 rounded-xl shadow-sm border border-white/30 hover:shadow-md transition-all duration-300 group"
                            >
                                <h5 className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                                    {job.title}
                                </h5>
                                <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mt-1">
                                    {job.pay}
                                </p>
                                <button className="mt-3 text-sm bg-white/90 text-indigo-600 px-4 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-white/30 hover:bg-indigo-50 hover:text-indigo-700">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/30 text-center">
                    <p className="text-xs text-gray-500 mb-1">Need more options?</p>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
                        Browse All Categories →
                    </button>
                </div>
            </aside>

            <style jsx global>{`
                @keyframes gradient {
                    0% { background-position: 0% 50% }
                    50% { background-position: 100% 50% }
                    100% { background-position: 0% 50% }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 6s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default MicroJobs;
