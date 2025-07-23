import {
    FiShoppingBag,
    FiBriefcase,
    FiDollarSign,
    FiHeart,
    FiUsers,
    FiBookOpen
} from 'react-icons/fi';

const services = [
    {
        title: 'ড্রপশিপিং',
        icon: <FiShoppingBag />,
        url: '#dropshipping',
        color: 'from-indigo-400 to-indigo-600'
    },
    {
        title: 'মাইক্রোজবস',
        icon: <FiBriefcase />,
        url: '/micro-job',
        color: 'from-teal-400 to-teal-600'
    },
    {
        title: 'অ্যাকটিভ ইনকাম',
        icon: <FiDollarSign />,
        url: '/active-jobs',
        color: 'from-emerald-400 to-emerald-600'
    },
    {
        title: 'অনুদান',
        icon: <FiHeart />,
        url: '#donation',
        color: 'from-pink-400 to-pink-600'
    },
    {
        title: 'এক্সট্রা ইনকাম',
        icon: <FiUsers />,
        url: '/income-with-bijoy',
        color: 'from-lime-400 to-lime-600'
    },
    {
        title: 'দক্ষতা উন্নয়ন',
        icon: <FiBookOpen />,
        url: '#skill-development',
        color: 'from-orange-400 to-orange-600'
    }
];

const BusinessCards = () => {
    return (
        <div className="py-4 bg-gradient-to-br from-pink-600 via-fuchsia-600 to-red-600 px-4 rounded-2xl border-4 border-orange-700 ">
            <div className="max-w-7xl mx-auto">
                <div className="text-center pb-2 md:pb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                        ইনকাম প্রোজেক্ট
                    </h2>
                    
                </div>

                {/* Card Container */}
                <div className="flex flex-wrap justify-center gap-4">
                    {services.map((service, idx) => (
                        <a
                            key={idx}
                            href={service.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group flex-[1_1_70px] w-[20px] sm:w-[90px] md:w-[120px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.04]"
                        >
                            {/* Gradient Glow Background */}
                            <div className={`absolute inset-0 z-0 bg-gradient-to-br ${service.color} opacity-30 blur-sm`}></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 py-5">
                                <div className="mb-2 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-lg group-hover:rotate-[12deg] transition-transform duration-300 text-xl sm:text-xl md:text-2xl text-gray-700">
                                    {service.icon}
                                </div>
                                <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition">
                                    {service.title}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BusinessCards;
