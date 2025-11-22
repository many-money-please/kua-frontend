"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { Pagination } from "@/shared/ui/Pagination";
import { AdminSearchBar } from "@/shared/ui/SearchBar";
import Image from "next/image";

export type ContactPost = {
    id: number;
    title: string;
    author: string;
    createdAt: string;
    status: "답변 완료" | "답변 대기";
    isSecret: boolean;
};

type ContactSectionProps = {
    title: string;
    data: ContactPost[];
    searchOptions?: string[];
    detailBasePath: string;
    pageSize?: number;
};

const columns: Column<ContactPost>[] = [
    {
        key: "title",
        header: "제목",
        accessor: (row) => (
            <div className="flex items-center justify-center gap-1">
                {row.isSecret && (
                    <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                )}
                <span>{row.title}</span>
            </div>
        ),
    },
    { key: "author", header: "작성자" },
    { key: "createdAt", header: "작성일" },
    {
        key: "status",
        header: "답변상태",
        accessor: (value) => (
            <span
                className={`rounded-full px-3 py-1 text-lg font-semibold ${
                    value.status === "답변 완료"
                        ? "text-kua-main bg-kua-blue50"
                        : "text-kua-gray400 bg-kua-gray250"
                }`}
            >
                {value.status}
            </span>
        ),
    },
];

export const ContactSection = ({
    title,
    data,
    searchOptions,
    detailBasePath,
    pageSize = 15,
}: ContactSectionProps) => {
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

    const handleRegister = () => {
        router.push(`${detailBasePath}/create`);
    };

    return (
        <section className="flex w-full flex-col pt-20">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 pb-[150px]">
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold">{title}</span>
                    <AdminSearchBar
                        totalCount={paginationInfo.totalItems}
                        searchQuery={searchInput}
                        searchOption={searchOption}
                        searchOptions={searchOptions}
                        onSearchQueryChange={setSearchInput}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                        onRegister={handleRegister}
                        buttonText="문의하기"
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={paginationInfo.visibleData}
                    onRowClick={(row) =>
                        router.push(`${detailBasePath}/${row.id}`)
                    }
                    rowClassName="hover:bg-kua-sky50"
                />

                {paginationInfo.totalPages > 1 && (
                    <Pagination
                        currentPage={paginationInfo.currentPage}
                        totalPages={paginationInfo.totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>

            {/* 신고/상담센터 안내 */}
            <div className="bg-kua-sky50 px-8 py-[130px]">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col">
                    <h2 className="text-kua-black100 mb-2 text-center text-[40px] font-bold">
                        신고/상담센터
                    </h2>
                    <p className="text-kua-gray400 mb-9 text-center text-base font-semibold">
                        여러분과 함께할 대한수중핀수영협회에서 책임감있게
                        업무처리하겠습니다.
                    </p>

                    <div className="relative mb-25 h-[261px] overflow-hidden">
                        <Image
                            src="/imgs/community/contact-background.jpg"
                            alt="contact-background"
                            width={1200}
                            height={261}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-between p-[66px]">
                            <span className="text-kua-gray800 text-2xl font-bold">
                                대한민국의 미래를 밝혀나갈{" "}
                                <span className="text-kua-sky300">
                                    스포츠선수들의 인권보호를 최우선
                                </span>
                                으로 합니다.
                            </span>
                            <div className="border-kua-gray400 w-16 border-b"></div>
                            <p className="text-kua-gray800 text-center text-base font-medium">
                                스포츠 선수로서 인권을 보호받지 못하고 있다면,
                                “글남기기”를 통해 신고 및 상담을 해보세요.
                                <br />
                                스포츠인권포털의 전문 상담원이 여러분과 함께
                                고민을 나눕니다.
                            </p>
                        </div>
                    </div>

                    <span className="text-kua-gray800 mb-10 text-center text-base font-bold">
                        혹시 지도자나 선배, 동료로부터 인권침해를 당하셨나요?
                        아니면 주변의 선수가 피해 당하고 있는 사실을 알고
                        계신가요?
                        <br />
                        스포츠인권 관련 침해는{" "}
                        <span className="text-kua-main">
                            선수 본인은 물론, 그 사실을 알고 있는 누구나 신고 및
                            상담이 가능
                        </span>
                        하니알고 있는 사실 그대로 신고 및 상담을 신청해주세요.
                    </span>

                    <div className="border-kua-black100 md:divide-kua-gray400 grid h-[376px] grid-cols-1 divide-x-0 border-y py-10 md:grid-cols-3 md:divide-x">
                        <div className="flex h-[280px] flex-col items-center justify-between gap-4 pt-8 pb-10">
                            <Image
                                src="/imgs/community/lock.svg"
                                alt="비밀보장"
                                width={108}
                                height={116}
                            />
                            <div className="flex flex-col items-center justify-center gap-1.5">
                                <h3 className="text-kua-black100 text-2xl font-bold">
                                    비밀보장
                                </h3>
                                <p className="text-kua-gray800 text-center text-base font-medium">
                                    신고인의 사생활 보호와 신원보호는
                                    <br />
                                    법적을 준용하여 엄격히 보장됩니다.
                                </p>
                            </div>
                        </div>

                        <div className="flex h-[280px] flex-col items-center justify-between gap-4 py-10">
                            <Image
                                src="/imgs/community/reading-glasses.svg"
                                alt="철저한 조사"
                                width={86}
                                height={86}
                            />
                            <div className="flex flex-col items-center justify-center gap-1.5">
                                <h3 className="text-kua-black100 text-2xl font-bold">
                                    철저한 조사
                                </h3>
                                <p className="text-kua-gray800 text-center text-base font-medium">
                                    신고 사항의 정확한 조사를 조사를 위해
                                    <br />
                                    철저히 확인해 드립니다.
                                </p>
                            </div>
                        </div>

                        <div className="flex h-[280px] flex-col items-center justify-between gap-4 pt-10 pb-7">
                            <Image
                                src="/imgs/community/lamp.svg"
                                alt="추가적 조치"
                                width={53}
                                height={84}
                            />
                            <div className="flex flex-col items-center justify-center gap-1.5">
                                <h3 className="text-kua-black100 text-2xl font-bold">
                                    추가적 조치
                                </h3>
                                <p className="text-kua-gray800 text-center text-base font-medium">
                                    스포츠조직관계 내의 피해자 익명화와 사례
                                    <br />
                                    적절한 절차와 기제에 근거하여 공정 처리를
                                    <br />
                                    최종 정보 반영합니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            onClick={() =>
                                window.open(
                                    "https://www.k-sec.or.kr/",
                                    "_blank",
                                )
                            }
                            className="bg-kua-main hover:bg-kua-blue500 inline-flex cursor-pointer items-center justify-center gap-4 rounded-lg px-8 py-3 text-xl font-bold text-white transition-colors"
                        >
                            스포츠윤리센터 바로가기{" "}
                            <Image
                                src="/imgs/about/arrow-right.svg"
                                alt="arrow-right"
                                width={8}
                                height={16}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
