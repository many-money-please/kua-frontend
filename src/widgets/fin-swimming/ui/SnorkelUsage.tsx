import React from "react";
import Image from "next/image";

type SnorkelStep = {
    title: string;
    icon: string;
    description: string | React.ReactNode;
};

const snorkelSteps: SnorkelStep[] = [
    {
        title: "착용",
        icon: "/imgs/fin-swimming/fin-swimming15.svg",
        description: (
            <>
                마우스피스를 입에 물고,
                <br /> 이마 중앙에 파이프 고정.
                <br />
                물안경 먼저 착용 후 스노클 부착
            </>
        ),
    },
    {
        title: "물빼기 연습",
        icon: "/imgs/fin-swimming/fin-swimming16.svg",
        description: (
            <>
                물속에서 숨을
                <br /> 참았다가 내뱉으며
                <br />
                파이프의 물 제거
            </>
        ),
    },
    {
        title: "호흡 훈련",
        icon: "/imgs/fin-swimming/fin-swimming17.svg",
        description: (
            <>
                입으로만 호흡, <br />
                일정한 리듬 유지.
                <br />
                발차기 중에도 상체는 고정
            </>
        ),
    },
];

export const SnorkelUsage = () => {
    return (
        <div className="bg-kua-blue50 w-full py-16">
            <div className="mx-auto w-full max-w-[1200px] gap-4 rounded-[10px]">
                <h2 className="mb-8 text-[32px] font-bold">스노클 사용법</h2>
                <div className="grid grid-cols-3 gap-8">
                    {snorkelSteps.map((step) => (
                        <div
                            key={step.title}
                            className="border-kua-sky100 flex flex-col items-center gap-8 rounded-[10px] border bg-white p-6"
                        >
                            {/* 아이콘 */}
                            <div className="relative h-24 w-24">
                                <Image
                                    src={step.icon}
                                    alt={step.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            {/* 제목 */}
                            <h3 className="text-kua-main text-4xl font-bold">
                                {step.title}
                            </h3>
                            {/* 설명 */}
                            <p className="text-kua-gray800 text-center text-xl leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
