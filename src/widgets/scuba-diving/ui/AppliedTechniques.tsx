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
                수심에 따라 부력 조절
                <br />
                몸과 장비를 일직선으로 하여 저항 최소화
            </>
        ),
    },
    {
        title: "부상",
        image: "/imgs/fin-swimming/fin-swimming19.jpg",
        description: (
            <>
                천천히 부상,
                <br />
                안전 정지 후 상승
            </>
        ),
    },
    {
        title: "입수(Entry)",
        image: "/imgs/fin-swimming/fin-swimming20.jpg",
        description: (
            <ul className="list-inside list-disc">
                <li>자이언트 스텝: 큰 발걸음으로 입수</li>
                <li>백 롤: 뒤로 구르며 입수</li>
            </ul>
        ),
    },
];

export const AppliedTechniques = () => {
    return (
        <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="mb-8 text-[32px] font-bold">응용 기술</h2>
            <div className="grid grid-cols-3 gap-4">
                {appliedTechniques.map((technique) => (
                    <div
                        key={technique.title}
                        className="border-kua-gray400 flex flex-col overflow-hidden rounded-[10px] border"
                    >
                        <div className="relative h-[300px] w-full bg-gray-200">
                            {/* <Image
                                src={technique.image}
                                alt={technique.title}
                                fill
                                className="object-cover"
                            /> */}
                        </div>
                        <div className="flex flex-col gap-2 bg-white p-8">
                            <h3 className="text-kua-main text-2xl font-bold">
                                {technique.title}
                            </h3>
                            <div className="text-kua-gray800 text-lg leading-relaxed">
                                {technique.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

