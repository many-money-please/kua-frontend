"use client";

import { BaseTabs } from "@/shared/ui/Tabs";
import { usePathname } from "next/navigation";

const COMMUNITY_TAB_PATHS = [
    "/community/notices",
    "/community/resources",
] as const;

const tabs = [
    { label: "공지사항", path: "/community/notices" },
    { label: "자료실", path: "/community/resources" },
];

export const CommunityTabs = () => {
    const pathname = usePathname();
    const shouldRender = COMMUNITY_TAB_PATHS.includes(
        pathname as (typeof COMMUNITY_TAB_PATHS)[number],
    );

    if (!shouldRender) {
        return null;
    }

    return (
        <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px] py-20" />
    );
};
