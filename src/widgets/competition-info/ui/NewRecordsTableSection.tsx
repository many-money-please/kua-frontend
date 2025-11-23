"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar, ManagerSearchBar } from "@/shared/ui/SearchBar";

export type NewRecordSummary = {
    id: number;
    title: string;
    createdAt: string;
    views: number;
};

type NewRecordsTableSectionProps = {
    title: string;
    data: NewRecordSummary[];
    searchOptions?: string[];
    detailBasePath: string;
    pageSize?: number;
    isManager?: boolean;
};

const columns: Column<NewRecordSummary>[] = [
    { key: "title", header: "제목" },
    { key: "createdAt", header: "등록일" },
    { key: "views", header: "조회수" },
];

export const NewRecordsTableSection = ({
    title,
    data,
    searchOptions,
    detailBasePath,
    pageSize = 15,
    isManager = false,
}: NewRecordsTableSectionProps) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState(
        searchOptions?.[0] ?? "제목",
    );
    const [selectedRows, setSelectedRows] = useState<NewRecordSummary[]>([]);

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) {
            return data;
        }
        const lowerQuery = searchQuery.toLowerCase();
        return data.filter((item) => {
            if (searchOption === "제목") {
                return item.title.toLowerCase().includes(lowerQuery);
            }
            if (searchOption === "내용") {
                // 내용 검색은 나중에 content 필드가 추가되면 구현
                return true;
            }
            if (searchOption === "제목+내용") {
                return item.title.toLowerCase().includes(lowerQuery);
            }
            return true;
        });
    }, [data, searchQuery, searchOption]);

    const paginationInfo = useMemo(() => {
        const totalItems = filteredData.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(page, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const visibleData = filteredData.slice(
            startIndex,
            startIndex + pageSize,
        );
        return { totalItems, totalPages, currentPage, visibleData };
    }, [filteredData, page, pageSize]);

    const handleSearch = () => {
        setSearchQuery(searchInput.trim());
        setPage(1);
    };

    return (
        <section className="flex w-full max-w-[1200px] flex-col gap-6 py-12">
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">{title}</span>
                {isManager ? (
                    <ManagerSearchBar
                        searchQuery={searchInput}
                        searchOption={searchOption}
                        searchOptions={searchOptions}
                        onSearchQueryChange={setSearchInput}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                        onAdd={() => {
                            router.push(`/competition-info/new-records/create`);
                        }}
                        onDelete={() => {
                            if (selectedRows.length > 0) {
                                const selectedIds = selectedRows.map(
                                    (row) => row.id,
                                );
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
                        searchQuery={searchInput}
                        searchOption={searchOption}
                        searchOptions={searchOptions}
                        onSearchQueryChange={setSearchInput}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                    />
                )}
            </div>

            <DataTable
                columns={columns}
                data={paginationInfo.visibleData}
                onRowClick={(row) => router.push(`${detailBasePath}/${row.id}`)}
                rowClassName="hover:bg-kua-sky50"
                canDelete={isManager}
                onSelectionChange={(rows) => {
                    setSelectedRows(rows as NewRecordSummary[]);
                }}
                getRowId={(row) => {
                    return (row as NewRecordSummary).id ?? "";
                }}
            />

            {paginationInfo.totalPages > 1 && (
                <Pagination
                    currentPage={paginationInfo.currentPage}
                    totalPages={paginationInfo.totalPages}
                    onPageChange={setPage}
                />
            )}
        </section>
    );
};
