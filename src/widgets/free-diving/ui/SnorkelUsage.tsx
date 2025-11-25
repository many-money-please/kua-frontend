import React from "react";
import Image from "next/image";

type SnorkelStep = {
    title: string;
    icon: string;
    description: string | React.ReactNode;
};

const snorkelSteps: SnorkelStep[] = [
    {
        title: "마스크 착용",
        icon: "/imgs/fin-swimming/fin-swimming15.svg",
        description: (
            <>
                마스크를 착용하고,
                <br /> 코 부분을 조절.
                <br />
                수중 시야 확보
            </>
        ),
    },
    {
        title: "핀 착용",
        icon: "/imgs/fin-swimming/fin-swimming16.svg",
        description: (
            <>
                핀을 발에 착용,
                <br /> 크기와 조임 정도
                <br />
                확인
            </>
        ),
    },
    {
        title: "호흡 훈련",
        icon: "/imgs/fin-swimming/fin-swimming17.svg",
        description: (
            <>
                깊게 호흡하고 참기, <br />
                일정한 리듬 유지.
                <br />
                무리한 호흡 참기는 금지
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

