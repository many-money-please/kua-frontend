"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { BasicPostCreate } from "@/shared/ui/BasicPostCreate";
import type { PostFormValues } from "@/shared/ui/PostForm";

export default function NoticesEditPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id as string;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<PostFormValues | null>(null);
    const hasFetchedRef = useRef<string | null>(null);

    // 기존 데이터 로드
    useEffect(() => {
        if (hasFetchedRef.current === id) {
            return;
        }

        const fetchNoticeDetail = async () => {
            try {
                hasFetchedRef.current = id;
                setLoading(true);
                console.log("[공지사항 수정] 기존 데이터 로드 시작, ID:", id);

                const response = await fetch(`/api/community/notices/${id}`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        alert("해당 게시글을 찾을 수 없습니다.");
                        router.push("/community/notices");
                        return;
                    }
                    throw new Error(
                        `공지사항을 가져오는데 실패했습니다: ${response.status}`,
                    );
                }

                const result = await response.json();
                console.log("[공지사항 수정] 응답 데이터:", result);

                const formData: PostFormValues = {
                    title: result.title || "",
                    content: result.content || "",
                    isPinned: result.isTopFixed === 1,
                    attachments: [],
                    images: [],
                };

                setInitialData(formData);
            } catch (error) {
                console.error("[공지사항 수정] 에러:", error);
                alert("게시글을 불러오는데 실패했습니다.");
                router.push(`/community/notices/${id}`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchNoticeDetail();
        }

        return () => {
            if (hasFetchedRef.current === id) {
                hasFetchedRef.current = null;
            }
        };
    }, [id, router]);

    const handleSubmit = async (data: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("[공지사항 수정] 제출 데이터:", data);

            const { createNoticeFormData } = await import(
                "@/shared/api/noticeUtils"
            );
            const formData = createNoticeFormData(data);

            console.log(
                "[공지사항 수정] FormData 생성 완료, 파일 개수:",
                data.attachments.filter((a) => a.file instanceof File).length +
                    data.images.filter((i) => i.file instanceof File).length,
            );

            // API 호출
            const response = await fetch(`/api/community/notices/${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            console.log("[공지사항 수정] 응답 상태:", response.status);

            if (!response.ok) {
                const result = await response.json();
                const errorMessage =
                    result.error || "공지사항 수정에 실패했습니다.";
                alert(errorMessage);
                return;
            }

            const result = await response.json();
            console.log("[공지사항 수정] 성공:", result);

            alert("공지사항이 수정되었습니다.");
            router.replace(`/community/notices/${id}`);
            setTimeout(() => {
                router.refresh();
            }, 100);
        } catch (error) {
            console.error("[공지사항 수정] 에러:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "공지사항 수정에 실패했습니다.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    if (!initialData) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">게시글을 불러올 수 없습니다.</div>
            </div>
        );
    }

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">공지사항 수정</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <BasicPostCreate
                    onSubmit={handleSubmit}
                    titlePlaceholder="제목을 입력하세요 (200자 이내)"
                    isSubmitting={isSubmitting}
                    initialValues={initialData}
                    submitLabel="수정하기"
                />
            </div>
        </div>
    );
}
