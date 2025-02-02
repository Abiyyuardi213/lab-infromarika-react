import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";
import { IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Table from "@/Components/Tables/Table";
import AddButton from "@/Components/Tables/AddButton";
import DashboardLayout from "../../Layouts/DashboardLayout";

export const columns = [
    {
        label: "NAMA",
        key: "name",
    },
    {
        label: "KELAS",
        key: "kelas",
    },
    {
        label: "PERIODE",
        key: "periode",
    },
    {
        label: "TAHUN",
        key: "tahun",
    },
    {
        label: "STATUS",
        key: "status",
        render: (praktikum) => (praktikum.status == 1 ? "Active" : "Inactive"),
    },
];

export default function PraktikumList({ praktikums, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        router.get(
            "/praktikum",
            { search: e.target.value, page: 1 },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleEdit = (praktikum) => {
        router.get(`/praktikum/${praktikum.id}/edit`);
    };

    const handleDelete = (praktikum) => {
        if (confirm("Apakah Anda yakin ingin menghapus praktikum ini?")) {
            router.delete(`/praktikum/${praktikum.id}`);
        }
    };

    const handleAdd = () => {
        router.get("/praktikum/create");
    };

    const columnsWithActions = [
        ...columns,
        {
            label: "AKSI",
            render: (praktikum) => (
                <div className="flex gap-2">
                    <IconButton
                        color="white"
                        onClick={() => handleEdit(praktikum)}
                    >
                        <PencilIcon
                            strokeWidth={2}
                            className="h-4 w-4 text-blue-600"
                        />
                    </IconButton>
                    <IconButton
                        color="red"
                        onClick={() => handleDelete(praktikum)}
                    >
                        <TrashIcon
                            strokeWidth={2}
                            className="h-4 w-4 text-white"
                        />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Daftar Praktikum">
            <div className="relative container mx-auto p-4">
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari praktikum..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="border rounded-md px-4 py-2 w-full max-w-xs"
                    />
                </div>

                <Table
                    data={praktikums}
                    columns={columnsWithActions}
                    title="Daftar Praktikum"
                    actionButton={
                        <AddButton
                            label="Tambah Praktikum"
                            icon={UserPlusIcon}
                            size="sm"
                            onClick={() => handleAdd()}
                            className="bg-blue-600 text-white"
                        />
                    }
                />
            </div>
        </DashboardLayout>
    );
}
