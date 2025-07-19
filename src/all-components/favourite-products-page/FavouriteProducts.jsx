import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authContext } from '../auth-porvider-context/AuthContext';
import { Link } from 'react-router-dom';

const FavouriteProducts = () => {
    const { user } = useContext(authContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://bijoy-server.vercel.app/api/favorites/${user.uid}?page=${page}&limit=${limit}`
                );

                if (res.data?.favorites?.length > 0) {
                    setFavorites(prev => [...prev, ...res.data.favorites]);
                    const total = res.data.total;
                    const currentLoaded = page * limit;
                    setHasMore(currentLoaded < total);
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError(err.response?.data?.message || 'Failed to load favorite products');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user?.uid, page]);

    if (loading && page === 1) return <div className="text-center py-10 text-purple-600">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!user) return <div className="text-center py-10 text-gray-500">Please login to view favorites</div>;
    if (favorites.length === 0) return <div className="text-center py-10 text-gray-500">No favorite products found.</div>;

    return (
        <>
            <div className="px-4 pt-6 pb-2">
                <h1 className="text-2xl font-bold text-gray-800">আপনার সকল ফেভারিট প্রোডাক্ট</h1>
            </div>

            <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                {favorites.map((fav) => (
                    <div key={fav._id} className="bg-white shadow-md rounded-lg border border-gray-100 flex flex-col">
                        {/* Image Section */}
                        <div className="relative w-full overflow-hidden aspect-square">
                            <Link to={`/product/${fav.product._id}`}>
                                <img
                                    src={fav.product.media.mainImage}
                                    alt={fav.product.productName}
                                    className="h-full w-full object-contain transition-all duration-500 ease-in-out hover:scale-105"
                                />
                            </Link>
                            {(Array.isArray(fav.product.variants)
                                ? fav.product.variants[0]?.discountPercent
                                : fav.product.variants?.discountPercent) && (
                                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                                        {Array.isArray(fav.product.variants)
                                            ? `${fav.product.variants[0].discountPercent}% OFF`
                                            : `${fav.product.variants.discountPercent}% OFF`}
                                    </div>
                                )}
                        </div>

                        {/* Content Section */}
                        <div className="p-2 md:p-4 flex flex-col flex-grow">
                            <h2 className="text-gray-800 font-semibold text-[16px] md:text-lg mb-2 line-clamp-2">
                                {fav.product.productName}
                            </h2>

                            {/* Pricing Section */}
                            <div className="flex-grow-0">
                                {fav.product.variantType === "weight" && fav.product.variants?.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        {fav.product.variants[0].regularPrice && (
                                            <del className="text-gray-500 text-sm">
                                                ৳{fav.product.variants[0].regularPrice}
                                            </del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">
                                            ৳{fav.product.variants[0].price}
                                        </p>
                                    </div>
                                )}

                                {fav.product.variantType === "fashion" && fav.product.variants && (
                                    <div className="flex items-center gap-2">
                                        {fav.product.variants.regularPrice && (
                                            <del className="text-gray-500 text-sm">
                                                ৳{fav.product.variants.regularPrice}
                                            </del>
                                        )}
                                        <p className="text-red-600 font-bold text-lg">
                                            ৳{fav.product.variants.price}
                                        </p>
                                    </div>
                                )}

                                {fav.product.isDigital &&
                                    Array.isArray(fav.product.downloadFiles) &&
                                    fav.product.downloadFiles.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <p className="text-red-600 font-bold text-lg">৳{item.resellerPrice}</p>
                                        </div>
                                    ))}
                            </div>

                            {/* Button Section */}
                            <div className="mt-auto pt-4">
                                <div className="flex flex-col md:flex-row justify-between gap-2">
                                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 px-3 rounded text-sm font-medium">
                                        {fav.hasVariant ? "Select Option" : "Add to Cart"}
                                    </button>
                                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded text-sm font-medium">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More */}
            {loading && page > 1 && <div className="text-center text-purple-500 py-4">Loading more...</div>}

            {!loading && hasMore && (
                <div className="text-center my-4">
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Load More
                    </button>
                </div>
            )}

            {!hasMore && (
                <div className="text-center text-gray-400 py-4">No more favorite products.</div>
            )}
        </>
    );
};

export default FavouriteProducts;
