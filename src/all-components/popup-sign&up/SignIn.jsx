import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import popupimg from '../../assets/popuplogin-img/Add a heading (1).gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './signinup.css';
import { authContext } from "../auth-porvider-context/AuthContext";


const SignIn = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useContext(authContext);
    const navigate = useNavigate();
    useEffect(() => {
        const savedEmailOrPhone = localStorage.getItem('rememberedEmailOrPhone');
        const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
        if (savedEmailOrPhone && savedRememberMe) {
            setEmailOrPhone(savedEmailOrPhone);
            setRememberMe(savedRememberMe);
        }
    }, []);

    const normalizePhoneNumber = (phone) => {
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.startsWith('880')) {
            return `+${digitsOnly}`;
        } else if (digitsOnly.startsWith('0')) {
            return `+880${digitsOnly.substring(1)}`;
        } else if (digitsOnly.length === 11 && !digitsOnly.startsWith('0') && !digitsOnly.startsWith('880')) {
            return `+880${digitsOnly}`;
        } else {
            return digitsOnly.startsWith('+') ? digitsOnly : `+${digitsOnly}`;
        }
    };

    const showSuccessAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            navigate("/home");
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (rememberMe) {
                localStorage.setItem('rememberedEmailOrPhone', emailOrPhone);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberedEmailOrPhone');
                localStorage.removeItem('rememberMe');
            }

            if (/^\+?\d+$/.test(emailOrPhone)) {
                const normalizedPhone = normalizePhoneNumber(emailOrPhone);
                const response = await axios.post('https://bijoy-server-nu.vercel.app/users/find-by-phone', {
                    phone: normalizedPhone
                });

                if (response.data.exists) {
                    const email = response.data.user.email;
                    await signIn(email, password)
                        .then(result => {
                            showSuccessAlert();

                        })
                        .catch(err => {
                            setError('Invalid password or account not found');
                        });
                } else {
                    const withoutCountryCode = normalizedPhone.replace(/^\+880/, '0');
                    const fallbackResponse = await axios.post('https://bijoy-server-nu.vercel.app/users/find-by-phone', {
                        phone: withoutCountryCode
                    });

                    if (fallbackResponse.data.exists) {
                        const email = fallbackResponse.data.user.email;
                        await signIn(email, password)
                            .then(result => {
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
                await signIn(emailOrPhone, password)
                    .then(result => {
                        showSuccessAlert();
                    })
                    .catch(err => {
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
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-blue-100 h-screen flex items-center justify-center">
            <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto    overflow-hidden md:shadow-2xl h-[400px] px-4 md:px-0 ">

                {/* Left Image Section */}
                <div className="w-full lg:w-1/2 hidden md:flex bg-[#f7f3ea] p-4 items-center justify-center">
                    <img src={popupimg} alt="Login Visual" className="w-full h-full object-contain" />
                </div>

                {/* Right Form Section */}
                <div className="w-full lg:w-1/2 bg-white p-6 flex flex-col justify-center rounded-2xl">
                    <h2 className="text-2xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ">
                        Login to your account
                    </h2>

                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="text-sm">
                        <div className="mb-3">
                            <label className="block mb-1 text-gray-700">E-Mail or Phone</label>
                            <input
                                type="text"
                                placeholder="email or phone number"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            />
                        </div>

                        <div className="mb-3 relative">
                            <label className="block mb-1 text-gray-700">Password*</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 pr-10 text-gray-900"
                                required
                            />
                            <span
                                className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 text-gray-700 text-xs">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/password-reset" className="text-xs text-blue-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-sm hover:shadow-md font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : 'Login'}
                        </button>
                    </form>

                    <Link to="/pop-up-sign">
                        <p className="mt-5 text-center text-gray-500 text-md">
                            Not a member? <span className="font-medium text-blue-600 hover:underline">Register here</span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
