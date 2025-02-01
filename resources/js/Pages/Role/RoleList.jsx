import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Table from "@/Components/Tables/Table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import AddButton from "@/Components/Tables/AddButton";

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

    // State untuk pagination dan sorting dari URL
    const [currentPage, setCurrentPage] = useState(filters?.page || 1);
    const [itemsPerPage, setItemsPerPage] = useState(filters?.perPage || 10);
    const [sortConfig, setSortConfig] = useState({
        key: filters?.sort || "name",
        direction: filters?.direction || "asc",
    });

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        router.get(
            "/role",
            {
                search: e.target.value,
                page: 1, // Reset ke halaman pertama saat search
                perPage: itemsPerPage,
                sort: sortConfig.key,
                direction: sortConfig.direction,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Handler untuk perubahan pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.get(
            "/role",
            {
                search: searchQuery,
                page: page,
                perPage: itemsPerPage,
                sort: sortConfig.key,
                direction: sortConfig.direction,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Handler untuk perubahan items per page
    const handlePerPageChange = (perPage) => {
        setItemsPerPage(perPage);
        router.get(
            "/role",
            {
                search: searchQuery,
                page: 1, // Reset ke halaman pertama
                perPage: perPage,
                sort: sortConfig.key,
                direction: sortConfig.direction,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Handler untuk sorting
    const handleSort = (key) => {
        const direction =
            sortConfig.key === key && sortConfig.direction === "asc"
                ? "desc"
                : "asc";
        setSortConfig({ key, direction });
        router.get(
            "/role",
            {
                search: searchQuery,
                page: currentPage,
                perPage: itemsPerPage,
                sort: key,
                direction: direction,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleEdit = (role) => {
        router.get(`/role/${role.id}/edit`);
    };

    const handleDelete = (role) => {
        if (confirm("Are you sure you want to delete this role?")) {
            router.delete(`/role/${role.id}`);
        }
    };

    const handleAdd = () => {
        router.get("/roles/create");
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
                            />
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
                            />
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
                {/* Search input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search roles..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="border rounded-md px-4 py-2 w-full max-w-xs"
                    />
                </div>

                <Table
                    data={roles}
                    columns={columnsWithActions}
                    title="Management Role"
                    actionButton={
                        <AddButton
                            label="Add User"
                            icon={UserPlusIcon}
                            size="sm"
                            onClick={() => handleAdd()}
                            className="bg-pink-600 text-white"
                        />
                    }
                    // Props baru untuk pagination dan sorting
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onPerPageChange={handlePerPageChange}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />
            </div>
        </DashboardLayout>
    );
}
