"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const kickingSteps = [
    {
        step: "01",
        title: "앉아서 차기",
        description: (
            <>
                발바닥으로 물을 누르는 감각 익히기 - 상체를 곧게 펴고 발끝까지
                힘을 연결
            </>
        ),
        image: "/imgs/fin-swimming/fin-swimming14.png",
    },
    {
        step: "02",
        title: "벽잡고 차기",
        description: (
            <>
                수면과 수평 유지, 좌우 균형 조절 - 상체 → 하체로 자연스러운 힘
                전달
            </>
        ),
        image: "/imgs/fin-swimming/fin-swimming01.jpg",
    },
    {
        step: "03",
        title: "킥판 이용 차기",
        description: (
            <>추진력 훈련, 힘보단 리듬과 유연성 중심으로, 허리의 탄력 활용</>
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
            <h2 className="text-[32px] font-bold">발차기 연습 단계</h2>
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
                    <Image src="/imgs/icons/warning.svg" alt="핀수영" fill />
                </div>
                <div>
                    초보자는 부드러운 핀으로 시작해 점차 단단한 핀으로
                    변경하세요.
                    <br />
                    무리한 발차기는 발목·무릎·허리에 부상 위험이 있습니다.
                </div>
            </div>
        </div>
    );
};
