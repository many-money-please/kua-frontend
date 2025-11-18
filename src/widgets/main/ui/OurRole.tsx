"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
    { src: "/imgs/main/our_role_01.svg", name: "KUA&CMAS 교육사업부" },
    { src: "/imgs/main/our_role_02.svg", name: "다이빙 풀장" },
    {
        src: "/imgs/main/our_role_03.svg",
        name: "선수, 지도자, 심판, 동호인 등록신청",
    },
    { src: "/imgs/main/our_role_04.svg", name: "증명서 발급신청" },
    {
        src: "/imgs/main/our_role_05.svg",
        name: "인명구조요원",
    },
    {
        src: "/imgs/main/our_role_06.svg",
        name: "핀수영 대회 참가신청하기",
    },
    {
        src: "/imgs/main/our_role_07.svg",
        name: "스포츠 윤리센터",
    },
    { src: "/imgs/main/our_role_08.svg", name: "대회 경기 결과조회" },
];

const REVEAL_DELAY = 100;

export const OurRole = () => {
    const textRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [textHeight, setTextHeight] = useState(0);
    const [visibleCount, setVisibleCount] = useState(0);
    const revealStartedRef = useRef(false);

    useEffect(() => {
        const updateHeight = () => {
            const maxHeight = textRefs.current.reduce((max, el) => {
                if (!el) return max;
                return Math.max(max, el.offsetHeight);
            }, 0);
            setTextHeight(maxHeight);
        };

        updateHeight();
    }, []);

    useEffect(() => {
        if (!textHeight || revealStartedRef.current) return;
        revealStartedRef.current = true;

        const intervalId = setInterval(() => {
            setVisibleCount((prev) => {
                if (prev >= images.length) {
                    clearInterval(intervalId);
                    return prev;
                }
                return prev + 1;
            });
        }, REVEAL_DELAY);

        return () => clearInterval(intervalId);
    }, [textHeight]);

    return (
        <div className="flex max-w-[1200px] flex-col items-center gap-8 text-center">
            <div className="text-kua-main text-xl font-bold">우리의 역할</div>
            <div className="text-3xl font-medium">
                건전한 스포츠 정신과 명랑한 기풍으로
                <br /> 대한민국 수중스포츠의 미래를 만들어갑니다.
            </div>
            <div className="text-lg">
                대한수중·핀수영협회는 수중스포츠를 국민에게 널리 보급하고,
                건강한 체력 향상과 스포츠 문화 발전에 기여하는 기관입니다.
                <br />
                우수한 선수를 발굴·육성하여 국가대표로 성장시키고, 국제무대에서
                대한민국의 위상을 높이기 위해 노력하고 있습니다.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {images.map((image, i) => (
                    <div
                        key={i}
                        className={`flex w-32 items-center justify-center gap-2 transition-all duration-500 ${
                            i < visibleCount
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }`}
                    >
                        <div className="group flex flex-col items-center justify-center transition-all duration-200 hover:scale-110">
                            <div className="bg-kua-sky50 group-hover:bg-kua-sky100 flex h-32 w-32 items-center justify-center rounded-full transition-colors duration-200">
                                <div className="relative flex h-12 w-12 items-center justify-center">
                                    <Image
                                        src={image.src}
                                        alt={`introduce-logo-${i}`}
                                        fill
                                        className="object-contain"
                                        sizes="48px"
                                    />
                                </div>
                            </div>
                            <div
                                ref={(el) => {
                                    textRefs.current[i] = el;
                                }}
                                style={{ minHeight: textHeight }}
                                className="text-kua-gray800 flex items-center text-base break-keep"
                            >
                                {image.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
