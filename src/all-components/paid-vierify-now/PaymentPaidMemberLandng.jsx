import { useContext, useEffect, useState } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';

const PaymentPaidMemberLandng = () => {
    const { user, loading } = useContext(authContext);
    const [activeTab, setActiveTab] = useState('bkash');
    const [paymentMethod, setPaymentMethod] = useState('bkash');
    const [transactionId, setTransactionId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server-nu.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) {
                    setUserProfile(data.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
            const interval = setInterval(() => {
                fetchUserData();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [user, loading]);

    // ✅ Reset input fields on tab change
    useEffect(() => {
        setTransactionId('');
        setPhoneNumber('');
        setPaymentMethod(activeTab);
    }, [activeTab]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!transactionId || !phoneNumber || !paymentMethod || !userProfile?.firebaseUID) {
            return alert("সব তথ্য পূরণ করুন");
        }

        try {
            const res = await fetch('https://bijoy-server-nu.vercel.app/api/payment-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: userProfile.firebaseUID,
                    paymentMethod,
                    transactionId,
                    senderPhone: phoneNumber
                })
            });

            const data = await res.json();

            if (data.success) {
                alert('পেমেন্ট রিপোর্ট সফলভাবে জমা হয়েছে!');
                setTransactionId('');
                setPhoneNumber('');
            } else {
                alert(data.message || 'রিপোর্ট জমা হয়নি!');
            }

        } catch (err) {
            console.error('Submit Error:', err);
            alert('সার্ভার সমস্যা হয়েছে');
        }
    };

    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center p-4 mt-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 p-4 text-white">
                    <h1 className="text-xl font-bold text-center">প্রিমিয়াম মেম্বারশিপ ভেরিফিকেশন</h1>
                    <p className="text-center mt-1 text-green-100 text-sm">আপনার পেমেন্ট ভেরিফাই করুন</p>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`flex-1 py-2 px-1 text-center text-sm font-medium ${activeTab === 'bkash' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('bkash')}
                        >
                            bKash
                        </button>
                        <button
                            className={`flex-1 py-2 px-1 text-center text-sm font-medium ${activeTab === 'nagad' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('nagad')}
                        >
                            Nagad
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-xs">
                        {activeTab === 'bkash' ? (
                            <>
                                <p className="font-medium text-blue-800 mb-1">bKash পেমেন্ট পদ্ধতি:</p>
                                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                                    <li>bKash অ্যাপ বা *247# ডায়াল করুন</li>
                                    <li>"Payment" অপশন সিলেক্ট করুন</li>
                                    <li>নম্বর: <span className="font-bold">01931282259</span></li>
                                    <li>নম্বর: <span className="font-bold">01817103429(শুধুমাত্র সেন্ডমানি)</span></li>
                                    <li>টাকা: <span className="font-bold">৩১৩ টাকা (অফার দুই দিনের জন্য)</span></li>
                                    <li>ট্রানজেকশন আইডি নিচে সাবমিট করুন</li>
                                </ol>
                            </>
                        ) : (
                            <>
                                <p className="font-medium text-blue-800 mb-1">Nagad পেমেন্ট পদ্ধতি:</p>
                                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                                    <li>Nagad অ্যাপ বা *167# ডায়াল করুন</li>
                                    <li>"Send Money" অপশন সিলেক্ট করুন</li>
                                    <li>নম্বর: <span className="font-bold">01610-398465</span></li>
                                    <li>টাকা: <span className="font-bold">৩১৩ টাকা (অফার দুই দিনের জন্য)</span></li>
                                    <li>ট্রানজেকশন আইডি নিচে সাবমিট করুন</li>
                                </ol>
                            </>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div>
                            <label htmlFor="transactionId" className="block text-xs font-medium text-gray-700 mb-1">
                                ট্রানজেকশন আইডি
                            </label>
                            <input
                                type="text"
                                id="transactionId"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                placeholder="যেমন: 8A7D6F5G4H3J"
                                className="w-full text-xs text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700 mb-1">
                                আপনার মোবাইল নম্বর
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="যেমন: 017XXXXXXXX"
                                className="w-full text-xs text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center mt-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            সাবমিট করুন
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center text-[10px] text-gray-500 mt-2">
                        <p>ভেরিফিকেশন সম্পন্ন হলে স্বয়ংক্রিয়ভাবে প্রিমিয়াম মেম্বারশিপ দেওয়া হবে</p>
                        <p className="mt-1">কোন সমস্যা হলে কল করুন: 01817103429</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPaidMemberLandng;
