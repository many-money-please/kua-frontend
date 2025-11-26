"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { NewsAndActivitiesEdit } from "@/widgets/community";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function PressReleaseEditPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const router = useRouter();

    // 임시 기존 데이터
    const existingData = {
        title: "대한핀수영협회, 2025년 새로운 도약 선언",
        content: "<p>보도자료 내용...</p>",
        attachments: [{ id: 1, name: "보도자료.pdf", size: "1.8 MB" }],
        thumbnail: undefined,
    };

    const handleSubmit = (data: {
        title: string;
        content: string;
        attachments: File[];
        thumbnail?: File;
    }) => {
        console.log("Update press release post:", resolvedParams.id, data);
        // API 호출하여 게시글 수정
        // 성공 시 상세 페이지로 이동
        router.push(`/community/press-release/${resolvedParams.id}`);
    };

    const handleCancel = () => {
        router.push(`/community/press-release/${resolvedParams.id}`);
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">보도자료</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <NewsAndActivitiesEdit id={resolvedParams.id} />
            </div>
        </div>
    );
}
