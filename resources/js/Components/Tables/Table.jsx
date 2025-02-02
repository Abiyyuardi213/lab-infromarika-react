import React, { useState, useMemo } from "react";
import { IconButton } from "@material-tailwind/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Table = ({
    data = {},
    columns = [],
    title = "",
    actionButton = null,
    onEdit,
    isLoading = false,
}) => {
    // State untuk sorting
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    // Mengambil data dari struktur pagination Laravel
    const items = data.data || [];
    const totalItems = data.total || 0;
    const lastPage = data.last_page || 1;
    const currentPageFromData = data.current_page || 1;
    const perPage = data.per_page || 10;

    // Sorting logic untuk current page
    const sortedItems = useMemo(() => {
        if (!sortConfig.key) return items;

        return [...items].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [items, sortConfig]);

    // Handle sorting
    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

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

    // Render sorting indicator
    const renderSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />;
        }
        return sortConfig.direction === "asc" ? (
            <ChevronUp className="w-4 h-4 ml-1 text-blue-500" />
        ) : (
            <ChevronDown className="w-4 h-4 ml-1 text-blue-500" />
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between mb-4">
                    <div>
                        {title && (
                            <h2 className="text-xl font-semibold text-gray-800">
                                {title}
                            </h2>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            className="border rounded-md px-2 py-1"
                            value={perPage}
                            onChange={(e) => {
                                // Implementasi perubahan items per page
                                const newPerPage = Number(e.target.value);
                                window.location.href = `${window.location.pathname}?page=1&perPage=${newPerPage}`;
                            }}
                        >
                            {[5, 10, 15, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size} per page
                                </option>
                            ))}
                        </select>
                        {actionButton}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="text-left py-4 px-4 text-sm font-medium text-gray-400 cursor-pointer hover:bg-gray-50"
                                        onClick={() => requestSort(column.key)}
                                    >
                                        <div className="flex items-center">
                                            {column.label}
                                            {renderSortIcon(column.key)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-4"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : sortedItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                sortedItems.map((item, index) => (
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
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                        Showing {(currentPageFromData - 1) * perPage + 1} to{" "}
                        {Math.min(currentPageFromData * perPage, totalItems)} of{" "}
                        {totalItems} entries
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                            onClick={() => {
                                window.location.href = `${
                                    window.location.pathname
                                }?page=${
                                    currentPageFromData - 1
                                }&perPage=${perPage}`;
                            }}
                            disabled={currentPageFromData === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: lastPage }, (_, i) => i + 1)
                            .filter((page) => {
                                const distance = Math.abs(
                                    page - currentPageFromData
                                );
                                return (
                                    distance === 0 ||
                                    distance === 1 ||
                                    page === 1 ||
                                    page === lastPage
                                );
                            })
                            .map((page, index, array) => {
                                if (
                                    index > 0 &&
                                    array[index - 1] !== page - 1
                                ) {
                                    return (
                                        <React.Fragment
                                            key={`ellipsis-${page}`}
                                        >
                                            <span className="px-3 py-1">
                                                ...
                                            </span>
                                            <button
                                                className={`px-3 py-1 border rounded-md ${
                                                    currentPageFromData === page
                                                        ? "bg-blue-500 text-white"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    window.location.href = `${window.location.pathname}?page=${page}&perPage=${perPage}`;
                                                }}
                                            >
                                                {page}
                                            </button>
                                        </React.Fragment>
                                    );
                                }
                                return (
                                    <button
                                        key={page}
                                        className={`px-3 py-1 border rounded-md ${
                                            currentPageFromData === page
                                                ? "bg-blue-500 text-white"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            window.location.href = `${window.location.pathname}?page=${page}&perPage=${perPage}`;
                                        }}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        <button
                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                            onClick={() => {
                                window.location.href = `${
                                    window.location.pathname
                                }?page=${
                                    currentPageFromData + 1
                                }&perPage=${perPage}`;
                            }}
                            disabled={currentPageFromData === lastPage}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
