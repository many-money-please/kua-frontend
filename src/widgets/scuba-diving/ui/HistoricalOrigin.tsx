import Image from "next/image";

const historyData = [
    {
        year: "1940년대",
        content: "자가수호식 수중호흡기(SCUBA) 발명, 자크 이브 쿠스토와 에밀 가냥의 협력",
    },
    {
        year: "1950년대",
        content: "전 세계 스쿠버다이빙 협회 설립, 국제기구 CMAS(세계수중연맹) 출범",
    },
    {
        year: "1960년대",
        content: "스쿠버다이빙 교육 시스템 정립, PADI 등 다이빙 교육 기관 설립",
    },
    {
        year: "1970년대 이후",
        content: "레저 스포츠로 대중화, 전 세계 다이빙 산업 발전",
    },
];

export const HistoricalOrigin = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[32px] font-bold">역사적 기원</h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    스쿠버다이빙은 1940년대 자가수호식 수중호흡기 발명으로 시작되어
                    <br /> 1950년대부터 전 세계적으로 발전하며 오늘날 대중적인 수중 레저 스포츠로 자리잡았습니다.
                </p>
            </div>
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-16">
                <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                    <Image
                        src="/imgs/fin-swimming/fin-swimming02.jpg"
                        alt="스쿠버다이빙"
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
                                {historyData.map((yearData, yearIndex) => (
                                    <div
                                        key={yearIndex}
                                        className="relative flex w-full flex-col gap-2"
                                    >
                                        {/* 연도 */}
                                        <div className="flex w-full items-start justify-center gap-4">
                                            <div className="flex h-[48px] items-center">
                                                <div className="bg-kua-main relative z-10 flex min-h-[16px] min-w-[16px] items-center justify-center rounded-full">
                                                    <div className="min-h-[8px] min-w-[8px] rounded-full bg-white"></div>
                                                </div>
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

                                        {/* 세로 라인 - 마지막 아이템이 아닐 때만 표시 */}
                                        {yearIndex < historyData.length - 1 && (
                                            <div className="bg-kua-gray300 absolute top-[30px] left-[7px] h-full w-px"></div>
                                        )}
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

