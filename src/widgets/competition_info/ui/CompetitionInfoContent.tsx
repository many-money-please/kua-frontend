"use client";

import { TabbedDataTable, type TabData } from "@/shared/ui/TabbedDataTable";
import { type Column } from "@/shared/ui/DataTable";

// 대회일정 데이터 타입
type CompetitionSchedule = {
    id: number;
    category: "국제" | "국내";
    title: string;
    location: string;
    competitionPeriod: string;
    applicationPeriod: string;
    status: string;
};

// 대회결과 데이터 타입
type CompetitionResult = {
    id: number;
    title: string;
    date: string;
    winner: string;
    category: string;
};

type CompetitionInfoContentProps = {
    scheduleData: CompetitionSchedule[];
    resultData: CompetitionResult[];
};

export const CompetitionInfoContent = ({
    scheduleData,
    resultData,
}: CompetitionInfoContentProps) => {
    const handleScheduleRowClick = (row: CompetitionSchedule) => {
        console.log("클릭된 대회일정:", row);
    };

    const handleResultRowClick = (row: CompetitionResult) => {
        console.log("클릭된 대회결과:", row);
    };

    const handleSearch = (query: string, option: string) => {
        console.log("검색:", query, option);
    };

    const scheduleColumns: Column<CompetitionSchedule>[] = [
        {
            key: "category",
            header: "분류",
            accessor: (row) => (
                <span
                    className={`flex items-center justify-center rounded-lg border px-2 py-1 ${row.category === "국제" ? "border-kua-sky300 text-kua-sky300" : "border-kua-main text-kua-main"}`}
                >
                    {row.category}
                </span>
            ),
            className: "w-24 text-center",
            headerClassName: "text-center",
        },
        {
            key: "title",
            header: "제목",
            accessor: (row) => (
                <span className="text-kua-black100">{row.title}</span>
            ),
            className: "min-w-[300px]",
        },
        {
            key: "location",
            header: "장소",
            accessor: (row) => (
                <span className="text-kua-gray800">{row.location}</span>
            ),
            className: "min-w-[200px]",
        },
        {
            key: "competitionPeriod",
            header: "대회기간",
            accessor: (row) => (
                <span className="text-kua-gray800">
                    {row.competitionPeriod}
                </span>
            ),
            className: "w-40",
        },
        {
            key: "applicationPeriod",
            header: "신청기간",
            accessor: (row) => (
                <span className="text-kua-gray800">
                    {row.applicationPeriod}
                </span>
            ),
            className: "w-40",
        },
        {
            key: "status",
            header: "상태",
            accessor: (row) => (
                <button
                    type="button"
                    className="bg-kua-gray250 text-kua-main hover:bg-kua-gray400 hover:text-kua-darkblue800 rounded-full px-2 py-1 font-semibold transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("상태 버튼 클릭:", row);
                    }}
                >
                    {row.status}
                </button>
            ),
            className: "w-32 text-center",
            headerClassName: "text-center",
        },
    ];

    const resultColumns: Column<CompetitionResult>[] = [
        {
            key: "id",
            header: "번호",
            accessor: (row) => row.id,
            className: "w-20 text-center",
        },
        {
            key: "title",
            header: "대회명",
            accessor: (row) => <span className="font-medium">{row.title}</span>,
        },
        {
            key: "date",
            header: "일정",
            accessor: (row) => row.date,
            className: "w-32",
        },
        {
            key: "category",
            header: "종목",
            accessor: (row) => row.category,
            className: "w-32",
        },
        {
            key: "winner",
            header: "우승자",
            accessor: (row) => (
                <span className="text-kua-blue500 font-semibold">
                    {row.winner}
                </span>
            ),
            className: "w-32",
        },
    ];

    const tabs: TabData[] = [
        {
            id: "schedule",
            label: "대회일정",
            columns: scheduleColumns,
            data: scheduleData,
            onRowClick: handleScheduleRowClick,
        },
        {
            id: "result",
            label: "대회결과",
            columns: resultColumns,
            data: resultData,
            onRowClick: handleResultRowClick,
        },
    ];

    return (
        <TabbedDataTable
            tabs={tabs}
            defaultTabId="schedule"
            searchOptions={{
                options: ["제목", "내용", "제목+내용"],
                placeholder: "검색어를 입력하세요",
                onSearch: handleSearch,
            }}
        />
    );
};
