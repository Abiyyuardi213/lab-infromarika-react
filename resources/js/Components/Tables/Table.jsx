import React from "react";
import { Link } from "@inertiajs/react";

const Table = ({
    data = [],
    columns = [],
    title = "",
    onEdit,
    isLoading = false,
}) => {
    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item);
        }

        if (column.type === "status") {
            const statusColor =
                item[column.key] === 1 ? "bg-green-500" : "bg-slate-400";
            const statusText = item[column.key] === 1 ? "Active" : "Inactive";

            return (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${statusColor}`}
                >
                    {statusText}
                </span>
            );
        }

        if (column.type === "avatar") {
            return (
                <div className="flex items-center">
                    <img
                        src={item[column.imageKey] || "/placeholder.png"}
                        alt={item[column.titleKey] || ""}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <div className="font-medium text-gray-900">
                            {item[column.titleKey]}
                        </div>
                        {column.subtitleKey && (
                            <div className="text-gray-500 text-sm">
                                {item[column.subtitleKey]}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (column.type === "double-line") {
            return (
                <div>
                    <div className="font-medium text-gray-900">
                        {item[column.titleKey]}
                    </div>
                    {column.subtitleKey && (
                        <div className="text-gray-500 text-sm">
                            {item[column.subtitleKey]}
                        </div>
                    )}
                </div>
            );
        }

        return item[column.key];
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
                {title && (
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {title}
                    </h2>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="text-left py-4 px-4 text-sm font-medium text-gray-400"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                                {onEdit && (
                                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400"></th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={
                                            columns.length + (onEdit ? 1 : 0)
                                        }
                                        className="text-center py-4"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 last:border-0"
                                    >
                                        {columns.map((column, columnIndex) => (
                                            <td
                                                key={columnIndex}
                                                className="py-4 px-4"
                                            >
                                                {renderCell(item, column)}
                                            </td>
                                        ))}
                                        {onEdit && (
                                            <td className="py-4 px-4">
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
