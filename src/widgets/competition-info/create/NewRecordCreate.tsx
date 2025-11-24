"use client";

import { BasicPostCreate } from "@/shared/ui/BasicPostCreate";
import type { PostFormValues } from "@/shared/ui/PostForm";

export const NewRecordCreate = () => {
    const handleSubmit = async (values: PostFormValues) => {
        console.log("신기록 생성", {
            title: values.title,
            content: values.content,
            attachments: values.attachments,
            isPinned: values.isPinned,
        });
        // TODO: API 호출하여 신기록 생성
        alert("임시로 콘솔에 데이터가 출력되었습니다.");
    };

    return (
        <BasicPostCreate
            onSubmit={handleSubmit}
            titlePlaceholder="제목을 입력하세요"
        />
    );
};
