"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const ChangePasswordForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "abc1234", // 임시로 하드코딩 (실제로는 세션에서 가져옴)
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.newPasswordConfirm) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        // TODO: API 연동
        console.log("비밀번호 변경:", formData);
        alert("비밀번호가 변경되었습니다.");
        router.push("/");
    };

    return (
        <div className="flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <h3 className="text-kua-darkblue800 text-center text-2xl font-bold sm:text-[32px]">
                    비밀번호 변경
                </h3>

                <div className="border-kua-main flex w-full flex-col border-t-2">
                    {/* 아이디 / 현재 비밀번호 */}
                    <div className="2xl:border-kua-gray300 flex h-[120px] w-full flex-col 2xl:h-[72px] 2xl:flex-row 2xl:border-b">
                        {/* 아이디 */}
                        <div className="border-kua-gray300 flex h-[60px] flex-1 items-center border-b 2xl:h-full 2xl:border-b-0">
                            <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[120px] shrink-0 items-center justify-center px-2 text-sm font-medium 2xl:w-[200px] 2xl:px-4 2xl:text-lg">
                                아이디
                            </label>
                            <div className="flex h-full min-w-0 flex-1 items-center p-2 2xl:p-4">
                                <span className="text-kua-gray800 text-base">
                                    {formData.username}
                                </span>
                            </div>
                        </div>

                        {/* 현재 비밀번호 */}
                        <div className="border-kua-gray300 flex h-[60px] flex-1 items-center border-b 2xl:h-full 2xl:border-b-0">
                            <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[120px] shrink-0 items-center justify-center px-2 text-sm font-medium 2xl:w-[200px] 2xl:px-4 2xl:text-lg">
                                현재 비밀번호
                            </label>
                            <div className="flex h-full min-w-0 flex-1 items-center p-2 2xl:p-4">
                                <input
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                    placeholder="영문,숫자 포함 6~12자"
                                    required
                                    className="border-kua-gray400 focus:border-kua-main h-full w-full min-w-0 rounded-[8px] border px-4 py-3 text-sm outline-none sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 새 비밀번호 / 새 비밀번호 확인 */}
                    <div className="border-kua-gray300 flex h-[120px] w-full flex-col border-b 2xl:h-[72px] 2xl:flex-row">
                        {/* 새 비밀번호 */}
                        <div className="border-kua-gray300 flex h-[60px] flex-1 items-center border-b 2xl:h-full 2xl:border-b-0">
                            <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[120px] shrink-0 items-center justify-center px-2 text-sm font-medium 2xl:w-[200px] 2xl:px-4 2xl:text-lg">
                                새 비밀번호
                            </label>
                            <div className="flex h-full min-w-0 flex-1 items-center p-2 2xl:p-4">
                                <input
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    placeholder="영문,숫자,특수문자 조합 8자 이상"
                                    required
                                    className="border-kua-gray400 focus:border-kua-main h-full w-full min-w-0 rounded-[8px] border px-4 py-3 text-sm outline-none sm:text-base"
                                />
                            </div>
                        </div>

                        {/* 새 비밀번호 확인 */}
                        <div className="border-kua-gray300 flex h-[60px] flex-1 items-center border-b 2xl:h-full 2xl:border-b-0">
                            <label className="bg-kua-blue50 text-kua-gray800 flex h-full w-[120px] shrink-0 items-center justify-center px-2 text-sm font-medium 2xl:w-[200px] 2xl:px-4 2xl:text-lg">
                                새 비밀번호 확인
                            </label>
                            <div className="flex h-full min-w-0 flex-1 items-center p-2 2xl:p-4">
                                <input
                                    type="password"
                                    value={formData.newPasswordConfirm}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            newPasswordConfirm: e.target.value,
                                        })
                                    }
                                    placeholder="영문,숫자,특수문자 조합 8자 이상"
                                    required
                                    className="border-kua-gray400 focus:border-kua-main h-full w-full min-w-0 rounded-[8px] border px-4 py-3 text-sm outline-none sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="bg-kua-main hover:bg-kua-blue500 w-[200px] cursor-pointer rounded-[10px] px-8 py-3 text-base font-bold text-white transition-colors sm:text-xl"
                    >
                        확인
                    </button>
                </div>
            </form>
        </div>
    );
};
