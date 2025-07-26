import React from 'react';
import axios from 'axios';

const DemoTwoo = () => {
    const handleAddReferralBonus = async () => {
        try {
            const res = await axios.post('https://bijoy-server-nu.vercel.app/api/add-referral-bonus');
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert('Something went wrong while adding bonus.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Referral Bonus</h2>
            <button
                onClick={handleAddReferralBonus}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Add Bonus to Referrers
            </button>
        </div>
    );
};

export default DemoTwoo;
