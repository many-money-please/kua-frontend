"use client";

import { useMemo, useState, useEffect, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiTrash2 } from "react-icons/fi";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { ManagerSearchBar } from "@/shared/ui/SearchBar/ManagerSearchBar";
import type { Popup, PopupListResponse } from "@/shared/api/types";

type PopupItem = {
    id: string; // number를 string으로 변환하여 사용
    title: string;
    startDate: string; // "YYYY. MM. DD" 형식 (표시용)
    endDate: string; // "YYYY. MM. DD" 형식 (표시용)
    isExposed: boolean; // isActive를 isExposed로 매핑
};

// 날짜 포맷팅: "YYYY-MM-DD" -> "YYYY. MM. DD"
const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
};

// 날짜 포맷팅: "YYYY. MM. DD" -> "YYYY-MM-DD"
const parseDate = (dateString: string): string => {
    if (!dateString) return "";
    return dateString.replace(/\.\s/g, "-").replace(/\s/g, "");
};

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

type MainPopupManagerProps = {
    initialPopups?: PopupItem[];
};

export const MainPopupManager = ({
    initialPopups = [],
}: MainPopupManagerProps) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("제목");
    const [selectedRows, setSelectedRows] = useState<PopupItem[]>([]);
    const [popupData, setPopupData] = useState<PopupItem[]>(initialPopups);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 검색 시에만 클라이언트에서 데이터 가져오기
    useEffect(() => {
        // 초기 로딩은 서버에서 이미 완료되었으므로 검색어가 있을 때만 fetch
        if (!searchQuery.trim()) {
            // 검색어가 없으면 초기 데이터로 복원
            setPopupData(initialPopups);
            return;
        }

        const fetchPopups = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `/api/admin/main/popup?title=${encodeURIComponent(searchQuery.trim())}`;

                const response = await fetch(url, {
                    credentials: "include",
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(
                        errorData.error ||
                            "팝업 목록을 가져오는데 실패했습니다.",
                    );
                }

                const data: PopupListResponse = await response.json();
                // 백엔드는 배열을 직접 반환하므로 data가 배열임
                const popups: PopupItem[] = (data || []).map(
                    (popup: Popup) => ({
                        id: String(popup.id), // number를 string으로 변환
                        title: popup.title,
                        startDate: formatDate(popup.startDate),
                        endDate: formatDate(popup.endDate),
                        isExposed: popup.isActive, // isActive를 isExposed로 매핑
                    }),
                );

                setPopupData(popups);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "팝업 목록을 가져오는데 실패했습니다.",
                );
                console.error("팝업 목록 가져오기 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPopups();
    }, [searchQuery, initialPopups]);

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

    const handleToggleExposure = async (id: string) => {
        const popup = popupData.find((item) => item.id === id);
        if (!popup) return;

        const newExposed = !popup.isExposed;

        // 낙관적 업데이트
        setPopupData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isExposed: newExposed } : item,
            ),
        );

        try {
            // PATCH /api/popups/{id}/toggle 사용
            const response = await fetch(`/api/admin/main/popup/${id}/toggle`, {
                method: "PATCH",
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || "노출 상태 변경에 실패했습니다.",
                );
            }

            // 성공 시 서버에서 최신 데이터 다시 가져오기
            const fetchPopups = async () => {
                const res = await fetch("/api/admin/main/popup", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data: PopupListResponse = await res.json();
                    const popups: PopupItem[] = (data || []).map(
                        (popup: Popup) => ({
                            id: String(popup.id),
                            title: popup.title,
                            startDate: formatDate(popup.startDate),
                            endDate: formatDate(popup.endDate),
                            isExposed: popup.isActive,
                        }),
                    );
                    setPopupData(popups);
                }
            };
            await fetchPopups();
        } catch (err) {
            // 실패 시 원래 상태로 복구
            setPopupData((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, isExposed: !newExposed } : item,
                ),
            );
            alert(
                err instanceof Error
                    ? err.message
                    : "노출 상태 변경에 실패했습니다.",
            );
        }
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

    const handleDrop = async (targetId: string) => {
        if (!draggingId || draggingId === targetId) {
            handleDragEnd();
            return;
        }

        // 낙관적 업데이트
        const reordered = reorderList(
            popupData,
            draggingId,
            targetId,
            (item) => item.id,
        );
        setPopupData(reordered);
        handleDragEnd();

        try {
            // string id를 number로 변환
            const popupIds = reordered.map((item) => Number(item.id));
            const response = await fetch("/api/admin/main/popup/reorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ popupIds }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "순서 변경에 실패했습니다.");
            }

            // 성공 시 서버에서 최신 데이터 다시 가져오기
            const fetchPopups = async () => {
                const res = await fetch("/api/admin/main/popup", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data: PopupListResponse = await res.json();
                    const popups: PopupItem[] = (data || []).map(
                        (popup: Popup) => ({
                            id: String(popup.id),
                            title: popup.title,
                            startDate: formatDate(popup.startDate),
                            endDate: formatDate(popup.endDate),
                            isExposed: popup.isActive,
                        }),
                    );
                    setPopupData(popups);
                }
            };
            await fetchPopups();
        } catch (err) {
            // 실패 시 원래 데이터 다시 가져오기
            const fetchPopups = async () => {
                const res = await fetch("/api/admin/main/popup", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data: PopupListResponse = await res.json();
                    const popups: PopupItem[] = (data || []).map(
                        (popup: Popup) => ({
                            id: String(popup.id),
                            title: popup.title,
                            startDate: formatDate(popup.startDate),
                            endDate: formatDate(popup.endDate),
                            isExposed: popup.isActive,
                        }),
                    );
                    setPopupData(popups);
                }
            };
            await fetchPopups();
            alert(
                err instanceof Error
                    ? err.message
                    : "순서 변경에 실패했습니다.",
            );
        }
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
            accessor: (row) => (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={async (e) => {
                            e.stopPropagation();
                            if (
                                !confirm(
                                    `"${row.title}" 팝업을 삭제하시겠습니까?`,
                                )
                            ) {
                                return;
                            }

                            try {
                                const response = await fetch(
                                    `/api/admin/main/popup/${row.id}`,
                                    {
                                        method: "DELETE",
                                        credentials: "include",
                                    },
                                );

                                if (!response.ok) {
                                    const errorData = await response
                                        .json()
                                        .catch(() => ({}));
                                    throw new Error(
                                        errorData.error ||
                                            "팝업 삭제에 실패했습니다.",
                                    );
                                }

                                // 삭제 성공 시 목록에서 제거
                                setPopupData((prev) =>
                                    prev.filter((item) => item.id !== row.id),
                                );
                            } catch (err) {
                                alert(
                                    err instanceof Error
                                        ? err.message
                                        : "팝업 삭제에 실패했습니다.",
                                );
                            }
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

    const handleDelete = async () => {
        if (selectedRows.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        if (
            !confirm(
                `선택한 ${selectedRows.length}개의 팝업을 삭제하시겠습니까?`,
            )
        ) {
            return;
        }

        try {
            const deletePromises = selectedRows.map((row) =>
                fetch(`/api/admin/main/popup/${row.id}`, {
                    method: "DELETE",
                    credentials: "include",
                }),
            );

            const results = await Promise.allSettled(deletePromises);
            const failed = results.filter(
                (result) => result.status === "rejected",
            );

            if (failed.length > 0) {
                throw new Error(
                    `${failed.length}개의 팝업 삭제에 실패했습니다.`,
                );
            }

            // 삭제 성공 시 목록에서 제거
            const deletedIds = selectedRows.map((row) => row.id);
            setPopupData((prev) =>
                prev.filter((item) => !deletedIds.includes(item.id)),
            );
            setSelectedRows([]);
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "팝업 삭제에 실패했습니다.",
            );
        }
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

            {loading && (
                <div className="text-kua-gray500 py-10 text-center">
                    로딩중...
                </div>
            )}

            {error && (
                <div className="text-kua-orange500 py-4 text-center">
                    {error}
                </div>
            )}

            {!loading && !error && (
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
            )}

            {!loading && !error && paginationInfo.totalPages > 1 && (
                <Pagination
                    currentPage={paginationInfo.currentPage}
                    totalPages={paginationInfo.totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
};
