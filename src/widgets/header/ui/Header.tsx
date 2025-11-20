import Image from "next/image";
import Link from "next/link";

const navItems = [
    { label: "협회소개", href: "/about" },
    { label: "핀수영 소개", href: "/fin-swimming" },
    { label: "대회정보", href: "/competition-info" },
    { label: "커뮤니티", href: "/community" },
    { label: "교육사업", href: "/education-business" },
    { label: "로그인", href: "/login" },
];

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <div className="mx-auto flex h-[84px] w-full max-w-[1200px] items-center justify-between px-[32px]">
                <div className="flex items-center gap-[14px]">
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
                </div>

                <nav className="text-kua-gray800 flex items-center gap-[42px] text-[15px] font-semibold">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="transition-colors hover:text-[#1F2933]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};
