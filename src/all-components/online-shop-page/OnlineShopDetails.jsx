import { FaSearch, FaHome, FaUser, FaTags, FaDollarSign, FaComments, FaHeart, FaClipboardList } from "react-icons/fa";
import { HiClipboardList, HiHeart, HiOutlineViewGridAdd } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import banner from '../../assets/banner-img/banner.png'

const OnlineShopDetails = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans mt-[60px]">
            <div className="relative w-full md:h-[320px]">
                {/* Blur background */}
                <img
                    src={banner}
                    alt="banner"
                    className="absolute top-0 left-0 w-full h-full object-cover blur-sm scale-110"
                />
                {/* Clear foreground */}
                <img
                    src={banner}
                    alt="banner"
                    className="relative w-full h-full object-contain z-10"
                />
            </div>                        

            {/* Search with 3D Glassmorphism Effect */}
            <div className="px-6 py-4 -mt-10 relative z-10">
                <div
                    className="flex items-center bg-white/80 backdrop-blur-lg rounded-2xl px-5 py-3 shadow-xl border border-white/30 
        hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <FaSearch className="text-gray-500 mr-3 text-lg" />
                    <input
                        type="text"
                        placeholder="প্রোডাক্ট সার্চ..."
                        className="bg-transparent w-full outline-none text-sm placeholder-gray-500 font-medium"
                    />
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center ml-2">
                        <FaSearch className="text-white text-xs" />
                    </div>
                </div>
            </div>

            {/* Enhanced Policy button with better 3D effect and responsive design */}
            <div className="px-4 sm:px-6 mt-4 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
                <button
                    className="w-full flex justify-between items-center bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 
        text-white rounded-2xl px-6 py-4 font-bold text-sm md:text-base lg:text-lg shadow-2xl 
        hover:shadow-orange-300/60 transition-all duration-300 ease-in-out 
        transform hover:-translate-y-1.5 hover:scale-[1.01] active:translate-y-0 active:scale-100"
                    style={{
                        boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.5), 0 5px 10px -3px rgba(234, 88, 12, 0.3)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <span className="drop-shadow-md">রিসেলিং নীতিমালা ও শর্তাবলী</span>
                    <span className="text-xl md:text-2xl transition-transform duration-300 hover:translate-x-1 hover:scale-110">→</span>
                </button>
            </div>

            {/* Service Icons with 3D Card Effect */}
            <div className="px-2 sm:px-4 mt-8">
                <div className="w-[100%] flex flex-row justify-between md:justify-center gap-1 md:gap-10 ">
                    {[
                        {
                            icon: <HiClipboardList className="text-3xl text-white" />,
                            text: "আমার ড্যাশবোর্ড",
                            bg: "bg-gradient-to-br from-blue-500 to-blue-600"
                        },
                        {
                            icon: <FaUser className="text-3xl text-white" />,
                            text: "আমার অর্ডার",
                            bg: "bg-gradient-to-br from-pink-500 to-pink-600"
                        },
                        {
                            icon: <FaHeart className="text-3xl text-white" />,
                            text: "ফেভারিট প্রোডাক্ট",
                            bg: "bg-gradient-to-br from-red-500 to-red-600",
                            hover: "hover:shadow-red-400/30"
                        },
                        {
                            icon: <FaTags className="text-3xl text-white" />,
                            text: "ভেরিফাইড প্রোডাক্ট",
                            bg: "bg-gradient-to-br from-purple-500 to-purple-600",
                            hover: "hover:shadow-purple-400/30"
                        },
                        {
                            icon: <HiOutlineViewGridAdd className="text-3xl text-white" />,
                            text: "সকল ক্যাটাগরি",
                            bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
                            hover: "hover:shadow-indigo-400/30"
                        },
                        {
                            icon: <BsShop className="text-3xl text-white" />,
                            text: "ভেন্ডর সার্চ",
                            bg: "bg-gradient-to-br from-violet-600 to-violet-700",
                            hover: "hover:shadow-violet-400/30"
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="group transition-all duration-300"
                        >
                            {/* Mobile (circle) */}
                            <div className="md:hidden flex flex-col items-center">
                                <div className={`w-10 sm:w-14 h-10 sm:h-14 rounded-full ${item.bg} flex items-center justify-center shadow-md 
                        group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 
                        border-2 border-white/30 relative overflow-hidden`}>
                                    {item.icon}
                                    <div className="absolute inset-0 rounded-full opacity-20 bg-white mix-blend-overlay"></div>
                                </div>
                                <span className="mt-2 text-center text-[10px] md:text-2xl text-gray-700 group-hover:text-gray-900">
                                    {item.text}
                                </span>
                            </div>

                            {/* PC */}
                            <div className="hidden md:flex flex-col items-center justify-center">
                                <div className={`w-22 lg:w-26 h-22 lg:h-26 rounded-full ${item.bg} flex items-center justify-center shadow-md 
                        group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 
                        border-2 border-white/30 relative overflow-hidden`}>
                                    {item.icon}
                                    <div className="absolute inset-0 rounded-full opacity-20 bg-white mix-blend-overlay"></div>
                                </div>
                                <span className="mt-2 text-center text-[16px] text-gray-700 group-hover:text-gray-900">
                                    {item.text}
                                </span>
                            </div>


                        </div>
                    ))}
                </div>
            </div>

                                
            {/* Flash sale section */}
            <div className="px-6 mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                        <span className="text-orange-500 mr-2">⚡</span> ফ্ল্যাশ সেল
                    </h3>
                    <button className="text-orange-500 text-sm font-semibold">সব দেখুন</button>
                </div>

                <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
                    {[1, 2, 3, 4].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-44 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                                {/* Product Tag */}
                                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                    -20%
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="text-sm font-bold mb-1 line-clamp-1">প্রোডাক্ট নাম</div>
                                <div className="flex justify-between items-center">
                                    <span className="text-orange-500 font-bold">৳1,200</span>
                                    <span className="text-xs text-gray-500 line-through">৳1,500</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="mt-2">
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
                                            style={{ width: `${Math.random() * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{Math.floor(Math.random() * 100)}% Sold</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>            
        </div>
    );
};

export default OnlineShopDetails;