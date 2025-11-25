"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const kickingSteps = [
    {
        step: "01",
        title: "기본 자세 연습",
        description: (
            <>
                구조 자세 유지하기 - 상체와 하체를 일직선으로 유지하며 구조 동작 준비
            </>
        ),
        image: "/imgs/fin-swimming/fin-swimming14.png",
    },
    {
        step: "02",
        title: "구조 기술 연습",
        description: (
            <>
                수평 유지, 좌우 균형 조절 - 구조 동작 및 이동 기술 연습
            </>
        ),
        image: "/imgs/fin-swimming/fin-swimming01.jpg",
    },
    {
        step: "03",
        title: "안전 연습",
        description: (
            <>안전한 구조 절차 및 응급처치 연습</>
        ),
        image: "/imgs/fin-swimming/fin-swimming02.jpg",
    },
];

export const KickingPracticeSteps = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % kickingSteps.length);
        }, 3000); // 3초마다 변경

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
            <h2 className="text-[32px] font-bold">기술 연습 단계</h2>
            <div className="flex w-full items-stretch gap-4">
                <div className="flex w-[60%] flex-col gap-4">
                    {kickingSteps.map((step, index) => (
                        <div
                            key={step.step}
                            className={`rounded-[10px] px-8 py-6 transition-all duration-500 ${
                                activeIndex === index
                                    ? "bg-kua-blue50"
                                    : "bg-kua-white"
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <span
                                    className={`rounded-full px-1.5 py-1.5 text-sm font-semibold transition-all duration-500 ${activeIndex === index ? "bg-kua-white" : "bg-kua-blue50"}`}
                                >
                                    {step.step}
                                </span>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-kua-main text-2xl font-bold">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="relative w-[40%]">
                    <Image
                        src={kickingSteps[activeIndex].image}
                        alt={kickingSteps[activeIndex].title}
                        fill
                        className="rounded-[10px] object-cover"
                    />
                </div>
            </div>
            <div className="bg-kua-gray100 flex w-full items-center gap-4 rounded-[10px] p-4 text-lg">
                <div className="relative h-[25px] w-[25px]">
                    <Image src="/imgs/icons/warning.svg" alt="인명구조" fill />
                </div>
                <div>
                    초보자는 전문 교육 기관에서 체계적인 교육을 받아야 합니다.
                    <br />
                    항상 안전 규칙을 준수하고 구조 절차를 지켜야 합니다.
                </div>
            </div>
        </div>
    );
};

