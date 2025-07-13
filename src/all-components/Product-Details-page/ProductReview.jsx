import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import { FaEdit, FaTrash, FaTimes, FaUser, FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { authContext } from '../auth-porvider-context/AuthContext';

const ProductReview = ({ productId }) => {
    const { user, loading, loading: authLoading } = useContext(authContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalReviews: 0,
        hasNextPage: false,
        hasPrevPage: false
    });
    const [isLoadingReviews, setIsLoadingReviews] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) {
                    setUserProfile(data.user);
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };
    useEffect(() => {
        if (!loading) {
            fetchUserData();

            // Set Interval for polling
            const interval = setInterval(() => {
                fetchUserData();
            }, 5000); // every 5 seconds

            return () => clearInterval(interval);
        }
    }, [user, loading]);
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        if (!productId) return;
        fetchReviews(1);
    }, [productId]);

    const fetchReviews = async (page) => {
        setIsLoadingReviews(true);
        try {
            const res = await axios.get(
                `https://bijoy-server.vercel.app/api/reviews?productId=${productId}&page=${page}&limit=10`
            );
            setReviews(res.data.reviews);
            setPagination(res.data.pagination);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        } finally {
            setIsLoadingReviews(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        fetchReviews(newPage);
    };

    const handleSingleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);

        const newPreviews = [...previews];
        newPreviews[index] = URL.createObjectURL(file);
        setPreviews(newPreviews);

        if (newImages.length < 3 && index === newImages.length - 1) {
            setImages([...newImages, null]);
            setPreviews([...newPreviews, null]);
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        const newPreviews = [...previews];
        if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]);

        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const uploadImagesToImgBB = async () => {
        const imageUrls = [];
        for (let img of images) {
            if (!img) continue;
            const formData = new FormData();
            formData.append('image', img);
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=cda842bc5216b0739bf4197286199e2c`,
                formData
            );
            imageUrls.push(res.data.data.url);
        }
        return imageUrls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return alert('Please log in to leave a review');
        if (rating === 0) return alert('Please select a rating');

        setIsSubmitting(true);

        let uploadedImageUrls = [];
        if (images.length > 0) {
            try {
                uploadedImageUrls = await uploadImagesToImgBB();
            } catch (error) {
                console.error('Image upload error:', error);
                alert('Image upload failed!');
                setIsSubmitting(false);
                return;
            }
        }

        const payload = {
            productId,
            userId: user.uid,
            userName: user.displayName || 'Anonymous',
            userEmail: user.email,
            userPhoto: userProfile.photoURL || '',
            rating,
            comment,
            images: uploadedImageUrls,
            createdAt: new Date()
        };

        try {
            if (editingReviewId) {
                const { data } = await axios.put(
                    `https://bijoy-server.vercel.app/api/reviews/${editingReviewId}`,
                    payload
                );
                setReviews(reviews.map(r => r._id === editingReviewId ? data : r));
            } else {
                const { data } = await axios.post(
                    'https://bijoy-server.vercel.app/api/reviews',
                    payload
                );
                setReviews([data, ...reviews]);
                // Update pagination totals
                setPagination(prev => ({
                    ...prev,
                    totalReviews: prev.totalReviews + 1,
                    totalPages: Math.ceil((prev.totalReviews + 1) / 10)
                }));
            }
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Review submission failed!');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setRating(0);
        setComment('');
        setEditingReviewId(null);
        previews.forEach(p => p && URL.revokeObjectURL(p));
        setImages([]);
        setPreviews([]);
    };

    const handleEdit = (review) => {
        setEditingReviewId(review._id);
        setRating(review.rating);
        setComment(review.comment);
        setPreviews(review.images || []);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            await axios.delete(`https://bijoy-server.vercel.app/api/reviews/${id}`);
            setReviews(reviews.filter(r => r._id !== id));
            // Update pagination totals
            setPagination(prev => ({
                ...prev,
                totalReviews: prev.totalReviews - 1,
                totalPages: Math.ceil((prev.totalReviews - 1) / 10)
            }));
            // If we deleted the last item on the page, go to previous page
            if (reviews.length === 1 && pagination.currentPage > 1) {
                handlePageChange(pagination.currentPage - 1);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        }
    };

    if (authLoading) return <div className="text-center py-8">Loading authentication...</div>;

    return (
        <div>
            <div className='text-black'><hr /></div>
            <div className="max-w-4xl mx-auto py-8 px-4">

                <h2 className="text-2xl font-bold text-gray-800 mb-1">Customer Reviews</h2>
                <div className='text-gray-300 mb-6'><hr /></div>

                {user ? (
                    <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg shadow-md p-6">
                        <div className="md:mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
                            <Rating
                                initialRating={rating}
                                onChange={setRating}
                                emptySymbol={<FaRegStar className="text-gray-300 text-2xl" />}
                                fullSymbol={<FaStar className="text-yellow-400 text-2xl" />}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Your Review</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                                rows="4"
                                placeholder="Share your experience with this product..."
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Upload Images (max 3)</label>
                            <div className="flex gap-4 flex-wrap">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        {preview ? (
                                            <>
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition  opacity-100"
                                                >
                                                    <FaTimes size={12} />
                                                </button>
                                            </>
                                        ) : (
                                            <label className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleSingleImageChange(e, index)}
                                                />
                                                <span className="text-2xl text-gray-400">+</span>
                                            </label>
                                        )}
                                    </div>
                                ))}
                                {images.length < 3 && previews.length < 3 && (
                                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleSingleImageChange(e, previews.length)}
                                        />
                                        <span className="text-2xl text-gray-400">+</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-5 py-2 rounded-lg font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition`}
                            >
                                {isSubmitting ? 'Submitting...' : editingReviewId ? 'Update Review' : 'Submit Review'}
                            </button>
                            {editingReviewId && (
                                <button
                                    onClick={resetForm}
                                    type="button"
                                    className="px-5 py-2 rounded-lg font-medium bg-gray-400 hover:bg-gray-500 text-white transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                        <p className="text-blue-700">
                            Please <a href="/login" className="font-medium underline hover:text-blue-800">login</a> to write a review.
                        </p>
                    </div>
                )}

                {isLoadingReviews ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Loading reviews...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-3 md:space-y-6">
                                    {reviews.map(review => (
                                        <div
                                            key={review._id}
                                            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg"
                                        >
                                            <div className="p-5 sm:p-6">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                    {/* User Info + Content */}
                                                    <div className="flex-1">
                                                        <div className="flex items-start gap-4">
                                                            {/* User Avatar */}
                                                            <div className="flex-shrink-0">
                                                                {review.userPhoto ? (
                                                                    <img
                                                                        src={review.userPhoto}
                                                                        alt={review.userName}
                                                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow"
                                                                    />
                                                                ) : (
                                                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                                        <FaUser size={20} />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Name + Rating */}
                                                            <div className="flex-1">
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                                                                        {review.userName}
                                                                    </h3>
                                                                    <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
                                                                        {formatDate(review.createdAt)}
                                                                    </span>
                                                                </div>

                                                                <div className="mt-1">
                                                                    <Rating
                                                                        readonly
                                                                        initialRating={review.rating}
                                                                        emptySymbol={<FaRegStar className="text-gray-300" />}
                                                                        fullSymbol={<FaStar className="text-yellow-400" />}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Comment */}
                                                        <p className="text-gray-700 mt-4 ml-16 sm:ml-16 text-sm sm:text-base break-words whitespace-pre-line overflow-hidden">
                                                            {review.comment}
                                                        </p>

                                                        {/* Images */}
                                                        {review.images && review.images.length > 0 && (
                                                            <div className="flex flex-wrap gap-3 mt-4 ml-16 sm:ml-16">
                                                                {review.images.map((img, i) => (
                                                                    <img
                                                                        key={i}
                                                                        src={img}
                                                                        alt={`Review by ${review.userName}`}
                                                                        className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition"
                                                                        onClick={() => window.open(img, '_blank')}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Edit/Delete Actions */}
                                                    {user?.uid === review.userId && (
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => handleEdit(review)}
                                                                className="text-blue-500 hover:text-blue-700 transition"
                                                                aria-label="Edit review"
                                                                title="Edit"
                                                            >
                                                                <FaEdit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(review._id)}
                                                                className="text-red-500 hover:text-red-700 transition"
                                                                aria-label="Delete review"
                                                                title="Delete"
                                                            >
                                                                <FaTrash size={18} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                        </div>

                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center mt-8 gap-4">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={!pagination.hasPrevPage}
                                    className={`p-2 rounded-full ${pagination.hasPrevPage ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 cursor-not-allowed'} transition`}
                                >
                                    <FaChevronLeft className={pagination.hasPrevPage ? 'text-gray-700' : 'text-gray-400'} />
                                </button>

                                <span className="text-gray-700">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={!pagination.hasNextPage}
                                    className={`p-2 rounded-full ${pagination.hasNextPage ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 cursor-not-allowed'} transition`}
                                >
                                    <FaChevronRight className={pagination.hasNextPage ? 'text-gray-700' : 'text-gray-400'} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductReview;