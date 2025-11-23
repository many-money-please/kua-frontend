"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const slides = [
    {
        image: "/imgs/main/hero_1.png",
        title: (
            <>
                대한수중핀수영협회, <br />
                수중 <b>스포츠의 미래</b>를 이끌어갑니다.
            </>
        ),
        subtitle: "Korea Underwater Association",
    },
    {
        image: "/imgs/main/hero_2.jpg",
        title: <>두 번째 슬라이드 제목</>,
        subtitle: "Second slide",
    },
];

const AUTO_INTERVAL = 4000;
const MANUAL_PAUSE = 8000;

export const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);

    useEffect(() => {
        if (isManuallyPaused) {
            const timeoutId = setTimeout(
                () => setIsManuallyPaused(false),
                MANUAL_PAUSE,
            );
            return () => clearTimeout(timeoutId);
        }

        const intervalId = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, AUTO_INTERVAL);

        return () => clearInterval(intervalId);
    }, [isManuallyPaused]);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsManuallyPaused(true);
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsManuallyPaused(true);
    };

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        setIsManuallyPaused(true);
    };

    return (
        <div className="h-fit w-full px-8">
            <div
                id="hero-section"
                className="relative flex h-[min(800px,calc(100vw/2.25),100vh-80px)] max-h-[800px] min-h-[500px] w-full max-w-[1800px] items-center justify-center overflow-hidden rounded-[30px] px-12"
            >
                <Image
                    src={slides[currentSlide].image}
                    alt="hero-img"
                    fill={true}
                    className="object-cover"
                />
                <div className="text-kua-white relative flex min-h-[80%] min-w-4/5 flex-col items-start justify-end gap-4 pb-[14%] text-[1em] text-shadow-lg">
                    <div className="text-[2em]">
                        {slides[currentSlide].title}
                    </div>
                    <div>{slides[currentSlide].subtitle}</div>
                    <div className="bg-kua-gray800/20 flex items-center justify-center gap-4 rounded-full px-4 py-2">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="이전 슬라이드"
                            className="text-kua-white text-md hover:text-kua-gray400 transition"
                        >
                            <FaChevronLeft />
                        </button>
                        <div className="flex items-center gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleDotClick(i)}
                                    aria-label={`${i + 1}번 슬라이드`}
                                    className={`h-2 rounded-full ${i === currentSlide ? "bg-kua-white w-4" : "bg-kua-white/40 w-2"}`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="다음 슬라이드"
                            className="text-kua-white text-md hover:text-kua-gray400 transition"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
