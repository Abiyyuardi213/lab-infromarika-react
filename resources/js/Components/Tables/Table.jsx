import React from "react";
import { IconButton } from "@material-tailwind/react";

const Table = ({
    data = [],
    columns = [],
    title = "",
    actionButton = null, // Properti tambahan untuk button dinamis
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

        return item[column.key];
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between mb-4">
                    {title && (
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {title}
                        </h2>
                    )}
                    {actionButton && actionButton}{" "}
                    {/* Render button jika diberikan */}
                </div>
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
                                                <IconButton>
                                                    <i className="fas fa-heart" />
                                                </IconButton>
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
