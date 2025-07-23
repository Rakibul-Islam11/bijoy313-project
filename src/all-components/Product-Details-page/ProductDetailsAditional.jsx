import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetailsAditional = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://bijoy-server.vercel.app/api/products/${productId}`);
                setProduct(res.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return <div className="text-center py-4">লোড হচ্ছে...</div>;
    }

    if (!product) {
        return <div className="text-center py-4 text-red-500">পণ্যের তথ্য পাওয়া যায়নি</div>;
    }

    return (
        <div>
            <div className="mb-6 mt-10 md:mt-15">
                <div className="text-black">
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">বিবরণ</h3>
                <p className="text-gray-600">{product.description || "এই পণ্যটি সম্পর্কে বিস্তারিত বিবরণ দেওয়া হয়নি।"}</p>
            </div>
        </div>
    );
};

export default ProductDetailsAditional;