"use client";

import { BaseTabs } from "@/shared/ui/Tabs";

const tabs = [
    { label: "유래", path: "/fin-swimming/history" },
    { label: "기술 및 훈련", path: "/fin-swimming/skills-and-training" },
    { label: "민간자격등록", path: "/fin-swimming/private-qualification" },
];

export const FinSwimmingTabs = () => {
    return (
        <BaseTabs
            tabs={tabs}
            className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-0 sm:py-20"
        />
    );
};
