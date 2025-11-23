"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

export const NewRecordCreate = () => {
    const [competitionName, setCompetitionName] = useState("");
    const [eventType, setEventType] = useState("");
    const [record, setRecord] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [previousRecord, setPreviousRecord] = useState("");
    const [recordDate, setRecordDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async ({
        title,
        content,
        attachments,
        images,
    }: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("신기록 생성", {
                title,
                content,
                competitionName,
                eventType,
                record,
                playerName,
                affiliation,
                previousRecord,
                recordDate,
                attachments,
                images,
            });
            // TODO: API 호출하여 신기록 생성
            alert("임시로 콘솔에 데이터가 출력되었습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PostForm.Root onSubmit={handleSubmit} isSubmitting={isSubmitting}>
            <PostForm.TitleField placeholder="제목을 입력하세요 (예: 2025년 프리다이빙 신기록)" />

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">
                    대회명 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={competitionName}
                    onChange={(e) => setCompetitionName(e.target.value)}
                    placeholder="대회명을 입력하세요"
                    className="bg-kua-gray100 rounded-lg border border-transparent px-4 py-3"
                    required
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">
                    종목 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    placeholder="종목을 입력하세요 (예: 프리다이빙 - 정적 잠영)"
                    className="bg-kua-gray100 rounded-lg border border-transparent px-4 py-3"
                    required
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">
                    기록 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={record}
                    onChange={(e) => setRecord(e.target.value)}
                    placeholder="기록을 입력하세요 (예: 5분 32초)"
                    className="bg-kua-gray100 rounded-lg border border-transparent px-4 py-3"
                    required
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">
                    선수명 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="선수명을 입력하세요"
                    className="bg-kua-gray100 rounded-lg border border-transparent px-4 py-3"
                    required
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">
                    소속 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    placeholder="소속을 입력하세요 (예: 서울대학교)"
                    className="bg-kua-gray100 rounded-lg border border-transparent px-4 py-3"
                    required
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">이전 기록</label>
                <input
                    type="text"
                    value={previousRecord}
                    onChange={(e) => setPreviousRecord(e.target.value)}
                    placeholder="이전 기록을 입력하세요 (예: 5분 15초)"
                    className="bg-kua-gray100 rounded-lg border border-transparent px-4 py-3"
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">
                    기록 갱신일 <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    lang="ko-KR"
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    className="bg-kua-gray100 rounded-lg border border-transparent px-4 py-3"
                    required
                />
            </div>

            <PostForm.ContentField />
            <PostForm.AttachmentField />
            <PostForm.Actions />
        </PostForm.Root>
    );
};
