import { useEffect, useState } from "react";
import axios from "axios";
import { FiRefreshCw } from "react-icons/fi";

const MakePaidUser = () => {
    const [paidUsers, setPaidUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPaidUsers = async () => {
        try {
            const res = await axios.get('https://bijoy-server.vercel.app/api/paid-users/details');
            const sortedData = res.data.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setPaidUsers(sortedData);
        } catch (err) {
            console.error("Error fetching paid users:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPaidUsers();
    }, []);

    const formatDateTime = (isoDate) => {
        if (!isoDate) return 'N/A';
        const date = new Date(isoDate);
        return date.toLocaleString('en-BD', {
            timeZone: 'Asia/Dhaka',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const handlePaymentUpdate = async (userId) => {
        try {
            await axios.patch(`https://bijoy-server.vercel.app/api/users/update-payment/${userId}`, {
                payment: "paid"
            });
            setPaidUsers(prev =>
                prev.map(item =>
                    item.userInfo && item.userInfo._id === userId
                        ? { ...item, userInfo: { ...item.userInfo, payment: "paid" } }
                        : item
                )
            );
        } catch (err) {
            console.error("Failed to update payment:", err);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchPaidUsers();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Payment Verification</h2>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className={`flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${refreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <FiRefreshCw className={`${refreshing ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    {/* Desktop Table */}
                    <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Info</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Details</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paidUsers.length > 0 ? (
                                paidUsers.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-2">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.userInfo?.displayName || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {item.userInfo?.phone || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {item.userInfo?.email || 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                Method: {item.paymentMethod || 'N/A'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                TXN ID: {item.transactionId || 'N/A'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Sender: {item.senderPhone || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                                            {formatDateTime(item.createdAt)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${item.userInfo?.payment === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {item.userInfo?.payment || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                            {item.userInfo?.payment === 'unpaid' && (
                                                <button
                                                    onClick={() => handlePaymentUpdate(item.userInfo._id)}
                                                    className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md text-xs sm:text-sm transition-colors"
                                                >
                                                    Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No payment records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Mobile Cards */}
                    <div className="sm:hidden space-y-3 p-3">
                        {paidUsers.length > 0 ? (
                            paidUsers.map((item, idx) => (
                                <div key={idx} className="border rounded-lg p-3 shadow-sm">
                                    <div className="space-y-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {item.userInfo?.displayName || 'N/A'}
                                            </h3>
                                            <p className="text-sm text-gray-500">{item.userInfo?.phone || 'N/A'}</p>
                                            <p className="text-sm text-gray-500">{item.userInfo?.email || 'N/A'}</p>
                                        </div>

                                        <div className="border-t pt-2">
                                            <p className="text-sm"><span className="font-medium">Method:</span> {item.paymentMethod || 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium">TXN ID:</span> {item.transactionId || 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium">Sender:</span> {item.senderPhone || 'N/A'}</p>
                                        </div>

                                        <div className="border-t pt-2">
                                            <p className="text-sm text-gray-500">{formatDateTime(item.createdAt)}</p>
                                            <div className="flex justify-between items-center">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${item.userInfo?.payment === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {item.userInfo?.payment || 'N/A'}
                                                </span>

                                                {item.userInfo?.payment === 'unpaid' && (
                                                    <button
                                                        onClick={() => handlePaymentUpdate(item.userInfo._id)}
                                                        className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md text-xs transition-colors"
                                                    >
                                                        Verify Payment
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                No payment records found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakePaidUser;