import React from "react";
import Image from "next/image";

type SnorkelStep = {
    title: string;
    icon: string;
    description: string | React.ReactNode;
};

const snorkelSteps: SnorkelStep[] = [
    {
        title: "구조 장비 착용",
        icon: "/imgs/fin-swimming/fin-swimming15.svg",
        description: (
            <>
                구조 장비를 착용하고,
                <br /> 안전 점검.
                <br />
                구조 준비 완료
            </>
        ),
    },
    {
        title: "구조 기술 사용",
        icon: "/imgs/fin-swimming/fin-swimming16.svg",
        description: (
            <>
                구조 기술을 사용하여,
                <br /> 생명을 구조
                <br />
                안전하게 이동
            </>
        ),
    },
    {
        title: "안전 훈련",
        icon: "/imgs/fin-swimming/fin-swimming17.svg",
        description: (
            <>
                안전 절차 준수, <br />
                응급처치 적용.
                <br />
                구조 후 안전 확인
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

