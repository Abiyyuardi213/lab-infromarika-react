import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";

export default function PraktikanUpdate({ praktikan, praktikums }) {
    const [values, setValues] = useState({
        nama: praktikan.nama,
        npm: praktikan.npm,
        jurusan: praktikan.jurusan,
        angkatan: praktikan.angkatan,
        praktikum_id: praktikan.praktikum_id,
        status: praktikan.status.toString(),
    });

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.put(`/praktikan/${praktikan.id}`, values);
    }

    return (
        <PageLayout title="Edit Praktikan">
            <Head title="Edit Praktikan" />
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Edit Praktikan
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="nama"
                            value={values.nama}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            NPM
                        </label>
                        <input
                            type="text"
                            name="npm"
                            value={values.npm}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Jurusan
                        </label>
                        <input
                            type="text"
                            name="jurusan"
                            value={values.jurusan}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Angkatan
                        </label>
                        <input
                            type="number"
                            name="angkatan"
                            value={values.angkatan}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Praktikum
                        </label>
                        <select
                            name="praktikum_id"
                            value={values.praktikum_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        >
                            {praktikums.map((praktikum) => (
                                <option key={praktikum.id} value={praktikum.id}>
                                    {praktikum.name} - {praktikum.kelas}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Status
                        </label>
                        <select
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="1">Aktif</option>
                            <option value="0">Tidak Aktif</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md"
                        >
                            Simpan
                        </button>
                        <Link
                            href="/praktikan"
                            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow-md"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}
