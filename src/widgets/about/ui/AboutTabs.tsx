"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { label: "협회소개", path: "/about" },
    { label: "협회구조", path: "/about/organization" },
    { label: "임원현황", path: "/about/executives" },
    { label: "규정", path: "/about/regulations" },
    { label: "경영공시", path: "/about/disclosure" },
];

export const AboutTabs = () => {
    const pathname = usePathname();

    return (
        <div className="mx-auto flex w-full max-w-[1200px] gap-[13px] py-20">
            {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                    <Link
                        key={tab.path}
                        href={tab.path}
                        className={`flex h-[70px] flex-1 items-center justify-center rounded-[10px] px-6 text-xl transition-colors ${
                            isActive
                                ? "border-kua-main text-kua-main hover:bg-kua-main border bg-white font-bold hover:text-white"
                                : "border-kua-gray200 text-kua-gray400 hover:border-kua-main hover:text-kua-main bg-[#EFF0F2] font-medium hover:border hover:bg-white"
                        }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
};
