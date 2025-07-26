import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const invoice_id = new URLSearchParams(window.location.search).get("invoice_id");

        if (!invoice_id) {
            setLoading(false);
            return;
        }

        const fetchPayment = async () => {
            try {
                const response = await axios.post("https://bijoy-server-nu.vercel.app/api/verify-payment", {
                    invoice_id
                });

                setPaymentData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch payment info", err);
                setLoading(false);
            }
        };

        fetchPayment();
    }, []);

    if (loading) return <div className="text-center p-5">লোড হচ্ছে...</div>;

    if (!paymentData) return <div className="text-center p-5 text-red-600">পেমেন্ট তথ্য পাওয়া যায়নি।</div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-green-600">পেমেন্ট সফল হয়েছে ✅</h2>
            <p><strong>নাম:</strong> {paymentData.full_name}</p>
            <p><strong>ইমেইল:</strong> {paymentData.email}</p>
            <p><strong>অ্যামাউন্ট:</strong> {paymentData.amount} ৳</p>
            <p><strong>ট্রান্সজেকশন আইডি:</strong> {paymentData.transaction_id}</p>
            <p><strong>পেমেন্ট মেথড:</strong> {paymentData.payment_method}</p>
            <p><strong>তারিখ:</strong> {paymentData.date}</p>
        </div>
    );
};

export default PaymentSuccess;
