import axios from "axios";
import { useState } from "react";

const ProductUpload = () => {
    // Basic product info
    const [productName, setProductName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [tags, setTags] = useState("");
    const [keywords, setKeywords] = useState("");

    // Variant management
    const [hasVariant, setHasVariant] = useState(false);
    const [variantType, setVariantType] = useState("");

    // Fashion variants structure
    const [fashionVariants, setFashionVariants] = useState({
        price: "",
        regularPrice: "",
        discountPercent: "",
        resellerPrice: "",
        costPerItem: "",
        colors: [
            {
                name: "",
                image: "",
                stock: "",
                sizes: [
                    {
                        size: "",
                        stock: ""
                    }
                ]
            }
        ]
    });

    // Weight variants structure
    const [weightVariants, setWeightVariants] = useState([
        {
            value: "",
            price: "",
            regularPrice: "",
            discountPercent: "",
            resellerPrice: "",
            costPerItem: "",
            stock: "",
            sku: "",
            barcode: "",
            weight: ""
        }
    ]);

    // Simple product pricing
    const [simplePrice, setSimplePrice] = useState("");
    const [simpleRegularPrice, setSimpleRegularPrice] = useState("");
    const [simpleDiscountPercent, setSimpleDiscountPercent] = useState("");
    const [simpleResellerPrice, setSimpleResellerPrice] = useState("");
    const [simpleCostPerItem, setSimpleCostPerItem] = useState("");
    const [simpleStock, setSimpleStock] = useState("");
    const [simpleSku, setSimpleSku] = useState("");
    const [simpleBarcode, setSimpleBarcode] = useState("");
    const [simpleWeight, setSimpleWeight] = useState("");
    const [deliveryCharge, setDeliveryCharge] = useState("");

    // Media management
    const [images, setImages] = useState([""]);
    const [mainImage, setMainImage] = useState("");
    const [videos, setVideos] = useState([""]);
    const [productDocuments, setProductDocuments] = useState([{ name: "", url: "" }]);

    // Product status
    const [isAvailable, setIsAvailable] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [isNewArrival, setIsNewArrival] = useState(false);

    // Shipping info
    const [weightUnit, setWeightUnit] = useState("kg");
    const [requiresShipping, setRequiresShipping] = useState(true);
    const [shippingType, setShippingType] = useState("standard");

    // SEO info
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");

    // Digital product specific
    const [isDigital, setIsDigital] = useState(false);
    const [downloadFiles, setDownloadFiles] = useState([{ name: "", url: "", maxDownloads: "", resellerPrice: "" }]);

    // Subscription product specific
    const [isSubscription, setIsSubscription] = useState(false);
    const [subscriptionPlans, setSubscriptionPlans] = useState([{ duration: "", price: "", resellerPrice: "" }]);
    const [advancePayment, setAdvancePayment] = useState(false);
    const [advanceAmount, setAdvanceAmount] = useState("");

    // Price calculation handlers for simple product
    const handleSimplePriceChange = (e) => {
        if (!simpleDiscountPercent) {
            const price = e.target.value;
            setSimplePrice(price);

            if (simpleRegularPrice) {
                const discount = ((simpleRegularPrice - price) / simpleRegularPrice * 100).toFixed(2);
                setSimpleDiscountPercent(discount);
            }
        }
    };

    const handleSimpleRegularPriceChange = (e) => {
        const regularPrice = e.target.value;
        setSimpleRegularPrice(regularPrice);

        if (simpleDiscountPercent) {
            const price = (regularPrice * (1 - simpleDiscountPercent / 100)).toFixed(2);
            setSimplePrice(price);
        }
    };

    const handleSimpleDiscountPercentChange = (e) => {
        const discount = e.target.value;
        setSimpleDiscountPercent(discount);

        if (simpleRegularPrice) {
            const price = (simpleRegularPrice * (1 - discount / 100)).toFixed(2);
            setSimplePrice(price);
        }
    };

    // Fashion variant handlers
    const addColor = () => {
        setFashionVariants({
            ...fashionVariants,
            colors: [
                ...fashionVariants.colors,
                {
                    name: "",
                    image: "",
                    stock: "",
                    sizes: [
                        {
                            size: "",
                            stock: ""
                        }
                    ]
                }
            ]
        });
    };

    const removeColor = (colorIndex) => {
        const updated = { ...fashionVariants };
        updated.colors.splice(colorIndex, 1);
        setFashionVariants(updated);
    };

    const addSize = (colorIndex) => {
        const updated = { ...fashionVariants };
        updated.colors[colorIndex].sizes.push({
            size: "",
            stock: ""
        });
        setFashionVariants(updated);
    };

    const removeSize = (colorIndex, sizeIndex) => {
        const updated = { ...fashionVariants };
        updated.colors[colorIndex].sizes.splice(sizeIndex, 1);
        setFashionVariants(updated);
    };

    const handleFashionVariantChange = (field, value) => {
        const updated = { ...fashionVariants };

        if (field === 'regularPrice' && updated.discountPercent) {
            updated.price = (value * (1 - updated.discountPercent / 100)).toFixed(2);
        } else if (field === 'discountPercent') {
            updated[field] = value;
            if (updated.regularPrice) {
                updated.price = (updated.regularPrice * (1 - value / 100)).toFixed(2);
            }
        } else {
            updated[field] = value;
        }

        setFashionVariants(updated);
    };

    const handleColorChange = (colorIndex, field, value) => {
        const updated = { ...fashionVariants };
        updated.colors[colorIndex][field] = value;
        setFashionVariants(updated);
    };

    const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
        const updated = { ...fashionVariants };
        updated.colors[colorIndex].sizes[sizeIndex][field] = value;
        setFashionVariants(updated);
    };

    // Weight variant handlers
    const addWeightVariant = () => {
        setWeightVariants([...weightVariants, {
            value: "",
            price: "",
            regularPrice: "",
            discountPercent: "",
            resellerPrice: "",
            costPerItem: "",
            stock: "",
            sku: "",
            barcode: "",
            weight: ""
        }]);
    };

    const removeWeightVariant = (index) => {
        const updated = [...weightVariants];
        updated.splice(index, 1);
        setWeightVariants(updated);
    };

    const handleWeightVariantChange = (index, field, value) => {
        const updated = [...weightVariants];

        if (field === 'regularPrice' && updated[index].discountPercent) {
            updated[index].price = (value * (1 - updated[index].discountPercent / 100)).toFixed(2);
        }
        else if (field === 'discountPercent') {
            updated[index][field] = value;
            if (updated[index].regularPrice) {
                updated[index].price = (updated[index].regularPrice * (1 - value / 100)).toFixed(2);
            }
        }
        else if (field === 'price' && !updated[index].discountPercent) {
            if (updated[index].regularPrice) {
                const discount = ((updated[index].regularPrice - value) / updated[index].regularPrice * 100).toFixed(2);
                updated[index].discountPercent = discount;
            }
        }
        else {
            updated[index][field] = value;
        }

        setWeightVariants(updated);
    };

    // Image handlers
    const addImageField = () => {
        setImages([...images, ""]);
    };

    const removeImageField = (index) => {
        const updated = [...images];
        updated.splice(index, 1);
        setImages(updated);
    };

    const handleImageChange = (index, value) => {
        const updated = [...images];
        updated[index] = value;
        setImages(updated);
    };

    // Video handlers
    const addVideoField = () => {
        setVideos([...videos, ""]);
    };

    const removeVideoField = (index) => {
        const updated = [...videos];
        updated.splice(index, 1);
        setVideos(updated);
    };

    const handleVideoChange = (index, value) => {
        const updated = [...videos];
        updated[index] = value;
        setVideos(updated);
    };

    // Document handlers
    const addDocumentField = () => {
        setProductDocuments([...productDocuments, { name: "", url: "" }]);
    };

    const removeDocumentField = (index) => {
        const updated = [...productDocuments];
        updated.splice(index, 1);
        setProductDocuments(updated);
    };

    const handleDocumentChange = (index, field, value) => {
        const updated = [...productDocuments];
        updated[index][field] = value;
        setProductDocuments(updated);
    };

    // Digital product handlers
    const addDownloadFile = () => {
        setDownloadFiles([...downloadFiles, { name: "", url: "", maxDownloads: "", resellerPrice: "" }]);
    };

    const removeDownloadFile = (index) => {
        const updated = [...downloadFiles];
        updated.splice(index, 1);
        setDownloadFiles(updated);
    };

    const handleDownloadFileChange = (index, field, value) => {
        const updated = [...downloadFiles];
        updated[index][field] = value;
        setDownloadFiles(updated);
    };

    // Subscription handlers
    const addSubscriptionPlan = () => {
        setSubscriptionPlans([...subscriptionPlans, { duration: "", price: "", resellerPrice: "" }]);
    };

    const removeSubscriptionPlan = (index) => {
        const updated = [...subscriptionPlans];
        updated.splice(index, 1);
        setSubscriptionPlans(updated);
    };

    const handleSubscriptionPlanChange = (index, field, value) => {
        const updated = [...subscriptionPlans];
        updated[index][field] = value;
        setSubscriptionPlans(updated);
    };

    // Handle variant type selection
    const handleVariantCheckboxChange = (e) => {
        const checked = e.target.checked;
        setHasVariant(checked);

        if (!checked) {
            setVariantType("");
            setFashionVariants({
                price: "",
                regularPrice: "",
                discountPercent: "",
                resellerPrice: "",
                costPerItem: "",
                colors: [
                    {
                        name: "",
                        image: "",
                        stock: "",
                        sizes: [
                            {
                                size: "",
                                stock: ""
                            }
                        ]
                    }
                ]
            });
            setWeightVariants([
                {
                    value: "",
                    price: "",
                    regularPrice: "",
                    discountPercent: "",
                    resellerPrice: "",
                    costPerItem: "",
                    stock: "",
                    sku: "",
                    barcode: "",
                    weight: ""
                }
            ]);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                productName,
                slug,
                description,
                advancePayment: {
                    required: advancePayment,
                    amount: advancePayment ? advanceAmount : null
                },
                deliveryCharge: !isDigital ? deliveryCharge : null,
                mainCategory,
                subCategory,
                tags: tags.split(',').map(tag => tag.trim()),
                keywords: keywords.split(',').map(keyword => keyword.trim()),
                hasVariant,
                variantType,
                variants: hasVariant ? (
                    variantType === "fashion" ? fashionVariants :
                        variantType === "weight" ? weightVariants : null
                ) : null,
                simpleProduct: !hasVariant ? {
                    price: simplePrice,
                    regularPrice: simpleRegularPrice,
                    discountPercent: simpleDiscountPercent,
                    resellerPrice: simpleResellerPrice,
                    costPerItem: simpleCostPerItem,
                    stock: simpleStock,
                    sku: simpleSku,
                    barcode: simpleBarcode,
                    weight: simpleWeight
                } : null,
                media: {
                    mainImage,
                    images: images.filter(img => img.trim() !== ""),
                    videos: videos.filter(video => video.trim() !== ""),
                    documents: productDocuments.filter(doc => doc.name.trim() !== "" && doc.url.trim() !== "")
                },
                status: {
                    isAvailable,
                    isFeatured,
                    isBestSeller,
                    isNewArrival
                },
                shipping: {
                    weightUnit,
                    requiresShipping,
                    shippingType
                },
                seo: {
                    title: seoTitle,
                    description: seoDescription
                },
                isDigital,
                downloadFiles: isDigital ? downloadFiles.filter(file => file.name.trim() !== "" && file.url.trim() !== "") : null,
                isSubscription,
                subscriptionPlans: isSubscription ? subscriptionPlans.filter(plan => plan.duration.trim() !== "" && plan.price.trim() !== "") : null
            };

            const response = await axios.post('https://bijoy-server.vercel.app/api/products', productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Product uploaded successfully!');
                // Optionally reset the form here
            } else {
                throw new Error(response.data.message || 'Failed to upload product');
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            alert(error.response?.data?.message || error.message || 'Failed to upload product');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg mt-10 text-black">
            <h2 className="text-3xl font-bold mb-6">🌍 Universal Product Upload Form</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

                {/* BASIC INFO SECTION */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Basic Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">Product Name*</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="Enter product name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Slug*</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="slug-for-product-url"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold mb-1">Description*</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            rows={4}
                            placeholder="Detailed product description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block font-semibold mb-1">Main Category*</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={mainCategory}
                                onChange={(e) => setMainCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home & Garden</option>
                                <option value="beauty">Beauty</option>
                                <option value="food">Food & Beverage</option>
                                <option value="digital">Digital Products</option>
                                <option value="services">Services</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Sub Category*</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="e.g. Mobile, Honey, T-shirt"
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* ADVANCE PAYMENT SECTION */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Advance Payment & Delivery</h3>

                    <div className="flex items-center space-x-2 mb-2">
                        <input
                            type="checkbox"
                            id="advancePayment"
                            checked={advancePayment}
                            onChange={(e) => setAdvancePayment(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <label htmlFor="advancePayment" className="font-medium">
                            💰 This product requires advance payment
                        </label>
                    </div>

                    {advancePayment && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div>
                                <label className="block font-semibold mb-1">Advance Amount*</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded"
                                    value={advanceAmount}
                                    onChange={(e) => setAdvanceAmount(e.target.value)}
                                    placeholder="Enter advance amount"
                                    required={advancePayment}
                                />
                            </div>
                        </div>
                    )}

                    {!isDigital && (
                        <div className="mt-4">
                            <label className="block font-semibold mb-1">Delivery Charge</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={deliveryCharge}
                                onChange={(e) => setDeliveryCharge(e.target.value)}
                                placeholder="e.g. 50"
                            />
                        </div>
                    )}
                </div>

                {/* MEDIA SECTION */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Media</h3>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Main Image URL*</label>
                        <input
                            type="url"
                            value={mainImage}
                            onChange={(e) => setMainImage(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="https://example.com/main-image.jpg"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">Recommended size: 800x800px</p>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Additional Image URLs</label>
                        {images.map((img, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="url"
                                    className="w-full border p-2 rounded"
                                    value={img}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="text-red-500 hover:underline"
                                    >
                                        ❌
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addImageField}
                            className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            ➕ Add Image Field
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Product Video URLs</label>
                        {videos.map((video, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="url"
                                    className="w-full border p-2 rounded"
                                    value={video}
                                    onChange={(e) => handleVideoChange(index, e.target.value)}
                                    placeholder="https://example.com/video.mp4"
                                />
                                {videos.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVideoField(index)}
                                        className="text-red-500 hover:underline"
                                    >
                                        ❌
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addVideoField}
                            className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            ➕ Add Video Field
                        </button>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Product Documents (Manuals, Guides, etc.)</label>
                        {productDocuments.map((doc, index) => (
                            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                                <input
                                    type="text"
                                    className="border p-2 rounded"
                                    placeholder="Document name"
                                    value={doc.name}
                                    onChange={(e) => handleDocumentChange(index, "name", e.target.value)}
                                />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="url"
                                        className="w-full border p-2 rounded"
                                        placeholder="Document URL"
                                        value={doc.url}
                                        onChange={(e) => handleDocumentChange(index, "url", e.target.value)}
                                    />
                                    {productDocuments.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeDocumentField(index)}
                                            className="text-red-500 hover:underline"
                                        >
                                            ❌
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addDocumentField}
                            className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            ➕ Add Document
                        </button>
                    </div>
                </div>

                {/* PRICING & INVENTORY SECTION */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Pricing & Inventory</h3>

                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="checkbox"
                            id="hasVariant"
                            checked={hasVariant}
                            onChange={handleVariantCheckboxChange}
                            className="w-5 h-5"
                        />
                        <label htmlFor="hasVariant" className="font-medium">🧬 This product has variants (e.g. size, color, weight)</label>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="checkbox"
                            id="isDigital"
                            checked={isDigital}
                            onChange={(e) => setIsDigital(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <label htmlFor="isDigital" className="font-medium">💾 This is a digital product</label>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="checkbox"
                            id="isSubscription"
                            checked={isSubscription}
                            onChange={(e) => setIsSubscription(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <label htmlFor="isSubscription" className="font-medium">🔄 This is a subscription product</label>
                    </div>

                    {/* Variant type selection */}
                    {hasVariant && (
                        <div className="mb-6 p-4 bg-gray-50 rounded border">
                            <h4 className="font-semibold mb-3">Select Variant Type</h4>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="variantType"
                                        value="fashion"
                                        checked={variantType === "fashion"}
                                        onChange={() => setVariantType("fashion")}
                                        className="w-5 h-5"
                                    />
                                    <span>👕 Fashion Product (Different sizes/colors)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="variantType"
                                        value="weight"
                                        checked={variantType === "weight"}
                                        onChange={() => setVariantType("weight")}
                                        className="w-5 h-5"
                                    />
                                    <span>⚖️ Weight Product (Different weights, different prices)</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* IF DIGITAL PRODUCT */}
                    {isDigital && (
                        <div className="mb-6 p-4 bg-gray-50 rounded border">
                            <h4 className="font-semibold mb-3">Digital Product Files</h4>
                            {downloadFiles.map((file, index) => (
                                <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="border p-2 rounded"
                                        placeholder="File name"
                                        value={file.name}
                                        onChange={(e) => handleDownloadFileChange(index, "name", e.target.value)}
                                    />
                                    <input
                                        type="url"
                                        className="border p-2 rounded"
                                        placeholder="Download URL"
                                        value={file.url}
                                        onChange={(e) => handleDownloadFileChange(index, "url", e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="border p-2 rounded"
                                        placeholder="Max downloads"
                                        value={file.maxDownloads}
                                        onChange={(e) => handleDownloadFileChange(index, "maxDownloads", e.target.value)}
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            className="w-full border p-2 rounded"
                                            placeholder="Reseller price"
                                            value={file.resellerPrice}
                                            onChange={(e) => handleDownloadFileChange(index, "resellerPrice", e.target.value)}
                                        />
                                        {downloadFiles.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDownloadFile(index)}
                                                className="text-red-500 hover:underline"
                                            >
                                                ❌
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addDownloadFile}
                                className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                ➕ Add Download File
                            </button>
                        </div>
                    )}

                    {/* IF SUBSCRIPTION PRODUCT */}
                    {isSubscription && (
                        <div className="mb-6 p-4 bg-gray-50 rounded border">
                            <h4 className="font-semibold mb-3">Subscription Plans</h4>
                            {subscriptionPlans.map((plan, index) => (
                                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                                    <select
                                        className="border p-2 rounded"
                                        value={plan.duration}
                                        onChange={(e) => handleSubscriptionPlanChange(index, "duration", e.target.value)}
                                    >
                                        <option value="">Select duration</option>
                                        <option value="1 week">1 Week</option>
                                        <option value="1 month">1 Month</option>
                                        <option value="3 months">3 Months</option>
                                        <option value="6 months">6 Months</option>
                                        <option value="1 year">1 Year</option>
                                    </select>
                                    <input
                                        type="number"
                                        className="border p-2 rounded"
                                        placeholder="Price"
                                        value={plan.price}
                                        onChange={(e) => handleSubscriptionPlanChange(index, "price", e.target.value)}
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            className="w-full border p-2 rounded"
                                            placeholder="Reseller price"
                                            value={plan.resellerPrice}
                                            onChange={(e) => handleSubscriptionPlanChange(index, "resellerPrice", e.target.value)}
                                        />
                                        {subscriptionPlans.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSubscriptionPlan(index)}
                                                className="text-red-500 hover:underline"
                                            >
                                                ❌
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSubscriptionPlan}
                                className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                ➕ Add Subscription Plan
                            </button>
                        </div>
                    )}

                    {/* IF NO VARIANT: SIMPLE PRICE INPUT */}
                    {!hasVariant && !isSubscription && !isDigital && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Regular Price*</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={simpleRegularPrice}
                                        onChange={handleSimpleRegularPriceChange}
                                        placeholder="e.g. 599"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Current Price*</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={simplePrice}
                                        onChange={handleSimplePriceChange}
                                        placeholder="e.g. 499"
                                        required
                                        readOnly={!!simpleDiscountPercent}
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Discount %</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={simpleDiscountPercent}
                                        onChange={handleSimpleDiscountPercentChange}
                                        placeholder="e.g. 15"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Reseller Price</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={simpleResellerPrice}
                                        onChange={(e) => setSimpleResellerPrice(e.target.value)}
                                        placeholder="e.g. 450"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                <div>
                                    <label className="block font-semibold mb-1">Cost Per Item</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={simpleCostPerItem}
                                        onChange={(e) => setSimpleCostPerItem(e.target.value)}
                                        placeholder="e.g. 300"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Profit</label>
                                    <input
                                        type="text"
                                        className="w-full border p-2 rounded bg-gray-100"
                                        value={simplePrice && simpleCostPerItem ? `$${(simplePrice - simpleCostPerItem).toFixed(2)}` : ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* FASHION VARIANTS */}
                    {hasVariant && variantType === "fashion" && (
                        <div className="mb-6">
                            <h4 className="font-semibold text-lg mb-4">👕 Fashion Product Variants</h4>

                            {/* Common pricing for all variants */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div>
                                    <label className="block font-semibold mb-1">Regular Price*</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={fashionVariants.regularPrice}
                                        onChange={(e) => handleFashionVariantChange("regularPrice", e.target.value)}
                                        placeholder="e.g. 599"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Current Price*</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={fashionVariants.price}
                                        onChange={(e) => handleFashionVariantChange("price", e.target.value)}
                                        placeholder="e.g. 499"
                                        required
                                        readOnly={!!fashionVariants.discountPercent}
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Discount %</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={fashionVariants.discountPercent}
                                        onChange={(e) => handleFashionVariantChange("discountPercent", e.target.value)}
                                        placeholder="e.g. 15"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Reseller Price</label>
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={fashionVariants.resellerPrice}
                                        onChange={(e) => handleFashionVariantChange("resellerPrice", e.target.value)}
                                        placeholder="e.g. 450"
                                    />
                                </div>
                            </div>

                            {/* Color variants */}
                            <div className="space-y-6">
                                {fashionVariants.colors.map((color, colorIndex) => (
                                    <div key={colorIndex} className="border rounded-lg p-4 bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <label className="block font-semibold mb-1">Color Name*</label>
                                                <input
                                                    type="text"
                                                    className="w-full border p-2 rounded"
                                                    value={color.name}
                                                    onChange={(e) => handleColorChange(colorIndex, "name", e.target.value)}
                                                    placeholder="e.g. Red, Blue, Black"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Color Image URL*</label>
                                                <input
                                                    type="url"
                                                    className="w-full border p-2 rounded"
                                                    value={color.image}
                                                    onChange={(e) => handleColorChange(colorIndex, "image", e.target.value)}
                                                    placeholder="https://example.com/color-image.jpg"
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <div className="flex-1">
                                                    <label className="block font-semibold mb-1">Total Stock</label>
                                                    <input
                                                        type="number"
                                                        className="w-full border p-2 rounded"
                                                        value={color.stock}
                                                        onChange={(e) => handleColorChange(colorIndex, "stock", e.target.value)}
                                                        placeholder="Total quantity"
                                                    />
                                                </div>
                                                {fashionVariants.colors.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeColor(colorIndex)}
                                                        className="text-red-500 hover:underline h-10"
                                                    >
                                                        ❌
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Sizes for this color */}
                                        <div className="ml-4">
                                            <h5 className="font-semibold mb-2">Available Sizes</h5>
                                            {color.sizes.map((size, sizeIndex) => (
                                                <div key={sizeIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Size*</label>
                                                        <select
                                                            className="w-full border p-2 rounded"
                                                            value={size.size}
                                                            onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "size", e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select size</option>
                                                            <option value="XS">XS</option>
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>
                                                            <option value="XL">XL</option>
                                                            <option value="XXL">XXL</option>
                                                            <option value="XXXL">XXXL</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Stock*</label>
                                                        <input
                                                            type="number"
                                                            className="w-full border p-2 rounded"
                                                            value={size.stock}
                                                            onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "stock", e.target.value)}
                                                            placeholder="Quantity"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex items-end gap-2">
                                                        {color.sizes.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSize(colorIndex, sizeIndex)}
                                                                className="text-red-500 hover:underline h-10"
                                                            >
                                                                ❌ Remove Size
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addSize(colorIndex)}
                                                className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                                            >
                                                ➕ Add Size
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addColor}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                ➕ Add Another Color Variant
                            </button>
                        </div>
                    )}

                    {/* WEIGHT VARIANTS */}
                    {hasVariant && variantType === "weight" && (
                        <div>
                            <h4 className="font-semibold text-lg mt-6 mb-3">⚖️ Weight Variants (Different Weights)</h4>

                            {weightVariants.map((variant, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-gray-50 p-4 rounded border">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Weight*</label>
                                        <div className="flex">
                                            <input
                                                type="number"
                                                placeholder="e.g. 0.5"
                                                className="w-full border p-2 rounded-l"
                                                value={variant.value}
                                                onChange={(e) => handleWeightVariantChange(index, "value", e.target.value)}
                                                required
                                            />
                                            <select
                                                className="border-t border-r border-b p-2 rounded-r bg-gray-100"
                                                value={weightUnit}
                                                onChange={(e) => setWeightUnit(e.target.value)}
                                            >
                                                <option value="kg">kg</option>
                                                <option value="g">g</option>
                                                <option value="lb">lb</option>
                                                <option value="oz">oz</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Regular Price*</label>
                                        <input
                                            type="number"
                                            className="w-full border p-2 rounded"
                                            value={variant.regularPrice}
                                            onChange={(e) => handleWeightVariantChange(index, "regularPrice", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Price*</label>
                                        <input
                                            type="number"
                                            className="w-full border p-2 rounded"
                                            value={variant.price}
                                            onChange={(e) => handleWeightVariantChange(index, "price", e.target.value)}
                                            required
                                            readOnly={!!variant.discountPercent}
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Discount %</label>
                                            <input
                                                type="number"
                                                className="w-full border p-2 rounded"
                                                value={variant.discountPercent}
                                                onChange={(e) => handleWeightVariantChange(index, "discountPercent", e.target.value)}
                                            />
                                        </div>
                                        {weightVariants.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeWeightVariant(index)}
                                                className="text-red-500 hover:underline h-10"
                                            >
                                                ❌
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addWeightVariant}
                                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                ➕ Add Another Weight Variant
                            </button>
                        </div>
                    )}

                    {/* SIMPLE PRODUCT INVENTORY (NON-VARIANT) */}
                    {!hasVariant && !isSubscription && !isDigital && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block font-semibold mb-1">Stock*</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded"
                                    value={simpleStock}
                                    onChange={(e) => setSimpleStock(e.target.value)}
                                    placeholder="e.g. 100"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">SKU</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={simpleSku}
                                    onChange={(e) => setSimpleSku(e.target.value)}
                                    placeholder="Stock keeping unit"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Barcode</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={simpleBarcode}
                                    onChange={(e) => setSimpleBarcode(e.target.value)}
                                    placeholder="ISBN, UPC, etc."
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Weight</label>
                                <div className="flex">
                                    <input
                                        type="number"
                                        className="w-full border p-2 rounded-l"
                                        value={simpleWeight}
                                        onChange={(e) => setSimpleWeight(e.target.value)}
                                        placeholder="e.g. 0.5"
                                    />
                                    <select
                                        className="border-t border-r border-b p-2 rounded-r bg-gray-100"
                                        value={weightUnit}
                                        onChange={(e) => setWeightUnit(e.target.value)}
                                    >
                                        <option value="kg">kg</option>
                                        <option value="g">g</option>
                                        <option value="lb">lb</option>
                                        <option value="oz">oz</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* SHIPPING SECTION */}
                {!isDigital && (
                    <div className="border-b pb-6">
                        <h3 className="text-xl font-semibold mb-4">Shipping</h3>

                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="checkbox"
                                id="requiresShipping"
                                checked={requiresShipping}
                                onChange={(e) => setRequiresShipping(e.target.checked)}
                                className="w-5 h-5"
                            />
                            <label htmlFor="requiresShipping" className="font-medium">🚚 This product requires shipping</label>
                        </div>

                        {requiresShipping && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Shipping Type</label>
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={shippingType}
                                        onChange={(e) => setShippingType(e.target.value)}
                                    >
                                        <option value="standard">Standard Shipping</option>
                                        <option value="express">Express Shipping</option>
                                        <option value="free">Free Shipping</option>
                                        <option value="pickup">Local Pickup</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Package Dimensions (optional)</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <input
                                            type="number"
                                            className="border p-2 rounded"
                                            placeholder="Length (cm)"
                                        />
                                        <input
                                            type="number"
                                            className="border p-2 rounded"
                                            placeholder="Width (cm)"
                                        />
                                        <input
                                            type="number"
                                            className="border p-2 rounded"
                                            placeholder="Height (cm)"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* SEO SECTION */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">SEO Optimization</h3>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">SEO Title</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            placeholder="Optimized title for search engines"
                            maxLength="60"
                        />
                        <p className="text-sm text-gray-500 mt-1">{seoTitle.length}/60 characters</p>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">SEO Description</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            rows={3}
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            placeholder="Optimized description for search engines"
                            maxLength="160"
                        />
                        <p className="text-sm text-gray-500 mt-1">{seoDescription.length}/160 characters</p>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold mb-1">Tags (comma-separated)</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. eco-friendly, handmade, organic"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold mb-1">Search Keywords (comma-separated)</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="e.g. honey, pure honey, মধু, organic honey"
                        />
                    </div>
                </div>

                {/* PRODUCT STATUS SECTION */}
                <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold mb-4">Product Status</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2">Availability</h4>
                            <label className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    checked={isAvailable}
                                    onChange={(e) => setIsAvailable(e.target.checked)}
                                />
                                <span className="font-medium">✔ Product Available (Live)</span>
                            </label>
                            <label className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    checked={isFeatured}
                                    onChange={(e) => setIsFeatured(e.target.checked)}
                                />
                                <span className="font-medium">⭐ Mark as Featured</span>
                            </label>
                            <label className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    checked={isBestSeller}
                                    onChange={(e) => setIsBestSeller(e.target.checked)}
                                />
                                <span className="font-medium">🏆 Mark as Best Seller</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    checked={isNewArrival}
                                    onChange={(e) => setIsNewArrival(e.target.checked)}
                                />
                                <span className="font-medium">🆕 Mark as New Arrival</span>
                            </label>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Visibility</h4>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="visibility" className="w-5 h-5" checked />
                                    <span className="font-medium">Public (Visible to everyone)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="visibility" className="w-5 h-5" />
                                    <span className="font-medium">Hidden (Only accessible via direct link)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="visibility" className="w-5 h-5" />
                                    <span className="font-medium">Private (Only visible to admins)</span>
                                </label>
                            </div>

                            <div className="mt-4">
                                <label className="block font-semibold mb-1">Publish Date</label>
                                <input
                                    type="datetime-local"
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-green-600 text-white text-lg rounded hover:bg-green-700"
                >
                    ✅ Upload Product
                </button>
            </form>
        </div>
    );
};

export default ProductUpload;