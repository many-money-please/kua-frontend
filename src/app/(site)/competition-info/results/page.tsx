import { Suspense } from "react";
import { ResultsTableSection } from "@/widgets/competition-info";
import { createMockResultData } from "@/widgets/competition-info/lib/mockData";

const resultData = createMockResultData();

export default function CompetitionResultsPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <ResultsTableSection data={resultData} />
        </Suspense>
    );
}
