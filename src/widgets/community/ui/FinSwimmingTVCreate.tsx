"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

type FinSwimmingTVCreateProps = {
    title: string;
    onSubmit: (data: {
        title: string;
        content: string;
        youtubeUrl: string;
        attachments: File[];
        isPinned: boolean;
    }) => void;
    onCancel: () => void;
};

export const FinSwimmingTVCreate = ({
    title,
    onSubmit,
}: FinSwimmingTVCreateProps) => {
    const [postTitle, setPostTitle] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const handleSubmit = async (values: PostFormValues) => {
        if (!postTitle.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!youtubeUrl.trim()) {
            alert("유튜브 URL을 입력해주세요.");
            return;
        }

        onSubmit({
            title: postTitle,
            content: "",
            youtubeUrl,
            attachments: [],
            isPinned: values.isPinned ?? false,
        });
    };

    return (
        <section className="mb-12 flex w-full max-w-[1200px] flex-col gap-6 pt-16 pb-[150px]">
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold">{title}</h1>

                <PostForm.Root onSubmit={handleSubmit} isSubmitting={false}>
                    <PostForm.PinField />

                    {/* 제목 입력 */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            제목 <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            className="border-kua-gray300 focus:border-kua-sky300 rounded-md border px-4 py-3 transition-colors outline-none"
                        />
                    </div>

                    {/* 유튜브 URL 입력 */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="youtubeUrl"
                            className="text-sm font-medium"
                        >
                            유튜브 URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="youtubeUrl"
                            type="url"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="border-kua-gray300 focus:border-kua-sky300 rounded-md border px-4 py-3 transition-colors outline-none"
                        />
                        <p className="text-kua-gray500 text-xs">
                            유튜브 영상 URL을 입력하세요 (예:
                            https://www.youtube.com/watch?v=xxxxx)
                        </p>
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex justify-start gap-4">
                        <button
                            type="submit"
                            className="bg-kua-blue300 cursor-pointer rounded-lg px-6 py-3 font-normal text-white"
                        >
                            등록하기
                        </button>
                    </div>
                </PostForm.Root>
            </div>
        </section>
    );
};
