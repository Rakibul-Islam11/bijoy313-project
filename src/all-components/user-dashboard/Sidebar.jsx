import { Link } from 'react-router-dom';
import { FaChartBar, FaMoneyBillWave, FaBriefcase, FaBookOpen, FaUsers, FaHistory } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';

const Sidebar = ({ active, isMobile, onClose }) => {
    const { user, loading } = useContext(authContext);
    const [userProfile, setUserProfile] = useState(null);
    const navItems = [
        { id: "overview", icon: <FaChartBar />, label: "Overview" },
        { id: "earnings", icon: <FaMoneyBillWave />, label: "Earnings" },
        { id: "jobs", icon: <FaBriefcase />, label: "Jobs" },
        { id: "courses", icon: <FaBookOpen />, label: "Courses" },
        { id: "referrals", icon: <FaUsers />, label: "Referrals" },
        { id: "history", icon: <FaHistory />, label: "History" },
    ];
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

            // Set Interval for polling
            const interval = setInterval(() => {
                fetchUserData();
            }, 2000); // every 5 seconds

            return () => clearInterval(interval);
        }
    }, [user, loading]);
    return (
        <div className={`${isMobile ? 'py-2' : 'h-full bg-white/80 backdrop-blur-md'} p-4`}>
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 mb-6 text-black">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <img
                        src={userProfile?.photoURL}
                        alt="User profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">{userProfile?.displayName}</h3>
                    {userProfile?.payment == "unpaid" ? <p className="text-xs text-gray-500">Unverified Member</p > : <p className="text-xs text-gray-500">Verified Member</p>}

                </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        to={`/dashboard?section=${item.id}`}
                        className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${active === item.id
                            ? 'bg-[#c5064f] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        onClick={() => {
                            if (isMobile && onClose) onClose();
                        }}
                    >
                        <span className={`text-lg ${active === item.id ? 'text-white' : 'text-[#c5064f]'}`}>
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;