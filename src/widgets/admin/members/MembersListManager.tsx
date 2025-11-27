"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";

type MemberItem = {
    id: string;
    name: string;
    userId: string;
    email: string;
    phone: string;
    termsAgreed: boolean;
    joinDate: string;
};

const mockData: MemberItem[] = [
    {
        id: "1",
        name: "홍길동",
        userId: "아이디",
        email: "abcdefghi@naver.com",
        phone: "010-1234-5678",
        termsAgreed: true,
        joinDate: "2025. 10. 15",
    },
    {
        id: "2",
        name: "홍길동",
        userId: "아이디",
        email: "abcdefghi@naver.com",
        phone: "010-1234-5678",
        termsAgreed: true,
        joinDate: "2025. 10. 15",
    },
    {
        id: "3",
        name: "홍길동",
        userId: "아이디",
        email: "abcdefghi@naver.com",
        phone: "010-1234-5678",
        termsAgreed: true,
        joinDate: "2025. 10. 15",
    },
    {
        id: "4",
        name: "홍길동",
        userId: "아이디",
        email: "abcdefghi@naver.com",
        phone: "010-1234-5678",
        termsAgreed: false,
        joinDate: "2025. 10. 15",
    },
    {
        id: "5",
        name: "홍길동",
        userId: "아이디",
        email: "abcdefghi@naver.com",
        phone: "010-1234-5678",
        termsAgreed: true,
        joinDate: "2025. 10. 15",
    },
];

export const MembersListManager = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("이름");
    const [selectedRows, setSelectedRows] = useState<MemberItem[]>([]);

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

    const columns: Column<MemberItem>[] = [
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
            key: "termsAgreed",
            header: "약관 동의",
            accessor: (row) => (
                <div className="flex justify-center">
                    <span
                        className={`rounded-full px-3 py-1 text-sm ${
                            row.termsAgreed
                                ? "bg-kua-blue50 text-kua-main"
                                : "bg-kua-gray200 text-kua-gray500"
                        }`}
                    >
                        {row.termsAgreed ? "동의 완료" : "비동의"}
                    </span>
                </div>
            ),
        },
        {
            key: "joinDate",
            header: "가입일",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.joinDate}</span>
            ),
        },
    ];

    const handleSearch = () => {
        setPage(1);
    };

    const handleWithdraw = () => {
        if (selectedRows.length === 0) {
            alert("탈퇴 처리할 회원을 선택해주세요.");
            return;
        }
        if (
            confirm(
                `선택한 ${selectedRows.length}명의 회원을 탈퇴 처리하시겠습니까?`,
            )
        ) {
            console.log("탈퇴 처리할 회원:", selectedRows);
            alert("탈퇴 처리가 완료되었습니다.");
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">회원 관리</h1>
            </div>

            <div className="border-kua-gray300 flex gap-6 border-b">
                <Link
                    href="/admin/members/list"
                    className="border-kua-main text-kua-main border-b-2 px-4 pb-3 text-lg font-medium"
                >
                    회원 관리
                </Link>
                <Link
                    href="/admin/members/withdrawn"
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    탈퇴 관리
                </Link>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex h-[40px] items-center gap-4">
                        <select
                            value={searchOption}
                            onChange={(e) => setSearchOption(e.target.value)}
                            className="bg-kua-gray100 h-full rounded-lg px-3 py-2"
                        >
                            <option value="이름">이름</option>
                        </select>
                        <input
                            type="text"
                            placeholder="검색"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            className="bg-kua-gray100 text-kua-gray400 h-full w-full rounded-lg px-4 py-2 sm:w-64"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="bg-kua-blue500 text-kua-white hover:bg-kua-blue600 h-full cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors"
                        >
                            검색
                        </button>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleWithdraw}
                    className="bg-kua-orange500 text-kua-white rounded-lg px-6 py-2 whitespace-nowrap transition-colors hover:bg-orange-600"
                >
                    탈퇴 처리
                </button>
            </div>

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
};

