const PaymentPaidMemberLandng = () => {
    return (
        <div className="min-h-screen mt-20 bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
                {/* হেডার সেকশন */}
                <div className="bg-green-600 p-6 text-white">
                    <h1 className="text-2xl font-bold text-center">প্রিমিয়াম মেম্বারশিপ ভেরিফিকেশন</h1>
                    <p className="text-center mt-2 text-green-100">আপনার পেমেন্ট ভেরিফাই করুন</p>
                </div>

                {/* মূল কন্টেন্ট */}
                <div className="p-6">
                    {/* নির্দেশাবলী */}
                    <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h2 className="text-lg font-semibold text-blue-800 mb-2">পেমেন্ট করার নির্দেশনা:</h2>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>bKash মোবাইল অ্যাপ বা *247# ডায়াল করুন</li>
                            <li>"Send Money" অপশন সিলেক্ট করুন</li>
                            <li>নিচের নম্বরে <span className="font-bold">৩১৩ টাকা</span> সেন্ড মানি করুন</li>
                            <li>ট্রানজেকশন আইডি নিচের ফর্মে সাবমিট করুন</li>
                        </ol>
                    </div>

                    {/* bKash নম্বর ডিসপ্লে */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                        <p className="text-gray-600 mb-1">bKash নম্বর:</p>
                        <div className="flex items-center justify-center">
                            <span className="text-2xl font-bold text-green-600 bg-green-100 px-4 py-2 rounded-lg">
                                ০১৭৩৬৬০০৪৮০
                            </span>
                            <button
                                className="ml-2 bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200"
                                onClick={() => navigator.clipboard.writeText('01736600480')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">(এই নম্বরে ৩১৩ টাকা সেন্ড মানি করুন)</p>
                    </div>

                    {/* ট্রানজেকশন ফর্ম */}
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                                ট্রানজেকশন আইডি
                            </label>
                            <input
                                type="text"
                                id="transactionId"
                                name="transactionId"
                                placeholder="যেমন: 8A7D6F5G4H3J"
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                আপনার মোবাইল নম্বর
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="যেমন: 017XXXXXXXX"
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            সাবমিট করুন
                        </button>
                    </form>

                    {/* অতিরিক্ত তথ্য */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>ভেরিফিকেশন সম্পন্ন হলে আপনাকে স্বয়ংক্রিয়ভাবে প্রিমিয়াম মেম্বারশিপ দেওয়া হবে</p>
                        <p className="mt-1">কোন সমস্যা হলে কল করুন: ০১৭৩৬৬০০৪৮০</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPaidMemberLandng;