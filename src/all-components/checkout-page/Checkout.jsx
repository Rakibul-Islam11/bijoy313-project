import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiChevronRight, FiTag } from 'react-icons/fi';
import axios from 'axios';
import { authContext } from '../auth-porvider-context/AuthContext';

const Checkout = () => {
    const { user } = useContext(authContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [removingItemId, setRemovingItemId] = useState(null);
    const [updatingItemId, setUpdatingItemId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [newItem, setNewItem] = useState(
        location.state
            ? {
                product: location.state.product,
                selectedColor: location.state.selectedColor,
                selectedSize: location.state.selectedSize,
                selectedWeight: location.state.selectedWeight,
                quantity: location.state.quantity || 1
            }
            : null
    );
    const [addingToCart, setAddingToCart] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponError, setCouponError] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);

    useEffect(() => {
        if (!user?.uid) return;

        const fetchCart = async () => {
            try {
                const res = await axios.get(`https://bijoy-server-nu.vercel.app/api/carts/${user.uid}`);
                if (res.data.success) {
                    setCartItems(res.data.cartItems);
                }
            } catch (err) {
                console.error('Cart fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user?.uid]);

    const handleAddToCart = async () => {
        if (!newItem?.product || !user?.uid) return;

        setAddingToCart(true);
        try {
            const payload = {
                productId: newItem.product._id,
                quantity: newItem.quantity || 1,
                variant: newItem.selectedWeight || newItem.selectedColor || null
            };

            const res = await axios.post(`https://bijoy-server-nu.vercel.app/api/carts/${user.uid}`, payload);
            if (res.data.success) {
                const cartRes = await axios.get(`https://bijoy-server-nu.vercel.app/api/carts/${user.uid}`);
                if (cartRes.data.success) {
                    setCartItems(cartRes.data.cartItems);
                    setNewItem(null);
                    window.history.replaceState({}, document.title);
                }
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
        } finally {
            setAddingToCart(false);
        }
    };

    const handleRemoveNewItem = () => {
        setNewItem(null);
        window.history.replaceState({}, document.title);
    };

    const handleProceedToCheckout = () => {
        if (cartItems.length === 0 && !newItem) return;

        const orderSummary = {
            cartItems,
            newItem,
            subtotal: cartSubtotal,
            newItemPrice: newItem ? newItemPrice * (newItem.quantity || 1) : 0,
            deliveryCharge: newItem ? newItemDeliveryCharge : cartDeliveryCharge,
            advancePayment: cartAdvancePayment + (newItem ? newItemAdvancePayment : 0),
            discountAmount,
            grandTotal,
            couponCode: isCouponApplied ? couponCode : null
        };

        navigate('/checkout-info', { state: orderSummary });
    };

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

    // Calculate price for new item
    const newItemPrice = parseFloat(
        newItem?.selectedWeight?.price ||
        newItem?.product?.variants?.price ||
        newItem?.product?.downloadFiles?.[0]?.resellerPrice ||
        newItem?.product?.simpleProduct?.price ||
        0
    );

    // Calculate advance payment for new item
    const newItemAdvancePayment = parseFloat(newItem?.product?.advancePayment?.amount || 0);

    // Calculate price after deducting advance payment for new item
    const newItemPriceAfterAdvance = Math.max(0, newItemPrice - newItemAdvancePayment);

    // Calculate delivery charge for new item
    const newItemDeliveryCharge = parseFloat(newItem?.product?.deliveryCharge || 0);

    // Calculate total for new item (price after advance + delivery)
    const newItemTotal = newItem
        ? (newItemPriceAfterAdvance * (newItem.quantity || 1)) + newItemDeliveryCharge
        : 0;

    // Calculate subtotal for cart items only (price minus advance payment)
    const cartSubtotal = cartItems.reduce((total, item) => {
        const price = getProductPrice(item.product, item.variant);
        const advancePayment = parseFloat(item.product?.advancePayment?.amount ?? 0);
        return total + (item.quantity * Math.max(0, price - advancePayment));
    }, 0);

    // Calculate delivery charge for cart items
    const cartDeliveryCharge = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.product?.deliveryCharge ?? 0) * item.quantity);
    }, 0);

    // Calculate advance payment for cart items (for display purposes)
    const cartAdvancePayment = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.product?.advancePayment?.amount ?? 0) * item.quantity);
    }, 0);

    // Calculate grand total (price after advance + delivery - discount)
    const grandTotalBeforeDiscount = (cartSubtotal + (newItem ? newItemTotal : 0)) +
        (newItem ? 0 : cartDeliveryCharge);
    const grandTotal = Math.max(0, grandTotalBeforeDiscount - discountAmount);

    const handleRemoveItem = async (cartItemId) => {
        setRemovingItemId(cartItemId);
        try {
            const res = await axios.delete(`https://bijoy-server-nu.vercel.app/api/carts/${cartItemId}`);
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
        if (newQuantity < 1) return;

        setUpdatingItemId(cartItemId);
        try {
            const res = await axios.put(`https://bijoy-server-nu.vercel.app/api/carts/${cartItemId}`, {
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

    const applyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }

        setCouponLoading(true);
        setCouponError('');

        try {
            const response = await axios.post('https://bijoy-server-nu.vercel.app/api/validate-coupon', {
                couponCode,
                userId: user?.uid,
                totalAmount: grandTotalBeforeDiscount
            });

            if (response.data.success) {
                setIsCouponApplied(true);
                setDiscountAmount(response.data.discountAmount);
            } else {
                setCouponError(response.data.message || 'Invalid coupon code');
            }
        } catch (error) {
            console.error('Coupon validation error:', error);
            setCouponError('Failed to apply coupon. Please try again.');
        } finally {
            setCouponLoading(false);
        }
    };

    const removeCoupon = () => {
        setIsCouponApplied(false);
        setDiscountAmount(0);
        setCouponCode('');
    };

    const renderVariantInfo = (product, variant) => {
        if (!variant) return null;

        if (product.variantType === 'fashion') {
            return (
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                    {variant.color && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                            Color: {variant.color}
                        </span>
                    )}
                    {variant.size && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                            Size: {variant.size}
                        </span>
                    )}
                </div>
            );
        }

        if (product.variantType === 'weight') {
            return (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full mt-1 sm:mt-2 inline-block">
                    Weight: {variant.value} kg
                </span>
            );
        }

        return null;
    };

    return (
        <div className="md:max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-black mt-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[calc(100vh-8rem)] flex flex-col">
                {/* Header Section */}
                <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center">
                        <FiShoppingCart className="text-blue-600 mr-2 sm:mr-3 text-xl sm:text-2xl" />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Shopping Cart</h2>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Review and proceed with your order</p>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {newItem && (
                        <div className="p-4 sm:p-6 border-b border-gray-200 bg-blue-50 relative">
                            <button
                                onClick={handleRemoveNewItem}
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove item"
                            >
                                <FiX size={18} />
                            </button>
                            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-blue-800 flex items-center">
                                <FiChevronRight className="mr-1" /> New Item Added
                            </h3>
                            <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={newItem.product.media?.mainImage || newItem.product.media?.[0]}
                                        alt={newItem.product.productName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-800 truncate">{newItem.product.productName}</h4>
                                    <div className="flex items-center mt-1 flex-wrap gap-1 sm:gap-2">
                                        <span className="text-sm font-medium text-blue-600">
                                            ৳{newItemPrice.toFixed(2)}
                                        </span>
                                        {newItem.selectedColor?.name && (
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                {newItem.selectedColor.name}
                                            </span>
                                        )}
                                        {newItem.selectedSize?.size && (
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                                                {newItem.selectedSize.size}
                                            </span>
                                        )}
                                    </div>
                                    {newItemAdvancePayment > 0 && (
                                        <div className="mt-1 text-xs text-red-500">
                                            (Includes ৳{newItemAdvancePayment.toFixed(2)} advance payment)
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mt-2 sm:mt-3">
                                        <div className="flex items-center border border-gray-200 rounded-full bg-white">
                                            <button
                                                onClick={() => setNewItem(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                                                disabled={newItem.quantity <= 1}
                                                className="p-1 text-gray-600 hover:bg-gray-50 rounded-l-full transition-colors disabled:opacity-50"
                                            >
                                                <FiMinus size={14} className="sm:w-4 sm:h-4" />
                                            </button>
                                            <span className="px-2 sm:px-3 text-gray-800 py-1 text-sm font-medium">
                                                {newItem.quantity}
                                            </span>
                                            <button
                                                onClick={() => setNewItem(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                                                className="p-1 text-gray-600 hover:bg-gray-50 rounded-r-full transition-colors"
                                            >
                                                <FiPlus size={14} className="sm:w-4 sm:h-4" />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-800 text-sm sm:text-base">
                                                ৳{(newItemPriceAfterAdvance * (newItem.quantity || 1)).toFixed(2)}
                                            </div>
                                            {newItemDeliveryCharge > 0 && (
                                                <div className="text-xs text-gray-500">
                                                    + ৳{newItemDeliveryCharge.toFixed(2)} delivery
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row flex-1 min-h-0">
                        {/* Cart Items Section */}
                        <div className="md:w-2/3 p-4 sm:p-6 overflow-y-auto">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Your Items ({itemCount})</h3>
                                {cartItems.length > 0 && (
                                    <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">Edit</span>
                                )}
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center py-8 sm:py-12">
                                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="text-center py-8 sm:py-12">
                                    <FiShoppingCart className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
                                    <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">Your cart is empty</h3>
                                    <p className="mt-1 sm:mt-2 text-sm text-gray-500">Looks like you haven't added anything to your cart yet</p>
                                    <button className="mt-3 sm:mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3 sm:space-y-4">
                                    {cartItems.map((item) => {
                                        const price = getProductPrice(item.product, item.variant);
                                        const advancePayment = parseFloat(item.product?.advancePayment?.amount ?? 0);
                                        const priceAfterAdvance = Math.max(0, price - advancePayment);
                                        const totalPrice = priceAfterAdvance * item.quantity;
                                        const isRemoving = removingItemId === item._id;
                                        const isUpdating = updatingItemId === item._id;
                                        const deliveryCharge = parseFloat(item.product?.deliveryCharge ?? 0) * item.quantity;

                                        return (
                                            <div key={item._id} className="flex p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                                {item.product?._id ? (
                                                    <Link
                                                        to={`/product/${item.product._id}`}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                                                    >
                                                        <img
                                                            src={item.product.media?.mainImage || item.product.media?.[0] || '/placeholder.png'}
                                                            alt={item.product.productName ?? 'Product image'}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </Link>
                                                ) : (
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
                                                        No ID
                                                    </div>
                                                )}

                                                <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-medium text-gray-800 truncate">{item.product.productName}</h4>
                                                        <button
                                                            onClick={() => !isRemoving && handleRemoveItem(item._id)}
                                                            disabled={isRemoving}
                                                            className="text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                                                        >
                                                            {isRemoving ? (
                                                                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                            ) : (
                                                                <FiX size={18} />
                                                            )}
                                                        </button>
                                                    </div>

                                                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                                                        {renderVariantInfo(item.product, item.variant)}
                                                    </div>

                                                    <div className="mt-2 sm:mt-3 flex items-center justify-between">
                                                        <div className="flex items-center border border-gray-200 rounded-full bg-white">
                                                            <button
                                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                                disabled={isUpdating || item.quantity <= 1}
                                                                className="p-1 text-gray-600 hover:bg-gray-50 rounded-l-full transition-colors disabled:opacity-50"
                                                            >
                                                                <FiMinus size={14} className="sm:w-4 sm:h-4" />
                                                            </button>
                                                            <span className="px-2 sm:px-3 text-gray-800 py-1 text-xs sm:text-sm font-medium">
                                                                {isUpdating ? (
                                                                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                                ) : (
                                                                    item.quantity
                                                                )}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                                disabled={isUpdating}
                                                                className="p-1 text-gray-600 hover:bg-gray-50 rounded-r-full transition-colors disabled:opacity-50"
                                                            >
                                                                <FiPlus size={14} className="sm:w-4 sm:h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold text-gray-800 text-sm sm:text-base">
                                                                ৳{totalPrice.toFixed(2)}
                                                            </div>
                                                            {deliveryCharge > 0 && (
                                                                <div className="text-xs text-gray-500">
                                                                    + ৳{deliveryCharge.toFixed(2)} delivery
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {advancePayment > 0 && (
                                                        <div className="mt-1 text-xs text-red-500">
                                                            (Includes ৳{advancePayment.toFixed(2)} advance payment)
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Order Summary Section */}
                        <div className="md:w-1/3 p-4 sm:p-6 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
                            <div className="md:sticky md:top-6">
                                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Order Summary</h3>
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex justify-between text-sm sm:text-base">
                                            <span className="text-gray-600">Cart Subtotal</span>
                                            <span className="font-medium">৳{cartSubtotal.toFixed(2)}</span>
                                        </div>

                                        {newItem && (
                                            <>
                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span className="text-gray-600">New Item Price</span>
                                                    <span className="font-medium">৳{newItemPrice.toFixed(2)}</span>
                                                </div>
                                                {newItemAdvancePayment > 0 && (
                                                    <div className="flex justify-between text-red-500 text-sm sm:text-base">
                                                        <span>Advance Payment (deducted)</span>
                                                        <span>-৳{newItemAdvancePayment.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span className="text-gray-600">New Item Total</span>
                                                    <span className="font-medium">
                                                        ৳{(newItemPriceAfterAdvance * (newItem.quantity || 1)).toFixed(2)}
                                                    </span>
                                                </div>
                                            </>
                                        )}

                                        {/* Delivery Charge Display */}
                                        {newItem ? (
                                            <div className="flex justify-between text-sm sm:text-base">
                                                <span className="text-gray-600">Delivery</span>
                                                <span className="font-medium">+৳{newItemDeliveryCharge.toFixed(2)}</span>
                                            </div>
                                        ) : cartItems.length > 0 ? (
                                            <div className="flex justify-between text-sm sm:text-base">
                                                <span className="text-gray-600">Delivery</span>
                                                <span className="font-medium">+৳{cartDeliveryCharge.toFixed(2)}</span>
                                            </div>
                                        ) : null}

                                        {cartAdvancePayment > 0 && (
                                            <div className="flex justify-between text-red-500 text-sm sm:text-base">
                                                <span>Advance Payment (deducted)</span>
                                                <span>-৳{cartAdvancePayment.toFixed(2)}</span>
                                            </div>
                                        )}

                                        {/* Coupon Code Section */}
                                        <div className="border-t border-gray-200 pt-2 sm:pt-3 mt-1 sm:mt-2">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-600">Coupon Code</span>
                                                {!showCouponInput && !isCouponApplied ? (
                                                    <button
                                                        onClick={() => setShowCouponInput(true)}
                                                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        <FiTag className="mr-1" /> Apply Coupon
                                                    </button>
                                                ) : null}
                                            </div>

                                            {(showCouponInput || isCouponApplied) && (
                                                <div className="mt-2">
                                                    {isCouponApplied ? (
                                                        <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                                                            <span className="text-green-700 text-sm">
                                                                Coupon applied: {couponCode}
                                                            </span>
                                                            <button
                                                                onClick={removeCoupon}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <FiX size={16} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex">
                                                            <input
                                                                type="text"
                                                                value={couponCode}
                                                                onChange={(e) => setCouponCode(e.target.value)}
                                                                placeholder="Enter coupon code"
                                                                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            />
                                                            <button
                                                                onClick={applyCoupon}
                                                                disabled={couponLoading}
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md text-sm disabled:opacity-50"
                                                            >
                                                                {couponLoading ? 'Applying...' : 'Apply'}
                                                            </button>
                                                        </div>
                                                    )}
                                                    {couponError && (
                                                        <p className="text-red-500 text-xs mt-1">{couponError}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Discount Line */}
                                        {isCouponApplied && (
                                            <div className="flex justify-between text-green-600 text-sm sm:text-base">
                                                <span>Discount</span>
                                                <span>-৳{discountAmount.toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className="border-t border-gray-200 pt-2 sm:pt-3 mt-1 sm:mt-2">
                                            <div className="flex justify-between">
                                                <span className="text-base sm:text-lg font-semibold">Total</span>
                                                <span className="text-base sm:text-lg font-bold text-blue-600">
                                                    ৳{grandTotal.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={`w-full mt-4 sm:mt-6 py-2 sm:py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm sm:text-base ${cartItems.length === 0 && !newItem
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
                                            }`}
                                        disabled={cartItems.length === 0 && !newItem}
                                        onClick={handleProceedToCheckout}
                                    >
                                        Proceed to Checkout
                                        <FiChevronRight className="ml-2" />
                                    </button>

                                    <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
                                        <p>Free returns. Standard shipping available.</p>
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                                    <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Need help?</h4>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Contact our customer support for any questions about your order.
                                    </p>
                                    <button className="mt-1 sm:mt-2 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;