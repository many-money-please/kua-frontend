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

type QualificationData = {
    title: string;
    rows: {
        item: string;
        content: string;
        qualificationLevel: string;
        examinationFee: string;
    }[];
};

const qualificationData: QualificationData[] = [
    {
        title: "스쿠버다이빙 지도자",
        rows: [
            {
                item: "자격명",
                content: "스쿠버다이빙지도자",
                qualificationLevel: "3급",
                examinationFee: "10만원(교재 평가비 포함)",
            },
            {
                item: "등록번호",
                content: "제2019-001744호",
                qualificationLevel: "2급",
                examinationFee: "12만원(교재 평가비 포함)",
            },
            {
                item: "주무부처",
                content: "문화체육관광부",
                qualificationLevel: "1급",
                examinationFee: "15만원(교재 평가비 포함)",
            },
        ],
    },
    {
        title: "수중스쿠버다이빙 심판원",
        rows: [
            {
                item: "자격명",
                content: "수중스쿠버다이빙 심판원",
                qualificationLevel: "3급",
                examinationFee: "7만원(교재 평가비 포함)",
            },
            {
                item: "등록번호",
                content: "제2019-001746호",
                qualificationLevel: "2급",
                examinationFee: "10만원(교재 평가비 포함)",
            },
            {
                item: "주무부처",
                content: "문화체육관광부",
                qualificationLevel: "1급",
                examinationFee: "12만원(교재 평가비 포함)",
            },
        ],
    },
];

export default function PrivateQualificationPage() {
    return (
        <div className="mx-auto mb-20 w-full max-w-[1200px] px-4">
            <div className="mx-auto flex w-full flex-col gap-16">
                {qualificationData.map((data) => (
                    <div key={data.title} className="flex flex-col gap-6">
                        <h2 className="text-[32px] font-bold">{data.title}</h2>
                        <QualificationInfoTable
                            showQualificationLevel={true}
                            showExaminationFee={true}
                            rows={data.rows}
                        />
                    </div>
                ))}

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

