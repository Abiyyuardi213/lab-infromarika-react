import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function PraktikumUpdate({ praktikum }) {
    const [values, setValues] = useState({
        name: praktikum.name,
        periode: praktikum.periode,
        tahun: praktikum.tahun,
        kelas: praktikum.kelas,
        status: praktikum.status,
    });

    function handleChange(e) {
        const { id, value } = e.target;
        setValues((prev) => ({ ...prev, [id]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.put(`/praktikum/${praktikum.id}`, values);
    }

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Update Praktikum</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block font-semibold">
                        Nama Praktikum:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="kelas" className="block font-semibold">
                        Kelas:
                    </label>
                    <input
                        id="kelas"
                        type="text"
                        value={values.kelas}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="periode" className="block font-semibold">
                        Periode:
                    </label>
                    <input
                        id="periode"
                        type="text"
                        value={values.periode}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tahun" className="block font-semibold">
                        Tahun:
                    </label>
                    <input
                        id="tahun"
                        type="text"
                        value={values.tahun}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block font-semibold">
                        Status:
                    </label>
                    <select
                        id="status"
                        value={values.status}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="1">Aktif</option>
                        <option value="0">Tidak Aktif</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
