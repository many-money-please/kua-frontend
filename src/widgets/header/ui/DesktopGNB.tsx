"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import type { NavItem } from "../config/navItems";

type DesktopGNBProps = {
    currentNav: NavItem;
    hoveredNav: string | null;
    setHoveredNav: (nav: string | null) => void;
    isPathActive: (href?: string, exactMatch?: boolean) => boolean;
    stripHash: (href?: string) => string | undefined;
};

export const DesktopGNB = ({
    currentNav,
    hoveredNav,
    setHoveredNav,
    isPathActive,
    stripHash,
}: DesktopGNBProps) => {
    const router = useRouter();
    const pathname = usePathname();

    if (!currentNav.subMenus || currentNav.subMenus.length === 0) {
        return null;
    }

    return (
        <div
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

                    <div className="border-kua-gray200 border-l" />

                    <div className="w-[70%]">
                        <div className="flex flex-wrap gap-12">
                            {currentNav.subMenus.map((subMenu) => {
                                const hasChildActive = subMenu.children?.some(
                                    (child) =>
                                        child.href && isPathActive(child.href),
                                );
                                const shouldExactMatch =
                                    subMenu.href === "/competition-info" ||
                                    subMenu.href === "/about" ||
                                    subMenu.href === "/community";
                                const isSubMenuActive =
                                    Boolean(hasChildActive) ||
                                    (subMenu.href &&
                                        isPathActive(
                                            subMenu.href,
                                            shouldExactMatch,
                                        ));
                                const subMenuBaseClasses =
                                    "flex w-[200px] items-center rounded-lg p-2 text-base font-medium transition-colors";
                                const subMenuStateClasses = isSubMenuActive
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
                                    const isChildActive = isPathActive(
                                        child.href,
                                    );
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
                                                        stripHash(child.href)
                                                }
                                                onClick={() =>
                                                    setHoveredNav(null)
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
                                                        stripHash(subMenu.href)
                                                }
                                                onClick={() =>
                                                    setHoveredNav(null)
                                                }
                                                className={`${subMenuBaseClasses} ${subMenuHoverClasses} ${subMenuStateClasses} ${
                                                    subMenu.showChevron !==
                                                    false
                                                        ? "justify-between"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <span>{subMenu.label}</span>
                                                {subMenu.showChevron !==
                                                    false && (
                                                    <FaChevronRight className="text-sm" />
                                                )}
                                            </Link>
                                        ) : fallbackHref ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    router.push(fallbackHref);
                                                    setHoveredNav(null);
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
    );
};
