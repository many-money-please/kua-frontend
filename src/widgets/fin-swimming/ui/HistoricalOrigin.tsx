import Image from "next/image";

const historyData = [
    {
        year: "1950년대",
        content: "각국 수중스포츠 협회 설립, 국제기구 CMAS(세계수중연맹) 출범",
    },
    {
        year: "1960년대 후반",
        content: "공식 핀수영 경기 시작",
    },
    {
        year: "1967년",
        content: "제1회 유럽선수권대회 개최",
    },
    {
        year: "1976년",
        content: "제1회 세계선수권대회 개최",
    },
    {
        year: "1986년",
        content: "IOC(국제올림픽위원회) 정식 종목 인정",
    },
];

export const HistoricalOrigin = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[40px] font-bold">역사적 기원</h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    핀수영은 1950년대 유럽에서 시작되어
                    <br /> 1986년 IOC가 정식 종목으로 승인하면서 세계적인 수중
                    스포츠로 자리잡았습니다.
                </p>
            </div>
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-16">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                        src="/imgs/fin-swimming/fin-swimming02.jpg"
                        alt="핀수영"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="relative flex w-full flex-1 justify-end">
                        {historyData.length === 0 ? (
                            <div className="text-kua-gray400 flex h-[400px] items-center justify-center text-xl">
                                연혁 정보가 없습니다.
                            </div>
                        ) : (
                            <div className="relative">
                                {/* 세로 라인 */}
                                <div className="bg-kua-gray300 absolute top-[11px] left-[7px] h-full w-px"></div>

                                {historyData.map((yearData, yearIndex) => (
                                    <div
                                        key={yearIndex}
                                        className="border-b-kua-gray400 dashed relative flex w-full flex-col gap-2 pt-8"
                                    >
                                        {/* 연도 */}
                                        <div className="flex w-full items-center justify-center gap-4">
                                            <div className="border-kua-sky50 bg-kua-main relative z-10 flex min-h-[16px] min-w-[16px] items-center justify-center rounded-full">
                                                <div className="min-h-[8px] min-w-[8px] rounded-full bg-white"></div>
                                            </div>
                                            <span className="text-kua-main w-full text-[32px] font-bold">
                                                {yearData.year}
                                            </span>
                                        </div>

                                        {/* 이벤트 목록 */}
                                        <div className="flex flex-1 flex-col gap-6 pb-8 pl-8">
                                            <span className="text-kua-gray800 text-xl">
                                                {yearData.content}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
