"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

export const ContactCreate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inquiryType, setInquiryType] = useState<"public" | "private">(
        "public",
    );
    const [password, setPassword] = useState("");

    const handleSubmit = async ({
        title,
        content,
        attachments,
        images,
    }: PostFormValues) => {
        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        try {
            setIsSubmitting(true);
            console.log("submit", {
                inquiryType,
                password,
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
            {/* 공개 여부 */}
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">
                    공개 여부{" "}
                    <span className="text-kua-orange500 text-sm">(필수)</span>
                </label>
                <div className="flex gap-4">
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="inquiryType"
                            value="public"
                            checked={inquiryType === "public"}
                            onChange={(e) =>
                                setInquiryType(
                                    e.target.value as "public" | "private",
                                )
                            }
                            className="h-4 w-4"
                        />
                        <span className="text-kua-gray800 text-base">
                            비공개
                        </span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="inquiryType"
                            value="private"
                            checked={inquiryType === "private"}
                            onChange={(e) =>
                                setInquiryType(
                                    e.target.value as "public" | "private",
                                )
                            }
                            className="h-4 w-4"
                        />
                        <span className="text-kua-gray800 text-base">공개</span>
                    </label>
                </div>
            </div>

            <PostForm.TitleField placeholder="제목을 입력해주세요. (50자 이내)" />
            <PostForm.ContentField />
            <PostForm.AttachmentField />

            {/* 비밀번호 */}
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">
                    비밀번호{" "}
                    <span className="text-kua-orange500 text-sm">
                        (게시글 수정시 필요)
                    </span>
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요."
                    className="border-kua-gray400 rounded-md border px-4 py-2 text-base"
                />
                <p className="text-kua-gray500 text-sm">
                    게시 글의 비밀, 수정, 삭제 시 사용됩니다.
                    <br />
                    타인 유출 방지를 위해 영문, 숫자, 특수 문자를 조합하여
                    8~20자로 입력해 주세요.
                </p>
            </div>

            <PostForm.Actions />
        </PostForm.Root>
    );
};
