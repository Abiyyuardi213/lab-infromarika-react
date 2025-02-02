import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Table from "@/Components/Tables/Table";
import {
    Button,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import AddButton from "@/Components/Tables/AddButton";

export const columns = [
    {
        label: "NAME",
        key: "name",
    },
];
export default function JenisPraktikumList({ jenisPraktikums, filters }) {
    //iki gae add
    const [openAdd, setOpenAdd] = useState(false);
    const [newData, setNewData] = useState({ name: "" });
    //iki gae update
    const [open, setOpen] = useState(false);
    const [currentData, setCurrentData] = useState({ id: "", name: "" });
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
            "/kategori-praktikum",
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

    const handleOpen = (jenispraktikum) => {
        setCurrentData(jenispraktikum);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentData({ id: "", name: "" });
    };
    const handleUpdate = () => {
        router.put(`/kategori-praktikum/${currentData.id}`, currentData);
        handleClose();
    };

    const handleDelete = (jenispraktikum) => {
        if (confirm("Are you sure you want to delete this jenispraktikum?")) {
            router.delete(`/kategori-praktikum/${jenispraktikum.id}`);
        }
    };
    const handleAdd = () => {
        handleOpenAdd();
    };

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => {
        setOpenAdd(false);
        setNewData({ name: "" });
    };

    const handleAddSubmit = () => {
        router.post("/kategori-praktikum", newData);
        handleCloseAdd();
    };
    const columnsWithActions = [
        ...columns,
        {
            label: "ACTIONS",
            render: (jenispraktikum) => (
                <div className="flex gap-2">
                    <IconButton
                        color="white"
                        onClick={() => handleOpen(jenispraktikum)}
                    >
                        <PencilIcon
                            strokeWidth={2}
                            className="h-4 w-4 text-blue-600"
                        />{" "}
                    </IconButton>

                    <IconButton
                        color="red"
                        onClick={() => handleDelete(jenispraktikum)}
                    >
                        <TrashIcon
                            strokeWidth={2}
                            className="h-4 w-4 text-white"
                        />{" "}
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Kategori Praktikum">
            <Head title="Kategori Praktikum - Laboratorium Informatika ITATS" />
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
                    data={jenisPraktikums}
                    columns={columnsWithActions}
                    title="Kategori Praktikum"
                    actionButton={
                        <AddButton
                            label="Add Kategori"
                            icon={UserPlusIcon}
                            size="sm"
                            onClick={() => handleAdd()}
                            className="bg-pink-600 text-white"
                        />
                    }
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onPerPageChange={handlePerPageChange}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />
                <Dialog
                    open={open}
                    handler={handleClose}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>Edit Jenis Praktikum</DialogHeader>
                    <DialogBody divider>
                        <Input
                            label="Name"
                            value={currentData.name}
                            onChange={(e) =>
                                setCurrentData({
                                    ...currentData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleClose}
                            className="mr-2"
                        >
                            Batal
                        </Button>
                        <Button variant="gradient" onClick={handleUpdate}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </Dialog>
                <Dialog open={openAdd} handler={handleCloseAdd}>
                    <DialogHeader>Tambah Kateogi</DialogHeader>
                    <DialogBody>
                        <Input
                            label="Nama"
                            value={newData.name}
                            onChange={(e) =>
                                setNewData({ ...newData, name: e.target.value })
                            }
                        />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleCloseAdd}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={handleAddSubmit}
                        >
                            Simpan
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}
