"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";
import type { NavItem } from "../config/navItems";
import type { UserProfile } from "@/shared/api/types";

type MobileMenuProps = {
    navItems: NavItem[];
    activeMobileNav: string;
    setActiveMobileNav: (nav: string) => void;
    expandedMobileSubMenus: Record<string, boolean>;
    setExpandedMobileSubMenus: (
        updater:
            | Record<string, boolean>
            | ((prev: Record<string, boolean>) => Record<string, boolean>),
    ) => void;
    setIsMobileMenuOpen: (open: boolean) => void;
    user: UserProfile | null;
    onLogout: () => void;
    role: "user" | "admin";
    toggleRole: () => void;
};

export const MobileMenu = ({
    navItems,
    activeMobileNav,
    setActiveMobileNav,
    expandedMobileSubMenus,
    setExpandedMobileSubMenus,
    setIsMobileMenuOpen,
    user,
    onLogout,
    role,
    toggleRole,
}: MobileMenuProps) => {
    const router = useRouter();

    return (
        <div className="absolute top-[64px] right-0 left-0 max-h-[calc(100vh-64px)] overflow-y-auto bg-white shadow-lg sm:hidden">
            <nav className="flex flex-col">
                <div className="border-kua-gray200 bg-kua-gray50 flex items-center gap-2 border-b px-6 py-3">
                    <button
                        onClick={toggleRole}
                        className="text-kua-gray800 hover:text-kua-main text-sm font-medium transition-colors"
                    >
                        {role === "admin"
                            ? "👤 관리자 모드"
                            : "👤 일반 사용자 모드"}
                    </button>
                    {role === "admin" && (
                        <Link
                            href="/admin"
                            className="text-kua-gray800 hover:text-kua-main text-xs font-medium transition-colors"
                        >
                            관리자 페이지
                        </Link>
                    )}
                </div>
                <div className="flex flex-col gap-6 px-5 py-6">
                    <div className="flex flex-col gap-4 min-[380px]:flex-row">
                        <div className="flex flex-col gap-2 min-[380px]:w-[130px]">
                            {navItems
                                .filter((item) => {
                                    if (item.label === "로그인" && user) {
                                        return false;
                                    }
                                    return true;
                                })
                                .map((item) => {
                                    const isActiveMobile =
                                        activeMobileNav === item.label;
                                    return (
                                        <button
                                            key={item.label}
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    item.subMenus &&
                                                    item.subMenus.length > 0
                                                ) {
                                                    setActiveMobileNav(
                                                        item.label,
                                                    );
                                                    setExpandedMobileSubMenus(
                                                        {},
                                                    );
                                                } else if (item.href) {
                                                    setIsMobileMenuOpen(false);
                                                    router.push(item.href);
                                                }
                                            }}
                                            className={`rounded-[10px] px-4 py-3 text-left text-sm font-semibold transition-colors ${
                                                isActiveMobile
                                                    ? "bg-kua-main text-white"
                                                    : "bg-kua-gray100 text-kua-gray700 hover:bg-kua-main hover:text-white"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            {user && (
                                <div className="flex flex-col gap-2">
                                    <div className="bg-kua-gray100 text-kua-gray700 rounded-[10px] px-4 py-3 text-sm font-semibold">
                                        {user.name}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onLogout}
                                        className="bg-kua-gray100 rounded-[10px] px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="border-kua-gray100 flex flex-1 flex-col gap-4 border-l pl-0 min-[380px]:pl-4">
                            {(() => {
                                const currentMobileNav =
                                    navItems.find(
                                        (item) =>
                                            item.label === activeMobileNav,
                                    ) ?? navItems[0];

                                if (
                                    !currentMobileNav.subMenus ||
                                    currentMobileNav.subMenus.length === 0
                                ) {
                                    if (currentMobileNav.href) {
                                        return (
                                            <Link
                                                href={currentMobileNav.href}
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                                className="text-kua-blue300 border-kua-main flex items-center gap-2 rounded-[10px] border px-4 py-3 text-sm font-semibold"
                                            >
                                                {currentMobileNav.label}{" "}
                                                바로가기
                                                <FaChevronRight className="text-xs" />
                                            </Link>
                                        );
                                    }
                                    return (
                                        <p className="text-kua-gray500 rounded-[10px] border border-dashed px-4 py-3 text-sm">
                                            표시할 메뉴가 없습니다.
                                        </p>
                                    );
                                }

                                return currentMobileNav.subMenus.map(
                                    (subMenu) => {
                                        const subKey = `${currentMobileNav.label}-${subMenu.label}`;
                                        const children = subMenu.children ?? [];
                                        const hasChildren = children.length > 0;
                                        const shouldAutoExpand =
                                            subMenu.showChevron === false;
                                        const canToggle =
                                            hasChildren &&
                                            subMenu.showChevron !== false;
                                        const isExpanded = shouldAutoExpand
                                            ? true
                                            : (expandedMobileSubMenus[subKey] ??
                                              false);
                                        const toggleSubMenu = () => {
                                            if (!canToggle) return;
                                            setExpandedMobileSubMenus(
                                                (prev) => ({
                                                    ...prev,
                                                    [subKey]: !prev[subKey],
                                                }),
                                            );
                                        };
                                        return (
                                            <div
                                                key={subMenu.label}
                                                className="border-kua-gray200 bg-kua-gray50 flex flex-col rounded-[14px] border px-4 py-3"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={toggleSubMenu}
                                                    className="text-kua-gray900 flex w-full items-center justify-between text-left text-base font-semibold disabled:cursor-default"
                                                    disabled={!canToggle}
                                                    aria-expanded={
                                                        canToggle
                                                            ? isExpanded
                                                            : undefined
                                                    }
                                                >
                                                    <span>{subMenu.label}</span>
                                                    {hasChildren &&
                                                        subMenu.showChevron !==
                                                            false && (
                                                            <FaChevronDown
                                                                className={`text-kua-gray500 text-xs transition-transform ${
                                                                    isExpanded
                                                                        ? "rotate-180"
                                                                        : ""
                                                                }`}
                                                            />
                                                        )}
                                                </button>
                                                {hasChildren && isExpanded && (
                                                    <div className="mt-2 flex flex-col gap-2 pl-2">
                                                        {children.map(
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
                                                                        className="text-kua-gray800 flex items-center gap-2 text-sm font-medium"
                                                                    >
                                                                        <span className="text-kua-blue300">
                                                                            ·
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
                                                                        className="text-kua-gray500 flex items-center gap-2 text-sm"
                                                                    >
                                                                        <span>
                                                                            ·
                                                                        </span>
                                                                        {
                                                                            child.label
                                                                        }
                                                                    </span>
                                                                ),
                                                        )}
                                                    </div>
                                                )}
                                                {subMenu.href && (
                                                    <Link
                                                        href={subMenu.href}
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="text-kua-blue300 mt-3 inline-flex items-center gap-1 text-sm font-semibold"
                                                    >
                                                        바로가기
                                                        <FaChevronRight className="text-xs" />
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    },
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
