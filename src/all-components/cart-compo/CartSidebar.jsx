import { useContext, useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import axios from 'axios';
import { authContext } from '../auth-porvider-context/AuthContext';

const CartSidebar = () => {
    const { user } = useContext(authContext);
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loadingSid, setLoadingSide] = useState(true);


    useEffect(() => {
        if (!user?.uid) return; // ইউজার লোড না হওয়া পর্যন্ত কিছু না করো

        const fetchCart = async () => {
            try {
                const res = await axios.get(`https://bijoy-server.vercel.app/api/carts/${user.uid}`);
                if (res.data.success) {
                    setCartItems(res.data.cartItems);
                } else {
                    console.error('Failed to load cart');
                }
            } catch (err) {
                console.error('Cart fetch error:', err);
            } finally {
                setLoadingSide(false);
            }
        };

        fetchCart();
    }, [user]);


    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <div className="flex items-center ml-2 relative">
            {/* কার্ট আইকন বাটন */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-black/30 backdrop-blur-md border border-pink-400/30 shadow-[0_0_15px_rgba(255,0,120,0.2)] hover:shadow-[0_0_20px_rgba(255,0,120,0.3)] transition-all duration-300 relative"
            >
                <FiShoppingCart className="w-4 h-4 text-pink-300" />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {itemCount}
                    </span>
                )}
            </button>

            {/* কার্ট ড্রপডাউন */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#1a1a1a] rounded-xl shadow-2xl z-50 border border-pink-900/50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-pink-900/30 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-pink-200">আপনার কার্ট ({itemCount})</h3>
                        <button className="text-xs text-pink-400 hover:text-white">সব মুছুন</button>
                    </div>

                    <div className="divide-y divide-pink-900/30 max-h-80 overflow-y-auto">
                        {loadingSid ? (
                            <div className="px-4 py-6 text-center text-pink-300">লোড হচ্ছে...</div>
                        ) : cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item._id} className="px-4 py-3 hover:bg-pink-900/10 cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-white">{item.product.productName}</p>
                                            <p className="text-xs text-pink-300 mt-1">{item.quantity} x ৳{item.product.variants?.[0]?.price || 0}</p>
                                        </div>
                                        <div className="ml-2 flex items-center">
                                            <span className="text-sm font-bold text-pink-400">
                                                ৳{item.quantity * (item.product.variants?.[0]?.price || 0)}
                                            </span>
                                            <button className="ml-2 text-red-400 hover:text-red-300">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center">
                                <p className="text-sm text-pink-300">আপনার কার্টে কোন আইটেম নেই</p>
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="border-t border-pink-900/30 p-4">
                            <div className="flex justify-between mb-3">
                                <span className="text-sm text-pink-300">মোট:</span>
                                <span className="text-sm font-bold text-pink-400">
                                    ৳{cartItems.reduce((total, item) => {
                                        const price = item.product.variants?.[0]?.price || 0;
                                        return total + item.quantity * price;
                                    }, 0)}
                                </span>
                            </div>
                            <button className="w-full bg-gradient-to-r from-[#ff0768] to-[#e6065d] text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300">
                                চেকআউট করুন
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
