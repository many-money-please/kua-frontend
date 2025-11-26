import type { Metadata } from "next";
import {
    QualificationInfoTable,
    RefundPolicyTable,
} from "@/widgets/scuba-diving";

export const metadata: Metadata = {
    title: "민간자격등록 | 종목소개 | 대한수중 핀수영협회",
    description:
        "스쿠버다이빙 관련 민간자격 등록 정보 및 자격관리·운영기관 정보를 확인하실 수 있습니다.",
};

type ColumnKey = "name" | "level" | "regNo" | "fee" | "department" | "category";

type TableColumn = {
    key: ColumnKey;
    label: string;
    widthClass?: string;
};

type TableRow = Record<ColumnKey, string>;

const baseQualificationColumns: TableColumn[] = [
    { key: "name", label: "자격명" },
    { key: "level", label: "자격등급" },
    { key: "regNo", label: "등록번호" },
    { key: "fee", label: "검정비용" },
    { key: "department", label: "주무부처" },
];

// [수정] 기본 자격 데이터 업데이트
const baseQualifications: TableRow[] = [
    {
        name: "스쿠버다이빙",
        level: "One star diver",
        regNo: "제2010-0004호",
        fee: "50만원",
        department: "해양수산부",
        category: "base",
    },
    {
        name: "스쿠버다이빙",
        level: "Two star diver",
        regNo: "제2010-0004호",
        fee: "60만원",
        department: "해양수산부",
        category: "base",
    },
    {
        name: "스쿠버다이빙",
        level: "Three star diver",
        regNo: "제2010-0004호",
        fee: "80만원",
        department: "해양수산부",
        category: "base",
    },
    {
        name: "스쿠버다이빙",
        level: "Four star diver",
        regNo: "제2010-0004호",
        fee: "40만원",
        department: "해양수산부",
        category: "base",
    },
    {
        name: "스쿠버다이빙",
        level: "One star Instructor",
        regNo: "제2010-0004호",
        fee: "250만원",
        department: "해양수산부",
        category: "base",
    },
    {
        name: "스쿠버다이빙",
        level: "Two star Instructor",
        regNo: "제2010-0004호",
        fee: "120만원",
        department: "해양수산부",
        category: "base",
    },
    {
        name: "스쿠버다이빙",
        level: "Three star Instructor",
        regNo: "제2010-0004호",
        fee: "500만원",
        department: "해양수산부",
        category: "base",
    },
    {
        name: "스킨다이버",
        level: "스킨다이버",
        regNo: "제2019-001450호",
        fee: "10만원",
        department: "해양수산부",
        category: "base",
    },
];

const specialQualificationColumns: TableColumn[] = [
    { key: "name", label: "자격명" },
    { key: "regNo", label: "등록번호" },
    { key: "fee", label: "검정비용" },
    { key: "department", label: "주무부처" },
];

// [수정] 특수잠수 자격 데이터 업데이트
const specialQualifications: TableRow[] = [
    {
        name: "수중스쿠터다이빙",
        regNo: "제2019-001451호",
        fee: "각 50만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "더블탱크다이빙",
        regNo: "제2019-001452호",
        fee: "각 70만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "싱글탱크 백마운트다이빙",
        regNo: "제2019-001453호",
        fee: "각 40만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "수중비디오그래퍼",
        regNo: "제2019-001454호",
        fee: "각 30만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "수중사진가",
        regNo: "제2019-001455호",
        fee: "각 30만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "야간잠수",
        regNo: "제2019-001456호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "고도잠수",
        regNo: "제2019-001457호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "침몰선잠수",
        regNo: "제2019-001458호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "드라이슈트다이빙",
        regNo: "제2019-001459호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "수중방향찾기",
        regNo: "제2019-001460호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "심해잠수",
        regNo: "제2019-001461호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "표류잠수",
        regNo: "제2019-001462호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "흐린물잠수",
        regNo: "제2019-001463호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "아이스다이빙",
        regNo: "제2019-001464호",
        fee: "각 30만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "싸이드마운트다이빙",
        regNo: "제2019-001465호",
        fee: "각 70만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "나이트록스다이빙",
        regNo: "제2019-001466호",
        fee: "각 20만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
    {
        name: "장비전문가",
        regNo: "제2019-001466호",
        fee: "각 15만원",
        department: "해양수산부",
        level: "",
        category: "special",
    },
];

const technicalQualificationColumns = specialQualificationColumns;

// [수정] 테크니컬 다이빙 자격 데이터 업데이트
const technicalQualifications: TableRow[] = [
    {
        name: "감압절차",
        regNo: "제2019-006027호",
        fee: "100만원",
        department: "해양수산부",
        level: "",
        category: "technical",
    },
    {
        name: "트라이믹스",
        regNo: "제2019-006028호",
        fee: "150만원",
        department: "해양수산부",
        level: "",
        category: "technical",
    },
    {
        name: "고급나이트록스",
        regNo: "제2019-006029호",
        fee: "50만원",
        department: "해양수산부",
        level: "",
        category: "technical",
    },
    {
        name: "반폐쇄식재호흡기",
        regNo: "제2019-006030호",
        fee: "150만원",
        department: "해양수산부",
        level: "",
        category: "technical",
    },
    {
        name: "완전폐쇄식재호흡기",
        regNo: "제2019-006031호",
        fee: "150만원",
        department: "해양수산부",
        level: "",
        category: "technical",
    },
];

type MergeMeta = {
    rowSpan: number;
    hidden: boolean;
};

const getMergeMeta = (
    rows: TableRow[],
    mergeColumn?: ColumnKey,
): MergeMeta[] => {
    if (!mergeColumn) {
        return rows.map(() => ({ rowSpan: 1, hidden: false }));
    }

    const meta: MergeMeta[] = [];
    let index = 0;

    while (index < rows.length) {
        const currentValue = rows[index][mergeColumn];
        let span = 1;

        // count how many consecutive rows share the same value
        for (let i = index + 1; i < rows.length; i++) {
            if (rows[i][mergeColumn] !== currentValue) {
                break;
            }
            span++;
        }

        meta.push({ rowSpan: span, hidden: false });

        for (let i = 1; i < span; i++) {
            meta.push({ rowSpan: 0, hidden: true });
        }

        index += span;
    }

    return meta;
};

const TableSection = ({
    title,
    description,
    columns,
    rows,
    footnote,
    mergeColumns,
}: {
    title: string;
    description?: string;
    columns: TableColumn[];
    rows: TableRow[];
    footnote?: string[];
    mergeColumns?: ColumnKey | ColumnKey[];
}) => (
    <section className="flex flex-col gap-4">
        <div>
            <h2 className="text-[32px] font-bold">{title}</h2>
            {description && (
                <p className="text-kua-gray500 mt-2 text-base">{description}</p>
            )}
        </div>
        <div className="border-kua-main overflow-x-auto border-x-0 border-t-2 bg-white">
            <table className="w-full border-collapse text-center text-sm">
                <thead className="bg-kua-blue50 text-kua-gray700 text-base font-semibold">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`border-kua-gray200 h-[58px] border px-4 py-3 align-middle ${column.widthClass ?? ""} first:border-l-0 last:border-r-0`}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        const mergeTargets = Array.isArray(mergeColumns)
                            ? mergeColumns
                            : mergeColumns
                              ? [mergeColumns]
                              : [];
                        const mergeMetaMap: Partial<
                            Record<ColumnKey, MergeMeta[]>
                        > = {};
                        mergeTargets.forEach((target) => {
                            mergeMetaMap[target] = getMergeMeta(rows, target);
                        });

                        return rows.map((row, rowIndex) => (
                            <tr
                                key={`${row.name}-${row.regNo}-${rowIndex}`}
                                className="text-kua-gray800 even:bg-kua-blue50/20 text-base odd:bg-white"
                            >
                                {columns.map((column) => {
                                    const columnMeta =
                                        mergeMetaMap[column.key]?.[rowIndex];
                                    if (columnMeta?.hidden) {
                                        return null;
                                    }

                                    const baseCellClasses =
                                        "border-kua-gray200 border px-4 py-3 h-[58px] align-middle";
                                    const nameCellClasses =
                                        column.key === "name"
                                            ? "bg-kua-sky50 font-semibold text-kua-gray900"
                                            : "";

                                    return (
                                        <td
                                            key={column.key}
                                            className={`${baseCellClasses} ${nameCellClasses} first:border-l-0 last:border-r-0`}
                                            rowSpan={columnMeta?.rowSpan ?? 1}
                                        >
                                            {row[column.key]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ));
                    })()}
                </tbody>
            </table>
        </div>
        {footnote && (
            <p className="text-kua-gray400 text-lg">
                {footnote.map((item) => (
                    <p key={item}>
                        {item}
                        <br />
                    </p>
                ))}
            </p>
        )}
    </section>
);

export default function PrivateQualificationPage() {
    return (
        <div className="mx-auto mb-20 w-full max-w-[1200px] px-4">
            <div className="mx-auto flex w-full flex-col gap-16">
                <TableSection
                    title="기본 자격"
                    columns={baseQualificationColumns}
                    rows={baseQualifications}
                    mergeColumns={["name", "department"]}
                    footnote={["* 모든 비용은 교재 및 평가비 포함"]}
                />

                <TableSection
                    title="특수잠수 자격"
                    columns={specialQualificationColumns}
                    rows={specialQualifications}
                    mergeColumns={["name", "department"]}
                    footnote={[
                        "* 검정비용은 다이버/강사/강사트레이너 동일",
                        "* 아이스다이빙은 숙박 및 교통비 별도",
                    ]}
                />

                <TableSection
                    title="테크니컬 다이빙 자격"
                    columns={technicalQualificationColumns}
                    rows={technicalQualifications}
                    mergeColumns={["name", "department"]}
                    footnote={[
                        "* 검정비용은 다이버/강사/강사트레이너 동일",
                        "* 아이스다이빙은 숙박 및 교통비 별도",
                    ]}
                />

                <div className="flex flex-col gap-6">
                    <h2 className="text-[32px] font-bold">자격관리·운영기관</h2>
                    <QualificationInfoTable
                        layout="grid"
                        rows={[
                            {
                                item: "기관명",
                                content: "사단법인 대한수중핀수영협회",
                            },
                            {
                                item: "대표자",
                                content: "강철식",
                            },
                            {
                                item: "연락처",
                                content: "02-420-4293",
                            },
                            {
                                item: "직통번호",
                                content: "070-7726-3989",
                            },
                            {
                                item: "이메일",
                                content: "kua@kua.or.kr",
                            },
                            {
                                item: "홈페이지",
                                content: "www.kua.or.kr",
                            },
                            {
                                item: "소재지",
                                content:
                                    "서울특별시 송파구 올림픽로 424, 핸드볼경기장 112호",
                                colSpan: 3,
                            },
                        ]}
                    />
                    <div className="bg-kua-sky50 flex w-full flex-col gap-4 rounded-[10px] px-8 py-8">
                        <div className="text-kua-main text-lg font-bold">
                            소비자 알림사항
                        </div>
                        <div className="text-lg">
                            <p>
                                1. 상기 자격은 자격기본법 규정에 따라 등록한
                                민간자격으로, 국가로부터 공인받은 공인자격이
                                아닙니다.
                            </p>
                            <p>
                                2. 민간자격 등록 및 공인 제도에 대한 상세내용은
                                민간자격정보서비스(www.pqi.or.kr)의
                                &apos;민간자격 소개&apos;란을 참고하시기
                                바랍니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <RefundPolicyTable
                        policies={[
                            "교육기간의 1/3경과되기 전 해지 시 2/3환불",
                            "교육기간의 1/2경과되기 전 해지 시 1/2환불",
                            "교육기간의 1/2 경과이후 해지 시 환불 불가",
                        ]}
                    />
                    <div className="text-lg text-gray-400">
                        <p>* 회손된 지급품에 대한 금액은 환불 불가</p>
                        <p>* 카드 수수료를 제한 뒤 환불</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
