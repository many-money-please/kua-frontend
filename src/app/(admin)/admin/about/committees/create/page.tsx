"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostEditor } from "@/shared/ui/PostEditor";
import { FiArrowLeft } from "react-icons/fi";

export default function CommitteesCreatePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [chairman, setChairman] = useState("");
    const [secretary, setSecretary] = useState("");
    const [mainFunctions, setMainFunctions] = useState("");

    const handleSubmit = () => {
        // TODO: 폼 제출 로직
        console.log({ name, chairman, secretary, mainFunctions });
        alert("등록되었습니다.");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <nav className="text-kua-gray500 text-sm">
                    협회 소개 관리 &gt; 위원회 소개
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
                {/* 위원회명 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        위원회명{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="위원회명을 입력해주세요."
                        className="border-kua-gray300 rounded-lg border px-4 py-2"
                    />
                </div>

                {/* 위원장 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        위원장{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={chairman}
                        onChange={(e) => setChairman(e.target.value)}
                        placeholder="위원장 이름을 입력해주세요."
                        className="border-kua-gray300 rounded-lg border px-4 py-2"
                    />
                </div>

                {/* 간사 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        간사{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={secretary}
                        onChange={(e) => setSecretary(e.target.value)}
                        placeholder="간사 이름을 입력해주세요."
                        className="border-kua-gray300 rounded-lg border px-4 py-2"
                    />
                </div>

                {/* 주요기능 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        주요기능{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <PostEditor
                        value={mainFunctions}
                        onChange={setMainFunctions}
                        placeholder="주요기능을 입력해주세요."
                        editorProps={{
                            setOptions: {
                                minHeight: "200px",
                            },
                        }}
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
}
