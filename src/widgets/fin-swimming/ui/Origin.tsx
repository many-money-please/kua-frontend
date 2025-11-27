import Image from "next/image";

export const Origin = () => {
    return (
        <div className="flex flex-col gap-5 px-5 sm:gap-32">
            <div className="mx-auto w-full max-w-[1200px]">
                <h2 className="text-kua-gray800 mb-4 text-xl font-bold sm:text-[32px]">
                    핀수영의 유래
                </h2>
                <p className="text-kua-gray400 text-sm leading-relaxed sm:text-2xl">
                    핀수영은 수중에서 핀을 이용해 빠르게 이동하는 스포츠로,
                    <br />
                    자유형보다 약 1.3배 빠른 속도와 돌고래 같은 역동적 움직임을
                    자랑합니다. <br />
                    1950년대 유럽에서 시작되어 오늘날 전 세계적으로 사랑받는
                    수중 스포츠입니다.
                </p>
            </div>
            <div className="relative mx-auto h-[420px] w-full max-w-[1200px] overflow-hidden rounded-2xl opacity-80">
                <Image
                    src="/imgs/fin-swimming/fin-swimming01.jpg"
                    alt="핀수영"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
};
