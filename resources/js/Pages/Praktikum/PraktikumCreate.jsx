import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function PraktikumCreate() {
    const [values, setValues] = useState({
        name: "",
        periode: "",
        tahun: "",
        status: "1",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/praktikum", values);
    }

    return (
        <>
            <Head title="Tambah Praktikum" />
            <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center text-green-500 mb-4">
                    Tambah Praktikum
                </h1>
                <hr className="mb-4" />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold">
                            Nama Praktikum:
                        </label>
                        <input
                            id="name"
                            value={values.name}
                            type="text"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="periode"
                            className="block font-semibold"
                        >
                            Periode:
                        </label>
                        <input
                            id="periode"
                            value={values.periode}
                            type="text"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="tahun" className="block font-semibold">
                            Tahun:
                        </label>
                        <input
                            id="tahun"
                            value={values.tahun}
                            type="text"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
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
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="1">Aktif</option>
                            <option value="0">Tidak Aktif</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded font-bold"
                    >
                        Tambah Praktikum
                    </button>
                </form>
            </div>
        </>
    );
}
