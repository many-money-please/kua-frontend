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
    "/community/contact": {
        title: "문의하기",
        description: "궁금하거나 도움이 필요한 경우 문의해주세요.",
        breadcrumbs: ["커뮤니티", "문의하기"],
    },
    "/community/press-release/create": {
        title: "보도자료",
        description: "보도자료를 등록하세요.",
        breadcrumbs: ["커뮤니티", "보도자료", "등록"],
    },
    "/community/photo-gallery/create": {
        title: "포토갤러리",
        description: "포토갤러리를 등록하세요.",
        breadcrumbs: ["커뮤니티", "포토갤러리", "등록"],
    },
    "/community/fin-swimming-tv/create": {
        title: "핀수영 TV",
        description: "핀수영 TV 영상을 등록하세요.",
        breadcrumbs: ["커뮤니티", "핀수영 TV", "등록"],
    },
    "/community/notices/create": {
        title: "공지사항",
        description: "공지사항을 등록하세요.",
        breadcrumbs: ["커뮤니티", "공지사항", "등록"],
    },
    "/community/resources/create": {
        title: "자료실",
        description: "자료실 게시글을 등록하세요.",
        breadcrumbs: ["커뮤니티", "자료실", "등록"],
    },
    "/community/contact/create": {
        title: "문의하기",
        description: "문의하기를 등록하세요.",
        breadcrumbs: ["커뮤니티", "문의하기", "등록"],
    },
};

export const CommunityBanner = () => {
    const pathname = usePathname();

    // 커뮤니티 섹션에서만 렌더링
    // 협회소식(포토갤러리, 보도자료, 핀수영 TV)의 일반 페이지는 AssociationBanner가 담당
    // create/edit 페이지는 CommunityBanner가 담당
    const shouldRender =
        pathname.startsWith("/community/notices") ||
        pathname.startsWith("/community/resources") ||
        pathname.startsWith("/community/contact") ||
        pathname.includes("/create") ||
        pathname.includes("/edit");

    if (!shouldRender) {
        return null;
    }

    let config = pageConfig[pathname];
    if (!config) {
        if (pathname.startsWith("/community/notices/")) {
            config = pageConfig["/community/notices/detail"];
        } else if (pathname.startsWith("/community/resources/")) {
            config = pageConfig["/community/resources/detail"];
        } else if (pathname.startsWith("/community/press-release/create")) {
            config = pageConfig["/community/press-release/create"];
        } else if (pathname.startsWith("/community/photo-gallery/create")) {
            config = pageConfig["/community/photo-gallery/create"];
        } else if (pathname.startsWith("/community/fin-swimming-tv/create")) {
            config = pageConfig["/community/fin-swimming-tv/create"];
        } else if (pathname.startsWith("/community/contact/create")) {
            config = pageConfig["/community/contact/create"];
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
