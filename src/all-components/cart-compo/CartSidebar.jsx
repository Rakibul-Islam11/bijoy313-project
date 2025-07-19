import { useContext, useEffect, useState } from 'react';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import axios from 'axios';
import { authContext } from '../auth-porvider-context/AuthContext';
import { Link } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
    const { user } = useContext(authContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingItemId, setRemovingItemId] = useState(null);
    const [updatingItemId, setUpdatingItemId] = useState(null); // Track which item's quantity is being updated

    useEffect(() => {
        if (!user?.uid) return;

        const fetchCart = async () => {
            try {
                const res = await axios.get(`https://bijoy-server.vercel.app/api/carts/${user.uid}`);
                if (res.data.success) {
                    setCartItems(res.data.cartItems);
                }
            } catch (err) {
                console.error('Cart fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchCart();
        }
    }, [user?.uid, isOpen]);

    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const getProductPrice = (product, variant) => {
        if (product.variantType === 'fashion' && product.variants?.price) {
            return parseFloat(product.variants.price) || 0;
        }
        if (Array.isArray(product.variants) && product.variants.length > 0) {
            return parseFloat(product.variants[0]?.price) || 0;
        }
        if (product.simpleProduct?.price) {
            return parseFloat(product.simpleProduct.price) || 0;
        }
        if (product.isDigital && product.downloadFiles?.[0]?.resellerPrice) {
            return parseFloat(product.downloadFiles[0].resellerPrice) || 0;
        }
        return 0;
    };

    const subtotal = cartItems.reduce((total, item) => {
        const price = getProductPrice(item.product, item.variant);
        return total + item.quantity * price;
    }, 0);

    const handleRemoveItem = async (cartItemId) => {
        setRemovingItemId(cartItemId);
        try {
            const res = await axios.delete(`https://bijoy-server.vercel.app/api/carts/${cartItemId}`);
            if (res.data.success) {
                setCartItems(cartItems.filter(item => item._id !== cartItemId));
            }
        } catch (err) {
            console.error('Error removing item:', err);
        } finally {
            setRemovingItemId(null);
        }
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1

        setUpdatingItemId(cartItemId);
        try {
            const res = await axios.put(`https://bijoy-server.vercel.app/api/carts/${cartItemId}`, {
                quantity: newQuantity
            });

            if (res.data.success) {
                setCartItems(cartItems.map(item =>
                    item._id === cartItemId ? { ...item, quantity: newQuantity } : item
                ));
            }
        } catch (err) {
            console.error('Error updating quantity:', err);
        } finally {
            setUpdatingItemId(null);
        }
    };

    const renderVariantInfo = (product, variant) => {
        if (!variant) return null;

        if (product.variantType === 'fashion') {
            return (
                <p className="text-sm text-gray-500 mt-1">
                    {variant.color && `Color: ${variant.color}`}
                    {variant.size && `, Size: ${variant.size}`}
                </p>
            );
        }

        if (product.variantType === 'weight') {
            return (
                <p className="text-sm text-gray-500 mt-1">
                    Weight: {variant.value} kg
                </p>
            );
        }

        return null;
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed  z-40"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col inset-0 bg-black/500 backdrop-blur-md border-l border-white/30 shadow-2xl">
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center pb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Your Cart ({itemCount})</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="animate-pulse text-gray-500">Loading your cart...</div>
                            </div>
                        ) : cartItems.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                <FiShoppingCart size={48} className="mb-4 opacity-60" />
                                <p className="text-lg">Your cart is empty</p>
                                <p className="text-sm mt-2">Start shopping to add items</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto py-2 space-y-4">
                                    {cartItems.map((item) => {
                                        const price = getProductPrice(item.product, item.variant);
                                        const totalPrice = price * item.quantity;
                                        const isRemoving = removingItemId === item._id;
                                        const isUpdating = updatingItemId === item._id;

                                        return (
                                            <div key={item._id} className="flex items-start p-4 bg-white/70 rounded-lg  border-red-600 border-2 shadow-sm hover:shadow-md transition-all">
                                                <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.product.media?.mainImage || item.product.media?.[0]}
                                                        alt={item.product.productName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-800 truncate">
                                                        {item.product.productName}
                                                    </h3>
                                                    {renderVariantInfo(item.product, item.variant)}
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center border border-gray-200 rounded-full">
                                                            <button
                                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                                disabled={isUpdating || item.quantity <= 1}
                                                                className="px-2 py-1 text-black hover:bg-gray-100 rounded-l-full transition-colors disabled:opacity-50"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3 text-black py-1 text-sm font-medium">
                                                                {isUpdating ? (
                                                                    <div className="w-4 h-4 text-black border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                                ) : (
                                                                    item.quantity
                                                                )}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                                disabled={isUpdating}
                                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full transition-colors disabled:opacity-50"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="ml-4 font-bold text-gray-800">
                                                            ৳{totalPrice.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => !isRemoving && handleRemoveItem(item._id)}
                                                    disabled={isRemoving}
                                                    className="ml-3 text-gray-400 hover:text-red-500 transition-colors relative"
                                                >
                                                    {isRemoving ? (
                                                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FiX size={18} />
                                                    )}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-gray-200/70 pt-4 mt-4">
                                    <div className="flex justify-between mb-4 text-lg">
                                        <span className="font-medium text-gray-700">Subtotal:</span>
                                        <span className="font-bold text-gray-900">৳{subtotal.toFixed(2)}</span>
                                    </div>
                                    <Link
                                                to="/checkout"
                                        className="block w-full bg-[#ff0768] text-white py-3 px-6 rounded-full text-center font-medium hover:bg-[#e6065d] transition-colors shadow-md hover:shadow-lg"
                                        onClick={onClose}
                                    >
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;