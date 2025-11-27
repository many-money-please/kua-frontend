"use client";

import { useState, useMemo, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiTrash2 } from "react-icons/fi";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { ManagerSearchBar } from "@/shared/ui/SearchBar/ManagerSearchBar";

type SectionItem = {
    id: string;
    image: string;
    title: string;
    postDate: string;
    isExposed: boolean;
};

const mockData: SectionItem[] = [
    {
        id: "1",
        image: "/imgs/main/hero_1.png",
        title: "대한수중핀수영협회, 수중 스포츠의 미래를 이끌어갑니다.",
        postDate: "2025. 11. 10",
        isExposed: true,
    },
    {
        id: "2",
        image: "/imgs/main/hero_2.png",
        title: "세계 대회 출전 선수단을 소개합니다.",
        postDate: "2025. 11. 12",
        isExposed: true,
    },
    {
        id: "3",
        image: "/imgs/main/hero_3.png",
        title: "새로운 수중 스포츠 교육 프로그램 개설",
        postDate: "2025. 11. 15",
        isExposed: false,
    },
    {
        id: "4",
        image: "/imgs/main/hero_1.png",
        title: "청소년 핀수영 캠프 참가 모집",
        postDate: "2025. 11. 18",
        isExposed: true,
    },
    {
        id: "5",
        image: "/imgs/main/hero_2.png",
        title: "협회 뉴스레터 12월호 발행",
        postDate: "2025. 11. 21",
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

export const MainSectionManager = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("제목");
    const [selectedRows, setSelectedRows] = useState<SectionItem[]>([]);
    const [sectionData, setSectionData] = useState<SectionItem[]>(mockData);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return sectionData;
        return sectionData.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery, sectionData]);

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
        setSectionData((prev) =>
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
        setSectionData((prev) =>
            reorderList(prev, draggingId, targetId, (item) => item.id),
        );
        // TODO: 서버 API 연동 시 순서 변경 결과 저장
        handleDragEnd();
    };

    const columns: Column<SectionItem>[] = [
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
            key: "image",
            header: "대표 이미지",
            accessor: (row) => (
                <div className="flex justify-center">
                    <Image
                        src={row.image}
                        alt={row.title}
                        width={80}
                        height={60}
                        className="h-15 w-20 rounded object-cover"
                    />
                </div>
            ),
        },
        {
            key: "title",
            header: "제목",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.title}</span>
            ),
        },
        {
            key: "postDate",
            header: "게시 날짜",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.postDate}</span>
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
        router.push("/admin/main/section/create");
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
                    className="text-kua-gray500 hover:text-kua-gray800 border-b-2 border-transparent px-4 pb-3 text-lg font-medium"
                >
                    팝업관리
                </Link>
                <Link
                    href="/admin/main/section"
                    className="border-kua-main text-kua-main border-b-2 px-4 pb-3 text-lg font-medium"
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
                addButtonText="신규 등록"
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