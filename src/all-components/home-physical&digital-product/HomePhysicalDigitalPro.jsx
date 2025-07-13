import { useState, useEffect } from 'react';

const HomePhysicalDigitalPro = () => {
    const [activeTab, setActiveTab] = useState('physical');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const physicalProducts = [
        { name: 'পোশাক', icon: 'https://cdn-icons-png.flaticon.com/512/265/265219.png' },
        { name: 'জুতা', icon: 'https://cdn-icons-png.flaticon.com/512/4845/4845942.png' },
        { name: 'ইলেকট্রনিকস', icon: 'https://cdn-icons-png.flaticon.com/512/679/679720.png' },
        { name: 'ফার্নিচার', icon: 'https://cdn-icons-png.flaticon.com/512/2361/2361099.png' },
        { name: 'রান্নাঘর', icon: 'https://cdn-icons-png.flaticon.com/512/2809/2809307.png' },
        { name: 'গ্রোসারি', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081617.png' },
    ];

    const digitalProducts = [
        { name: 'সফটওয়্যার', icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055666.png' },
        { name: 'ই-বুক', icon: 'https://cdn-icons-png.flaticon.com/512/6045/6045802.png' },
        { name: 'ডিজিটাল কোর্স', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920272.png' },
        { name: 'ওয়েব টেমপ্লেট', icon: 'https://cdn-icons-png.flaticon.com/512/2887/2887550.png' },
        { name: 'গ্রাফিক ডিজাইন', icon: 'https://cdn-icons-png.flaticon.com/512/4836/4836710.png' },
        { name: 'মিউজিক', icon: 'https://cdn-icons-png.flaticon.com/512/126/126480.png' },
    ];

    const products = activeTab === 'physical' ? physicalProducts : digitalProducts;

    return (
        <div className="p-3 sm:p-4 bg-white rounded-lg text-gray-900 relative pb-[50px] pt-[30px]">
            {/* Tabs */}
            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap sm:flex-nowrap max-w-xs sm:max-w-full mx-auto pt-[20px]">
                <button
                    className={`px-2 sm:px-4 py-2 rounded-full font-bold text-sm sm:text-base transition duration-300 border-2 ${activeTab === 'physical'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border-transparent'
                        : 'bg-transparent text-gray-400 hover:text-black border-gray-700'
                        }`}
                    onClick={() => setActiveTab('physical')}
                >
                    ফিজিক্যাল প্রডাক্ট
                </button>

                <button
                    className={`px-2 sm:px-4 py-2 rounded-full font-bold text-sm sm:text-base transition duration-300 border-2 ${activeTab === 'digital'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent'
                        : 'bg-transparent text-gray-400 hover:text-black border-gray-700'
                        }`}
                    onClick={() => setActiveTab('digital')}
                >
                    ডিজিটাল প্রডাক্ট
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 justify-items-center pb-[30px]">
                {products.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-full shadow-lg border-2 border-black p-2 flex flex-col items-center justify-center text-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-pointer hover:shadow-2xl hover:border-orange-500 transition duration-300"
                    >
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain mb-1 transition-transform duration-300 hover:scale-110"
                        />
                        <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700 hover:text-orange-600 break-words">
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePhysicalDigitalPro;