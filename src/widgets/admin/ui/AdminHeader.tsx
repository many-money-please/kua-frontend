"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export const AdminHeader = () => {
    const router = useRouter();

    const handleLogout = () => {
        // TODO: 로그아웃 로직 구현
        router.push("/auth/login");
    };

    return (
        <header className="bg-kua-gray800 text-kua-white flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-2 sm:gap-[14px]">
                <Link
                    href="/"
                    className="flex items-center gap-2 sm:gap-[14px]"
                >
                    <Image
                        src="/imgs/logos/Icon-Footer.svg"
                        alt="Korea Underwater Association logo"
                        width={32}
                        height={32}
                        className="sm:h-[44px] sm:w-[44px]"
                        priority
                    />
                    <Image
                        src="/imgs/logos/Icon-Footer-Text.svg"
                        alt="Korea Underwater Association text mark"
                        width={140}
                        height={30}
                        className="sm:h-[40px] sm:w-[182px]"
                        priority
                    />
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm">관리자 님 환영합니다</span>
                <button
                    onClick={handleLogout}
                    className="text-kua-white hover:text-kua-gray300 flex items-center gap-2 rounded-lg px-4 py-2 transition-colors"
                >
                    <FiLogOut size={18} />
                    <span className="text-sm">로그아웃</span>
                </button>
            </div>
        </header>
    );
};
