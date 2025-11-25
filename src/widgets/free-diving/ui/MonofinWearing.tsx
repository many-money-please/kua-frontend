import React from "react";

const monofinWearingData = [
    {
        description: (
            <p>
                마스크는 눈과 코를 보호하며
                <br />
                <span className="text-kua-main font-semibold">
                    수중 시야를 확보하는 필수 장비
                </span>
            </p>
        ),
    },
    {
        description: (
            <p>
                핀은 추진력을 높이고
                <br />
                효율적인 이동을 가능하게 함
            </p>
        ),
    },
    {
        description: (
            <p>
                다이빙 전 장비 점검 필수, 웻슈트 및
                <br /> 마스크 상태 확인
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

