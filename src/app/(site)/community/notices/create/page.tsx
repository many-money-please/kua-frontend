"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BasicPostCreate } from "@/shared/ui/BasicPostCreate";
import type { PostFormValues } from "@/shared/ui/PostForm";

export default function NoticesCreatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("[공지사항 생성] 제출 데이터:", data);

            const { createNoticeFormData } = await import(
                "@/shared/api/noticeUtils"
            );
            const formData = createNoticeFormData(data);

            console.log(
                "[공지사항 생성] FormData 생성 완료, 파일 개수:",
                data.attachments.filter((a) => a.file instanceof File).length +
                    data.images.filter((i) => i.file instanceof File).length,
            );

            // API 호출
            const response = await fetch("/api/community/notices", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            console.log("[공지사항 생성] 응답 상태:", response.status);

            if (!response.ok) {
                const result = await response.json();
                const errorMessage =
                    result.error || "공지사항 생성에 실패했습니다.";
                alert(errorMessage);
                return;
            }

            const result = await response.json();
            console.log("[공지사항 생성] 성공:", result);

            alert("공지사항이 등록되었습니다.");
            router.replace("/community/notices");
            setTimeout(() => {
                router.refresh();
            }, 100);
        } catch (error) {
            console.error("[공지사항 생성] 에러:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "공지사항 생성에 실패했습니다.",
            );
        } finally {
            setIsSubmitting(false);
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
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
