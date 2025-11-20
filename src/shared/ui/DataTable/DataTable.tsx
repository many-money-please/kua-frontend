"use client";

import { ReactNode } from "react";

export type Column<T = unknown> = {
    key: string;
    header: string;
    accessor?: (row: T) => ReactNode;
    className?: string;
    headerClassName?: string;
};

type DataTableProps<T = unknown> = {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
    className?: string;
    headerClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
    onRowClick?: (row: T) => void;
};

export const DataTable = <T,>({
    columns,
    data,
    emptyMessage = "데이터가 없습니다.",
    className = "",
    headerClassName = "",
    rowClassName = "",
    cellClassName = "",
    onRowClick,
}: DataTableProps<T>) => {
    return (
        <div
            className={`border-kua-main mb-4 w-full overflow-x-auto border-t-2 ${className}`}
        >
            <table className="border-kua-gray200 w-full border-collapse border-x-0">
                <thead>
                    <tr
                        className={`bg-kua-blue50 border-kua-gray200 border-b ${headerClassName}`}
                    >
                        {columns.map((column, columnIndex) => {
                            const isFirst = columnIndex === 0;
                            const isLast = columnIndex === columns.length - 1;
                            const borderClass = `${isFirst ? "border-l-0" : ""} ${
                                isLast ? "border-r-0" : ""
                            }`;
                            return (
                                <th
                                    key={column.key}
                                    className={`text-kua-gray800 border-kua-gray200 border px-4 py-3 text-center text-sm font-semibold ${borderClass} ${column.headerClassName || ""}`}
                                >
                                    {column.header}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="border-kua-gray200 text-kua-gray400 border px-4 py-8 text-center"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick?.(row)}
                                className={`border-kua-gray200 border-b transition-colors ${
                                    onRowClick
                                        ? "hover:bg-kua-sky50 cursor-pointer"
                                        : ""
                                } ${rowClassName}`}
                            >
                                {columns.map((column, columnIndex) => {
                                    const isFirst = columnIndex === 0;
                                    const isLast =
                                        columnIndex === columns.length - 1;
                                    const borderClass = `${
                                        isFirst ? "border-l-0" : ""
                                    } ${isLast ? "border-r-0" : ""}`;
                                    return (
                                        <td
                                            key={column.key}
                                            className={`border-kua-gray200 border px-4 py-4 text-center text-sm ${borderClass} ${cellClassName} ${column.className || ""}`}
                                        >
                                            {column.accessor
                                                ? column.accessor(row)
                                                : (String(
                                                      (
                                                          row as Record<
                                                              string,
                                                              unknown
                                                          >
                                                      )[column.key] ?? "",
                                                  ) as ReactNode)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
