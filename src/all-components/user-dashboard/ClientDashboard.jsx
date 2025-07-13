import { useState } from "react";
import ClientSidebar from "./ClientSidebar";
import ClientDashboardContent from "./ClientDashboardContent";

const ClientDashboard = ({ userData }) => {
    const [activeSection, setActiveSection] = useState("overview");

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#fdfbff] to-[#fff0f5]">
            {/* Sidebar */}
            <ClientSidebar active={activeSection} setActive={setActiveSection} />

            {/* Content */}
            <div className="flex-1 p-6">
                <ClientDashboardContent section={activeSection} userData={userData} />
            </div>
        </div>
    );
};

export default ClientDashboard;
