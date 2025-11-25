import React from "react";
import Image from "next/image";

type CompetitionItem = {
    label: string;
    value: string | React.ReactNode;
};

type CompetitionCard = {
    title: string;
    items?: CompetitionItem[];
    content?: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
};

const competitionCards: CompetitionCard[] = [
    {
        title: "처치 종류",
        items: [
            { label: "심폐소생술", value: "생명을 구하기 위한 응급처치" },
            { label: "응급처치", value: "부상 및 질병에 대한 즉각적 처치" },
        ],
        imageSrc: "/imgs/fin-swimming/fin-swimming03.svg",
        imageAlt: "처치 종류",
    },
    {
        title: "응급처치 장비",
        items: [
            { label: "구급상자", value: "응급처치 도구 및 약품" },
            {
                label: "AED",
                value: <>자동제세동기</>,
            },
            {
                label: "구급 장비",
                value: "응급 의료 장비 및 도구",
            },
        ],
        imageSrc: "/imgs/fin-swimming/fin-swimming04.svg",
        imageAlt: "응급처치 장비",
    },
    {
        title: "처치 환경",
        content: (
            <>
                <p>
                    수영장, 바다, 호수 등
                    <br />
                    다양한 수역에서 가능
                </p>
                <p>안전 기준 및 처치 절차 준수</p>
            </>
        ),
        imageSrc: "/imgs/fin-swimming/fin-swimming05.svg",
        imageAlt: "처치 환경",
    },
    {
        title: "안전 규정",
        items: [
            { label: "버디 시스템", value: "2인 1조 필수" },
            {
                label: "응급 요원",
                value: "처치 중 안전 감시 요원 배치",
            },
        ],
        imageSrc: "/imgs/fin-swimming/fin-swimming06.svg",
        imageAlt: "안전 규정",
    },
];

const CompetitionCard = ({ card }: { card: CompetitionCard }) => {
    return (
        <div className="flex h-full justify-between rounded-2xl bg-white p-8">
            <div className="w-full">
                <h3 className="text-kua-blue500 text-3xl font-bold">
                    {card.title}
                </h3>
                <div className="text-kua-gray600 flex flex-col gap-6 text-lg">
                    {card.items
                        ? card.items.map((item, index) => (
                              <div
                                  key={index}
                                  className="flex flex-col items-start gap-2"
                              >
                                  <span className="bg-kua-sky100 text-kua-blue300 rounded-full px-3 py-1 text-base font-semibold whitespace-nowrap">
                                      {item.label}
                                  </span>
                                  <span className="text-kua-gray600 pl-2">
                                      {item.value}
                                  </span>
                              </div>
                          ))
                        : card.content}
                </div>
            </div>
            <div className="flex h-full items-end">
                <div className="relative h-32 w-32">
                    <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export const CompetitionStructure = () => {
    return (
        <div className="bg-kua-blue50 mx-auto w-full py-16">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-16">
                <div>
                    <h2 className="mb-8 text-[32px] font-bold">경기 구성</h2>
                    <div className="flex flex-col justify-center">
                        <p className="text-kua-gray600 text-xl leading-relaxed">
                            응급처치는 고대로부터 이어져 온 응급 의료 기술이
                            <br /> 오늘날 생명을 보호하는 중요한 기술로 자리잡았습니다.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-8">
                    {competitionCards.map((card) => (
                        <CompetitionCard key={card.title} card={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};

