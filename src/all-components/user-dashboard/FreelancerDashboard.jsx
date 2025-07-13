import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";

const FreelancerDashboard = ({ userData }) => {
    const [activeSection, setActiveSection] = useState("overview");
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    // ধরলাম Sidebar এর মেনু অপশনগুলো Sidebar component থেকে পাওয়া যায় props বা ডাটা হিসেবে
    // কিন্তু যেহেতু তোমার Sidebar component এ মেনুগুলো আছে, তাই এখানে Sidebar থেকে নেওয়া যায় না সরাসরি।
    // তাই Sidebar থেকে মেনু অপশনগুলো আলাদা একটা array দিয়ে নিতে পারো, অথবা Sidebar component এ export করো।

    // উদাহরণ স্বরূপ, আমি ধরছি মেনুগুলো নিচের array এ আছে (Sidebar এর মেনু props এর সাথে মিল রেখে):

    const menuOptions = [
        { id: "overview", label: "Overview" },
        { id: "earnings", label: "Earnings" },
        { id: "jobs", label: "Jobs" },
        { id: "courses", label: "Courses" },
        { id: "referrals", label: "Referrals" },
        // ...sidebar এর মেনু অনুযায়ী আরো যেকোনো অপশন
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setShowMobileSidebar(false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // মেনু ক্লিক হ্যান্ডলার
    const handleMenuClick = (id) => {
        setActiveSection(id);
        setShowMobileSidebar(false); // sidebar যদি open থাকে বন্ধ করবে
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#fdfbff] to-[#fff0f5]">
            {/* Mobile Header with Dropdown Menu */}
            {isMobile && (
                <div className="bg-[#c5064f] text-white p-3 flex flex-col sticky top-0 z-30">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                        <div className="relative">
                            <button
                                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                                className="p-2 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </button>

                            {/* Dropdown Style Sidebar */}
                            {showMobileSidebar && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl z-50">
                                    <Sidebar
                                        active={activeSection}
                                        setActive={setActiveSection}
                                        isMobile={true}
                                        onClose={() => setShowMobileSidebar(false)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Extra Horizontal Menu Below 3-dot Button */}
                    <nav className="mt-4 flex space-x-2 overflow-x-auto scrollbar-hide pb-3 relative">
                        {/* Background glow effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3e9d]/60 to-transparent"></div>
                        </div>

                        {menuOptions.map(({ id, label }) => {
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => handleMenuClick(id)}
                                    className={`
                    relative whitespace-nowrap px-5 py-3 rounded-xl font-medium text-sm
                    transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]
                    group overflow-hidden
                    ${isActive
                                            ? "text-white bg-gradient-to-br from-[#ff1a75] to-[#ff4da6] shadow-[0_4px_25px_-5px_rgba(255,26,117,0.4)]"
                                            : `
                            text-white/90 hover:text-white 
                            bg-gradient-to-b from-white/5 to-white/10 
                            hover:bg-gradient-to-b hover:from-white/10 hover:to-white/15
                            backdrop-blur-[4px]
                            border border-transparent
                            hover:border-[#ff80b7]/30
                            hover:shadow-[0_0_0_1px_#ff80b7]/30
                        `}
                    ${isActive ? "border-[#ff80b7]/40" : ""}
                `}
                                >
                                    {/* Floating indicator with stronger glow */}
                                    {isActive && (
                                        <span className={`
                        absolute -top-3 left-1/2 w-2 h-2 bg-[#ff9ec6] rounded-full
                        transform -translate-x-1/2
                        shadow-[0_0_12px_3px_rgba(255,158,198,0.8)]
                    `}></span>
                                    )}

                                    {/* Menu text with subtle lift */}
                                    <span className={`
                    relative z-10 flex items-center justify-center
                    transition-all duration-300
                    ${isActive ? "translate-y-[-1px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] font-semibold" : ""}
                `}>
                                        {label}
                                        {isActive && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ml-2 h-4 w-4 text-white animate-[bounce_1.2s_ease-in-out_infinite]"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </span>

                                    {/* Unique inactive state border animation */}
                                    {!isActive && (
                                        <span className={`
                        absolute inset-0 rounded-xl border border-transparent
                        group-hover:border-[#ff80b7]/40
                        transition-all duration-500
                        before:absolute before:inset-0 before:rounded-xl
                        before:bg-gradient-to-r before:from-transparent before:via-[#ff80b7]/10 before:to-transparent
                        before:opacity-0 before:transition-opacity before:duration-300
                        group-hover:before:opacity-100
                    `}></span>
                                    )}

                                    {/* Vibrant shine effect */}
                                    <span className={`
                    absolute top-0 left-0 w-1/2 h-full 
                    transform -skew-x-12 transition-all duration-700
                    ${isActive
                                            ? "bg-white/30 opacity-40"
                                            : "bg-[#ff80b7]/10 opacity-0 group-hover:opacity-20"}
                `}></span>

                                    {/* Active state particles */}
                                    {isActive && (
                                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full"
                                                    style={{
                                                        transform: `translate(${Math.random() * 50 - 25}px, ${Math.random() * 30 - 15}px)`,
                                                        animation: `float-up-${i} ${3 + Math.random() * 2}s ease-in-out infinite ${i * 0.2}s`,
                                                        opacity: 0.7
                                                    }}
                                                ></span>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}

                        <style jsx>{`
        @keyframes float-up-0 {
            0%, 100% { transform: translate(-15px, 0) scale(0.9); opacity: 0.6; }
            50% { transform: translate(-8px, -15px) scale(1.1); opacity: 0.9; }
        }
        @keyframes float-up-1 {
            0%, 100% { transform: translate(0, 0) scale(0.8); opacity: 0.5; }
            50% { transform: translate(5px, -18px) scale(1.2); opacity: 0.8; }
        }
        @keyframes float-up-2 {
            0%, 100% { transform: translate(10px, 0) scale(0.7); opacity: 0.7; }
            50% { transform: translate(12px, -12px) scale(1); opacity: 1; }
        }
        @keyframes float-up-3 {
            0%, 100% { transform: translate(-5px, 0) scale(0.6); opacity: 0.4; }
            50% { transform: translate(-2px, -20px) scale(1.3); opacity: 0.7; }
        }
        @keyframes float-up-4 {
            0%, 100% { transform: translate(15px, 0) scale(0.5); opacity: 0.3; }
            50% { transform: translate(18px, -10px) scale(1.4); opacity: 0.6; }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
    `}</style>
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar */}
            {!isMobile && (
                <div className="w-64">
                    <Sidebar
                        active={activeSection}
                        setActive={setActiveSection}
                        isMobile={false}
                    />
                </div>
            )}

            {/* Light Overlay (Only for mobile when sidebar is open) */}
            {isMobile && showMobileSidebar && (
                <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMobileSidebar(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6">
                <DashboardContent section={activeSection} userData={userData} isMobile={isMobile} />
            </div>
        </div>
    );
};

export default FreelancerDashboard;
