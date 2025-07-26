
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../auth-porvider-context/AuthContext";


const PersonalInfoForm = () => {
    const { user, loading } = useContext(authContext);

    const [newName, setNewName] = useState("");
    const [newDay, setNewDay] = useState("");
    const [newMonth, setNewMonth] = useState("");
    const [newYear, setNewYear] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newProfession, setNewProfession] = useState("");
    const [newPhoto, setNewPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");
    const [message, setMessage] = useState("");
    const [userProfile, setUserProfile] = useState(null);

    const [hasChanged, setHasChanged] = useState({
        name: false,
        day: false,
        month: false,
        year: false,
        gender: false,
        profession: false,
    });

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server-nu.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) {
                    setUserProfile(data.user);

                    if (!hasChanged.name) setNewName(data.user.name || "");

                    if (data.user.dob) {
                        const dob = new Date(data.user.dob);
                        if (!hasChanged.day) setNewDay(dob.getDate().toString());
                        if (!hasChanged.month) setNewMonth((dob.getMonth() + 1).toString());
                        if (!hasChanged.year) setNewYear(dob.getFullYear().toString());
                    }

                    if (!hasChanged.gender) setNewGender(data.user.gender || "");
                    if (!hasChanged.profession) setNewProfession(data.user.profession || "");

                    if (data.user.photoURL) {
                        setPhotoPreview(data.user.photoURL);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setMessage("Error fetching user data.");
            }
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
        }
    }, [user, loading]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setNewPhoto(null);
            setPhotoPreview("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userProfile?.firebaseUID) {
            setMessage("User profile not loaded yet. Please wait.");
            return;
        }

        let dob = null;
        if (newDay && newMonth && newYear) {
            const formattedMonth = String(newMonth).padStart(2, '0');
            const formattedDay = String(newDay).padStart(2, '0');
            dob = `${newYear}-${formattedMonth}-${formattedDay}`;
        }

        setMessage("Updating...");

        try {
            let uploadedImageUrl = photoPreview; // default old image preview
            if (newPhoto) {
                const formData = new FormData();
                formData.append("image", newPhoto);

                const imgbbApiKey = "cda842bc5216b0739bf4197286199e2c";
                const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

                const imgbbRes = await axios.post(imgbbUrl, formData);
                uploadedImageUrl = imgbbRes.data.data.display_url;
            }

            const payload = {
                firebaseUID: userProfile.firebaseUID,
                name: newName,
                dob: dob,
                photoURL: uploadedImageUrl,
                gender: newGender,
                profession: newProfession,

            };

            const res = await axios.post("https://bijoy-server-nu.vercel.app/api/update-name", payload);
            setMessage(res.data.message);
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response && error.response.data?.message) {
                setMessage(`Failed to update profile: ${error.response.data.message}`);
            } else {
                setMessage("Failed to update profile. Please try again.");
            }
        }
    };


    const months = [
        { value: "01", label: "January" }, { value: "02", label: "February" },
        { value: "03", label: "March" }, { value: "04", label: "April" },
        { value: "05", label: "May" }, { value: "06", label: "June" },
        { value: "07", label: "July" }, { value: "08", label: "August" },
        { value: "09", label: "September" }, { value: "10", label: "October" },
        { value: "11", label: "November" }, { value: "12", label: "December" },
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-start justify-start ">
            <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-2xl mx-auto my-8">
                <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">Update Your Profile</h2>

                <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-row justify-between">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={newName}
                                    onChange={(e) => {
                                        setNewName(e.target.value);
                                        setHasChanged((prev) => ({ ...prev, name: true }));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            {/* DOB */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <input
                                        type="number"
                                        value={newDay}
                                        onChange={(e) => {
                                            setNewDay(e.target.value);
                                            setHasChanged((prev) => ({ ...prev, day: true }));
                                        }}
                                        placeholder="DD"
                                        min="1"
                                        max="31"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                                    />
                                    <select
                                        value={newMonth}
                                        onChange={(e) => {
                                            setNewMonth(e.target.value);
                                            setHasChanged((prev) => ({ ...prev, month: true }));
                                        }}
                                        className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 text-black"
                                    >
                                        <option value="">Month</option>
                                        {months.map(month => (
                                            <option key={month.value} value={month.value}>{month.label}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        value={newYear}
                                        onChange={(e) => {
                                            setNewYear(e.target.value);
                                            setHasChanged((prev) => ({ ...prev, year: true }));
                                        }}
                                        placeholder="YYYY"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            {/* Gender */}
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <input
                                    id="gender"
                                    type="text"
                                    value={newGender}
                                    onChange={(e) => {
                                        setNewGender(e.target.value);
                                        setHasChanged((prev) => ({ ...prev, gender: true }));
                                    }}
                                    placeholder="Gender"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                                />
                            </div>

                            {/* Profession */}
                            <div>
                                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                <input
                                    id="profession"
                                    type="text"
                                    value={newProfession}
                                    onChange={(e) => {
                                        setNewProfession(e.target.value);
                                        setHasChanged((prev) => ({ ...prev, profession: true }));
                                    }}
                                    placeholder="Profession"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                                />
                            </div>
                        </div>


                        {/* Photo Upload */}
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                                <input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="w-full text-sm p-2 border border-gray-300 rounded-lg file:bg-blue-50 file:text-blue-700 file:font-semibold file:border-none file:rounded-full text-black"
                                />
                            </div>
                            <div>
                                {photoPreview && (
                                    <div className="mt-4 flex justify-center">
                                        <img
                                            src={photoPreview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-full border-2 border-blue-500 shadow-md"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 font-semibold rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>

                {message && (
                    <p className={`mt-4 text-center text-sm font-medium ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PersonalInfoForm;