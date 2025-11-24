"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "input" | "result";

export const FindIdForm = () => {
    const router = useRouter();
    const [step, setStep] = useState<Step>("input");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [foundId, setFoundId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 연동
        console.log("아이디 찾기:", { name, email });
        // 임시로 결과 설정
        setFoundId("hong1234");
        setStep("result");
    };

    return (
        <div className="flex flex-col gap-10 px-5">
            {/* 입력 단계 */}
            {step === "input" && (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-8"
                >
                    <h3 className="text-kua-darkblue800 text-center text-2xl font-bold sm:text-[32px]">
                        아이디 찾기
                    </h3>

                    <div className="flex w-full max-w-[700px] flex-col items-center gap-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름을 입력해주세요."
                            required
                            className="border-kua-gray400 focus:border-kua-main h-15 w-full rounded-[10px] border px-6 py-4 text-base outline-none sm:h-18 sm:text-lg"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="가입시 기재했던 이메일을 입력해주세요."
                            required
                            className="border-kua-gray400 focus:border-kua-main h-15 w-full rounded-[10px] border px-6 py-4 text-base outline-none sm:h-18 sm:text-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-kua-main hover:bg-kua-blue500 h-[46px] w-[145px] cursor-pointer rounded-[10px] font-bold text-white transition-colors sm:text-lg"
                    >
                        확인
                    </button>
                </form>
            )}

            {/* 결과 단계 */}
            {step === "result" && (
                <div className="mx-auto flex w-full max-w-[700px] flex-col gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-kua-darkblue800 text-center text-2xl font-bold sm:text-[32px]">
                            아이디 찾기
                        </h3>
                        <p className="text-kua-gray800 text-xl font-medium">
                            아이디 찾기가 완료되었습니다.
                        </p>
                    </div>

                    <div className="border-kua-main flex w-full flex-col border-t-2">
                        <div className="border-kua-gray400 flex h-15 items-center border-b sm:h-[72px]">
                            <span className="text-kua-gray800 bg-kua-blue50 flex h-full w-25 shrink-0 items-center justify-center text-center text-base font-semibold sm:w-[200px] sm:text-lg">
                                이름
                            </span>
                            <span className="text-kua-gray800 flex-1 px-6 text-sm font-medium sm:text-base">
                                {name}
                            </span>
                        </div>
                        <div className="border-kua-gray400 flex h-15 items-center border-b sm:h-[72px]">
                            <span className="text-kua-gray800 bg-kua-blue50 flex h-full w-25 shrink-0 items-center justify-center text-center text-base font-semibold sm:w-[200px] sm:text-lg">
                                이메일
                            </span>
                            <span className="text-kua-gray800 flex-1 px-6 text-sm font-medium sm:text-base">
                                {email}
                            </span>
                        </div>
                        <div className="border-kua-gray400 flex h-15 items-center border-b sm:h-[72px]">
                            <span className="text-kua-gray800 bg-kua-blue50 flex h-full w-25 shrink-0 items-center justify-center text-center text-base font-semibold sm:w-[200px] sm:text-lg">
                                아이디
                            </span>
                            <span className="text-kua-gray800 flex-1 px-6 text-sm font-medium sm:text-base">
                                {foundId}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="bg-kua-main hover:bg-kua-blue500 h-[46px] w-[145px] cursor-pointer rounded-[10px] font-bold text-white transition-colors sm:text-lg"
                        >
                            로그인
                        </button>
                        <button
                            onClick={() => router.push("/auth/find-password")}
                            className="bg-kua-white hover:bg-kua-main border-kua-main text-kua-main h-[46px] w-[145px] cursor-pointer rounded-[10px] border font-bold transition-colors hover:text-white sm:text-lg"
                        >
                            비밀번호 찾기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
