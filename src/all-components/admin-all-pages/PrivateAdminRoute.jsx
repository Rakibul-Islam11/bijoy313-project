// PrivateAdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';

const PrivateAdminRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) {
                    setUserProfile(data.user);
                } else {
                    setUserProfile(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserProfile(null);
            } finally {
                setLoadingProfile(false);
            }
        } else {
            setLoadingProfile(false);
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
        }
    }, [user, loading]);

    if (loading || loadingProfile) {
        return <div className="text-center py-10 text-white">লোড হচ্ছে...</div>;
    }

    if (!user) {
        return <Navigate to="/admin" replace />;
    }

    if (!userProfile?.roles?.includes("admin")) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children; // Return children directly instead of <Outlet />
};

export default PrivateAdminRoute;
