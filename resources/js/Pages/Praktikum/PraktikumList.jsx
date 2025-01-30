import React from "react";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function PraktikumList({ praktikums }) {
    function deletePraktikum(id) {
        router.delete(`/praktikum/${id}`);
    }

    return (
        <>
            <Head title="Daftar Praktikum" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-green-500">
                    Daftar Praktikum
                </h1>
                <Link
                    href="/praktikum/create"
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create
                </Link>
                <hr className="mb-4" />
                {praktikums && praktikums.length > 0 ? (
                    praktikums.map((item) => (
                        <div key={item.id} className="mb-4 p-4 border rounded">
                            <h2 className="text-xl font-bold">{item.name}</h2>
                            <p className="my-2">Periode: {item.periode}</p>
                            <p className="my-2">Tahun: {item.tahun}</p>
                            <p className="my-2">
                                Status:{" "}
                                {item.status === 1 ? "Aktif" : "Tidak Aktif"}
                            </p>
                            <div className="flex gap-2">
                                <Link
                                    href={`/praktikum/${item.id}/edit`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => deletePraktikum(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Tidak ada data praktikum.</p>
                )}
            </div>
        </>
    );
}
