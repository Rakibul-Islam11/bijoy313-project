import { useEffect, useState } from "react";
import axios from "axios";

const Deemo = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://bijoy-server.vercel.app/api/active-jobs/facebook-marketing")
            .then((res) => {
                setJobs(res.data.jobs || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch jobs", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center py-10 text-gray-500">Loading jobs...</p>;
    }

    return (
        <div className="p-4 mt-10">
            <h1 className="text-xl font-bold text-black mb-4">Facebook Marketing Jobs</h1>

            {jobs.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <ul className="space-y-3">
                    {jobs.map((job, index) => (
                        <li
                            key={index}
                            className="bg-white shadow rounded p-4 border border-gray-200"
                        >
                            <p className="text-black font-semibold">Work: {job.work}</p>
                            <p className="text-gray-600">Price: ${job.price}</p>
                            <p className="text-gray-700">Description: {job.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Deemo;
