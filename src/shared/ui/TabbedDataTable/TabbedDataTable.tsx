"use client";

import { useState } from "react";
import { TabNavigation, type TabItem } from "@/shared/ui/TabNavigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar } from "@/shared/ui/SearchBar";

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
export type TabData = {
    id: string;
    label: string;
    columns: Column[];
    data: unknown[];
    onRowClick?: (row: unknown) => void;
    totalItems?: number;
    pageSize?: number;
    initialPage?: number;
    onPageChange?: (page: number) => void;
};

type TabbedDataTableProps = {
    tabs: TabData[];
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

export const TabbedDataTable = ({
    tabs,
    defaultTabId,
    searchOptions,
    showSearch = true,
    className = "",
    tableClassName = "",
    headerClassName = "",
    rowClassName = "",
    pagination,
}: TabbedDataTableProps) => {
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

    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    const totalCount =
        activeTabData?.totalItems ?? activeTabData?.data.length ?? 0;

    const getPaginationInfo = (tab: TabData) => {
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
                <SearchBar
                    totalCount={totalCount}
                    searchQuery={searchQuery}
                    searchOption={searchOption}
                    searchOptions={searchOptions?.options || ["제목"]}
                    onSearchQueryChange={setSearchQuery}
                    onSearchOptionChange={setSearchOption}
                    onSearch={handleSearch}
                    placeholder={
                        searchOptions?.placeholder || "검색어를 입력하세요"
                    }
                />
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
