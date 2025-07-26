import { useContext, useEffect, useState } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';
import axios from 'axios';
import { activeJobContext } from '../all-contexts/ActiveJobContext';

const HistorySection = () => {
    const { jobHistoryReport } = useContext(activeJobContext);
    const [activeTab, setActiveTab] = useState("Pending");
    const { user } = useContext(authContext);
    const [jobHistory, setJobHistory] = useState([]);
    console.log(jobHistoryReport);

    useEffect(() => {
        let interval;

        if (user?.uid) {
            const fetchJobHistory = () => {
                axios.get(`https://bijoy-server-nu.vercel.app/api/active-jobs/${user.uid}`)
                    .then(res => {
                        if (res.data.success) {
                            setJobHistory(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.error("Error fetching job history:", err);
                    });
            };

            fetchJobHistory(); // First load
            interval = setInterval(fetchJobHistory, 2000); // Refresh every 2s
        }

        return () => clearInterval(interval);
    }, [user?.uid]);

    const isJobInActiveTab = (jobStatus) => {
        const status = jobStatus?.toLowerCase();
        const tab = activeTab.toLowerCase();
        if (status === 'success' && tab === 'completed') return true;
        if (status === 'cancel' && tab === 'cancelled') return true;
        return status === tab;
    };

    const getFilteredJobs = () => {
        if (activeTab === "Completed") {
            return jobHistoryReport || [];
        } else if (activeTab === "Cancelled") {
            return [
                ...jobHistory.filter(job => isJobInActiveTab(job.status)),
                ...(jobHistoryReport?.filter(report => report.reasons && report.reasons.length > 0) || [])
            ];
        } else {
            return jobHistory.filter(job => isJobInActiveTab(job.status));
        }
    };

    const filteredJobs = getFilteredJobs();

    const hasApprovedWithoutIssues = (job) => {
        return job.reasons?.some(reason => reason.heading === "Approved Without Issues");
    };

    const getButtonText = (job) => {
        if (activeTab === "Pending") return "পেন্ডিং এ আছে অপেক্ষা করুন সর্বোচ্চ(৭২ঘন্টা)";
        if (activeTab === "Processing") return "প্রসেসিং এ আছে অপেক্ষা করুন";
        if (activeTab === "Completed") {
            if (hasApprovedWithoutIssues(job)) {
                return "সকল কাজ approved হয়েছে";
            }
            return job.reasons && job.reasons.length > 0 ? "ক্যন্সেল আইডি দেখুন" : "সম্পন্ন";
        }
        return "বিস্তারিত দেখুন";
    };

    const handleButtonClick = () => {
        if (activeTab === "Completed") {
            setActiveTab("Cancelled");
        }
    };

    return (
        <div className="space-y-6 mt-15 md:mt-0 text-black">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#c5064f] to-[#e63772] p-6 rounded-2xl text-white">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    কাজের হিস্টোরি
                </h2>
                <p className="opacity-90">আপনার সকল কাজের অবস্থা এখানে দেখুন</p>
            </div>

            {/* Tabs */}
            <div className="bg-white p-2 rounded-xl shadow-lg">
                <div className="flex overflow-x-auto scrollbar-hide">
                    {["Pending", "Processing", "Completed", "Cancelled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveTab(status)}
                            className={`flex-1 min-w-max px-2 sm:px-4 py-3 font-medium text-sm transition-all relative ${activeTab === status
                                ? "text-[#c5064f]"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {status === "Pending" && "পেন্ডিং"}
                            {status === "Processing" && "প্রোসেসিং"}
                            {status === "Completed" && "কমপ্লিট"}
                            {status === "Cancelled" && "ক্যান্সেল"}
                            {activeTab === status && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c5064f] rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Jobs List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => (
                    <div
                        key={job._id?.$oid || job._id}
                        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform ${job.status === 'success' ? 'border-t-4 border-green-500' :
                            job.status === 'pending' ? 'border-t-4 border-yellow-500' :
                                job.status === 'processing' ? 'border-t-4 border-blue-500' :
                                    job.status === 'cancel' || job.reasons ? 'border-t-4 border-red-500' : ''
                            }`}
                    >
                        <div className="p-5 border-b">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-800">
                                    {job.serviceType || job.jobId || "সার্ভিস"}
                                </h3>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${job.status === 'success' ? 'bg-green-100 text-green-800' :
                                    job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        job.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                            job.status === 'cancel' || job.reasons ?
                                                hasApprovedWithoutIssues(job) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {job.status === 'success' && "সম্পন্ন"}
                                    {job.status === 'pending' && "পেন্ডিং"}
                                    {job.status === 'processing' && "প্রসেসিং"}
                                    {(job.status === 'cancel' || job.reasons) &&
                                        (hasApprovedWithoutIssues(job) ? "সকল কাজ approved হয়েছে" : "কিছু কাজ বাতিল হয়েছে")}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {job._id?.$oid ? `অর্ডার আইডি: ${job._id.$oid}` : `জব আইডি: ${job.jobId || job._id}`}
                            </p>
                        </div>

                        <div className="p-5 grid grid-cols-2 gap-4 text-sm">
                            {job.unitPrice && (
                                <div>
                                    <p className="text-gray-500">ইউনিট রেট</p>
                                    <p className="font-medium">৳ {job.unitPrice}</p>
                                </div>
                            )}
                            {job.quantity && (
                                <div>
                                    <p className="text-gray-500">পরিমাণ</p>
                                    <p className="font-medium">{job.quantity}</p>
                                </div>
                            )}
                            {(job.totalPrice || job.balance) && (
                                <div>
                                    <p className="text-gray-500">{job.totalPrice ? "টাকা" : "ব্যালেন্স"}</p>
                                    <p className="font-bold text-[#c5064f]">
                                        ৳ {job.totalPrice?.$numberInt || job.totalPrice || job.balance?.$numberInt || job.balance}
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-gray-500">তারিখ</p>
                                <p className="font-medium">
                                    {new Date(
                                        job.createdAt?.$date?.$numberLong ||
                                        job.createdAt?.$date ||
                                        job.createdAt
                                    ).toLocaleDateString('bn-BD', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            {job.note && (
                                <div className="col-span-2">
                                    <p className="text-gray-500">নোট</p>
                                    <p className="font-medium">{job.note}</p>
                                </div>
                            )}
                        </div>

                        {/* Reasons Section for Cancelled Tab */}
                        {activeTab === "Cancelled" && job.reasons && !hasApprovedWithoutIssues(job) && (
                            <div className="px-5 pb-3">
                                <h4 className="font-semibold text-gray-700 mb-2">বাতিলের কারণ:</h4>
                                <div className="space-y-2">
                                    {job.reasons.map((reason, idx) => (
                                        <div key={idx} className="bg-gray-50 p-3 rounded">
                                            <p className="font-medium">{reason.heading}</p>
                                            <p className="text-sm text-gray-600">{reason.explanation}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Button Section */}
                        <div className="px-5 py-3 bg-gray-50">
                            <button
                                onClick={getButtonText(job) === "ক্যন্সেল আইডি দেখুন" ? handleButtonClick : undefined}
                                className={`w-full py-2 rounded-lg transition ${activeTab === "Pending" || activeTab === "Processing"
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : getButtonText(job) === "সম্পন্ন" || getButtonText(job) === "সকল কাজ approved হয়েছে"
                                        ? "bg-green-500 text-white cursor-default"
                                        : "bg-[#c5064f] text-white hover:bg-[#a30544]"
                                    }`}
                            >
                                {getButtonText(job)}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredJobs.length === 0 && (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700 mt-4">
                        {activeTab === "Completed" && "কোনো কমপ্লিট কাজ নেই"}
                        {activeTab === "Pending" && "কোনো পেন্ডিং কাজ নেই"}
                        {activeTab === "Processing" && "কোনো প্রোসেসিং কাজ নেই"}
                        {activeTab === "Cancelled" && "কোনো বাতিল কাজ নেই"}
                    </h3>
                    <p className="text-gray-500 mt-1">এই বিভাগে কোনো কাজ পাওয়া যায়নি</p>
                </div>
            )}
        </div>
    );
};

export default HistorySection;