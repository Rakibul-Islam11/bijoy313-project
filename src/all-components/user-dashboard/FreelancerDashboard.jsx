import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import { Link } from "react-router-dom";

const FreelancerDashboard = ({ userData }) => {
    const [activeSection, setActiveSection] = useState("overview");
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const location = useLocation();

    // ✅ URL থেকে section ধরে activeSection সেট করা
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const section = queryParams.get("section") || "overview";
        setActiveSection(section);
    }, [location]);

    const menuOptions = [
        { id: "overview", label: "Overview", path: "/dashboard?section=overview" },
        { id: "earnings", label: "Earnings", path: "/dashboard?section=earnings" },
        { id: "jobs", label: "Jobs", path: "/dashboard?section=jobs" },
        { id: "courses", label: "Courses", path: "/dashboard?section=courses" },
        { id: "referrals", label: "Referrals", path: "/dashboard?section=referrals" },
        { id: "history", label: "History", path: "/dashboard?section=history" },
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

    // Sidebar থাকুক আগের মতোই
    const handleMenuClick = (id) => {
        setActiveSection(id);
        setShowMobileSidebar(false);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#fdfbff] to-[#fff0f5] mt-18">
            {/* Mobile Header */}
            {isMobile && (
                <div className="bg-[#c5064f] text-white p-3 flex flex-col sticky top-0 z-30">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                        <div className="relative">
                            <button
                                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                                className="p-2 focus:outline-none"
                            >
                                {/* Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </button>

                            {/* Dropdown Sidebar */}
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

                    {/* Mobile Horizontal Menu */}
                    <nav className="mt-4 flex space-x-2 overflow-x-auto scrollbar-hide pb-3 relative">
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3e9d]/60 to-transparent"></div>
                        </div>

                        {menuOptions.map(({ id, label, path }) => {
                            const isActive = activeSection === id;
                            return (
                                <Link key={id} to={path}>
                                    <button
                                        onClick={() => handleMenuClick(id)}
                                        className={`relative whitespace-nowrap px-5 py-3 rounded-xl font-medium text-sm group overflow-hidden
                                        ${isActive
                                                ? "text-white bg-gradient-to-br from-[#ff1a75] to-[#ff4da6] shadow-[0_4px_25px_-5px_rgba(255,26,117,0.4)]"
                                                : "text-white/90 hover:text-white bg-gradient-to-b from-white/5 to-white/10 hover:bg-gradient-to-b hover:from-white/10 hover:to-white/15 backdrop-blur-[4px] border hover:border-[#ff80b7]/30 hover:shadow-[0_0_0_1px_#ff80b7]/30"}
                                        ${isActive ? "border-[#ff80b7]/40" : ""}`}
                                    >
                                        {isActive && (
                                            <span className="absolute -top-3 left-1/2 w-2 h-2 bg-[#ff9ec6] rounded-full transform -translate-x-1/2 shadow-[0_0_12px_3px_rgba(255,158,198,0.8)]" />
                                        )}
                                        <span className={`relative z-10 flex items-center justify-center transition-all duration-300 ${isActive ? "translate-y-[-1px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] font-semibold" : ""}`}>
                                            {label}
                                            {isActive && (
                                                <svg className="ml-2 h-4 w-4 text-white animate-[bounce_1.2s_ease-in-out_infinite]" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                </Link>
                            );
                        })}
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

            {isMobile && showMobileSidebar && (
                <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMobileSidebar(false)}
                />
            )}

            <div className="flex-1 p-4 md:px-6 md:py-0" >
                <DashboardContent section={activeSection} userData={userData} isMobile={isMobile} />
            </div>
        </div>
    );
};

export default FreelancerDashboard;
