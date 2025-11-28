import type { Metadata } from "next";
import { AppliedTechniques } from "@/widgets/fin-swimming/ui/AppliedTechniques";
import { BasicPosture } from "@/widgets/fin-swimming/ui/BasicPosture";
import { KickingPracticeSteps } from "@/widgets/fin-swimming/ui/KickingPracticeSteps";
import { MonofinWearing } from "@/widgets/fin-swimming/ui/MonofinWearing";
import { SnorkelUsage } from "@/widgets/fin-swimming/ui/SnorkelUsage";
import { TrainingMethods } from "@/widgets/fin-swimming/ui/TrainingMethods";
import { WearingOrder } from "@/widgets/fin-swimming/ui/WearingOrder";

export const metadata: Metadata = {
    title: "기술 및 훈련 | 종목소개 | 대한수중 핀수영협회",
    description:
        "핀수영의 기본 기술과 훈련 방법을 학습하실 수 있습니다. 모노핀 착용법, 기본 자세, 킥 연습, 스노클 사용법, 적용 기술 등을 안내합니다.",
};

export default function SkillsAndTrainingPage() {
    return (
        <div className="flex w-full flex-col gap-16 px-5 sm:gap-32 sm:px-0">
            <MonofinWearing />
            <WearingOrder />
            <KickingPracticeSteps />
            <SnorkelUsage />
            <BasicPosture />
            <AppliedTechniques />
            <TrainingMethods />
        </div>
    );
}
