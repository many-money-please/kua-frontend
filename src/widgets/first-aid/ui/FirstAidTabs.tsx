"use client";

import { BaseTabs } from "@/shared/ui/Tabs";

const tabs = [
    { label: "유래", path: "/first-aid/history" },
    { label: "기술 및 훈련", path: "/first-aid/skills-and-training" },
    { label: "민간자격등록", path: "/first-aid/private-qualification" },
    { label: "교육 안내", path: "/first-aid/education" },
];

export const FirstAidTabs = () => {
    return (
        <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px] py-20" />
    );
};

