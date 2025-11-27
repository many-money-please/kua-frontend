"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import type { NavItem } from "../config/navItems";
import type { UserProfile } from "@/shared/api/types";

type DesktopNavProps = {
    navItems: NavItem[];
    hoveredNav: string | null;
    setHoveredNav: (nav: string | null) => void;
    isPathActive: (href?: string, exactMatch?: boolean) => boolean;
    user: UserProfile | null;
    isUserMenuOpen: boolean;
    setIsUserMenuOpen: (open: boolean) => void;
    onLogout: () => void;
    role: "user" | "admin";
    toggleRole: () => void;
    gnbRef: React.RefObject<HTMLDivElement | null>;
    userMenuRef: React.RefObject<HTMLDivElement | null>;
};

export const DesktopNav = ({
    navItems,
    hoveredNav,
    setHoveredNav,
    isPathActive,
    user,
    isUserMenuOpen,
    setIsUserMenuOpen,
    onLogout,
    role,
    toggleRole,
    gnbRef,
    userMenuRef,
}: DesktopNavProps) => {
    const router = useRouter();

    return (
        <nav className="text-kua-gray800 relative hidden h-full items-center gap-[42px] text-[15px] font-semibold sm:flex">
            <button
                onClick={toggleRole}
                className="text-kua-gray800 hover:text-kua-main text-xs font-medium transition-colors"
            >
                {role === "admin" ? "👤 관리자" : "👤 일반"}
            </button>
            {role === "admin" && (
                <Link
                    href="/admin"
                    className="text-kua-gray800 hover:text-kua-main text-xs font-medium transition-colors"
                >
                    관리자 페이지
                </Link>
            )}
            {navItems
                .filter((item) => {
                    if (item.label === "로그인" && user) {
                        return false;
                    }
                    return true;
                })
                .map((item) => {
                    const isHovered = hoveredNav === item.label;
                    const hasSubMenus =
                        item.subMenus && item.subMenus.length > 0;

                    let isMainNavActive = false;
                    if (hasSubMenus && item.subMenus) {
                        isMainNavActive = item.subMenus.some((subMenu) => {
                            const subMenuActive = subMenu.href
                                ? isPathActive(subMenu.href)
                                : false;
                            const hasChildActive =
                                subMenu.children?.some(
                                    (child) =>
                                        child.href && isPathActive(child.href),
                                ) ?? false;
                            return subMenuActive || hasChildActive;
                        });
                    } else if (item.href) {
                        const shouldExactMatchForMainNav =
                            item.href === "/about";
                        isMainNavActive = isPathActive(
                            item.href,
                            shouldExactMatchForMainNav,
                        );
                    }

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
                                if (!gnbRef.current) {
                                    setHoveredNav(null);
                                }
                            }}
                            onClick={handleNavClick}
                        >
                            {item.label}
                            {hasSubMenus && (
                                <div
                                    className={`bg-kua-blue300 absolute top-[82px] left-1/2 z-40 min-h-1 min-w-1 -translate-x-1/2 scale-150 rounded-full transition-opacity duration-200 ${
                                        isHovered ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            {user && (
                <div ref={userMenuRef} className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="text-kua-gray800 hover:text-kua-blue300 flex items-center gap-2 transition-colors"
                    >
                        <span className="text-[15px] font-semibold">
                            {user.name}
                        </span>
                        <FaChevronDown
                            className={`text-xs transition-transform ${
                                isUserMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    {isUserMenuOpen && (
                        <div className="border-kua-gray200 absolute top-full right-0 z-[60] mt-2 min-w-[120px] rounded-lg border bg-white shadow-lg">
                            <button
                                onClick={onLogout}
                                className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                            >
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
