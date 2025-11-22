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
    "/community/news-and-activities": {
        title: "협회소식",
        description: "대한수중핀수영협회의 협회소식 입니다.",
        breadcrumbs: ["커뮤니티", "협회소식", "소식 및 활동"],
    },
    "/community/photo-gallery": {
        title: "협회소식",
        description: "대한수중핀수영협회의 협회소식 입니다.",
        breadcrumbs: ["커뮤니티", "협회소식", "포토 갤러리"],
    },
    "/community/press-releases": {
        title: "협회소식",
        description: "대한수중핀수영협회의 협회소식 입니다.",
        breadcrumbs: ["커뮤니티", "협회소식", "보도 자료"],
    },
    "/community/fin-swimming-tv": {
        title: "협회소식",
        description: "대한수중핀수영협회의 협회소식 입니다.",
        breadcrumbs: ["커뮤니티", "협회소식", "핀수영 TV"],
    },
};

export const AssociationBanner = () => {
    const pathname = usePathname();

    // 협회소식 섹션에서만 렌더링
    const shouldRender =
        pathname.startsWith("/community/news-and-activities") ||
        pathname.startsWith("/community/photo-gallery") ||
        pathname.startsWith("/community/press-releases") ||
        pathname.startsWith("/community/fin-swimming-tv");

    if (!shouldRender) {
        return null;
    }

    const config = pageConfig[pathname];
    const fallbackConfig = pageConfig["/community/news-and-activities"];

    return (
        <PageBanner
            title={(config ?? fallbackConfig).title}
            description={(config ?? fallbackConfig).description}
            breadcrumbs={(config ?? fallbackConfig).breadcrumbs}
        />
    );
};
