"use client";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const createPageArray = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
};

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = createPageArray(totalPages);

    const goToPage = (page: number) => {
        const nextPage = Math.min(Math.max(page, 1), totalPages);
        if (nextPage !== currentPage) {
            onPageChange(nextPage);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            <button
                type="button"
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium disabled:opacity-40"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                aria-label="첫 페이지"
            >
                «
            </button>
            <button
                type="button"
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium disabled:opacity-40"
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
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
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
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium disabled:opacity-40"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="다음 페이지"
            >
                ›
            </button>
            <button
                type="button"
                className="text-kua-gray400 bg-kua-gray100 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium disabled:opacity-40"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="마지막 페이지"
            >
                »
            </button>
        </div>
    );
};
