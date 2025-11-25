import React from "react";
import Image from "next/image";

type TrainingStep = {
    step: string;
    title: string;
    subtitle: string;
};

const trainingSteps: TrainingStep[] = [
    {
        step: "1단계",
        title: "기본 이론 교육",
        subtitle: "다이빙 원리 및 안전 규칙",
    },
    {
        step: "2단계",
        title: "수영장 연습",
        subtitle: "장비 착용 및 기본 기술 습득",
    },
    {
        step: "3단계",
        title: "제한수역 실습",
        subtitle: "실제 수중 환경에서의 연습",
    },
    {
        step: "4단계",
        title: "오픈워터 다이빙",
        subtitle: "자격 취득 및 실제 다이빙",
    },
];

export const TrainingMethods = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 pb-16">
            <h2 className="text-[32px] font-bold">훈련 방법</h2>
            <div className="grid grid-cols-4 gap-4">
                {trainingSteps.map((step, index) => (
                    <div
                        key={step.step}
                        className="border-kua-gray200 flex flex-col overflow-hidden rounded-[10px] border"
                    >
                        {/* 헤더 */}
                        <div
                            className={`w-full py-4 text-center ${
                                index === 3 ? "bg-kua-main" : "bg-kua-blue300"
                            }`}
                        >
                            <h3 className="text-xl font-bold text-white">
                                {step.step}
                            </h3>
                        </div>
                        {/* 본문 */}
                        <div className="flex flex-col gap-2 bg-white p-6">
                            <p className="text-kua-main text-center text-2xl font-bold">
                                {step.title}
                            </p>
                            <p className="text-kua-gray600 text-center text-xl font-medium">
                                {step.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* 경고 섹션 */}
            <div className="bg-kua-gray100 flex w-full items-center gap-4 rounded-[10px] p-4 text-lg">
                <div className="relative h-[25px] w-[25px]">
                    <Image src="/imgs/icons/warning.svg" alt="스쿠버다이빙" fill />
                </div>
                <div>
                    초보자는 전문 교육 기관에서 체계적인 교육을 받아야 합니다.
                    <br />
                    항상 버디 시스템을 준수하고 안전 규칙을 지켜야 합니다.
                </div>
            </div>
        </div>
    );
};

