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
    const [mobileCardIndex, setMobileCardIndex] = useState(0);
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

    const handleMobilePrev = () => {
        setMobileCardIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleMobileNext = () => {
        setMobileCardIndex((prev) =>
            Math.min(prev + 1, scheduleData.length - 1),
        );
    };

    return (
        <div
            ref={sectionRef}
            className="bg-kua-sky50 relative flex w-full flex-col items-center justify-center rounded-tl-[100px] py-25 pl-5 sm:rounded-tl-[200px] sm:pr-5"
        >
            {/* 배경 로고 이미지 - 우측 중앙 배치, 높이 섹션의 2/3 (데스크탑만) */}
            {logoHeight > 0 && (
                <div
                    className="pointer-events-none absolute top-1/4 right-16 z-0 -translate-y-1/4 sm:block"
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
            <div className="relative z-10 flex w-full flex-col gap-6 sm:max-w-[1200px]">
                {/* 헤더 */}
                <div className="flex items-center justify-between pr-5 sm:pr-0">
                    <div className="text-2xl font-bold sm:text-[32px]">
                        대회일정 안내
                    </div>
                    <div className="flex h-10 items-center justify-end gap-2 sm:h-12 sm:gap-4">
                        {totalPages > 1 && (
                            <div className="hidden h-10 items-center justify-end gap-2 sm:flex sm:h-12 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={pageIndex === 0}
                                    className={`bg-kua-white flex h-10 w-10 items-center justify-center rounded-full shadow transition-all sm:h-12 sm:w-12 ${
                                        pageIndex === 0
                                            ? "cursor-not-allowed opacity-50"
                                            : "hover:bg-kua-sky50 cursor-pointer"
                                    }`}
                                >
                                    <FaChevronLeft className="text-sm sm:text-base" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={pageIndex >= totalPages - 1}
                                    className={`bg-kua-white flex h-10 w-10 items-center justify-center rounded-full shadow transition-all sm:h-12 sm:w-12 ${
                                        pageIndex >= totalPages - 1
                                            ? "cursor-not-allowed opacity-50"
                                            : "hover:bg-kua-sky50 cursor-pointer"
                                    }`}
                                >
                                    <FaChevronRight className="text-sm sm:text-base" />
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-kua-gray800 text-kua-white hover:bg-kua-blue500 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow transition-all sm:h-12 sm:w-12"
                        >
                            <FaPlus className="text-sm sm:text-base" />
                        </button>
                    </div>
                </div>

                {/* 데스크탑: Grid 레이아웃 */}
                <div
                    className={`hidden w-full grid-cols-1 gap-6 sm:grid md:grid-cols-2 ${
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

                {/* 모바일: 캐러셀 레이아웃 */}
                <div className="relative block sm:hidden">
                    {/* 왼쪽 버튼 */}
                    <button
                        type="button"
                        onClick={handleMobilePrev}
                        disabled={mobileCardIndex === 0}
                        className={`border-kua-gray250 absolute top-1/2 left-[-18px] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg transition-all ${
                            mobileCardIndex === 0
                                ? "cursor-not-allowed opacity-30"
                                : "hover:bg-kua-sky50 cursor-pointer opacity-80 hover:opacity-100"
                        }`}
                    >
                        <FaChevronLeft className="text-sm" />
                    </button>

                    {/* 오른쪽 버튼 */}
                    <button
                        type="button"
                        onClick={handleMobileNext}
                        disabled={mobileCardIndex >= scheduleData.length - 1}
                        className={`border-kua-gray250 absolute top-1/2 right-18 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg transition-all ${
                            mobileCardIndex >= scheduleData.length - 1
                                ? "cursor-not-allowed opacity-30"
                                : "hover:bg-kua-sky50 cursor-pointer opacity-80 hover:opacity-100"
                        }`}
                    >
                        <FaChevronRight className="text-sm" />
                    </button>

                    <div className="relative flex h-[320px] items-center overflow-hidden">
                        {scheduleData.map((competition, index) => {
                            const isActive = index === mobileCardIndex;
                            const isNext = index === mobileCardIndex + 1;

                            if (!isActive && !isNext) return null;

                            return (
                                <div
                                    key={competition.id}
                                    className={`absolute w-[calc(100%-6rem)] transition-all duration-500 ${
                                        isActive
                                            ? "z-20 scale-100 opacity-100"
                                            : "z-10 translate-x-full scale-90 opacity-60"
                                    }`}
                                    style={{
                                        height: isActive ? "100%" : "90%",
                                    }}
                                >
                                    <div className="bg-kua-white flex h-full w-full flex-col justify-between rounded-3xl p-6 shadow-lg">
                                        <div className="mb-4 flex w-full flex-col gap-3">
                                            <div className="bg-kua-main text-kua-white w-fit rounded-full px-3 py-1.5 text-xs font-semibold">
                                                {competition.status}
                                            </div>
                                            <div className="line-clamp-3 text-lg font-semibold wrap-break-word">
                                                {competition.title}
                                            </div>
                                        </div>
                                        <div className="border-kua-gray250 flex flex-col gap-1 border-t pt-4 text-sm">
                                            {competition.info.map(
                                                (detail: ScheduleInfo) => (
                                                    <div
                                                        key={detail.label}
                                                        className="text-kua-gray800"
                                                    >
                                                        {detail.label} :{" "}
                                                        {detail.value}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
