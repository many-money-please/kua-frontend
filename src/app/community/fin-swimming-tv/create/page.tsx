"use client";

import { useRouter } from "next/navigation";
import { FinSwimmingTVCreate } from "@/widgets/community";

export default function FinSwimmingTVCreatePage() {
    const router = useRouter();

    const handleSubmit = (data: {
        title: string;
        content: string;
        youtubeUrl: string;
        attachments: File[];
    }) => {
        console.log("Create fin-swimming TV post:", data);
        // API 호출하여 게시글 생성
        // 성공 시 목록 페이지로 이동
        router.push("/community/fin-swimming-tv");
    };

    return (
        <FinSwimmingTVCreate
            title="핀수영 TV 등록"
            onSubmit={handleSubmit}
            onCancel={() => router.push("/community/fin-swimming-tv")}
        />
    );
}
