import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const CheckoutInfo = () => {
    const location = useLocation();
    const orderSummary = location.state;

    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        address: '',
        country: 'Bangladesh',
        subscribe: false,
        notes: '',
        paymentMethod: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Order Summary:', orderSummary);
    console.log('Form Data:', formData);

    const { phone, name, address, notes, subscribe, paymentMethod } = formData;

    // If COD, proceed differently (show confirmation / save locally / send to backend)
    if (paymentMethod === 'cod') {
        // ✅ You can optionally send the formData + orderSummary to backend for storage
        console.log("Cash on Delivery selected. Proceeding without gateway...");
        alert("Thank you! Your order has been placed via Cash on Delivery.");
        return;
    }

    // For Online Payment via SSLCommerz
    if (paymentMethod === 'uddoktapay') {
        try {
            const response = await fetch('https://bijoy-server-nu.vercel.app/initiate-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email: `${phone}@gmail.com`,
                    product: 'Online Order',
                    amount: orderSummary?.grandTotal?.toFixed(2) || 0,
                    phone,
                    address,
                    notes,
                    subscribe,
                    orderSummary // <-- এটাও পাঠাও
                }),

            });

            const data = await response.json();

            if (data?.GatewayPageURL) {
                window.location.href = data.GatewayPageURL;
            } else {
                alert("Payment gateway URL not received.");
                console.error("Invalid gateway response:", data);
            }
        } catch (err) {
            console.error("Payment request failed:", err);
            alert("Something went wrong while initiating payment.");
        }
    }
};


    return (
        <div className="flex flex-col md:flex-row gap-8 md:p-6 text-black max-w-7xl mx-auto mt-12 md:mt-10">
            {/* Right: Order Summary + Payment */}
            <div className="w-full md:w-1/3 space-y-2">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><strong>Subtotal:</strong> ৳{orderSummary?.subtotal?.toFixed(2) || 0}</li>
                        <li><strong>New Item Price:</strong> ৳{orderSummary?.newItemPrice?.toFixed(2) || 0}</li>
                        <li><strong>Delivery Charge:</strong> ৳{orderSummary?.deliveryCharge?.toFixed(2) || 0}</li>
                        <li><strong>Advance Payment:</strong> ৳{orderSummary?.advancePayment?.toFixed(2) || 0}</li>
                        <li><strong>Discount:</strong> ৳{orderSummary?.discountAmount?.toFixed(2) || 0}</li>
                        <li><strong>Coupon Code:</strong> {orderSummary?.couponCode || 'N/A'}</li>
                        <li className="font-bold text-lg mt-2 border-t pt-2">
                            <strong>Grand Total:</strong> ৳{orderSummary?.grandTotal?.toFixed(2) || 0}
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-gray-800">
                        পেমেন্ট মেথড নির্বাচন করুন
                    </h3>

                    <div className="space-y-4">
                        {/* Cash on Delivery Option */}
                        <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    checked={formData.paymentMethod === 'cod'}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between items-start">
                                    <span className="block text-sm font-medium text-gray-800">
                                        Cash on Delivery
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        জনপ্রিয়
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে টাকা দিবেন
                                </p>
                            </div>
                        </label>

                        {/* SSLCommerz Option */}
                        <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="uddoktapay"
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    checked={formData.paymentMethod === 'uddoktapay'}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between items-start">
                                    <span className="block text-sm font-medium text-gray-800">
                                        Online Payment
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        নিরাপদ
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    SSLCOMMERZ এর মাধ্যমে কার্ড/মোবাইল ব্যাংকিং/ইন্টারনেট ব্যাংকিং
                                </p>
                                <div className="mt-2 flex space-x-2">
                                    <img
                                        src="/images/bkash-logo.png"
                                        alt="bKash"
                                        className="h-6 object-contain"
                                    />
                                    <img
                                        src="/images/nagad-logo.png"
                                        alt="Nagad"
                                        className="h-6 object-contain"
                                    />
                                    <img
                                        src="/images/visa-logo.png"
                                        alt="Visa"
                                        className="h-6 object-contain"
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            {/* Left: Billing Form */}
            <form onSubmit={handleSubmit} className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">BILLING & SHIPPING</h2>

                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1'>
                        <label className="block mb-2 font-medium text-gray-700">
                            আপনার মোবাইল নাম্বারটি লিখুন (হোয়াটসঅ্যাপ) *
                            <input
                                type="text"
                                name="phone"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className='flex-1'>
                        <label className="block mb-2 font-medium text-gray-700">
                            আপনার নাম লিখুন *
                            <input
                                type="text"
                                name="name"
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                </div>

                <label className="block mb-4 font-medium text-gray-700">
                    আপনার ঠিকানা লিখুন *
                    <input
                        type="text"
                        name="address"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="flex items-center mb-6 text-gray-700">
                    <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    I would like to receive exclusive emails with discounts and product information
                </label>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">ADDITIONAL INFORMATION</h3>

                <label className="block font-medium text-gray-700 mb-2">
                    Order notes (optional)
                    <textarea
                        name="notes"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        value={formData.notes}
                        onChange={handleChange}
                    ></textarea>
                </label>

                <button
                    type="submit"
                    className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Continue to Payment
                </button>
            </form>

            
        </div>
    );
};

export default CheckoutInfo;
