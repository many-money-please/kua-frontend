"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar } from "@/shared/ui/SearchBar";

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
}: CommunityTableSectionProps) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState(
        searchOptions?.[0] ?? "제목",
    );

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) {
            return data;
        }
        const lowerQuery = searchQuery.toLowerCase();
        return data.filter((item) =>
            item.title.toLowerCase().includes(lowerQuery),
        );
    }, [data, searchQuery]);

    const paginationInfo = useMemo(() => {
        const totalItems = filteredData.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(page, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const visibleData = filteredData.slice(
            startIndex,
            startIndex + pageSize,
        );
        return { totalItems, totalPages, currentPage, visibleData };
    }, [filteredData, page, pageSize]);

    const handleSearch = () => {
        setSearchQuery(searchInput.trim());
        setPage(1);
    };

    return (
        <section className="mb-12 flex w-full max-w-[1200px] flex-col gap-6">
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">{title}</span>
                <SearchBar
                    totalCount={paginationInfo.totalItems}
                    searchQuery={searchInput}
                    searchOption={searchOption}
                    searchOptions={searchOptions}
                    onSearchQueryChange={setSearchInput}
                    onSearchOptionChange={setSearchOption}
                    onSearch={handleSearch}
                />
            </div>

            <DataTable
                columns={columns}
                data={paginationInfo.visibleData}
                onRowClick={(row) => router.push(`${detailBasePath}/${row.id}`)}
                rowClassName="hover:bg-kua-sky50"
            />

            {paginationInfo.totalPages > 1 && (
                <Pagination
                    currentPage={paginationInfo.currentPage}
                    totalPages={paginationInfo.totalPages}
                    onPageChange={setPage}
                />
            )}
        </section>
    );
};
