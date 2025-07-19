import { useState } from "react";
import FreelancerDashboard from "./FreelancerDashboard";
import ClientDashboard from "./ClientDashboard";

const Dashboard = () => {
    const [role, setRole] = useState("freelancer"); // can be: "freelancer" | "client"

    // Dummy data
    const freelancerData = {
        totalEarnings: 10500,
        monthlyIncome: 2500,
        completedJobs: ["Logo Design", "Landing Page", "Facebook Ads"],
        pendingJobs: ["SEO Audit", "Instagram Campaign"],
        purchasedCourses: ["Design Masterclass", "Copywriting 101"],
        referrals: 9,
    };

    const clientData = {
        name: "Client User",
        postedJobs: ["Product Video", "Blog Writing"],
        activeOrders: ["UI Redesign", "Marketing Campaign"],
        freelancers: ["John Doe", "Mira Smith"],
        balance: 7300,
    };

    return (
        <div>
            {/* Toggle Buttons */}
      
            {/* Conditional Rendering */}
            {role === "freelancer" ? (
                <FreelancerDashboard userData={freelancerData} />
            ) : (
                <ClientDashboard userData={clientData} />
            )}
        </div>
    );
};

export default Dashboard;
