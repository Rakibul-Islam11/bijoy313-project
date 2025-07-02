import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import popupimg from '../../assets/popuplogin-img/Add a heading (1).gif';
import './signinup.css'
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { authContext } from "../auth-porvider-context/AuthContext";
import Swal from 'sweetalert2';

const SignIn = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useContext(authContext);

    // Load saved credentials on component mount
    useEffect(() => {
        const savedEmailOrPhone = localStorage.getItem('rememberedEmailOrPhone');
        const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

        if (savedEmailOrPhone && savedRememberMe) {
            setEmailOrPhone(savedEmailOrPhone);
            setRememberMe(savedRememberMe);
        }
    }, []);

    const normalizePhoneNumber = (phone) => {
        // Remove all non-digit characters
        const digitsOnly = phone.replace(/\D/g, '');

        // If starts with country code (880 for Bangladesh), return as is
        if (digitsOnly.startsWith('880')) {
            return `+${digitsOnly}`;
        }
        // If starts with 0 (like 017...), assume it's Bangladesh number and add +880
        else if (digitsOnly.startsWith('0')) {
            return `+880${digitsOnly.substring(1)}`;
        }
        // If 11 digits without 0 or country code (like 173...), assume it's Bangladesh number
        else if (digitsOnly.length === 11 && !digitsOnly.startsWith('0') && !digitsOnly.startsWith('880')) {
            return `+880${digitsOnly}`;
        }
        // For other cases, return with + prefix if not already present
        else {
            return digitsOnly.startsWith('+') ? digitsOnly : `+${digitsOnly}`;
        }
    };

    const showSuccessAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                // Keep the callback but don't add the hover events
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Save credentials if "Remember Me" is checked
            if (rememberMe) {
                localStorage.setItem('rememberedEmailOrPhone', emailOrPhone);
                localStorage.setItem('rememberMe', 'true');
            } else {
                // Clear saved credentials if "Remember Me" is unchecked
                localStorage.removeItem('rememberedEmailOrPhone');
                localStorage.removeItem('rememberMe');
            }

            // First check if the input is a phone number (contains only numbers and +)
            if (/^\+?\d+$/.test(emailOrPhone)) {
                // Normalize the phone number format
                const normalizedPhone = normalizePhoneNumber(emailOrPhone);

                // It's a phone number, find the corresponding email
                const response = await axios.post('https://bijoy-server.vercel.app/users/find-by-phone', {
                    phone: normalizedPhone
                });

                if (response.data.exists) {
                    // Sign in with the email associated with this phone
                    const email = response.data.user.email;
                    await signIn(email, password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);
                            showSuccessAlert();
                        })
                        .catch(err => {
                            setError('Invalid password or account not found');
                        });
                } else {
                    // If not found with country code, try without (for backward compatibility)
                    const withoutCountryCode = normalizedPhone.replace(/^\+880/, '0');
                    const fallbackResponse = await axios.post('https://bijoy-server.vercel.app/users/find-by-phone', {
                        phone: withoutCountryCode
                    });

                    if (fallbackResponse.data.exists) {
                        const email = fallbackResponse.data.user.email;
                        await signIn(email, password)
                            .then(result => {
                                const user = result.user;
                                console.log(user);
                                showSuccessAlert();
                            })
                            .catch(err => {
                                setError('Invalid password or account not found');
                            });
                    } else {
                        setError('Phone number not registered');
                    }
                }
            } else {
                // Treat as email
                await signIn(emailOrPhone, password)
                    .then(result => {
                        const user = result.user;
                        console.log(user);
                        showSuccessAlert();
                    })
                    .catch(err => {
                        console.error(err);
                        if (err.code === 'auth/user-not-found') {
                            setError('Account not found');
                        } else if (err.code === 'auth/wrong-password') {
                            setError('Incorrect password');
                        } else {
                            setError('Login failed. Please try again.');
                        }
                    });
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-blue-100 h-screen">
            <div className="flex justify-center items-center ">
                <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto rounded-2xl overflow-hidden mt-5 gap-4 md:gap-0 shadow-2xl">
                    {/* Left Section */}
                    <div className="w-full lg:w-[50%] hidden md:block">
                        <div className="bg-[#f7f3ea] p-4 rounded-l-2xl rounded-r-none h-full w-full flex flex-col">
                            <div className="mt-auto">
                                <img
                                    src={popupimg}
                                    alt="Working Woman"
                                    className="rounded-lg w-full h-[350px] object-contain mx-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:w-[50%] for_loghead_font px-3 md:px-0">
                        <div className="bg-white p-4 rounded-2xl md:rounded-none md:rounded-tr-2xl md:rounded-br-2xl w-full">
                            <h2 className="text-lg font-bold mb-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent for_loghead_font">
                                Login to your account
                            </h2>

                            {error && (
                                <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-md">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-5 text-sm">
                                <div className="mb-3">
                                    <label className="block mb-1 text-gray-700">E-Mail or Phone</label>
                                    <input
                                        type="text"
                                        placeholder="email or phone number (with or without +880)"
                                        value={emailOrPhone}
                                        onChange={(e) => setEmailOrPhone(e.target.value)}
                                        className="w-full px-2 text-gray-500 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block mb-1 text-gray-700">Password*</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 mt-0.5 mr-2 rounded"
                                        />
                                        <label htmlFor="remember" className="text-gray-700 text-xs">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to={"/password-reset"} className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
                                </div>

                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-sm hover:shadow-md font-semibold flex justify-center items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : 'Login'}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-4">
                                <div className="relative my-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="px-2 bg-white text-gray-400">Or continue with</span>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3 mt-4">
                                    <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-md bg-white hover:bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200 w-full">
                                        <FcGoogle className="h-6 w-6" />
                                        <span className="text-[13px] text-gray-700">Google</span>
                                    </button>

                                    <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-md bg-white hover:bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200 w-full">
                                        <FaFacebookF className="h-6 w-6 text-blue-600" />
                                        <span className="text-[13px] text-gray-700">Facebook</span>
                                    </button>
                                </div>
                            </div>
                            <Link to={"/pop-up-sign"}>
                                <p className="mt-4 text-center text-gray-500 text-md">
                                    Not a member? <a href="#" className="font-medium text-blue-600 hover:underline">Register here</a>
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;