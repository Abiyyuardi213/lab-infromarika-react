// resources/js/Components/Dashboard/Navbar.jsx
import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navbar({ toggleSidebar, title }) {
    return (
        <nav className="bg-white border-b px-4 py-2.5">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <IconButton variant="text" onClick={toggleSidebar}>
                        <Bars3Icon className="h-6 w-6 bg-white rounded-lg" />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className="relative ml-4 text-white font-poppins"
                    >
                        {title}
                    </Typography>
                </div>
            </div>
        </nav>
    );
}
