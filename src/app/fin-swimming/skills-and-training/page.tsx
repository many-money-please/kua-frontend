import { AppliedTechniques } from "@/widgets/fin-swimming/ui/AppliedTechniques";
import { BasicPosture } from "@/widgets/fin-swimming/ui/BasicPosture";
import { KickingPracticeSteps } from "@/widgets/fin-swimming/ui/KickingPracticeSteps";
import { MonofinWearing } from "@/widgets/fin-swimming/ui/MonofinWearing";
import { SnorkelUsage } from "@/widgets/fin-swimming/ui/SnorkelUsage";
import { TrainingMethods } from "@/widgets/fin-swimming/ui/TrainingMethods";
import { WearingOrder } from "@/widgets/fin-swimming/ui/WearingOrder";

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
