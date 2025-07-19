import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../auth-porvider-context/AuthContext";

const GetWork = () => {
    const { user } = useContext(authContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        if (!user?.uid) return;

        const fetchJobs = async () => {
            try {
                const res = await axios.get(`https://bijoy-server.vercel.app/api/active-jobs-reports/${user.uid}`);
                if (res.data.success) {
                    setJobs(res.data.data);

                    // ✅ মোট ব্যালেন্স হিসাব করা
                    const total = res.data.data.reduce((sum, job) => sum + (parseFloat(job.balance) || 0), 0);
                    setTotalBalance(total);
                } else {
                    setError("Failed to load jobs");
                }
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        // প্রথমবার ফেচ করা
        fetchJobs();

        // প্রতি 1 সেকেন্ড পর পর ফেচ করার জন্য ইন্টারভাল সেট করা
        const intervalId = setInterval(fetchJobs, 1000);

        // কম্পোনেন্ট আনমাউন্ট হলে ইন্টারভাল ক্লিয়ার করা
        return () => clearInterval(intervalId);
    }, [user?.uid]);

    if (loading) return <div className="text-center mt-10 text-gray-500">Loading jobs...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Your Reported Jobs</h2>

            {/* ✅ Total Balance */}
            <div className="text-center text-lg text-green-600 font-semibold">
                Total Earned from Reports: ৳{totalBalance.toFixed(2)}
            </div>

            {jobs.length === 0 ? (
                <div className="text-center text-gray-600">You have no job reports yet.</div>
            ) : (
                jobs.map((job) => (
                    <div
                        key={job._id}
                        className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all"
                    >
                        <div className="font-medium text-indigo-700">Job ID: {job.jobId}</div>
                        <div className="text-sm text-gray-600">Balance: ৳{job.balance}</div>
                        {job.reasons?.map((reason, index) => (
                            <div key={index} className="mt-1 text-sm text-gray-500">
                                <strong>{reason.heading}:</strong> {reason.explanation}
                            </div>
                        ))}
                        <div className="text-xs text-gray-400 mt-2">
                            Created At: {new Date(job.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default GetWork;