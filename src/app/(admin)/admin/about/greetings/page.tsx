"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { ManagerSearchBar } from "@/shared/ui/SearchBar/ManagerSearchBar";
import { FiTrash2, FiMenu } from "react-icons/fi";

type GreetingItem = {
    id: string;
    content: string;
    date: string;
};

// 임시 데이터
const mockData: GreetingItem[] = [
    {
        id: "1",
        content:
            "안녕하십니까. 대한수중핀수영협회 제15대 회장 강철식입니다. 수중스포츠 가족 여러분들의 방문을 진심으로 환영합니다...",
        date: "2025. 12. 25",
    },
    {
        id: "2",
        content:
            "안녕하십니까. 대한수중핀수영협회 제15대 회장 강철식입니다. 수중스포츠 가족 여러분들의 방문을 진심으로 환영합니다...",
        date: "2025. 12. 25",
    },
];

export default function GreetingsPage() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("내용");
    const [selectedRows, setSelectedRows] = useState<GreetingItem[]>([]);

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return mockData;
        return mockData.filter((item) =>
            item.content.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery]);

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

    const columns: Column<GreetingItem>[] = [
        {
            key: "drag",
            header: "",
            accessor: () => (
                <div className="flex justify-center">
                    <FiMenu className="text-kua-gray400" size={20} />
                </div>
            ),
            className: "w-12",
        },
        {
            key: "content",
            header: "내용",
            accessor: (row) => (
                <span className="text-kua-gray800 text-left">
                    {row.content}
                </span>
            ),
            className: "text-left",
        },
        {
            key: "date",
            header: "날짜",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.date}</span>
            ),
        },
        {
            key: "delete",
            header: "삭제",
            accessor: (row) => (
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
        router.push("/admin/about/greetings/create");
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
                    className="border-kua-main text-kua-main border-b-2 px-4 pb-3 text-lg font-medium"
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
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
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
                searchOptions={["내용"]}
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
}
