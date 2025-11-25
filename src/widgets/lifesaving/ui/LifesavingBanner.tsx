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
    "/lifesaving": {
        title: "인명구조 소개",
        description: "인명구조에 대해 알아보세요.",
        breadcrumbs: ["인명구조 소개", "인명구조 소개"],
    },
    "/lifesaving/history": {
        title: "유래",
        description: "인명구조의 유래와 역사를 소개합니다.",
        breadcrumbs: ["인명구조 소개", "유래"],
    },
    "/lifesaving/skills-and-training": {
        title: "기술 및 훈련",
        description: "인명구조의 기술과 훈련 방법을 소개합니다.",
        breadcrumbs: ["인명구조 소개", "기술 및 훈련"],
    },
    "/lifesaving/private-qualification": {
        title: "민간자격등록",
        description: "인명구조 관련 민간자격 등록 정보를 확인하세요.",
        breadcrumbs: ["인명구조 소개", "민간자격등록"],
    },
    "/lifesaving/education": {
        title: "교육 안내",
        description: "인명구조 교육 과정 및 안내를 확인하세요.",
        breadcrumbs: ["인명구조 소개", "교육 안내"],
    },
};

export const LifesavingBanner = () => {
    const pathname = usePathname();

    // 경로에 따라 설정 찾기
    let config = pageConfig[pathname];

    // 정확한 매칭이 없으면, 포함 여부로 확인 (detail 페이지 대응)
    if (!config) {
        // pageConfig의 키들 중에서 pathname에 포함된 것을 찾기
        const matchedKey = Object.keys(pageConfig).find(
            (key) => key !== "/lifesaving" && pathname.startsWith(key),
        );
        config = matchedKey
            ? pageConfig[matchedKey]
            : pageConfig["/lifesaving"];
    }

    return (
        <PageBanner
            title={config.title}
            description={config.description}
            breadcrumbs={config.breadcrumbs}
        />
    );
};

