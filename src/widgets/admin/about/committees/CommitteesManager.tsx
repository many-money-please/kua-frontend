"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { ManagerSearchBar } from "@/shared/ui/SearchBar/ManagerSearchBar";

type CommitteeItem = {
    id: string;
    name: string;
    chairman: string;
    secretary: string;
    mainFunctions: string;
};

const mockData: CommitteeItem[] = [
    {
        id: "1",
        name: "스포츠공정위원회",
        chairman: "홍길동",
        secretary: "김철수",
        mainFunctions: "스포츠 공정성 확보",
    },
    {
        id: "2",
        name: "경기력향상위원회",
        chairman: "이영희",
        secretary: "박민수",
        mainFunctions: "경기력 향상",
    },
    {
        id: "3",
        name: "대회위원회",
        chairman: "최동욱",
        secretary: "정수진",
        mainFunctions: "대회 운영",
    },
    {
        id: "4",
        name: "심판위원회",
        chairman: "강민호",
        secretary: "윤지영",
        mainFunctions: "심판 관리",
    },
    {
        id: "5",
        name: "학교운동부지도자위원회",
        chairman: "송태현",
        secretary: "임수빈",
        mainFunctions: "학교 운동부 지도",
    },
    {
        id: "6",
        name: "선수위원회",
        chairman: "한소희",
        secretary: "오준혁",
        mainFunctions: "선수 관리",
    },
    {
        id: "7",
        name: "도핑위원회",
        chairman: "배성민",
        secretary: "신혜진",
        mainFunctions: "도핑 방지",
    },
    {
        id: "8",
        name: "인사위원회",
        chairman: "류현우",
        secretary: "조아름",
        mainFunctions: "인사 관리",
    },
    {
        id: "9",
        name: "기술위원회 (스킨스쿠버)",
        chairman: "문재성",
        secretary: "강미라",
        mainFunctions: "스킨스쿠버 기술",
    },
    {
        id: "10",
        name: "기술위원회 (프리다이빙)",
        chairman: "양준호",
        secretary: "노하은",
        mainFunctions: "프리다이빙 기술",
    },
];

export const CommitteesManager = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("위원회명");
    const [selectedRows, setSelectedRows] = useState<CommitteeItem[]>([]);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = useMemo(() => {
        let data = [...mockData];
        if (searchQuery.trim()) {
            if (searchOption === "위원회명") {
                data = data.filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
                );
            }
        }
        if (sortColumn) {
            data.sort((a, b) => {
                const aValue = (a as Record<string, string>)[sortColumn] ?? "";
                const bValue = (b as Record<string, string>)[sortColumn] ?? "";
                return sortDirection === "asc"
                    ? String(aValue).localeCompare(String(bValue))
                    : String(bValue).localeCompare(String(aValue));
            });
        }
        return data;
    }, [searchQuery, searchOption, sortColumn, sortDirection]);

    const paginationInfo = useMemo(() => {
        const pageSize = 10;
        const totalItems = filteredData.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(page, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const visibleData = filteredData.slice(
            startIndex,
            startIndex + pageSize,
        );
        return { totalPages, currentPage, visibleData, totalItems };
    }, [filteredData, page]);

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const columns: Column<CommitteeItem>[] = [
        {
            key: "name",
            header: "위원회명",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.name}</span>
            ),
            headerClassName: "cursor-pointer",
        },
        {
            key: "chairman",
            header: "위원장",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.chairman}</span>
            ),
        },
        {
            key: "secretary",
            header: "간사",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.secretary}</span>
            ),
        },
        {
            key: "mainFunctions",
            header: "주요기능",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.mainFunctions}</span>
            ),
        },
        {
            key: "delete",
            header: "삭제",
            accessor: () => (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            // TODO: 삭제 로직
                        }}
                        className="text-kua-gray400 hover:text-kua-orange500"
                    >
                        <FiTrash2 size={20} />
                    </button>
                </div>
            ),
        },
    ];

    const handleSearch = () => {
        setPage(1);
    };

    const handleAdd = () => {
        router.push("/admin/about/committees/create");
    };

    const handleDelete = () => {
        // TODO: 선택된 항목 삭제 로직
        console.log("삭제할 항목:", selectedRows);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">협회 소개 관리</h1>
            </div>

            <div className="border-kua-gray300 flex gap-6 border-b">
                <Link
                    href="/admin/about/greetings"
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    인사말
                </Link>
                <Link
                    href="/admin/about/history"
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    연혁
                </Link>
                <Link
                    href="/admin/about/organization"
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    조직도
                </Link>
                <Link
                    href="/admin/about/committees"
                    className="border-kua-main text-kua-main border-b-2 px-4 pb-3 text-lg font-medium"
                >
                    위원회 소개
                </Link>
                <Link
                    href="/admin/about/branches"
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    시/도 지부소개
                </Link>
            </div>

            <ManagerSearchBar
                searchQuery={searchQuery}
                searchOption={searchOption}
                searchOptions={["위원회명"]}
                onSearchQueryChange={setSearchQuery}
                onSearchOptionChange={setSearchOption}
                onSearch={handleSearch}
                onAdd={handleAdd}
                onDelete={handleDelete}
                selectedCount={selectedRows.length}
                placeholder="검색"
                addButtonText="신규 생성"
            />

            <DataTable
                columns={columns}
                data={paginationInfo.visibleData}
                getRowId={(row) => row.id}
                onSelectionChange={setSelectedRows}
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