import type { Metadata } from "next";
import { AppliedTechniques } from "@/widgets/first-aid/ui/AppliedTechniques";
import { BasicPosture } from "@/widgets/first-aid/ui/BasicPosture";
import { KickingPracticeSteps } from "@/widgets/first-aid/ui/KickingPracticeSteps";
import { MonofinWearing } from "@/widgets/first-aid/ui/MonofinWearing";
import { SnorkelUsage } from "@/widgets/first-aid/ui/SnorkelUsage";
import { TrainingMethods } from "@/widgets/first-aid/ui/TrainingMethods";
import { WearingOrder } from "@/widgets/first-aid/ui/WearingOrder";

export const metadata: Metadata = {
    title: "기술 및 훈련 | 종목소개 | 대한수중 핀수영협회",
    description:
        "응급처치의 기본 기술과 훈련 방법을 학습하실 수 있습니다. 장비 착용법, 기본 자세, 기술 연습 등을 안내합니다.",
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

