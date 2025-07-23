import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FaShoppingCart, FaHeart, FaShareAlt, FaStar, FaRegStar, FaDownload } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton,
    EmailShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    TelegramIcon,
    EmailIcon,
} from 'react-share';
import ProductDetailsAditional from "./ProductDetailsAditional";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ProductReview from "./ProductReview";
import { authContext } from "../auth-porvider-context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isDownloading, setIsDownloading] = useState(false);
    const { user } = useContext(authContext);
    const [favoriteId, setFavoriteId] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
    const [cartItemId, setCartItemId] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const navigate = useNavigate();
    const shareUrl = window.location.href;
    const title = product?.productName || 'Check out this product';
    const [activeTab, setActiveTab] = useState("productDetails");

    
    useEffect(() => {
        const fetchReviews = async () => {
            if (!productId) return;

            try {
                const response = await axios.get(
                    `https://bijoy-server.vercel.app/api/reviews`,
                    { params: { productId } }
                );

                if (response.data?.reviews) {
                    setReviews(response.data.reviews);
                    setTotalReviews(response.data.pagination.totalReviews);

                    if (response.data.reviews.length > 0) {
                        const sum = response.data.reviews.reduce(
                            (total, review) => total + review.rating, 0
                        );
                        const avg = sum / response.data.reviews.length;
                        setAverageRating(avg);
                    }
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [productId]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(`https://bijoy-server.vercel.app/api/products/${productId}`);

                if (res.data?.product) {
                    setProduct(res.data.product);

                    if (res.data.product.variantType === "fashion" && res.data.product.variants?.colors?.length > 0) {
                        setSelectedColor(res.data.product.variants.colors[0]);
                        if (res.data.product.variants.colors[0].sizes?.length > 0) {
                            setSelectedSize(res.data.product.variants.colors[0].sizes[0]);
                        }
                    }
                    if (res.data.product.variantType === "weight" && res.data.product.variants?.length > 0) {
                        setSelectedWeight(res.data.product.variants[0]);
                    }

                    const reviewsRes = await axios.get(
                        `https://bijoy-server.vercel.app/api/reviews`,
                        { params: { productId } }
                    );

                    if (reviewsRes.data) {
                        setTotalReviews(reviewsRes.data.pagination.totalReviews);

                        if (reviewsRes.data.reviews.length > 0) {
                            const sum = reviewsRes.data.reviews.reduce(
                                (total, review) => total + review.rating, 0
                            );
                            const avg = sum / reviewsRes.data.reviews.length;
                            setAverageRating(avg);
                        } else {
                            setAverageRating(0);
                        }
                    }
                } else {
                    setError("Product data not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(err.response?.data?.message || err.message || "Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const checkCartStatus = async () => {
            if (!product || !user?.uid) return;

            try {
                let variantType = null;
                let variantValue = null;

                if (product.variantType === "fashion" && selectedColor && selectedSize) {
                    variantType = 'color-size';
                    variantValue = `${selectedColor.name}-${selectedSize.size}`;
                } else if (product.variantType === "weight" && selectedWeight) {
                    variantType = 'weight';
                    variantValue = selectedWeight.value;
                }

                const response = await axios.get(
                    `https://bijoy-server.vercel.app/api/carts/check/${user.uid}/${product._id}`,
                    {
                        params: { variantType, variantValue },
                        headers: {
                            'Authorization': `Bearer ${await user.getIdToken()}`
                        }
                    }
                );

                if (response.data.success) {
                    setIsInCart(response.data.isInCart);
                    setCartItemId(response.data.cartItemId);
                }
            } catch (error) {
                console.error("Error checking cart status:", error);
            }
        };

        checkCartStatus();
    }, [product, user, selectedColor, selectedSize, selectedWeight]);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!product || !user?.uid) return;

            try {
                const response = await axios.get(
                    `https://bijoy-server.vercel.app/api/favorites/check/${user.uid}/${product._id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${await user.getIdToken()}`
                        }
                    }
                );

                if (response.data.success) {
                    setIsFavorite(response.data.isFavorite);
                    setFavoriteId(response.data.favoriteId);
                }
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        checkFavoriteStatus();
    }, [product, user]);

    const getAllProductImages = () => {
        if (!product) return [];

        try {
            if (product.isDigital) return product.media?.images || [];
            if (product.variantType === "weight") return product.media?.images || [];
            if (product.variantType === "fashion") {
                const colorImages = product.variants?.colors?.map(color => color.image).filter(Boolean) || [];
                return colorImages.length > 0 ? colorImages : product.media?.images || [];
            }
            return product.media?.images || [];
        } catch (err) {
            console.error("Error getting images:", err);
            return [];
        }
    };

    const productImages = getAllProductImages();
    const hasMultipleImages = productImages.length > 1;
    // const discount = calculateDiscount();

    const handleAddToCart = async () => {
        if (!product || !user) {
            toast.error("কার্টে যোগ করতে লগইন করুন");
            return;
        }

        setIsAddingToCart(true);

        try {
            if (isInCart) {
                const response = await axios.delete(
                    `https://bijoy-server.vercel.app/api/carts/${cartItemId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${await user.getIdToken()}`
                        }
                    }
                );

                if (response.data.success) {
                    setIsInCart(false);
                    setCartItemId(null);
                    toast.success("পণ্য কার্ট থেকে সরানো হয়েছে");
                }
            } else {
                let variant = null;
                let price = 0;

                if (product.variantType === "fashion" && selectedColor && selectedSize) {
                    variant = {
                        type: 'color-size',
                        value: `${selectedColor.name}-${selectedSize.size}`,
                        color: selectedColor.name,
                        size: selectedSize.size
                    };
                    price = product.variants.price;
                } else if (product.variantType === "weight" && selectedWeight) {
                    variant = {
                        type: 'weight',
                        value: selectedWeight.value
                    };
                    price = selectedWeight.price;
                } else if (product.isDigital) {
                    price = product.downloadFiles[0]?.resellerPrice || 0;
                }

                const response = await axios.post(
                    'https://bijoy-server.vercel.app/api/carts',
                    {
                        userId: user.uid,
                        productId: product._id,
                        quantity,
                        variant,
                        price
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${await user.getIdToken()}`
                        }
                    }
                );

                if (response.data.success) {
                    setIsInCart(true);
                    setCartItemId(response.data.cartItem._id);
                    toast.success("পণ্য কার্টে যোগ করা হয়েছে");
                }
            }
        } catch (error) {
            console.error("Error toggling cart:", error);
            toast.error(`কার্টে যোগ করতে ব্যর্থ: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsAddingToCart(false);
        }
    };

    const toggleFavorite = async () => {
        if (!product || !user) {
            toast.error("ফেভারিটে যোগ করতে লগইন করুন");
            return;
        }

        setIsTogglingFavorite(true);

        try {
            if (isFavorite) {
                const response = await axios.delete(
                    `https://bijoy-server.vercel.app/api/favorites/${favoriteId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${await user.getIdToken()}`
                        }
                    }
                );

                if (response.data.success) {
                    setIsFavorite(false);
                    setFavoriteId(null);
                    toast.success("পণ্য ফেভারিট থেকে সরানো হয়েছে");
                }
            } else {
                const response = await axios.post(
                    'https://bijoy-server.vercel.app/api/favorites',
                    {
                        userId: user.uid,
                        productId: product._id
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${await user.getIdToken()}`
                        }
                    }
                );

                if (response.data.success) {
                    setIsFavorite(true);
                    setFavoriteId(response.data.favorite._id);
                    toast.success("পণ্য ফেভারিটে যোগ করা হয়েছে");
                }
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error(`ফেভারিটে যোগ করতে ব্যর্থ: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsTogglingFavorite(false);
        }
    };

    const handleOrderNow = () => {
        // ফ্যাশন প্রোডাক্টের জন্য চেক (কালার এবং সাইজ সিলেক্ট করা আছে কিনা)
        if (product.variantType === "fashion" && (!selectedColor || !selectedSize)) {
            toast.error("অর্ডার করতে কালার এবং সাইজ সিলেক্ট করুন");
            return;
        }

        // ওয়েট প্রোডাক্টের জন্য চেক (ওজন সিলেক্ট করা আছে কিনা)
        if (product.variantType === "weight" && !selectedWeight) {
            toast.error("অর্ডার করতে ওজন সিলেক্ট করুন");
            return;
        }

        // ডিজিটাল প্রোডাক্টের জন্য কোনো সিলেকশন চেক করার দরকার নেই

        const checkoutData = {
            product,
            selectedColor: selectedColor ? {
                ...selectedColor,
                selectedSize: selectedSize?.size
            } : null,
            selectedSize,
            selectedWeight,
            quantity
        };

        navigate('/checkout', { state: checkoutData });
    };

    const downloadImage = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return { blob, filename };
        } catch (error) {
            console.error(`Error downloading image ${url}:`, error);
            return null;
        }
    };

    const handleDownloadAllImages = async () => {
        if (!product || !productImages.length || isDownloading) return;

        setIsDownloading(true);

        try {
            if (productImages.length === 1) {
                const imageUrl = productImages[0];
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                saveAs(blob, `${product.productName}.jpg`);
                toast.success("ইমেজ ডাউনলোড সম্পন্ন হয়েছে");
            } else {
                const zip = new JSZip();
                const imgFolder = zip.folder(`${product.productName}_images`);

                const downloadPromises = productImages.map((imgUrl, index) =>
                    downloadImage(imgUrl, `${product.productName}_${index + 1}.jpg`)
                );

                const downloadedImages = await Promise.all(downloadPromises);

                downloadedImages.forEach((image, index) => {
                    if (image) {
                        imgFolder.file(image.filename, image.blob);
                    }
                });

                const content = await zip.generateAsync({ type: 'blob' });
                saveAs(content, `${product.productName}_images.zip`);
                toast.success("সমস্ত ইমেজ ডাউনলোড সম্পন্ন হয়েছে");
            }
        } catch (error) {
            console.error("Error downloading images:", error);
            toast.error("ডাউনলোড করতে ব্যর্থ");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = () => {
        setShowShareOptions(!showShareOptions);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("লিংক কপি করা হয়েছে");
        setShowShareOptions(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">পণ্য খুঁজে পাওয়া যায়নি</h2>
                    <p className="text-gray-600">
                        {error || "দুঃখিত, আমরা আপনার কাঙ্খিত পণ্যটি খুঁজে পাইনি। অনুগ্রহ করে আবার চেষ্টা করুন।"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen mt-14">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8">
                    {/* Product Images */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {productImages.length > 0 ? (
                            <>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#fff',
                                        '--swiper-pagination-color': '#fff',
                                    }}
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                                    className="relative group"
                                    onSlideChange={(swiper) => setActiveImage(swiper.realIndex)}
                                >
                                    {productImages.map((img, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="aspect-w-1 aspect-h-1 w-full">
                                                <img
                                                    src={img}
                                                    alt={`${product.productName} ${idx + 1}`}
                                                    className="w-full h-full object-contain p-4"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder-product.jpg';
                                                    }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    
                                        <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                                            % OFF
                                        </div>
                                    
                                </Swiper>

                                {hasMultipleImages && (
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="p-4"
                                    >
                                        {productImages.map((img, idx) => (
                                            <SwiperSlide key={idx} className="cursor-pointer">
                                                <div className={`border-2 ${activeImage === idx ? 'border-red-500' : 'border-transparent'} rounded-lg overflow-hidden transition-all`}>
                                                    <img
                                                        src={img}
                                                        alt={`Thumbnail ${idx + 1}`}
                                                        className="w-full h-20 object-contain bg-gray-100 rounded"
                                                        onError={(e) => {
                                                            e.target.src = '/placeholder-product.jpg';
                                                        }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </>
                        ) : (
                            <div className="p-8">
                                <img
                                    src="/placeholder-product.jpg"
                                    alt={product.productName}
                                    className="w-full h-auto max-h-96 object-contain"
                                />
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="bg-white rounded-xl shadow-lg px-3 py-3 md:p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.productName}</h1>

                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    star <= Math.round(averageRating || product.rating || 0) ?
                                        <FaStar key={star} /> :
                                        <FaRegStar key={star} />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">
                                ({totalReviews || product.reviewCount || 0} reviews)
                            </span>
                        </div>

                        <div className="mb-6">
                            {product.variantType === "fashion" && product.variants && (
                                <div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-bold text-red-600">
                                            {product.variants.price}৳
                                        </span>
                                        {product.variants.regularPrice > product.variants.price && (
                                            <span className="text-lg text-gray-500 line-through">
                                                {product.variants.regularPrice}৳
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {product.variantType === "weight" && selectedWeight && (
                                <div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-bold text-red-600">
                                            {selectedWeight.price}৳
                                        </span>
                                        {selectedWeight.regularPrice > selectedWeight.price && (
                                            <span className="text-md text-gray-500 line-through">
                                                {selectedWeight.regularPrice}৳
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {product.isDigital && product.downloadFiles?.[0] && (
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-red-600">
                                        {product.downloadFiles[0].resellerPrice}৳
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6 mb-6">
                            {product.variantType === "fashion" && product.variants?.colors && (
                                <>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Color</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {product.variants.colors.map((item, indx) => (
                                                <button
                                                    key={indx}
                                                    className={`px-2 py-1 text-sm md:text-md md:px-4 md:py-2 border rounded-lg text-black transition-colors ${selectedColor?.name === item.name ? "bg-red-500 text-white border-red-500" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}`}
                                                    onClick={() => {
                                                        setSelectedColor(item);
                                                        if (item.sizes?.length > 0) {
                                                            setSelectedSize(item.sizes[0]);
                                                        }
                                                    }}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedColor && selectedColor.sizes && selectedColor.sizes.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Size</h3>
                                            <div className="flex gap-2 flex-wrap">
                                                {selectedColor.sizes.map((size, index) => (
                                                    <button
                                                        key={index}
                                                        className={`px-3 py-2 border rounded-lg text-black transition-colors ${selectedSize?.size === size.size ? "bg-red-500 text-white border-red-500" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}`}
                                                        onClick={() => setSelectedSize(size)}
                                                    >
                                                        {size.size}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-700 mt-2">
                                                <p><strong>{selectedColor.name} - {selectedSize?.size}</strong> এর স্টক: <span className="text-red-500 font-semibold">{selectedSize?.stock}</span> টি</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {product.variantType === "weight" && product.variants && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">ওজন</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {product.variants.map((item, index) => (
                                            <button
                                                key={index}
                                                className={`p-1 border rounded-lg text-black text-center transition-colors ${selectedWeight?.value === item.value ? "bg-red-500 text-white border-red-500" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}`}
                                                onClick={() => setSelectedWeight(item)}
                                            >
                                                <div className="font-extrabold">{item.value}kg</div>
                                                <div className="text-sm">{item.price}৳</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!product.isDigital && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">পরিমাণ</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                            <button
                                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors text-black"
                                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 bg-white text-black">{quantity}</span>
                                            <button
                                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors text-black"
                                                onClick={() => setQuantity(prev => prev + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {product.variantType === "fashion" && selectedColor && selectedSize ?
                                                `${selectedSize.stock} টি স্টক আছে` :
                                                product.variantType === "weight" && selectedWeight ?
                                                    `${selectedWeight.stock} টি স্টক আছে` : ''}
                                        </span>
                                    </div>
                                    {product.advancePayment && product.advancePayment.required && <div className="flex flex-row gap-2 text-red-400"> অর্ডারের পূর্বে আপনাকে <p>৳{product.advancePayment.amount} </p> advance pay করতে হবে</div>}
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${isInCart
                                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                    } ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isAddingToCart ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        প্রসেসিং...
                                    </>
                                ) : (
                                    <>
                                        <FaShoppingCart />
                                        {isInCart ? 'কার্ট থেকে সরান' : 'কার্টে যুক্ত করুন'}
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleOrderNow}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                            >
                                অর্ডার করুন
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                                onClick={toggleFavorite}
                                disabled={isTogglingFavorite}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${isFavorite
                                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                                    } ${isTogglingFavorite ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isTogglingFavorite ? (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <FaHeart className="text-sm sm:text-base" />
                                        <span className="text-xs sm:text-sm">
                                            {isFavorite ? 'ফেভারিট থেকে সরান' : 'ফেভারিটে যোগ করুন'}
                                        </span>
                                    </>
                                )}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={handleShare}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <FaShareAlt className="text-sm sm:text-base" />
                                    <span className="text-xs sm:text-sm">শেয়ার করুন</span>
                                </button>

                                {showShareOptions && (
                                    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-3 z-50 flex gap-2">
                                        <FacebookShareButton url={shareUrl} quote={title}>
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>

                                        <WhatsappShareButton url={shareUrl} title={title}>
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>

                                        <TwitterShareButton url={shareUrl} title={title}>
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>

                                        <TelegramShareButton url={shareUrl} title={title}>
                                            <TelegramIcon size={32} round />
                                        </TelegramShareButton>

                                        <EmailShareButton url={shareUrl} subject={title}>
                                            <EmailIcon size={32} round />
                                        </EmailShareButton>

                                        <button
                                            onClick={copyToClipboard}
                                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                            title="Copy link"
                                        >
                                            <FiCopy className="text-gray-700" size={24} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {productImages.length > 0 && (
                                <button
                                    onClick={handleDownloadAllImages}
                                    disabled={isDownloading}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
                                        }`}
                                >
                                    {isDownloading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-xs sm:text-sm">ডাউনলোড হচ্ছে...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaDownload className="text-sm sm:text-base" />
                                            <span className="text-xs sm:text-sm">ডাউনলোড</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm flex flex-row justify-start items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-600">Category: <p className="font-bold">{product.mainCategory}</p></span>
                                {product.subCategory && (
                                    <span className="text-sm flex flex-row justify-start items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-600">Sub-category: <p className="font-bold">{product.subCategory}</p></span>
                                )}
                                {product.variantType && (
                                    <span className="text-sm flex flex-row justify-start items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-600">Type: <p className="font-bold">{product.variantType}</p></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-300 mt-10">
                    <nav className="flex space-x-4 text-sm sm:text-base font-medium text-gray-700">
                        <button
                            onClick={() => setActiveTab("productDetails")}
                            className={`relative py-2 px-4 ${activeTab === "productDetails" ? "border-b-2 border-blue-500 text-blue-600" : "hover:text-blue-500"}`}
                        >
                            Product details
                        </button>

                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`relative py-2 px-4 ${activeTab === "reviews" ? "border-b-2 border-blue-500 text-blue-600" : "hover:text-blue-500"}`}
                        >
                            Reviews
                            {/* Badge */}
                            {totalReviews > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full transition-all duration-300">
                                    {totalReviews}
                                </span>

                            )}
                        </button>
                    </nav>
                </div>


                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === "productDetails" && (
                        <ProductDetailsAditional productId={productId} />
                    )}
                    {activeTab === "reviews" && (
                        <ProductReview productId={productId} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;