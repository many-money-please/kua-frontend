import { ResultsTableSection } from "@/widgets/competition-info";
import { createMockResultData } from "@/widgets/competition-info/lib/mockData";

const resultData = createMockResultData();

export default function CompetitionResultsPage() {
    return <ResultsTableSection data={resultData} />;
}
