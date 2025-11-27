"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFolder, FiFileText, FiUser } from "react-icons/fi";

type MenuItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
    {
        label: "메인 관리",
        href: "/admin/main",
        icon: <FiFolder size={20} />,
    },
    {
        label: "협회 소개 관리",
        href: "/admin/about",
        icon: <FiFileText size={20} />,
    },
    {
        label: "회원 관리",
        href: "/admin/members",
        icon: <FiUser size={20} />,
    },
];

export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="bg-kua-gray800 text-kua-white min-h-[calc(100vh-4rem)] w-75">
            <nav className="flex flex-col gap-1 p-4">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                                isActive
                                    ? "bg-kua-blue500 text-kua-white"
                                    : "text-kua-gray300 hover:bg-kua-gray700 hover:text-kua-white"
                            }`}
                        >
                            {item.icon}
                            <span className="text-sm font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};
