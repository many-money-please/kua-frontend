"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { FinSwimmingTVEdit } from "@/widgets/community";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function FinSwimmingTVEditPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const router = useRouter();

    // 임시 기존 데이터
    const existingData = {
        title: "2025 전국핀수영대회 하이라이트",
        content: "<p>영상 소개 내용...</p>",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        attachments: [],
    };

    const handleSubmit = (data: {
        title: string;
        content: string;
        youtubeUrl: string;
        attachments: File[];
    }) => {
        console.log("Update fin-swimming TV post:", resolvedParams.id, data);
        // API 호출하여 게시글 수정
        // 성공 시 상세 페이지로 이동
        router.push(`/community/fin-swimming-tv/${resolvedParams.id}`);
    };

    return (
        <FinSwimmingTVEdit
            title="핀수영 TV 수정"
            initialData={existingData}
            onSubmit={handleSubmit}
            onCancel={() =>
                router.push(`/community/fin-swimming-tv/${resolvedParams.id}`)
            }
        />
    );
}
