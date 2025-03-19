import React, { useState } from "react";
import { FaUserGraduate, FaBriefcase, FaMedal, FaSuitcase, FaBars } from "react-icons/fa"; // Icons
import { useUser } from "../UserContext";
import AchievementsList from "./Achievements";
import JobOpportunities from "./JobOpportunities";
import AlumniList from "./Alumni";
import WorkExperienceList from "./WorkExperience";

const Dashboard = () => {
    const [activePage, setActivePage] = useState("alumni");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const user = useUser();

    const menuItems = [
        { name: "Alumni", icon: <FaUserGraduate /> },
        { name: "Job Opportunities", icon: <FaBriefcase /> },
        { name: "Work Experience", icon: <FaSuitcase /> },
        { name: "Achievements", icon: <FaMedal /> }
    ];


    if (!user || user.user.role != "admin") {
        return <div className="min-h-screen text-center text-red-500 text-xl mt-10">Access Denied</div>;
    }


    return (

        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">

                <div className={`bg-blue-200 shadow-lg text-black p-5 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} min-h-screen`}>
                    <div className="flex justify-between items-center">
                        <h2 className={`text-xl font-bold transition-all ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                            Admin Dashboard
                        </h2>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-black text-2xl focus:outline-none">
                            <FaBars />
                        </button>
                    </div>

                    <ul className="mt-6">
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-600 hover:text-white transition-all ${
                                    activePage === item.name.toLowerCase().replace(/ /g, "") ? "bg-gray-700 text-white" : ""
                                }`}
                                onClick={() => setActivePage(item.name.toLowerCase().replace(/ /g, ""))}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className={`${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"} transition-all`}>
                                    {item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 p-6">
                    {activePage === "jobopportunities" && <JobOpportunities />}
                    {activePage === "achievements" && <AchievementsList />}
                    {activePage === "alumni" && <AlumniList />}
                    {activePage === "workexperience" && <WorkExperienceList />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;