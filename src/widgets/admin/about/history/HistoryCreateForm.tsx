"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PostEditor } from "@/shared/ui/PostEditor";
import { FiArrowLeft } from "react-icons/fi";

export const HistoryCreateForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const groupId = searchParams.get("group") || "2021-current";
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        // TODO: 폼 제출 로직
        console.log({ year, month, content, groupId });
        alert("등록되었습니다.");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <nav className="text-kua-gray500 text-sm">
                    협회 소개 관리 &gt; 연혁
                </nav>
                <button
                    onClick={() => router.back()}
                    className="text-kua-gray500 hover:text-kua-gray800 flex items-center gap-2 text-sm"
                >
                    <FiArrowLeft />
                    이전 페이지로 돌아가기
                </button>
            </div>

            <div className="border-kua-gray200 flex flex-col gap-6 rounded-lg border bg-white p-6">
                {/* 년도 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        년도{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="년도"
                        min="1900"
                        max="2100"
                        className="border-kua-gray300 rounded-lg border px-4 py-2"
                    />
                </div>

                {/* 월 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        월{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <input
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeholder="월"
                        min="1"
                        max="12"
                        className="border-kua-gray300 rounded-lg border px-4 py-2"
                    />
                </div>

                {/* 내용 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        내용{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <PostEditor
                        value={content}
                        onChange={setContent}
                        placeholder="연혁 내용을 입력해주세요."
                    />
                </div>

                {/* 액션 버튼 */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-kua-main text-kua-white hover:bg-kua-blue600 rounded-lg px-6 py-2 transition-colors"
                    >
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
};

