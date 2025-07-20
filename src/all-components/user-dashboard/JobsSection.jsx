import { Link } from 'react-router-dom';
import { FaBriefcase, FaHourglassHalf, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const JobsSection = ({ userData }) => {
    // Calculate job data from userData
    const activeJobs = userData?.jobs?.filter(job => job.status === 'active') || [];
    const pendingJobs = userData?.jobs?.filter(job => job.status === 'pending') || [];
    const completedJobs = userData?.jobs?.filter(job => job.status === 'completed') || [];

    // Calculate total earnings from completed jobs
    const totalEarnings = completedJobs.reduce((sum, job) => sum + (job.price || 0), 0);

    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-[#c5064f]">💼 Job Dashboard</h2>
                <p className="text-gray-600">Manage your current and completed projects</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Link
                    to="/active-jobs"
                    className="block bg-white p-5 rounded-xl shadow border-l-4 border-blue-500 hover:shadow-lg transition duration-300"
                >
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Active Jobs</h3>
                            <p className="text-2xl font-bold mt-1">4</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <FaBriefcase className="h-6 w-6" />
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                        View all
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>

                {/* Pending Jobs */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-yellow-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Pending Jobs</h3>
                            <p className="text-2xl font-bold mt-1">{pendingJobs.length}</p>
                        </div>
                        <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                            <FaHourglassHalf className="h-6 w-6" />
                        </div>
                    </div>
                    <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                        View requests
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Completed Jobs */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Completed Jobs</h3>
                            <p className="text-2xl font-bold mt-1">{completedJobs.length}</p>
                        </div>
                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                            <FaCheckCircle className="h-6 w-6" />
                        </div>
                    </div>
                    <button className="mt-4 text-sm text-[#c5064f] font-medium hover:underline flex items-center">
                        View history
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Earnings from Jobs */}
                <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-600">Job Earnings</h3>
                            <p className="text-2xl font-bold mt-1">৳ {totalEarnings.toLocaleString()}</p>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                            <FaMoneyBillWave className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        12% from last month
                    </div>
                </div>
            </div>

            {/* Jobs Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Completed Jobs */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                        <FaCheckCircle /> Completed Jobs
                    </h3>
                    <ul className="mt-2 text-gray-700 list-disc list-inside">
                        {completedJobs.map((job, i) => (
                            <li key={i} className="py-1">{job}</li>
                        ))}
                    </ul>
                </div>

                {/* Pending Jobs */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
                        <FaHourglassHalf /> Pending Jobs
                    </h3>
                    <ul className="mt-2 text-gray-700 list-disc list-inside">
                        {pendingJobs.length ? (
                            pendingJobs.map((job, i) => <li key={i} className="py-1">{job}</li>)
                        ) : (
                            <li>No pending jobs</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Active Jobs Table */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold text-lg mb-4">Active Projects</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {activeJobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.client}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.deadline}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className={`h-2.5 rounded-full ${job.progress < 30 ? 'bg-red-500' : job.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                style={{ width: `${job.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">{job.progress}%</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{job.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-[#c5064f] text-white rounded-lg hover:bg-[#a30544] flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create New Proposal
                    </button>
                    <button className="px-4 py-2 border border-[#c5064f] text-[#c5064f] rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Browse Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobsSection;