const basicPostureData = [
    {
        description: (
            <p>
                몸 전체를 수평으로 유지,
                <br />
                물의 저항 최소화
            </p>
        ),
    },
    {
        description: (
            <p>
                팔은 몸 옆으로 두거나 앞으로 뻗어
                <br />
                균형 유지
            </p>
        ),
    },
    {
        description: <p>호흡 참기를 위한 자세 유지</p>,
    },
    {
        description: (
            <p>
                부드러운 킥 동작으로 이동,
                <br />
                에너지 효율적인 움직임
            </p>
        ),
    },
];

export const BasicPosture = () => {
    return (
        <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="mb-4 text-[32px] font-bold">기본 자세</h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {basicPostureData.map((item, index) => (
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

