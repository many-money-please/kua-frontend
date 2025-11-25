import type { Metadata } from "next";
import { Fragment, ReactNode } from "react";
import {
    QualificationInfoTable,
    RefundPolicyTable,
} from "@/widgets/scuba-diving";

export const metadata: Metadata = {
    title: "프리다이빙 민간자격 | 대한수중 핀수영협회",
    description:
        "Pool 및 아웃도어 프리다이빙 등급, 강사 검정비용, 자격관리 기관 정보를 확인하실 수 있습니다.",
};

type LevelRow = {
    grade: string;
    minAge: string;
    recommendedHours: string;
    practice: string;
    ratio: string;
    instructor: string;
    condition: string;
};

const renderMultiline = (value: string): ReactNode => {
    if (value.includes("|")) {
        const parts = value.split("|");
        return parts.map((part, index) => (
            <Fragment key={`${part}-${index}`}>
                {part}
                {index !== parts.length - 1 && <br />}
            </Fragment>
        ));
    }
    return value;
};

type FeeEntry = {
    title: string;
    cost: string;
};

type FeeRow = {
    items: FeeEntry[];
};

const poolLevels: LevelRow[] = [
    {
        grade: "디스커버리 풀 다이버",
        minAge: "8세 (12세)",
        recommendedHours: "이론 2h, 실기 2h",
        practice: "수영장 2회",
        ratio: "1:6 (보조 1:8)",
        instructor: "1스타 Pool 강사+",
        condition: "신분증, 12개월 내 신체검사,|면책동의서, 18세↓ 부모 동의",
    },
    {
        grade: "1스타 Pool 다이버",
        minAge: "13세",
        recommendedHours: "이론 8h, 실기 8h",
        practice: "2h × 4회",
        ratio: "1:6",
        instructor: "1스타 Pool 강사+",
        condition: "디스커버리 풀 다이버|또는 스쿠버다이빙 자격",
    },
    {
        grade: "2스타 Pool 다이버",
        minAge: "16세",
        recommendedHours: "이론 8h, 실기 8h",
        practice: "수영장 2회",
        ratio: "1:6",
        instructor: "1스타 Pool 강사+",
        condition: "1스타 프리다이버 1주 후,|응급처치원 (2년 내)",
    },
    {
        grade: "1스타 Pool 강사",
        minAge: "18세",
        recommendedHours: "이론 10h, 실기 10h",
        practice: "2h × 5회",
        ratio: "1:6",
        instructor: "트레이너",
        condition: "2스타 풀 다이버|또는 스쿠버 강사",
    },
    {
        grade: "2스타 Pool 강사",
        minAge: "18세",
        recommendedHours: "이론 10h, 실기 10h",
        practice: "2h × 5회",
        ratio: "1:6",
        instructor: "트레이너",
        condition: "1스타 풀 강사(100장),|CPR 자격 유지",
    },
];

const poolFees: FeeRow[] = [
    {
        items: [
            { title: "1스타 풀 강사", cost: "60만원 (평가비 포함)" },
            { title: "2스타 풀 강사", cost: "30만원 (평가비 포함)" },
        ],
    },
];

const outdoorLevels: LevelRow[] = [
    {
        grade: "디스커버리 프리다이버",
        minAge: "8세",
        recommendedHours: "이론 2h, 실기 2h",
        practice: "2h×2회",
        ratio: "1:6",
        instructor: "1스타 강사+",
        condition: "-",
    },
    {
        grade: "1스타 프리다이버",
        minAge: "13세",
        recommendedHours: "이론 8h, 실기 8h",
        practice: "2h×4회",
        ratio: "수영장 1:6,|해양 1:4",
        instructor: "1스타 강사+",
        condition: "디스커버리 또는|스쿠버다이빙 자격",
    },
    {
        grade: "2스타 Pool 다이버",
        minAge: "16세",
        recommendedHours: "이론 8h, 실기 8h",
        practice: "수영장 2회",
        ratio: "수영장 1:6,|해양 1:4",
        instructor: "1스타 강사+",
        condition: "1스타 1주 후,|응급처치원 (2년 내)",
    },
    {
        grade: "3스타 프리다이버",
        minAge: "18세",
        recommendedHours: "이론 14h, 실기 12h",
        practice: "2h×6회, 조교 1회",
        ratio: "수영장 1:6,|해양 1:4",
        instructor: "2스타 강사+",
        condition: "2스타 1주 후,|응급처치원, 산소 공급자",
    },
    {
        grade: "1스타 강사",
        minAge: "18세",
        recommendedHours: "이론 20h, 실기 20h",
        practice: "2h×10회",
        ratio: "수영장 1:6,|해양 1:4",
        instructor: "트레이너",
        condition: "3스타 또는 스쿠버 강사|+2스타, 조교 2회, CPR 유지",
    },
    {
        grade: "2스타 강사",
        minAge: "18세",
        recommendedHours: "이론 20h, 실기 20h",
        practice: "2h×10회",
        ratio: "수영장 1:6,|해양 1:4",
        instructor: "트레이너",
        condition: "1스타 강사, 50명+ 교육,|응급처치 강사, CPR",
    },
    {
        grade: "3스타 강사 트레이너",
        minAge: "21세",
        recommendedHours: "5일간",
        practice: "ITC 조교 4회+",
        ratio: "수영장 1:6,|해양 1:4",
        instructor: "트레이너 평가관",
        condition: "2년+, 100명+ 교육|(3스타+ 5장)",
    },
    {
        grade: "강사평가관",
        minAge: "-",
        recommendedHours: "-",
        practice: "-",
        ratio: "-",
        instructor: "-",
        condition: "협회 승인",
    },
];

const outdoorFees: FeeRow[] = [
    {
        items: [
            {
                title: "1스타 프리다이빙 강사 (풀 강사 업그레이드)",
                cost: "150만원",
            },
            {
                title: "1스타 프리다이빙 강사 (3스타 다이버)",
                cost: "210만원",
            },
        ],
    },
    {
        items: [
            {
                title: "1스타 프리다이빙 강사 (크로스오버)",
                cost: "100만원",
            },
            { title: "2스타 프리다이빙 강사", cost: "60만원" },
        ],
    },
    {
        items: [
            { title: "3스타 강사 트레이너", cost: "250만원" },
            { title: "강사평가관", cost: "100만원" },
        ],
    },
];

const LevelTable = ({
    title,
    description,
    levels,
}: {
    title: string;
    description?: string;
    levels: LevelRow[];
}) => (
    <section className="flex flex-col gap-4">
        <div>
            <h2 className="text-[32px] font-bold">{title}</h2>
            {description && (
                <p className="text-kua-black100 mt-2 text-base">
                    {renderMultiline(description)}
                </p>
            )}
        </div>
        <div className="border-kua-main overflow-x-auto border-x-0 border-t-2 bg-white">
            <table className="w-full border-collapse text-center text-sm">
                <thead className="bg-kua-blue50 text-kua-gray700 text-base font-semibold">
                    <tr>
                        {[
                            "등급",
                            "최소연령",
                            "권장교육시간",
                            "최소 실습훈련",
                            "강사:학생 비율",
                            "강사자격",
                            "교육 참가 조건",
                        ].map((header) => (
                            <th
                                key={header}
                                className="border-kua-gray200 h-[58px] border px-4 py-3 align-middle first:border-l-0 last:border-r-0"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {levels.map((level) => (
                        <tr
                            key={`${level.grade}-${level.minAge}`}
                            className="text-kua-gray800 even:bg-kua-blue50/20 text-base odd:bg-white"
                        >
                            {[
                                level.grade,
                                level.minAge,
                                level.recommendedHours,
                                level.practice,
                                level.ratio,
                                level.instructor,
                                level.condition,
                            ].map((value, index) => (
                                <td
                                    key={index}
                                    className={`border-kua-gray200 h-[58px] border px-4 py-3 align-middle first:border-l-0 last:border-r-0 ${
                                        index === 0
                                            ? "bg-kua-sky50 text-kua-gray900 font-semibold"
                                            : ""
                                    }`}
                                >
                                    {renderMultiline(value)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

const FeeTable = ({ title, rows }: { title: string; rows: FeeRow[] }) => (
    <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="border-kua-main overflow-x-auto border-x-0 border-t-2 bg-white">
            <table className="w-full border-collapse text-center text-sm">
                {/* <thead className="bg-kua-blue50 text-kua-gray700 text-base font-semibold">
                    <tr>
                        <th className="border-kua-gray200 h-[58px] border px-4 py-3 align-middle first:border-l-0">
                            강사 등급
                        </th>
                        <th className="border-kua-gray200 h-[58px] border px-4 py-3 align-middle">
                            검정비용
                        </th>
                        <th className="border-kua-gray200 h-[58px] border px-4 py-3 align-middle">
                            강사 등급
                        </th>
                        <th className="border-kua-gray200 h-[58px] border px-4 py-3 align-middle last:border-r-0">
                            검정비용
                        </th>
                    </tr>
                </thead> */}
                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className="text-kua-gray800 even:bg-kua-blue50/20 text-base odd:bg-white"
                        >
                            {Array.from({ length: 2 }).map((_, pairIdx) => {
                                const item = row.items[pairIdx];
                                return (
                                    <Fragment key={`${index}-${pairIdx}`}>
                                        <td className="border-kua-gray200 bg-kua-sky50 text-kua-gray900 h-[58px] border px-4 py-3 align-middle font-semibold first:border-l-0">
                                            {item ? item.title : "-"}
                                        </td>
                                        <td className="border-kua-gray200 h-[58px] border px-4 py-3 align-middle last:border-r-0">
                                            {item ? item.cost : "-"}
                                        </td>
                                    </Fragment>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

export default function PrivateQualificationPage() {
    return (
        <div className="mx-auto mb-20 w-full max-w-[1200px] px-4">
            <div className="mx-auto flex w-full flex-col gap-32">
                <div className="flex flex-col gap-10">
                    <LevelTable
                        title="Pool 프리다이버 등급"
                        description="자격등록번호: 제2019-001468호|주무부처: 해양수산부"
                        levels={poolLevels}
                    />
                    <FeeTable title="Pool 강사 검정비용" rows={poolFees} />
                </div>
                <div className="flex flex-col gap-10">
                    <LevelTable
                        title="아웃도어 프리다이버 등급"
                        levels={outdoorLevels}
                    />
                    <FeeTable
                        title="아웃도어 강사 검정비용"
                        rows={outdoorFees}
                    />
                </div>
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
