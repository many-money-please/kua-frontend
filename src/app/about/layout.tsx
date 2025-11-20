"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AboutBanner, AboutTabs } from "@/widgets/about";

export default function AboutLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // detail 페이지인지 확인 (경로가 /about/{tab}/[id] 형태인 경우)
    const pathSegments = pathname.split("/").filter(Boolean);
    const isDetailPage =
        pathSegments.length >= 3 && // /about/{tab}/{id}
        pathSegments[0] === "about" &&
        !isNaN(Number(pathSegments[pathSegments.length - 1])); // 마지막이 숫자 (id)

    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between">
                <AboutBanner />
                {!isDetailPage && <AboutTabs />}
                {children}
            </main>
        </div>
    );
}
