import {
    MdPhoneIphone,
    MdLocalOffer,
    MdBusinessCenter,
    MdWaterDrop,
    MdFlight,
    MdOutlineLiveTv
} from "react-icons/md";
import {
    FaBoxOpen,
    FaShoppingCart,
    FaNewspaper,
    FaGift,
    FaDollarSign,
    FaShoppingBag,
    FaRegNewspaper,
} from "react-icons/fa";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BiSolidCategory } from "react-icons/bi";
import './suffole.css';
import { Link } from "react-router-dom";

const categories = [
    { label: "মোবাইল রিচার্জ", icon: <MdPhoneIphone className="text-2xl sm:text-3xl" />, color: "from-orange-400 to-yellow-400", animation: "pulse" },
    { label: "ডায়গ প্যাক", icon: <FaBoxOpen className="text-2xl sm:text-3xl" />, color: "from-blue-500 to-indigo-500", animation: "bounce" },
    { label: "অনলাইন শপ", icon: <FaShoppingCart className="text-2xl sm:text-3xl" />, color: "from-pink-500 to-pink-400", url: '/online-shop', animation: "float" },
    { label: "বিলপেমেন্ট শপ", icon: <FaNewspaper className="text-2xl sm:text-3xl" />, color: "from-rose-400 to-pink-500", animation: "shake" },
    { label: "প্রোডাক্ট ডেলিভারি", icon: <TbDeviceMobileMessage className="text-2xl sm:text-3xl" />, color: "from-orange-400 to-pink-400", animation: "spin" },

    { label: "এসডিজি প্রোমোশন", icon: <FaShoppingBag className="text-2xl sm:text-3xl" />, color: "from-yellow-400 to-orange-500", animation: "pulse" },
    { label: "মার্কেট বাজার", icon: <BiSolidCategory className="text-2xl sm:text-3xl" />, color: "from-purple-400 to-pink-400", animation: "bounce" },
    { label: "সুপার ডিলস", icon: <MdLocalOffer className="text-2xl sm:text-3xl" />, color: "from-pink-500 to-purple-500", animation: "float" },
    { label: "ক্লাসিক বিজনেস", icon: <FaGift className="text-2xl sm:text-3xl" />, color: "from-fuchsia-500 to-pink-400", animation: "shake" },
    { label: "বিজনেস ক্লাব", icon: <FaDollarSign className="text-2xl sm:text-3xl" />, color: "from-pink-400 to-purple-400", animation: "spin" },

    { label: "রক্ত ব্যাংক", icon: <MdWaterDrop className="text-2xl sm:text-3xl" />, color: "from-orange-500 to-yellow-500", animation: "pulse" },
    { label: "নিউজ পেপার", icon: <HiOutlineNewspaper className="text-2xl sm:text-3xl" />, color: "from-indigo-500 to-purple-500", animation: "bounce" },
    { label: "লাইভ টিভি", icon: <MdOutlineLiveTv className="text-2xl sm:text-3xl" />, color: "from-pink-500 to-violet-500", animation: "float" },
    { label: "এয়ার টিকেট", icon: <MdFlight className="text-2xl sm:text-3xl" />, color: "from-pink-400 to-purple-500", animation: "shake" },
    { label: "আরও দেখুন", icon: <FaRegNewspaper className="text-2xl sm:text-3xl" />, color: "from-purple-500 to-pink-400", animation: "spin" },
];

const SuffleCategory = () => {
    return (
        <div className="py-4 sm:py-12  sm:px-4 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center ">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-0 pb-0">
                    আপকামিং প্রোজেক্ট
                </h2>জেক
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg  md:px-0 sm:mx-0">
                <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                    {categories.map((cat, index) => (
                        <Link to={cat.url}                            key={index}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className={`relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${cat.color} 
                                flex items-center justify-center text-white shadow-lg sm:shadow-xl
                                transform transition-all duration-300 group-hover:shadow-xl sm:group-hover:shadow-2xl ${cat.animation}-animation`}
                            >
                                <div className="z-10 flex items-center justify-center w-full h-full p-1 sm:p-2">
                                    {cat.icon}
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4 font-medium sm:font-semibold text-gray-700 group-hover:text-gray-900 
                                transition-colors duration-300 leading-tight px-0 sm:px-1 w-full">
                                {cat.label}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuffleCategory;