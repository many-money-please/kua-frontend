"use client";

import { useRouter } from "next/navigation";
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
    status: "모집중" | "신청 완료" | "대회 진행중" | "대회 종료";
};

// 대회결과 데이터 타입
type CompetitionResult = {
    id: number;
    category: "국제" | "국내";
    title: string;
    location: string;
    competitionPeriod: string;
    applicationPeriod: string;
    status: "결과 발표";
};

type CompetitionInfoContentProps = {
    scheduleData: CompetitionSchedule[];
    resultData: CompetitionResult[];
};

export const CompetitionInfoContent = ({
    scheduleData,
    resultData,
}: CompetitionInfoContentProps) => {
    const router = useRouter();

    const handleScheduleRowClick = (row: CompetitionSchedule) => {
        router.push(`/competition-info/${row.id}`);
    };

    const handleResultRowClick = (row: CompetitionResult) => {
        router.push(`/competition-info/${row.id}`);
    };

    const handleSearch = (_query: string, _option: string) => {
        void _query;
        void _option;
        router.push("/competition-info/create");
    };

    const getCategoryBadgeClassName = (category: "국제" | "국내") => {
        const baseClasses =
            "mx-auto flex items-center justify-center rounded-sm border px-2.5 py-1 w-fit";
        const categoryClasses =
            category === "국제"
                ? "border-kua-sky300 text-kua-sky300"
                : "border-kua-main text-kua-main";
        return `${baseClasses} ${categoryClasses}`;
    };

    const getStatusButtonClassName = (
        status:
            | "모집중"
            | "신청 완료"
            | "대회 진행중"
            | "대회 종료"
            | "결과 발표",
    ) => {
        const baseClasses =
            "rounded-full px-2.5 py-1 font-semibold transition-colors";
        const statusClasses: Record<
            "모집중" | "신청 완료" | "대회 진행중" | "대회 종료" | "결과 발표",
            string
        > = {
            모집중: "bg-kua-sky100 text-kua-sky300",
            "신청 완료": "bg-kua-blue50 text-kua-main",
            "대회 진행중": "bg-kua-blue50 text-kua-blue300",
            "대회 종료": "bg-kua-gray250 text-kua-gray400",
            "결과 발표": "bg-kua-gray250 text-kua-gray400", // 기본값 (필요시 변경 가능)
        };
        return `${baseClasses} ${statusClasses[status]}`;
    };

    const scheduleColumnsTyped: Column<CompetitionSchedule>[] = [
        {
            key: "category",
            header: "분류",
            accessor: (row) => (
                <span className={getCategoryBadgeClassName(row.category)}>
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
            className: "w-50",
        },
        {
            key: "applicationPeriod",
            header: "신청기간",
            accessor: (row) => (
                <span className="text-kua-gray800">
                    {row.applicationPeriod}
                </span>
            ),
            className: "w-50",
        },
        {
            key: "status",
            header: "상태",
            accessor: (row) => (
                <button
                    type="button"
                    className={getStatusButtonClassName(row.status)}
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

    const resultColumnsTyped: Column<CompetitionResult>[] = [
        {
            key: "category",
            header: "분류",
            accessor: (row) => (
                <span className={getCategoryBadgeClassName(row.category)}>
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
            className: "w-50",
        },
        {
            key: "applicationPeriod",
            header: "신청기간",
            accessor: (row) => (
                <span className="text-kua-gray800">
                    {row.applicationPeriod}
                </span>
            ),
            className: "w-50",
        },
        {
            key: "status",
            header: "상태",
            accessor: (row) => (
                <button
                    type="button"
                    className={getStatusButtonClassName(row.status)}
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

    const tabs: TabData[] = [
        {
            id: "schedule",
            label: "대회일정",
            columns: scheduleColumnsTyped as Column[],
            data: scheduleData,
            onRowClick: (row) =>
                handleScheduleRowClick(row as CompetitionSchedule),
        },
        {
            id: "result",
            label: "대회결과",
            columns: resultColumnsTyped as Column[],
            data: resultData,
            onRowClick: (row) => handleResultRowClick(row as CompetitionResult),
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
