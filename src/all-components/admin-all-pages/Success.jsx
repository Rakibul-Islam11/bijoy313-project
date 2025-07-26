// React Success Page
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Success = () => {
    const [searchParams] = useSearchParams();
    const tran_id = searchParams.get("tran_id");
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        if (tran_id) {
            axios.get(`https://bijoy-server-nu.vercel.app/payment-details/${tran_id}`)
                .then(res => setPayment(res.data))
                .catch(err => console.error("Payment not found", err));
        }
    }, [tran_id]);

    if (!payment) return <p>Loading...</p>;

    return (
        <div className="p-6 text-center mt-30">
            <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-4">Thank you, {payment.cus_name}</p>
            <p>Transaction ID: {payment.tran_id}</p>
            <p>Amount: {payment.amount} BDT</p>
            {/* More details if needed */}
        </div>
    );
};

export default Success;
