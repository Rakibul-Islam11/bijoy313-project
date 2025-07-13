import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { RiTelegram2Line } from "react-icons/ri";
import './suppor.css';

const SupportAndSocial = () => {
    return (
        <div className="flex flex-col items-center py-6 sm:py-4 bg-gray-100">
            {/* Social Icons */}
            <div className="flex justify-center items-center gap-2 sm:gap-6 md:gap-8 w-full flex-wrap">
                {/* Facebook */}
                <div className="group flex flex-col items-center cursor-pointer w-20 sm:w-24">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-500 flex items-center justify-center bg-white text-blue-600 shadow-md hover:shadow-lg transition-shadow">
                        <FaFacebookF className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-transparent border-t-blue-500 animate-spin-slow opacity-100"></div>
                    </div>
                    <span className="mt-2 text-sm text-gray-700 font-medium">ফেসবুক গ্রুপ</span>
                </div>

                {/* YouTube */}
                <div className="group flex flex-col items-center cursor-pointer w-20 sm:w-24">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-red-500 flex items-center justify-center bg-white text-red-600 shadow-md hover:shadow-lg transition-shadow">
                        <FaYoutube className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-transparent border-t-red-500 animate-spin-slow opacity-100"></div>
                    </div>
                    <span className="mt-2 text-sm text-gray-700 font-medium">ইউটিউব</span>
                </div>

                {/* Telegram */}
                <div className="group flex flex-col items-center cursor-pointer w-20 sm:w-24">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-pink-500 flex items-center justify-center bg-white text-pink-600 shadow-md hover:shadow-lg transition-shadow">
                        <RiTelegram2Line className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-transparent border-t-pink-500 animate-spin-slow opacity-100"></div>
                    </div>
                    <span className="mt-2 text-sm text-gray-700 font-medium">টেলিগ্রাম</span>
                </div>

                {/* Support */}
                <div className="group flex flex-col items-center cursor-pointer w-20 sm:w-24">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-green-500 flex items-center justify-center bg-white text-green-600 shadow-md hover:shadow-lg transition-shadow">
                        <MdSupportAgent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-transparent border-t-green-500 animate-spin-slow opacity-100"></div>
                    </div>
                    <span className="mt-2 text-sm text-gray-700 font-medium">সাপোর্ট</span>
                </div>
            </div>
        </div>
    );
};

export default SupportAndSocial;
