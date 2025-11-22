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
        title: "핀 없이 자세와 리듬 연습",
        subtitle: "기본 자세 익히기",
    },
    {
        step: "2단계",
        title: "작은 핀 사용",
        subtitle: "근육 단련 및 유연성 강화",
    },
    {
        step: "3단계",
        title: "큰 모노핀 전환",
        subtitle: "추진력 훈련",
    },
    {
        step: "4단계",
        title: "배영·측면영·잠영",
        subtitle: "근육 균형 및 응용력 강화",
    },
];

export const TrainingMethods = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 pb-16">
            <h2 className="text-[40px] font-bold">훈련 방법</h2>
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
