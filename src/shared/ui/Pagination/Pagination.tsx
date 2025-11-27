"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void; // 클라이언트 사이드 페이지네이션용
    // 서버 사이드 페이지네이션 옵션
    serverSide?: boolean; // 서버 사이드 페이지네이션 사용 여부
    basePath?: string; // 서버 사이드인 경우 URL 업데이트할 기본 경로 (없으면 현재 경로 사용)
};

const createPageArray = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
};

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    serverSide = false,
    basePath,
}: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    if (totalPages <= 1) {
        return null;
    }

    const pages = createPageArray(totalPages);

    const goToPage = (page: number) => {
        const nextPage = Math.min(Math.max(page, 1), totalPages);
        if (nextPage === currentPage) {
            return;
        }

        // 서버 사이드 페이지네이션인 경우 URL 업데이트
        if (serverSide) {
            const params = new URLSearchParams(searchParams.toString());
            if (nextPage === 1) {
                params.delete("page"); // 첫 페이지는 파라미터 제거
            } else {
                params.set("page", nextPage.toString());
            }
            const targetPath = basePath || pathname;
            router.push(`${targetPath}?${params.toString()}`);
        } else if (onPageChange) {
            // 클라이언트 사이드 페이지네이션인 경우 콜백 호출
            onPageChange(nextPage);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                type="button"
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                aria-label="첫 페이지"
            >
                «
            </button>
            <button
                type="button"
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="이전 페이지"
            >
                ‹
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                        page === currentPage
                            ? "bg-kua-blue50 text-kua-main"
                            : "bg-kua-gray100 text-kua-gray800 hover:bg-kua-sky50"
                    }`}
                    onClick={() => goToPage(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}
            <button
                type="button"
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="다음 페이지"
            >
                ›
            </button>
            <button
                type="button"
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="마지막 페이지"
            >
                »
            </button>
        </div>
    );
};
