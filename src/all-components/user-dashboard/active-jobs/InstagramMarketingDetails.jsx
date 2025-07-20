import { useContext, useState, useEffect, useCallback } from "react";
import { FaWhatsapp, FaUser, FaHashtag, FaComment, FaArrowRight, FaGem, FaCoins, FaArrowLeft } from "react-icons/fa";
import { MdPayment, MdVerifiedUser, MdOutlineDiscount } from "react-icons/md";
import { RiShieldCheckFill, RiInstagramFill } from "react-icons/ri";
import instaBanner from '../../../assets/banner-img/instagram-banner (1).webp';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../auth-porvider-context/AuthContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { activeJobContext } from "../../all-contexts/ActiveJobContext";

const MySwal = withReactContent(Swal);

const InstagramMarketingDetails = () => {
    const { user, loading: authLoading } = useContext(authContext);
    const { totalBalance } = useContext(activeJobContext);
    const [quantity, setQuantity] = useState(1);
    const unitPrice = 3;
    const totalPrice = (quantity * unitPrice).toFixed(2);
    const [note, setNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [showEarningLimitAlert, setShowEarningLimitAlert] = useState(false);
    const navigate = useNavigate();

    const showEarningLimitWarning = useCallback(() => {
        MySwal.fire({
            icon: 'info',
            title: 'ইনকাম লিমিট অতিক্রম',
            html: `
                <div class="text-left">
                    <p>আপনি ফ্রি ইনকাম এর সীমা (৳200) পার করে ফেলেছেন!</p>
                    <p class="mt-2">আনলিমিটেড ইনকাম করতে ডিপোজিট করুন</p>
                    <p class="mt-2">(শুধুমাত্র দুই দিনের মদ্ধে পেইড মেম্বারশিপ নিতে পারবেন মাত্র ২১৩ টাকা)</p>
                </div>
            `,
            confirmButtonText: '২১৩ টাকা ডিপোজিট করুন',
            showCancelButton: true,
            cancelButtonText: 'পরে করবো',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/verify-alert');
            }
        });
    }, [navigate]);

    const fetchUserData = useCallback(async () => {
        if (!user) return;

        try {
            const response = await axios.get(`https://bijoy-server.vercel.app/users/by-uid/${user.uid}`);

            if (response.data.success) {
                setUserProfile(prev => {
                    // Only update if payment status changed
                    if (!prev || prev.payment !== response.data.user.payment) {
                        return response.data.user;
                    }
                    return prev;
                });

                // Check if user has crossed earning limit and not paid
                if (totalBalance >= 200 && response.data.user.payment === "unpaid" && !showEarningLimitAlert) {
                    setShowEarningLimitAlert(true);
                    showEarningLimitWarning();
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setProfileLoading(false);
        }
    }, [user, totalBalance, showEarningLimitAlert, showEarningLimitWarning]);

    useEffect(() => {
        if (!authLoading) {
            fetchUserData(); // Initial load

            // Set up interval with cleanup (30 seconds interval)
            const interval = setInterval(fetchUserData, 1000);
            return () => clearInterval(interval);
        }
    }, [authLoading, fetchUserData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!user) {
            MySwal.fire({
                icon: 'error',
                title: 'লগইন প্রয়োজন',
                text: 'আপনাকে প্রথমে লগইন করতে হবে।',
                confirmButtonText: 'ঠিক আছে'
            });
            return;
        }

        // Check if user has crossed earning limit (200) and is unpaid
        if (totalBalance >= 200 && userProfile?.payment === "unpaid") {
            showEarningLimitWarning();
            return;
        }

        // If user is submitting beyond free limit, check payment status
        if (totalBalance >= 200 && userProfile?.payment !== "paid") {
            MySwal.fire({
                icon: 'info',
                title: 'প্রিমিয়াম মেম্বারশিপ প্রয়োজন',
                text: 'এই সার্ভিস ব্যবহার করতে আপনাকে প্রিমিয়াম মেম্বারশিপ এক্টিভেট করতে হবে',
                confirmButtonText: 'এক্টিভেট করুন',
                showCancelButton: true,
                cancelButtonText: 'বাতিল করুন'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/verify-alert');
                }
            });
            
            return;
        }

        // If everything is okay, proceed with submission
        setIsSubmitting(true);

        try {
            const token = await user.getIdToken();

            const jobData = {
                quantity,
                note,
                token,
                serviceType: 'Instagram Marketing',
                unitPrice,
                totalPrice,
                status: 'pending'
            };

            const res = await axios.post("https://bijoy-server.vercel.app/api/active-jobs", jobData);

            if (res.data.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'সফলভাবে সাবমিট হয়েছে!',
                    html: 'আপনার কাজের পরিমাণ সাবমিট করা হয়েছে। স্ট্যাটাস দেখতে আপনার ড্যাশবোর্ড চেক করুন।',
                    confirmButtonText: 'ঠিক আছে'
                });
                setQuantity(1);
                setNote("");
            } else {
                throw new Error(res.data.message || 'সাবমিট করতে ব্যর্থ হয়েছে।');
            }
        } catch (error) {
            console.error("Submit Error:", error);
            MySwal.fire({
                icon: 'error',
                title: 'সমস্যা হয়েছে',
                text: error.response?.data?.message || error.message || 'একটি সমস্যা হয়েছে',
                confirmButtonText: 'ঠিক আছে'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading || profileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
                <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-xl">লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-15 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 md:p-8 text-white flex justify-center items-center">
            {/* Back Button */}
            <Link
                to="/active-jobs"
                className="absolute top-18 left-2 z-50 group"
            >
                <div className="relative inline-flex items-center px-2 md:px-4 py-1 md:py-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/40 to-indigo-400/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10 font-medium">ফিরে যান</span>
                </div>
            </Link>

            {/* Main Container */}
            <div className="w-[100%] lg:w-[90%] mx-auto transform perspective-1000">
                {/* Banner Section */}
                <div className="relative mb-6 md:mb-12 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(236,72,153,0.4)] transition-all duration-700 group">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 z-10 mix-blend-overlay"></div>

                    {/* Banner Image */}
                    <div className="relative w-full h-41 md:h-[20rem] overflow-hidden group">
                        <img
                            src={instaBanner}
                            alt="Instagram Banner Blur"
                            className="absolute top-0 left-0 w-full h-full object-cover blur-sm scale-110 group-hover:scale-125 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                        <img
                            src={instaBanner}
                            alt="Instagram Banner"
                            className="relative w-full h-full object-contain z-10"
                        />
                    </div>

                    {/* Floating Instagram Logo */}
                    <div className="absolute bottom-8 left-8 z-20 w-10 md:w-20 h-10 md:h-20 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 group-hover:rotate-0 transition-all duration-500 hover:shadow-[0_0_30px_5px_rgba(224,36,255,0.5)]">
                        <RiInstagramFill className="text-4xl text-white drop-shadow-md" />
                        <div className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"></div>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-[118px] md:bottom-8 right-[-0px] md:right-8 z-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 px-2 md:px-5 py-3 rounded-xl font-bold flex items-center gap-3 shadow-xl hover:shadow-[0_0_20px_5px_rgba(234,179,8,0.4)] transition-all transform hover:scale-105">
                        <div className="relative">
                            <FaCoins className="text-xl animate-bounce" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-700 rounded-full animate-ping"></div>
                        </div>
                        <span className="text-[14px] md:text-lg">৳{unitPrice}/আইডি</span>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    {/* Form Card */}
                    <div className="bg-white/5 backdrop-blur-xl p-2 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden transform md:hover:-translate-y-3 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.4)]">
                        {/* Floating Particles */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/10 rounded-full filter blur-3xl animate-float"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl animate-float-delay"></div>
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl animate-float"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4 md:mb-8 md:pt-2">
                                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <FaGem className="text-white text-xl" />
                                    </div>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">
                                        সার্ভিস ফর্ম
                                    </span>
                                </h2>
                            </div>

                            {/* Pricing Calculator */}
                            <div className="bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-2xl border border-white/10 mb-8 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <MdPayment className="text-yellow-300 text-xl" />
                                    <span>মূল্য হিসাব</span>
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">একক মূল্য:</span>
                                        <span className="text-yellow-300 font-bold text-lg flex items-center">
                                            ৳ {unitPrice} <span className="text-xs ml-1 opacity-70">/আইডি</span>
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">পরিমাণ:</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-all border border-white/10 hover:border-pink-400/50 active:scale-95"
                                            >
                                                -
                                            </button>
                                            <span className="font-bold w-14 text-center text-lg bg-white/5 rounded-lg py-2 border border-white/10">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(q => q + 1)}
                                                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-all border border-white/10 hover:border-pink-400/50 active:scale-95"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                                        <span className="font-bold">মোট মূল্য:</span>
                                        <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-md">
                                            ৳ {totalPrice}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* WhatsApp Button */}
                                <div className="mb-4 md:mb-8 relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all duration-300 animate-tilt"></div>
                                    <a
                                        href="https://wa.me/yourwhatsapplink"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <FaWhatsapp className="text-2xl" />
                                        <span>হোয়াটসঅ্যাপে জমা দিন</span>
                                    </a>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-blue-400/50 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-transparent relative z-10">
                                        <FaHashtag className="mr-3 text-blue-300 text-lg" />
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                            className="flex-1 bg-transparent outline-none placeholder-white/50 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-purple-400/50 transition-all focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-transparent relative z-10">
                                        <FaComment className="mr-3 text-purple-300 text-lg" />
                                        <input
                                            type="text"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="বিশেষ নির্দেশনা (যদি থাকে)"
                                            className="flex-1 bg-transparent outline-none placeholder-white/50 text-white"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || (totalBalance >= 200 && userProfile?.payment === "unpaid")}
                                    className={`w-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white py-5 rounded-xl font-bold hover:from-pink-600 hover:via-purple-700 hover:to-blue-700 transition-all shadow-lg transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group ${isSubmitting || (totalBalance >= 200 && userProfile?.payment === "unpaid") ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="relative z-10">সাবমিট হচ্ছে...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="relative z-10 text-lg">সাবমিট করুন</span>
                                            <FaArrowRight className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300" />
                                        </>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-400/40 via-purple-400/40 to-blue-400/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Service Details Card */}
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden transform hover:-translate-y-3 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.4)]">
                        {/* Floating Particles */}
                        <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl animate-float-delay"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl animate-float"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <RiShieldCheckFill className="text-white text-xl" />
                                    </div>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
                                        সার্ভিস ডিটেইলস
                                    </span>
                                </h2>
                                <div className="hidden md:block text-sm bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                    <span className="opacity-80">গ্যারান্টি:</span> <span className="font-bold text-blue-300">১০০%</span>
                                </div>
                            </div>

                            <ul className="space-y-5 text-white/80">
                                {[
                                    "ইনস্টাগ্রাম আইডি তৈরি করে জমা দিলে প্রতি আইডিতে ৳২০ পাবেন",
                                    "আইডি অবশ্যই একটিভ এবং ভেরিফাইড হতে হবে (ভেরিফাইড না হলে গ্রহণযোগ্য হবে না)",
                                    "প্রতিদিন সর্বোচ্চ ১০টি আইডি জমা দিতে পারবেন (প্রতিটি আইডি আলাদা আলাদা নম্বর হতে হবে)",
                                    "পেমেন্ট ২৪ ঘন্টার মধ্যে হোয়াটসঅ্যাপ নম্বরে পাঠিয়ে দেওয়া হবে",
                                    "কাজের কোয়ালিটি চেক করার পরেই পেমেন্ট করা হবে (স্প্যাম/ফেক আইডি গ্রহণযোগ্য নয়)",
                                    "কোনো সমস্যা হলে হোয়াটসঅ্যাপে যোগাযোগ করুন (২৪/৭ সাপোর্ট)"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="w-7 h-7 bg-gradient-to-br from-blue-400/80 to-indigo-500/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-white/10 shadow-sm">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="flex-1">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Trust Badges */}
                            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <MdVerifiedUser className="text-2xl text-green-400" />
                                    <div>
                                        <div className="text-xs opacity-70">ভেরিফাইড</div>
                                        <div className="font-bold text-sm">অ্যাকাউন্ট</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MdOutlineDiscount className="text-2xl text-yellow-400" />
                                    <div>
                                        <div className="text-xs opacity-70">বোনাস</div>
                                        <div className="font-bold text-sm">প্রতি ১০ আইডিতে</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RiShieldCheckFill className="text-2xl text-blue-400" />
                                    <div>
                                        <div className="text-xs opacity-70">সুরক্ষিত</div>
                                        <div className="font-bold text-sm">লেনদেন</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCoins className="text-2xl text-purple-400" />
                                    <div>
                                        <div className="text-xs opacity-70">দ্রুত</div>
                                        <div className="font-bold text-sm">পেমেন্ট</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Styles for Animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float-delay {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(20px) rotate(-5deg); }
                }
                @keyframes tilt {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(1deg); }
                    75% { transform: rotate(-1deg); }
                }
                .animate-float { animation: float 8s ease-in-out infinite; }
                .animate-float-delay { animation: float-delay 10s ease-in-out infinite; }
                .animate-tilt { animation: tilt 5s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default InstagramMarketingDetails;