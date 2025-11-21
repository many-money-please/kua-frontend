"use client";

import { PageBanner } from "@/shared/ui/PageBanner";
import { usePathname } from "next/navigation";

const pageConfig: Record<
    string,
    {
        title: string;
        description: string;
        breadcrumbs: string[];
    }
> = {
    "/fin-swimming": {
        title: "핀수영 소개",
        description: "핀수영에 대해 알아보세요.",
        breadcrumbs: ["핀수영 소개", "핀수영 소개"],
    },
    "/fin-swimming/history": {
        title: "유래",
        description: "핀수영의 유래와 역사를 소개합니다.",
        breadcrumbs: ["핀수영 소개", "유래"],
    },
    "/fin-swimming/skills-and-training": {
        title: "기술 및 훈련",
        description: "핀수영의 기술과 훈련 방법을 소개합니다.",
        breadcrumbs: ["핀수영 소개", "기술 및 훈련"],
    },
};

export const FinSwimmingBanner = () => {
    const pathname = usePathname();

    // 경로에 따라 설정 찾기
    let config = pageConfig[pathname];

    // 정확한 매칭이 없으면, 포함 여부로 확인 (detail 페이지 대응)
    if (!config) {
        // pageConfig의 키들 중에서 pathname에 포함된 것을 찾기
        const matchedKey = Object.keys(pageConfig).find(
            (key) => key !== "/fin-swimming" && pathname.startsWith(key),
        );
        config = matchedKey
            ? pageConfig[matchedKey]
            : pageConfig["/fin-swimming"];
    }

    return (
        <PageBanner
            title={config.title}
            description={config.description}
            breadcrumbs={config.breadcrumbs}
        />
    );
};

