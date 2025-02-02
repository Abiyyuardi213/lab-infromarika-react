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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fade-in">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative transform transition-all scale-95 hover:scale-100">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.585l4.715 4.715a.75.75 0 11-1.06 1.06L12 11.645l-4.715 4.715a.75.75 0 11-1.06-1.06l4.715-4.715L6.225 5.871a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                            Detail Praktikum
                        </h2>
                        <div className="space-y-2 text-gray-700">
                            <p>
                                <strong className="text-gray-900">
                                    Nama Praktikum:
                                </strong>{" "}
                                {selectedPraktikum.name}
                            </p>
                            <p>
                                <strong className="text-gray-900">
                                    Periode:
                                </strong>{" "}
                                {selectedPraktikum.periode}
                            </p>
                            <p>
                                <strong className="text-gray-900">
                                    Tahun:
                                </strong>{" "}
                                {selectedPraktikum.tahun}
                            </p>
                            <p>
                                <strong className="text-gray-900">
                                    Kelas:
                                </strong>{" "}
                                {selectedPraktikum.kelas}
                            </p>
                            <p>
                                <strong className="text-gray-900">
                                    Status:
                                </strong>
                                <span
                                    className={`ml-2 px-2 py-1 text-sm font-medium rounded-full ${
                                        selectedPraktikum.status === 1
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {selectedPraktikum.status === 1
                                        ? "Aktif"
                                        : "Tidak Aktif"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}
