"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar, ManagerSearchBar } from "@/shared/ui/SearchBar";
import { useUserRole } from "@/shared/lib/UserRoleContext";
import { useDeleteNotice } from "@/shared/hooks/queries/notices";

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
    const deleteNotice = useDeleteNotice();

    // 클라이언트 사이드 페이지네이션용 state
    const [clientPage, setClientPage] = useState(initialPage);
    // 삭제된 항목 ID를 추적하여 테이블에서 즉시 제거
    const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());

    // 서버 사이드 페이지네이션인 경우 initialPage 사용, 아니면 state 사용
    const page = serverTotalPages !== undefined ? initialPage : clientPage;
    const searchParams = useSearchParams();

    // URL 파라미터에서 검색어와 검색 옵션을 직접 계산 (useMemo 사용)
    const urlTitle = useMemo(
        () => searchParams.get("title") || "",
        [searchParams],
    );
    const urlSearchOption = useMemo(
        () => searchParams.get("searchOption") || searchOptions?.[0] || "제목",
        [searchParams, searchOptions],
    );

    // 입력 필드용 state (사용자가 입력하는 동안 유지)
    const [searchInput, setSearchInput] = useState(urlTitle);
    // 실제 검색에 사용되는 값은 URL 파라미터에서 직접 가져옴
    const searchQuery = urlTitle;
    // 검색 옵션은 state로 유지 (ManagerSearchBar에서 변경 가능)
    const [searchOption, setSearchOption] = useState(urlSearchOption);
    const [selectedRows, setSelectedRows] = useState<CommunityPostSummary[]>(
        [],
    );

    // URL 파라미터가 변경되면 입력 필드와 검색 옵션 값도 동기화
    // useRef로 이전 값 추적하여 불필요한 업데이트 방지
    const prevUrlTitleRef = useRef(urlTitle);
    const prevUrlSearchOptionRef = useRef(urlSearchOption);

    useEffect(() => {
        // URL 파라미터가 실제로 변경되었을 때만 state 업데이트
        // Note: URL 파라미터 동기화를 위한 필수 로직이므로 setState 사용
        if (prevUrlTitleRef.current !== urlTitle) {
            prevUrlTitleRef.current = urlTitle;
            setSearchInput(urlTitle);
        }
        if (prevUrlSearchOptionRef.current !== urlSearchOption) {
            prevUrlSearchOptionRef.current = urlSearchOption;
            setSearchOption(urlSearchOption);
        }
        // URL 파라미터 변경 시에만 동기화하므로 searchInput, searchOption은 dependency에서 제외
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlTitle, urlSearchOption]);

    const filteredData = useMemo(() => {
        // 삭제된 항목 제외
        const filtered = data.filter((item) => !deletedIds.has(item.id));

        // 서버 사이드 페이지네이션인 경우 클라이언트 사이드 필터링 하지 않음
        // (서버에서 이미 필터링된 데이터를 받음)
        if (serverTotalPages !== undefined) {
            return filtered;
        }

        // 클라이언트 사이드 필터링 (기존 로직)
        if (!searchQuery.trim()) {
            return filtered;
        }
        const lowerQuery = searchQuery.toLowerCase();
        return filtered.filter((item) =>
            item.title.toLowerCase().includes(lowerQuery),
        );
    }, [data, searchQuery, deletedIds, serverTotalPages]);

    const paginationInfo = useMemo(() => {
        // 서버 사이드 페이지네이션인 경우
        if (serverTotalPages !== undefined) {
            // 삭제된 항목을 제외한 데이터 사용
            const visibleData = filteredData;
            // 삭제된 항목 수만큼 totalCount 조정
            const adjustedTotalCount =
                (serverTotalCount ?? 0) - deletedIds.size;
            const adjustedTotalPages = Math.max(
                1,
                Math.ceil(adjustedTotalCount / pageSize),
            );
            return {
                totalItems: adjustedTotalCount,
                totalPages: adjustedTotalPages,
                currentPage: page,
                visibleData,
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
        deletedIds.size,
    ]);

    const handleSearch = () => {
        const trimmedQuery = searchInput.trim();

        // 검색 시 첫 페이지로 이동
        if (serverTotalPages !== undefined) {
            // 서버 사이드인 경우 URL 업데이트
            const params = new URLSearchParams(window.location.search);

            // 검색 옵션이 "제목"이고 검색어가 있을 때만 title 파라미터 추가
            if (searchOption === "제목" && trimmedQuery) {
                params.set("title", trimmedQuery);
                params.set("searchOption", "제목");
            } else {
                // 다른 옵션이거나 검색어가 없으면 title 파라미터 제거
                params.delete("title");
                if (trimmedQuery) {
                    params.set("searchOption", searchOption);
                } else {
                    params.delete("searchOption");
                }
            }

            // 첫 페이지로 이동
            params.delete("page");

            router.push(`${detailBasePath}?${params.toString()}`);
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
                        onDelete={async () => {
                            if (selectedRows.length === 0) {
                                alert("삭제할 항목을 선택해주세요.");
                                return;
                            }

                            if (
                                !confirm(
                                    `선택한 ${selectedRows.length}개의 공지사항을 삭제하시겠습니까?`,
                                )
                            ) {
                                return;
                            }

                            try {
                                const selectedIds = selectedRows.map(
                                    (row) => row.id,
                                );

                                // 각 공지사항 삭제
                                await Promise.all(
                                    selectedIds.map((id) =>
                                        deleteNotice.mutateAsync(id),
                                    ),
                                );

                                // 삭제된 항목 ID를 추가하여 테이블에서 즉시 제거
                                setDeletedIds((prev) => {
                                    const newSet = new Set(prev);
                                    selectedIds.forEach((id) => newSet.add(id));
                                    return newSet;
                                });

                                // 삭제 성공 시 선택 초기화
                                setSelectedRows([]);

                                alert(
                                    `${selectedIds.length}개의 공지사항이 삭제되었습니다.`,
                                );
                            } catch (error) {
                                alert(
                                    error instanceof Error
                                        ? error.message
                                        : "공지사항 삭제에 실패했습니다.",
                                );
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
