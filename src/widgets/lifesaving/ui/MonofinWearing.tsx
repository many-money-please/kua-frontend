import React from "react";

const monofinWearingData = [
    {
        description: (
            <p>
                구조 장비는 생명 구조의 핵심 도구로
                <br />
                <span className="text-kua-main font-semibold">
                    적절한 장비 선택이 중요
                </span>
            </p>
        ),
    },
    {
        description: (
            <p>
                구명봇 및 구조선은
                <br />
                빠른 구조를 위한 필수 장비
            </p>
        ),
    },
    {
        description: (
            <p>
                구조 전 장비 점검 필수, 구조 장비 및
                <br /> 안전 장비 상태 확인
            </p>
        ),
    },
    {
        description: (
            <p>
                장비는 전용 보관소에 보관하며,
                <br />
                사용 후 충분히 세척 및 점검
            </p>
        ),
    },
];

export const MonofinWearing = () => {
    return (
        <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="mb-4 text-[32px] font-bold">장비 착용</h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-8">
                {monofinWearingData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-kua-sky50 rounded-[10px] px-16 py-8 text-2xl"
                    >
                        {item.description}
                    </div>
                ))}
            </div>
        </div>
    );
};

