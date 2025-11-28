"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { DetailPage, type DetailPageData } from "@/shared/ui/DetailPage";
import { useGalleryPostDetail } from "@/shared/hooks/queries/galleryPosts";

export default function PhotoGalleryDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id as string;

    const { data: galleryData, isLoading, error } = useGalleryPostDetail(id);

    if (isLoading) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    if (error) {
        console.error("[포토갤러리 상세페이지] 에러:", error);
        if (error.message === "해당 게시글을 찾을 수 없습니다.") {
            alert(error.message);
            router.push("/community/photo-gallery");
            router.refresh();
            return null;
        }
        notFound();
    }

    if (!galleryData) {
        notFound();
    }

    return (
        <DetailPage
            pageTitle="포토갤러리"
            data={galleryData}
            navigation={{ prev: null, next: null }} // TODO: 이전/다음 글 정보 가져오도록 구현
            listUrl="/community/photo-gallery"
            detailUrlPattern={(id) => `/community/photo-gallery/${id}`}
            editUrl={`/community/photo-gallery/edit/${id}`}
        />
    );
}
