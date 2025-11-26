"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { NewsAndActivitiesEdit } from "@/widgets/community";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function PhotoGalleryEditPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const router = useRouter();

    // 임시 기존 데이터
    const existingData = {
        title: "제28회 청양기 전국핀수영대회",
        content: "<p>대회 개요 내용...</p>",
        attachments: [{ id: 1, name: "대회결과.pdf", size: "2.3 MB" }],
        thumbnail: undefined,
    };

    const handleSubmit = (data: {
        title: string;
        content: string;
        attachments: File[];
        thumbnail?: File;
    }) => {
        console.log("Update photo gallery post:", resolvedParams.id, data);
        // API 호출하여 게시글 수정
        // 성공 시 상세 페이지로 이동
        router.push(`/community/photo-gallery/${resolvedParams.id}`);
    };

    const handleCancel = () => {
        router.push(`/community/photo-gallery/${resolvedParams.id}`);
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">포토갤러리</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <NewsAndActivitiesEdit id={resolvedParams.id} />
            </div>
        </div>
    );
}
