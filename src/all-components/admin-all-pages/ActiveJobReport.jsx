import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ActiveJobReport = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [userInfoMap, setUserInfoMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingJobId, setUpdatingJobId] = useState(null);
    const [updatingAll, setUpdatingAll] = useState(false);
    const [bulkStatus, setBulkStatus] = useState("pending");
    const [removedJobIds, setRemovedJobIds] = useState(() => {
        const storedRemovedIds = localStorage.getItem('removedJobIds');
        return storedRemovedIds ? JSON.parse(storedRemovedIds) : [];
    });

    // Pagination
    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);

    // Filters
    const [searchService, setSearchService] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [reportModal, setReportModal] = useState({ isOpen: false, jobId: null, uid: null });
    const [reportReason, setReportReason] = useState([{ heading: "", explanation: "" }]);
    const [submittingReport, setSubmittingReport] = useState(false);
    const [giveAmount, setGiveAmount] = useState(0);

    const reportedJob = jobs.find((job) => job._id === reportModal.jobId);
    const totalAmount = reportedJob ? reportedJob.unitPrice * reportedJob.quantity : 0;
    const remainingAmount = totalAmount - (giveAmount * (reportedJob?.unitPrice || 0));

    useEffect(() => {
        let intervalId;

        const fetchJobs = async () => {
            try {
                const res = await axios.get("https://bijoy-server.vercel.app/api/active-jobs");
                if (res.data.success) {
                    setJobs(res.data.data);
                    setError(null);
                } else {
                    setError(res.data.message || "Something went wrong");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // initial fetch
        fetchJobs();

        // set interval to auto-refresh
        intervalId = setInterval(fetchJobs, 10000); // every 10 seconds

        // cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const fetchUserDetails = async () => {
            const uniqueUids = [...new Set(jobs.map((job) => job.uid))];
            const newUserInfoMap = {};

            await Promise.all(
                uniqueUids.map(async (uid) => {
                    try {
                        const res = await axios.get(`https://bijoy-server.vercel.app/users/by-uid/${uid}`);
                        newUserInfoMap[uid] = res.data.success ? res.data.user : null;
                    } catch {
                        newUserInfoMap[uid] = null;
                    }
                })
            );

            setUserInfoMap(newUserInfoMap);
        };

        if (jobs.length > 0) fetchUserDetails();
    }, [jobs]);

    // Filtering
    useEffect(() => {
        let temp = [...jobs];

        // Filter out removed jobs
        temp = temp.filter(job => !removedJobIds.includes(job._id));

        if (searchService) {
            temp = temp.filter((job) =>
                job.serviceType?.toLowerCase().includes(searchService.toLowerCase())
            );
        }

        if (searchUser) {
            temp = temp.filter((job) => {
                const user = userInfoMap[job.uid];
                return (
                    user?.email?.toLowerCase().includes(searchUser.toLowerCase()) ||
                    user?.phone?.toLowerCase().includes(searchUser.toLowerCase())
                );
            });
        }

        if (filterDate) {
            const selectedDate = new Date(filterDate);
            temp = temp.filter((job) => {
                const jobDate = new Date(job.createdAt);
                return (
                    jobDate.getFullYear() === selectedDate.getFullYear() &&
                    jobDate.getMonth() === selectedDate.getMonth() &&
                    jobDate.getDate() === selectedDate.getDate()
                );
            });
        }

        setCurrentPage(1);
        setFilteredJobs(temp);
    }, [searchService, searchUser, filterDate, jobs, userInfoMap, removedJobIds]);

    const updateWalletAndCompletedWorks = async (job, newStatus) => {
        if (newStatus !== 'success') return;

        try {
            const totalAmount = job.unitPrice * job.quantity;

            // Save to completed works
            await axios.post("https://bijoy-server.vercel.app/api/user-completed-works", {
                uid: job.uid,
                jobId: job._id,
                remainingBalance: totalAmount,
                jobDetails: {
                    serviceType: job.serviceType,
                    unitPrice: job.unitPrice,
                    quantity: job.quantity,
                    totalAmount,
                    remainingQuantity: job.quantity,
                    remainingAmount: totalAmount,
                    note: job.note,
                    createdAt: job.createdAt,
                    originalJobId: job._id
                },
                status: 'completed'
            });

            // Update wallet balance
            await axios.put("https://bijoy-server.vercel.app/api/wallets/update-balance", {
                uid: job.uid,
                amount: totalAmount
            });

            return true;
        } catch (error) {
            console.error("Error updating wallet and completed works:", error);
            return false;
        }
    };

    const updateJobStatus = async (jobId, newStatus) => {
        setUpdatingJobId(jobId);

        try {
            const job = jobs.find(j => j._id === jobId);

            // 1. Update the job status first
            const res = await axios.put(`https://bijoy-server.vercel.app/api/active-jobs/${jobId}/status`, {
                status: newStatus
            });

            if (!res.data.success) {
                throw new Error(res.data.message || 'Failed to update job status');
            }

            // If status is being updated to 'success', perform additional operations
            if (newStatus === 'success') {
                const totalAmount = job.unitPrice * job.quantity;

                // Check if job already exists in completed works
                const checkResponse = await axios.get(`https://bijoy-server.vercel.app/api/user-completed-works/by-job-id/${job._id}`);

                if (!checkResponse.data.success || !checkResponse.data.completedWork) {
                    // Job doesn't exist in completed works, so proceed with full process

                    // 2. Save to completed works
                    await axios.post("https://bijoy-server.vercel.app/api/user-completed-works", {
                        uid: job.uid,
                        jobId: job._id,
                        remainingBalance: totalAmount,
                        jobDetails: {
                            serviceType: job.serviceType,
                            unitPrice: job.unitPrice,
                            quantity: job.quantity,
                            totalAmount,
                            remainingQuantity: job.quantity,
                            remainingAmount: totalAmount,
                            note: job.note,
                            createdAt: job.createdAt,
                            originalJobId: job._id
                        },
                        status: 'completed'
                    });

                    // ✅ 2.1 Report submit to active-job-reports (for audit trail)
                    await axios.post("https://bijoy-server.vercel.app/api/active-job-reports", {
                        jobId: job._id,
                        uid: job.uid,
                        balance: totalAmount,
                        reasons: [
                            {
                                heading: "Approved Without Issues",
                                explanation: "Job was manually marked as successful by admin/moderator."
                            }
                        ]
                    });

                    // 3. Update wallet balance
                    await axios.put("https://bijoy-server.vercel.app/api/wallets/update-balance", {
                        uid: job.uid,
                        amount: totalAmount
                    });

                    await Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        html: `
                        <div>
                            <p>Job status updated to success</p>
                            <p class="mt-2 text-green-600">This job has been saved to completed works with full balance: ${totalAmount}৳</p>
                            <p class="mt-1 text-green-600">The amount has been added to user's wallet.</p>
                        </div>
                        `,
                        timer: 3000
                    });
                } else {
                    // Job already exists in completed works, just show status update success
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Job status updated to success (already in completed works)',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            } else {
                // For other status updates (not 'success'), just show success message
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res.data.message,
                    timer: 2000,
                    showConfirmButton: false
                });
            }

            // Update local state
            setJobs((prevJobs) =>
                prevJobs.map((job) =>
                    job._id === jobId
                        ? { ...job, status: newStatus, tempStatus: undefined }
                        : job
                )
            );
        } catch (err) {
            console.error("Error updating status:", err.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message || 'Something went wrong'
            });
        } finally {
            setUpdatingJobId(null);
        }
    };

    const updateAllFilteredJobs = async () => {
        if (filteredJobs.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Jobs',
                text: 'No filtered jobs to update'
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to update ${filteredJobs.length} jobs to ${bulkStatus} status`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update all!'
        });

        if (!result.isConfirmed) return;

        setUpdatingAll(true);

        try {
            const jobIds = filteredJobs.map(job => job._id);
            const res = await axios.put(`https://bijoy-server.vercel.app/api/active-jobs/bulk-status`, {
                jobIds,
                status: bulkStatus
            });

            if (res.data.success) {
                // If bulk status is 'success', update wallet and completed works for each job
                if (bulkStatus === 'success') {
                    await Promise.all(
                        filteredJobs.map(async (job) => {
                            await updateWalletAndCompletedWorks(job, bulkStatus);
                        })
                    );
                }

                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res.data.message,
                    timer: 2000,
                    showConfirmButton: false
                });

                setJobs(prevJobs =>
                    prevJobs.map(job =>
                        jobIds.includes(job._id)
                            ? { ...job, status: bulkStatus, tempStatus: undefined }
                            : job
                    )
                );
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: res.data.message || 'Bulk update failed'
                });
            }
        } catch (err) {
            console.error("Error in bulk update:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.message || err.message || 'Something went wrong'
            });
        } finally {
            setUpdatingAll(false);
        }
    };

    const handleRemoveFromUI = (jobId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently hide this job from your view. You can reset hidden jobs later.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, hide it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedRemovedIds = [...removedJobIds, jobId];
                setRemovedJobIds(updatedRemovedIds);
                localStorage.setItem('removedJobIds', JSON.stringify(updatedRemovedIds));

                Swal.fire(
                    'Hidden!',
                    'The job has been hidden from your view.',
                    'success'
                );
            }
        });
    };

    const handleReportSubmit = async () => {
        if (!reportReason.length || reportReason.some(r => !r.heading.trim() || !r.explanation.trim())) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Input',
                text: 'Please fill all reason headings and explanations'
            });
            return;
        }

        const remainingQuantity = Math.max(reportedJob?.quantity - giveAmount, 0);
        const remainingAmount = totalAmount - (giveAmount * (reportedJob?.unitPrice || 0));

        setSubmittingReport(true);

        try {
            // Step 1: Submit the job report
            const reportRes = await axios.post("https://bijoy-server.vercel.app/api/active-job-reports", {
                jobId: reportModal.jobId,
                uid: reportModal.uid,
                reasons: reportReason,
                balance: remainingAmount
            });

            // Step 2: If remaining balance > 0, save to completed works and update wallet
            if (remainingAmount > 0) {
                const jobDetails = {
                    serviceType: reportedJob.serviceType,
                    unitPrice: reportedJob.unitPrice,
                    quantity: reportedJob.quantity,
                    totalAmount: reportedJob.unitPrice * reportedJob.quantity,
                    remainingQuantity,
                    remainingAmount,
                    note: reportedJob.note,
                    createdAt: reportedJob.createdAt,
                    originalJobId: reportedJob._id
                };

                // Save to completed works
                await axios.post("https://bijoy-server.vercel.app/api/user-completed-works", {
                    uid: reportModal.uid,
                    jobId: reportModal.jobId,
                    remainingBalance: remainingAmount,
                    jobDetails,
                    status: 'pending'
                });

                // Update wallet balance
                await axios.put("https://bijoy-server.vercel.app/api/wallets/update-balance", {
                    uid: reportModal.uid,
                    amount: remainingAmount
                });
            }

            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Report Submitted!',
                html: `
                    <div>
                        <p>${reportRes.data.message || 'Report submitted successfully'}</p>
                        ${remainingAmount > 0 ?
                        `<p class="mt-2 text-green-600">This job has been saved to completed works with remaining balance: ${remainingAmount}৳</p>
                         <p class="mt-1 text-green-600">The amount has been added to user's wallet.</p>` :
                        ''}
                    </div>
                `,
                timer: 3000
            });

            // Close modal and reset form
            setReportModal({ isOpen: false, jobId: null, uid: null });
            setReportReason([{ heading: "", explanation: "" }]);
            setGiveAmount(0);
        } catch (error) {
            console.error("Report submission error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Something went wrong'
            });
        } finally {
            setSubmittingReport(false);
        }
    };

    const resetHiddenJobs = () => {
        Swal.fire({
            title: 'Reset Hidden Jobs?',
            text: `This will make all ${removedJobIds.length} hidden jobs visible again.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset them!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('removedJobIds');
                setRemovedJobIds([]);
                Swal.fire(
                    'Reset!',
                    'All hidden jobs are now visible again.',
                    'success'
                );
            }
        });
    };

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <p className="text-center text-black py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className="container mx-auto px-4 pt-16 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Active Job Report</h1>
                {removedJobIds.length > 0 && (
                    <button
                        onClick={resetHiddenJobs}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm"
                    >
                        Reset Hidden Jobs ({removedJobIds.length})
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-black">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                        <input
                            type="text"
                            placeholder="Search by service..."
                            value={searchService}
                            onChange={(e) => setSearchService(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Email/Phone</label>
                        <input
                            type="text"
                            placeholder="Search by user..."
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Bulk Update Section */}
            <div className="bg-white p-4 rounded-lg shadow-md text-black mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Update all filtered jobs to:</span>
                        <select
                            value={bulkStatus}
                            onChange={(e) => setBulkStatus(e.target.value)}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={updatingAll}
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="success">Success</option>
                            <option value="cancel">Cancel</option>
                        </select>
                    </div>
                    <button
                        onClick={updateAllFilteredJobs}
                        disabled={filteredJobs.length === 0 || updatingAll}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 ${filteredJobs.length === 0 || updatingAll ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        {updatingAll ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating {filteredJobs.length} jobs...
                            </>
                        ) : (
                            `Update All (${filteredJobs.length} jobs)`
                        )}
                    </button>
                </div>
            </div>

            {/* Job List */}
            {paginatedJobs.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-gray-500">No active jobs found matching your criteria.</p>
                    {removedJobIds.length > 0 && (
                        <button
                            onClick={resetHiddenJobs}
                            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm"
                        >
                            Show {removedJobIds.length} Hidden Jobs
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {paginatedJobs.map((job) => {
                        const user = userInfoMap[job.uid];
                        return (
                            <div key={job._id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                {/* Close button for success status */}
                                {job.status === 'success' && (
                                    <button
                                        onClick={() => handleRemoveFromUI(job._id)}
                                        className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        title="Hide this job"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}

                                <div className="p-4 border-b">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                        <div>
                                            <h3 className="font-semibold text-lg text-blue-600">{job.serviceType || "N/A"}</h3>
                                            <p className="text-sm text-gray-500">{new Date(job.createdAt).toLocaleString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            job.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                job.status === 'success' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 text-black grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-2">Job Details</h4>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Quantity:</span> {job.quantity}</p>
                                            <p><span className="font-medium">Unit Price:</span> {job.unitPrice}৳</p>
                                            <p><span className="font-medium">Total:</span> {job.unitPrice * job.quantity}৳</p>
                                            <p><span className="font-medium">Note:</span> {job.note || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-2">User Information</h4>
                                        <div className="flex items-start gap-3">
                                            {user?.photoURL && (
                                                <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full" />
                                            )}
                                            <div>
                                                <p><span className="font-medium">Name:</span> {user?.displayName || "Unknown"}</p>
                                                <p><span className="font-medium">Email:</span> {user?.email || "N/A"}</p>
                                                <p><span className="font-medium">Phone:</span> {user?.phone || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 text-black bg-gray-50 border-t">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">Update Status:</span>
                                            <select
                                                value={job.tempStatus || job.status}
                                                onChange={(e) => {
                                                    const selectedStatus = e.target.value;
                                                    setJobs((prevJobs) =>
                                                        prevJobs.map((j) =>
                                                            j._id === job._id
                                                                ? { ...j, tempStatus: selectedStatus }
                                                                : j
                                                        )
                                                    );
                                                }}
                                                className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="success">Success</option>
                                                <option value="cancel">Cancel</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateJobStatus(job._id, job.tempStatus || job.status)}
                                                disabled={(job.tempStatus || job.status) === job.status || updatingJobId === job._id}
                                                className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 ${(job.tempStatus || job.status) === job.status || updatingJobId === job._id ?
                                                    'bg-gray-200 text-gray-600 cursor-not-allowed' :
                                                    'bg-green-600 hover:bg-green-700 text-white'
                                                    }`}
                                            >
                                                {updatingJobId === job._id ? (
                                                    <>
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Updating
                                                    </>
                                                ) : (
                                                    "Confirm Update"
                                                )}
                                            </button>
                                            <button
                                                onClick={() => setReportModal({ isOpen: true, jobId: job._id, uid: job.uid })}
                                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                                            >
                                                Report Issue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {reportModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl text-red-700 font-semibold mb-4">Report Job</h2>

                            {reportedJob && (
                                <div className="text-sm text-black bg-gray-100 px-3 py-2 rounded shadow-sm space-y-1 mb-4">
                                    <div>
                                        <span className="font-semibold">Service:</span> {reportedJob.serviceType}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Unit Price:</span> {reportedJob.unitPrice}৳
                                    </div>
                                    <div>
                                        <span className="font-semibold">Quantity:</span> {reportedJob.quantity}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Total:</span> {reportedJob.unitPrice * reportedJob.quantity}৳
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="font-semibold">Cancel Quantity:</label>
                                        <input
                                            type="number"
                                            className="border px-2 py-1 w-20 rounded text-sm"
                                            min={0}
                                            max={reportedJob.quantity}
                                            value={giveAmount}
                                            onChange={(e) => setGiveAmount(Number(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <span className="font-semibold">Cancel Amount:</span> {giveAmount * reportedJob.unitPrice}৳
                                    </div>
                                    <div>
                                        <span className="font-semibold">Remaining Quantity:</span> {Math.max(reportedJob.quantity - giveAmount, 0)}
                                    </div>
                                    <div className={`font-semibold ${remainingAmount > 0 ? 'text-green-600' : ''}`}>
                                        <span>Remaining Balance:</span> {remainingAmount}৳
                                    </div>
                                    {remainingAmount > 0 && (
                                        <div className="text-xs text-blue-600 mt-1">
                                            This job will be saved to completed works with remaining balance
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-4 mb-4">
                                {reportReason.map((reason, index) => (
                                    <div key={index} className="border rounded p-4 relative">
                                        {reportReason.length > 1 && (
                                            <button
                                                onClick={() => {
                                                    const updated = [...reportReason];
                                                    updated.splice(index, 1);
                                                    setReportReason(updated);
                                                }}
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                                title="Remove this reason"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}

                                        <div className="mb-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Reason Heading</label>
                                            <input
                                                type="text"
                                                placeholder={`Reason #${index + 1}`}
                                                value={reason.heading}
                                                onChange={(e) => {
                                                    const updated = [...reportReason];
                                                    updated[index].heading = e.target.value;
                                                    setReportReason(updated);
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Explanation</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Please provide details..."
                                                value={reason.explanation}
                                                onChange={(e) => {
                                                    const updated = [...reportReason];
                                                    updated[index].explanation = e.target.value;
                                                    setReportReason(updated);
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setReportReason([...reportReason, { heading: "", explanation: "" }])}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Another Reason
                            </button>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    onClick={() => {
                                        setReportModal({ isOpen: false, jobId: null, uid: null });
                                        setReportReason([{ heading: "", explanation: "" }]);
                                        setGiveAmount(0);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReportSubmit}
                                    disabled={submittingReport}
                                    className={`px-4 py-2 rounded-md text-sm font-medium text-white ${submittingReport ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                                >
                                    {submittingReport ? 'Submitting...' : 'Submit Report'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveJobReport;