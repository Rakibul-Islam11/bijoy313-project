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
            {/* <div className="flex justify-center gap-4 my-4">
                <button
                    onClick={() => setRole("freelancer")}
                    className={`px-4 py-2 rounded-md font-semibold transition ${role === "freelancer"
                            ? "bg-[#c5064f] text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                >
                    Freelancer Dashboard
                </button>

                <button
                    onClick={() => setRole("client")}
                    className={`px-4 py-2 rounded-md font-semibold transition ${role === "client"
                            ? "bg-[#c5064f] text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                >
                    Client Dashboard
                </button>
            </div> */}

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
