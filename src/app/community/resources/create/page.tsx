"use client";

import { useRouter } from "next/navigation";
import { BasicPostCreate } from "@/shared/ui/BasicPostCreate";
import type { PostFormValues } from "@/shared/ui/PostForm";

export default function ResourcesCreatePage() {
    const router = useRouter();

    const handleSubmit = (data: PostFormValues) => {
        console.log("Create resource:", data);
        // API 호출하여 자료실 게시글 생성
        router.push("/community/resources");
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-8 py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 pb-8">
                <h1 className="text-3xl font-bold">자료실 등록</h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
                <BasicPostCreate
                    onSubmit={handleSubmit}
                    titlePlaceholder="제목을 입력하세요 (50자 이내)"
                />
            </div>
        </div>
    );
}
