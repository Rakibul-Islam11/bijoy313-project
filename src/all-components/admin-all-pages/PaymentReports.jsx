import { useEffect, useState } from "react";

const PaymentReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://bijoy-server-nu.vercel.app/payment-reports")
            .then(res => res.json())
            .then(data => {
                setReports(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reports:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading reports...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment Reports</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 shadow rounded-lg text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Product</th>
                            <th className="px-4 py-2 border">Amount</th>
                            <th className="px-4 py-2 border">Transaction ID</th>
                            <th className="px-4 py-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index} className="text-center hover:bg-gray-50">
                                <td className="px-4 py-2 border">{report?.cus_name}</td>
                                <td className="px-4 py-2 border">{report?.cus_email}</td>
                                <td className="px-4 py-2 border">{report?.product_name}</td>
                                <td className="px-4 py-2 border">৳{report?.amount}</td>
                                <td className="px-4 py-2 border text-xs">{report?.tran_id}</td>
                                <td className={`px-4 py-2 border font-semibold ${report?.status === "VALID" ? "text-green-600" : "text-red-500"}`}>
                                    {report?.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentReports;
