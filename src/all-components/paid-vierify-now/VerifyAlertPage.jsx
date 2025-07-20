import { Link } from "react-router-dom";

const VerifyAlertPage = () => {
    return (
        <div className=" mt-20  w-[310px] md:w-full flex items-center justify-center ">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 p-6 text-white">
                    <h1 className="text-2xl font-bold text-center">প্রিমিয়াম মেম্বারশিপ এক্টিভেট করুন</h1>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-yellow-100 p-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">ইনকাম শুরু করতে চাইলে</h2>
                        <p className="text-gray-600 mb-4">প্রিমিয়াম মেম্বারশিপ এক্টিভেট করুন মাত্র <span className="font-bold text-blue-600">২১৩ টাকা</span> বিনিময়ে(অফার দুই দিনের জন্য)</p>

                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <ul className="text-left text-gray-700 space-y-2">
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    অনলাইন ইনকামের সুযোগ
                                </li>
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    এক্সক্লুসিভ ফিচার এক্সেস
                                </li>
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    ২৪/৭ সাপোর্ট(01817103429)
                                </li>
                            </ul>
                        </div>

                        <Link to={'/payment-paid'}>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                                এখনই পেমেন্ট করুন - ২১৩ টাকা
                            </button>
                        </Link>
                       

                        <p className="text-sm text-gray-500 mt-4">পেমেন্ট সম্পন্ন হলে আপনার অ্যাকাউন্ট ভেরিফাইড হবে</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAlertPage;