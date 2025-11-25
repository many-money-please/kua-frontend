"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type BaseTab = {
    label: string;
    path: string;
};

type BaseTabsProps = {
    tabs: BaseTab[];
    className?: string;
};

/**
 * 라우트 기반으로 활성 상태를 감지하는 기본 탭 컴포넌트.
 * - `tabs`: label/path 쌍 배열
 * - `className`: 레이아웃을 감싸는 컨테이너 클래스
 * - 활성/비활성 스타일은 구성요소 내부에서 고정되어 일관된 UI를 제공합니다.
 */
export const BaseTabs = ({ tabs, className = "" }: BaseTabsProps) => {
    const pathname = usePathname();

    return (
        <div className={`flex gap-2 sm:gap-3 ${className}`}>
            {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                    <Link
                        key={tab.path}
                        href={tab.path}
                        className={`flex flex-1 items-center justify-center rounded-[10px] border px-3 py-5 text-sm font-medium transition-colors sm:px-6 sm:py-3 sm:text-lg ${
                            isActive
                                ? "border-kua-main text-kua-main hover:bg-kua-main bg-white font-bold hover:text-white"
                                : "border-kua-gray200 bg-kua-gray100 text-kua-gray400 hover:border-kua-main hover:text-kua-main hover:bg-white"
                        }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
};
