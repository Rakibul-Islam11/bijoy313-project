import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaSearch, FaStar, FaArrowLeft, FaHistory } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import insta from '../../../assets/active-job-img/pngwing.com.png';
import gmail from '../../../assets/active-job-img/pngwing.com (3).png';
import facebook from '../../../assets/active-job-img/pngwing.com (1).png';
import whatsapp from '../../../assets/active-job-img/pngwing.com (2).png';

const allJobs = [
    {
        id: "instagram",
        name: "ইনস্টাগ্রাম মার্কেটিং",
        logo: insta,
        price: "৳2",
        priceValue: 2,
        badge: "Popular",
        detailsPath: "/active-jobs/instagram",
        rating: 4.8
    },
    {
        id: "gmail",
        name: "জিমেইল মার্কেটিং",
        logo: gmail,
        price: "৳5",
        priceValue: 5,
        badge: "Trending",
        detailsPath: "/active-jobs/gmail",
        rating: 4.5
    },
    {
        id: "whatsapp",
        name: "হোয়াটসঅ্যাপ মার্কেটিং",
        logo: whatsapp,
        price: "৳1",
        priceValue: 8,
        badge: "Popular",
        detailsPath: "/active-jobs/whatsapp",
        rating: 4.7
    },
    {
        id: "facebook",
        name: "ফেসবুক মার্কেটিং",
        logo: facebook,
        price: "৳5",
        priceValue: 6,
        badge: "Trending",
        detailsPath: "/active-jobs/facebook",
        rating: 4.9
    },
];

const ActiveJobs = () => {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredJobs = allJobs.filter((job) => {
        // Search filter
        const matchesSearch = job.name.toLowerCase().includes(search.toLowerCase());

        // Active filter
        let matchesFilter = true;
        if (activeFilter === "trending") {
            matchesFilter = job.badge === "Trending";
        } else if (activeFilter === "popular") {
            matchesFilter = job.badge === "Popular";
        }

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="w-[90%] mt-16 md:mt-20 mx-auto py-2 md:py-8 text-black relative">
            {/* Premium 3D Back Button */}
            <Link
                to="/dashboard"
                className="absolute top-1 md:top-2 left-0 z-10 group"
            >
                <div className="relative hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/40 to-indigo-400/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10 font-medium">ড্যাশবোর্ডে ফিরে যান</span>
                </div>
            </Link>

            {/* Premium 3D History Button */}
            <Link
                to="/dashboard?section=history" // বা আপনার রাউটিং স্ট্রাকচার অনুযায়ী লিংক
                className="absolute top-1 md:top-2 right-0 z-10 group"
            >
                <div className="relative hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-400/40 to-indigo-400/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaHistory className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10 font-medium">কাজের হিস্টোরি দেখুন</span>
                </div>
            </Link>

            {/* Button For Mobile Screen */}
            <div className="flex md:hidden flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                {/* Premium 3D Back Button */}
                <Link
                    to="/dashboard"
                    className="group"
                >
                    <div className="relative inline-flex items-center px-4 py-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/40 to-indigo-400/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="relative z-10 font-medium">ড্যাশবোর্ডে ফিরে যান</span>
                    </div>
                </Link>

                {/* Premium 3D History Button */}
                <Link
                    to="/dashboard?section=history" // বা আপনার রাউটিং স্ট্রাকচার অনুযায়ী লিংক
                    className="group"
                >
                    <div className="relative inline-flex items-center px-4 py-2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-purple-400/40 to-indigo-400/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaHistory className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="relative z-10 font-medium">কাজের হিস্টোরি দেখুন</span>
                    </div>
                </Link>
            </div>
            
            {/* Premium Search Header */}
            <div className="text-center mb-4 hidden sm:block">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 md:mt-0 mb-2">
                    সোশ্যাল মিডিয়া মার্কেটিং জবস
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    উচ্চ মানের মার্কেটিং জবস খুঁজুন এবং আপনার দক্ষতা কাজে লাগান
                </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="mb-4 mt-2 sm:mt-0 relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="জব টাইপ বা প্ল্যাটফর্ম লিখুন..."
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-[#e3eec4] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-3 mb-3 sm:mb-8">
                <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === "all" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    সব জব
                </button>
                <button
                    onClick={() => setActiveFilter("trending")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === "trending" ? "bg-pink-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    <MdTrendingUp /> ট্রেন্ডিং
                </button>
                <button
                    onClick={() => setActiveFilter("popular")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === "popular" ? "bg-purple-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    <FaStar /> পপুলার
                </button>
            </div>

            {/* Premium Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredJobs.map((job) => (
                    <Link
                        to={job.detailsPath}
                        key={job.id}
                        className="relative group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        {/* Bookmark Icon */}
                        <div className="absolute top-4 left-4 z-10">
                            <FaBookmark className={`text-2xl ${job.badge === 'Trending' ? 'text-pink-800' : 'text-blue-800'} opacity-80 group-hover:opacity-100 transition-opacity`} />
                        </div>

                        {/* Logo Area with Gradient Background */}
                        <div className={`h-32 flex items-center justify-center ${job.id === "instagram" ? "bg-gradient-to-br from-pink-500 to-yellow-500" :
                            job.id === "facebook" ? "bg-gradient-to-br from-blue-600 to-blue-400" :
                                job.id === "whatsapp" ? "bg-gradient-to-br from-green-600 to-green-400" :
                                    "bg-gradient-to-br from-red-500 to-blue-500"}`}>
                            <img src={job.logo} alt={job.name} className="w-30 object-contain filter drop-shadow-lg" />
                        </div>

                        {/* Job Content */}
                        <div className="p-5 bg-[#d6f1aaf6]">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${job.badge === 'Trending' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {job.badge}
                                </span>
                                <div className="flex items-center text-yellow-500">
                                    <FaStar className="text-sm" />
                                    <span className="ml-1 text-gray-700 font-medium">{job.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-2">{job.name}</h3>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold text-black">{job.price}</span>
                                <button className="px-4 md:px-6 py-3 bg-green-600 text-white text-sm md:text-md rounded-lg hover:bg-blue-700 transition-colors">
                                    বিস্তারিত
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
                <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FaSearch className="text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">কোনো জব পাওয়া যায়নি</h3>
                    <p className="text-gray-500">আপনার সার্চ কুয়েরির সাথে মিলে এমন কোনো জব খুঁজে পাওয়া যায়নি</p>
                </div>
            )}
        </div>
    );
};

export default ActiveJobs;