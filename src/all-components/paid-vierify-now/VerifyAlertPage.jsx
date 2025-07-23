import { Link } from "react-router-dom";

const VerifyAlertPage = ({ onClose }) => {
    return (
        <div className="relative max-w-sm w-full bg-white rounded-xl shadow-xl overflow-hidden breathing">
            {/* Close Button - placed at top-right corner of the card */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute -top-3 -right-3 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-3xl transition-colors duration-200 shadow-lg"
            >
                &times;
            </button>

            <div className="bg-blue-600 p-4 text-white rounded-t-xl">
                <h1 className="text-xl font-bold text-center">প্রিমিয়াম মেম্বারশিপ এক্টিভেট করুন</h1>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">ইনকাম শুরু করতে চাইলে</h2>
                    <p className="text-gray-600 text-sm mb-3">প্রিমিয়াম মেম্বারশিপ এক্টিভেট করুন মাত্র <span className="font-bold text-blue-600">২১৩ টাকা</span> বিনিময়ে (অফার দুই দিনের জন্য)</p>

                    <ul className="text-left text-sm text-gray-700 bg-blue-50 p-3 rounded-lg space-y-2 mb-5">
                        {[
                            "অনলাইন ইনকামের সুযোগ",
                            "এক্সক্লুসিভ ফিচার এক্সেস",
                            "২৪/৭ সাপোর্ট (01817103429)"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to={'/payment-paid'}>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                            এখনই পেমেন্ট করুন - ২১৩ টাকা
                        </button>
                    </Link>

                    <p className="text-xs text-gray-500 mt-3">পেমেন্ট সম্পন্ন হলে আপনার অ্যাকাউন্ট ভেরিফাইড হবে</p>
                </div>
            </div>

            <style>{`
                @keyframes breathing {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
                .breathing {
                    animation: breathing 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default VerifyAlertPage;