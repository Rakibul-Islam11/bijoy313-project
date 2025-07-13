import dress from "../../assets/popular-pro-img/threepice.png";
import mobile from '../../assets/popular-pro-img/phone.png';
import sunglass from '../../assets/popular-pro-img/suglass.png';
import watch from '../../assets/popular-pro-img/watch.png';
import tshirt from '../../assets/popular-pro-img/tshirt.png';
import shari from '../../assets/popular-pro-img/shari.png';
import shirt from '../../assets/popular-pro-img/shirt.png';
import laptop from '../../assets/popular-pro-img/laptop.png';
import pant from '../../assets/popular-pro-img/pant.png';
import electronic from '../../assets/popular-pro-img/electonic.png';
import smartphone from '../../assets/popular-pro-img/phone.png';
import kidsout from '../../assets/popular-pro-img/kidsouy.png';
import desctop from '../../assets/popular-pro-img/desctop.png';
import computer from '../../assets/popular-pro-img/laptop.png';
import gift from '../../assets/popular-pro-img/gift.png';
import shoe from '../../assets/popular-pro-img/shoe.png';
import './PopularCate.css'; // Make sure to create this CSS file

const categories = [
    { label: "ড্রেস", img: dress },
    { label: "মোবাইল এ্যাক্সেসরিজ", img: mobile },
    { label: "চশমা", img: sunglass },
    { label: "ঘড়ি", img: watch },
    { label: "টি-শার্ট", img: tshirt },
    { label: "জুতা", img: shoe },
    { label: "সারি", img: shari },
    { label: "শার্ট", img: shirt },
    { label: "ল্যাপটপ", img: laptop },
    { label: "প্যান্ট", img: pant },
    { label: "ইলেকট্রনিকস", img: electronic },
    { label: "স্মার্ট ফোন", img: smartphone },
    { label: "কিডস", img: kidsout },
    { label: "ডেস্কটপ", img: desctop },
    { label: "কম্পিউটার", img: computer },
    { label: "গিফট", img: gift },
];

const PopularCate = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-xl text-gray-800"> {/* Added shadow-xl for overall depth */}
            {/* Header */}
            <div className="flex items-center gap-3 mb-6"> {/* Increased gap and margin-bottom */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-md transform hover:scale-105 transition-transform duration-300">
                    জনপ্রিয় ক্যাটাগরি
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-2 gap-y-6 md:gap-x-4 md:gap-y-8 justify-items-center">
                {categories.map((item, idx) => (
                    <div
                        key={idx}
                        className="category-card transform-gpu transition-transform duration-300 ease-out perspective-1000 group cursor-pointer w-24 h-24 md:w-28 md:h-28"
                    >
                        <div className="category-card-inner bg-white rounded-full shadow-lg border-2 border-black p-4 flex flex-col items-center justify-center text-center w-full h-full transform-style-preserve-3d transition-all duration-500 ease-out hover:shadow-2xl hover:border-orange-500">
                            <div className="category-card-front flex flex-col items-center justify-center w-full h-full backface-hidden">
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    className="w-12 h-12 md:w-14 md:h-14 object-contain mb-1 transform transition-transform duration-300 group-hover:scale-110"
                                />
                                <p className="text-xs md:text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-orange-600 px-1">
                                    {item.label}
                                </p>
                            </div>
                            <div className="category-card-back absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm px-2 backface-hidden rotate-y-180 border-2 border-black">
                                <span className="text-center">আরো দেখুন</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCate;