import { useState } from "react";

const Dmo = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        product: "Demo Product",
        amount: 100,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        try {
            const res = await fetch("https://bijoy-server-nu.vercel.app/initiate-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data?.GatewayPageURL) {
                window.location.href = data.GatewayPageURL;
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-20 space-y-4">
            <input
                className="w-full border px-4 py-2 rounded"
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                required
            />
            <input
                className="w-full border px-4 py-2 rounded"
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                required
            />
            <input
                className="w-full border px-4 py-2 rounded"
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
            />
            <input
                className="w-full border px-4 py-2 rounded"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
            />
            <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                onClick={handlePayment}
            >
                Pay Now
            </button>
        </div>
    );
};

export default Dmo;
