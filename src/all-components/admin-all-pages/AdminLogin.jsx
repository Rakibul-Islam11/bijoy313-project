import { useContext, useEffect, useState } from "react";
import { authContext } from "../auth-porvider-context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const { user, loading } = useContext(authContext);
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) {
                    setUserProfile(data.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
            const interval = setInterval(() => {
                fetchUserData();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [user, loading]);

    useEffect(() => {
        if (userProfile && userProfile.roles?.includes("admin")) {
            navigate("/admin-panel");
        }
    }, [userProfile, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel Access</h1>

                {/* 1. User not logged in */}
                {!user && (
                    <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        onClick={() => navigate("/pop-up-sign")}
                    >
                        You are not registered. Sign up now
                    </button>
                )}

                {/* 2. Logged in but only has 'user' role */}
                {user && userProfile && userProfile.roles?.includes("user") && !userProfile.roles.includes("admin") && (
                    <button
                        className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-600 transition"
                        onClick={() => alert("Request sent to admin! (dummy action)") /* implement actual request logic */}
                    >
                        Request for Admin
                    </button>
                )}

                {/* Optional: Loading spinner */}
                {user && !userProfile && (
                    <p className="text-gray-500">Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
