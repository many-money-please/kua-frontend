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
    "/about": {
        title: "협회소개",
        description: "대한수중핀수영협회를 소개합니다.",
        breadcrumbs: ["협회소개", "협회소개"],
    },
    "/about/organization": {
        title: "협회구조",
        description: "대한수중핀수영협회의 조직 구조를 소개합니다.",
        breadcrumbs: ["협회소개", "협회구조"],
    },
    "/about/executives": {
        title: "임원현황",
        description: "대한수중핀수영협회의 임원 현황을 소개합니다.",
        breadcrumbs: ["협회소개", "임원현황"],
    },
    "/about/regulations": {
        title: "규정",
        description: "대한수중핀수영협회의 규정을 안내합니다.",
        breadcrumbs: ["협회소개", "규정"],
    },
    "/about/disclosure": {
        title: "경영공시",
        description: "대한수중핀수영협회의 경영공시 자료를 확인하세요.",
        breadcrumbs: ["협회소개", "경영공시"],
    },
};

export const AboutBanner = () => {
    const pathname = usePathname();

    // 경로에 따라 설정 찾기
    let config = pageConfig[pathname];

    // 정확한 매칭이 없으면, 포함 여부로 확인 (detail 페이지 대응)
    if (!config) {
        // pageConfig의 키들 중에서 pathname에 포함된 것을 찾기
        const matchedKey = Object.keys(pageConfig).find(
            (key) => key !== "/about" && pathname.startsWith(key),
        );
        config = matchedKey ? pageConfig[matchedKey] : pageConfig["/about"];
    }

    return (
        <PageBanner
            title={config.title}
            description={config.description}
            breadcrumbs={config.breadcrumbs}
        />
    );
};
