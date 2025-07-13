const ClientSidebar = ({ active, setActive }) => {
    const menuItems = [
        { key: "overview", label: "Overview" },
        { key: "post-job", label: "Post Job" },
        { key: "orders", label: "Active Orders" },
        { key: "freelancers", label: "Freelancers" },
        { key: "settings", label: "Settings" },
    ];

    return (
        <div className="w-[220px] bg-white border-r p-4 shadow-sm text-black">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    {/* Replace with your actual user image */}
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="User profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold">Jane Doe</h3>
                    <p className="text-xs text-gray-500">Premium Member</p>
                </div>
            </div>
            <ul className="space-y-3">
                {menuItems.map((item) => (
                    <li
                        key={item.key}
                        onClick={() => setActive(item.key)}
                        className={`cursor-pointer px-3 py-2 rounded-lg font-medium transition ${active === item.key
                                ? "bg-[#c5064f]/10 text-[#c5064f] font-bold"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientSidebar;
