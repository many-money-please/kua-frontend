"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { ManagerSearchBar } from "@/shared/ui/SearchBar/ManagerSearchBar";

type WithdrawnMemberItem = {
    id: string;
    name: string;
    userId: string;
    email: string;
    phone: string;
    withdrawDate: string;
};

// 임시 데이터
const mockData: WithdrawnMemberItem[] = [];

export default function WithdrawnMembersPage() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("이름");
    const [selectedRows, setSelectedRows] = useState<WithdrawnMemberItem[]>(
        [],
    );

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return mockData;
        return mockData.filter((item) => {
            if (searchOption === "이름") {
                return item.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            }
            return true;
        });
    }, [searchQuery, searchOption]);

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

    const columns: Column<WithdrawnMemberItem>[] = [
        {
            key: "name",
            header: "이름",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.name}</span>
            ),
        },
        {
            key: "userId",
            header: "ID",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.userId}</span>
            ),
        },
        {
            key: "email",
            header: "이메일",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.email}</span>
            ),
        },
        {
            key: "phone",
            header: "전화번호",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.phone}</span>
            ),
        },
        {
            key: "withdrawDate",
            header: "탈퇴일",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.withdrawDate}</span>
            ),
        },
    ];

    const handleSearch = () => {
        setPage(1);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">회원 관리</h1>
            </div>

            <div className="border-b border-kua-gray300 flex gap-6">
                <Link
                    href="/admin/members/list"
                    className="border-b-2 border-transparent px-4 pb-3 text-lg font-medium text-kua-gray500 hover:text-kua-gray800"
                >
                    회원 관리
                </Link>
                <Link
                    href="/admin/members/withdrawn"
                    className="border-b-2 border-kua-main px-4 pb-3 text-lg font-medium text-kua-main"
                >
                    탈퇴 관리
                </Link>
            </div>

            <ManagerSearchBar
                searchQuery={searchQuery}
                searchOption={searchOption}
                searchOptions={["이름"]}
                onSearchQueryChange={setSearchQuery}
                onSearchOptionChange={setSearchOption}
                onSearch={handleSearch}
                onAdd={() => {}}
                onDelete={() => {}}
                selectedCount={0}
                placeholder="검색"
                addButtonText=""
            />

            <DataTable
                columns={columns}
                data={paginationInfo.visibleData}
                getRowId={(row) => row.id}
                onSelectionChange={setSelectedRows}
                canDelete={true}
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

