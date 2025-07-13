import { FaChartBar, FaMoneyBillWave, FaBriefcase, FaBookOpen, FaUsers } from "react-icons/fa";

const Sidebar = ({ active, setActive, isMobile, onClose }) => {
    const navItems = [
        { id: "overview", icon: <FaChartBar />, label: "Overview" },
        { id: "earnings", icon: <FaMoneyBillWave />, label: "Earnings" },
        { id: "jobs", icon: <FaBriefcase />, label: "Jobs" },
        { id: "courses", icon: <FaBookOpen />, label: "Courses" },
        { id: "referrals", icon: <FaUsers />, label: "Referrals" },
    ];

    return (
        <div className={`${isMobile ? 'py-2' : 'h-full bg-white/80 backdrop-blur-md'} p-4`}>
            {/* ✅ User Profile Section */}
            <div className="flex items-center space-x-3 mb-6 text-black">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    {/* Replace with actual user image */}
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="User profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">Jane Doe</h3>
                    <p className="text-xs text-gray-500">Premium Member</p>
                </div>
            </div>

            {/* ✅ Navigation Links */}
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            if (isMobile && onClose) onClose();
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${active === item.id
                                ? 'bg-[#c5064f] text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <span className={`text-lg ${active === item.id ? 'text-white' : 'text-[#c5064f]'}`}>
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
