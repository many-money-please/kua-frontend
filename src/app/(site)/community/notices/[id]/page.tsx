"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { DetailPage, type NavigationPost } from "@/shared/ui/DetailPage";
import { useNoticeDetail } from "@/shared/hooks/queries/notices";
import { useEffect } from "react";

export default function CommunityNoticeDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id as string;

    const { data, isLoading, error } = useNoticeDetail(id);

    // 404 에러 처리
    useEffect(() => {
        if (error) {
            if (
                error.message.includes("404") ||
                error.message.includes("찾을 수 없")
            ) {
                alert("해당 게시글은 삭제되었습니다.");
                router.push("/community/notices");
                router.refresh();
            }
        }
    }, [error, router]);

    if (isLoading) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    if (error || !data) {
        notFound();
    }

    // 네비게이션은 목록에서 가져와야 하므로 일단 null로 설정
    // TODO: 목록 API에서 이전/다음 글 정보를 가져오도록 구현
    const navigation: {
        prev: NavigationPost | null;
        next: NavigationPost | null;
    } = { prev: null, next: null };

    return (
        <DetailPage
            pageTitle="공지사항"
            data={data}
            navigation={navigation}
            listUrl="/community/notices"
            detailUrlPattern={(id) => `/community/notices/${id}`}
            editUrl={`/community/notices/edit/${id}`}
        />
    );
}
