import { type Column } from "@/shared/ui/DataTable";
import { type CompetitionResult, type CompetitionSchedule } from "./mockData";

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
    status: "모집중" | "신청 완료" | "대회 진행중" | "대회 종료" | "결과 발표",
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
        "결과 발표": "bg-kua-gray250 text-kua-gray400",
    };
    return `${baseClasses} ${statusClasses[status]}`;
};

export const createScheduleColumns = (
    onStatusClick?: (row: CompetitionSchedule) => void,
): Column<CompetitionSchedule>[] => [
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
            <span className="text-kua-gray800">{row.competitionPeriod}</span>
        ),
        className: "w-50",
    },
    {
        key: "applicationPeriod",
        header: "신청기간",
        accessor: (row) => (
            <span className="text-kua-gray800">{row.applicationPeriod}</span>
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
                onClick={(event) => {
                    event.stopPropagation();
                    onStatusClick?.(row);
                }}
            >
                {row.status}
            </button>
        ),
        className: "w-32 text-center",
        headerClassName: "text-center",
    },
];

export const createResultColumns = (
    onStatusClick?: (row: CompetitionResult) => void,
): Column<CompetitionResult>[] => [
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
            <span className="text-kua-gray800">{row.competitionPeriod}</span>
        ),
        className: "w-50",
    },
    {
        key: "applicationPeriod",
        header: "신청기간",
        accessor: (row) => (
            <span className="text-kua-gray800">{row.applicationPeriod}</span>
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
                onClick={(event) => {
                    event.stopPropagation();
                    onStatusClick?.(row);
                }}
            >
                {row.status}
            </button>
        ),
        className: "w-32 text-center",
        headerClassName: "text-center",
    },
];
