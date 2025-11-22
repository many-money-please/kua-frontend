"use client";

import { ReactNode, useState, useMemo, useEffect } from "react";

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
    canDelete?: boolean;
    getRowId?: (row: T) => string | number;
    onSelectionChange?: (selectedRows: T[]) => void;
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
    canDelete = false,
    getRowId,
    onSelectionChange,
}: DataTableProps<T>) => {
    // 선택된 행의 ID를 저장 (페이지 변경 시에도 유지)
    const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
        new Set(),
    );

    // 행의 고유 ID를 가져오는 함수
    const getRowUniqueId = (row: T, index: number): string | number => {
        if (getRowId) {
            return getRowId(row);
        }
        return index;
    };

    // 현재 페이지의 모든 행 ID 가져오기
    const getCurrentPageRowIds = useMemo((): (string | number)[] => {
        return data.map((row, index) => {
            if (getRowId) {
                return getRowId(row);
            }
            return index;
        });
    }, [data, getRowId]);

    // 전체 선택/해제
    const handleSelectAll = (checked: boolean) => {
        const newSelected = new Set(selectedRowIds);

        if (checked) {
            // 현재 페이지의 모든 ID를 선택에 추가
            getCurrentPageRowIds.forEach((id) => newSelected.add(id));
        } else {
            // 현재 페이지의 모든 ID를 선택에서 제거
            getCurrentPageRowIds.forEach((id) => newSelected.delete(id));
        }
        setSelectedRowIds(newSelected);
    };

    // 개별 행 선택/해제
    const handleSelectRow = (rowId: string | number, checked: boolean) => {
        const newSelected = new Set(selectedRowIds);
        if (checked) {
            newSelected.add(rowId);
        } else {
            newSelected.delete(rowId);
        }
        setSelectedRowIds(newSelected);
    };

    // 선택된 행 데이터 가져오기 (현재 페이지에 있는 것만)
    const getSelectedRowsData = (): T[] => {
        return data.filter((row, index) => {
            const rowId = getRowUniqueId(row, index);
            return selectedRowIds.has(rowId);
        });
    };

    // 선택 상태 변경 시 부모에게 알림
    useEffect(() => {
        if (onSelectionChange) {
            const selectedData = getSelectedRowsData();
            onSelectionChange(selectedData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRowIds, data]);

    // 전체 선택 여부 (현재 페이지의 모든 행이 선택되었는지)
    const isAllSelected = useMemo(() => {
        if (getCurrentPageRowIds.length === 0) return false;
        return getCurrentPageRowIds.every((id) => selectedRowIds.has(id));
    }, [getCurrentPageRowIds, selectedRowIds]);

    // 부분 선택 여부 (현재 페이지의 일부만 선택되었는지)
    const isIndeterminate = useMemo(() => {
        if (getCurrentPageRowIds.length === 0) return false;
        const selectedCount = getCurrentPageRowIds.filter((id) =>
            selectedRowIds.has(id),
        ).length;
        return selectedCount > 0 && selectedCount < getCurrentPageRowIds.length;
    }, [getCurrentPageRowIds, selectedRowIds]);

    return (
        <div
            className={`border-kua-main mb-4 w-full overflow-x-auto border-t-2 ${className}`}
        >
            <table className="border-kua-gray200 w-full border-collapse border-x-0">
                <thead>
                    <tr
                        className={`bg-kua-blue50 border-kua-gray200 border-b ${headerClassName}`}
                    >
                        {canDelete && (
                            <th className="border-kua-gray200 border-r border-l-0 px-4 py-3 text-center">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={(input) => {
                                        if (input) {
                                            input.indeterminate =
                                                isIndeterminate;
                                        }
                                    }}
                                    onChange={(e) =>
                                        handleSelectAll(e.target.checked)
                                    }
                                    className="accent-kua-main h-4 w-4 cursor-pointer"
                                />
                            </th>
                        )}
                        {columns.map((column, columnIndex) => {
                            const isFirst = columnIndex === 0;
                            const isLast = columnIndex === columns.length - 1;
                            const borderClass = `${isFirst ? "border-l-0" : ""} ${
                                isLast ? "border-r-0" : ""
                            }`;
                            return (
                                <th
                                    key={column.key}
                                    className={`text-kua-gray800 border-kua-gray200 border px-4 py-3 text-center text-lg font-semibold ${borderClass} ${column.headerClassName || ""}`}
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
                                colSpan={
                                    canDelete
                                        ? columns.length + 1
                                        : columns.length
                                }
                                className="border-kua-gray200 text-kua-gray400 border px-4 py-8 text-center"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => {
                            const rowId = getRowUniqueId(row, rowIndex);
                            const isSelected = selectedRowIds.has(rowId);
                            return (
                                <tr
                                    key={rowId}
                                    onClick={(e) => {
                                        // 체크박스 클릭 시에는 행 클릭 이벤트 발생하지 않도록
                                        if (
                                            (e.target as HTMLElement)
                                                .tagName !== "INPUT"
                                        ) {
                                            onRowClick?.(row);
                                        }
                                    }}
                                    className={`border-kua-gray200 border-b transition-colors ${
                                        isSelected ? "bg-kua-sky50" : ""
                                    } ${
                                        onRowClick
                                            ? "hover:bg-kua-sky50 cursor-pointer"
                                            : ""
                                    } ${rowClassName}`}
                                >
                                    {canDelete && (
                                        <td
                                            className="border-kua-gray200 border-r border-l-0 px-4 py-4 text-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectRow(
                                                        rowId,
                                                        e.target.checked,
                                                    );
                                                }}
                                                className="accent-kua-orange500 h-4.5 w-4.5 cursor-pointer"
                                            />
                                        </td>
                                    )}
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
                                                className={`border-kua-gray200 border px-4 py-4 text-center text-lg ${borderClass} ${cellClassName} ${column.className || ""}`}
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
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};
