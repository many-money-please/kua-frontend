"use client";

import { useRouter } from "next/navigation";
import { BasicPostCreate } from "@/shared/ui/BasicPostCreate";
import type { PostFormValues } from "@/shared/ui/PostForm";

export default function DisclosureCreatePage() {
    const router = useRouter();

    const handleSubmit = (data: PostFormValues) => {
        console.log("Create Disclosure:", data);
        // API 호출하여 경영공시 생성
        router.push("/about/disclosure");
    };

    return (
        <div className="bg-kua-gray100 h-full w-full px-5 py-8 sm:px-0 sm:py-16">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6 pb-4 sm:gap-10 sm:pb-8">
                <h1 className="text-2xl font-bold sm:text-3xl">
                    경영공시 등록
                </h1>
            </div>
            <div className="bg-kua-white mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-4 sm:gap-10 sm:px-8 sm:py-8">
                <BasicPostCreate
                    onSubmit={handleSubmit}
                    titlePlaceholder="경영공시 제목을 입력하세요"
                />
            </div>
        </div>
    );
}
