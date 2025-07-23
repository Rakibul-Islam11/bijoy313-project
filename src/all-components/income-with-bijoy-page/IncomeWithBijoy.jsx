import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaMoneyBill, FaUsers, FaRegFileAlt, FaArrowRight, FaCrown, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiAward, FiDollarSign } from "react-icons/fi";

const IncomeWithBijoy = () => {
    const sliderRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Color mapping for consistent styling
    const colorMap = {
        amber: { from: "from-amber-400", to: "to-amber-600", text: "text-amber-600", bgLight: "bg-amber-50", border: "border-amber-100" },
        gray: { from: "from-gray-400", to: "to-gray-600", text: "text-gray-600", bgLight: "bg-gray-50", border: "border-gray-100" },
        pink: { from: "from-pink-400", to: "to-pink-600", text: "text-pink-600", bgLight: "bg-pink-50", border: "border-pink-100" },
        teal: { from: "from-teal-400", to: "to-teal-600", text: "text-teal-600", bgLight: "bg-teal-50", border: "border-teal-100" },
        purple: { from: "from-purple-400", to: "to-purple-600", text: "text-purple-600", bgLight: "bg-purple-50", border: "border-purple-100" },
        indigo: { from: "from-indigo-400", to: "to-indigo-600", text: "text-indigo-600", bgLight: "bg-indigo-50", border: "border-indigo-100" },
        yellow: { from: "from-yellow-400", to: "to-yellow-600", text: "text-yellow-600", bgLight: "bg-yellow-50", border: "border-yellow-100" },
        orange: { from: "from-orange-400", to: "to-orange-600", text: "text-orange-600", bgLight: "bg-orange-50", border: "border-orange-100" },
        blue: { from: "from-blue-400", to: "to-blue-600", text: "text-blue-600", bgLight: "bg-blue-50", border: "border-blue-100" },
        rose: { from: "from-rose-400", to: "to-rose-600", text: "text-rose-600", bgLight: "bg-rose-50", border: "border-rose-100" },
        lime: { from: "from-lime-400", to: "to-lime-600", text: "text-lime-600", bgLight: "bg-lime-50", border: "border-lime-100" }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 font-['Poppins'] bg-gradient-to-br from-gray-50 to-gray-100 mt-14">
            {/* Premium Header with Metallic Accent */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-amber-100 shadow-lg overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full transform translate-x-12 -translate-y-12"></div>
                    <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 relative z-10">
                        আয় শুরু করুন বিজয় এর সাথে
                    </h1>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                </div>
            </div>

            {/* Diamond Icon Grid with Hover Effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { icon: <FaRegFileAlt />, title: "ইনকাম রিপোর্ট", path: "/chaneel", color: "amber" },
                    { icon: <FaChartBar />, title: "ইনকাম সামারি", path: "/gra-chaneel", color: "blue" },
                    { icon: <FaUsers />, title: "গ্রাহক চ্যানেল", path: "/grahol-chaneel", color: "pink" },
                    { icon: <FaMoneyBill />, title: "বিজনেস নীতিমালা", path: "/ahol-chaneel", color: "purple" }
                ].map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className={`${colorMap[item.color].bgLight} rounded-xl p-5 border ${colorMap[item.color].border} shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-white/0 opacity-80"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`p-4 mb-3 rounded-full bg-white shadow-inner border ${colorMap[item.color].border} group-hover:rotate-12 transition-transform duration-500 ${colorMap[item.color].text}`}>
                                {React.cloneElement(item.icon, { className: "text-2xl" })}
                            </div>
                            <h3 className="font-bold text-gray-800">{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Luxury Button Group with Gold Accents */}
            <div className="flex flex-col md:flex-row gap-4">
                <button className="relative flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FiAward className="text-xl" />
                    <span>লিডারশিপ রিওয়ার্ড</span>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-200 group-hover:translate-x-1 transition-transform">
                        <FaCrown />
                    </div>
                </button>
                <button className="relative flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FiDollarSign className="text-xl" />
                    <span>লিডারশিপ সেলারি</span>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-200 group-hover:translate-x-1 transition-transform">
                        <FaArrowRight />
                    </div>
                </button>
            </div>

            {/* Premium Courses Section */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl opacity-10 blur-md group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-amber-100 shadow-md">
                    <h2 className="text-center font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
                        বিজয় ডিজিটাল প্রোডাক্ট (ডিরেক্ট সেলস ইনকাম)
                    </h2>
                </div>
            </div>

            {/* 3D Course Cards Section - Responsive View */}
            <div className="relative">
                <h2 className="text-xl font-bold mb-4 text-gray-800">আমাদের কোর্সসমূহ</h2>

                {isMobile ? (
                    /* Mobile & Tablet Slider View (below 1024px) */
                    <div className="relative group">
                        {/* Navigation Arrows */}
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg text-amber-600 hover:bg-amber-50 transform transition-all hover:scale-110 -translate-x-4"
                        >
                            <FaChevronLeft className="text-xl" />
                        </button>

                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg text-amber-600 hover:bg-amber-50 transform transition-all hover:scale-110 translate-x-4"
                        >
                            <FaChevronRight className="text-xl" />
                        </button>

                        {/* Cards Slider */}
                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 gap-6"
                            style={{ scrollSnapType: 'x mandatory' }}
                        >
                            {[
                                { title: "অ্যাডভান্স আর্নিং কোর্স", color: "purple", buttonText: "কোর্সে প্রবেশ করুন" },
                                { title: "প্রফেশনাল আর্নিং", color: "teal", buttonText: "কোর্সে প্রবেশ করুন" },
                                {
                                    title: "এক নজরে বিজয় ওয়েবসাইট",
                                    color: "amber",
                                    buttonText: "ভিডিও দেখুন",
                                    icon: <FaPlay className="ml-2" />
                                },
                                { title: "ডিজিটাল মার্কেটিং", color: "blue", buttonText: "কোর্সে প্রবেশ করুন" },
                                { title: "ফ্রিল্যান্সিং গাইড", color: "pink", buttonText: "কোর্সে প্রবেশ করুন" }
                            ].map((course, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-96 rounded-2xl shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl snap-start relative overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[course.color].from} ${colorMap[course.color].to}`}></div>
                                    <div className="relative p-6 h-full">
                                        <h3 className="text-xl font-bold text-white mb-6">{course.title}</h3>
                                        <button className={`relative z-10 w-full py-3 rounded-lg font-bold bg-white/20 backdrop-blur-sm text-white shadow-md hover:bg-white/30 transition-all duration-300 transform hover:scale-[1.02] border border-white/20 flex items-center justify-center`}>
                                            {course.buttonText}
                                            {course.icon || <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Indicators */}
                        <div className="flex justify-center gap-2 mt-4">
                            {[1, 2, 3, 4, 5].map((dot, idx) => (
                                <div key={idx} className="w-2 h-2 rounded-full bg-gray-300"></div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Desktop Grid View (1024px and above) */
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "অ্যাডভান্স আর্নিং কোর্স", color: "purple", buttonText: "কোর্সে প্রবেশ করুন" },
                            { title: "প্রফেশনাল আর্নিং", color: "teal", buttonText: "কোর্সে প্রবেশ করুন" },
                            {
                                title: "এক নজরে বিজয় ওয়েবসাইট",
                                color: "amber",
                                buttonText: "ভিডিও দেখুন",
                                icon: <FaPlay className="ml-2" />
                            }
                        ].map((course, idx) => (
                            <div
                                key={idx}
                                className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[course.color].from} ${colorMap[course.color].to}`}></div>
                                <div className="relative p-6 h-full">
                                    <h3 className="text-xl font-bold text-white mb-6">{course.title}</h3>
                                    <button className={`relative z-10 w-full py-3 rounded-lg font-bold bg-white/20 backdrop-blur-sm text-white shadow-md hover:bg-white/30 transition-all duration-300 transform hover:scale-[1.02] border border-white/20 flex items-center justify-center`}>
                                        {course.buttonText}
                                        {course.icon || <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Luxury Product Cards with Fixed Colors */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "এডভান্স আর্নিং প্যাকেজ", color: "amber" },
                    { title: "প্রফেশনাল আর্নিং কোর্স", color: "gray" },
                    { title: "বিজয় রিসেলিং", color: "pink" },
                    { title: "রিসেলার রুটিং", color: "teal" },
                    { title: "ই-কমার্স ভেঞ্চারশীপ", color: "purple" },
                    { title: "মোবাইল রিচার্জ", color: "indigo" },
                    { title: "রিচার্জ পেমেন্ট", color: "yellow" },
                    { title: "ড্রাইভ অফার", color: "orange" },
                    { title: "ড্রাইভ এজেন্ট", color: "blue" },
                    { title: "সার্টিফিকেশন পাথওয়ে", color: "rose" },
                    { title: "ক্রাউড বিজনেস", color: "lime" }
                ].map((item, idx) => (
                    <div key={idx} className={`bg-white rounded-xl overflow-hidden shadow-xl border ${colorMap[item.color].border} transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group`}>
                        <div className={`h-2 bg-gradient-to-r ${colorMap[item.color].from} ${colorMap[item.color].to}`}></div>
                        <div className="p-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">বিস্তারিত জানতে এখানে ক্লিক করুন</p>
                                </div>
                                <div className={`p-3 rounded-full ${colorMap[item.color].bgLight} ${colorMap[item.color].text} transform transition-all duration-300 group-hover:rotate-45`}>
                                    <FaArrowRight />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncomeWithBijoy;