import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "../auth-porvider-context/AuthContext";

export const GetUserInfoContext = createContext();

const GetUserInfo = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const [userProfile, setUserProfile] = useState(null);

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server-nu.vercel.app/users/by-uid/${user.uid}`);
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

    const serveData = {
        userProfile
    };
    return (

        <GetUserInfoContext.Provider value={serveData}>
            {children}
        </GetUserInfoContext.Provider>
    );
};

export default GetUserInfo;
