"use client";

import { ReactNode } from "react";

export type TabItem = {
    id: string;
    label: string;
    content?: ReactNode;
};

type TabNavigationProps = {
    tabs: TabItem[];
    activeTabId: string;
    onTabChange: (tabId: string) => void;
    className?: string;
    tabClassName?: string;
    activeTabClassName?: string;
    inactiveTabClassName?: string;
};

export const TabNavigation = ({
    tabs,
    activeTabId,
    onTabChange,
    className = "",
    tabClassName = "",
    activeTabClassName = "",
    inactiveTabClassName = "",
}: TabNavigationProps) => {
    const defaultActiveClass =
        activeTabClassName || "border-kua-main text-kua-main border bg-white";
    const defaultInactiveClass =
        inactiveTabClassName || "bg-kua-gray100 text-kua-gray400";

    const gridColsClass =
        {
            1: "grid-cols-1",
            2: "grid-cols-2",
            3: "grid-cols-3",
            4: "grid-cols-4",
            5: "grid-cols-5",
            6: "grid-cols-6",
        }[tabs.length] || "grid-cols-2";

    return (
        <div className={`grid w-full ${gridColsClass} gap-2 ${className}`}>
            {tabs.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        className={`flex h-12 items-center justify-center rounded-[10px] font-bold transition-colors ${
                            isActive ? defaultActiveClass : defaultInactiveClass
                        } ${tabClassName}`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};
