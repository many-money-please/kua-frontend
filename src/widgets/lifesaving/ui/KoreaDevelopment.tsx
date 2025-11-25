import Image from "next/image";

const koreaHistoryData = [
    {
        year: "1980년대",
        content: "한국 인명구조 협회 설립, 인명구조 교육 보급 시작",
    },
    {
        year: "1990년대",
        content: "전국 인명구조 클럽 증가, 체계적인 교육 시스템 도입",
    },
    {
        year: "2000년대",
        content: "안전 교육 강화, 전국 각 지역 구조 센터 증가",
    },
    {
        year: "2010년대 이후",
        content: "안전 교육 확대, 국제 구조 기관과의 협력",
    },
];

export const KoreaDevelopment = () => {
    return (
        <div className="bg-kua-sky50 flex w-full flex-col gap-16 py-24">
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="mb-4 text-[32px] font-bold">
                    한국 인명구조의 발전
                </h2>
                <p className="text-kua-gray600 text-2xl leading-relaxed">
                    인명구조는 1980년대 한국에 도입되어
                    <br /> 오늘날 생명을 보호하는 중요한 기술로 발전했습니다.
                </p>
            </div>
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-16">
                <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                    <Image
                        src="/imgs/fin-swimming/fin-swimming10.jpg"
                        alt="인명구조"
                        fill
                        className="scale-150 object-cover"
                    />
                </div>
                <div>
                    <div className="relative flex w-full flex-1 justify-end">
                        {koreaHistoryData.length === 0 ? (
                            <div className="text-kua-gray400 flex h-[400px] items-center justify-center text-xl">
                                연혁 정보가 없습니다.
                            </div>
                        ) : (
                            <div className="relative">
                                {koreaHistoryData.map((yearData, yearIndex) => (
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
                                        {yearIndex <
                                            koreaHistoryData.length - 1 && (
                                            <div className="bg-kua-gray300 absolute top-[30px] left-[7px] h-full w-px"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

