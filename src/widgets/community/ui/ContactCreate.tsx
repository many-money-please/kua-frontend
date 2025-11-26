"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

export const ContactCreate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async ({
        title,
        content,
        attachments,
        images,
    }: PostFormValues) => {
        try {
            setIsSubmitting(true);
            // 모든 문의하기는 비밀글로 설정 (비밀번호 불필요)
            console.log("submit", {
                isSecret: true, // 항상 비밀글
                title,
                content,
                attachments,
                images,
            });
            alert("문의가 접수되었습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PostForm.Root onSubmit={handleSubmit} isSubmitting={isSubmitting}>
            {/* 모든 문의하기는 비밀글임을 안내 */}
            <div className="bg-kua-sky50 border-kua-main flex items-center gap-2 rounded-md border px-4 py-3">
                <svg
                    className="text-kua-main h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
                <span className="text-kua-gray800 text-base font-medium">
                    모든 문의하기는 비밀글로 처리됩니다. 본인과 관리자만 확인할
                    수 있습니다.
                </span>
            </div>

            <PostForm.TitleField placeholder="제목을 입력해주세요. (50자 이내)" />
            <PostForm.ContentField />
            <PostForm.AttachmentField />

            <PostForm.Actions />
        </PostForm.Root>
    );
};
