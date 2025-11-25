import React from "react";
import Image from "next/image";

type FeatureCard = {
    title: string;
    description: string | React.ReactNode;
    imageSrc: string;
    imageAlt: string;
};

const features: FeatureCard[] = [
    {
        title: "생명 보호",
        description: "수중에서 발생하는 응급상황 대비",
        imageSrc: "/imgs/fin-swimming/fin-swimming07.svg",
        imageAlt: "인명구조",
    },
    {
        title: "안전",
        description: "체계적인 교육과 안전 규칙 준수",
        imageSrc: "/imgs/fin-swimming/fin-swimming08.svg",
        imageAlt: "인명구조",
    },
    {
        title: "환경",
        description: (
            <>
                바다, 호수, 수영장 등<br /> 다양한 수역에서 가능
            </>
        ),
        imageSrc: "/imgs/fin-swimming/fin-swimming09.svg",
        imageAlt: "인명구조",
    },
];

const FeatureCard = ({ feature }: { feature: FeatureCard }) => {
    return (
        <div className="bg-kua-white border-kua-gray300 flex h-[160px] items-center gap-4 rounded-[10px] border px-8">
            <div className="relative h-[74px] w-[74px]">
                <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col">
                <span className="text-kua-blue500 text-3xl font-bold">
                    {feature.title}
                </span>
                <span className="text-xl font-medium">
                    {feature.description}
                </span>
            </div>
        </div>
    );
};

export const Features = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 py-8">
            <h2 className="text-[32px] font-bold">인명구조의 특징</h2>
            <p className="text-kua-gray600 text-2xl leading-relaxed">
                인명구조는 수중에서 발생하는 응급상황에 대비하여 생명을 구조하는 중요한 기술입니다.
            </p>
            <div className="grid w-full grid-cols-3 gap-8">
                {features.map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} />
                ))}
            </div>
        </div>
    );
};

