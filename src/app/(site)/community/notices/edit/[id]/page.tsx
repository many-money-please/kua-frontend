"use client";

import { useParams, useRouter } from "next/navigation";
import { BasicPostCreate } from "@/shared/ui/BasicPostCreate";
import type { PostFormValues } from "@/shared/ui/PostForm";
import {
    useNoticeDetailForEdit,
    useUpdateNotice,
} from "@/shared/hooks/queries/notices";
import { useEffect } from "react";

export default function NoticesEditPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id as string;

    const { data: initialData, isLoading, error } = useNoticeDetailForEdit(id);
    const updateNotice = useUpdateNotice(id);

    // 에러 처리
    useEffect(() => {
        if (error) {
            if (
                error.message.includes("404") ||
                error.message.includes("찾을 수 없")
            ) {
                alert("해당 게시글을 찾을 수 없습니다.");
                router.push("/community/notices");
            } else {
                alert("게시글을 불러오는데 실패했습니다.");
                router.push(`/community/notices/${id}`);
            }
        }
    }, [error, router, id]);

    const handleSubmit = async (data: PostFormValues) => {
        try {
            await updateNotice.mutateAsync(data);
            alert("공지사항이 수정되었습니다.");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "공지사항 수정에 실패했습니다.",
            );
        }
    };

    if (isLoading) {
        return (
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-5 py-16">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    if (error || !initialData) {
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
                    isSubmitting={updateNotice.isPending}
                    initialValues={initialData}
                    submitLabel="수정하기"
                />
            </div>
        </div>
    );
}
