"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar, ManagerSearchBar } from "@/shared/ui/SearchBar";
import { useUserRole } from "@/shared/lib/UserRoleContext";

type CompetitionInfoTableProps<T> = {
    title: string;
    columns: Column<T>[];
    data: T[];
    totalCount?: number;
    searchOptions?: string[];
    onSearch?: (query: string, option: string) => void;
    onRowClick?: (row: T) => void;
    getRowLink?: (row: T) => string;
    pageSize?: number;
};

export const CompetitionInfoTable = <T,>({
    title,
    columns,
    data,
    totalCount,
    searchOptions,
    onSearch,
    onRowClick,
    getRowLink,
    pageSize = 15,
}: CompetitionInfoTableProps<T>) => {
    const { isAdmin } = useUserRole();
    const isManager = isAdmin; // 관리자 = 매니저로 동일하게 처리
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState(
        searchOptions?.[0] ?? "제목",
    );
    const [selectedRows, setSelectedRows] = useState<T[]>([]);

    const paginationInfo = useMemo(() => {
        const totalItems = totalCount ?? data.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(page, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const visibleData = data.slice(startIndex, startIndex + pageSize);
        return { totalPages, currentPage, visibleData, totalItems };
    }, [data, page, pageSize, totalCount]);

    const handleSearch = () => {
        onSearch?.(searchQuery, searchOption);
    };

    return (
        <div className="mb-12 flex w-full max-w-[1200px] flex-col gap-6 px-5 sm:px-0">
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">{title}</span>
                {isManager ? (
                    <ManagerSearchBar
                        searchQuery={searchQuery}
                        searchOption={searchOption}
                        searchOptions={searchOptions}
                        onSearchQueryChange={setSearchQuery}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                        onAdd={() => {
                            router.push(`/competition-info/create`);
                        }}
                        onDelete={() => {
                            if (selectedRows.length > 0) {
                                const selectedIds = selectedRows.map((row) => {
                                    // row에 id 속성이 있다고 가정
                                    return (row as { id?: string | number }).id;
                                });
                                console.log("선택된 행들의 ID:", selectedIds);
                                // TODO: 실제 삭제 로직 구현
                            } else {
                                console.log("선택된 행이 없습니다.");
                            }
                        }}
                        selectedCount={selectedRows.length}
                    />
                ) : (
                    <SearchBar
                        totalCount={paginationInfo.totalItems}
                        searchQuery={searchQuery}
                        searchOption={searchOption}
                        searchOptions={searchOptions}
                        onSearchQueryChange={setSearchQuery}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                    />
                )}
            </div>

            <DataTable
                columns={columns}
                data={paginationInfo.visibleData}
                onRowClick={
                    onRowClick || getRowLink
                        ? (row) => {
                              onRowClick?.(row);
                              if (getRowLink) {
                                  router.push(getRowLink(row));
                              }
                          }
                        : undefined
                }
                rowClassName="hover:bg-kua-sky50"
                canDelete={isManager}
                onSelectionChange={(rows) => {
                    setSelectedRows(rows);
                }}
                getRowId={(row) => {
                    // row에 id 속성이 있다고 가정
                    return (row as { id?: string | number }).id ?? "";
                }}
            />

            {paginationInfo.totalPages > 1 && (
                <Pagination
                    currentPage={paginationInfo.currentPage}
                    totalPages={paginationInfo.totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
};
