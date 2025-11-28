"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PostEditor } from "@/shared/ui/PostEditor";
import { FiArrowLeft } from "react-icons/fi";

export default function PopupCreatePage() {
    const router = useRouter();
    const [exposureStatus, setExposureStatus] = useState<"exposed" | "hidden">(
        "exposed",
    );
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [section, setSection] = useState<"A" | "B" | "C">("A");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("이미지 용량은 5MB 이하로 제한됩니다.");
                return;
            }
            if (!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
                alert("파일 형식은 PNG, JPG만 가능합니다.");
                return;
            }
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        // 유효성 검사
        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }
        if (!selectedImage) {
            alert("대표 이미지를 선택해주세요.");
            return;
        }
        if (!startDate || !endDate) {
            alert("노출 시작일과 종료일을 선택해주세요.");
            return;
        }

        // 날짜와 시간을 합쳐서 ISO 8601 형식으로 변환
        const startDateTime = startDate && startTime 
            ? new Date(`${startDate}T${startTime}`).toISOString()
            : new Date(`${startDate}T00:00:00`).toISOString();
        const endDateTime = endDate && endTime
            ? new Date(`${endDate}T${endTime}`).toISOString()
            : new Date(`${endDate}T23:59:59`).toISOString();

        // request 객체 생성
        const requestData = {
            title: title.trim(),
            content: content.trim(),
            linkUrl: linkUrl.trim() || "",
            startDate: startDateTime,
            endDate: endDateTime,
            sortOrder: section === "A" ? 1 : section === "B" ? 2 : 3,
        };

        // FormData 생성
        const formData = new FormData();
        const requestBlob = new Blob([JSON.stringify(requestData)], {
            type: "application/json",
        });
        formData.append("request", requestBlob);
        formData.append("image", selectedImage);

        try {
            const response = await fetch("/api/admin/main/popup", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || "팝업 생성에 실패했습니다.",
                );
            }

            alert("팝업이 등록되었습니다.");
            router.push("/admin/main/popup");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "팝업 생성에 실패했습니다.",
            );
            console.error("팝업 생성 실패:", error);
        }
    };

    const handlePreview = () => {
        // TODO: 미리보기 로직
        alert("미리보기 기능은 준비 중입니다.");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <nav className="text-kua-gray500 text-sm">
                    메인 관리 &gt; 팝업 관리 &gt; 팝업 상세
                </nav>
                <button
                    onClick={() => router.back()}
                    className="text-kua-gray500 hover:text-kua-gray800 flex items-center gap-2 text-sm"
                >
                    <FiArrowLeft />
                    이전 페이지로 돌아가기
                </button>
            </div>

            <div className="bg-white rounded-lg border border-kua-gray200 p-6 flex flex-col gap-6">
                {/* 노출 상태 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        노출 상태{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="exposureStatus"
                                value="exposed"
                                checked={exposureStatus === "exposed"}
                                onChange={(e) =>
                                    setExposureStatus(
                                        e.target.value as "exposed",
                                    )
                                }
                                className="accent-kua-orange500"
                            />
                            <span>노출</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="exposureStatus"
                                value="hidden"
                                checked={exposureStatus === "hidden"}
                                onChange={(e) =>
                                    setExposureStatus(
                                        e.target.value as "hidden",
                                    )
                                }
                                className="accent-kua-orange500"
                            />
                            <span>비노출</span>
                        </label>
                    </div>
                </div>

                {/* 대표 이미지 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        대표 이미지{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <div className="flex gap-4">
                        <div className="bg-kua-gray100 border border-kua-gray300 flex h-48 w-48 items-center justify-center rounded-lg">
                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    alt="미리보기"
                                    width={192}
                                    height={192}
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            ) : (
                                <div className="text-kua-gray400 text-center">
                                    <svg
                                        className="mx-auto mb-2 h-12 w-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="image-upload"
                                className="bg-kua-main text-kua-white hover:bg-kua-blue600 cursor-pointer rounded-lg px-4 py-2 text-center text-sm transition-colors"
                            >
                                파일 선택
                            </label>
                            <span className="text-kua-gray500 text-sm">
                                {selectedImage
                                    ? selectedImage.name
                                    : "선택된 파일 없음"}
                            </span>
                            <div className="text-kua-gray500 text-xs">
                                <p>* 파일형식: PNG, JPG</p>
                                <p>* 이미지 용량 제한: 5MB 이하</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 섹션 선택 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        섹션 선택{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="section"
                                value="A"
                                checked={section === "A"}
                                onChange={(e) =>
                                    setSection(e.target.value as "A")
                                }
                                className="accent-kua-orange500"
                            />
                            <span>A 왼쪽</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="section"
                                value="B"
                                checked={section === "B"}
                                onChange={(e) =>
                                    setSection(e.target.value as "B")
                                }
                                className="accent-kua-orange500"
                            />
                            <span>B 중앙</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="section"
                                value="C"
                                checked={section === "C"}
                                onChange={(e) =>
                                    setSection(e.target.value as "C")
                                }
                                className="accent-kua-orange500"
                            />
                            <span>C 오른쪽</span>
                        </label>
                    </div>
                </div>

                {/* 노출 시작일/종료일 */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-semibold">
                            노출 시작일{" "}
                            <span className="text-kua-orange500 text-sm">
                                (필수)
                            </span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border border-kua-gray300 rounded-lg px-4 py-2"
                            />
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="border border-kua-gray300 rounded-lg px-4 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-semibold">
                            노출 종료일{" "}
                            <span className="text-kua-orange500 text-sm">
                                (필수)
                            </span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border border-kua-gray300 rounded-lg px-4 py-2"
                            />
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="border border-kua-gray300 rounded-lg px-4 py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* 제목 */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">
                        제목{" "}
                        <span className="text-kua-orange500 text-sm">
                            (필수)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="이벤트 제목을 입력해주세요. (30자 이내)"
                        maxLength={30}
                        className="border border-kua-gray300 rounded-lg px-4 py-2"
                    />
                    <div className="text-kua-gray500 text-sm text-right">
                        {title.length}/30
                    </div>
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
                        placeholder="타이틀 내용을 입력해주세요."
                    />
                </div>

                {/* 연결 URL */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">연결 URL</label>
                    <input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="연결 URL"
                        className="border border-kua-gray300 rounded-lg px-4 py-2"
                    />
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-4 justify-end pt-4">
                    <button
                        onClick={handlePreview}
                        className="bg-kua-gray200 text-kua-gray800 hover:bg-kua-gray300 rounded-lg px-6 py-2 transition-colors"
                    >
                        미리보기
                    </button>
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

