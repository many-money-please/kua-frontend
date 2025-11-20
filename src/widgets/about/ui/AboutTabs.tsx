"use client";

import { useState } from "react";

const tabs = ["협회소개", "협회구조", "임원현황", "규정", "경영공시"];

export const AboutTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="mx-auto flex w-full max-w-[1200px] gap-[13px] py-20">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`h-[70px] flex-1 rounded-[10px] px-6 text-xl transition-colors ${
                        activeTab === index
                            ? "border-kua-main text-kua-main hover:bg-kua-main border bg-white font-bold hover:text-white"
                            : "border-kua-gray200 text-kua-gray400 hover:border-kua-main hover:text-kua-main bg-[#EFF0F2] font-medium hover:border hover:bg-white"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};
