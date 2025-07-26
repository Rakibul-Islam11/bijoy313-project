import { useEffect, useState } from 'react';
import axios from 'axios';

const DemoOne = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState('');
    const [formData, setFormData] = useState({ price: '', description: '', work: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://bijoy-server-nu.vercel.app/api/active-job-update')
            .then(res => setJobs(res.data.jobs))
            .catch(err => console.error(err));
    }, []);

    const handleSelectChange = (e) => {
        const job = jobs.find(j => j._id === e.target.value);
        if (job) {
            setSelectedJobId(job._id);
            setFormData({ price: job.price, description: job.description, work: job.work });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`https://bijoy-server-nu.vercel.app/api/active-job-update/${selectedJobId}`, formData);
            setMessage(res.data.message);
        } catch (error) {
            console.error(error);
            setMessage('Update failed');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto text-black mt-5 md:mt-10">
            <h2 className="text-xl font-semibold mb-4">Update Job Info</h2>

            <select className="border p-2 w-full mb-4" onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>Select a job (work)</option>
                {jobs.map(job => (
                    <option key={job._id} value={job._id}>{job.work}</option>
                ))}
            </select>

            {selectedJobId && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Work Name</label>
                        <input
                            type="text"
                            name="work"
                            value={formData.work}
                            onChange={handleInputChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Job
                    </button>
                    {message && <p className="text-green-600">{message}</p>}
                </form>
            )}
        </div>
    );
};

export default DemoOne;
