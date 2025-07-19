// components/ShinyMarquee.jsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import {
    FiDollarSign,
    FiShoppingBag,
    FiBriefcase,
    FiHeart,
    FiAward,
    FiUsers,
    FiShield,
    FiGlobe,
    FiZap,
    FiBookOpen
} from 'react-icons/fi';

const ShinyMarquee = () => {
    const items = [
        {
            text: 'ড্রপশিপিং',
            icon: <FiShoppingBag className="text-emerald-300" />,
            description: 'পণ্য বিক্রি সহজভাবে',
        },
        {
            text: 'মাইক্রোজবস',
            icon: <FiBriefcase className="text-indigo-300" />,
            description: 'ছোট কাজ থেকে দ্রুত আয় করুন',
        },
        {
            text: 'হালাল আয়',
            icon: <FiDollarSign className="text-purple-300" />,
            description: 'বৈধ ও নৈতিক আয়ের মাধ্যম',
        },
        {
            text: 'অনুদান',
            icon: <FiHeart className="text-red-300" />,
            description: 'সহযোগিতা ও দান করার সুযোগ',
        },
        {
            text: 'কমিউনিটি',
            icon: <FiUsers className="text-sky-300" />,
            description: 'সমমনা মানুষের সাথে সংযোগ গড়ুন',
        },
        {
            text: 'দক্ষতা উন্নয়ন',
            icon: <FiBookOpen className="text-lime-300" />,
            description: 'নতুন স্কিল শিখে নিজেকে গড়ুন',
        },
    ];


    return (
        <div className="relative w-full z-0 overflow-hidden py-4 md:py-6 bg-gradient-to-r bg-[#fce5fc]shadow-2xl rounded-xl md:rounded-2xl border-2 md:border-4 border-orange-800 group font-bengali mt-2">
            {/* Background overlay for subtle animation */}
            <div className="absolute inset-0 bg-orange-600 opacity-10 transition-opacity duration-500 group-hover:opacity-15 rounded-xl md:rounded-2xl"></div>

            {/* Title for the marquee */}
            {/* <div className="text-center mb-4 md:mb-6 px-4 relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-xl">
                    কেন বেছে নেবেন <span className="text-yellow-200">BIJOY313</span>?
                </h2>
                <p className="mt-2 md:mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-orange-100 font-semibold drop-shadow-lg">
                    উদ্ভাবনের মাধ্যমে আপনার আর্থিক স্বাধীনতা ও সামাজিক প্রভাবকে শক্তিশালী করুন।
                </p>
            </div> */}

            <Marquee
                gradient={true}
                gradientColor={[249, 115, 22]}
                gradientWidth={80}
                speed={40}
                autoFill={true}
                className="py-2 md:py-4"
                pauseOnHover={true}  // This is the key prop to add
            >
                <div className="flex items-center space-x-4 md:space-x-8 px-4 md:px-6 ">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center justify-center p-4 md:p-5 backdrop-blur-lg rounded-xl shadow-lg border border-white hover:border-white/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer w-32 h-32 md:w-40 md:h-40 flex-shrink-0 relative overflow-hidden hover:shadow-cyan-500/20 bg-[#ff0768]"
                        >
                            {/* Soft gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                            {/* Icon with subtle glow */}
                            <div className="text-4xl md:text-5xl mb-2 text-white group-hover:text-cyan-200 transition-colors duration-300 drop-shadow-lg">
                                {item.icon}
                            </div>

                            {/* Description with soft color */}
                            <p className="text-xs md:text-sm text-white/80 text-center mt-1.5 group-hover:text-white transition-colors duration-300">
                                {item.description}
                            </p>

                            {/* Button - Eye-catching yet soothing */}
                            <button className="text-sm md:text-base font-medium text-white bg-blue-500 hover:bg-blue-400 transition-all duration-300 px-3 py-0.5 md:px-3 md:py-1 mt-1 rounded-full">
                                {item.text}
                            </button>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default ShinyMarquee;