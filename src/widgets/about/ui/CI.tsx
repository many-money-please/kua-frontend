import Image from "next/image";

export const CI = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-[93px] py-44">
            <div className="flex flex-col gap-28">
                <div className="flex flex-col gap-10">
                    <h2 className="text-kua-darkblue800 text-[40px] font-bold">
                        C.I 소개
                    </h2>
                    <div className="flex flex-col gap-5">
                        <h3 className="text-kua-darkblue800 text-[32px] font-bold">
                            심벌마크(Symbol mark)
                        </h3>
                        <p className="text-kua-gray400 text-base font-medium">
                            심벌마크는 대한수중·핀수영협회를 상징으로 대표하는
                            시각적핵물로서 CI를 구성함에 있어서 가장 중요한
                            핵심요소이다.
                            <br />
                            그리드 시스템은 심벌마크의 일관된 이미지를 유지하기
                            위한 좌표기준이다.
                            <br />
                            심벌마크 사용시 변형을 막기 위하여는 본 매뉴얼에
                            정비례로 확대, 축소하여 사용하도록 한다.
                        </p>
                        {/* 다운로드 버튼 */}
                        <button className="border-kua-gray500 bg-kua-gray100 text-kua-gray500 flex w-[152px] items-center justify-center gap-2.5 rounded-[5px] border px-4 py-[7px] text-lg font-medium transition-colors hover:bg-[#E5E7EB]">
                            CI 다운로드
                            <Image
                                src="/imgs/about/download.svg"
                                alt="download"
                                width={20}
                                height={20}
                            />
                        </button>
                        <div className="relative flex w-full justify-center">
                            <Image
                                src="/imgs/about/symbol-background.png"
                                alt="symbol-background"
                                width={1200}
                                height={438}
                                className="h-auto w-full"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center gap-[310px]">
                                <Image
                                    src="/imgs/about/symbol-1.svg"
                                    alt="symbol-1"
                                    width={400}
                                    height={400}
                                    className="h-auto w-auto"
                                    unoptimized
                                />
                                <Image
                                    src="/imgs/about/symbol-2.svg"
                                    alt="symbol-2"
                                    width={400}
                                    height={400}
                                    className="h-auto w-auto"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-kua-darkblue800 text-[32px] font-bold">
                            시그니처(Signature) 조합
                        </h3>
                        <p className="text-kua-gray400 text-base font-medium">
                            시그니처는 핵심요소인 심벌마크와 로고타입을
                            이상적으로 조합하여 제작한
                            <br /> 공식표시로서 C.I 요소 중에서 가장 사용빈도가
                            높다.
                            <br />
                            대한수중·핀수영협회의 일관된 이미지를 위해
                            시그니처의 각 요소들간의
                            <br /> 비례, 크기, 위치 등을 임의로 조정하거나
                            변형해서는 안된다.
                        </p>
                    </div>
                    <div className="flex max-w-[689px] flex-1 pt-[2px]">
                        <div className="flex flex-1 flex-col gap-3">
                            <p className="text-kua-gray800 text-base font-bold">
                                가로조합
                            </p>
                            <div className="border-kua-gray400 flex flex-1 items-center justify-center border py-[68px]">
                                <Image
                                    src="/imgs/about/logo-hori.svg"
                                    alt="logo-horizontal"
                                    width={260}
                                    height={48}
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <p className="text-kua-gray800 text-base font-bold">
                                세로조합
                            </p>
                            <div className="border-kua-gray400 flex flex-1 items-center justify-center border-t border-r border-b py-[28px]">
                                <Image
                                    src="/imgs/about/logo-verti.svg"
                                    alt="logo-vertical"
                                    width={154}
                                    height={128}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-kua-darkblue800 text-[32px] font-bold">
                            색상(Color)
                        </h3>
                        <p className="text-kua-gray400 text-base font-medium">
                            지정색상은 시각적 통일에 따라 사용하여
                            <br />
                            하나의 정식적인 활용 때는 금색 또는 은색 표현도
                            가능함.
                            <br />
                            단, 표현, 사용시 색상의 명도, 채도 등의 차이로
                            <br />
                            시각효과를 훼손하지 않는 한에서 변경이 가능하다.
                        </p>
                    </div>
                    <div className="flex max-w-[689px] flex-1 pt-[2px]">
                        <div className="flex flex-1 flex-col gap-3">
                            <p className="text-kua-gray800 text-base font-bold">
                                Main Color
                            </p>
                            <div className="flex h-[340px] flex-col overflow-hidden rounded-[10px]">
                                <div className="bg-kua-main flex flex-1 flex-col gap-1 p-6 text-white">
                                    <p className="text-2xl font-bold">BLUE</p>
                                    <p className="text-2xl font-bold">
                                        C 100% + M 90% + Y 10%
                                    </p>
                                </div>
                                <div className="flex flex-1 flex-col gap-1 bg-black p-6 text-white">
                                    <p className="text-2xl font-bold">BLACK</p>
                                    <p className="text-2xl font-bold">K 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
