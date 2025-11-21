import Image from "next/image";

export const CompetitionStructure = () => {
    return (
        <div className="bg-kua-blue50 mx-auto w-full py-16">
            <div className="mx-auto flex h-[800px] w-full max-w-[1200px] justify-between">
                <div>
                    <h2 className="mb-8 text-[40px] font-bold">경기 구성</h2>
                    <div className="flex flex-col justify-center">
                        <p className="text-kua-gray600 text-xl leading-relaxed">
                            핀수영은 1950년대 유럽에서 시작되어
                            <br /> 1986년 IOC가 정식 종목으로 승인하면서
                            <br /> 세계적인 수중 스포츠로 자리잡았습니다.
                        </p>
                    </div>
                </div>
                <div className="flex h-full gap-6">
                    {/* 오른쪽: 경기 종류 카드들 */}
                    <div className="flex h-full w-[350px] flex-col justify-start gap-6">
                        {/* 수영장경기 */}
                        <div className="flex flex-col gap-4 rounded-2xl bg-white p-8">
                            <h3 className="text-kua-blue500 text-3xl font-bold">
                                수영장경기
                            </h3>
                            <div className="text-kua-gray600 flex flex-col gap-2 text-lg">
                                <p>
                                    <span className="font-semibold">
                                        표면경기 :{" "}
                                    </span>
                                    50m~1,850m
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        계영 :{" "}
                                    </span>
                                    4×100m, 4×200m
                                </p>
                            </div>
                            <div className="flex w-full justify-end">
                                <div className="relative h-16 w-16">
                                    <Image
                                        src="/imgs/fin-swimming/fin-swimming03.svg"
                                        alt="수영장경기"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 장거리경기 */}
                        <div className="flex flex-col gap-4 rounded-2xl bg-white p-8">
                            <h3 className="text-kua-blue500 text-3xl font-bold">
                                장거리경기
                            </h3>
                            <div className="text-kua-gray600 flex flex-col gap-2 text-lg">
                                <p>
                                    강, 호수, 바다 등 자연 수역
                                    <br />
                                    (3,000~8,000m)
                                </p>
                                <p>기록은 공인되지 않음</p>
                            </div>
                            <div className="flex w-full justify-end">
                                <div className="relative h-16 w-16">
                                    <Image
                                        src="/imgs/fin-swimming/fin-swimming05.svg"
                                        alt="장거리경기"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full w-[350px] flex-col justify-end gap-6">
                        {/* 잠영경기 */}
                        <div className="flex flex-col gap-4 rounded-2xl bg-white p-8">
                            <h3 className="text-kua-blue500 text-3xl font-bold">
                                잠영경기
                            </h3>
                            <div className="text-kua-gray600 flex flex-col gap-2 text-lg">
                                <p>
                                    <span className="font-semibold">
                                        호흡잠영 :{" "}
                                    </span>
                                    100m-400m-800m
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        무호흡잠영 :{" "}
                                    </span>
                                    50m
                                </p>
                            </div>
                            <div className="flex w-full justify-end">
                                <div className="relative h-16 w-16">
                                    <Image
                                        src="/imgs/fin-swimming/fin-swimming04.svg"
                                        alt="잠영경기"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 경기 장비 규정 */}
                        <div className="flex flex-col gap-4 rounded-2xl bg-white p-8">
                            <h3 className="text-kua-blue500 text-3xl font-bold">
                                경기 장비 규정
                            </h3>
                            <div className="text-kua-gray600 flex flex-col gap-2 text-lg">
                                <p>
                                    <span className="font-semibold">핀 :</span>{" "}
                                    크기/재질 제한 없음 (발 착용형)
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        스노클 :
                                    </span>
                                    <br />
                                    내경 23mm 이하
                                    <br />
                                    길이 48cm 이하
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        공기잠수장비 :
                                    </span>
                                    <br />
                                    호흡잠영경기에만 사용 가능
                                </p>
                            </div>
                            <div className="flex w-full justify-end">
                                <div className="relative h-16 w-16">
                                    <Image
                                        src="/imgs/fin-swimming/fin-swimming06.svg"
                                        alt="경기 장비 규정"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
