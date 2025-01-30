import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Button,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UsersIcon,
    UserPlusIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function Sidebar({ show }) {
    return (
        <aside
            className={`fixed top-0 left-0 z-40 h-screen transition-transform
            ${show ? "translate-x-0" : "-translate-x-full"}`}
        >
            <Card className="h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-white rounded-none">
                <div className="mb-2 p-4">
                    <Typography variant="h5" className="text-gray-900">
                        Argon Dashboard 2
                    </Typography>
                </div>
                <List>
                    <ListItem className="hover:bg-blue-50">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5 text-blue-600" />
                        </ListItemPrefix>
                        <Link
                            href="/dashboard"
                            className="w-full text-gray-700"
                        >
                            Dashboard
                        </Link>
                    </ListItem>
                    <ListItem className="hover:bg-blue-50">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5 text-blue-600" />
                        </ListItemPrefix>
                        <Link
                            href="/praktikum"
                            className="w-full text-gray-700"
                        >
                            Praktikum
                        </Link>
                    </ListItem>
                    <ListItem className="hover:bg-blue-50">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5 text-blue-600" />
                        </ListItemPrefix>
                        <Link
                            href="/praktikan"
                            className="w-full text-gray-700"
                        >
                            Praktikan
                        </Link>
                    </ListItem>
                </List>

                {/* Bagian help */}
                <div className="mt-auto p-4">
                    <Typography variant="h6" className="mb-2">
                        Need help?
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                        Please check our docs
                    </Typography>
                    <Button className="mt-4 w-full" color="blue">
                        Documentation
                    </Button>
                </div>
            </Card>
        </aside>
    );
}
