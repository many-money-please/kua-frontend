"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useUserRole, useUser } from "@/shared/lib/UserRoleContext";
import { navItems } from "../config/navItems";
import { DesktopNav } from "./DesktopNav";
import { DesktopGNB } from "./DesktopGNB";
import { MobileMenu } from "./MobileMenu";

const stripHash = (href?: string) =>
    href ? (href.split("#")[0] ?? href) : href;
export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { role, toggleRole } = useUserRole();
    const { user, logout } = useUser();
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileNav, setActiveMobileNav] = useState(navItems[0].label);
    const [expandedMobileSubMenus, setExpandedMobileSubMenus] = useState<
        Record<string, boolean>
    >({});
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const gnbRef = useRef<HTMLDivElement | null>(null);
    const navRef = useRef<HTMLElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const userMenuRef = useRef<HTMLDivElement | null>(null);
    const [currentHash, setCurrentHash] = useState<string>("");

    useEffect(() => {
        const updateHash = () => {
            setCurrentHash(window.location.hash ?? "");
        };

        // 초기 hash 설정
        updateHash();

        // hash 변경 감지
        window.addEventListener("hashchange", updateHash);

        // 같은 페이지 내에서 hash 변경을 감지하기 위한 polling
        const interval = setInterval(updateHash, 100);

        return () => {
            window.removeEventListener("hashchange", updateHash);
            clearInterval(interval);
        };
    }, [pathname]); // pathname이 변경될 때도 hash를 다시 확인

    const isPathActive = (href?: string, exactMatch = false) => {
        const baseHref = stripHash(href);
        if (!baseHref) return false;
        if (baseHref === "/") {
            return pathname === "/";
        }

        // 특정 경로들(/about, /competition-info, /community)은 항상 exactMatch가 필요
        const requiresExactMatch =
            baseHref === "/about" ||
            baseHref === "/competition-info" ||
            baseHref === "/community";

        const shouldExactMatch = exactMatch || requiresExactMatch;

        // exactMatch가 true이면 정확히 일치할 때만 활성화
        if (shouldExactMatch) {
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
            // 사용자 메뉴 외부 클릭 시 닫기
            if (userMenuRef.current && !userMenuRef.current.contains(target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setIsUserMenuOpen(false);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃에 실패했습니다.");
        }
    };

    // 모바일 메뉴 열릴 때 스크롤 방지
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const getDefaultMobileNavLabel = () => {
        const active =
            navItems.find((item) => {
                if (item.href && isPathActive(item.href)) {
                    return true;
                }
                return (
                    item.subMenus?.some((sub) => {
                        if (sub.href && isPathActive(sub.href)) {
                            return true;
                        }
                        return sub.children?.some((child) =>
                            child.href ? isPathActive(child.href) : false,
                        );
                    }) ?? false
                );
            }) ?? navItems[0];
        return active.label;
    };

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
                    onClick={() => {
                        if (!isMobileMenuOpen) {
                            setActiveMobileNav(getDefaultMobileNavLabel());
                            setExpandedMobileSubMenus({});
                        }
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                    className="text-kua-gray800 flex h-10 w-10 cursor-pointer items-center justify-center sm:hidden"
                    aria-label="메뉴"
                >
                    {isMobileMenuOpen ? (
                        <FaXmark className="text-2xl" />
                    ) : (
                        <FaBars className="text-2xl" />
                    )}
                </button>

                <nav ref={navRef} className="relative hidden h-full sm:flex">
                    <DesktopNav
                        navItems={navItems}
                        hoveredNav={hoveredNav}
                        setHoveredNav={setHoveredNav}
                        isPathActive={isPathActive}
                        user={user}
                        isUserMenuOpen={isUserMenuOpen}
                        setIsUserMenuOpen={setIsUserMenuOpen}
                        onLogout={handleLogout}
                        role={role}
                        toggleRole={toggleRole}
                        gnbRef={gnbRef}
                        userMenuRef={userMenuRef}
                    />
                </nav>
            </div>

            {currentNav &&
                currentNav.subMenus &&
                currentNav.subMenus.length > 0 && (
                    <div ref={gnbRef}>
                        <DesktopGNB
                            currentNav={currentNav}
                            hoveredNav={hoveredNav}
                            setHoveredNav={setHoveredNav}
                            isPathActive={isPathActive}
                            stripHash={stripHash}
                        />
                    </div>
                )}

            {isMobileMenuOpen && (
                <div ref={mobileMenuRef}>
                    <MobileMenu
                        navItems={navItems}
                        activeMobileNav={activeMobileNav}
                        setActiveMobileNav={setActiveMobileNav}
                        expandedMobileSubMenus={expandedMobileSubMenus}
                        setExpandedMobileSubMenus={setExpandedMobileSubMenus}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        user={user}
                        onLogout={handleLogout}
                        role={role}
                        toggleRole={toggleRole}
                    />
                </div>
            )}
        </header>
    );
};
