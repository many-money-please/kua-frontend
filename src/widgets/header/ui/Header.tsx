"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    FaChevronRight,
    FaBars,
    FaXmark,
    FaChevronDown,
} from "react-icons/fa6";
import { useUserRole } from "@/shared/lib/UserRoleContext";

type NavItem = {
    label: string;
    href?: string;
    description?: string;
    subMenus?: {
        label: string;
        href?: string;
        showChevron?: boolean;
        children?: { label: string; href?: string }[];
    }[];
};

const stripHash = (href?: string) =>
    href ? (href.split("#")[0] ?? href) : href;

const navItems: NavItem[] = [
    {
        label: "협회소개",
        href: "/about",
        description: `대한수중핀수영협회의 설립 배경, 조직 구조 등
협회의 전반적인 체계와 정체성을 소개합니다.`,
        subMenus: [
            {
                label: "협회소개",
                href: "/about",
                showChevron: true,
                children: [
                    { label: "협회장 인사말", href: "/about#president" },
                    { label: "협회 연혁", href: "/about#history" },
                    { label: "C.I 소개", href: "/about#ci" },
                    { label: "찾아오시는길", href: "/about#find-us" },
                ],
            },
            {
                label: "협회구조",
                href: "/about/organization",
                showChevron: true,
                children: [
                    { label: "협회 조직도" },
                    { label: "각종 위원회" },
                    { label: "시/도 지부 소개" },
                ],
            },
            { label: "임원현황", href: "/about/executives", showChevron: true },
            { label: "규정", href: "/about/regulations", showChevron: true },
            { label: "경영공시", href: "/about/disclosure", showChevron: true },
        ],
    },
    {
        label: "종목 소개",
        href: "/fin-swimming",
        description:
            "협회에서 운영하는 수중·안전 분야의 주요 종목들의 특징, 목적, 기본 기술과 교육 체계를 체계적으로 안내합니다.",
        subMenus: [
            {
                label: "핀수영",
                href: "/fin-swimming/history",
                showChevron: true,
                children: [
                    {
                        label: "유래",
                        href: "/fin-swimming/history",
                    },
                    {
                        label: "기술 및 훈련",
                        href: "/fin-swimming/skills-and-training",
                    },
                    {
                        label: "민간자격등록",
                        href: "/fin-swimming/private-qualification",
                    },
                ],
            },
            // {
            //     label: "스쿠버다이빙",
            //     href: "/scuba-diving/history",
            //     showChevron: true,
            //     children: [
            //         {
            //             label: "유래",
            //             href: "/scuba-diving/history",
            //         },
            //         {
            //             label: "기술 및 훈련",
            //             href: "/scuba-diving/skills-and-training",
            //         },
            //         {
            //             label: "민간자격등록",
            //             href: "/scuba-diving/private-qualification",
            //         },
            //     ],
            // },
            {
                label: "프리다이빙",
                href: "/free-diving/history",
                showChevron: true,
                children: [
                    {
                        label: "유래",
                        href: "/free-diving/history",
                    },
                    {
                        label: "기술 및 훈련",
                        href: "/free-diving/skills-and-training",
                    },
                    {
                        label: "민간자격등록",
                        href: "/free-diving/private-qualification",
                    },
                ],
            },
            // {
            //     label: "인명구조",
            //     href: "/lifesaving/history",
            //     showChevron: true,
            //     children: [
            //         {
            //             label: "유래",
            //             href: "/lifesaving/history",
            //         },
            //         {
            //             label: "기술 및 훈련",
            //             href: "/lifesaving/skills-and-training",
            //         },
            //         {
            //             label: "민간자격등록",
            //             href: "/lifesaving/private-qualification",
            //         },
            //         {
            //             label: "교육 안내",
            //             href: "/lifesaving/education",
            //         },
            //     ],
            // },
            // {
            //     label: "응급처치",
            //     href: "/first-aid/history",
            //     showChevron: true,
            //     children: [
            //         {
            //             label: "유래",
            //             href: "/first-aid/history",
            //         },
            //         {
            //             label: "기술 및 훈련",
            //             href: "/first-aid/skills-and-training",
            //         },
            //         {
            //             label: "민간자격등록",
            //             href: "/first-aid/private-qualification",
            //         },
            //         {
            //             label: "교육 안내",
            //             href: "/first-aid/education",
            //         },
            //     ],
            // },
        ],
    },
    {
        label: "대회정보",
        href: "/competition-info",
        description: `대회 일정, 선수/국가대표 정보, 증명서 발급 등
대회 운영 및 참여 관련 정보를 제공합니다.`,
        subMenus: [
            {
                label: "대회정보",
                href: "/competition-info",
                showChevron: false,
                children: [
                    { label: "대회일정", href: "/competition-info/schedule" },
                    { label: "대회결과", href: "/competition-info/results" },
                    {
                        label: "e-상장",
                        href: "http://scubakorea.or.kr/game/mypage.php",
                    },
                ],
            },
            {
                label: "선수정보",
                href: "/competition-info/player-info",
                showChevron: false,
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
            {
                label: "신기록 현황",
                href: "/competition-info/new-records",
                showChevron: true,
            },
            {
                label: "신청/발급",
                href: "/competition-info/registration",
                showChevron: false,
                children: [
                    {
                        label: "대회 참가 신청",
                        href: "/competition-info/registration/competition-application",
                    },
                    {
                        label: "경기인 등록",
                        href: "/competition-info/registration/athlete-registration",
                    },
                    {
                        label: "증명서 발급",
                        href: "/competition-info/registration/certificate-issuance",
                    },
                ],
            },
        ],
    },
    {
        label: "커뮤니티",
        href: "/community",
        description:
            "협회 소식, 공지사항 등 유익한 자료를 전달하고 다양한 정보를 공유하는 열린 공간입니다.",
        subMenus: [
            {
                label: "커뮤니티",
                href: "/community",
                showChevron: false,
                children: [
                    { label: "공지사항", href: "/community/notices" },
                    { label: "자료실", href: "/community/resources" },
                    { label: "문의하기", href: "/community/contact" },
                ],
            },
            {
                label: "협회소식",
                href: "/community/news-and-activities",
                showChevron: false,
                children: [
                    {
                        label: "소식 및 활동",
                        href: "/community/news-and-activities",
                    },
                    {
                        label: "보도자료",
                        href: "/community/press-release",
                    },
                    {
                        label: "핀수영 TV",
                        href: "/community/fin-swimming-tv",
                    },
                ],
            },
        ],
    },
    {
        label: "교육사업",
        href: "/education-business",
        description:
            "KUA·CMAS 교육 철학과 과정을 소개하고 체계적인 국제 인증 교육장을 안내합니다.",
        subMenus: [
            {
                label: "KUA & CMAS",
                href: "/education-business/kua-cmas",
                showChevron: true,
                children: [
                    {
                        label: "교육 철학 및 국제 인증 안내",
                    },
                    {
                        label: "교육장 안내",
                    },
                    {
                        label: "교육 참여 안내",
                    },
                ],
            },
        ],
    },
    {
        label: "로그인",
        href: "/auth/login",
    },
];

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { role, toggleRole } = useUserRole();
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
        null,
    );
    const gnbRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [currentHash, setCurrentHash] = useState<string>("");

    useEffect(() => {
        const updateHash = () => {
            setCurrentHash(window.location.hash ?? "");
        };

        updateHash();
        window.addEventListener("hashchange", updateHash);
        return () => {
            window.removeEventListener("hashchange", updateHash);
        };
    }, []);

    const isPathActive = (href?: string, exactMatch = false) => {
        const baseHref = stripHash(href);
        if (!baseHref) return false;
        if (baseHref === "/") {
            return pathname === "/";
        }

        // exactMatch가 true이면 정확히 일치할 때만 활성화
        if (exactMatch) {
            if (pathname !== baseHref) return false;
        } else {
            const baseMatched =
                pathname === baseHref || pathname.startsWith(`${baseHref}/`);
            if (!baseMatched) return false;
        }

        const hashIndex = href?.indexOf("#") ?? -1;
        if (hashIndex >= 0) {
            const targetHash = href?.slice(hashIndex) ?? "";
            return currentHash === targetHash;
        }

        return true;
    };

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

    // 모바일 메뉴 열릴 때 스크롤 방지
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const currentNav = hoveredNav
        ? navItems.find((nav) => nav.label === hoveredNav)
        : null;

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="mx-auto flex h-[64px] w-full max-w-[1200px] items-center justify-between px-4 sm:h-[84px] sm:px-8">
                {/* 로고 */}
                <div className="flex items-center gap-2 sm:gap-[14px]">
                    <Link
                        href="/"
                        className="flex items-center gap-2 sm:gap-[14px]"
                    >
                        <Image
                            src="/imgs/logos/Icon.svg"
                            alt="Korea Underwater Association logo"
                            width={32}
                            height={32}
                            className="sm:h-[44px] sm:w-[44px]"
                            priority
                        />
                        <Image
                            src="/imgs/logos/Icon-Text.svg"
                            alt="Korea Underwater Association text mark"
                            width={140}
                            height={30}
                            className="sm:h-[40px] sm:w-[182px]"
                            priority
                        />
                    </Link>
                </div>

                {/* 모바일 햄버거 메뉴 버튼 */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-kua-gray800 flex h-10 w-10 cursor-pointer items-center justify-center sm:hidden"
                    aria-label="메뉴"
                >
                    {isMobileMenuOpen ? (
                        <FaXmark className="text-2xl" />
                    ) : (
                        <FaBars className="text-2xl" />
                    )}
                </button>

                {/* 데스크탑 네비게이션 */}
                <nav
                    ref={navRef}
                    className="text-kua-gray800 relative hidden h-full items-center gap-[42px] text-[15px] font-semibold sm:flex"
                >
                    {/* 역할 토글 버튼 (개발용) */}
                    <button
                        onClick={toggleRole}
                        className="text-kua-gray800 hover:text-kua-main text-xs font-medium transition-colors"
                    >
                        {role === "admin" ? "👤 관리자" : "👤 일반"}
                    </button>
                    {navItems.map((item) => {
                        const isHovered = hoveredNav === item.label;
                        const hasSubMenus =
                            item.subMenus && item.subMenus.length > 0;

                        // 메인 네비게이션 항목 활성화 확인
                        // /about 경로의 경우 정확히 일치할 때만 활성화
                        const shouldExactMatchForMainNav =
                            item.href === "/about";
                        const isMainNavActive = item.href
                            ? isPathActive(
                                  item.href,
                                  shouldExactMatchForMainNav,
                              )
                            : false;

                        const handleNavClick = () => {
                            if (hasSubMenus) {
                                setHoveredNav(item.label);
                            } else if (item.href) {
                                router.push(item.href);
                            }
                        };

                        return (
                            <div
                                key={item.label}
                                className={`relative flex h-full cursor-pointer items-center transition-colors ${
                                    isMainNavActive
                                        ? "text-kua-blue300"
                                        : "text-kua-gray800 hover:text-kua-blue300"
                                }`}
                                onMouseEnter={() => {
                                    if (hasSubMenus) {
                                        setHoveredNav(item.label);
                                    }
                                }}
                                onMouseLeave={() => {
                                    // GNB가 열려있을 때는 닫지 않음
                                    if (!gnbRef.current) {
                                        setHoveredNav(null);
                                    }
                                }}
                                onClick={handleNavClick}
                            >
                                {item.label}
                                {/* 헤더와 GNB 사이에 걸치는 동그란 요소 */}
                                {hasSubMenus && (
                                    <div
                                        className={`bg-kua-blue300 absolute top-[82px] left-1/2 z-40 min-h-1 min-w-1 -translate-x-1/2 scale-150 rounded-full transition-opacity duration-200 ${
                                            isHovered
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* 데스크탑 GNB */}
            {currentNav &&
                currentNav.subMenus &&
                currentNav.subMenus.length > 0 && (
                    <div
                        ref={gnbRef}
                        className="border-kua-gray200 absolute right-0 left-0 hidden border-t border-b bg-white shadow-lg sm:block"
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
                                <div className="flex w-[30%] flex-col gap-6 pr-8">
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
                                            // 자신의 children 중 활성화된 것이 있는지 확인
                                            const hasChildActive =
                                                subMenu.children?.some(
                                                    (child) =>
                                                        child.href &&
                                                        isPathActive(
                                                            child.href,
                                                        ),
                                                );
                                            // subMenu가 활성화되려면:
                                            // 1. 자신의 children 중 하나가 활성화되어야 함
                                            // 2. 또는 정확히 경로가 일치 (특히 /about은 정확히 일치할 때만)
                                            // /about 경로의 경우 정확히 일치해야 하므로 exactMatch 사용
                                            const shouldExactMatch =
                                                subMenu.href === "/about";
                                            const isSubMenuActive =
                                                Boolean(hasChildActive) ||
                                                (subMenu.href &&
                                                    isPathActive(
                                                        subMenu.href,
                                                        shouldExactMatch,
                                                    ));
                                            const subMenuBaseClasses =
                                                "flex w-[200px] items-center rounded-lg p-2 text-base font-medium transition-colors";
                                            const subMenuStateClasses =
                                                isSubMenuActive
                                                    ? "bg-kua-sky100 text-kua-main font-semibold"
                                                    : "bg-kua-gray100 text-kua-gray800";
                                            const subMenuHoverClasses =
                                                "hover:bg-kua-sky100 hover:text-kua-main";
                                            const fallbackHref =
                                                subMenu.href ?? currentNav.href;
                                            const renderChild = (child: {
                                                label: string;
                                                href?: string;
                                            }) => {
                                                const isChildActive =
                                                    isPathActive(child.href);
                                                const childHasHash =
                                                    child.href?.includes("#");

                                                if (child.href) {
                                                    return (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            scroll={
                                                                childHasHash ||
                                                                pathname !==
                                                                    stripHash(
                                                                        child.href,
                                                                    )
                                                            }
                                                            onClick={() =>
                                                                setHoveredNav(
                                                                    null,
                                                                )
                                                            }
                                                            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-sm transition-colors hover:underline ${
                                                                isChildActive
                                                                    ? "text-kua-blue300 font-semibold underline"
                                                                    : "text-kua-gray800 hover:text-kua-blue300"
                                                            }`}
                                                        >
                                                            {child.label}
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
                                                    );
                                                }

                                                return (
                                                    <span
                                                        key={child.label}
                                                        className="text-kua-gray600 px-2 py-1 text-sm"
                                                    >
                                                        {child.label}
                                                    </span>
                                                );
                                            };

                                            return (
                                                <div key={subMenu.label}>
                                                    {subMenu.href ? (
                                                        <Link
                                                            href={subMenu.href}
                                                            scroll={
                                                                subMenu.href?.includes(
                                                                    "#",
                                                                ) ||
                                                                pathname !==
                                                                    stripHash(
                                                                        subMenu.href,
                                                                    )
                                                            }
                                                            onClick={() =>
                                                                setHoveredNav(
                                                                    null,
                                                                )
                                                            }
                                                            className={`${subMenuBaseClasses} ${subMenuHoverClasses} ${subMenuStateClasses} ${
                                                                subMenu.showChevron !==
                                                                false
                                                                    ? "justify-between"
                                                                    : "justify-start"
                                                            }`}
                                                        >
                                                            <span>
                                                                {subMenu.label}
                                                            </span>
                                                            {subMenu.showChevron !==
                                                                false && (
                                                                <FaChevronRight className="text-sm" />
                                                            )}
                                                        </Link>
                                                    ) : fallbackHref ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                router.push(
                                                                    fallbackHref,
                                                                );
                                                                setHoveredNav(
                                                                    null,
                                                                );
                                                            }}
                                                            className={`${subMenuBaseClasses} ${subMenuHoverClasses} ${subMenuStateClasses} justify-start text-left`}
                                                        >
                                                            {subMenu.label}
                                                        </button>
                                                    ) : (
                                                        <div
                                                            className={`${subMenuBaseClasses} ${subMenuStateClasses} justify-start`}
                                                        >
                                                            {subMenu.label}
                                                        </div>
                                                    )}
                                                    {subMenu.children && (
                                                        <div className="mt-2 flex flex-col gap-2">
                                                            {subMenu.children.map(
                                                                renderChild,
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

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="absolute top-[64px] right-0 left-0 max-h-[calc(100vh-64px)] overflow-y-auto bg-white shadow-lg sm:hidden"
                >
                    <nav className="flex flex-col">
                        {/* 역할 토글 버튼 (모바일) */}
                        <div className="border-kua-gray200 bg-kua-gray50 border-b px-6 py-3">
                            <button
                                onClick={toggleRole}
                                className="text-kua-gray800 hover:text-kua-main text-sm font-medium transition-colors"
                            >
                                {role === "admin"
                                    ? "👤 관리자 모드"
                                    : "👤 일반 사용자 모드"}
                            </button>
                        </div>
                        {navItems.map((item) => {
                            const isExpanded =
                                expandedMobileMenu === item.label;
                            const hasSubMenus =
                                item.subMenus && item.subMenus.length > 0;

                            return (
                                <div
                                    key={item.label}
                                    className="border-kua-gray200 border-b"
                                >
                                    {/* 메인 메뉴 아이템 */}
                                    <div
                                        className="text-kua-gray800 flex cursor-pointer items-center justify-between px-6 py-4 font-semibold"
                                        onClick={() => {
                                            if (hasSubMenus) {
                                                setExpandedMobileMenu(
                                                    isExpanded
                                                        ? null
                                                        : item.label,
                                                );
                                            } else if (item.href) {
                                                setIsMobileMenuOpen(false);
                                                window.location.href =
                                                    item.href;
                                            }
                                        }}
                                    >
                                        <span>{item.label}</span>
                                        {hasSubMenus && (
                                            <FaChevronDown
                                                className={`text-kua-gray600 text-sm transition-transform ${
                                                    isExpanded
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        )}
                                    </div>

                                    {/* 서브메뉴 */}
                                    {hasSubMenus && isExpanded && (
                                        <div className="bg-kua-gray50 px-6 py-2">
                                            {item.subMenus!.map((subMenu) => (
                                                <div
                                                    key={subMenu.label}
                                                    className="py-2"
                                                >
                                                    {/* 서브메뉴 헤더 */}
                                                    {subMenu.href ? (
                                                        <Link
                                                            href={subMenu.href}
                                                            onClick={() =>
                                                                setIsMobileMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className="text-kua-gray800 hover:text-kua-blue300 block py-2 font-medium"
                                                        >
                                                            {subMenu.label}
                                                        </Link>
                                                    ) : item.href ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setIsMobileMenuOpen(
                                                                    false,
                                                                );
                                                                router.push(
                                                                    item.href!,
                                                                );
                                                            }}
                                                            className="text-kua-gray800 hover:text-kua-blue300 block py-2 text-left font-medium"
                                                        >
                                                            {subMenu.label}
                                                        </button>
                                                    ) : (
                                                        <div className="text-kua-gray800 py-2 font-medium">
                                                            {subMenu.label}
                                                        </div>
                                                    )}

                                                    {/* 서브메뉴 children */}
                                                    {subMenu.children && (
                                                        <div className="ml-4 flex flex-col gap-1">
                                                            {subMenu.children.map(
                                                                (child) =>
                                                                    child.href ? (
                                                                        <Link
                                                                            key={
                                                                                child.label
                                                                            }
                                                                            href={
                                                                                child.href
                                                                            }
                                                                            onClick={() =>
                                                                                setIsMobileMenuOpen(
                                                                                    false,
                                                                                )
                                                                            }
                                                                            className="text-kua-gray600 hover:text-kua-blue300 flex items-center gap-2 py-2 text-sm"
                                                                        >
                                                                            <span>
                                                                                •
                                                                            </span>
                                                                            {
                                                                                child.label
                                                                            }
                                                                        </Link>
                                                                    ) : (
                                                                        <span
                                                                            key={
                                                                                child.label
                                                                            }
                                                                            className="text-kua-gray600 flex items-center gap-2 py-2 text-sm"
                                                                        >
                                                                            <span>
                                                                                •
                                                                            </span>
                                                                            {
                                                                                child.label
                                                                            }
                                                                        </span>
                                                                    ),
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
};
