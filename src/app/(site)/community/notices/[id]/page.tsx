"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
    DetailPage,
    type DetailPageData,
    type NavigationPost,
} from "@/shared/ui/DetailPage";

export default function CommunityNoticeDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id as string;
    const [data, setData] = useState<DetailPageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [navigation, setNavigation] = useState<{
        prev: NavigationPost | null;
        next: NavigationPost | null;
    }>({ prev: null, next: null });
    const hasFetchedRef = useRef<string | null>(null); // 중복 호출 방지 (id별로)

    useEffect(() => {
        // 이미 같은 id로 호출했으면 다시 호출하지 않음 (Strict Mode 대응)
        if (hasFetchedRef.current === id) {
            return;
        }

        const fetchNoticeDetail = async () => {
            try {
                hasFetchedRef.current = id; // 호출 시작 표시
                setLoading(true);
                console.log("[공지사항 상세페이지] API 호출 시작, ID:", id);

                const response = await fetch(`/api/community/notices/${id}`, {
                    credentials: "include",
                });

                console.log(
                    "[공지사항 상세페이지] 응답 상태:",
                    response.status,
                );

                if (!response.ok) {
                    if (response.status === 404) {
                        // 삭제된 게시글인 경우 메시지 표시 후 목록으로 이동
                        alert("해당 게시글은 삭제되었습니다.");
                        router.push("/community/notices");
                        router.refresh();
                        return;
                    }
                    throw new Error(
                        `공지사항을 가져오는데 실패했습니다: ${response.status}`,
                    );
                }

                const result = await response.json();
                console.log("[공지사항 상세페이지] 응답 데이터:", result);

                // 백엔드 응답을 DetailPageData 형식으로 변환
                // TODO: 백엔드 응답 구조에 맞게 수정 필요
                const detailData: DetailPageData = {
                    id: result.id || Number(id),
                    title: result.title || "",
                    registrationDate:
                        result.createdAt || result.registrationDate || "",
                    views: result.hit || result.views || 0,
                    isSecret: result.isSecret || false,
                    content: result.content || "",
                    attachments: result.attachments || [],
                    images: result.images || [],
                };

                setData(detailData);

                // 네비게이션은 목록에서 가져와야 하므로 일단 null로 설정
                // TODO: 목록 API에서 이전/다음 글 정보를 가져오도록 구현
                setNavigation({ prev: null, next: null });
            } catch (error) {
                console.error("[공지사항 상세페이지] 에러:", error);
                hasFetchedRef.current = null; // 에러 시 다시 시도 가능하도록
                notFound();
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchNoticeDetail();
        }

        // cleanup: id가 변경되면 ref 리셋
        return () => {
            if (hasFetchedRef.current === id) {
                hasFetchedRef.current = null;
            }
        };
    }, [id]);

    if (loading) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    if (!data) {
        notFound();
    }

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
