"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa6";
import { ImageFallback } from "@/shared/ui/ImageFallback";

const data = [
    {
        src: "/imgs/main/hero_1.png",
        title: "제1회 전국 대학생 프리다이빙 대회",
        date: "2025-01-01",
    },
    {
        src: "/images/competition-news-2.png",
        title: "제2회 전국 대학생 프리다이빙 대회",
        date: "2025-01-01",
    },
    {
        src: "/images/competition-news-3.png",
        title: "제3회 전국 대학생 프리다이빙 대회",
        date: "2025-01-01",
    },
    {
        src: "/images/competition-news-4.png",
        title: "제4회 전국 대학생 프리다이빙 대회",
        date: "2025-01-01",
    },
    {
        src: "/images/competition-news-3.png",
        title: "제3회 전국 대학생 프리다이빙 대회",
        date: "2025-01-01",
    },
    {
        src: "/images/competition-news-4.png",
        title: "제4회 전국 대학생 프리다이빙 대회",
        date: "2025-01-01",
    },
];

const CARDS_PER_PAGE = 4;

export const CompetitionNews = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [mobileCardIndex, setMobileCardIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const totalPages = Math.ceil(data.length / CARDS_PER_PAGE);

    const visibleData = useMemo(() => {
        const start = pageIndex * CARDS_PER_PAGE;
        const visibleDatas = data.slice(start, start + CARDS_PER_PAGE);

        return { visibleDatas };
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
        setMobileCardIndex((prev) => Math.min(prev + 1, data.length - 1));
    };

    return (
        <div className="bg-kua-sky50 flex min-w-screen justify-center px-5 py-16 sm:py-25">
            <div className="flex w-full max-w-[1200px] flex-col gap-6 sm:gap-10">
                {/* 헤더 */}
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold sm:text-[32px]">
                        대회소식
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
                <div className="hidden w-full grid-cols-4 gap-6 sm:grid">
                    {visibleData.visibleDatas.map((item, i) => {
                        const globalIndex = pageIndex * CARDS_PER_PAGE + i;
                        const hasError = imageErrors.has(globalIndex);

                        return (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="relative flex aspect-video w-full overflow-hidden rounded-2xl">
                                    {hasError ? (
                                        <ImageFallback />
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            onError={() => {
                                                setImageErrors((prev) =>
                                                    new Set(prev).add(
                                                        globalIndex,
                                                    ),
                                                );
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="text-kua-darkblue800 text-xl font-bold">
                                    {item.title}
                                </div>
                                <div className="text-kua-gray400 text-base">
                                    {item.date}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 모바일: 캐러셀 레이아웃 */}
                <div className="relative block sm:hidden">
                    {/* 왼쪽 버튼 */}
                    <button
                        type="button"
                        onClick={handleMobilePrev}
                        disabled={mobileCardIndex === 0}
                        className={`border-kua-gray250 absolute top-3/7 left-[-18px] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg transition-all ${
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
                        disabled={mobileCardIndex >= data.length - 1}
                        className={`border-kua-gray250 absolute top-3/7 right-18 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg transition-all ${
                            mobileCardIndex >= data.length - 1
                                ? "cursor-not-allowed opacity-30"
                                : "hover:bg-kua-sky50 cursor-pointer opacity-80 hover:opacity-100"
                        }`}
                    >
                        <FaChevronRight className="text-sm" />
                    </button>

                    <div className="relative flex h-[304px] items-center overflow-visible">
                        {data.map((item, index) => {
                            const isActive = index === mobileCardIndex;
                            const isNext = index === mobileCardIndex + 1;

                            if (!isActive && !isNext) return null;

                            const globalIndex = index;
                            const hasError = imageErrors.has(globalIndex);

                            return (
                                <div
                                    key={index}
                                    className={`absolute w-[calc(100%-6rem)] transition-all duration-500 ${
                                        isActive
                                            ? "z-20 scale-100 opacity-100"
                                            : "left-8 z-10 translate-x-full opacity-60"
                                    }`}
                                >
                                    <div className="flex h-full flex-col gap-3">
                                        <div className="relative flex aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                                            {hasError ? (
                                                <ImageFallback />
                                            ) : (
                                                <Image
                                                    src={item.src}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    onError={() => {
                                                        setImageErrors((prev) =>
                                                            new Set(prev).add(
                                                                globalIndex,
                                                            ),
                                                        );
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="text-kua-darkblue800 text-base font-bold">
                                            {item.title}
                                        </div>
                                        <div className="text-kua-gray400 text-xs">
                                            {item.date}
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
