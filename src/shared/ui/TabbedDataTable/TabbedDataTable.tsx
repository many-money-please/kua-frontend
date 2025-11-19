"use client";

import { useEffect, useState } from "react";
import { TabNavigation, type TabItem } from "@/shared/ui/TabNavigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";

const DEFAULT_PAGE_SIZE = 15;

/**
 * 탭별 데이터와 컬럼 정의를 담는 타입
 *
 * @template T - 테이블 행 데이터의 타입
 *
 * @property id - 탭의 고유 식별자 (문자열)
 * @property label - 탭 버튼에 표시될 라벨 텍스트
 * @property columns - DataTable에서 사용할 컬럼 정의 배열
 * @property data - 해당 탭에서 표시할 데이터 배열
 * @property onRowClick - 행 클릭 시 실행될 콜백 함수 (선택적)
 * @property totalItems - 페이지네이션을 위한 전체 개수 (선택적, 미설정 시 data.length 사용)
 * @property pageSize - 탭별 페이지 크기 (선택적, 기본값 15)
 * @property initialPage - 탭별 초기 페이지 (선택적, 기본값 1)
 * @property onPageChange - 페이지 전환 시 실행될 콜백 (서버 연동 시 활용)
 */
export type TabData<T = any> = {
    id: string;
    label: string;
    columns: Column<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
    totalItems?: number;
    pageSize?: number;
    initialPage?: number;
    onPageChange?: (page: number) => void;
};

type TabbedDataTableProps<T = any> = {
    tabs: TabData<T>[];
    defaultTabId?: string;
    searchOptions?: {
        options?: string[];
        placeholder?: string;
        onSearch?: (query: string, option: string) => void;
    };
    showSearch?: boolean;
    className?: string;
    tableClassName?: string;
    headerClassName?: string;
    rowClassName?: string;
    pagination?: {
        pageSize?: number;
        initialPage?: number;
        onPageChange?: (params: { tabId: string; page: number }) => void;
    };
};

/**
 * TabbedDataTable 컴포넌트
 *
 * 탭 기반으로 여러 데이터 테이블을 전환할 수 있는 재사용 가능한 컴포넌트입니다.
 * 각 탭마다 독립적인 컬럼 정의와 데이터를 가질 수 있으며, 검색 및 페이지네이션 기능을 포함합니다.
 */

export const TabbedDataTable = <T,>({
    tabs,
    defaultTabId,
    searchOptions,
    showSearch = true,
    className = "",
    tableClassName = "",
    headerClassName = "",
    rowClassName = "",
    pagination,
}: TabbedDataTableProps<T>) => {
    const [activeTab, setActiveTab] = useState(
        defaultTabId || tabs[0]?.id || "",
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState(
        searchOptions?.options?.[0] || "제목",
    );

    const fallbackInitialPage = pagination?.initialPage ?? 1;
    const [pageByTab, setPageByTab] = useState<Record<string, number>>(() =>
        tabs.reduce(
            (acc, tab) => {
                acc[tab.id] = tab.initialPage ?? fallbackInitialPage;
                return acc;
            },
            {} as Record<string, number>,
        ),
    );

    useEffect(() => {
        setPageByTab((prev) => {
            const next: Record<string, number> = {};
            tabs.forEach((tab) => {
                next[tab.id] =
                    prev[tab.id] ?? tab.initialPage ?? fallbackInitialPage;
            });
            return next;
        });
    }, [tabs, fallbackInitialPage]);

    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    const totalCount =
        activeTabData?.totalItems ?? activeTabData?.data.length ?? 0;

    const getPaginationInfo = (tab: TabData<T>) => {
        const pageSize =
            tab.pageSize ?? pagination?.pageSize ?? DEFAULT_PAGE_SIZE;
        const storedPage =
            pageByTab[tab.id] ?? tab.initialPage ?? fallbackInitialPage;
        const totalItems = tab.totalItems ?? tab.data.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(storedPage, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const visibleData =
            tab.totalItems !== undefined
                ? tab.data
                : tab.data.slice(startIndex, startIndex + pageSize);

        return { totalPages, currentPage, visibleData };
    };

    const paginationInfo =
        activeTabData !== undefined
            ? getPaginationInfo(activeTabData)
            : undefined;

    const tabItems: TabItem[] = tabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
    }));

    const handleSearch = () => {
        searchOptions?.onSearch?.(searchQuery, searchOption);
    };

    const handlePageChange = (tabId: string, nextPage: number) => {
        setPageByTab((prev) => ({ ...prev, [tabId]: nextPage }));
        const targetTab = tabs.find((tab) => tab.id === tabId);
        targetTab?.onPageChange?.(nextPage);
        pagination?.onPageChange?.({ tabId, page: nextPage });
    };

    return (
        <div className={`flex w-full flex-col gap-8 ${className}`}>
            <TabNavigation
                tabs={tabItems}
                activeTabId={activeTab}
                onTabChange={setActiveTab}
            />

            {showSearch && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">목록</span>
                        <span className="text-kua-gray800">
                            총{" "}
                            <span className="text-kua-blue300">
                                {totalCount.toLocaleString()}
                            </span>
                            건
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {searchOptions?.options && (
                            <select
                                value={searchOption}
                                onChange={(e) =>
                                    setSearchOption(e.target.value)
                                }
                                className="bg-kua-gray100 rounded-lg px-3 py-2"
                            >
                                {searchOptions.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                        <input
                            type="text"
                            placeholder={
                                searchOptions?.placeholder ||
                                "검색어를 입력하세요"
                            }
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            className="bg-kua-gray100 text-kua-gray400 w-64 rounded-lg px-4 py-2"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="bg-kua-blue500 text-kua-white hover:bg-kua-blue600 rounded-lg px-6 py-2 font-semibold transition-colors"
                        >
                            검색
                        </button>
                    </div>
                </div>
            )}

            <div className={`bg-white ${tableClassName}`}>
                {activeTabData && (
                    <>
                        <DataTable
                            columns={activeTabData.columns}
                            data={paginationInfo?.visibleData ?? []}
                            headerClassName={headerClassName || ""}
                            rowClassName={rowClassName || "hover:bg-kua-sky50"}
                            onRowClick={activeTabData.onRowClick}
                        />
                        {paginationInfo && paginationInfo.totalPages > 1 && (
                            <Pagination
                                currentPage={paginationInfo.currentPage}
                                totalPages={paginationInfo.totalPages}
                                onPageChange={(page) =>
                                    handlePageChange(activeTabData.id, page)
                                }
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
