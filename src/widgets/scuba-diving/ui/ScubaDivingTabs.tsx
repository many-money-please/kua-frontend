"use client";

import { BaseTabs } from "@/shared/ui/Tabs";

const tabs = [
    { label: "유래", path: "/scuba-diving/history" },
    { label: "기술 및 훈련", path: "/scuba-diving/skills-and-training" },
    { label: "민간자격등록", path: "/scuba-diving/private-qualification" },
];

export const ScubaDivingTabs = () => {
    return (
        <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px] py-20" />
    );
};

