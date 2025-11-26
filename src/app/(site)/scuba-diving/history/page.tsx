import type { Metadata } from "next";
import {
    Origin,
    HistoricalOrigin,
    CompetitionStructure,
    Features,
    KoreaDevelopment,
} from "@/widgets/scuba-diving";

export const metadata: Metadata = {
    title: "스쿠버다이빙의 역사 | 종목소개 | 대한수중 핀수영협회",
    description:
        "스쿠버다이빙의 기원과 역사, 경기 구조와 특징, 한국의 스쿠버다이빙 발전 과정에 대해 알아보실 수 있습니다.",
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

