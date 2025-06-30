import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import popupimg from '../../assets/popuplogin-img/Add a heading (1).gif';
import './signinup.css'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../auth-porvider-context/AuthContext";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const { signIn } = useContext(authContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                
        })
        
    };

    return (
        <div className="bg-blue-100 h-screen">
            <div className="flex justify-center items-center ">
                <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto rounded-2xl overflow-hidden mt-5 gap-4 md:gap-0 shadow-2xl">
                    {/* Left Section - Same as before */}
                    <div className="w-full lg:w-[50%] hidden md:block">
                        <div className="bg-[#f7f3ea] p-4 rounded-l-2xl rounded-r-none  h-full w-full flex flex-col">
                            <div className="mt-auto">
                                <img
                                    src={popupimg}
                                    alt="Working Woman"
                                    className="rounded-lg w-full h-[350px]  object-contain mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Right Section - Modified for login */}
                    <div className="w-full lg:w-[50%]   for_loghead_font px-3 md:px-0">
                        <div className="bg-white p-4 rounded-2xl md:rounded-none md:rounded-tr-2xl md:rounded-br-2xl w-full">


                            <h2 className="text-lg font-bold mb-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent for_loghead_font">
                                Login to your account
                            </h2>

                            {/* Error message display */}
                            {error && (
                                <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-md">
                                    {error}
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="mt-5 text-sm">
                                <div className="mb-3">
                                    <label className="block mb-1 text-gray-700">E-Mail*</label>
                                    <input
                                        type="email"
                                        placeholder="email or phone number"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                    <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                                </div>

                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-sm hover:shadow-md font-semibold"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            {/* Social Login - Same as before */}
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
                                    {/* Google Login Button */}
                                    <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-md bg-white hover:bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200 w-full">
                                        <FcGoogle className="h-6 w-6" />
                                        <span className="text-[13px]  text-gray-700">Google</span>
                                    </button>

                                    {/* Facebook Login Button */}
                                    <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-md bg-white hover:bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200 w-full">
                                        <FaFacebookF className="h-6 w-6 text-blue-600" />
                                        <span className=" text-[13px]  text-gray-700">Facebook</span>
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