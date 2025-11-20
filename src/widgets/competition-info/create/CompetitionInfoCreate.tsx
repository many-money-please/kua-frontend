"use client";

import { useState } from "react";
import { PostForm, type PostFormValues } from "@/shared/ui/PostForm";

const CATEGORY_OPTIONS = ["국내", "국제"] as const;

export const CompetitionInfoCreate = () => {
    const [category, setCategory] =
        useState<(typeof CATEGORY_OPTIONS)[number]>("국내");
    const [eventType, setEventType] = useState("");
    const [location, setLocation] = useState("");
    const [competitionStart, setCompetitionStart] = useState("");
    const [competitionEnd, setCompetitionEnd] = useState("");
    const [applicationStart, setApplicationStart] = useState("");
    const [applicationEnd, setApplicationEnd] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isInvalidRange = (start: string, end: string) => {
        if (!start || !end) {
            return false;
        }
        return new Date(start) > new Date(end);
    };

    const competitionRangeInvalid = isInvalidRange(
        competitionStart,
        competitionEnd,
    );
    const applicationRangeInvalid = isInvalidRange(
        applicationStart,
        applicationEnd,
    );
    const dateInputClass = (invalid: boolean) =>
        `bg-kua-gray100 rounded-lg px-4 py-3 border ${
            invalid ? "border-red-500" : "border-transparent"
        }`;

    const handleSubmit = async ({
        title,
        content,
        attachments,
        images,
    }: PostFormValues) => {
        try {
            setIsSubmitting(true);
            console.log("submit", {
                title,
                content,
                category,
                eventType,
                location,
                competitionPeriod: {
                    start: competitionStart,
                    end: competitionEnd,
                },
                applicationPeriod: {
                    start: applicationStart,
                    end: applicationEnd,
                },
                attachments,
                images,
            });
            alert("임시로 콘솔에 데이터가 출력되었습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PostForm.Root onSubmit={handleSubmit} isSubmitting={isSubmitting}>
            <PostForm.TitleField />

            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="category">
                    분류
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target
                                .value as (typeof CATEGORY_OPTIONS)[number],
                        )
                    }
                    className="bg-kua-gray100 rounded-lg px-4 py-3"
                >
                    {CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label
                        className="text-lg font-semibold"
                        htmlFor="eventType"
                    >
                        종목
                    </label>
                    <input
                        id="eventType"
                        type="text"
                        value={eventType}
                        onChange={(event) => setEventType(event.target.value)}
                        placeholder="예: 핀수영, 수중호키"
                        className="bg-kua-gray100 rounded-lg px-4 py-3"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold" htmlFor="location">
                        장소
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="예: 경기도 시흥시 거북섬 앞 수면(시화호)"
                        className="bg-kua-gray100 rounded-lg px-4 py-3"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">대회 기간</label>
                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="date"
                        lang="ko-KR"
                        value={competitionStart}
                        onChange={(event) =>
                            setCompetitionStart(event.target.value)
                        }
                        className={dateInputClass(competitionRangeInvalid)}
                    />
                    <span className="text-kua-gray500">~</span>
                    <input
                        type="date"
                        lang="ko-KR"
                        value={competitionEnd}
                        onChange={(event) =>
                            setCompetitionEnd(event.target.value)
                        }
                        className={dateInputClass(competitionRangeInvalid)}
                    />
                </div>
                {competitionRangeInvalid && (
                    <p className="text-sm text-red-500">
                        대회 종료일은 시작일보다 빠를 수 없습니다.
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">신청 기간</label>
                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="date"
                        lang="ko-KR"
                        value={applicationStart}
                        onChange={(event) =>
                            setApplicationStart(event.target.value)
                        }
                        className={dateInputClass(applicationRangeInvalid)}
                    />
                    <span className="text-kua-gray500">~</span>
                    <input
                        type="date"
                        lang="ko-KR"
                        value={applicationEnd}
                        onChange={(event) =>
                            setApplicationEnd(event.target.value)
                        }
                        className={dateInputClass(applicationRangeInvalid)}
                    />
                </div>
                {applicationRangeInvalid && (
                    <p className="text-sm text-red-500">
                        신청 종료일은 시작일보다 빠를 수 없습니다.
                    </p>
                )}
            </div>

            <PostForm.ContentField />
            <PostForm.AttachmentField />
            <PostForm.Actions />
        </PostForm.Root>
    );
};
