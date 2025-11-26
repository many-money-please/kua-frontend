"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar, ManagerSearchBar } from "@/shared/ui/SearchBar";
import { useUserRole } from "@/shared/lib/UserRoleContext";

export type CommunityPostSummary = {
    id: number;
    title: string;
    createdAt: string;
    views: number;
};

type CommunityTableSectionProps = {
    title: string;
    data: CommunityPostSummary[];
    searchOptions?: string[];
    detailBasePath: string;
    pageSize?: number;
    // 서버 사이드 페이지네이션을 위한 props
    initialPage?: number;
    totalPages?: number;
    totalCount?: number; // 전체 항목 수 (서버에서 받은 값)
    onPageChange?: (page: number) => void; // 페이지 변경 시 URL 업데이트용
};

const columns: Column<CommunityPostSummary>[] = [
    { key: "title", header: "제목" },
    { key: "createdAt", header: "등록일" },
    { key: "views", header: "조회수" },
];

export const CommunityTableSection = ({
    title,
    data,
    searchOptions,
    detailBasePath,
    pageSize = 15,
    initialPage = 1,
    totalPages: serverTotalPages,
    totalCount: serverTotalCount,
    onPageChange,
}: CommunityTableSectionProps) => {
    const router = useRouter();
    const { isAdmin } = useUserRole();

    // 클라이언트 사이드 페이지네이션용 state
    const [clientPage, setClientPage] = useState(initialPage);

    // 서버 사이드 페이지네이션인 경우 initialPage 사용, 아니면 state 사용
    const page = serverTotalPages !== undefined ? initialPage : clientPage;
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState(
        searchOptions?.[0] ?? "제목",
    );
    const [selectedRows, setSelectedRows] = useState<CommunityPostSummary[]>(
        [],
    );

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) {
            return data;
        }
        const lowerQuery = searchQuery.toLowerCase();
        return data.filter((item) =>
            item.title.toLowerCase().includes(lowerQuery),
        );
    }, [data, searchQuery]);

    const paginationInfo = useMemo(() => {
        // 서버 사이드 페이지네이션인 경우
        if (serverTotalPages !== undefined) {
            return {
                totalItems: serverTotalCount ?? data.length * serverTotalPages,
                totalPages: serverTotalPages,
                currentPage: page,
                visibleData: data, // 서버에서 이미 페이지네이션된 데이터
            };
        }

        // 클라이언트 사이드 페이지네이션 (기존 로직)
        const totalItems = filteredData.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(page, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const visibleData = filteredData.slice(
            startIndex,
            startIndex + pageSize,
        );
        return { totalItems, totalPages, currentPage, visibleData };
    }, [
        filteredData,
        page,
        pageSize,
        serverTotalPages,
        serverTotalCount,
        data,
    ]);

    const handleSearch = () => {
        setSearchQuery(searchInput.trim());
        // 검색 시 첫 페이지로 이동
        if (serverTotalPages !== undefined) {
            // 서버 사이드인 경우 URL 업데이트는 Pagination 컴포넌트에서 처리
            // 여기서는 직접 처리하지 않음
        } else {
            setClientPage(1);
        }
    };

    const handlePageChange = (newPage: number) => {
        // 클라이언트 사이드 페이지네이션인 경우에만 사용
        if (serverTotalPages === undefined) {
            setClientPage(newPage);
            if (onPageChange) {
                onPageChange(newPage);
            }
        }
    };

    return (
        <section className="mb-12 flex w-full max-w-[1200px] flex-col gap-6 px-5 sm:px-0">
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">{title}</span>
                {isAdmin ? (
                    <ManagerSearchBar
                        searchQuery={searchInput}
                        searchOption={searchOption}
                        searchOptions={searchOptions}
                        onSearchQueryChange={setSearchInput}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                        onAdd={() => {
                            router.push(`${detailBasePath}/create`);
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
                canDelete={isAdmin}
                onSelectionChange={(rows) => {
                    setSelectedRows(rows as CommunityPostSummary[]);
                }}
                getRowId={(row) => {
                    return (row as CommunityPostSummary).id ?? "";
                }}
            />

            {paginationInfo.totalPages > 1 && (
                <Pagination
                    currentPage={paginationInfo.currentPage}
                    totalPages={paginationInfo.totalPages}
                    onPageChange={
                        serverTotalPages === undefined
                            ? handlePageChange
                            : undefined
                    }
                    serverSide={serverTotalPages !== undefined}
                    basePath={
                        serverTotalPages !== undefined
                            ? detailBasePath
                            : undefined
                    }
                />
            )}
        </section>
    );
};
