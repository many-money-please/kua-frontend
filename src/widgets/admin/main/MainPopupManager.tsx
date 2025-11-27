"use client";

import { useMemo, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiTrash2 } from "react-icons/fi";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { ManagerSearchBar } from "@/shared/ui/SearchBar/ManagerSearchBar";

type PopupItem = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    isExposed: boolean;
};

const mockData: PopupItem[] = [
    {
        id: "1",
        title: "수영 대회일정 공지사항",
        startDate: "2025. 11. 10",
        endDate: "2026. 05. 15",
        isExposed: true,
    },
    {
        id: "2",
        title: "협회 공지 - 홈페이지 리뉴얼 안내",
        startDate: "2025. 12. 01",
        endDate: "2026. 03. 31",
        isExposed: true,
    },
    {
        id: "3",
        title: "신규 회원 모집 캠페인",
        startDate: "2025. 11. 20",
        endDate: "2026. 01. 20",
        isExposed: false,
    },
    {
        id: "4",
        title: "국제대회 일정 변경 안내",
        startDate: "2025. 12. 15",
        endDate: "2026. 04. 30",
        isExposed: true,
    },
    {
        id: "5",
        title: "연말 기부 캠페인 참여 안내",
        startDate: "2025. 12. 20",
        endDate: "2026. 02. 15",
        isExposed: false,
    },
];

const reorderList = <T,>(
    list: T[],
    fromId: string,
    toId: string,
    getId: (item: T) => string,
) => {
    const sourceIndex = list.findIndex((item) => getId(item) === fromId);
    const targetIndex = list.findIndex((item) => getId(item) === toId);
    if (sourceIndex === -1 || targetIndex === -1) {
        return list;
    }
    const updated = [...list];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    return updated;
};

export const MainPopupManager = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("제목");
    const [selectedRows, setSelectedRows] = useState<PopupItem[]>([]);
    const [popupData, setPopupData] = useState<PopupItem[]>(mockData);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return popupData;
        return popupData.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery, popupData]);

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

    const handleToggleExposure = (id: string) => {
        setPopupData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isExposed: !item.isExposed } : item,
            ),
        );
    };

    const handleDragStart = (
        event: DragEvent<HTMLButtonElement>,
        id: string,
    ) => {
        event.dataTransfer.effectAllowed = "move";
        setDraggingId(id);
    };

    const handleDragEnter = (id: string) => {
        if (!draggingId || draggingId === id) {
            return;
        }
        setDragOverId(id);
    };

    const handleDragEnd = () => {
        setDraggingId(null);
        setDragOverId(null);
    };

    const handleDrop = (targetId: string) => {
        if (!draggingId || draggingId === targetId) {
            handleDragEnd();
            return;
        }
        setPopupData((prev) =>
            reorderList(prev, draggingId, targetId, (item) => item.id),
        );
        // TODO: 서버 API 연동 시, 순서 변경 결과를 저장하도록 요청 전송
        handleDragEnd();
    };

    const columns: Column<PopupItem>[] = [
        {
            key: "drag",
            header: "",
            accessor: (row) => (
                <div className="flex justify-center">
                    <button
                        type="button"
                        draggable
                        onDragStart={(event) => handleDragStart(event, row.id)}
                        onDragEnd={handleDragEnd}
                        className="text-kua-gray400 hover:text-kua-main cursor-grab rounded-full p-1 transition active:cursor-grabbing"
                        aria-label="순서 변경"
                    >
                        <FiMenu size={20} />
                    </button>
                </div>
            ),
            className: "w-12",
        },
        {
            key: "title",
            header: "제목",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.title}</span>
            ),
        },
        {
            key: "period",
            header: "기간",
            accessor: (row) => (
                <span className="text-kua-gray800">
                    {row.startDate} ~ {row.endDate}
                </span>
            ),
        },
        {
            key: "isExposed",
            header: "노출 여부",
            accessor: (row) => (
                <div className="flex flex-col items-center justify-center gap-1">
                    <button
                        type="button"
                        className={`h-7 w-14 cursor-pointer rounded-full transition-colors ${
                            row.isExposed
                                ? "bg-kua-main shadow-[0_0_12px_rgba(36,64,143,0.35)]"
                                : "bg-kua-gray300"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleExposure(row.id);
                        }}
                    >
                        <span
                            className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                                row.isExposed
                                    ? "translate-x-7"
                                    : "translate-x-1"
                            }`}
                        />
                    </button>
                </div>
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
        router.push("/admin/main/popup/create");
    };

    const handleDelete = () => {
        // TODO: 선택된 항목 삭제 로직
        console.log("삭제할 항목:", selectedRows);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">메인 관리</h1>
            </div>

            <div className="border-kua-gray300 flex gap-6 border-b">
                <Link
                    href="/admin/main/popup"
                    className="border-kua-main text-kua-main border-b-2 px-4 pb-3 text-lg font-medium"
                >
                    팝업관리
                </Link>
                <Link
                    href="/admin/main/section"
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    섹션 관리
                </Link>
                <Link
                    href="/admin/main/logo"
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    로고 관리
                </Link>
            </div>

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
                placeholder="검색"
                addButtonText="신규 생성"
            />

            <DataTable
                columns={columns}
                data={paginationInfo.visibleData}
                getRowId={(row) => row.id}
                onSelectionChange={setSelectedRows}
                getRowProps={(row) => {
                    const isDragging = draggingId === row.id;
                    const isDragOver =
                        dragOverId === row.id && draggingId !== row.id;
                    return {
                        onDragOver: (event) => {
                            if (!draggingId || draggingId === row.id) {
                                return;
                            }
                            event.preventDefault();
                            handleDragEnter(row.id);
                        },
                        onDrop: () => handleDrop(row.id),
                        className: `${isDragOver ? "ring-2 ring-kua-main" : ""} ${
                            isDragging ? "opacity-60" : ""
                        }`,
                    };
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

