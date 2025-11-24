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

    return (
        <div className="bg-kua-sky50 flex min-w-screen justify-center p-16">
            <div className="flex w-full max-w-[1200px] flex-col gap-10">
                <div className="flex items-center justify-between">
                    <div className="text-[32px] font-bold">대회소식</div>

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
                <div className="grid w-full grid-cols-4 gap-6">
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
            </div>
        </div>
    );
};
