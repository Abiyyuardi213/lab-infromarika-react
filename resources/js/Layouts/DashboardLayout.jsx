// resources/js/Layouts/DashboardLayout.jsx
import React from "react";
import { useState } from "react";
import Sidebar from "@/Components/Dashboard/Sidebar";
import Navbar from "@/Components/Dashboard/Navbar";
import Footer from "@/Components/Dashboard/Footer";

// resources/js/Layouts/DashboardLayout.jsx
export default function DashboardLayout({ children, title }) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className="m-0  antialiased font-normal dark:bg-slate-900 text-base leading-default bg-gray-50 text-slate-500">
            <div className="absolute min-h-75 h-[20rem] w-full bg-pink-500 dark:hidden "></div>{" "}
            <Sidebar show={showSidebar} />
            <main
                className={`flex-1 flex flex-col ${
                    showSidebar ? "ml-64" : "ml-0"
                } transition-all duration-300`}
            >
                <Navbar
                    toggleSidebar={() => setShowSidebar(!showSidebar)}
                    title={title}
                />

                <div className="flex-1 px-6 py-4">{children}</div>
            </main>
        </div>
    );
}
