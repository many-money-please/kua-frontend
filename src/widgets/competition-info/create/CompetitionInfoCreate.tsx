"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

const CATEGORY_OPTIONS = ["국내", "국제"] as const;

export const CompetitionInfoCreate = () => {
    const [category, setCategory] =
        useState<(typeof CATEGORY_OPTIONS)[number]>("국내");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async ({
        title,
        content,
        attachments,
        images,
    }: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("submit", {
                title,
                content,
                category,
                attachments,
                images,
            });
            alert("임시로 콘솔에 데이터가 출력되었습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PostForm.Root onSubmit={handleSubmit} isSubmitting={isSubmitting}>
            <PostForm.TitleField />

            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="category">
                    분류
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target
                                .value as (typeof CATEGORY_OPTIONS)[number],
                        )
                    }
                    className="bg-kua-gray100 rounded-lg px-4 py-3"
                >
                    {CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <PostForm.ContentField />
            <PostForm.AttachmentField />
            <PostForm.Actions />
        </PostForm.Root>
    );
};
