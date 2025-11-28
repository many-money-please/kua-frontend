import React from "react";

const monofinWearingData = [
    {
        description: (
            <p>
                모노핀은 두 발이 연결되어 있어
                <br />
                <span className="text-kua-main font-semibold">
                    신은 후에는 걸을 수 없음
                </span>
            </p>
        ),
    },
    {
        description: (
            <p>
                출발대 옆에서 신어야 하며,
                <br />
                발과 핀 모두 물에 적셔 착용
            </p>
        ),
    },
    {
        description: (
            <p>
                핀은 발에 꼭 맞아야 하며, 발등 보호를 <br /> 위해 모노핀 전용
                버선 착용 필수
            </p>
        ),
    },
    {
        description: (
            <p>
                비누칠 시 착용은 쉬워지지만,
                <br />
                입수 전 반드시 씻어낼 것
            </p>
        ),
    },
];

export const MonofinWearing = () => {
    return (
        <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="mb-4 text-2xl font-bold sm:text-[32px]">
                모노핀 착용
            </h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-8">
                {monofinWearingData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-kua-sky50 rounded-[10px] px-5 py-8 text-base sm:px-16 sm:text-2xl"
                    >
                        {item.description}
                    </div>
                ))}
            </div>
        </div>
    );
};
