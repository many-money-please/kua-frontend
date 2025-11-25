"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

export default function RegulationsCreatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("규정 생성", {
                title: values.title,
                attachments: values.attachments,
                isPinned: values.isPinned,
            });
            // TODO: API 호출하여 규정 생성
            alert("임시로 콘솔에 데이터가 출력되었습니다.");
            router.push("/about/regulations");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">규정 등록</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <PostForm.Root
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                >
                    <PostForm.PinField />
                    <PostForm.TitleField placeholder="규정 제목을 입력하세요" />
                    <PostForm.AttachmentField />
                    <PostForm.Actions />
                </PostForm.Root>
            </div>
        </div>
    );
}
