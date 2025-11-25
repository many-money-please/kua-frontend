"use client";

import { useRouter } from "next/navigation";

interface AuthTabsProps {
    activeTab: "login" | "register";
}

export const AuthTabs = ({ activeTab }: AuthTabsProps) => {
    const router = useRouter();

    return (
        <div className="flex gap-3 px-5 py-10 sm:py-20">
            <button
                onClick={() => router.push("/auth/login")}
                className={`flex-1 cursor-pointer rounded-[10px] border px-6 py-5 text-xl transition-colors ${
                    activeTab === "login"
                        ? "border-kua-main text-kua-main bg-white font-bold"
                        : "border-kua-gray200 bg-kua-gray100 text-kua-gray400 hover:bg-kua-white hover:text-kua-main hover:border-kua-main font-medium"
                }`}
            >
                로그인
            </button>
            <button
                onClick={() => router.push("/auth/register")}
                className={`flex-1 cursor-pointer rounded-[10px] border px-6 py-5 text-xl font-bold transition-colors ${
                    activeTab === "register"
                        ? "border-kua-main text-kua-main bg-white font-bold"
                        : "border-kua-gray200 bg-kua-gray100 text-kua-gray400 hover:bg-kua-white hover:text-kua-main hover:border-kua-main font-medium"
                }`}
            >
                회원가입
            </button>
        </div>
    );
};
