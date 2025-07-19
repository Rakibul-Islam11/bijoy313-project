import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { authContext } from "../auth-porvider-context/AuthContext";

const VerificationPopup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [verificationMethod, setVerificationMethod] = useState('email');
    const [verificationSent, setVerificationSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const { sendVerificationEmail } = useContext(authContext);

    const { verificationEmail, verificationPhone } = location.state || {
        verificationEmail: '',
        verificationPhone: ''
    };

    useEffect(() => {
        if (verificationMethod !== 'email') return;

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const interval = setInterval(() => {
            user.reload().then(() => {
                if (user.emailVerified) {
                    clearInterval(interval);
                    axios.patch('https://bijoy-server.vercel.app/users/verify-user', {
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
                        }).then(() => {
                            navigate('/home');
                        });
                    }).catch(error => {
                        console.error('Error updating verification status:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Verification Error',
                            text: 'Failed to update verification status'
                        });
                    });
                }
            }).catch(error => {
                console.error("Error reloading user:", error);
                clearInterval(interval);
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [verificationMethod, navigate]);

    const sendOtpToPhone = async (phoneNumber) => {
        try {
            setOtpError('');
            const response = await axios.post('https://bijoy-server.vercel.app/api/send-otp', {
                phoneNumber: phoneNumber
            });

            if (response.data.success) {
                setVerificationSent(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error sending OTP:', error);
            Swal.fire({
                icon: 'error',
                title: 'OTP Sending Failed',
                text: 'Failed to send OTP. Please try again later.'
            });
            return false;
        }
    };

    const verifyOtp = async () => {
        try {
            if (!otp || otp.length !== 6) {
                setOtpError('Please enter a valid 6-digit OTP');
                return;
            }

            const verificationResponse = await axios.post('https://bijoy-server.vercel.app/api/verify-otp', {
                phoneNumber: verificationPhone,
                otp: otp
            });

            if (verificationResponse.data.success) {
                await axios.patch('https://bijoy-server.vercel.app/users/verify-user', {
                    email: verificationEmail,
                    verificationMethod: 'phone',
                    isVerified: true
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Verification Successful!',
                    text: 'Your phone number has been verified successfully.',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/home');
                });
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
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    await sendVerificationEmail(user);
                }
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
                    Swal.fire({
                        icon: 'success',
                        title: 'OTP Sent',
                        text: 'OTP has been sent to your phone number',
                    });
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

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setOtp(value);
        setOtpError('');
    };

    return (
        <div className="bg-gray-50 flex flex-col mt-4">
            <header className="bg-white shadow-sm py-3">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        ← Back to Home
                    </button>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center py-4 px-4">
                <div className="w-full max-w-md mx-auto">
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 mb-1">Account Verification</h1>
                        <p className="text-gray-600 text-sm">Verify your account to continue</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                        <div className="flex justify-center gap-3 mb-4">
                            <button
                                onClick={() => setVerificationMethod('email')}
                                className={`px-3 py-1.5 rounded-md text-sm ${verificationMethod === 'email' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </div>
                            </button>
                            <button
                                onClick={() => setVerificationMethod('phone')}
                                className={`px-3 py-1.5 rounded-md text-sm ${verificationMethod === 'phone' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Phone
                                </div>
                            </button>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-md mb-4">
                            <p className="text-xs text-gray-600 mb-1">
                                {verificationMethod === 'email' ? 'Email address:' : 'Phone number:'}
                            </p>
                            <div className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                                <p className="font-medium text-gray-800 text-sm">
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {!verificationSent ? (
                            <button
                                onClick={handleSendVerification}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-3 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-medium text-sm shadow-md flex items-center justify-center gap-1"
                            >
                                {verificationMethod === 'email' ? (
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Verification Email
                                    </div>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Send OTP
                                    </>
                                )}
                            </button>
                        ) : verificationMethod === 'phone' ? (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Enter 6-digit OTP sent to {verificationPhone}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={6}
                                        className={`w-full px-3 py-2 border ${otpError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 text-center text-base text-gray-700 font-semibold`}
                                        value={otp}
                                        onChange={handleOtpChange}
                                        placeholder="Enter OTP"
                                    />
                                    {otpError && (
                                        <p className="text-red-500 text-xs mt-1">{otpError}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={verifyOtp}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition duration-200 font-medium text-sm shadow-md flex items-center justify-center gap-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Verify OTP
                                    </button>
                                    <button
                                        onClick={handleSendVerification}
                                        className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md transition duration-200 font-medium text-sm flex items-center justify-center"
                                        title="Resend OTP"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    Didn't receive OTP? <button
                                        onClick={handleSendVerification}
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        Resend
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-3">
                                <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full mb-2 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Verification Email Sent!
                                </div>
                                <p className="text-gray-600 text-sm">Please check your inbox and follow the instructions to verify your email address.</p>
                                <p className="text-xs text-gray-500 mt-1">You will be redirected automatically once verification is complete.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VerificationPopup;