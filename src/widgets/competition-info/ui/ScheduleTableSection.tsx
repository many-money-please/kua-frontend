"use client";

import { CompetitionInfoTable } from "./CompetitionInfoTable";
import { createScheduleColumns } from "@/widgets/competition-info/lib/columns";
import type { CompetitionSchedule } from "@/widgets/competition-info/lib/mockData";

type ScheduleTableSectionProps = {
    data: CompetitionSchedule[];
};

export const ScheduleTableSection = ({ data }: ScheduleTableSectionProps) => {
    return (
        <CompetitionInfoTable<CompetitionSchedule>
            title="대회일정"
            columns={createScheduleColumns()}
            data={data}
            getRowLink={(row) => `/competition-info/${row.id}`}
            searchOptions={["제목", "내용", "제목+내용"]}
            onSearch={(query, option) => console.log("search", query, option)}
        />
    );
};
