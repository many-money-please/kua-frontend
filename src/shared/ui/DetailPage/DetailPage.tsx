"use client";

import { useRouter } from "next/navigation";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";
import { useUserRole } from "@/shared/lib/UserRoleContext";

export type DetailPageData = {
    id: number;
    title: string;
    registrationDate: string;
    views: number;
    isSecret?: boolean;
    content: string;
    images?: string[];
    attachments?: { name: string; url: string }[];
};

export type NavigationPost = {
    id: number;
    title: string;
    date: string;
};

type DetailPageProps = {
    pageTitle: string;
    data: DetailPageData;
    navigation: {
        prev: NavigationPost | null;
        next: NavigationPost | null;
    };
    listUrl: string;
    detailUrlPattern: (id: number) => string;
    isContactInquiry?: boolean;
    isSecret?: boolean;
};

export const DetailPage = ({
    pageTitle,
    data,
    navigation,
    listUrl,
    detailUrlPattern,
    isContactInquiry,
    isSecret,
}: DetailPageProps) => {
    const router = useRouter();
    const { isAdmin } = useUserRole();
    const [replyContent, setReplyContent] = useState("");
    const [submittedReply, setSubmittedReply] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");

    const handleListClick = () => {
        router.push(listUrl);
    };

    const handleReplySubmit = () => {
        if (!replyContent.trim()) {
            alert("답변 내용을 입력해주세요.");
            return;
        }
        setSubmittedReply(replyContent);
        setReplyContent("");
    };

    const handleEditClick = () => {
        setEditContent(submittedReply || "");
        setIsEditing(true);
    };

    const handleEditSubmit = () => {
        if (!editContent.trim()) {
            alert("답변 내용을 입력해주세요.");
            return;
        }
        setSubmittedReply(editContent);
        setIsEditing(false);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setEditContent("");
    };

    const handleDeleteClick = () => {
        if (confirm("답변을 삭제하시겠습니까?")) {
            setSubmittedReply(null);
            setIsEditing(false);
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 py-16">
            <div className="flex items-center gap-3">
                {isContactInquiry && isSecret && (
                    <Image
                        src="/imgs/community/lock-small.svg"
                        alt="비밀글"
                        width={20}
                        height={21.45}
                    />
                )}
                <h1 className="text-[32px] font-bold">{pageTitle}</h1>
            </div>
            <div className="border-t-kua-main border-b-kua-gray300 flex flex-col gap-4 border-t-2 border-b py-4">
                <h2 className="text-2xl font-semibold">{data.title}</h2>
                <div className="flex items-center gap-4 text-lg">
                    <div>등록일: {data.registrationDate}</div>
                    <div>조회수 {data.views.toLocaleString()}</div>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div
                    className="[&_a]:text-kua-blue300 min-h-[200px] text-xl [&_a]:underline [&_br]:mb-2 [&_div]:mb-4 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />

                {/* 이미지 그리드 (포토갤러리용) */}
                {data.images && data.images.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-[390/312] w-full overflow-hidden rounded-lg"
                            >
                                <Image
                                    src={image}
                                    alt={`갤러리 이미지 ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* 첨부파일 */}
                {data.attachments && data.attachments.length > 0 && (
                    <div className="bg-kua-sky100 text-kua-main flex w-full flex-col gap-2 px-10 py-6 text-xs">
                        <div className="mb-1 font-semibold">첨부파일</div>
                        {data.attachments.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <span>📎</span>
                                <a
                                    href={file.url}
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {file.name}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isContactInquiry && (
                <div className="border-kua-gray300 flex flex-col gap-6 border-t pt-6">
                    {/* 답변이 등록된 경우 */}
                    {submittedReply && !isEditing && (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <p className="text-kua-black100 text-[17px] font-bold">
                                    문의답변
                                </p>
                            </div>
                            <div className="bg-kua-sky100 text-kua-darkblue800 rounded-[10px] px-3 py-4 text-[15px]">
                                <p className="whitespace-pre-wrap">
                                    {submittedReply}
                                </p>
                            </div>
                            {isAdmin && (
                                <div className="flex items-start gap-2">
                                    <button
                                        onClick={handleEditClick}
                                        className="hover:bg-kua-main bg-kua-white border-kua-main text-kua-black100 cursor-pointer rounded-[5px] border px-4 py-1.5 text-sm font-medium transition-colors hover:text-white"
                                    >
                                        수정하기
                                    </button>
                                    <button
                                        onClick={handleDeleteClick}
                                        className="border-kua-orange500 hover:bg-kua-orange500 cursor-pointer rounded-[5px] border bg-white px-4 py-1.5 text-sm font-medium transition-colors hover:text-white"
                                    >
                                        삭제하기
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 답변 수정 중인 경우 (관리자만 가능) */}
                    {isEditing && isAdmin && (
                        <div className="flex flex-col gap-3">
                            <p className="text-kua-black100 text-[17px] font-bold">
                                답변 수정하기
                            </p>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="답변 내용을 입력하세요."
                                className="border-kua-gray300 focus:border-kua-main h-[100px] w-full resize-none rounded-[5px] border px-4 py-3 text-base outline-none"
                            />
                            <div className="flex justify-start gap-2">
                                <button
                                    onClick={handleEditCancel}
                                    className="border-kua-orange500 hover:bg-kua-orange500 cursor-pointer rounded-[5px] border bg-white px-6 py-2 text-base font-medium transition-colors hover:text-white"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleEditSubmit}
                                    className="hover:bg-kua-main bg-kua-white border-kua-main text-kua-black100 cursor-pointer rounded-[5px] border px-6 py-2 text-base font-medium transition-colors hover:text-white"
                                >
                                    수정 완료
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 답변 작성 폼 (답변이 없고 수정 중이 아닐 때만 표시, 관리자만 가능) */}
                    {!submittedReply && !isEditing && isAdmin && (
                        <div className="flex flex-col gap-3">
                            <p className="text-kua-black100 text-[17px] font-bold">
                                답변하기
                            </p>
                            <textarea
                                value={replyContent}
                                onChange={(e) =>
                                    setReplyContent(e.target.value)
                                }
                                placeholder="답변 내용을 입력하세요."
                                className="border-kua-gray300 focus:border-kua-main h-[100px] w-full resize-none rounded-[5px] border px-4 py-3 text-base outline-none"
                            />
                            <div className="flex justify-start">
                                <button
                                    onClick={handleReplySubmit}
                                    className="hover:bg-kua-main bg-kua-white border-kua-main text-kua-black100 cursor-pointer rounded-[5px] border px-6 py-2 text-base font-medium transition-colors hover:text-white"
                                >
                                    답변 등록
                                </button>
                            </div>
                        </div>
                    )}
                    {/* 일반 사용자에게는 답변 대기 메시지 표시 */}
                    {!submittedReply && !isEditing && !isAdmin && (
                        <div className="bg-kua-gray100 text-kua-gray600 rounded-[10px] px-4 py-6 text-center text-base">
                            답변 대기 중입니다.
                        </div>
                    )}
                </div>
            )}

            {/* 이전글/다음글 */}
            <div className="flex flex-col">
                {navigation.prev && (
                    <div
                        className="border-kua-gray250 hover:bg-kua-sky50 flex w-full cursor-pointer items-center justify-between border-t border-b px-2 py-4 transition-colors"
                        onClick={() =>
                            router.push(detailUrlPattern(navigation.prev!.id))
                        }
                    >
                        <div className="flex items-center gap-8">
                            <FaChevronUp className="text-kua-gray800" />
                            <div className="text-lg font-bold">이전글</div>
                            <div className="text-kua-gray800 text-xl">
                                {navigation.prev.title}
                            </div>
                        </div>
                        <div className="text-kua-gray800 text-lg">
                            {navigation.prev.date}
                        </div>
                    </div>
                )}
                {navigation.next && (
                    <div
                        className={`border-kua-gray250 hover:bg-kua-sky50 flex w-full cursor-pointer items-center justify-between px-2 ${navigation.prev ? "border-b" : "border-t border-b"} py-4 transition-colors`}
                        onClick={() =>
                            router.push(detailUrlPattern(navigation.next!.id))
                        }
                    >
                        <div className="flex items-center gap-8">
                            <FaChevronDown className="text-kua-gray800" />
                            <div className="text-lg font-bold">다음글</div>
                            <div className="text-kua-gray800 text-xl">
                                {navigation.next.title}
                            </div>
                        </div>
                        <div className="text-kua-gray800 text-lg">
                            {navigation.next.date}
                        </div>
                    </div>
                )}
            </div>

            {/* 목록 버튼 */}
            <div className="flex w-full items-center justify-center py-8">
                <button
                    onClick={handleListClick}
                    className="border-kua-main hover:bg-kua-main mx-auto w-32 cursor-pointer rounded-sm border py-2 text-center transition-colors hover:text-white"
                >
                    목록
                </button>
            </div>
        </div>
    );
};
