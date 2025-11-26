"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(
    () => import("@/shared/ui/LeafletMap").then((module) => module.LeafletMap),
    { ssr: false },
);

export const FindUs = () => {
    return (
        <div id="find-us" className="bg-kua-sky50 w-full">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-center gap-12 px-5 py-20 sm:px-0 sm:py-44">
                <h2 className="text-kua-darkblue800 text-2xl font-bold sm:text-[32px]">
                    찾아오시는 길
                </h2>
                <div className="h-[350px] w-full sm:h-[585px]">
                    <LeafletMap
                        center={{
                            lat: 37.517347753646874,
                            lng: 127.12632769374328,
                        }}
                        zoom={17}
                        className="z-0"
                    />
                </div>
                <div className="flex w-full flex-col gap-20">
                    {/* 주소 */}
                    <div className="flex items-center gap-[50px]">
                        <div className="border-kau-gray400 flex h-12 w-12 items-center justify-center rounded-[10px] border bg-white sm:h-20 sm:w-20">
                            <Image
                                src="/imgs/about/marker.svg"
                                alt="address"
                                width={21}
                                height={33.7}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-kua-black100 text-lg font-semibold sm:text-2xl">
                                주소
                            </h3>
                            <div className="text-kua-gray800 flex flex-col text-sm font-medium sm:text-base">
                                <p>
                                    (지번주소) 서울특별시 송파구 방이동 88-2
                                    핸드볼경기장 112호
                                </p>
                                <p>
                                    (도로명주소) 서울특별시 송파구 올림픽로 424
                                    핸드볼경기장 112호
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 전화번호 */}
                    <div className="flex items-center gap-[50px]">
                        <div className="border-kau-gray400 flex h-12 w-12 items-center justify-center rounded-[10px] border bg-white sm:h-20 sm:w-20">
                            <Image
                                src="/imgs/about/phone.svg"
                                alt="phone"
                                width={31.13}
                                height={31.11}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-kua-black100 text-lg font-semibold sm:text-2xl">
                                전화번호
                            </h3>
                            <div className="text-kua-gray800 flex flex-col text-sm font-medium sm:text-base">
                                <p>
                                    <span className="font-bold">Tel.</span>{" "}
                                    02-420-4293
                                </p>
                                <p>
                                    <span className="font-bold">Fax.</span>{" "}
                                    02-421-8898
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 지하철 이용 시 */}
                    <div className="flex items-center gap-[50px]">
                        <div className="border-kau-gray400 flex h-12 w-12 items-center justify-center rounded-[10px] border bg-white sm:h-20 sm:w-20">
                            <Image
                                src="/imgs/about/subway.svg"
                                alt="subway"
                                width={26}
                                height={34}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-kua-black100 text-lg font-semibold sm:text-2xl">
                                지하철 이용 시
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center rounded-md bg-[#8936E0] px-3 py-1 text-sm font-bold text-white sm:text-base">
                                    5호선
                                </div>
                                <p className="text-kua-gray800 text-sm font-medium sm:text-base">
                                    올림픽공원역 하차 3번출구 도보로 5분
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
