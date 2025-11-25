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
    "/free-diving": {
        title: "프리다이빙 소개",
        description: "프리다이빙에 대해 알아보세요.",
        breadcrumbs: ["프리다이빙 소개", "프리다이빙 소개"],
    },
    "/free-diving/history": {
        title: "유래",
        description: "프리다이빙의 유래와 역사를 소개합니다.",
        breadcrumbs: ["프리다이빙 소개", "유래"],
    },
    "/free-diving/skills-and-training": {
        title: "기술 및 훈련",
        description: "프리다이빙의 기술과 훈련 방법을 소개합니다.",
        breadcrumbs: ["프리다이빙 소개", "기술 및 훈련"],
    },
    "/free-diving/private-qualification": {
        title: "민간자격등록",
        description: "프리다이빙 관련 민간자격 등록 정보를 확인하세요.",
        breadcrumbs: ["프리다이빙 소개", "민간자격등록"],
    },
};

export const FreeDivingBanner = () => {
    const pathname = usePathname();

    // 경로에 따라 설정 찾기
    let config = pageConfig[pathname];

    // 정확한 매칭이 없으면, 포함 여부로 확인 (detail 페이지 대응)
    if (!config) {
        // pageConfig의 키들 중에서 pathname에 포함된 것을 찾기
        const matchedKey = Object.keys(pageConfig).find(
            (key) => key !== "/free-diving" && pathname.startsWith(key),
        );
        config = matchedKey
            ? pageConfig[matchedKey]
            : pageConfig["/free-diving"];
    }

    return (
        <PageBanner
            title={config.title}
            description={config.description}
            breadcrumbs={config.breadcrumbs}
        />
    );
};

