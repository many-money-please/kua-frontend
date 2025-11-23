"use client";

import { useRouter } from "next/navigation";
import { NewsAndActivitiesCreate } from "@/widgets/community";

export default function PhotoGalleryCreatePage() {
    const router = useRouter();

    const handleSubmit = (data: {
        title: string;
        content: string;
        attachments: File[];
        thumbnail?: File;
    }) => {
        console.log("Create photo gallery post:", data);
        // API 호출하여 게시글 생성
        // 성공 시 목록 페이지로 이동
        router.push("/community/photo-gallery");
    };

    const handleCancel = () => {
        router.push("/community/photo-gallery");
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">포토갤러리</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <NewsAndActivitiesCreate />
            </div>
        </div>
    );
}
