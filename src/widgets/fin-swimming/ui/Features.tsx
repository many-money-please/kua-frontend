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
        title: "속도",
        description: "자유형보다 약 1.3배 빠름",
        imageSrc: "/imgs/fin-swimming/fin-swimming07.svg",
        imageAlt: "핀수영",
    },
    {
        title: "동작",
        description: "돌고래 같은 '돌핀킥' 사용",
        imageSrc: "/imgs/fin-swimming/fin-swimming08.svg",
        imageAlt: "핀수영",
    },
    {
        title: "환경",
        description: (
            <>
                수영장·저수지·바다 등<br /> 다양한 수역에서 가능
            </>
        ),
        imageSrc: "/imgs/fin-swimming/fin-swimming09.svg",
        imageAlt: "핀수영",
    },
];

const FeatureCard = ({ feature }: { feature: FeatureCard }) => {
    return (
        <div className="bg-kua-white border-kua-gray300 flex h-[160px] items-center gap-4 rounded-[10px] border px-8">
            <div className="relative h-[70px] w-[70px] sm:h-[74px] sm:w-[74px]">
                <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col">
                <span className="text-kua-blue500 text-lg font-bold sm:text-3xl">
                    {feature.title}
                </span>
                <span className="text-sm font-medium sm:text-xl">
                    {feature.description}
                </span>
            </div>
        </div>
    );
};

export const Features = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-5 sm:gap-8">
            <h2 className="text-kua-gray800 mb-4 text-xl font-bold sm:mb-8 sm:text-[32px]">
                핀수영의 특징
            </h2>
            <p className="text-kua-gray400 text-sm leading-relaxed sm:text-2xl">
                핀수영은 강력한 추진력과 유연한 동작이 결합된, 가장 역동적인
                수중 경기입니다.
            </p>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
                {features.map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} />
                ))}
            </div>
        </div>
    );
};
