"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";

export const LoginForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("로그인:", { username, password });
        // TODO: API 연동
        alert("로그인 기능은 추후 구현됩니다.");
    };

    return (
        <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-5">
                <h2 className="text-kua-darkblue800 text-[40px] font-bold">
                    로그인
                </h2>
                <p className="text-kua-gray800 text-2xl font-medium">
                    대한수중핀수영협회의 방문을 환영합니다!
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-[700px] flex-col gap-6"
            >
                {/* 아이디 입력 */}
                <div className="relative">
                    <div className="absolute top-1/2 left-9 -translate-y-1/2">
                        <Image
                            src="/imgs/auth/user.svg"
                            alt="user"
                            width={20}
                            height={20}
                        />
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="아이디를 입력해 주세요."
                        className="border-kua-gray300 focus:border-kua-main h-20 w-full rounded-[5px] border bg-white px-18 text-[26px] outline-none"
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="relative">
                    <div className="absolute top-1/2 left-9 -translate-y-1/2">
                        <Image
                            src="/imgs/auth/password.svg"
                            alt="lock"
                            width={24}
                            height={24}
                        />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력해 주세요."
                        className="border-kua-gray300 focus:border-kua-main h-20 w-full rounded-[5px] border bg-white px-18 text-[26px] outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-9 -translate-y-1/2"
                    >
                        {showPassword ? (
                            <FiEyeOff className="text-kua-gray400 h-6 w-6" />
                        ) : (
                            <FiEye className="text-kua-gray400 h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* 로그인 버튼 */}
                <button
                    type="submit"
                    className="bg-kua-main hover:bg-kua-blue500 mt-4 h-[90px] w-full cursor-pointer rounded-[10px] text-[32px] text-white transition-colors"
                >
                    로그인
                </button>

                {/* 아이디찾기 / 비밀번호찾기 / 회원가입 */}
                <div className="text-kua-gray800 flex items-center justify-center gap-4 text-xl">
                    <button
                        type="button"
                        onClick={() =>
                            alert("아이디 찾기 기능은 추후 구현됩니다.")
                        }
                        className="hover:text-kua-gray800 text-kua-gray400 cursor-pointer transition-colors"
                    >
                        아이디찾기
                    </button>
                    <span className="text-kua-gray400">|</span>
                    <button
                        type="button"
                        onClick={() =>
                            alert("비밀번호 찾기 기능은 추후 구현됩니다.")
                        }
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
