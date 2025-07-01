
import { FaEye, FaEyeSlash } from "react-icons/fa";
import popupimg from '../../assets/popuplogin-img/White and Blue Creative 3D Work From Home Instagram Post.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './signinup.css'
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { auth, authContext } from "../auth-porvider-context/AuthContext";
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
    const [verificationPhone, setVerificationPhone] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationMethod, setVerificationMethod] = useState('email');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const { createUser, updateUserProfile, sendVerificationEmail } = useContext(authContext);

    // Check email verification status periodically
    useEffect(() => {
        if (!showVerificationPopup || verificationMethod !== 'email') return;

        const interval = setInterval(() => {
            const user = auth.currentUser;
            if (user) {
                user.reload().then(() => {
                    if (user.emailVerified) {
                        clearInterval(interval);
                        // Update backend that email is verified
                        axios.patch('http://localhost:4000/users/verify-user', {
                            email: user.email,
                            verificationMethod: 'email',
                            isVerified: true
                        }).then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Email Verified!',
                                text: 'Your email has been verified successfully.',
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setShowVerificationPopup(false);
                        }).catch(error => {
                            console.error('Error updating verification status:', error);
                        });
                    }
                });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [showVerificationPopup, verificationMethod]);

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
        const randomNumbers = Math.floor(1000 + Math.random() * 9000);
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
                    return newCode;
                }

                attempts++;
            } catch (error) {
                console.error('Error checking referral code:', error);
                attempts++;
            }
        }

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

    const sendOtpToPhone = async (phoneNumber) => {
        try {
            setOtpError('');
            const newOtp = Math.floor(100000 + Math.random() * 900000);
            setGeneratedOtp(newOtp.toString());

            const message = `Your bijoy-313 verification OTP is: ${newOtp}`;

            const response = await axios.get(`http://bulksmsbd.net/api/smsapi`, {
                params: {
                    api_key: 'bFmnZedJjsrnK1pL9LZU',
                    type: 'text',
                    number: phoneNumber.replace('+', ''),
                    senderid: '8809617627038',
                    message: message
                }
            });

            if (response.data) {
                setVerificationSent(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error sending OTP:', error);
            return false;
        }
    };

    const verifyOtp = async () => {
        try {
            if (!otp || otp.length !== 6) {
                setOtpError('Please enter a valid 6-digit OTP');
                return;
            }

            if (otp === generatedOtp) {
                // Update user verification status in backend
                try {
                    await axios.patch('http://localhost:4000/users/verify-user', {
                        email: verificationEmail,
                        verificationMethod: 'phone',
                        isVerified: true
                    });

                    setShowVerificationPopup(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Verification Successful!',
                        text: 'Your phone number has been verified successfully.',
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    console.error('Error updating verification status:', error);
                    setOtpError('Verification update failed. Please try again.');
                }
            } else {
                setOtpError('Wrong OTP. Please try again.');
            }
        } catch (error) {
            setOtpError('Verification failed. Please try again.');
            console.error('OTP verification error:', error);
        }
    };

    const handleSendVerification = async () => {
        if (verificationMethod === 'email') {
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
        } else {
            try {
                const success = await sendOtpToPhone(verificationPhone);
                if (success) {
                    setVerificationSent(true);
                } else {
                    throw new Error('Failed to send OTP');
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Send OTP',
                    text: error.message || 'An error occurred while sending OTP',
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        if (validateForm()) {
            setIsLoading(true);

            try {
                // প্রথমে MongoDB-তে ফোন নাম্বার চেক করুন
                const checkPhoneResponse = await axios.post('http://localhost:4000/users/check-phone', {
                    phone: formData.phone
                });

                // যদি ফোন নাম্বার ইতিমধ্যেই থাকে
                if (checkPhoneResponse.data.exists) {
                    throw {
                        response: {
                            status: 400,
                            data: {
                                field: 'phone',
                                message: 'Phone number already exists'
                            }
                        }
                    };
                }

                // Firebase authentication শুধুমাত্র তখনই করবেন যখন ফোন নাম্বার ইউনিক
                const userCredential = await createUser(formData.email, formData.password);
                const user = userCredential.user;

                const referralCode = await generateUniqueReferralCode();

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
                    emailVerified: false,
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

                await saveUserToDatabase(userData);
                await updateUserProfile(formData.name, "https://i.ibb.co/h1m0f8yD/Untitled-design-1.png", referralCode);

                setVerificationEmail(formData.email);
                setVerificationPhone(formData.phone);
                setShowVerificationPopup(true);

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

                // Firebase user তৈরি হয়ে গেলে তা ডিলিট করুন
                if (auth.currentUser) {
                    try {
                        await auth.currentUser.delete();
                    } catch (deleteError) {
                        console.error('Error deleting Firebase user:', deleteError);
                    }
                }

                if (error.response && error.response.status === 400) {
                    const { field, message } = error.response.data;

                    if (field === 'phone') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Phone Number Already Used',
                            text: 'The phone number you entered is already associated with another account. Please use a different phone number.',
                        });
                    } else if (field === 'email') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Email Already Used',
                            text: 'The email you entered is already associated with another account. Please use a different email.',
                        });
                    } else if (field === 'referralCode') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Referral Code Already Used',
                            text: 'The referral code you entered is already in use. Please use a different one.',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Registration Failed',
                            text: message || 'An error occurred during registration',
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: error.message || 'An error occurred during registration',
                    });
                }
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
                    <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl transform transition-all">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Account</h3>
                            <p className="text-gray-600 mb-6">Choose your preferred verification method</p>
                        </div>

                        {/* Verification Method Selection */}
                        <div className="flex justify-center gap-4 mb-6">
                            <button
                                onClick={() => setVerificationMethod('email')}
                                className={`px-4 py-2 rounded-lg transition-all ${verificationMethod === 'email' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </div>
                            </button>
                            <button
                                onClick={() => setVerificationMethod('phone')}
                                className={`px-4 py-2 rounded-lg transition-all ${verificationMethod === 'phone' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Phone
                                </div>
                            </button>
                        </div>

                        {/* Verification Details */}
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <p className="text-sm text-gray-600 mb-2">
                                {verificationMethod === 'email' ? 'Email address:' : 'Phone number:'}
                            </p>
                            <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                                <p className="font-medium text-gray-800">
                                    {verificationMethod === 'email' ? verificationEmail : verificationPhone}
                                </p>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(verificationMethod === 'email' ? verificationEmail : verificationPhone);
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Copied!',
                                            text: `${verificationMethod === 'email' ? 'Email' : 'Phone number'} copied to clipboard`,
                                            timer: 1500,
                                            showConfirmButton: false
                                        });
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {!verificationSent ? (
                            <button
                                onClick={handleSendVerification}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-medium shadow-md flex items-center justify-center gap-2"
                            >
                                {verificationMethod === 'email' ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Verification Email
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Send OTP
                                    </>
                                )}
                            </button>
                        ) : verificationMethod === 'phone' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit OTP sent to {verificationPhone}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={6}
                                        className={`w-full px-4 py-3 border ${otpError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-lg text-gray-700 font-semibold`}
                                        value={otp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setOtp(value);
                                            setOtpError('');
                                        }}
                                        placeholder="Enter OTP"
                                    />
                                    {otpError && (
                                        <p className="text-red-500 text-sm mt-1">{otpError}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={verifyOtp}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition duration-200 font-medium shadow-md flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Verify OTP
                                    </button>
                                    <button
                                        onClick={handleSendVerification}
                                        className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition duration-200 font-medium flex items-center justify-center"
                                        title="Resend OTP"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    Didn't receive OTP? <button
                                        onClick={handleSendVerification}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Resend
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Verification Email Sent!
                                </div>
                                <p className="text-gray-600">Please check your inbox and follow the instructions to verify your email address.</p>
                                <p className="text-sm text-gray-500 mt-2">This popup will close automatically once verification is complete.</p>
                            </div>
                        )}

                        <button
                            onClick={() => setShowVerificationPopup(false)}
                            className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition duration-200 font-medium"
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