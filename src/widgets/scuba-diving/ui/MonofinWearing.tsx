import React from "react";

const monofinWearingData = [
    {
        description: (
            <p>
                BCD(부력조절장치)는 다이빙의 핵심 장비로
                <br />
                <span className="text-kua-main font-semibold">
                    수중에서 부력을 조절하는 장치
                </span>
            </p>
        ),
    },
    {
        description: (
            <p>
                레귤레이터는 공기통의 공기를
                <br />
                호흡 가능한 압력으로 조절
            </p>
        ),
    },
    {
        description: (
            <p>
                다이빙 전 장비 점검 필수, 공기통 압력 및
                <br /> 레귤레이터 작동 상태 확인
            </p>
        ),
    },
    {
        description: (
            <p>
                장비는 전용 가방에 보관하며,
                <br />
                사용 후 충분히 세척 및 건조
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

