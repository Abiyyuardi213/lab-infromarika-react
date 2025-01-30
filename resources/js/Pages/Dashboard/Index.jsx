// resources/js/Pages/Dashboard/Index.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
    BanknotesIcon,
    UsersIcon,
    UserPlusIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Index() {
    // Data untuk grafik
    const chartData = {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales",
                data: [30, 40, 35, 50, 65, 45, 55, 45, 60],
                fill: true,
                borderColor: "#5E72E4",
                backgroundColor: "rgba(94, 114, 228, 0.1)",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                grid: {
                    display: true,
                    drawBorder: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const statsCards = [
        {
            title: "TODAY'S MONEY",
            value: "$53,000",
            change: "+55%",
            changeText: "since yesterday",
            icon: <BanknotesIcon className="w-6 h-6 text-white" />,
            iconBg: "bg-violet-500",
        },
        {
            title: "TODAY'S USERS",
            value: "2,300",
            change: "+3%",
            changeText: "since last week",
            icon: <UsersIcon className="w-6 h-6 text-white" />,
            iconBg: "bg-red-500",
        },
        {
            title: "NEW CLIENTS",
            value: "+3,462",
            change: "-2%",
            changeText: "since last quarter",
            icon: <UserPlusIcon className="w-6 h-6 text-white" />,
            iconBg: "bg-emerald-500",
            isNegative: true,
        },
        {
            title: "SALES",
            value: "$103,430",
            change: "+5%",
            changeText: "than last month",
            icon: <ShoppingCartIcon className="w-6 h-6 text-white" />,
            iconBg: "bg-orange-500",
        },
    ];

    return (
        <DashboardLayout title="Dashboard">
            <Head title="Dashboard" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
                {statsCards.map((stat, index) => (
                    <Card key={index} className="bg-white">
                        <CardBody className="p-4">
                            <div className="flex justify-between">
                                <div>
                                    <Typography
                                        variant="small"
                                        className="text-gray-600 mb-2"
                                    >
                                        {stat.title}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        className="text-gray-900 mb-1"
                                    >
                                        {stat.value}
                                    </Typography>
                                    <div className="flex items-center">
                                        <Typography
                                            variant="small"
                                            className={`mr-1 ${
                                                stat.isNegative
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            {stat.change}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="text-gray-600"
                                        >
                                            {stat.changeText}
                                        </Typography>
                                    </div>
                                </div>
                                <div
                                    className={`${stat.iconBg} p-2 rounded-lg`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Sales Chart */}
            <Card className="bg-white">
                <CardBody>
                    <div className="mb-4">
                        <Typography variant="h6" color="blue-gray">
                            Sales Overview
                        </Typography>
                        <Typography variant="small" color="gray">
                            4% more in 2021
                        </Typography>
                    </div>
                    <div className="h-96">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </CardBody>
            </Card>
        </DashboardLayout>
    );
}
