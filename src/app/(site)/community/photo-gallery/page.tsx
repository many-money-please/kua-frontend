"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NewsAndActivitiesSection } from "@/widgets/community";
import type { NewsAndActivityPost } from "@/widgets/community";
import {
    useGalleryPosts,
    useDeleteGalleryPost,
    type GalleryPostItem,
} from "@/shared/hooks/queries/galleryPosts";

// API 응답을 NewsAndActivityPost 형식으로 변환
function mapGalleryPostToNewsAndActivity(
    post: GalleryPostItem,
): NewsAndActivityPost {
    const API_BASE_URL =
        (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "") ?? "";

    const buildThumbnailUrl = (filePath?: string) => {
        if (!filePath) return undefined;
        if (/^https?:\/\//i.test(filePath)) return filePath;
        const normalizedPath = filePath.startsWith("/")
            ? filePath
            : `/${filePath}`;
        return API_BASE_URL
            ? `${API_BASE_URL}${normalizedPath}`
            : normalizedPath;
    };

    return {
        id: post.id,
        title: post.title,
        createdAt: new Date(post.createdAt).toLocaleDateString("ko-KR"),
        thumbnail: buildThumbnailUrl(post.thumbnailPath),
    };
}

export default function PhotoGalleryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [page, setPage] = useState(
        parseInt(searchParams.get("page") || "1", 10),
    );
    const [searchInput, setSearchInput] = useState(
        searchParams.get("title") || "",
    );
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("title") || "",
    );

    // 검색 옵션이 "제목"일 때만 title 파라미터 전달
    const title = searchQuery.trim() || undefined;

    const {
        data: galleryData,
        isLoading,
        error,
    } = useGalleryPosts({ page, title });
    const deleteGalleryPost = useDeleteGalleryPost();

    const handleEdit = (id: number) => {
        router.push(`/community/photo-gallery/edit/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            deleteGalleryPost.mutate(id, {
                onSuccess: () => {
                    alert("게시글이 삭제되었습니다.");
                },
                onError: (error) => {
                    alert(error.message || "게시글 삭제에 실패했습니다.");
                },
            });
        }
    };

    const handleRegister = () => {
        router.push("/community/photo-gallery/create");
    };

    const handleSearch = () => {
        const query = searchInput.trim();
        setSearchQuery(query);
        setPage(1);
        // URL 파라미터 업데이트
        const params = new URLSearchParams();
        if (query) {
            params.set("title", query);
        }
        params.set("page", "1");
        router.push(`/community/photo-gallery?${params.toString()}`);
    };

    // 데이터 변환
    const posts: NewsAndActivityPost[] = useMemo(() => {
        if (!galleryData) return [];
        return galleryData.posts.map(mapGalleryPostToNewsAndActivity);
    }, [galleryData]);

    if (isLoading) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-kua-orange500 text-center">
                    {error.message || "포토갤러리를 불러오는데 실패했습니다."}
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <NewsAndActivitiesSection
                title="포토갤러리"
                data={posts}
                detailBasePath="/community/photo-gallery"
                searchOptions={["제목"]}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRegister={handleRegister}
            />
        </Suspense>
    );
}
