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
};

export const CompetitionInfoBanner = () => {
    const pathname = usePathname();
    const config =
        pageConfig[pathname] ?? pageConfig["/competition-info/schedule"];

    return (
        <PageBanner
            title={config.title}
            description={config.description}
            breadcrumbs={config.breadcrumbs}
        />
    );
};
