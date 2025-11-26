"use client";

import { BaseTabs } from "@/shared/ui/Tabs";

const tabs = [
    { label: "협회소개", path: "/about" },
    { label: "협회구조", path: "/about/organization" },
    { label: "임원현황", path: "/about/executives" },
    { label: "규정", path: "/about/regulations" },
    { label: "경영공시", path: "/about/disclosure" },
];

export const AboutTabs = () => {
    return (
        <BaseTabs
            tabs={tabs}
            className="mx-auto w-full px-5 py-10 sm:max-w-[1200px] sm:px-0 sm:py-20"
        />
    );
};
