"use client";

import { BaseTabs } from "@/shared/ui/Tabs";
import { usePathname } from "next/navigation";

const TABS_BASE_PATHS = [
    "/competition-info/player-info/national",
    "/competition-info/player-info/youth",
    "/competition-info/player-info/reserve",
];

const tabs = [
    { label: "국가대표", path: "/competition-info/player-info/national" },
    { label: "청소년대표", path: "/competition-info/player-info/youth" },
    { label: "상비군선수", path: "/competition-info/player-info/reserve" },
];

export const PlayerInfoTabs = () => {
    const pathname = usePathname();
    const shouldRender = TABS_BASE_PATHS.includes(pathname);

    if (!shouldRender) {
        return null;
    }

    return <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px]" />;
};
