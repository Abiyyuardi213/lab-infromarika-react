import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Button,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UsersIcon,
    UserPlusIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function Sidebar({ show }) {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <aside
            className={`font-poppins fixed top-0 left-0 z-40 h-screen transition-transform
            ${show ? "translate-x-0" : "-translate-x-full"}`}
        >
            <Card className="h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-white rounded-none">
                <div className="mb-2 p-4">
                    <Typography
                        variant="h5"
                        className="text-gray-900 font-poppins"
                    >
                        Laboratorium Informatika
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
                            <UsersIcon className="h-5 w-5 text-blue-600" />
                        </ListItemPrefix>
                        <Link href="/role" className="w-full text-gray-700">
                            Management Role
                        </Link>
                    </ListItem>
                    <Accordion
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${
                                    open === 1 ? "rotate-180" : ""
                                }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal font-poppins"
                                >
                                    Praktikum
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    <Link
                                        href="/kategori-praktikum"
                                        className="w-full text-gray-700 font-poppins"
                                    >
                                        Kategori Praktikum
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5 "
                                        />
                                    </ListItemPrefix>
                                    <Link
                                        href="/praktikum"
                                        className="font-poppins"
                                    >
                                        Praktikum
                                    </Link>
                                </ListItem>

                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    <Link
                                        href="/praktikum"
                                        className="font-poppins"
                                    >
                                        hahah
                                    </Link>
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
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
                    <Typography variant="h6" className="mb-2 font-poppins">
                        Need help?
                    </Typography>
                    <Typography
                        variant="small"
                        className="text-gray-600 font-poppins"
                    >
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
