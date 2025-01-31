import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Table from "@/Components/Tables/Table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
                    <button href="#buttons-with-link">
                        <IconButton
                            color="white"
                            onClick={() => handleEdit(role)}
                        >
                            <PencilIcon
                                strokeWidth={2}
                                className="h-4 w-4 text-blue-600"
                            />{" "}
                        </IconButton>
                    </button>

                    <button>
                        <IconButton
                            color="red"
                            onClick={() => handleDelete(role)}
                        >
                            <TrashIcon
                                strokeWidth={2}
                                className="h-4 w-4 text-white"
                            />{" "}
                        </IconButton>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Management Role">
            <Head title="Roles" />
            <div className="relative container mx-auto p-4">
                <Table
                    data={roles}
                    columns={columnsWithActions}
                    title="Management Role"
                />
            </div>
        </DashboardLayout>
    );
}
