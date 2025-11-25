"use client";

import { BaseTabs } from "@/shared/ui/Tabs";

const tabs = [
    { label: "유래", path: "/lifesaving/history" },
    { label: "기술 및 훈련", path: "/lifesaving/skills-and-training" },
    { label: "민간자격등록", path: "/lifesaving/private-qualification" },
    { label: "교육 안내", path: "/lifesaving/education" },
];

export const LifesavingTabs = () => {
    return (
        <BaseTabs tabs={tabs} className="mx-auto w-full max-w-[1200px] py-20" />
    );
};

