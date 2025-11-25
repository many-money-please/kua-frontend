import type { Metadata } from "next";
import {
    Origin,
    HistoricalOrigin,
    CompetitionStructure,
    Features,
    KoreaDevelopment,
} from "@/widgets/fin-swimming";

export const metadata: Metadata = {
    title: "핀수영의 역사 | 종목소개 | 대한수중 핀수영협회",
    description:
        "핀수영의 기원과 역사, 경기 구조와 특징, 한국의 핀수영 발전 과정에 대해 알아보실 수 있습니다.",
};

export default function HistoryPage() {
    return (
        <div className="mx-auto w-full">
            <div className="mx-auto flex w-full flex-col gap-32">
                <Origin />
                <HistoricalOrigin />
                <CompetitionStructure />
                <Features />
                <KoreaDevelopment />
            </div>
        </div>
    );
}
