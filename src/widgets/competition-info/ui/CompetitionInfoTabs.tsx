"use client";

import { BaseTabs } from "@/shared/ui/Tabs";
import { usePathname } from "next/navigation";

const TABS_BASE_PATHS = ["/competition-info", "/competition-info/results"];

const tabs = [
    { label: "대회일정", path: "/competition-info" },
    { label: "대회결과", path: "/competition-info/results" },
];

export const CompetitionInfoTabs = () => {
    const pathname = usePathname();
    const shouldRender = TABS_BASE_PATHS.includes(pathname);

    if (!shouldRender) {
        return null;
    }

    return (
        <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px] py-20" />
    );
};
