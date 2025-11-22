import React from "react";
import Image from "next/image";

type AppliedTechnique = {
    title: string;
    image: string;
    description: React.ReactNode;
};

const appliedTechniques: AppliedTechnique[] = [
    {
        title: "잠영 자세",
        image: "/imgs/fin-swimming/fin-swimming18.jpg",
        description: (
            <>
                수심 1-15m 유지
                <br />
                몸과 공기통을 일직선으로 하여 저항 최소화
            </>
        ),
    },
    {
        title: "턴(Turn)",
        image: "/imgs/fin-swimming/fin-swimming19.jpg",
        description: (
            <>
                핀 각도 90° 유지
                <br />
                코로 숨을 내뱉으며 스노클 내 물을 제거
            </>
        ),
    },
    {
        title: "출발(Start)",
        image: "/imgs/fin-swimming/fin-swimming20.jpg",
        description: (
            <ul className="list-inside list-disc">
                <li>표면수영: 일반 자유형과 동일</li>
                <li>호흡장비: 공기통 들고 15-20 각도로 입수</li>
            </ul>
        ),
    },
];

export const AppliedTechniques = () => {
    return (
        <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="mb-8 text-[40px] font-bold">응용 기술</h2>
            <div className="grid grid-cols-3 gap-4">
                {appliedTechniques.map((technique) => (
                    <div
                        key={technique.title}
                        className="border-kua-gray400 flex flex-col overflow-hidden rounded-[10px] border"
                    >
                        <div className="relative h-[300px] w-full bg-gray-200">
                            <Image
                                src={technique.image}
                                alt={technique.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-2 bg-white p-8">
                            <h3 className="text-kua-main text-2xl font-bold">
                                {technique.title}
                            </h3>
                            <p className="text-kua-gray800 text-lg leading-relaxed">
                                {technique.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
