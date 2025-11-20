import { ScheduleTableSection } from "@/widgets/competition-info";
import { createMockScheduleData } from "@/widgets/competition-info/lib/mockData";

const scheduleData = createMockScheduleData();

export default function CompetitionSchedulePage() {
    return <ScheduleTableSection data={scheduleData} />;
}

