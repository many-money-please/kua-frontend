"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

type NavItem = {
    label: string;
    href?: string;
    description?: string;
    subMenus?: {
        label: string;
        href?: string;
        children?: { label: string; href?: string }[];
    }[];
};

const navItems: NavItem[] = [
    {
        label: "협회소개",
        href: "/about",
        description: "대한수중핀수영협회를 소개합니다.",
        subMenus: [
            {
                label: "협회소개",
                href: "/about",
                children: [
                    { label: "협회장 인사말" },
                    { label: "협회 연혁" },
                    { label: "C.I 소개" },
                    { label: "찾아오시는길" },
                ],
            },
            {
                label: "협회구조",
                href: "/about/organization",
                children: [
                    { label: "협회 조직도" },
                    { label: "각종 위원회" },
                    { label: "시/도 지부 소개" },
                ],
            },
            { label: "임원현황", href: "/about/executives" },
            { label: "규정", href: "/about/regulations" },
            { label: "경영공시", href: "/about/disclosure" },
        ],
    },
    {
        label: "종목 소개",
        href: "/fin-swimming",
        description: "핀수영에 대해 알아보세요.",
        subMenus: [
            {
                label: "유래",
                href: "/fin-swimming/history",
                children: [
                    {
                        label: "역사적 기원",
                    },
                    {
                        label: "경기 구성",
                    },
                    {
                        label: "핀수영의 특징",
                    },
                    {
                        label: "한국 핀수영의 발전",
                    },
                ],
            },
            {
                label: "기술 및 훈련",
                href: "/fin-swimming/skills-and-training",
                children: [
                    { label: "기초기술" },
                    { label: "응용기술" },
                    { label: "훈련방법" },
                ],
            },
        ],
    },
    {
        label: "대회정보",
        href: "/competition-info",
        description: "대회 일정과 결과를 확인하세요.",
        subMenus: [
            {
                label: "대회정보",
                children: [
                    { label: "대회일정", href: "/competition-info/schedule" },
                    { label: "대회결과", href: "/competition-info/results" },
                ],
            },
            {
                label: "선수정보",
                children: [
                    {
                        label: "국가대표",
                        href: "/competition-info/player-info/national",
                    },
                    {
                        label: "청소년대표",
                        href: "/competition-info/player-info/youth",
                    },
                    {
                        label: "상비군선수",
                        href: "/competition-info/player-info/reserve",
                    },
                ],
            },
        ],
    },
    {
        label: "커뮤니티",
        href: "/community",
        description: "공지사항과 자료실을 확인하세요.",
        subMenus: [
            // { label: "공지사항", href: "/community/notices" },
            // { label: "자료실", href: "/community/resources" },
            {
                label: "커뮤니티",
                children: [
                    { label: "공지사항", href: "/community/notices" },
                    { label: "자료실", href: "/community/resources" },
                ],
            },
            {
                label: "협회소식",
                children: [
                    {
                        label: "소식 및 활동",
                        href: "/community/news-and-activities",
                    },
                    {
                        label: "보도자료",
                        href: "/community/press-releases",
                    },
                    {
                        label: "핀수영 TV",
                        href: "/community/fin-swimming-tv",
                    },
                ],
            },
            {
                label: "문의하기",
                href: "/community/contact",
            },
        ],
    },
    {
        label: "교육사업",
        href: "/education-business",
        description: "교육사업에 대해 알아보세요.",
        subMenus: [],
    },
    {
        label: "로그인",
        href: "/login",
        description: "로그인하세요.",
        subMenus: [],
    },
];

export const Header = () => {
    const pathname = usePathname();
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const gnbRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    // GNB 외부 클릭 시 닫기 (nav 영역은 제외)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                gnbRef.current &&
                !gnbRef.current.contains(target) &&
                navRef.current &&
                !navRef.current.contains(target)
            ) {
                setHoveredNav(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const currentNav = hoveredNav
        ? navItems.find((nav) => nav.label === hoveredNav)
        : null;

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <div className="mx-auto flex h-[84px] w-full max-w-[1200px] items-center justify-between px-[32px]">
                <div className="flex items-center gap-[14px]">
                    <Link href="/" className="flex items-center gap-[14px]">
                        <Image
                            src="/imgs/logos/Icon.svg"
                            alt="Korea Underwater Association logo"
                            width={44}
                            height={44}
                            priority
                        />
                        <Image
                            src="/imgs/logos/Icon-Text.svg"
                            alt="Korea Underwater Association text mark"
                            width={182}
                            height={40}
                            priority
                        />
                    </Link>
                </div>

                <nav
                    ref={navRef}
                    className="text-kua-gray800 relative flex h-full items-center gap-[42px] text-[15px] font-semibold"
                >
                    {navItems.map((item) => {
                        const isHovered = hoveredNav === item.label;
                        return (
                            <div
                                key={item.label}
                                className="hover:text-kua-blue300 relative flex h-full cursor-pointer items-center"
                                onMouseEnter={() => setHoveredNav(item.label)}
                                onMouseLeave={() => {
                                    // GNB가 열려있을 때는 닫지 않음
                                    if (!gnbRef.current) {
                                        setHoveredNav(null);
                                    }
                                }}
                                onClick={() => {
                                    // 클릭 시에도 hover 상태 유지
                                    if (
                                        item.subMenus &&
                                        item.subMenus.length > 0
                                    ) {
                                        setHoveredNav(item.label);
                                    }
                                }}
                            >
                                {item.label}
                                {/* 헤더와 GNB 사이에 걸치는 동그란 요소 */}
                                <div
                                    className={`bg-kua-blue300 absolute top-[82px] left-1/2 z-40 min-h-1 min-w-1 -translate-x-1/2 scale-150 rounded-full transition-opacity duration-200 ${
                                        isHovered ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* GNB */}
            {currentNav &&
                currentNav.subMenus &&
                currentNav.subMenus.length > 0 && (
                    <div
                        ref={gnbRef}
                        className="border-kua-gray200 absolute right-0 left-0 border-t border-b bg-white shadow-lg"
                        onMouseEnter={() => setHoveredNav(currentNav.label)}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{
                            top: "84px",
                            animation: "revealFromTop 0.3s ease-out forwards",
                        }}
                    >
                        <div className="mx-auto w-full max-w-[1200px] px-[32px] py-8">
                            <div className="flex gap-8">
                                {/* 좌측: Nav 이름 및 설명 */}
                                <div className="flex w-[30%] flex-col gap-2">
                                    <h2 className="text-kua-gray900 text-3xl font-bold">
                                        {currentNav.label}
                                    </h2>
                                    {currentNav.description && (
                                        <p className="text-kua-gray600 text-sm">
                                            {currentNav.description}
                                        </p>
                                    )}
                                </div>

                                {/* 경계선 */}
                                <div className="border-kua-gray200 border-l" />

                                {/* 우측: 세부 메뉴 */}
                                <div className="w-[70%]">
                                    <div className="flex flex-wrap gap-12">
                                        {currentNav.subMenus.map((subMenu) => {
                                            const isSubMenuActive =
                                                subMenu.href &&
                                                (pathname === subMenu.href ||
                                                    pathname.startsWith(
                                                        subMenu.href + "/",
                                                    ));
                                            return (
                                                <div key={subMenu.label}>
                                                    {subMenu.href ? (
                                                        <Link
                                                            href={subMenu.href}
                                                            scroll={
                                                                pathname !==
                                                                subMenu.href
                                                            }
                                                            onClick={() =>
                                                                setHoveredNav(
                                                                    null,
                                                                )
                                                            }
                                                            className={`group hover:bg-kua-sky100 bg-kua-gray100 flex w-[200px] items-center justify-between rounded-lg p-2 text-base font-medium transition-colors ${
                                                                isSubMenuActive
                                                                    ? "text-kua-main font-semibold"
                                                                    : "text-kua-gray800 hover:text-kua-blue300"
                                                            }`}
                                                        >
                                                            {subMenu.label}
                                                            <FaChevronRight className="text-kua-gray800 group-hover:text-kua-blue300 text-sm font-medium transition-colors" />
                                                        </Link>
                                                    ) : (
                                                        <div className="bg-kua-gray100 text-kua-gray800 block w-[200px] rounded-lg p-2 text-base font-medium">
                                                            {subMenu.label}
                                                        </div>
                                                    )}
                                                    {subMenu.children && (
                                                        <div className="mt-2 flex flex-col gap-2">
                                                            {subMenu.children.map(
                                                                (child) => {
                                                                    return child.href ? (
                                                                        <Link
                                                                            key={
                                                                                child.label
                                                                            }
                                                                            href={
                                                                                child.href
                                                                            }
                                                                            scroll={
                                                                                pathname !==
                                                                                child.href
                                                                            }
                                                                            onClick={() =>
                                                                                setHoveredNav(
                                                                                    null,
                                                                                )
                                                                            }
                                                                            className="text-kua-gray800 hover:text-kua-blue300 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-sm transition-colors hover:underline"
                                                                        >
                                                                            {
                                                                                child.label
                                                                            }
                                                                            <svg
                                                                                width="10"
                                                                                height="10"
                                                                                viewBox="0 0 10 10"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="hover:text-kua-blue300"
                                                                            >
                                                                                <path
                                                                                    d="M2.91666 8.87091L7.08333 5.00186L2.91666 1.13281"
                                                                                    stroke="currentColor"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </svg>
                                                                        </Link>
                                                                    ) : (
                                                                        <span
                                                                            key={
                                                                                child.label
                                                                            }
                                                                            className="text-kua-gray600 px-2 py-1 text-sm"
                                                                        >
                                                                            {
                                                                                child.label
                                                                            }
                                                                        </span>
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </header>
    );
};
