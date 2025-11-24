"use client";

import { useState, useCallback } from "react";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar, ManagerSearchBar } from "@/shared/ui/SearchBar";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/shared/lib/UserRoleContext";

type Disclosure = {
    id: number;
    title: string;
    date: string;
    views: number;
};

// 경영공시 데이터
const disclosureData: Disclosure[] = [
    {
        id: 1,
        title: "2025년도 경영공시",
        date: "2025-12-20",
        views: 12,
    },
    {
        id: 2,
        title: "2024년도 경영공시",
        date: "2025-12-20",
        views: 308,
    },
    {
        id: 3,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 4,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 5,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 6,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 7,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 8,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 9,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 10,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 11,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 12,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 13,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 14,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 15,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 16,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 17,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 18,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 19,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
    {
        id: 20,
        title: "2023년도 경영공시",
        date: "2025-12-20",
        views: 2478,
    },
];

export const DisclosureTab = () => {
    const router = useRouter();
    const { isAdmin } = useUserRole();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("제목");
    const [selectedRows, setSelectedRows] = useState<Disclosure[]>([]);

    const pageSize = 15;

    // 검색 필터링
    const filteredData = disclosureData.filter((item) => {
        if (!searchQuery) return true;
        if (searchOption === "제목") {
            return item.title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentData = filteredData.slice(startIndex, startIndex + pageSize);

    const handleSearch = () => {
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    const handleRowClick = (row: Disclosure) => {
        // 상세 페이지로 이동
        router.push(`/about/disclosure/${row.id}`);
    };

    const handleAdd = () => {
        router.push("/about/disclosure/create");
    };

    const handleDelete = () => {
        if (selectedRows.length > 0) {
            console.log("Selected for deletion:", selectedRows.map((row) => row.id));
            // TODO: Implement actual delete logic
            setSelectedRows([]); // Clear selection after action
        } else {
            alert("삭제할 항목을 선택해주세요.");
        }
    };

    const handleSelectionChange = useCallback((rows: Disclosure[]) => {
        setSelectedRows(rows);
    }, []);

    const getRowId = useCallback((row: Disclosure) => {
        return row.id ?? "";
    }, []);

    // 컬럼 정의
    const columns: Column<Disclosure>[] = [
        {
            key: "title",
            header: "제목",
            className: "text-center",
        },
        {
            key: "date",
            header: "등록일",
            className: "w-[200px]",
        },
        {
            key: "views",
            header: "조회수",
            className: "w-[150px]",
            accessor: (row) => row.views.toLocaleString(),
        },
    ];

    return (
        <div className="w-full bg-white pb-[150px]">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
                {/* 검색 UI */}
                {isAdmin ? (
                    <ManagerSearchBar
                        searchQuery={searchQuery}
                        searchOption={searchOption}
                        searchOptions={["제목"]}
                        onSearchQueryChange={setSearchQuery}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        selectedCount={selectedRows.length}
                    />
                ) : (
                    <SearchBar
                        totalCount={filteredData.length}
                        searchQuery={searchQuery}
                        searchOption={searchOption}
                        searchOptions={["제목"]}
                        onSearchQueryChange={setSearchQuery}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                        placeholder="검색어를 입력하세요"
                    />
                )}

                {/* 경영공시 테이블 */}
                <div className="w-full">
                    <DataTable
                        columns={columns}
                        data={currentData}
                        onRowClick={handleRowClick}
                        rowClassName="cursor-pointer hover:bg-kua-sky50"
                        canDelete={isAdmin}
                        onSelectionChange={handleSelectionChange}
                        getRowId={getRowId}
                    />
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
