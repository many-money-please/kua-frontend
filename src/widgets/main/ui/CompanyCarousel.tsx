"use client";

import Image from "next/image";
import Link from "next/link"; // 링크 이동을 위해 추가
import { ImageFallback } from "@/shared/ui/ImageFallback";
import { useState } from "react";

// url 필드 추가
const data = [
    {
        src: "/imgs/main/company_01.png",
        title: "대한체육회",
        url: "https://www.sports.or.kr/",
    },
    {
        src: "/imgs/main/company_02.png",
        title: "문화체육관광부",
        url: "https://www.mcst.go.kr/site/main.jsp",
    },
    {
        src: "/imgs/main/company_03.png",
        title: "한국도핑방지위원회",
        url: "https://www.kada-ad.or.kr/",
    },
    {
        src: "/imgs/main/company_04.png",
        title: "대한수중핀수영협회",
        url: "http://www.cmaskorea.co.kr/",
    },
    {
        src: "/imgs/main/company_05.png",
        title: "국민체육공단",
        url: "https://www.kspo.or.kr/kspo/main/main.do",
    },
];

export const CompanyCarousel = () => {
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

    const handleError = (index: number) => {
        setImageErrors((prev) => new Set(prev).add(index));
    };

    // 로고 렌더링 함수
    const renderLogoItems = () =>
        data.map((item, index) => {
            const hasError = imageErrors.has(index);

            // 이미지 컴포넌트 (공통 사용)
            const ImageContent = (
                <div className="relative flex h-20 w-32 shrink-0 items-center justify-center">
                    {hasError ? (
                        <ImageFallback />
                    ) : (
                        <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            // grayscale 제거, hover 제거 -> 항상 컬러로 표시
                            className="object-contain"
                            onError={() => handleError(index)}
                        />
                    )}
                </div>
            );

            return (
                <li
                    key={`${item.title}-${index}`}
                    className="flex shrink-0 items-center justify-center"
                >
                    {/* 링크가 있으면 Link로 감싸고, 없으면 div만 렌더링 */}
                    {item.url ? (
                        <Link
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {ImageContent}
                        </Link>
                    ) : (
                        ImageContent
                    )}
                </li>
            );
        });

    return (
        <div className="z-20 w-full pb-20">
            <div className="flex w-full flex-col items-center gap-y-6 overflow-x-hidden">
                <div className="flex w-full justify-center">
                    {/* Mask Image: 양옆을 자연스럽게 흐리게 처리 */}
                    <div className="relative w-full max-w-[1200px] overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                        {/* 핵심 수정 사항: 
               1. inline-flex로 변경하여 자식 요소들이 한 줄로 서게 함
               2. animate-infinite-scroll-fast를 두 개의 ul 모두에 적용
               3. translateX(-100%) 애니메이션이 리스트 길이만큼 정확히 이동하므로 끊김 없이 무한 반복됨
            */}
                        <div className="inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                            {/* 원본 리스트 */}
                            <ul className="animate-infinite-scroll-fast flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
                                {renderLogoItems()}
                            </ul>

                            {/* 복제 리스트 (무한 스크롤 이어지게 하는 역할) */}
                            <ul
                                className="animate-infinite-scroll-fast flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
                                aria-hidden="true"
                            >
                                {renderLogoItems()}
                            </ul>
                            {/* 복제 리스트 (무한 스크롤 이어지게 하는 역할) */}
                            <ul
                                className="animate-infinite-scroll-fast flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
                                aria-hidden="true"
                            >
                                {renderLogoItems()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
