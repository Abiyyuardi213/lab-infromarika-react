// resources/js/Components/Dashboard/Footer.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import { Typography } from "@material-tailwind/react";

export default function Footer() {
    return (
        <footer className="py-4 px-6 mt-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <Typography color="blue-gray" className="text-sm font-poppins">
                    © 2024 Your Company. All rights reserved.
                </Typography>
                <div className="mt-4 md:mt-0 flex gap-4">
                    <Link
                        href="#"
                        className="text-sm text-blue-gray-500 hover:text-blue-gray-700 font-poppins"
                    >
                        About
                    </Link>
                    <Link
                        href="#"
                        className="text-sm text-blue-gray-500 hover:text-blue-gray- font-poppins"
                    >
                        Terms
                    </Link>
                    <Link
                        href="#"
                        className="text-sm text-blue-gray-500 hover:text-blue-gray- font-poppins"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
