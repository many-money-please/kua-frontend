import React from "react";

const monofinWearingData = [
    {
        description: (
            <p>
                응급처치 장비는 생명을 구하는 핵심 도구로
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
                구급상자 및 응급 장비는
                <br />
                빠른 응급처치를 위한 필수 장비
            </p>
        ),
    },
    {
        description: (
            <p>
                처치 전 장비 점검 필수, 응급 장비 및
                <br /> 약품 상태 확인
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

