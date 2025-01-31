import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Table from "@/Components/Tables/Table";
import { Button } from "@material-tailwind/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { UserPlusIcon } from "@heroicons/react/24/solid";

// import { columns } from "./tableConfig";
// // Pages/Roles/tableConfig.js
export const columns = [
    {
        label: "NAME",
        key: "name",
    },
    {
        label: "STATUS",
        key: "status",
        type: "status",
    },
];
export default function RoleList({ roles, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        router.get(
            "/roles",
            { search: e.target.value },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleEdit = (role) => {
        router.get(`/roles/${role.id}/edit`);
    };

    const handleDelete = (role) => {
        if (confirm("Are you sure you want to delete this role?")) {
            router.delete(`/roles/${role.id}`);
        }
    };

    const columnsWithActions = [
        ...columns,
        {
            label: "ACTIONS",
            render: (role) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(role)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(role)}
                        className="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Dashboard">
            <Head title="Roles" />
            <div className="relative container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white bg-green">
                        Roles List
                    </h1>
                    <Button className="flex items-center gap-3" size="sm">
                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                        member
                    </Button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search roles..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
                    />
                </div>

                <Table
                    data={roles}
                    columns={columnsWithActions}
                    title="Roles Management"
                />
            </div>
        </DashboardLayout>
    );
}
