"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

type ExecutivesEditProps = {
    id: string;
};

export const ExecutivesEdit = ({ id }: ExecutivesEditProps) => {
    const router = useRouter();
    const [committee, setCommittee] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 기존 데이터 로드 (실제로는 API 호출)
    useEffect(() => {
        // TODO: API에서 데이터 가져오기
        const fetchData = async () => {
            try {
                // 임시 데이터
                setCommittee("경기력향상위원회");
                setName("정상엽");
                setDescription(
                    "국가대표 선발 및 경기력 향상에 관한 검토 및 심의",
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async ({ images }: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("update", {
                id,
                committee,
                name,
                description,
                images,
            });
            alert("수정이 완료되었습니다.");
            router.push("/about/executives");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="py-20 text-center">로딩중...</div>;
    }

    return (
        <PostForm.Root
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="수정하기"
        >
            {/* 소속 위원회 */}
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="committee">
                    소속 위원회{" "}
                    <span className="text-kua-orange500 text-sm">(필수)</span>
                </label>
                <input
                    id="committee"
                    type="text"
                    value={committee}
                    onChange={(e) => setCommittee(e.target.value)}
                    placeholder="소속 위원회를 입력해주세요. (30자 이내)"
                    maxLength={30}
                    className="bg-kua-gray100 rounded-lg px-4 py-3"
                    required
                />
                <div className="text-kua-gray600 text-right text-sm">
                    {committee.length}/30
                </div>
            </div>

            {/* 이미지 */}
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">
                    이미지{" "}
                    <span className="text-kua-orange500 text-sm">(필수)</span>
                </label>
                <PostForm.ImageField />
            </div>

            {/* 이름 */}
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="name">
                    이름{" "}
                    <span className="text-kua-orange500 text-sm">(필수)</span>
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력해주세요. (20자 이내)"
                    maxLength={20}
                    className="bg-kua-gray100 rounded-lg px-4 py-3"
                    required
                />
                <div className="text-kua-gray600 text-right text-sm">
                    {name.length}/20
                </div>
            </div>

            {/* 설명 */}
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="description">
                    설명{" "}
                    <span className="text-kua-orange500 text-sm">(필수)</span>
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="설명을 입력해주세요. (50자 이내)"
                    maxLength={50}
                    rows={3}
                    className="bg-kua-gray100 resize-none rounded-lg px-4 py-3"
                    required
                />
                <div className="text-kua-gray600 text-right text-sm">
                    {description.length}/50
                </div>
            </div>

            <PostForm.Actions />
        </PostForm.Root>
    );
};
