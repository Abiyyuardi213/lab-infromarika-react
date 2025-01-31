import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";
import axios from "axios";

export default function PraktikanList({ praktikans }) {
    const [selectedPraktikum, setSelectedPraktikum] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const deletePraktikan = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus praktikan ini?")) {
            axios.delete(`/praktikan/${id}`).then(() => {
                window.location.reload();
            });
        }
    };

    const showDetailModal = async (id) => {
        try {
            const response = await axios.get(`/praktikan/${id}`);
            if (!response.data.praktikan.praktikum) {
                alert("Praktikan ini belum memiliki praktikum.");
                return;
            }

            console.log("Detail Praktikum:", response.data.praktikan.praktikum);

            if (response.data.praktikan.praktikum) {
                setSelectedPraktikum(response.data.praktikan.praktikum);
                setShowModal(true);
            } else {
                alert("Praktikan ini belum memiliki praktikum.");
            }
        } catch (error) {
            console.error("Gagal mengambil data praktikum", error);
        }
    };

    return (
        <PageLayout title="Daftar Praktikan">
            <div className="p-8 bg-white rounded-lg shadow-lg relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Daftar Praktikan
                    </h1>
                    <Link
                        href="/praktikan/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                        + Tambah Praktikan
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 font-semibold text-gray-700">
                                    Nama
                                </th>
                                <th className="p-3 font-semibold text-gray-700">
                                    NPM
                                </th>
                                <th className="p-3 font-semibold text-gray-700">
                                    Jurusan
                                </th>
                                <th className="p-3 font-semibold text-gray-700">
                                    Angkatan
                                </th>
                                <th className="p-3 font-semibold text-gray-700">
                                    Praktikum
                                </th>
                                <th className="p-3 font-semibold text-gray-700">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {praktikans && praktikans.length > 0 ? (
                                praktikans.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out"
                                    >
                                        <td className="p-3">{item.nama}</td>
                                        <td className="p-3">{item.npm}</td>
                                        <td className="p-3">{item.jurusan}</td>
                                        <td className="p-3">{item.angkatan}</td>
                                        <td className="p-3">
                                            {item.praktikum ? (
                                                <span className="text-gray-800 font-semibold">
                                                    {item.praktikum.name}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 italic">
                                                    Belum ada
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/praktikan/${item.id}/edit`}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deletePraktikan(item.id)
                                                    }
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        showDetailModal(item.id)
                                                    }
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                                                >
                                                    Detail Praktikum
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center p-6 text-gray-500 italic"
                                    >
                                        Tidak ada praktikan tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Detail Praktikum */}
            {showModal && selectedPraktikum && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">
                            Detail Praktikum
                        </h2>
                        <p>
                            <strong>Nama Praktikum:</strong>{" "}
                            {selectedPraktikum.name}
                        </p>
                        <p>
                            <strong>Periode:</strong>{" "}
                            {selectedPraktikum.periode}
                        </p>
                        <p>
                            <strong>Tahun:</strong> {selectedPraktikum.tahun}
                        </p>
                        <p>
                            <strong>Kelas:</strong> {selectedPraktikum.kelas}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {selectedPraktikum.status === 1
                                ? "Aktif"
                                : "Tidak Aktif"}
                        </p>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}
