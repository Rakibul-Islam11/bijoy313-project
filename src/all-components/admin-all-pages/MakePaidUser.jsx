import { useEffect, useState } from 'react';
import axios from 'axios';

const MakePaidUser = () => {
    const [paidUsers, setPaidUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentReports, setPaymentReports] = useState({});

    const fetchPaidUsers = async () => {
        try {
            const res = await axios.get('https://bijoy-server.vercel.app/api/paid-users');
            setPaidUsers(res.data);
        } catch (error) {
            console.error("Error fetching paid users:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPaymentReport = async (uid) => {
        try {
            const res = await axios.get(`https://bijoy-server.vercel.app/api/payment-report/${uid}`);
            setPaymentReports(prev => ({ ...prev, [uid]: res.data.data }));
        } catch (error) {
            console.error(`Error fetching payment report for UID ${uid}:`, error);
        }
    };

    useEffect(() => {
        fetchPaidUsers();
    }, []);

    useEffect(() => {
        // Fetch reports for all users after loading
        if (paidUsers.length > 0) {
            paidUsers.forEach(user => {
                if (user.firebaseUID) {
                    fetchUserPaymentReport(user.firebaseUID);
                }
            });
        }
    }, [paidUsers]);

    const handleMakePaid = async (uid) => {
        try {
            setUpdating(true);
            const res = await axios.put(`https://bijoy-server.vercel.app/api/make-paid/${uid}`);
            console.log(res.data.message);
            await fetchPaidUsers(); // refresh the list
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    const filteredUsers = paidUsers.filter(user =>
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 text-black">
            <h2 className="text-xl font-bold mb-4">Paid Users</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by phone number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-3 py-2 rounded w-full max-w-md"
                />
            </div>

            <ul className="space-y-4">
                {filteredUsers.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    filteredUsers.map(user => (
                        <li key={user._id?.$oid || user._id} className="border p-4 rounded shadow bg-white">
                            <p><strong>Name:</strong> {user.displayName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>UID:</strong> {user.firebaseUID}</p>
                            
                            <p><strong>Refer By:</strong> {user.referredBy || 'None'}</p>

                            {user.payment === "paid" ? (
                                <p><strong>Payment:</strong> Paid</p>
                            ) : (
                                <button
                                    onClick={() => handleMakePaid(user.firebaseUID)}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    disabled={updating}
                                >
                                    {updating ? 'Updating...' : 'Make Paid'}
                                </button>
                            )}

                            {/* Active Job Payment Reports */}
                            {paymentReports[user.firebaseUID]?.length > 0 && (
                                <div className="mt-3 bg-gray-100 p-2 rounded">
                                    <p className="font-semibold">Payment Reports:</p>
                                    <ul className="text-sm space-y-1">
                                        {paymentReports[user.firebaseUID].map((report, index) => (
                                            <li key={report._id} className="border rounded p-2">
                                                <p><strong>Txn:</strong> {report.transactionId}</p>
                                                <p><strong>Sender:</strong> {report.senderPhone}</p>
                                                <p><strong>Method:</strong> {report.paymentMethod}</p>
                                                <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default MakePaidUser;
