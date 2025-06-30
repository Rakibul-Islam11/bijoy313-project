import { FaEye, FaEyeSlash } from "react-icons/fa";
import popupimg from '../../assets/popuplogin-img/White and Blue Creative 3D Work From Home Instagram Post.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './signinup.css'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../auth-porvider-context/AuthContext";
import Swal from 'sweetalert2';
import axios from 'axios';

const SignInUp = () => {
    const [userType, setUserType] = useState('freelancer');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        referCode: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        referCode: ''
    });
    const [termsChecked, setTermsChecked] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const { createUser, updateUserProfile, sendVerificationEmail } = useContext(authContext);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handlePhoneChange = (value, country) => {
        setPhone(value);
        setFormData({
            ...formData,
            phone: `+${value}`
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: '',
            email: '',
            password: '',
            phone: '',
            referCode: ''
        };

        if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        if (!phone) {
            newErrors.phone = 'Phone number is required';
            valid = false;
        } else if (phone.length < 5) {
            newErrors.phone = 'Please enter a valid phone number';
            valid = false;
        }

        if (userType === 'freelancer' && formData.referCode && formData.referCode.length < 9) {
            newErrors.referCode = 'Must be 9 characters';
            valid = false;
        }

        if (!termsChecked) {
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const generateRandomCode = () => {
        const prefix = 'bijoy';
        const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 1000 - 9999
        return prefix + randomNumbers;
    };

    const generateUniqueReferralCode = async () => {
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
            const newCode = generateRandomCode();

            try {
                const response = await axios.get(`http://localhost:4000/users/check-referral/${newCode}`);

                if (!response.data.exists) {
                    return newCode; // Found a unique code
                }

                attempts++;
            } catch (error) {
                console.error('Error checking referral code:', error);
                attempts++;
            }
        }

        // If all attempts fail, fallback to timestamp-based code
        return 'bijoy' + Date.now().toString().slice(-4);
    };

    const saveUserToDatabase = async (userData) => {
        try {
            const response = await axios.post('http://localhost:4000/users', userData);
            return response.data;
        } catch (error) {
            console.error('Error saving user to database:', error);
            throw error;
        }
    };

    const handleSendVerification = async () => {
        try {
            await sendVerificationEmail();
            setVerificationSent(true);
            Swal.fire({
                icon: 'success',
                title: 'Verification Email Sent',
                text: 'Please check your email inbox and verify your email address.',
            });
        } catch (error) {
            console.error('Error sending verification email:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Send Verification',
                text: error.message || 'An error occurred while sending verification email',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        if (validateForm()) {
            setIsLoading(true);

            try {
                // Create user in Firebase
                const userCredential = await createUser(formData.email, formData.password);
                const user = userCredential.user;

                // Generate unique referral code for the user
                const referralCode = await generateUniqueReferralCode();

                // Prepare user data for MongoDB
                const userData = {
                    userType,
                    displayName: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    passwordHash: user.uid,
                    photoURL: "https://i.ibb.co/h1m0f8yD/Untitled-design-1.png",
                    referralCode,
                    referredBy: formData.referCode || null,
                    isOtpVerified: false,
                    isVerifiedMember: false,
                    verifiedByCourseId: null,
                    isActiveMember: false,
                    roles: ["user"],
                    joinedAt: new Date(),
                    lastLogin: null,
                    wallet: {
                        main: 0,
                        leadershipFund: 0,
                        microJobIncome: 0,
                        referralIncome: 0,
                        donatedAmount: 0
                    },
                    bankInfo: {
                        bkash: "",
                        nagad: "",
                        accountName: ""
                    },
                    kyc: {
                        status: "pending",
                        documents: []
                    },
                    purchasedCourses: [],
                    firebaseUID: user.uid
                };

                // Save user to MongoDB
                await saveUserToDatabase(userData);

                // Update user profile in Firebase
                await updateUserProfile(formData.name, "https://i.ibb.co/h1m0f8yD/Untitled-design-1.png", referralCode);

                // Show success message and open verification popup
                setVerificationEmail(formData.email);
                setShowVerificationPopup(true);

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    referCode: ''
                });
                setPhone('');
            } catch (error) {
                console.error('Registration error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message || 'An error occurred during registration',
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="bg-blue-100 h-screen">
            {/* Verification Popup */}
            {showVerificationPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4 text-center">Verify Your Email</h3>
                        <p className="mb-4 text-gray-600">
                            A verification email will be sent to:
                        </p>
                        <input
                            type="email"
                            value={verificationEmail}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 text-center font-medium"
                            readOnly
                            onFocus={(e) => e.target.select()}
                        />
                        {verificationSent ? (
                            <div className="text-center text-green-600 mb-4">
                                Verification email sent! Please check your inbox.
                            </div>
                        ) : (
                            <button
                                onClick={handleSendVerification}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                            >
                                Send Verification Email
                            </button>
                        )}
                        <button
                            onClick={() => setShowVerificationPopup(false)}
                            className="w-full mt-3 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200 font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto rounded-2xl overflow-hidden gap-4 md:gap-0 pt-5 shadow-2xl">
                {/* Left Section */}
                <div className="w-full lg:w-[50%] hidden md:block">
                    <div className="bg-white rounded-tl-2xl rounded-bl-2xl rounded-tr-none rounded-br-none h-full w-full flex flex-col ">
                        <div className="mt-auto">
                            <img
                                src={popupimg}
                                alt="Working Woman"
                                className="rounded-lg w-full object-contain mx-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-[50%] for_loghead_font">
                    <div className="bg-white p-4 rounded-r-2xl rounded-l-none pb-8 w-full">
                        <h2 className="text-lg font-bold mb-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent for_loghead_font">
                            Join as a freelancer or client
                        </h2>

                        {/* User Type Selection */}
                        <div className="flex justify-center gap-2">
                            {['freelancer', 'client'].map(type => (
                                <label key={type}
                                    className={`px-3 py-1.5 border rounded-md cursor-pointer transition-all text-sm ${userType === type ? 'border-blue-500 bg-blue-50 shadow-inner text-blue-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        checked={userType === type}
                                        onChange={() => setUserType(type)}
                                        className="hidden"
                                    />
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Two Column Form */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm">
                            <div>
                                <label className="block mb-1 text-gray-700">Full Name*</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-2 py-1.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-500`}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <div className="flex flex-row items-center">
                                    <label className="block mb-1 text-gray-700">E-Mail*</label>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-2 py-1.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-500`}
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block mb-1 text-gray-700">Mobile*</label>
                                <PhoneInput
                                    country={'bd'}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    inputProps={{
                                        required: true,
                                        name: 'phone'
                                    }}
                                    inputStyle={{
                                        width: '100%',
                                        height: '36px',
                                        border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        paddingLeft: '50px',
                                        fontSize: '14px',
                                        color: 'gray'
                                    }}
                                    buttonStyle={{
                                        border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                                        borderRight: 'none',
                                        borderRadius: '0.375rem 0 0 0.375rem',
                                        backgroundColor: '#f3f4f6',
                                        height: '36px',
                                        color: 'gray'
                                    }}
                                />

                            </div>

                            <div className="relative">
                                <label className="block mb-1 text-gray-700">Password*</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-2 py-1.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-500 pr-8`}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            {userType === 'freelancer' && (
                                <div>
                                    <div className="flex flex-row items-start justify-start gap-2">
                                        <label className="block mb-1 text-gray-700">Refer Code</label>
                                        {errors.referCode && <p className="text-red-500 text-xs mt-1">{errors.referCode}</p>}
                                    </div>

                                    <input
                                        type="text"
                                        name="referCode"
                                        placeholder="Referral code (optional)"
                                        value={formData.referCode}
                                        onChange={handleChange}
                                        className={`w-full px-2 py-1.5 border ${errors.referCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-500`}
                                    />

                                </div>
                            )}

                            <div className="sm:col-span-2 flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={termsChecked}
                                    onChange={(e) => setTermsChecked(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 mt-0.5 mr-2 rounded"
                                    required
                                />
                                <div className="flex flex-row gap-4">
                                    <label htmlFor="terms" className="text-gray-700 text-xs">
                                        I agree to all policies
                                    </label>
                                    {!termsChecked && (
                                        <p className="text-red-500 text-xs">You must agree to the terms</p>
                                    )}
                                </div>

                            </div>


                            <div className="sm:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-sm hover:shadow-md font-semibold flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        'Register Now'
                                    )}
                                </button>
                            </div>
                        </form>

                        <Link to={"/sign-in"}>
                            <p className="mt-4 text-center text-gray-500 text-md">
                                Have an account? <a href="#" className="font-medium text-blue-600 hover:underline">Login</a>
                            </p>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInUp;