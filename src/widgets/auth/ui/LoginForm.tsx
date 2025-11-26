"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import { useUser } from "@/shared/lib/UserRoleContext";

export const LoginForm = () => {
    const router = useRouter();
    const { setUser, refreshUser } = useUser();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const loginId = formData.get("loginId") as string;
        const password = formData.get("password") as string;

        startTransition(async () => {
            try {
                // Route Handler를 통해 로그인 (브라우저가 Set-Cookie를 받을 수 있음)
                const loginResponse = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // 쿠키 포함
                    body: JSON.stringify({ loginId, password }),
                });

                const loginResult = await loginResponse.json();

                if (!loginResult.success) {
                    setError(loginResult.error || "로그인에 실패했습니다.");
                    return;
                }

                // 로그인 응답에 사용자 정보가 포함되어 있으면 바로 설정
                if (loginResult.success && loginResult.data?.user) {
                    const user = loginResult.data.user;
                    setUser(user);
                    router.push("/");
                    router.refresh();
                } else {
                    // 사용자 정보가 없으면 /api/auth/me로 다시 가져오기
                    await refreshUser();
                    router.push("/");
                    router.refresh();
                }
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "로그인에 실패했습니다.",
                );
            }
        });
    };

    return (
        <div className="flex flex-col items-center gap-10 px-5">
            <div className="flex flex-col items-center gap-2 sm:gap-5">
                <h2 className="text-kua-darkblue800 text-2xl font-bold sm:text-[32px]">
                    로그인
                </h2>
                <p className="text-kua-gray800 text-sm font-medium sm:text-xl">
                    대한수중핀수영협회의 방문을 환영합니다!
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-[700px] flex-col gap-2.5 sm:gap-6"
            >
                {error && (
                    <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                        {error}
                    </div>
                )}
                {/* 아이디 입력 */}
                <div className="relative">
                    <div className="absolute top-1/2 left-9 -translate-y-1/2 text-lg">
                        <Image
                            src="/imgs/auth/user.svg"
                            alt="user"
                            width={16}
                            height={16}
                        />
                    </div>
                    <input
                        type="text"
                        name="loginId"
                        placeholder="아이디를 입력해 주세요."
                        required
                        disabled={isPending}
                        className="border-kua-gray300 focus:border-kua-main w-full rounded-[5px] border bg-white px-18 py-4 text-xl outline-none placeholder:text-sm disabled:opacity-50 sm:placeholder:text-lg"
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="relative">
                    <div className="absolute top-1/2 left-9 -translate-y-1/2">
                        <Image
                            src="/imgs/auth/password.svg"
                            alt="lock"
                            width={20}
                            height={20}
                        />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="비밀번호를 입력해 주세요."
                        required
                        disabled={isPending}
                        className="border-kua-gray300 focus:border-kua-main w-full rounded-[5px] border bg-white px-18 py-4 text-xl outline-none placeholder:text-sm disabled:opacity-50 sm:placeholder:text-lg"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-9 -translate-y-1/2"
                        disabled={isPending}
                    >
                        {showPassword ? (
                            <FiEyeOff className="text-kua-gray400 h-5 w-5" />
                        ) : (
                            <FiEye className="text-kua-gray400 h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* 로그인 버튼 */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-kua-main hover:bg-kua-blue500 my-2.5 h-15 w-full cursor-pointer rounded-[10px] text-base text-white transition-colors sm:mt-4 sm:mb-0 sm:h-18 sm:text-2xl"
                >
                    {isPending ? "로그인 중..." : "로그인"}
                </button>

                {/* 아이디찾기 / 비밀번호찾기 / 회원가입 */}
                <div className="text-kua-gray800 flex items-center justify-center gap-4 text-xs sm:text-lg">
                    <button
                        type="button"
                        onClick={() => router.push("/auth/find-id")}
                        className="hover:text-kua-gray800 text-kua-gray400 cursor-pointer transition-colors"
                    >
                        아이디찾기
                    </button>
                    <span className="text-kua-gray400">|</span>
                    <button
                        type="button"
                        onClick={() => router.push("/auth/find-password")}
                        className="hover:text-kua-gray800 text-kua-gray400 cursor-pointer transition-colors"
                    >
                        비밀번호찾기
                    </button>
                    <span className="text-kua-gray400">|</span>
                    <button
                        type="button"
                        onClick={() => router.push("/auth/register")}
                        className="text-kua-gray800 cursor-pointer font-semibold transition-colors"
                    >
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
};
