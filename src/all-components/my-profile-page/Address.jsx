import { useContext, useEffect, useState } from "react";
import { authContext } from "../auth-porvider-context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const Address = () => {
    const divisions = [
        { name: "ঢাকা", districts: ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "টাঙ্গাইল", "কিশোরগঞ্জ", "মানিকগঞ্জ", "মুন্সিগঞ্জ", "রাজবাড়ী", "ফরিদপুর", "মাদারীপুর", "শরীয়তপুর", "গোপালগঞ্জ"] },
        { name: "চট্টগ্রাম", districts: ["চট্টগ্রাম", "কক্সবাজার", "রাঙ্গামাটি", "বান্দরবান", "খাগড়াছড়ি", "ফেনী", "নোয়াখালী", "লক্ষ্মীপুর", "চাঁদপুর", "ব্রাহ্মণবাড়িয়া", "কুমিল্লা"] },
        { name: "রাজশাহী", districts: ["রাজশাহী", "নাটোর", "নওগাঁ", "পাবনা", "বগুড়া", "জয়পুরহাট", "চাঁপাইনবাবগঞ্জ", "সিরাজগঞ্জ"] },
        { name: "খুলনা", districts: ["খুলনা", "বাগেরহাট", "সাতক্ষীরা", "যশোর", "মেহেরপুর", "নড়াইল", "চুয়াডাঙ্গা", "কুষ্টিয়া", "মাগুরা", "ঝিনাইদহ"] },
        { name: "বরিশাল", districts: ["বরিশাল", "পটুয়াখালী", "ভোলা", "পিরোজপুর", "বরগুনা", "ঝালকাঠি"] },
        { name: "সিলেট", districts: ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"] },
        { name: "রংপুর", districts: ["রংপুর", "দিনাজপুর", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী", "পঞ্চগড়", "ঠাকুরগাঁও"] },
        { name: "ময়মনসিংহ", districts: ["ময়মনসিংহ", "জামালপুর", "শেরপুর", "নেত্রকোণা"] }
    ];

    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [area, setArea] = useState("");
    const [addressLine, setAddressLine] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [userProfile, setUserProfile] = useState(null);
    const { user, loading } = useContext(authContext);

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

    const handleDivisionChange = (e) => {
        const division = e.target.value;
        setSelectedDivision(division);
        setSelectedDistrict("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userProfile?.firebaseUID) {
            Swal.fire("ত্রুটি", "ব্যবহারকারীর তথ্য পাওয়া যায়নি!", "error");
            return;
        }

        // Show loading alert
        Swal.fire({
            title: "আপডেট হচ্ছে...",
            text: "আপনার ঠিকানা আপডেট হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const payload = {
            division: selectedDivision,
            district: selectedDistrict,
            area,
            addressLine,
            postalCode,
        };

        try {
            const res = await axios.put(
                `https://bijoy-server-nu.vercel.app/api/users/address/${userProfile.firebaseUID}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.success) {
                Swal.fire("সফল!", "ঠিকানা সফলভাবে আপডেট হয়েছে!", "success");
            } else {
                Swal.fire("ব্যর্থ!", res.data.message || "আপডেট ব্যর্থ হয়েছে।", "error");
            }
        } catch (error) {
            console.error("ঠিকানা আপডেটে সমস্যা:", error);
            Swal.fire("ত্রুটি!", "সার্ভার ত্রুটির কারণে আপডেট করা যায়নি।", "error");
        }
    };




    const filteredDistricts = divisions.find(d => d.name === selectedDivision)?.districts || [];

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">ঠিকানা যোগ করুন</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Division Select */}
                <div>
                    <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">বিভাগ</label>
                    <select
                        id="division"
                        value={selectedDivision}
                        onChange={handleDivisionChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                        required
                    >
                        <option value="">-- বিভাগ নির্বাচন করুন --</option>
                        {divisions.map((division) => (
                            <option key={division.name} value={division.name}>
                                {division.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* District Select */}
                <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">জেলা</label>
                    <select
                        id="district"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                        required
                        disabled={!selectedDivision}
                    >
                        <option value="">-- জেলা নির্বাচন করুন --</option>
                        {filteredDistricts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Area Input */}
                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">এলাকা/উপজেলা</label>
                    <input
                        type="text"
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="আপনার এলাকা লিখুন"
                        required
                    />
                </div>

                {/* Postal Code */}
                <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">পোস্টাল কোড</label>
                    <input
                        type="text"
                        id="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="পোস্টাল কোড লিখুন"
                        required
                    />
                </div>

                {/* Address Line (Full width) */}
                <div className="md:col-span-2">
                    <label htmlFor="addressLine" className="block text-sm font-medium text-gray-700 mb-1">বিস্তারিত ঠিকানা</label>
                    <textarea
                        id="addressLine"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="বাড়ি নং, রোড নং, ব্লক, landmarks ইত্যাদি"
                        rows="3"
                        required
                    />
                </div>

                {/* Submit Button (Full width) */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold text-black"
                    >
                        ঠিকানা সংরক্ষণ করুন
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Address;
