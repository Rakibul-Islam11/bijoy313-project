import { useContext, useEffect, useState } from "react";
import { GetUserInfoContext } from "../all-contexts/GetUserInfoContext";
import axios from "axios";

const GrahokChannel = () => {
    const { userProfile } = useContext(GetUserInfoContext);
    const [referralTree, setReferralTree] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleGeneration, setVisibleGeneration] = useState(1);
    const [expandedUser, setExpandedUser] = useState(null);

    useEffect(() => {
        if (userProfile?.referralCode) {
            axios
                .get(`https://bijoy-server.vercel.app/api/referral-tree/${userProfile.referralCode}`)
                .then((res) => {
                    setReferralTree(res.data.tree || []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch referral tree", err);
                    setLoading(false);
                });
        }
    }, [userProfile?.referralCode]);

    const flattenGenerations = (nodes, level = 1, result = {}) => {
        if (!nodes || nodes.length === 0) return result;

        if (!result[level]) result[level] = [];
        for (const node of nodes) {
            result[level].push(node);
            if (node.children) {
                flattenGenerations(node.children, level + 1, result);
            }
        }
        return result;
    };

    const generationMap = flattenGenerations(referralTree);
    const generationCount = Object.keys(generationMap).length;

    const toggleUserExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // You can add a toast notification here if needed
    };

    if (!userProfile) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-pulse text-gray-500">Loading user info...</div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto mt-15">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2 md:p-6 md:mb-8 text-white shadow-lg">
                <h1 className="text-md md:text-3xl font-bold mb-2">
                    Your Referral Network
                </h1>
                <p className="opacity-90 text-sm md:text-md">
                    Track your network growth and performance
                </p>

                <div className=" md:mt-4 flex flex-wrap gap-4">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-xs opacity-80">Total Generations</p>
                        <p className="text-xl font-bold">{generationCount}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-xs opacity-80">Total Referrals</p>
                        <p className="text-xl font-bold">
                            {Object.values(generationMap).reduce((acc, gen) => acc + gen.length, 0)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* Empty State */}
            {!loading && generationCount === 0 && (
                <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No referrals yet</h3>
                    <p className="mt-1 text-gray-500">Start sharing your referral code to grow your network</p>
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg inline-block">
                        <p className="text-xs text-gray-600">Your referral code:</p>
                        <p className="font-mono font-bold text-blue-600">{userProfile.referralCode}</p>
                    </div>
                </div>
            )}

            {/* Content */}
            {!loading && generationCount > 0 && (
                <div className="space-y-6">
                    {/* Generation Selector with improved scrollbar visibility */}
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <div className="relative">
                            <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
                                {Object.keys(generationMap).map((genKey) => (
                                    <button
                                        key={genKey}
                                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${Number(genKey) === visibleGeneration
                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        onClick={() => {
                                            setVisibleGeneration(Number(genKey));
                                            setExpandedUser(null);
                                        }}
                                    >
                                        <span>Gen {genKey}</span>
                                        <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                            {generationMap[genKey]?.length ?? 0}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {/* Scroll indicator for mobile */}
                            <div className="md:hidden absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* User Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {generationMap[visibleGeneration]?.map((user, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${expandedUser === user.firebaseUID ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                            >
                                <div
                                    className="p-4 cursor-pointer"
                                    onClick={() => toggleUserExpand(user.firebaseUID)}
                                >
                                    <div className="flex items-start">
                                        <div className="relative">
                                            <img
                                                src={user.photoURL || '/default-avatar.png'}
                                                alt="User"
                                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                            />
                                            {user.payment === 'paid' && (
                                                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            {/* Name and Phone in separate rows for mobile */}
                                            <div className="block sm:flex sm:justify-between sm:items-start">
                                                <div className="mb-2 sm:mb-0">
                                                    <h3 className="font-medium text-gray-900 break-all">{user.displayName}</h3>
                                                    <p className="text-xs text-gray-500 capitalize">{user.userType}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="font-medium text-gray-900 break-all">{user.phone}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard(user.phone);
                                                        }}
                                                        className="text-gray-400 hover:text-blue-500 p-1 ml-1"
                                                        title="Copy phone number"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Date and Status */}
                                            <div className="mt-2 flex justify-between items-center">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(user.joinedAt).toLocaleDateString()}
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded-full ${user.payment === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {user.payment === 'paid' ? 'Premium' : 'Free'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedUser === user.firebaseUID && (
                                    <div className="px-4 pb-4 pt-2 border-t border-gray-100 text-sm">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="text-gray-900 break-all">{user.email || 'Not provided'}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500">Referral Code</p>
                                                <p className="font-mono text-gray-900 break-all">{user.referralCode}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Referred By</p>
                                                <p className="text-gray-900 break-all">{user.referredBy || 'Direct'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">User ID</p>
                                                <p className="text-xs font-mono text-gray-500 break-all">{user.firebaseUID}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrahokChannel;