const ReferralsSection = ({ userData }) => {
    // earnings এর সকল কোড এখানে পেস্ট করুন
    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-[#c5064f]">👥 Referral Program</h2>
                <p className="text-gray-600">Earn by inviting friends to our platform</p>
            </div>

            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Total Referrals */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-indigo-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Total Referrals</h3>
                            <p className="text-2xl font-bold mt-1">{referrals}</p>
                        </div>
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                            <FaUsers className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">People you've invited</p>
                </div>

                {/* Earnings from Referrals */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Referral Earnings</h3>
                            <p className="text-2xl font-bold mt-1">৳ {referrals * 50}</p>
                        </div>
                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                            <FaMoneyBillWave className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">$50 per successful referral</p>
                </div>

                {/* Leader Status */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-yellow-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Leader Status</h3>
                            {isLeader ? (
                                <p className="text-2xl font-bold mt-1 flex items-center">
                                    <FaCrown className="text-yellow-500 mr-2" /> Achieved
                                </p>
                            ) : (
                                <p className="text-2xl font-bold mt-1">{referLeft} more to go</p>
                            )}
                        </div>
                        <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                            <FaCrown className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {isLeader ? "You're a platform leader!" : "Refer 13 friends to become a leader"}
                    </p>
                </div>
            </div>

            {/* Referral Content */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold text-lg mb-4">Your Referral Link</h3>
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        value={`https://yourplatform.com/ref/${userData?.userId || 'yourusername'}`}
                        readOnly
                        className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
                    />
                    <button className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544] transition">
                        Copy Link
                    </button>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                    Share this link with friends. When they sign up and complete their first job, you'll earn $50!
                </p>
            </div>

            {/* Referral Tips */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold text-lg mb-4">Tips to Get More Referrals</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Share on social media platforms</li>
                    <li>Include in your email signature</li>
                    <li>Mention in freelance communities</li>
                    <li>Offer to help friends get started</li>
                    <li>Explain the benefits they'll receive</li>
                </ul>
            </div>

            {/* Referral History */}
            <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Your Referrals</h3>
                    <button className="text-[#c5064f] text-sm font-medium">View All</button>
                </div>

                {referrals > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earned</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Array.from({ length: Math.min(3, referrals) }).map((_, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Friend {i + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">৳50</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <FaUsers className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="mt-2 text-gray-600">No referrals yet. Share your link to start earning!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferralsSection;