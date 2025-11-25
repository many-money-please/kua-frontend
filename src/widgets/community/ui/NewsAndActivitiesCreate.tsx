"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

export const NewsAndActivitiesCreate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async ({
        title,
        content,
        attachments,
        images,
        isPinned,
    }: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("submit", {
                title,
                content,
                attachments,
                images,
                isPinned,
            });
            alert("임시로 콘솔에 데이터가 출력되었습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PostForm.Root onSubmit={handleSubmit} isSubmitting={isSubmitting}>
            <PostForm.PinField />
            <PostForm.TitleField placeholder="제목을 입력하세요 (50자 이내)" />
            <PostForm.ContentField />
            <PostForm.ImageField />
            <PostForm.AttachmentField />
            <PostForm.Actions />
        </PostForm.Root>
    );
};
