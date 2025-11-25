"use client";

import { BaseTabs } from "@/shared/ui/Tabs";

const tabs = [
    { label: "유래", path: "/free-diving/history" },
    { label: "기술 및 훈련", path: "/free-diving/skills-and-training" },
    { label: "민간자격등록", path: "/free-diving/private-qualification" },
];

export const FreeDivingTabs = () => {
    return (
        <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px] py-20" />
    );
};

