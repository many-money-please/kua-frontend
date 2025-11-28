"use client";

import { BasicPostCreate } from "@/shared/ui/BasicPostCreate";
import type { PostFormValues } from "@/shared/ui/PostForm";
import { useCreateNotice } from "@/shared/hooks/queries/notices";

export default function NoticesCreatePage() {
    const createNotice = useCreateNotice();

    const handleSubmit = async (data: PostFormValues) => {
        try {
            await createNotice.mutateAsync(data);
            alert("공지사항이 등록되었습니다.");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "공지사항 생성에 실패했습니다.",
            );
        }
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">공지사항 등록</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <BasicPostCreate
                    onSubmit={handleSubmit}
                    titlePlaceholder="제목을 입력하세요 (200자 이내)"
                    isSubmitting={createNotice.isPending}
                />
            </div>
        </div>
    );
}
