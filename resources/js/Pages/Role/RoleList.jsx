import React from "react";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function RoleList({ roles }) {
    function deleteRole(id) {
        router.delete(`/roles/${id}`);
    }

    return (
        <>
            <Head title="Roles" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-green-500">
                    Roles List
                </h1>
                <hr className="mb-4" />
                {roles &&
                    roles.map((item) => (
                        <div key={item.id} className="mb-4 p-4 border rounded">
                            <h2 className="text-xl font-bold">{item.name}</h2>
                            <p className="my-2">{item.status}</p>
                            <div className="flex gap-2">
                                <Link
                                    href={`/roles/${item.id}/edit`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => deleteRole(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
