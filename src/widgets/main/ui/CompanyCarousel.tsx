"use client";

import Image from "next/image";
import { ImageFallback } from "@/shared/ui/ImageFallback";
import { useState } from "react";

const data = [
    { src: "/imgs/main/company_01.png", title: "Company 1" },
    { src: "/imgs/main/company_02.png", title: "Company 2" },
    { src: "/imgs/main/company_03.png", title: "Company 3" },
    { src: "/imgs/main/company_04.png", title: "Company 4" },
    { src: "/imgs/main/company_05.png", title: "Company 5" },
];

export const CompanyCarousel = () => {
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const minItems = 10;
    const repeatCount = Math.max(2, Math.ceil(minItems / data.length));
    const duplicatedData = Array(repeatCount).fill(data).flat();

    return (
        <>
            <style>{`
                @keyframes autoPlay {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-224px * ${data.length}));
                    }
                }
            `}</style>
            <div className="flex max-w-[1200px] flex-col overflow-hidden px-[100px] pb-20">
                <ul
                    className="relative -left-[100px] flex gap-24"
                    style={{
                        width: `calc(224px * ${duplicatedData.length})`,
                        animationName: "autoPlay",
                        animationDuration: "20s",
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                    }}
                >
                    {duplicatedData.map((item, i) => {
                        const originalIndex = i % data.length;
                        const hasError = imageErrors.has(originalIndex);

                        return (
                            <li key={i} className="w-32 shrink-0">
                                <div className="relative flex h-20 w-32 shrink-0 items-center justify-center">
                                    {hasError ? (
                                        <ImageFallback />
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                            onError={() => {
                                                setImageErrors((prev) =>
                                                    new Set(prev).add(
                                                        originalIndex,
                                                    ),
                                                );
                                            }}
                                        />
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};
