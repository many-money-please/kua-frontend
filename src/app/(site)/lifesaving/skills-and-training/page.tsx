import type { Metadata } from "next";
import { AppliedTechniques } from "@/widgets/lifesaving/ui/AppliedTechniques";
import { BasicPosture } from "@/widgets/lifesaving/ui/BasicPosture";
import { KickingPracticeSteps } from "@/widgets/lifesaving/ui/KickingPracticeSteps";
import { MonofinWearing } from "@/widgets/lifesaving/ui/MonofinWearing";
import { SnorkelUsage } from "@/widgets/lifesaving/ui/SnorkelUsage";
import { TrainingMethods } from "@/widgets/lifesaving/ui/TrainingMethods";
import { WearingOrder } from "@/widgets/lifesaving/ui/WearingOrder";

export const metadata: Metadata = {
    title: "기술 및 훈련 | 종목소개 | 대한수중 핀수영협회",
    description:
        "인명구조의 기본 기술과 훈련 방법을 학습하실 수 있습니다. 장비 착용법, 기본 자세, 기술 연습 등을 안내합니다.",
};

export default function SkillsAndTrainingPage() {
    return (
        <div className="flex w-full flex-col gap-32">
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

