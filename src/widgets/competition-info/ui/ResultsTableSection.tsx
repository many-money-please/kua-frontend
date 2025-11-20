"use client";

import { CompetitionInfoTable } from "./CompetitionInfoTable";
import { createResultColumns } from "@/widgets/competition-info/lib/columns";
import type { CompetitionResult } from "@/widgets/competition-info/lib/mockData";

type ResultsTableSectionProps = {
    data: CompetitionResult[];
};

export const ResultsTableSection = ({ data }: ResultsTableSectionProps) => {
    return (
        <CompetitionInfoTable<CompetitionResult>
            title="대회결과"
            columns={createResultColumns()}
            data={data}
            getRowLink={(row) => `/competition-info/results/${row.id}`}
            searchOptions={["제목", "내용", "제목+내용"]}
            onSearch={(query, option) => console.log("search", query, option)}
        />
    );
};
