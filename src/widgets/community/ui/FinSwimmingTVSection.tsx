"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Pagination } from "@/shared/ui/Pagination";
import { SearchBar, AdminSearchBar } from "@/shared/ui/SearchBar";
import { ImageFallback } from "@/shared/ui/ImageFallback";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useUserRole } from "@/shared/lib/UserRoleContext";

export type FinSwimmingTVPost = {
    id: number;
    title: string;
    createdAt: string;
    youtubeUrl: string;
    youtubeVideoId?: string; // 유튜브 비디오 ID (썸네일용)
};

type FinSwimmingTVSectionProps = {
    title: string;
    data: FinSwimmingTVPost[];
    searchOptions?: string[];
    pageSize?: number;
    isAdmin?: boolean;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
    onRegister?: () => void;
};

// 유튜브 URL에서 비디오 ID 추출
const extractYoutubeVideoId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /youtube\.com\/embed\/([^&\s]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};

// 유튜브 썸네일 URL 생성
const getYoutubeThumbnail = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const FinSwimmingTVSection = ({
    title,
    data,
    searchOptions,
    pageSize = 16,
    isAdmin: isAdminProp,
    onEdit,
    onDelete,
    onRegister,
}: FinSwimmingTVSectionProps) => {
    const { isAdmin: isAdminFromContext } = useUserRole();
    const isAdmin = isAdminProp ?? isAdminFromContext;
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState(
        searchOptions?.[0] ?? "제목",
    );
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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

    const handleCardClick = (youtubeUrl: string) => {
        // 유튜브 링크로 새 탭에서 열기
        window.open(youtubeUrl, "_blank", "noopener,noreferrer");
    };

    const handleEdit = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // 카드 클릭 이벤트 방지
        onEdit?.(id);
    };

    const handleDeleteClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // 카드 클릭 이벤트 방지
        setDeleteTargetId(id);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteTargetId !== null) {
            onDelete?.(deleteTargetId);
        }
        setDeleteModalOpen(false);
        setDeleteTargetId(null);
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setDeleteTargetId(null);
    };

    const handleRegister = () => {
        onRegister?.();
    };

    return (
        <section className="mb-12 flex w-full max-w-[1200px] flex-col gap-6 px-5 pb-16 sm:px-0 sm:pb-[150px]">
            {/* 헤더 영역 */}
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">{title}</span>
                {isAdmin && onRegister ? (
                    <AdminSearchBar
                        totalCount={paginationInfo.totalItems}
                        searchQuery={searchInput}
                        searchOption={searchOption}
                        searchOptions={searchOptions}
                        onSearchQueryChange={setSearchInput}
                        onSearchOptionChange={setSearchOption}
                        onSearch={handleSearch}
                        onRegister={handleRegister}
                        buttonText="추가하기"
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

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {paginationInfo.visibleData.map((item) => {
                    const videoId =
                        item.youtubeVideoId ||
                        extractYoutubeVideoId(item.youtubeUrl);
                    const thumbnailUrl = videoId
                        ? getYoutubeThumbnail(videoId)
                        : undefined;

                    return (
                        <div key={item.id} className="flex flex-col gap-4">
                            <div
                                className="border-kua-gray400 flex h-[336px] cursor-pointer flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
                                onClick={() => handleCardClick(item.youtubeUrl)}
                            >
                                {/* 이미지 영역 */}
                                <div className="bg-kua-gray100 relative aspect-4/3 h-[206px] w-full">
                                    {thumbnailUrl ? (
                                        <Image
                                            src={thumbnailUrl}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <ImageFallback />
                                    )}
                                    {/* 유튜브 플레이 아이콘 오버레이 */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-transform hover:scale-110">
                                            <svg
                                                className="ml-1 h-8 w-8 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* 컨텐츠 영역 */}
                                <div className="flex h-full flex-col justify-between p-5">
                                    <h3 className="text-kua-gray800 line-clamp-2 text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <span className="text-kua-gray400 text-sm">
                                        {item.createdAt}
                                    </span>
                                </div>
                            </div>
                            {/* 관리자 모드 버튼 */}
                            {isAdmin && (
                                <div className="flex w-full justify-center gap-3 px-4 pt-2 pb-4">
                                    <button
                                        onClick={(e) => handleEdit(e, item.id)}
                                        className="hover:bg-kua-sky300 hover:text-kua-white text-kua-sky300 border-kua-sky300 w-16 cursor-pointer rounded-md border py-2 text-[15px] font-medium transition-colors"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={(e) =>
                                            handleDeleteClick(e, item.id)
                                        }
                                        className="hover:bg-kua-orange500 hover:text-kua-white text-kua-orange500 border-kua-orange500 w-16 cursor-pointer rounded-md border py-2 text-[15px] font-medium transition-colors"
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 데이터가 없을 때 */}
            {paginationInfo.visibleData.length === 0 && (
                <div className="text-kua-gray500 flex h-[400px] items-center justify-center text-sm">
                    영상이 없습니다.
                </div>
            )}

            {/* 페이지네이션 */}
            {paginationInfo.totalPages > 1 && (
                <Pagination
                    currentPage={paginationInfo.currentPage}
                    totalPages={paginationInfo.totalPages}
                    onPageChange={setPage}
                />
            )}

            {/* 삭제 확인 모달 */}
            <ConfirmModal
                isOpen={deleteModalOpen}
                title="영상 삭제"
                message="정말로 이 영상을 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                confirmButtonClass="bg-kua-orange500 hover:bg-red-600 text-white"
            />
        </section>
    );
};
