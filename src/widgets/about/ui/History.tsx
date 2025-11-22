"use client";

import Image from "next/image";
import { useState } from "react";

const historyData = {
    "2021 ~ 현재": [
        {
            year: "2025",
            events: [
                {
                    month: "05",
                    content: "세계수중연맹(CMAS) 이사 재선(강철식 회장)",
                },
                { month: "01", content: "강철식 제15대 회장 취임" },
            ],
        },
        {
            year: "2023",
            events: [
                {
                    month: "01",
                    content:
                        "제24회 세계핀수영선수권대회 2026년도 국내 유치 확정",
                },
            ],
        },
        {
            year: "2022",
            events: [
                { month: "03", content: "대한수중핀수영협회 창립 54주년" },
            ],
        },
        {
            year: "2021",
            events: [
                {
                    month: "10",
                    content: "세계수중연맹(CMAS) 이사 당선(강철식 회장)",
                },
                { month: "02", content: "강철식 제14대 회장 취임" },
            ],
        },
    ],
    "2011 ~ 2020": [
        {
            year: "2020",
            events: [
                { month: "02", content: "강철식 제14대 회장 취임" },
                {
                    month: "10",
                    content: "세계수중연맹(CMAS) 이사 당선(강철식 회장)",
                },
                { month: "03", content: "대한수중핀수영협회 창립 54주년" },
                {
                    month: "01",
                    content:
                        "제24회 세계핀수영선수권대회 2026년도 국내 유치 확정",
                },
                { month: "01", content: "강철식 제15대 회장 취임" },
                {
                    month: "05",
                    content: "세계수중연맹(CMAS) 이사 재선(강철식 회장)",
                },
            ],
        },
        {
            year: "2010",
            events: [
                {
                    month: "05",
                    content:
                        "사단법인 대한수중 · 핀수영협회로 명칭 변경 (체육장관-1710 제정 승인)",
                },
                { month: "01", content: "이명두 제12대 회장 취임" },
                {
                    month: "03",
                    content:
                        "대한수중 · 핀수영협회와 전국스킨스쿠버연합회 통합 (사)대한수중 · 핀수영협회로 명칭 통합",
                },
                { month: "12", content: "한승천 제13대 회장 취임" },
                {
                    month: "03",
                    content:
                        "대한수중 · 핀수영협회와 사)대스쿠버다이빙 통합 (사)대한수중 · 핀수영협회로 명칭 통합",
                },
            ],
        },
    ],
    "2001~2010": [],
    "1991~2000": [
        {
            year: "2000",
            events: [
                {
                    month: "10",
                    content: "핀수영 경기 전국체육대회 정식종목 채택",
                },
                { month: "01", content: "이춘근 제8대 회장 취임" },
                { month: "01", content: "긴급수 제10대 회장 취임" },
                { month: "01", content: "이명두 제11대 회장 취임" },
            ],
        },
        {
            year: "1990",
            events: [
                { month: "02", content: "대한핀협회 경기장별 단체 인가" },
                {
                    month: "10",
                    content: "핀수영 경기 전국체육대회 시범종목 채택",
                },
                { month: "01", content: "박호중 제6대 회장 취임" },
                {
                    month: "04",
                    content:
                        "사단법인 대한수중협회(문화관광부 제437호) 설립 허가",
                },
            ],
        },
    ],
    "1960~1990": [
        {
            year: "1980",
            events: [
                { month: "11", content: "한국수중협회로 명칭 변경" },
                { month: "06", content: "세계수중연맹(CMAS) 가입" },
                { month: "12", content: "아시아수중연맹(AUF) 가입" },
                {
                    month: "12",
                    content:
                        "대한체육회에 준가맹 단체 따라 대한수중협회로 명칭 변경",
                },
            ],
        },
        {
            year: "1970",
            events: [
                {
                    month: "03",
                    content: "한국스쿠버다이빙협회로 명칭을 변경",
                },
            ],
        },
        {
            year: "1960",
            events: [
                {
                    month: "03",
                    content:
                        "대한수중협회의 모태인 한국스킨다이빙클럽이 창립 (프리다이빙진흥협의(7개회))",
                },
                {
                    month: "07",
                    content: "제1회 전국수중경기대회를 개최하기 시작",
                },
            ],
        },
    ],
};

const periods = [
    "2021 ~ 현재",
    "2011 ~ 2020",
    "2001~2010",
    "1991~2000",
    "1960~1990",
];

export const History = () => {
    const [activePeriod, setActivePeriod] = useState("2021 ~ 현재");

    return (
        <div className="bg-kua-sky50 w-full">
            <div className="mx-auto flex w-full max-w-[1200px] items-start justify-center gap-25 py-44">
                {/* 왼쪽 기간 선택 버튼 */}
                <div className="flex w-[300px] flex-col gap-3">
                    {periods.map((period) => (
                        <button
                            key={period}
                            onClick={() => setActivePeriod(period)}
                            className={`flex h-[80px] cursor-pointer items-center justify-between rounded-[10px] px-8 text-2xl font-bold transition-all ${
                                activePeriod === period
                                    ? "bg-kua-main text-white"
                                    : "border-kua-main text-kua-main hover:bg-kua-main border bg-white hover:text-white"
                            }`}
                            style={
                                activePeriod === period
                                    ? {
                                          boxShadow:
                                              "0px 4px 4px 0px rgba(30, 42, 67, 0.25)",
                                      }
                                    : undefined
                            }
                        >
                            <span>{period}</span>
                            <Image
                                src="/imgs/about/arrow-right.svg"
                                alt="arrow-right"
                                width={8}
                                height={14}
                            />
                        </button>
                    ))}
                </div>

                {/* 오른쪽 타임라인 */}
                <div className="relative flex-1">
                    {historyData[activePeriod as keyof typeof historyData]
                        .length === 0 ? (
                        <div className="text-kua-gray400 flex h-[400px] items-center justify-center text-xl">
                            해당 기간의 연혁 정보가 없습니다.
                        </div>
                    ) : (
                        <div className="relative">
                            {/* 세로 라인 */}
                            <div className="bg-kua-main absolute top-[11px] left-[7px] h-full w-px"></div>

                            {historyData[
                                activePeriod as keyof typeof historyData
                            ].map((yearData, yearIndex) => (
                                <div
                                    key={yearIndex}
                                    className="border-b-kua-gray400 dashed relative flex items-start gap-5 pt-8"
                                >
                                    {/* 연도 */}
                                    <div className="flex items-center gap-4">
                                        <div className="border-kua-sky50 bg-kua-main relative z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full">
                                            <div className="h-[12px] w-[12px] rounded-full bg-white"></div>
                                        </div>
                                        <span className="text-kua-main w-[82px] text-[32px] font-bold">
                                            {yearData.year}
                                        </span>
                                    </div>

                                    {/* 이벤트 목록 */}
                                    <div
                                        className="mt-3 flex flex-1 flex-col gap-6 pb-8"
                                        style={{
                                            borderBottom:
                                                "0.5px dashed rgba(166, 171, 183, 1)",
                                            borderImageSlice: 1,
                                        }}
                                    >
                                        {yearData.events.map(
                                            (event, eventIndex) => (
                                                <div
                                                    key={eventIndex}
                                                    className="flex gap-4"
                                                >
                                                    <span className="text-kua-main min-w-[28px] text-xl font-bold">
                                                        {event.month}
                                                    </span>
                                                    <span className="text-kua-gray800 text-xl">
                                                        {event.content}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
