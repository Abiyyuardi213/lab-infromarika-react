import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button, Input, Select } from "@material-tailwind/react";

export default function RoleCreate() {
    const [form, setForm] = useState({
        name: "",
        status: "1",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/role", form);
    };

    return (
        <DashboardLayout title="Management Role">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md relative mt-20">
                <h2 className="text-2xl font-semibold mb-4">Add Role</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <Input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Masukkan Nama"
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <Select
                            value={form.status}
                            onChange={(value) =>
                                setForm((prev) => ({ ...prev, status: value }))
                            }
                            className="w-full border px-4 py-2 rounded-md"
                        >
                            <Select.Option value="" disabled>
                                Select Status
                            </Select.Option>
                            <Select.Option value="1">Active</Select.Option>
                            <Select.Option value="0">InActive</Select.Option>
                        </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            color="gray"
                            onClick={() => router.get("/role")}
                        >
                            Batal
                        </Button>
                        <Button type="submit" color="pink">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
