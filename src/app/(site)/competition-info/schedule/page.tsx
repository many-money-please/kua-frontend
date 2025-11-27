import type { Metadata } from "next";
import { ScheduleTableSection } from "@/widgets/competition-info";
import { createMockScheduleData } from "@/widgets/competition-info/lib/mockData";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "대회 일정 | 대회정보 | 대한수중 핀수영협회",
    description:
        "대한수중핀수영협회에서 주최하는 핀수영 대회 일정을 확인하실 수 있습니다. 지역별, 날짜별 대회 일정과 참가 안내를 제공합니다.",
};

const scheduleData = createMockScheduleData();

export default function CompetitionSchedulePage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <ScheduleTableSection data={scheduleData} />
        </Suspense>
    );
}
