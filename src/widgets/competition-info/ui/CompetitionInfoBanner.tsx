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
    "/competition-info/schedule": {
        title: "대회일정",
        description: "대한수중핀수영협회의 대회 일정을 확인하세요.",
        breadcrumbs: ["대회정보", "대회일정"],
    },
    "/competition-info/results": {
        title: "대회결과",
        description: "대한수중핀수영협회의 대회 결과를 확인하세요.",
        breadcrumbs: ["대회정보", "대회결과"],
    },
    "/competition-info/player-info": {
        title: "선수정보",
        description: "대한수중핀수영협회의 선수 정보를 확인하세요.",
        breadcrumbs: ["대회정보", "선수정보"],
    },
    "/competition-info/player-info/national": {
        title: "선수정보",
        description: "대한수중핀수영협회의 선수 정보를 확인하세요.",
        breadcrumbs: ["대회정보", "선수정보", "국가대표"],
    },
    "/competition-info/player-info/youth": {
        title: "선수정보",
        description: "대한수중핀수영협회의 선수 정보를 확인하세요.",
        breadcrumbs: ["대회정보", "선수정보", "청소년대표"],
    },
    "/competition-info/player-info/reserve": {
        title: "선수정보",
        description: "대한수중핀수영협회의 선수 정보를 확인하세요.",
        breadcrumbs: ["대회정보", "선수정보", "상비군선수"],
    },
};

export const CompetitionInfoBanner = () => {
    const pathname = usePathname();
    
    // 선수정보 상세 페이지 처리
    let configKey = pathname;
    if (pathname.startsWith("/competition-info/player-info/") && pathname !== "/competition-info/player-info") {
        // /competition-info/player-info/[id] 같은 상세 페이지는 기본 선수정보로 처리
        const pathParts = pathname.split("/");
        if (pathParts.length === 5 && !isNaN(Number(pathParts[4]))) {
            // 숫자 ID인 경우 (상세 페이지)
            configKey = "/competition-info/player-info";
        } else {
            // 탭 경로인 경우
            configKey = pathname;
        }
    }
    
    const config =
        pageConfig[configKey] ?? 
        (pathname.startsWith("/competition-info/player-info") 
            ? pageConfig["/competition-info/player-info"]
            : pageConfig["/competition-info/schedule"]);

    return (
        <PageBanner
            title={config.title}
            description={config.description}
            breadcrumbs={config.breadcrumbs}
        />
    );
};
