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
    "/community/notices": {
        title: "커뮤니티",
        description: "공지사항과 자료실 소식을 확인하세요.",
        breadcrumbs: ["커뮤니티", "공지사항"],
    },
    "/community/resources": {
        title: "커뮤니티",
        description: "공지사항과 자료실 소식을 확인하세요.",
        breadcrumbs: ["커뮤니티", "자료실"],
    },
    "/community/notices/detail": {
        title: "커뮤니티",
        description: "공지사항과 자료실 소식을 확인하세요.",
        breadcrumbs: ["커뮤니티", "공지사항", "상세"],
    },
    "/community/resources/detail": {
        title: "커뮤니티",
        description: "공지사항과 자료실 소식을 확인하세요.",
        breadcrumbs: ["커뮤니티", "자료실", "상세"],
    },
};

export const CommunityBanner = () => {
    const pathname = usePathname();

    // 커뮤니티 섹션(공지사항, 자료실)에서만 렌더링
    const shouldRender =
        pathname.startsWith("/community/notices") ||
        pathname.startsWith("/community/resources");

    if (!shouldRender) {
        return null;
    }

    let config = pageConfig[pathname];
    if (!config) {
        if (pathname.startsWith("/community/notices/")) {
            config = pageConfig["/community/notices/detail"];
        } else if (pathname.startsWith("/community/resources/")) {
            config = pageConfig["/community/resources/detail"];
        }
    }

    const fallbackConfig = pageConfig["/community/notices"];

    return (
        <PageBanner
            title={(config ?? fallbackConfig).title}
            description={(config ?? fallbackConfig).description}
            breadcrumbs={(config ?? fallbackConfig).breadcrumbs}
        />
    );
};
