import Image from "next/image";

const historyData = [
    {
        year: "고대",
        content: "인간의 응급 의료 활동 시작, 전쟁과 재해 상황에서 응급처치 기술 발달",
    },
    {
        year: "1800년대",
        content: "현대 응급처치 체계 정립, 국제 적십자 협회 설립",
    },
    {
        year: "1900년대",
        content: "응급처치 교육 시스템 도입, 체계적인 훈련 과정 개발",
    },
    {
        year: "2000년대 이후",
        content: "스포츠화 및 대중화, 전 세계적으로 응급처치 교육 확대",
    },
];

export const HistoricalOrigin = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[32px] font-bold">역사적 기원</h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    응급처치는 고대로부터 이어져 온 응급 의료 기술이
                    <br /> 1800년대부터 체계적인 교육 과정으로 발전하며 오늘날 생명을 보호하는 중요한 기술로 자리잡았습니다.
                </p>
            </div>
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-16">
                <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                    <Image
                        src="/imgs/fin-swimming/fin-swimming02.jpg"
                        alt="응급처치"
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

