import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CoursesSection from "./CoursesSection";
import EarningsSection from "./EarningsSection";
import HistorySection from "./HistorySection";
import JobsSection from "./JobsSection";
import OverviewSection from "./OverviewSection";
import ReferralsSection from "./ReferralsSection";

const DashboardContent = ({ userData }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section') || 'overview';

    // URL সিঙ্ক রাখার জন্য
    useEffect(() => {
        if (!section) {
            navigate('/dashboard?section=overview', { replace: true });
        }
    }, [section, navigate]);

    switch (section) {
        case "overview":
            return <OverviewSection userData={userData} />;
        case "earnings":
            return <EarningsSection userData={userData} />;
        case "jobs":
            return <JobsSection userData={userData} />;
        case "courses":
            return <CoursesSection userData={userData} />;
        case "referrals":
            return <ReferralsSection userData={userData} />;
        case "history":
            return <HistorySection userData={userData} />;
        default:
            return (
                <div className="text-center py-10 text-black">
                    <h2 className="text-2xl font-bold text-[#c5064f]">⚠️ Section Not Found</h2>
                    <p className="text-gray-600 mt-2">The requested dashboard section doesn't exist</p>
                </div>
            );
    }
};

export default DashboardContent;