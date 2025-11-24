"use client";

import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa6";

type ScheduleInfo = {
    label: string;
    value: string;
};

type Competition = {
    id: number;
    status: string;
    title: string;
    info: ScheduleInfo[];
};

const scheduleData: Competition[] = [
    {
        id: 1,
        status: "신청기간 D-21",
        title: "2026년 프리다이빙 국가대표 1차 선발전 및 제8회 전국프리다이빙선수권대회(실내)",
        info: [
            { label: "일정", value: "2025.09.29 ~ 2025.10.10" },
            { label: "장소", value: "제주종합경기장 내 실내수영장" },
        ],
    },
    {
        id: 2,
        status: "신청기간 D-12",
        title: "2025 KUA 오픈워터 챔피언십",
        info: [
            { label: "일정", value: "2025.07.03 ~ 2025.07.06" },
            { label: "장소", value: "부산 송도 해변" },
        ],
    },
    {
        id: 3,
        status: "참가모집중",
        title: "제12회 전국 핀수영 종별 선수권대회",
        info: [
            { label: "일정", value: "2025.05.12 ~ 2025.05.14" },
            { label: "장소", value: "잠실 학생체육관 수영장" },
        ],
    },
    {
        id: 4,
        status: "신청기간 D-30",
        title: "핵심 지도자 워크숍 & 기술 세미나",
        info: [
            { label: "일정", value: "2025.11.02 ~ 2025.11.04" },
            { label: "장소", value: "강릉 아쿠아센터" },
        ],
    },
    {
        id: 5,
        status: "모집예정",
        title: "KUA 주니어 선수 육성 캠프",
        info: [
            { label: "일정", value: "2025.08.15 ~ 2025.08.20" },
            { label: "장소", value: "여수 해양훈련원" },
        ],
    },
    {
        id: 6,
        status: "모집중",
        title: "국가대표 강화 훈련",
        info: [
            { label: "일정", value: "2025.03.01 ~ 2025.03.20" },
            { label: "장소", value: "충주 탄금호 국제조정경기장" },
        ],
    },
    {
        id: 7,
        status: "신청마감 D-3",
        title: "제5회 생활체육 핀수영 페스티벌",
        info: [
            { label: "일정", value: "2025.04.10 ~ 2025.04.12" },
            { label: "장소", value: "인천 연수구 청학수영장" },
        ],
    },
    {
        id: 8,
        status: "신청마감 D-1",
        title: "CMAS 국제 심판 자격 교육 과정",
        info: [
            { label: "일정", value: "2025.06.01 ~ 2025.06.05" },
            { label: "장소", value: "서울 올림픽수영장" },
        ],
    },
    {
        id: 9,
        status: "모집완료",
        title: "KUA 아카데미 : 수중 촬영 전문 과정",
        info: [
            { label: "일정", value: "2025.02.18 ~ 2025.02.22" },
            { label: "장소", value: "속초 청호해변" },
        ],
    },
    {
        id: 10,
        status: "모집예정",
        title: "제4회 전국 대학생 프리다이빙 대회",
        info: [
            { label: "일정", value: "2025.10.01 ~ 2025.10.03" },
            { label: "장소", value: "광주 염주종합체육관" },
        ],
    },
];

const CARDS_PER_PAGE = 4;

export const CompetitionSchedule = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [logoHeight, setLogoHeight] = useState<number>(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const totalPages = Math.ceil(scheduleData.length / CARDS_PER_PAGE);

    // 섹션 높이의 2/3로 로고 높이 설정
    useEffect(() => {
        const updateLogoHeight = () => {
            if (sectionRef.current) {
                const sectionHeight = sectionRef.current.offsetHeight;
                setLogoHeight(sectionHeight * 0.8);
            }
        };

        updateLogoHeight();
        window.addEventListener("resize", updateLogoHeight);
        return () => window.removeEventListener("resize", updateLogoHeight);
    }, [pageIndex]);

    const visibleSchedules = useMemo(() => {
        const start = pageIndex * CARDS_PER_PAGE;
        const schedules = scheduleData.slice(start, start + CARDS_PER_PAGE);

        if (scheduleData.length > 2 && schedules.length <= 2) {
            const placeholders = Array(CARDS_PER_PAGE - schedules.length).fill(
                null,
            );

            return {
                schedules: [...schedules, ...placeholders],
                hasPlaceholder: true,
            };
        }
        return { schedules, hasPlaceholder: false };
    }, [pageIndex]);

    const handlePrev = () => {
        setPageIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setPageIndex((prev) => Math.min(prev + 1, totalPages - 1));
    };

    return (
        <div
            ref={sectionRef}
            className="bg-kua-sky50 relative flex w-full flex-col items-center justify-center rounded-tl-[200] p-16"
        >
            {/* 배경 로고 이미지 - 우측 중앙 배치, 높이 섹션의 2/3 */}
            {logoHeight > 0 && (
                <div
                    className="pointer-events-none absolute top-1/4 right-16 z-0 -translate-y-1/4"
                    style={{ height: `${logoHeight}px` }}
                >
                    <Image
                        src="/imgs/logos/Icon-Blue.svg"
                        alt="logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-full w-auto object-contain"
                        style={{ width: "auto", height: "100%" }}
                    />
                </div>
            )}
            <div className="relative z-10 flex w-[80%] max-w-[1200px] flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="text-[32px] font-bold">대회일정 안내</div>
                    <div className="flex h-12 items-center justify-end gap-4">
                        {totalPages > 1 && (
                            <div className="flex h-12 items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={pageIndex === 0}
                                    className={`bg-kua-white flex h-12 w-12 items-center justify-center rounded-full shadow transition-all ${
                                        pageIndex === 0
                                            ? "cursor-not-allowed opacity-50"
                                            : "hover:bg-kua-sky50 cursor-pointer"
                                    }`}
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={pageIndex >= totalPages - 1}
                                    className={`bg-kua-white flex h-12 w-12 items-center justify-center rounded-full shadow transition-all ${
                                        pageIndex >= totalPages - 1
                                            ? "cursor-not-allowed opacity-50"
                                            : "hover:bg-kua-sky50 cursor-pointer"
                                    }`}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-kua-gray800 text-kua-white hover:bg-kua-blue500 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow transition-all"
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <div
                    className={`grid w-full grid-cols-1 gap-6 md:grid-cols-2 ${
                        visibleSchedules.hasPlaceholder ? "md:grid-rows-2" : ""
                    }`}
                >
                    {visibleSchedules.schedules.map((competition, index) =>
                        !competition ? (
                            <div
                                key={`placeholder-${index}`}
                                className="h-full w-full"
                                aria-hidden="true"
                            />
                        ) : (
                            <div
                                key={competition.id}
                                className="bg-kua-white flex h-full w-full flex-col justify-between rounded-3xl p-10 shadow-sm"
                            >
                                <div className="mb-6 flex w-full flex-col gap-4">
                                    <div className="bg-kua-main text-kua-white w-fit rounded-full px-4 py-2 text-sm font-semibold">
                                        {competition.status}
                                    </div>
                                    <div className="line-clamp-2 h-16 text-2xl font-semibold wrap-break-word">
                                        {competition.title}
                                    </div>
                                </div>
                                <div className="border-kua-gray250 flex flex-col gap-1 border-t pt-6 text-base">
                                    {competition.info.map(
                                        (detail: ScheduleInfo) => (
                                            <div
                                                key={detail.label}
                                                className="text-kua-gray800"
                                            >
                                                {detail.label} : {detail.value}
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};
