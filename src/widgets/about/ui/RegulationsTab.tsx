"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar, ManagerSearchBar } from "@/shared/ui/SearchBar";
import { useUserRole } from "@/shared/lib/UserRoleContext";

type Regulation = {
    id: number;
    title: string;
    date: string;
    fileSize: string;
    fileUrl?: string;
};

// 규정 문서 데이터
const regulationsData: Regulation[] = [
    {
        id: 1,
        title: "대한수중핀수영협회 정관",
        date: "2024.01.15",
        fileSize: "2.5MB",
        fileUrl: "/files/regulations/charter.pdf",
    },
    {
        id: 2,
        title: "대한수중핀수영협회 운영규정",
        date: "2024.01.10",
        fileSize: "1.8MB",
        fileUrl: "/files/regulations/operations.pdf",
    },
    {
        id: 3,
        title: "선수 등록 및 관리 규정",
        date: "2023.12.20",
        fileSize: "1.2MB",
        fileUrl: "/files/regulations/athletes.pdf",
    },
    {
        id: 4,
        title: "대회 운영 규정",
        date: "2023.12.15",
        fileSize: "2.1MB",
        fileUrl: "/files/regulations/competitions.pdf",
    },
    {
        id: 5,
        title: "심판 자격 및 운영 규정",
        date: "2023.11.30",
        fileSize: "1.5MB",
        fileUrl: "/files/regulations/referees.pdf",
    },
    {
        id: 6,
        title: "스포츠공정위원회 운영 규정",
        date: "2023.11.25",
        fileSize: "1.3MB",
        fileUrl: "/files/regulations/fairplay.pdf",
    },
    {
        id: 7,
        title: "도핑방지 규정",
        date: "2023.11.20",
        fileSize: "1.7MB",
        fileUrl: "/files/regulations/anti-doping.pdf",
    },
    {
        id: 8,
        title: "지도자 자격 및 관리 규정",
        date: "2023.11.10",
        fileSize: "1.4MB",
        fileUrl: "/files/regulations/coaches.pdf",
    },
    {
        id: 9,
        title: "회원 가입 및 관리 규정",
        date: "2023.10.30",
        fileSize: "1.1MB",
        fileUrl: "/files/regulations/membership.pdf",
    },
    {
        id: 10,
        title: "재정 및 회계 규정",
        date: "2023.10.25",
        fileSize: "1.9MB",
        fileUrl: "/files/regulations/finance.pdf",
    },
    {
        id: 11,
        title: "대한수중핀수영협회 정관",
        date: "2024.01.15",
        fileSize: "2.5MB",
        fileUrl: "/files/regulations/charter.pdf",
    },
    {
        id: 12,
        title: "대한수중핀수영협회 운영규정",
        date: "2024.01.10",
        fileSize: "1.8MB",
        fileUrl: "/files/regulations/operations.pdf",
    },
    {
        id: 13,
        title: "선수 등록 및 관리 규정",
        date: "2023.12.20",
        fileSize: "1.2MB",
        fileUrl: "/files/regulations/athletes.pdf",
    },
    {
        id: 14,
        title: "대회 운영 규정",
        date: "2023.12.15",
        fileSize: "2.1MB",
        fileUrl: "/files/regulations/competitions.pdf",
    },
    {
        id: 15,
        title: "심판 자격 및 운영 규정",
        date: "2023.11.30",
        fileSize: "1.5MB",
        fileUrl: "/files/regulations/referees.pdf",
    },
    {
        id: 16,
        title: "스포츠공정위원회 운영 규정",
        date: "2023.11.25",
        fileSize: "1.3MB",
        fileUrl: "/files/regulations/fairplay.pdf",
    },
    {
        id: 17,
        title: "도핑방지 규정",
        date: "2023.11.20",
        fileSize: "1.7MB",
        fileUrl: "/files/regulations/anti-doping.pdf",
    },
    {
        id: 18,
        title: "지도자 자격 및 관리 규정",
        date: "2023.11.10",
        fileSize: "1.4MB",
        fileUrl: "/files/regulations/coaches.pdf",
    },
];

export const RegulationsTab = () => {
    const router = useRouter();
    const { isAdmin } = useUserRole();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("제목");
    const [selectedRows, setSelectedRows] = useState<Regulation[]>([]);

    const pageSize = 15;

    // 검색 필터링
    const filteredData = regulationsData.filter((item) => {
        if (!searchQuery) return true;
        if (searchOption === "제목") {
            return item.title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentData = filteredData.slice(startIndex, startIndex + pageSize);

    const handleDownload = (regulation: Regulation) => {
        // 다운로드 로직 (실제 구현 시 파일 다운로드 처리)
        console.log("다운로드:", regulation.title);
        if (regulation.fileUrl) {
            // window.open(regulation.fileUrl, "_blank");
            alert(
                `${regulation.title} 다운로드 기능은 실제 파일이 준비되면 작동합니다.`,
            );
        }
    };

    const handleSearch = () => {
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    const handleSelectionChange = useCallback((rows: Regulation[]) => {
        setSelectedRows(rows);
    }, []);

    const getRowId = useCallback((row: Regulation) => {
        return row.id ?? "";
    }, []);

    // 컬럼 정의
    const columns: Column<Regulation>[] = [
        {
            key: "title",
            header: "제목",
            className: "text-center",
        },

        {
            key: "download",
            header: "첨부파일",
            className: "w-[200px]",
            accessor: (row) => (
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => handleDownload(row)}
                        className="bg-kua-sky50 hover:bg-kua-main hover:text-kua-white text-kua-main border-kua-main flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                    >
                        다운로드
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4.66669 6.66667L8.00002 10L11.3334 6.66667"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 10V2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            ),
        },
        {
            key: "date",
            header: "등록일",
            className: "w-[200px]",
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
                        onAdd={() => {
                            router.push("/about/regulations/create");
                        }}
                        onDelete={() => {
                            if (selectedRows.length > 0) {
                                const selectedIds = selectedRows.map((row) => row.id);
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

                {/* 규정 문서 테이블 */}
                <div className="w-full">
                    <DataTable
                        columns={columns}
                        data={currentData}
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
