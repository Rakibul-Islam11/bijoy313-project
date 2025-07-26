import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { authContext } from "../auth-porvider-context/AuthContext";
import Swal from "sweetalert2";

const DocumentNID = () => {
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [frontPreview, setFrontPreview] = useState("");
    const [backPreview, setBackPreview] = useState("");
    const [userProfile, setUserProfile] = useState(null);
    const { user, loading } = useContext(authContext);
    const imgbbApiKey = "cda842bc5216b0739bf4197286199e2c";

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server-nu.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) setUserProfile(data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    useEffect(() => {
        if (!loading) fetchUserData();
    }, [user, loading]);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === "front") {
                    setFrontImage(file);
                    setFrontPreview(reader.result);
                } else {
                    setBackImage(file);
                    setBackPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (type) => {
        if (type === "front") {
            setFrontImage(null);
            setFrontPreview("");
            document.getElementById('front-input').value = '';
        } else {
            setBackImage(null);
            setBackPreview("");
            document.getElementById('back-input').value = '';
        }
    };

    const uploadToImgBB = async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
        const response = await axios.post(url, formData);
        return response.data.data.display_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!frontImage || !backImage) {
            Swal.fire({
                icon: "warning",
                title: "Missing Images",
                text: "Please upload both front and back NID images.",
            });
            return;
        }

        try {
            Swal.fire({
                title: "Uploading...",
                text: "Please wait while images are being uploaded.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const frontUrl = await uploadToImgBB(frontImage);
            const backUrl = await uploadToImgBB(backImage);

            const payload = {
                firebaseUID: userProfile.firebaseUID,
                nidFront: frontUrl,
                nidBack: backUrl,
            };

            const res = await axios.post("https://bijoy-server-nu.vercel.app/api/nid-upload", payload);

            Swal.fire({
                icon: "success",
                title: "Upload Complete",
                text: res.data.message || "Documents uploaded successfully!",
            });

            // Reset state
            setFrontImage(null);
            setBackImage(null);
            setFrontPreview("");
            setBackPreview("");
            document.getElementById('front-input').value = '';
            document.getElementById('back-input').value = '';

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Upload Your NID Documents</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* NID Front Upload */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">NID Front</label>
                            <input
                                id="front-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "front")}
                                className="w-full text-sm text-black file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                            />
                            {frontPreview && (
                                <div className="relative mt-4">
                                    <img
                                        src={frontPreview}
                                        alt="NID Front Preview"
                                        className="w-full max-w-xs h-auto rounded-lg border-2 border-gray-300 mx-auto"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage("front")}
                                        className="absolute top-2 text-black right-2 bg-red-500  p-2 rounded-full shadow hover:bg-red-600"
                                        aria-label="Remove Front Image"
                                    >
                                        <FaTimes className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* NID Back Upload */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">NID Back</label>
                            <input
                                id="back-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "back")}
                                className="w-full text-black text-sm file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                            />
                            {backPreview && (
                                <div className="relative mt-4">
                                    <img
                                        src={backPreview}
                                        alt="NID Back Preview"
                                        className="w-full max-w-xs h-auto rounded-lg border-2 border-gray-300 mx-auto"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage("back")}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600"
                                        aria-label="Remove Back Image"
                                    >
                                        <FaTimes className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                            disabled={!frontImage || !backImage}
                        >
                            Submit Documents
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentNID;
