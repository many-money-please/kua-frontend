"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

type BasicPostCreateProps = {
    onSubmit: (data: PostFormValues) => void | Promise<void>;
    titlePlaceholder?: string;
    isSubmitting?: boolean;
};

export const BasicPostCreate = ({
    onSubmit,
    titlePlaceholder = "제목을 입력하세요",
    isSubmitting: isSubmittingProp,
}: BasicPostCreateProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: PostFormValues) => {
        try {
            setIsSubmitting(true);
            await onSubmit(values);
        } finally {
            setIsSubmitting(false);
        }
    };

    const submitting = isSubmittingProp ?? isSubmitting;

    return (
        <PostForm.Root onSubmit={handleSubmit} isSubmitting={submitting}>
            <PostForm.PinField />
            <PostForm.TitleField placeholder={titlePlaceholder} />
            <PostForm.ContentField />
            <PostForm.AttachmentField />
            <PostForm.Actions />
        </PostForm.Root>
    );
};
