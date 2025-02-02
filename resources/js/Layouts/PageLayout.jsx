import React from "react";
import { useState } from "react";
import Sidebar from "@/Components/Dashboard/Sidebar";
import Navbar from "@/Components/Dashboard/Navbar";
import Footer from "@/Components/Dashboard/Footer";

export default function PageLayout({ children, title }) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className="m-0  antialiased font-normal dark:bg-slate-900 text-base leading-default bg-gray-50 text-slate-500 flex min-h-screen">
            <div className="absolute min-h-75 h-[20rem] w-full bg-pink-500 dark:hidden "></div>{" "}
            <Sidebar show={showSidebar} />
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${
                    showSidebar ? "ml-64" : "ml-0"
                }`}
            >
                <Navbar
                    toggleSidebar={() => setShowSidebar(!showSidebar)}
                    title={title}
                />
                <div className="flex-1 px-6 py-4">{children}</div>
                <Footer className="mt-auto" />
            </div>
        </div>
    );
}
