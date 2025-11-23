"use client";

import { BaseTabs } from "@/shared/ui/Tabs";
import { usePathname } from "next/navigation";

const ASSOCIATION_NEWS_TAB_PATHS = [
    "/community/news-and-activities",
    "/community/photo-gallery",
    "/community/press-release",
    "/community/fin-swimming-tv",
] as const;

const tabs = [
    { label: "소식 및 활동", path: "/community/news-and-activities" },
    { label: "포토 갤러리", path: "/community/photo-gallery" },
    { label: "보도 자료", path: "/community/press-release" },
    { label: "핀수영 TV", path: "/community/fin-swimming-tv" },
];

export const AssociationNewsTabs = () => {
    const pathname = usePathname();

    // 정확히 탭 경로와 일치하는 경우에만 렌더링 (create, edit, detail 페이지 제외)
    const shouldRender = ASSOCIATION_NEWS_TAB_PATHS.includes(
        pathname as (typeof ASSOCIATION_NEWS_TAB_PATHS)[number],
    );

    if (!shouldRender) {
        return null;
    }

    return (
        <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px] py-20" />
    );
};
