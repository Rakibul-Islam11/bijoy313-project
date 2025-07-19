import { useState, useEffect } from 'react';
import './physicAndDigipro.css';

const PhysicalDigitalPro = () => {
    const [activeTab, setActiveTab] = useState('physical');
    const [hoveredItem, setHoveredItem] = useState(null);
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const physicalProducts = [
        { name: 'পোশাক (শার্ট, প্যান্ট, শাড়ি, হিজাব ইত্যাদি)', icon: 'https://cdn-icons-png.flaticon.com/512/265/265219.png' },
        { name: 'জুতা ও এক্সেসরিজ', icon: 'https://cdn-icons-png.flaticon.com/512/4845/4845942.png' },
        { name: 'ইলেকট্রনিকস (মোবাইল, ল্যাপটপ, হেডফোন, চার্জার)', icon: 'https://cdn-icons-png.flaticon.com/512/679/679720.png' },
        { name: 'ফার্নিচার (চেয়ার, টেবিল, সোফা)', icon: 'https://cdn-icons-png.flaticon.com/512/2361/2361099.png' },
        { name: 'কিচেন আইটেম (হাঁড়ি-পাতিল, ব্লেন্ডার, রাইস কুকার)', icon: 'https://cdn-icons-png.flaticon.com/512/2809/2809307.png' },
        { name: 'গ্রোসারি পণ্য (চাল, ডাল, তেল, মসলা)', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081617.png' },
        { name: 'খেলনা (টয়স, গেমিং এক্সেসরিজ)', icon: 'https://cdn-icons-png.flaticon.com/512/3676/3676735.png' },
        { name: 'স্বাস্থ্য ও বিউটি প্রোডাক্ট (ফেসওয়াশ, মেকআপ, লোশন)', icon: 'https://cdn-icons-png.flaticon.com/512/2619/2619623.png' },
        { name: 'বই/পুস্তক', icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' },
        { name: 'গার্ডেনিং টুলস (গাছ, টব, ফার্টিলাইজার)', icon: 'https://cdn-icons-png.flaticon.com/512/3133/3133319.png' },
        { name: 'গাড়ির যন্ত্রাংশ', icon: 'https://cdn-icons-png.flaticon.com/512/861/861053.png' },
        { name: 'জিম ও ফিটনেস ইকুইপমেন্ট (ডাম্বেল, রোড ব্যান্ড)', icon: 'https://cdn-icons-png.flaticon.com/512/1000/1000949.png' },
    ];

    const digitalProducts = [
        { name: 'সফটওয়্যার / অ্যাপ (ল্যাপটপ বা মোবাইল অ্যাপ)', icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055666.png' },
        { name: 'ই-বুক (PDF বা EPUB ফরম্যাট)', icon: 'https://cdn-icons-png.flaticon.com/512/6045/6045802.png' },
        { name: 'ডিজিটাল কোর্স (Udemy, Skillshare বা নিজস্ব কোর্স)', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920272.png' },
        { name: 'ওয়েবসাইট টেমপ্লেট / থিম (HTML, WordPress)', icon: 'https://cdn-icons-png.flaticon.com/512/2887/2887550.png' },
        { name: 'গ্রাফিক ডিজাইন টেমপ্লেট (Canva, Photoshop PSD, Illustrator Files)', icon: 'https://cdn-icons-png.flaticon.com/512/4836/4836710.png' },
        { name: 'প্রিন্টেবলস (ক্যালেন্ডার, স্টিকার ডিজাইন, প্ল্যানার)', icon: 'https://cdn-icons-png.flaticon.com/512/1150/1150247.png' },
        { name: 'মিউজিক বা অডিও ফাইল (বিট, ব্যাকগ্রাউন্ড মিউজিক, সাউন্ড এফেক্ট)', icon: 'https://cdn-icons-png.flaticon.com/512/126/126480.png' },
        { name: 'ভিডিও প্রোডাক্ট (স্টক ভিডিও, এডিটিং টেমপ্লেট)', icon: 'https://cdn-icons-png.flaticon.com/512/400/400877.png' },
        { name: 'ডিজিটাল সাবস্ক্রিপশন (মেম্বারশিপ, লাইসেন্স কী)', icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233481.png' },
        { name: 'স্টক ফটো / গ্রাফিক্স', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920286.png' },
        { name: 'কোড বা স্ক্রিপ্ট (JavaScript, Python লাইব্রেরি)', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png' },
        { name: 'ফন্ট / আইকন প্যাক', icon: 'https://cdn-icons-png.flaticon.com/512/2402/2402927.png' },
    ];

    return (
        <div
            className=" mx-auto p-4 sm:p-6 lg:py-8 bg-gray-950 rounded-3xl border border-gray-800 shadow-2xl  font-sans relative overflow-hidden"
            onMouseMove={!isMobile ? handleMouseMove : undefined}
        >
            {/* Animated background glow - only on desktop */}
            {!isMobile && (
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px at ${glowPosition.x}px ${glowPosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
                    }}
                />
            )}

            {/* Glassmorphism tabs */}
            <div className="flex justify-center mb-6 sm:mb-10 relative z-10">
                <div className="bg-white/30 backdrop-blur-md  rounded-full shadow-lg inline-flex border border-white/20">
                    <button
                        className={`py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-lg font-bold transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] focus:outline-none 
                            ${activeTab === 'physical'
                                ? 'text-white bg-gradient-to-r from-pink-500 via-purple-500 to-rose-600 rounded-full shadow-lg transform translate-y-[-2px] scale-105'
                                : 'text-gray-300 hover:text-white bg-transparent'
                            } rounded-full relative overflow-hidden group`}
                        onClick={() => setActiveTab('physical')}
                    >
                        {activeTab === 'physical' && (
                            <span className="absolute inset-0 bg-white/10 backdrop-blur-sm"></span>
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${activeTab === 'physical' ? 'bg-white' : 'bg-pink-500 group-hover:animate-pulse'}`}></span>
                            ফিজিক্যাল প্রডাক্ট
                        </span>
                    </button>
                    <button
                        className={`py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-lg font-bold transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] focus:outline-none 
                            ${activeTab === 'digital'
                                ? 'text-white bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 rounded-full shadow-lg transform translate-y-[-2px] scale-105'
                                : 'text-gray-300 hover:text-white bg-transparent'
                            } rounded-full relative overflow-hidden group`}
                        onClick={() => setActiveTab('digital')}
                    >
                        {activeTab === 'digital' && (
                            <span className="absolute inset-0 bg-white/10 backdrop-blur-sm"></span>
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${activeTab === 'digital' ? 'bg-white' : 'bg-indigo-500 group-hover:animate-pulse'}`}></span>
                            ডিজিটাল প্রডাক্ট
                        </span>
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="mt-6 sm:mt-8 relative">
                {/* Floating particles - only on desktop */}
                {!isMobile && (
                    <>
                        {activeTab === 'physical' && (
                            <>
                                <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-pink-500/30 animate-float1"></div>
                                <div className="absolute top-1/4 right-20 w-2 h-2 rounded-full bg-rose-400/40 animate-float2"></div>
                                <div className="absolute bottom-20 left-1/3 w-4 h-4 rounded-full bg-pink-600/20 animate-float3"></div>
                            </>
                        )}
                        {activeTab === 'digital' && (
                            <>
                                <div className="absolute top-20 right-32 w-3 h-3 rounded-full bg-indigo-500/30 animate-float1"></div>
                                <div className="absolute top-1/3 left-24 w-2 h-2 rounded-full bg-purple-400/40 animate-float2"></div>
                                <div className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-indigo-600/20 animate-float3"></div>
                            </>
                        )}
                    </>
                )}

                {/* Content container */}
                <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-sm border ${activeTab === 'physical' ? 'border-pink-900/50' : 'border-indigo-900/50'} bg-gray-900/50 relative overflow-hidden transition-all duration-500`}>
                    {/* Animated grid pattern */}
                    <div className={`absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] ${activeTab === 'physical' ? 'bg-pink-900' : 'bg-indigo-900'}`}>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    </div>

                    {/* Header */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 sm:mb-10 text-center relative">
                        <span className={`inline-block pb-2 bg-clip-text text-transparent ${activeTab === 'physical' ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-rose-500' : 'bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-500'}`}>
                            {activeTab === 'physical' ? 'ফিজিক্যাল প্রডাক্ট মেনু' : 'ডিজিটাল প্রডাক্ট মেনু'}
                        </span>
                        <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 ${activeTab === 'physical' ? 'bg-gradient-to-r from-pink-500 to-rose-600' : 'bg-gradient-to-r from-indigo-500 to-purple-600'} rounded-full`}></span>
                    </h3>

                    {/* Products grid */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 relative">
                        {(activeTab === 'physical' ? physicalProducts : digitalProducts).map((product, index) => (
                            <li
                                key={index}
                                className={`p-3 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden group
                                ${hoveredItem === index ?
                                        (activeTab === 'physical' ?
                                            'bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-rose-900/30 ring-1 ring-pink-500/30 z-10 shadow-lg' :
                                            'bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 ring-1 ring-indigo-500/30 z-10 shadow-lg') :
                                        'bg-gray-800/50 hover:bg-gray-800/70 shadow-md'
                                    }`}
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {/* 3D hover effect */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeTab === 'physical' ? 'bg-pink-900/10' : 'bg-indigo-900/10'}`}></div>

                                {/* Content */}
                                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                                    {/* Icon with gradient border and 3D effect */}
                                    <div className={`flex-shrink-0 relative p-0.5 rounded-lg  ${activeTab === 'physical' ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-rose-600' : 'bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600'} group-hover:scale-110 transition-transform duration-300 `}>
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gray-800 flex items-center justify-center p-2 group-hover:bg-gray-900 transition-all duration-300 bg-white">
                                            <div
                                                className="w-5 h-5 sm:w-6 sm:h-6 bg-contain bg-center bg-no-repeat group-hover:scale-125 transition-transform duration-300"
                                                style={{ backgroundImage: `url('${product.icon}')` }}
                                                aria-label={`${product.name} icon`}
                                            />
                                        </div>
                                    </div>

                                    {/* Product name */}
                                    <span className="text-gray-100 font-medium text-xs sm:text-sm leading-tight flex-grow">
                                        {product.name}
                                    </span>

                                    {/* Animated arrow */}
                                    <svg
                                        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-all duration-300 ${hoveredItem === index ?
                                            (activeTab === 'physical' ? 'text-pink-400 translate-x-1' : 'text-indigo-400 translate-x-1') :
                                            'text-gray-500'
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </div>

                                {/* Active indicator */}
                                {hoveredItem === index && (
                                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${activeTab === 'physical' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500' : 'bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500'} animate-pulse`}></div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Floating action button - hidden on mobile */}
            {!isMobile && (
                <div className="absolute bottom-6 right-6 z-10">
                    <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${activeTab === 'physical' ? 'bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700' : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'} transform hover:scale-110 group`}>
                        <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhysicalDigitalPro;