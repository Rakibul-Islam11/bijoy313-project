import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const LIMIT = 10;

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const location = useLocation();
    const cameFromBottomNavbar = location.state?.from === 'bottom-navbar-products';
    console.log(products);
    
    const lastProductRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setSkip(prev => prev + LIMIT);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const fetchProducts = async (currentSkip) => {
        setLoading(true);
        try {
            const res = await axios.get(`https://bijoy-server.vercel.app/api/products?limit=${LIMIT}&skip=${currentSkip}`);
            const newProducts = res.data.products;

            // Remove duplicate products by _id
            setProducts(prev => {
                const existingIds = new Set(prev.map(p => p._id));
                const uniqueNew = newProducts.filter(p => !existingIds.has(p._id));
                return [...prev, ...uniqueNew];
            });

            if (newProducts.length < LIMIT) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(skip);
    }, [skip]);

    return (
        <div>
            {cameFromBottomNavbar && (
                <div className="w-full px-1 md:px-4 py-2 pt-4 md:pt-10">
                    <button className="w-full bg-[#ff0768] text-md md:text-xl text-white font-medium py-1.5 md:py-3 md:px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        আপনার প্রয়োজনীয় সকল পণ্য
                    </button>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 px-1 py-2 md:px-0 md:py-8">
                {products.map((product, index) => {
                    const isLast = index === products.length - 1;

                    return (
                        <div
                            key={product._id}
                            ref={isLast ? lastProductRef : null}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col"
                        >
                            <Link to={`/product/${product._id}`}>
                                <div className="relative w-full overflow-hidden">
                                    <div className="h-full w-full">
                                        <img
                                            src={product.media?.mainImage}
                                            alt={product.name}
                                            className="h-full w-full object-contain transition-all duration-500 ease-in-out hover:scale-175"
                                        />
                                    </div>
                                </div>
                            </Link>

                            <div className="p-4 mt-auto flex flex-col justify-between flex-1">
                                <h2 className="text-gray-800 mt-auto font-semibold text-[16px] md:text-lg mb-0 line-clamp-2 md:pb-3">
                                    {product.productName}
                                </h2>

                                {/* Pricing Logic */}
                                {product.variantType === "weight" && product.variants?.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        {product.variants[0].regularPrice && (
                                            <del className="text-gray-500 text-sm">৳{product.variants[0].regularPrice}</del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">৳{product.variants[0].price}</p>
                                    </div>
                                )}

                                {product.variantType === "fashion" && product.variants && (
                                    <div className="flex items-center gap-2">
                                        {product.variants.regularPrice && (
                                            <del className="text-gray-500 text-sm">৳{product.variants.regularPrice}</del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">৳{product.variants.price}</p>
                                    </div>
                                )}
                                {product.isSubscription && product.simpleProduct && (
                                    <div className="flex items-center gap-2">
                                        {product.simpleProduct && (
                                            <del className="text-gray-500 text-sm">৳{product.simpleProduct.regularPrice}</del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">৳{product.simpleProduct.price}</p>
                                    </div>
                                )}
                                {product.mainCategory=="beauty" && (
                                    <div className="flex items-center gap-2">
                                        {product.simpleProduct && (
                                            <del className="text-gray-500 text-sm">৳{product.simpleProduct.regularPrice}</del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">৳{product.simpleProduct.price}</p>
                                    </div>
                                )}
                                {product.mainCategory =="electronics" && (
                                    <div className="flex items-center gap-2">
                                        {product.simpleProduct && (
                                            <del className="text-gray-500 text-sm">৳{product.simpleProduct.regularPrice}</del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">৳{product.simpleProduct.price}</p>
                                    </div>
                                )}
                                {product.mainCategory == "fashion" && product.simpleProduct && (
                                    <div className="flex items-center gap-2">
                                        {product.simpleProduct && (
                                            <del className="text-gray-500 text-sm">৳{product.simpleProduct.regularPrice}</del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">৳{product.simpleProduct.price}</p>
                                    </div>
                                )}

                                {product.isDigital &&
                                    Array.isArray(product.downloadFiles) &&
                                    product.downloadFiles.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <p className="text-red-600 font-bold text-lg">৳{item.resellerPrice}</p>
                                        </div>
                                    ))}

                                <div className="mt-auto flex flex-col md:flex-row justify-between gap-2 pt-4">
                                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 px-3 rounded text-sm font-medium">
                                        {product.hasVariant ? "Select Option" : "Add to Cart"}
                                    </button>
                                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded text-sm font-medium">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {loading && (
                    <div className="col-span-full text-center py-6">
                        <p className="text-gray-500">Loading more products...</p>
                    </div>
                )}
                {!hasMore && (
                    <div className="col-span-full text-center py-6">
                        <p className="text-gray-400">No more products to show.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
