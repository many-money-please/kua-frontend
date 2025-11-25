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
        title: "수영장경기",
        items: [
            { label: "표면경기", value: "50m~1,850m" },
            { label: "계영", value: "4×100m, 4×200m" },
        ],
        imageSrc: "/imgs/fin-swimming/fin-swimming03.svg",
        imageAlt: "수영장경기",
    },
    {
        title: "잠영경기",
        items: [
            { label: "호흡잠영", value: "100m-400m-800m" },
            { label: "무호흡잠영", value: "50m" },
        ],
        imageSrc: "/imgs/fin-swimming/fin-swimming04.svg",
        imageAlt: "잠영경기",
    },
    {
        title: "장거리경기",
        content: (
            <>
                <p>
                    강, 호수, 바다 등 자연 수역
                    <br />
                    (3,000~8,000m)
                </p>
                <p>기록은 공인되지 않음</p>
            </>
        ),
        imageSrc: "/imgs/fin-swimming/fin-swimming05.svg",
        imageAlt: "장거리경기",
    },
    {
        title: "경기 장비 규정",
        items: [
            { label: "핀", value: "크기/재질 제한 없음 (발 착용형)" },
            {
                label: "스노클",
                value: <>내경 23mm 이하 / 길이 48cm 이하</>,
            },
            {
                label: "공기잠수장비",
                value: "호흡잠영경기에만 사용 가능",
            },
        ],
        imageSrc: "/imgs/fin-swimming/fin-swimming06.svg",
        imageAlt: "경기 장비 규정",
    },
];

const CompetitionCard = ({ card }: { card: CompetitionCard }) => {
    return (
        <div className="flex h-full justify-between rounded-2xl bg-white p-8">
            <div className="flex w-full flex-col gap-3 sm:gap-8">
                <h3 className="text-kua-blue500 text-lg font-bold sm:text-3xl">
                    {card.title}
                </h3>
                <div className="text-kua-gray600 flex flex-col gap-6 text-lg">
                    {card.items
                        ? card.items.map((item, index) => (
                              <div
                                  key={index}
                                  className="flex flex-col items-start gap-2"
                              >
                                  <span className="bg-kua-sky100 text-kua-blue300 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap sm:text-base">
                                      {item.label}
                                  </span>
                                  <span className="text-kua-gray600 pl-2 text-sm sm:text-base">
                                      {item.value}
                                  </span>
                              </div>
                          ))
                        : card.content}
                </div>
            </div>
            <div className="flex h-full items-end">
                <div className="relative h-[70px] w-[70px] sm:h-32 sm:w-32">
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
        <div className="bg-kua-blue50 mx-auto w-full px-5 py-16">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-16">
                <div>
                    <h2 className="text-kua-gray800 mb-4 text-xl font-bold sm:mb-8 sm:text-[32px]">
                        경기 구성
                    </h2>
                    <div className="flex flex-col justify-center">
                        <p className="text-kua-gray400 text-sm leading-relaxed sm:text-xl">
                            핀수영은 1950년대 유럽에서 시작되어 1986년 IOC가
                            정식 종목으로 승인하면서
                            <br /> 세계적인 수중 스포츠로 자리잡았습니다.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-2 sm:gap-8">
                    {competitionCards.map((card) => (
                        <CompetitionCard key={card.title} card={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};
