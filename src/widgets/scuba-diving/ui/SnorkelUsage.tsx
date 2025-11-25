import React from "react";
import Image from "next/image";

type SnorkelStep = {
    title: string;
    icon: string;
    description: string | React.ReactNode;
};

const snorkelSteps: SnorkelStep[] = [
    {
        title: "BCD 착용",
        icon: "/imgs/fin-swimming/fin-swimming15.svg",
        description: (
            <>
                BCD를 착용하고,
                <br /> 공기통과 연결.
                <br />
                조절 가능하도록 설정
            </>
        ),
    },
    {
        title: "레귤레이터 사용",
        icon: "/imgs/fin-swimming/fin-swimming16.svg",
        description: (
            <>
                1차 레귤레이터를 입에 물고,
                <br /> 2차 레귤레이터는
                <br />
                버디와 비상 시 사용
            </>
        ),
    },
    {
        title: "호흡 훈련",
        icon: "/imgs/fin-swimming/fin-swimming17.svg",
        description: (
            <>
                천천히 깊게 호흡, <br />
                일정한 리듬 유지.
                <br />
                과도한 호흡은 금지
            </>
        ),
    },
];

export const SnorkelUsage = () => {
    return (
        <div className="bg-kua-blue50 w-full py-16">
            <div className="mx-auto w-full max-w-[1200px] gap-4 rounded-[10px]">
                <h2 className="mb-8 text-[32px] font-bold">장비 사용법</h2>
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

