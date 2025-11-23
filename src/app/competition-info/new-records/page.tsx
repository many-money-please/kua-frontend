import { NewRecordsTableSection } from "@/widgets/competition-info";
import type { NewRecordSummary } from "@/widgets/competition-info";

const NEW_RECORDS: NewRecordSummary[] = [
    {
        id: 1,
        title: "2025년 프리다이빙 신기록",
        createdAt: "2025-01-15",
        views: 312,
    },
    {
        id: 2,
        title: "2025년 핀수영 신기록",
        createdAt: "2025-01-10",
        views: 545,
    },
    {
        id: 3,
        title: "2025년 수영 신기록",
        createdAt: "2025-01-05",
        views: 198,
    },
];

export default function CompetitionNewRecordsPage() {
    return (
        <NewRecordsTableSection
            title="신기록 현황"
            data={NEW_RECORDS}
            detailBasePath="/competition-info/new-records"
            searchOptions={["제목", "내용", "제목+내용"]}
            isManager={true}
        />
    );
}
