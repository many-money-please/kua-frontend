"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AboutBanner, AboutTabs } from "@/widgets/about";

export default function AboutLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // 탭이 표시되어야 하는 기본 경로들
    const tabPaths = [
        "/about",
        "/about/organization",
        "/about/executives",
        "/about/regulations",
        "/about/disclosure",
    ];

    // 현재 경로가 기본 탭 경로인지 확인
    const shouldShowTabs = tabPaths.includes(pathname);

    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <AboutBanner />
                {shouldShowTabs && <AboutTabs />}
                {children}
            </main>
        </div>
    );
}
