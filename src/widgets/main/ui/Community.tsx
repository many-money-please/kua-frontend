"use client";

import { useMemo, useState } from "react";

const data = [
    {
        category: "공지사항",
        title: "「제26회 문화체육관광부장관기 전국생활체육 수중스포츠 대회」 개최 안내",
        date: "2025-01-01",
    },
    {
        category: "협회소식",
        title: "「제27회 문화체육관광부장관기 전국생활체육 수중스포츠 대회」 개최 안내",
        date: "2025-01-01",
    },
    {
        category: "보도자료",
        title: "「제28회 문화체육관광부장관기 전국생활체육 수중스포츠 대회」 개최 안내",
        date: "2025-01-01",
    },
    {
        category: "공지사항",
        title: "「제28회 문화체육관광부장관기 전국생활체육 수중스포츠 대회」 개최 안내",
        date: "2025-01-01",
    },
    {
        category: "공지사항",
        title: "「제28회 문화체육관광부장관기 전국생활체육 수중스포츠 대회」 개최 안내",
        date: "2025-01-01",
    },
];

const tabs = ["전체", "공지사항", "협회소식", "보도자료", "더보기+"];

export const Community = () => {
    const [selectedTab, setSelectedTab] = useState("전체");

    const filteredData = useMemo(() => {
        if (selectedTab === "전체") {
            return data;
        }
        return data.filter((item) => item.category === selectedTab);
    }, [selectedTab]);

    const handleTabClick = (tab: string) => {
        if (tab === "더보기+") {
            return;
        }
        setSelectedTab(tab);
    };

    return (
        <div className="flex w-full max-w-[1200px] flex-col gap-10 px-5 sm:px-5">
            <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
                <div className="text-2xl font-bold sm:text-[32px]">
                    커뮤니티
                </div>
                <div className="flex items-center gap-4 text-[15px] sm:text-base">
                    {tabs.map((tab, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => handleTabClick(tab)}
                                className={`cursor-pointer font-semibold transition-colors ${
                                    selectedTab === tab
                                        ? "text-kua-main"
                                        : "text-kua-gray400 hover:text-kua-main"
                                }`}
                            >
                                {tab}
                            </button>
                            {i < tabs.length - 1 && (
                                <span className="text-kua-gray400">|</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex h-120 w-full flex-col gap-4">
                {filteredData.map((item, i) => (
                    <div
                        key={i}
                        className="bg-kua-sky50 hover:bg-kua-blue50 flex h-20 w-full items-center justify-between rounded-[20px] px-4 sm:px-10"
                    >
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                            <div className="text-kua-blue300 bg-kua-white border-kua-blue300 flex shrink-0 items-center rounded-full border px-4 py-1 text-xs font-medium sm:text-base">
                                {item.category}
                            </div>
                            <div className="min-w-0 overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap sm:text-2xl sm:font-bold">
                                {item.title}
                            </div>
                        </div>
                        <div className="text-kua-gray400 text-[0px] sm:text-base">
                            {item.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
