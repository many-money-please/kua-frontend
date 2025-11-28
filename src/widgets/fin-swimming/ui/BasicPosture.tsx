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
                상체는 곧게, 두 팔을 머리 앞으로
                <br />
                포개고 머리를 팔 사이에 고정
            </p>
        ),
    },
    {
        description: <p>무릎은 18° 이상 굽히지 않음</p>,
    },
    {
        description: (
            <p>
                돌핀킥 동작을 통해 허리의 유연성과
                <br />
                하체의 탄력으로 추진력 확보
            </p>
        ),
    },
];

export const BasicPosture = () => {
    return (
        <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="mb-4 text-2xl font-bold sm:text-[32px]">
                기본 자세
            </h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-8">
                {basicPostureData.map((item, index) => (
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
